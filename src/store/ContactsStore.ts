import { makeAutoObservable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';

import ContactsService from 'services/ContactsService';
import IContact from 'models/contactsModels/IContact';
import INewContact from 'models/contactsModels/INewContact';
import { AxiosError } from 'axios';

export default class ContactsStore {
    private _contacts = [] as Array<IContact>;

    constructor() {
        makeAutoObservable(this);
    }

    get contacts() {
        return this._contacts;
    }

    setContacts(newContacts: Array<IContact>) {
        this._contacts = newContacts;
    }

    async addContact(data: INewContact) {
        try {
            const response = await ContactsService.add(data);
            this.contacts.push({ ...data, id: response.data.id });
            return response;
        } catch (err) {
            const addContactError = err as AxiosError;
            console.log('addContactError', addContactError.response?.data);
            return addContactError;
        }
    }

    async changeContactServer(id: number, newContact: IContact) {
        try {
            const response = await ContactsService.patch(id, newContact);
        } catch (err) {
            const changeContactError = err as AxiosError;
            console.log('changeContactError', changeContactError.response?.data);
            return changeContactError;
        }
    }

    async deleteContactServer(targetServerId: number) {
        try {
            const response = await ContactsService.delete(targetServerId);
        } catch (err) {
            const deleteContactError = err as AxiosError;
            console.log('deleteContactError', deleteContactError.response?.data);
            return deleteContactError;
        }
    }

    deleteContactLocal(targetUniqId: string) {
        const contacts = this.contacts.filter(contact => contact.uniqId !== targetUniqId);
        this.setContacts(contacts);
    }

    async getContacts() {
        try {
            const response = await ContactsService.get();
            const contactsWithUniqId = [...response.data].map(contact => {
                return { ...contact, uniqId: uuidv4() }
            })
            const serverContacts = this.contacts.concat(contactsWithUniqId);
            this.setContacts(serverContacts);
            return response;
        } catch (err) {
            const getContactsError = err as AxiosError;
            console.log('getContactsError', getContactsError.response?.data);
            return getContactsError;
        }
    }
}