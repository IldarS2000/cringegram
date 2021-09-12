import {MainStore} from '.';
import {makeAutoObservable} from "mobx";
import {User} from "../interfaces/user";
import {Post} from '../interfaces/post';
import {getMockUser} from "../utils/mock-user";
import {getMockUserPosts} from "../utils/mock-user-posts";

export class ProfileStore {
    isLoading: boolean = false;
    user: User | null = null;
    posts: Post[] | null = null;

    constructor(public mainStore: MainStore) {
        makeAutoObservable(this);
    }

    setIsLoading = (isLoading: boolean): void => {
        this.isLoading = isLoading;
    };

    setUser = (user: User | null): void => {
        this.user = user;
    };

    setPosts = (posts: Post[] | null): void => {
        this.posts = posts;
    };


    getUser = async (): Promise<void> => {
        this.setIsLoading(true);
        try {
            const user = await getMockUser();
            this.setUser(user);
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