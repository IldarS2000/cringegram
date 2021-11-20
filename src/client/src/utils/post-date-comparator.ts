import {parseISO} from "date-fns";
import {Post} from "../interfaces/post";

export const postDateComparator = (post1: Post, post2: Post) => {
    const date1 = parseISO(post1.createTimestamp).getTime();
    const date2 = parseISO(post2.createTimestamp).getTime();
    return date2 - date1;
};