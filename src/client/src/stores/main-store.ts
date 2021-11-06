import {AuthStore} from "./auth-store";
import {ProfileStore} from "./profile-store";
import {FeedStore} from "./feed-store";

export class MainStore {
    authStore: AuthStore;
    profileStore: ProfileStore;
    feedStore: FeedStore;

    constructor() {
        this.authStore = new AuthStore(this);
        this.profileStore = new ProfileStore(this);
        this.feedStore = new FeedStore(this);
    }
}