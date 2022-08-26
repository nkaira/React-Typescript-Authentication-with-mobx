import IEditContact from 'models/contactsModels/IEditContact';
import React from 'react';

export default interface IEditableContacts {
    editFormData: IEditContact,
    onEdit: (event: React.SyntheticEvent<HTMLInputElement>) => void,
    onCancel: () => void
}