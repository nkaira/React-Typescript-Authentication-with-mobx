import IContact from 'models/contactsModels/IContact';

export interface IReadOnlyContacts {
    contact: IContact,
    onDelete: (id: number, uniqId: string) => void,
    onEdit: (event: React.SyntheticEvent, contact: IContact) => void
}