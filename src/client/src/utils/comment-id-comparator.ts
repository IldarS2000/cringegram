import {Comment} from "../interfaces/comment";

export const commentIdComparator = (comment1: Comment, comment2: Comment) =>
    comment2.id - comment1.id;