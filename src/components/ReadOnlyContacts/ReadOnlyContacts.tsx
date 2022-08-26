import React, { FC } from 'react';
import { observer } from "mobx-react";

import { IReadOnlyContacts } from 'models/componentModels/IReadOnlyContacts';
import styles from './readOnlyContacts.module.scss';

const ReadOnlyContacts: FC<IReadOnlyContacts> = ({ contact, onDelete, onEdit }) => {

    return (
        <tr className={styles.main}>
            <td>{contact.name}</td>
            <td>{contact.phone}</td>
            <td>
                <button onClick={(event) => onEdit(event, contact)}> Edit </button>
                <button onClick={() => onDelete(contact.id, contact.uniqId)}> Delete </button>
            </td>
        </tr>
    )
};

export default observer(ReadOnlyContacts);