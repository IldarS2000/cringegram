export interface User {
    id: number;
    phoneNumber: string;
    name: string;
    aboutMe?: string;
    avatar?: string;
    postCount: number;
    subscriptionCount: number;
}