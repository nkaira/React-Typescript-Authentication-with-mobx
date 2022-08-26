import { makeAutoObservable } from 'mobx';
import { AxiosError } from 'axios';

import AuthService from 'services/AuthService';
import INewUser from 'models/authModels/INewUser';
import IUser from 'models/authModels/IUser';
import IStoreUser from 'models/authModels/IStoreUser';

export default class AuthStore {
    user = {} as IStoreUser;
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: any) {
        this.user = user;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    async registration(data: INewUser) {
        try {
            const response = await AuthService.registration(data);
            localStorage.setItem('token', response.data.accessToken!);
            this.setAuth(true);
            this.setUser(response.data.user);
            console.log(response)
            return response;
        } catch (err) {
            const registrationError = err as AxiosError;
            console.log('registrationError', registrationError.response?.data);
            return registrationError.response;
        }
    }

    async login(data: IUser) {
        try {
            const response = await AuthService.login(data);
            localStorage.setItem('token', response.data.accessToken!);
            this.setAuth(true);
            this.setUser(response.data.user);
            return response;
        } catch (err) {
            const loginError = err as AxiosError;
            console.log('loginError', loginError.response?.data);
            return loginError.response;
        }
    }

    async logout() {
        try {
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (err) {
            const logoutError = err as Error;
            console.log('logoutError', logoutError?.message);
        }
    }
}