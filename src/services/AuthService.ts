import axios, { AxiosResponse } from 'axios';

import AuthResponse from 'models/response/AuthResponse';
import IUser from 'models/authModels/IUser';
import INewUser from 'models/authModels/INewUser';

export default class AuthService {
    static async login(data: IUser): Promise<AxiosResponse<AuthResponse>> {
        return axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, { ...data })
    }

    static async registration(data: INewUser): Promise<AxiosResponse<AuthResponse>> {
        return axios.post(`${process.env.REACT_APP_SERVER_URL}/register`, { ...data })
    }
}