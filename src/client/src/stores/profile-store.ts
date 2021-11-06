import {MainStore} from '.';
import {autorun, makeAutoObservable, when} from 'mobx';
import {Post} from '../interfaces/post';
import {isUserInfoResponse, UserInfoResponse} from '../interfaces/dto/user-info-response';
import {parseISO} from 'date-fns';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    addPost,
    getAllUserPosts,
    getUserInfo,
    updateUserAboutMe,
    updateUserAvatar,
    updateUsername
} from "../services/api.service";
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
        when(() => !this.mainStore.authStore.isAuth, () => {
            console.log('clear');
            this.setPosts(null);
            this.setUser(null);
        });
    }

    get sortedPosts () {
        return this.posts?.slice().sort((post1, post2) => {
            const date1 = parseISO(post1.createTimestamp).getTime();
            const date2 = parseISO(post2.createTimestamp).getTime();
            return date2 - date1;
        });
    };

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

    get postCount(): number {
        return this.posts ? this.posts.length : 0;
    }

    getUser = async (userId?: number): Promise<void> => {
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

    getUserPosts = async (userId: number): Promise<void> => {
        this.setIsLoading(true);
        try {
            const { data: posts } = await getAllUserPosts(userId);
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

    addPost = async (imageInfo: ImageInfo, description: string): Promise<void> => {
        this.setIsLoading(true);
        try {
            const file: FileRequest = {
                uri: imageInfo.uri,
                type: 'image/jpeg',
                name: 'avatar.jpeg'
            };
            const {data: post} = await addPost(file, description);
            this.posts?.unshift(post);
        } catch (e) {
            console.log(e.message);
        } finally {
            this.setIsLoading(false);
        }
    };
}