import {AuthStore} from "./auth-store";
import {ProfileStore} from "./profile-store";

export class MainStore {
    authStore: AuthStore;
    profileStore: ProfileStore;

    constructor() {
        this.authStore = new AuthStore(this);
        this.profileStore = new ProfileStore(this);
    }
}