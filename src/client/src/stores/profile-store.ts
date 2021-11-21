import {MainStore} from '.';
import {autorun, makeAutoObservable, runInAction, when} from 'mobx';
import {Post} from '../interfaces/post';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    addPost, createComment,
    deletePost,
    getAllUserPosts,
    getUserInfo,
    toggleLike,
    updatePost,
    updateUserAboutMe,
    updateUserAvatar,
    updateUsername
} from "../services/api.service";
import {ImageInfo} from "expo-image-picker/build/ImagePicker.types";
import {FileRequest} from "../interfaces/file-request";
import {postDateComparator} from "../utils/post-date-comparator";
import {Comment} from "../interfaces/comment";
import {isUserInfoResponse, UserInfoResponse} from "../interfaces/user-info-response";

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
            this.setPosts(null);
            this.setUser(null);
            console.log(this.posts);
        });

    }

    get sortedPosts () {
        return this.posts?.slice().sort(postDateComparator);
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
            runInAction(() => {
                this.posts?.unshift(post);
            });
        } catch (e) {
            console.log(e.message);
        } finally {
            this.setIsLoading(false);
        }
    };

    deletePost = async (postId: number): Promise<void> => {
        this.setIsLoading(true);
        try {
            await deletePost(postId);
            this.setPosts(this.posts?.filter((post: Post) => post.id !== postId) || null);
        } catch (e) {
            console.log(e.message);
        } finally {
            this.setIsLoading(false);
        }
    };

    updatePost = async (postId: number, description: string): Promise<void> => {
        this.setIsLoading(true);
        try {
            await updatePost(postId, description);
            const post = this.posts?.find((post: Post) => postId === post.id)!;
            runInAction(() => {
                post.description = description;
            });
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
            const { data: commentData } = await createComment({postId, comment, userId: this.user!.id});
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