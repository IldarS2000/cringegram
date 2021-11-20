import {MainStore} from '.';
import {makeAutoObservable} from 'mobx';
import {Post} from '../interfaces/post';
import {parseISO} from 'date-fns';
import {
    getAllPosts,
} from "../services/api.service";

export class FeedStore {
    isLoading: boolean = false;
    posts: Post[] | null = null;
    errorMessage: string | null = null;

    constructor(public mainStore: MainStore) {
        makeAutoObservable(this);
    }

    get sortedPosts () {
        return this.posts?.slice().sort((post1, post2) => {
            const date1 = parseISO(post1.createTimestamp).getTime();
            const date2 = parseISO(post2.createTimestamp).getTime();
            return date2 - date1;
        });
    };

    setErrorMessage = (errorMessage: string | null): void => {
        this.errorMessage = errorMessage;
    };

    setIsLoading = (isLoading: boolean): void => {
        this.isLoading = isLoading;
    };

    setPosts = (posts: Post[] | null): void => {
        this.posts = posts;
    };

    getAllPosts = async (): Promise<void> => {
        this.setIsLoading(true);
        try {
            const { data: posts } = await getAllPosts();
            this.setPosts(posts);
        } catch (e) {
            console.log(e.message);
        } finally {
            this.setIsLoading(false);
        }
    };
}