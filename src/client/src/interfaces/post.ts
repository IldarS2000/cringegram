export interface Post {
    id: number;
    userId: number;
    photo: string;
    description?: string;
    likeCount: number;
    createTimestamp: string;
    hasYourLike: boolean;
    commentsCount: number;
}
