import {MainStore} from '.';
import {autorun, makeAutoObservable} from 'mobx';
import {Post} from '../interfaces/post';
import {getMockUserPosts} from '../utils/mock-user-posts';
import {isUserInfoResponse, UserInfoResponse} from '../interfaces/dto/user-info-response';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getUserInfo} from "../services/api.service";

export class ProfileStore {
    isLoading: boolean = false;
    user: UserInfoResponse | null = null;
    posts: Post[] | null = null;

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
            }
            throw new Error('Ошибка в получении данных о пользователе');
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
}