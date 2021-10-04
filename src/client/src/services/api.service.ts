import {axiosInstance} from "./interceptors";
import {AxiosPromise} from "axios";
import {UserExistsResponse} from "../interfaces/dto/user-exists-response";
import {AuthResponse} from "../interfaces/dto/auth-response";
import {UserInfoResponse} from "../interfaces/dto/user-info-response";
import {FileRequest} from "../interfaces/file-request";

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