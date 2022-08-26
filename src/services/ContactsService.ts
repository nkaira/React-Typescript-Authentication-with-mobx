import axios, { AxiosResponse } from 'axios';

import IContact from 'models/contactsModels/IContact';
import INewContact from 'models/contactsModels/INewContact';

export default class ContactsService {
    static async add(data: INewContact): Promise<AxiosResponse<IContact>> {
        return axios.post(`${process.env.REACT_APP_SERVER_URL}/contacts`, data)
    }

    static async get(): Promise<AxiosResponse<Array<IContact>>> {
        return axios.get(`${process.env.REACT_APP_SERVER_URL}/contacts`)
    }

    static async delete(id: number): Promise<AxiosResponse> {
        return axios.delete(`${process.env.REACT_APP_SERVER_URL}/contacts/${id}`)
    }

    static async patch(id: number, newContact: IContact): Promise<AxiosResponse<IContact>> {
        return axios.patch(`${process.env.REACT_APP_SERVER_URL}/contacts/${id}`, newContact)
    }
}