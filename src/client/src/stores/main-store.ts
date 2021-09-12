import {AuthStore} from "./auth-store";

export class MainStore {
    authStore: AuthStore;

    constructor() {
        this.authStore = new AuthStore(this);
    }
}