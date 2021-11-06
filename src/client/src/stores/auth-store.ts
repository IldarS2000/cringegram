import {MainStore} from '.';
import {autorun, makeAutoObservable} from "mobx";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthStage} from '../enums/auth-stage.enum';
import {authMe, checkUserExists, signIn, signUp} from "../services/api.service";

export class AuthStore {
    isAuth: boolean = false;
    isLoading: boolean = true;
    isSubmitting: boolean = false;
    email: string = '';
    authStage: AuthStage = AuthStage.EMAIL;
    errorMessage: string | null = null;

    constructor(public mainStore: MainStore) {
        makeAutoObservable(this);
        autorun(() => {
           if (this.isAuth) {
               this.setAuthStage(AuthStage.EMAIL);
           }
        });
    }

    setIsAuth = (isAuth: boolean): void => {
        this.isAuth = isAuth;
    };

    setIsLoading = (isLoading: boolean): void => {
        this.isLoading = isLoading;
    };

    setAuthStage = (authStage: AuthStage): void => {
        this.authStage = authStage;
    };

    setIsSubmitting = (isSubmitting: boolean): void => {
        this.isSubmitting = isSubmitting;
    };

    setErrorMessage = (errorMessage: string | null): void => {
        this.errorMessage = errorMessage;
    };

    clearErrorMessage = (): void => {
        this.setErrorMessage(null);
    };

    setEmail = (email: string): void => {
        this.email = email;
    };

    checkUserExists = async (email: string): Promise<void> => {
        this.setIsSubmitting(true);
        try {
            const {data: { exists }} = await checkUserExists(email);
            this.setAuthStage(exists ? AuthStage.SIGN_IN : AuthStage.SIGN_UP);
        } catch (e) {
            console.log(e.message);
            this.setErrorMessage('Email введен неверно');
        } finally {
            this.setIsSubmitting(false);
        }
    };

    signIn = async (password: string): Promise<void> => {
        this.setIsSubmitting(true);
        try {
            const { data: { token, ...user } } = await signIn(this.email, password);
            await AsyncStorage.multiSet([['@token', token], ['@user', JSON.stringify(user)]]);
            this.setIsAuth(true);
        } catch (e) {
            console.log(e.message);
            this.setErrorMessage('Неверный пароль');
        } finally {
            this.setIsSubmitting(false);
        }
    };

    signUp = async (password: string): Promise<void> => {
        this.setIsSubmitting(true);
        try {
            const { data: { token, ...user } } = await signUp(this.email, password);
            await AsyncStorage.multiSet([['@token', token], ['@user', JSON.stringify(user)]]);
            this.setIsAuth(true);
        } catch (e) {
            console.log(e.message);
            this.setErrorMessage(e.message);
        } finally {
            this.setIsSubmitting(false);
        }
    };

    logout = async () => {
        this.setIsSubmitting(true);
        try {
            this.setIsAuth(false);
            await AsyncStorage.clear();
            console.log(await AsyncStorage.getAllKeys())
            this.setAuthStage(AuthStage.EMAIL);
        } catch (e) {
            console.log(e.message);
            this.setErrorMessage(e.message);
        } finally {
            this.setIsSubmitting(false);
        }
    }

    authMe = async (): Promise<void> => {
        this.setIsLoading(true);
        try {
            const { data: { token, ...user } } = await authMe();
            await AsyncStorage.multiSet([['@token', token], ['@user', JSON.stringify(user)]]);
            this.setIsAuth(true);
        } catch (e) {
            console.log(e);
            this.setErrorMessage(e.message);
        } finally {
            this.setIsLoading(false);
        }
    };
}