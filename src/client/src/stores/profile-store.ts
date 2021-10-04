import {MainStore} from '.';
import {autorun, makeAutoObservable} from 'mobx';
import {Post} from '../interfaces/post';
import {getMockUserPosts} from '../utils/mock-user-posts';
import {isUserInfoResponse, UserInfoResponse} from '../interfaces/dto/user-info-response';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getUserInfo, updateUserAboutMe, updateUserAvatar, updateUsername} from "../services/api.service";
import {ImageInfo} from "expo-image-picker/build/ImagePicker.types";
import {FileRequest} from "../interfaces/file-request";

export class ProfileStore {
    isLoading: boolean = false;
    user: UserInfoResponse | null = null;
    posts: Post[] | null = null;

    errorMessage: string | null = null;

    constructor(public mainStore: MainStore) {
        makeAutoObservable(this);
        autorun(async () => {
            if (this.mainStore.authStore.isAuth) {
                this.getUser();
            }
        });
    }

    setIsLoading = (isLoading: boolean): void => {
        this.isLoading = isLoading;
    };

    setUser = (user: UserInfoResponse | null): void => {
        this.user = user;
    };

    setPosts = (posts: Post[] | null): void => {
        this.posts = posts;
    };

    setErrorMessage = (errorMessage: string | null): void => {
        this.errorMessage = errorMessage;
    };

    clearErrorMessage = (): void => {
        this.setErrorMessage(null);
    };

    get username(): string | undefined | null {
        return this.user?.username;
    }

    getUser = async (): Promise<void> => {
        this.setIsLoading(true);
        try {
            const userInfo = await AsyncStorage.getItem('@user');
            const user = userInfo && JSON.parse(userInfo);
            if (isUserInfoResponse(user)) {
                const {data: userInfo} = await getUserInfo(user.id);
                this.setUser(userInfo);
                await AsyncStorage.setItem('@user', JSON.stringify(userInfo));
                return;
            } else {
                throw new Error('Ошибка в получении данных о пользователе');
            }
        } catch (e) {
            console.log(e.message);
        } finally {
            this.setIsLoading(false);
        }
    };

    getUserPosts = async (): Promise<void> => {
        this.setIsLoading(true);
        try {
            const posts = await getMockUserPosts();
            this.setPosts(posts);
        } catch (e) {
            console.log(e.message);
        } finally {
            this.setIsLoading(false);
        }
    };

    updateUsername = async (username: string): Promise<void> => {
        this.setIsLoading(true);
        try {
            const {data: userInfo} = await updateUsername(username);
            this.setUser(userInfo);
            await AsyncStorage.setItem('@user', JSON.stringify(userInfo));
        } catch (e) {
            console.log(e.message);
        } finally {
            this.setIsLoading(false);
        }
    };

    updateUserAboutMe = async (aboutMe: string): Promise<void> => {
        this.setIsLoading(true);
        try {
            const {data: userInfo} = await updateUserAboutMe(aboutMe);
            this.setUser(userInfo);
            await AsyncStorage.setItem('@user', JSON.stringify(userInfo));
        } catch (e) {
            console.log(e.message);
        } finally {
            this.setIsLoading(false);
        }
    };

    updateUserAvatar = async (imageInfo: ImageInfo): Promise<void> => {
        this.setIsLoading(true);
        try {
            const file: FileRequest = {
                uri: imageInfo.uri,
                type: 'image/jpeg',
                name: 'avatar.jpeg'
            };
            const {data: userInfo} = await updateUserAvatar(file);
            this.setUser(userInfo);
            await AsyncStorage.setItem('@user', JSON.stringify(userInfo));
        } catch (e) {
            console.log(e.message);
        } finally {
            this.setIsLoading(false);
        }
    };
}