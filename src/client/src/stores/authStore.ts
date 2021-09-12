import {MainStore} from '.';
import {makeAutoObservable} from "mobx";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthStage } from '../enums/auth-stage.enum';

export class AuthStore {
    isAuth: boolean = false;
    isLoading: boolean = false;
    isSubmitting: boolean = false;
    authStage: AuthStage = AuthStage.PHONE_NUMBER;
    errorMessage: string | null = null;

    constructor(public mainStore: MainStore) {
        makeAutoObservable(this);
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

    setErrorMessage = (errorMessage: string): void => {
        this.errorMessage = errorMessage;
    };

    sendPhoneNumber = async (phoneNumber: string): Promise<void> => {
        this.setIsSubmitting(true);
        try {
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (phoneNumber.length < 12) {
                        reject(new Error('Введите верный номер телефона'));
                    }
                    resolve();
                }, 1500);
            });
            this.setAuthStage(AuthStage.SECURITY_CODE);
        } catch (e) {
            console.log(e);
            this.setErrorMessage(e.message);
        } finally {
            this.setIsSubmitting(false);
        }
    };

    sendSecurityCode = async (securityCode: string): Promise<void> => {
        this.setIsSubmitting(true);
        try {
            const response = await new Promise((
                resolve: (value: { registered: boolean }) => void,
                reject
            ) => {
                setTimeout(() => {
                    if (securityCode === '1234') {
                        resolve({registered: true});
                    } else if (securityCode === '1111') {
                        resolve({registered: false});
                    } else
                        reject(new Error('Введен неверный код'));
                }, 1500);
            });
            if (response.registered) {
                this.setIsAuth(true);
            } else {
                this.setAuthStage(AuthStage.NICKNAME);
            }
        } catch (e) {
            console.log(e);
            this.setErrorMessage(e.message);
        } finally {
            this.setIsSubmitting(false);
        }
    };

    sendNickName = async (nickName: string): Promise<void> => {
        this.setIsSubmitting(true);
        try {
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (nickName === 'kekwmek') {
                        reject('Такое имя пользователя уже занято');
                    } else {
                        resolve();
                    }
                }, 1500);
            });
            this.setIsAuth(true);
        } catch (e) {
            console.log(e);
            this.setErrorMessage(e.message);
        } finally {
            this.setIsSubmitting(false);
        }
    };

    updateToken = async (): Promise<void> => {
        this.setIsLoading(true);
        try {
            const token = await AsyncStorage.getItem('token');
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (token === 'token') {
                        resolve();
                    } else {
                        reject(new Error('Не авторизован'));
                    }
                }, 1500);
            });
            this.setIsAuth(true);
        } catch (e) {
            console.log(e);
            this.setErrorMessage(e.message);
        } finally {
            this.setIsLoading(false);
        }
    };
}