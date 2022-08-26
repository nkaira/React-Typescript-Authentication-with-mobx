import React, { FC, useContext, useState } from 'react';
import { observer } from 'mobx-react';
import { Context } from 'index';

import ReadOnlyContacts from 'components/ReadOnlyContacts/ReadOnlyContacts';
import EditableContacts from 'components/EditableContacts/EditableContacts';
import IContact from 'models/contactsModels/IContact';
import IEditContact from 'models/contactsModels/IEditContact';
import styles from './contactList.module.scss';

const ContactList: FC = () => {

    const { contactsStore } = useContext(Context);

    const [searchValue, setSearchValue] = useState<string>('');
    const [editContactId, setEditContactId] = useState<string | null>(null);
    const [editFormData, setEditFormData] = useState<IEditContact>({
        name: '',
        phone: '',
        id: '',
        uniqId: ''
    });

    const handleEditFormChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        event.preventDefault();

        const fieldName = target.getAttribute('name')!;
        const fieldValue = target.value;

        const newFormData: { [key: string]: string } = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData as unknown as IEditContact);
    };

    const handleCancelClick = () => {
        setEditContactId(null);
    };

    const handleEditFormSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();

        const editedContact: IContact = {
            name: editFormData.name,
            phone: editFormData.phone,
            id: Number(editFormData?.id),
            uniqId: editFormData.uniqId
        };

        const newContacts = [...contactsStore.contacts];
        const index = contactsStore.contacts.findIndex((contact) => contact.uniqId === editContactId);

        newContacts[index] = editedContact;
        contactsStore.changeContactServer(editedContact.id, editedContact)
        contactsStore.setContacts(newContacts);

        setEditContactId(null);
    };

    const handleDeleteContact = (targetServerId: number, targetUniqId: string) => {
        contactsStore.deleteContactServer(targetServerId);
        contactsStore.deleteContactLocal(targetUniqId);
    };

    const handleEditContact = (event: React.SyntheticEvent, contact: IContact) => {
        event.preventDefault();
        setEditContactId(contact.uniqId);

        const formValues = {
            name: contact.name,
            phone: contact.phone,
            id: contact.id.toString(),
            uniqId: contact.uniqId
        };
        setEditFormData(formValues);
    };

    const filteredContacts = contactsStore.contacts.filter(contact => {
        return contact.name.toLowerCase().includes(searchValue.toLowerCase());
    });

    return (
        <div className={styles.main}>
            <input className={styles.search}
                type='text'
                placeholder='search by name...'
                onChange={(event) => setSearchValue(event.target.value)}
            />
            <div className={styles.title}>
                <p>Name:</p>
                <p>Telephone number:</p>
                <p>Actions:</p>
            </div>
            <form onSubmit={handleEditFormSubmit}>
                <table>
                    <>
                        {filteredContacts.map((contact) => (
                            <tbody key={contact.uniqId}>
                                {editContactId === contact.uniqId ?
                                    <EditableContacts
                                        editFormData={editFormData}
                                        onEdit={handleEditFormChange}
                                        onCancel={handleCancelClick}
                                    />
                                    :
                                    <ReadOnlyContacts
                                        contact={contact}
                                        onDelete={handleDeleteContact}
                                        onEdit={handleEditContact}
                                    />
                                }
                            </tbody>
                        ))
                        }
                    </>
                </table>
            </form>
        </div>
    )
};

export default observer(ContactList);