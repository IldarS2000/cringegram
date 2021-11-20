import {axiosInstance} from "./interceptors";
import {AxiosPromise} from "axios";
import {UserExistsResponse} from "../interfaces/user-exists-response";
import {AuthResponse} from "../interfaces/auth-response";
import {UserInfoResponse} from "../interfaces/user-info-response";
import {FileRequest} from "../interfaces/file-request";
import {Post} from "../interfaces/post";
import {mockUsers} from "../utils/mock-users";
import {UserSearchResult} from "../interfaces/user-search-result";

export const checkUserExists = (email: string): AxiosPromise<UserExistsResponse> =>
    axiosInstance.post('/userexists', {email});

export const signIn = (email: string, password: string): AxiosPromise<AuthResponse> =>
    axiosInstance.post('/signin', {email, password});

export const signUp = (email: string, password: string): AxiosPromise<AuthResponse> =>
    axiosInstance.post('/signup', {email, password});

export const authMe = (): AxiosPromise<AuthResponse> =>
    axiosInstance.get('/isValidToken');

export const getUserInfo = (userId: number): AxiosPromise<UserInfoResponse> =>
    axiosInstance.get(`/user?userId=${userId}`);

export const updateUsername = (username: string): AxiosPromise<UserInfoResponse> =>
    axiosInstance.put('/user/name', {username});

export const updateUserAboutMe = (aboutMe: string): AxiosPromise<UserInfoResponse> =>
    axiosInstance.put('/user/about-me', {aboutMe});

export const updateUserAvatar = (image: FileRequest): AxiosPromise<UserInfoResponse> => {
    const formData = new FormData();
    formData.append('image', image as unknown as Blob);
    return axiosInstance.put('/user/avatar', formData);
};

export const getUserAvatar = (userId: number): AxiosPromise<Blob> =>
    axiosInstance.get(`/user/avatar?userId=${userId}`, { responseType: 'blob' });

export const addPost = (photo: FileRequest, description: string): AxiosPromise<Post> => {
    const formData = new FormData();
    formData.append('photo', photo as unknown as Blob);
    formData.append('description', description);
    return axiosInstance.post('/post', formData);
};

export const deletePost = (postId: number): AxiosPromise => {
    return axiosInstance.delete(`/post?postId=${postId}`);
};

export const updatePost = (postId: number, description: string): AxiosPromise => {
    return axiosInstance.put('/post', { id: postId, description });
};

export const getAllUserPosts = (userId: number): AxiosPromise<Array<Post>> =>
    axiosInstance.get(`/posts/${userId}`);

export const getAllPosts = (): AxiosPromise<Array<Post>> =>
    axiosInstance.get('/posts/all');

export const toggleLike = (postId: number): AxiosPromise => {
    return new Promise((resolve) => {
        console.log(`лайк/дизлайк postID:${postId}`);
        resolve();
    })
    // axiosInstance.post('/posts/like', { postId });
};

export const toggleSubscribe = (userId: number): AxiosPromise => {
    return new Promise((resolve) => {
        console.log(`подписались на/отписались от userID:${userId}`);
        resolve();
    });
    // return axiosInstance.post('/subscribe/', { userId });
};

export const getLikes = (postId: number): Promise<UserSearchResult[]> =>
    new Promise((resolve) => resolve(mockUsers));

export const getSubscribers = (userId: number): Promise<UserSearchResult[]> =>
    new Promise((resolve) => resolve(mockUsers));

export const getSubscriptions = (userId: number): Promise<UserSearchResult[]> =>
    new Promise((resolve) => resolve(mockUsers));

export const searchUsers = (searchTerm: string): Promise<UserSearchResult[]> =>
    new Promise((resolve) => resolve(mockUsers.filter((user) => {
        return searchTerm !== '' && user.username.includes(searchTerm)
    })));
