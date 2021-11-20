export interface UserInfoResponse {
    id: number;
    aboutMe: string;
    email: string;
    postCount: number;
    subscriptionCount: number;
    subscribersCount: number;
    avatar?: string;
    username?: string;
}

export const isUserInfoResponse = (userInfo: unknown | UserInfoResponse): userInfo is UserInfoResponse => {
    return userInfo && typeof userInfo === 'object' && 'id' in userInfo && 'email' in userInfo;
};
