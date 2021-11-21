import {MainStore} from '.';
import {makeAutoObservable, runInAction} from 'mobx';
import {Post} from '../interfaces/post';
import {
    createComment,
    getAllPosts, toggleLike,
} from "../services/api.service";
import {postDateComparator} from "../utils/post-date-comparator";
import {Comment} from "../interfaces/comment";

export class FeedStore {
    isLoading: boolean = false;
    posts: Post[] | null = null;
    errorMessage: string | null = null;

    constructor(public mainStore: MainStore) {
        makeAutoObservable(this);
    }

    get sortedPosts () {
        return this.posts?.slice().sort(postDateComparator);
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

    toggleLike = async (postId: number): Promise<void> => {
        this.setIsLoading(true);
        try {
            const { data: postData } = await toggleLike(postId);
            const post = this.posts?.find((post: Post) => postId === post.id)!;
            runInAction(() => {
                post.hasYourLike = postData.hasYourLike;
                post.likeCount = postData.likeCount;
            });
        } catch (e) {
            console.log(e.message);
        } finally {
            this.setIsLoading(false);
        }
    };

    createComment = async (postId: number, comment: string): Promise<Comment | void> => {
        this.setIsLoading(true);
        try {
            const { data: commentData } = await createComment({
                postId,
                comment,
                userId: this.mainStore.profileStore.user!.id
            });
            this.posts?.forEach((post: Post) => {
                if (post.id === postId) {
                    post.commentsCount++;
                }
            });
            return commentData;
        } catch (e) {
            console.log(e.message);
        } finally {
            this.setIsLoading(false);
        }
    };
}