import {axiosInstance} from "./interceptors";
import {AxiosPromise} from "axios";
import {UserExistsResponse} from "../interfaces/user-exists-response";
import {AuthResponse} from "../interfaces/auth-response";
import {FileRequest} from "../interfaces/file-request";
import {Post} from "../interfaces/post";
import { Comment} from "../interfaces/comment";
import {UserShortInfo} from "../interfaces/user-short-info";
import {UserAvatarResponse} from "../interfaces/user-avatar-response";
import {CreateCommentDto} from "../interfaces/create-comment-dto";
import {UserInfoResponse} from "../interfaces/user-info-response";

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

export const getUserAvatar = (userId: number): AxiosPromise<UserAvatarResponse> =>
    axiosInstance.get(`/user/avatar?userId=${userId}`);

export const getUserShortInfo = (userId: number): AxiosPromise<UserShortInfo> =>
    axiosInstance.get(`/user/short?userId=${userId}`);

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

export const toggleLike = (postId: number): AxiosPromise<Post> =>
    axiosInstance.post(`/post/like?postId=${postId}`);

export const toggleSubscribe = (userId: number): AxiosPromise<UserInfoResponse> => {
    return axiosInstance.post(`change-subscriber/${userId}`, { userId });
};

export const getLikes = (postId: number): AxiosPromise<UserShortInfo[]> =>
    axiosInstance.get(`/post/like?postId=${postId}`);

export const getSubscribers = (userId: number): AxiosPromise<UserShortInfo[]> =>
    axiosInstance.get(`/user/subscribers?userId=${userId}`);

export const getSubscriptions = (userId: number): AxiosPromise<UserShortInfo[]> =>
    axiosInstance.get(`/user/subscriptions?userId=${userId}`);

export const searchUsers = (searchTerm: string): AxiosPromise<UserShortInfo[]> =>
    axiosInstance.get(`/user/search?searchTerm=${searchTerm}`);

export const getCommentsByPostId = (postId: number): AxiosPromise<Comment[]> =>
    axiosInstance.get(`/comments/${postId}`);

export const createComment = (createCommentDto: CreateCommentDto): AxiosPromise<Comment> =>
    axiosInstance.post('/comments', createCommentDto);
