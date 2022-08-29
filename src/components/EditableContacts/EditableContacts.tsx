import React, { FC } from 'react';
import { observer } from "mobx-react";

import IEditableContacts from 'models/componentModels/IEditableContact';
import styles from './editableContacts.module.scss';

const EditableContacts: FC<IEditableContacts> = ({ editFormData, onEdit, onCancel }) => {

    return (
        <tr className={styles.main}>
            <td>
                <input
                    type='text'
                    required={true}
                    placeholder='Enter a name...'
                    name="name"
                    value={editFormData.name}
                    onChange={onEdit}
                ></input>
            </td>
            <td>
                <input
                    type='text'
                    required={true}
                    pattern='[+]7\s[\(]\d{3}[\)]\s\d{3}[\-]\d{2}[\-]\d{2}'
                    title='Use the format: +7 (777) 777-77-77'
                    placeholder='Enter a phone number...'
                    name='phone'
                    value={editFormData.phone}
                    onChange={onEdit}
                ></input>
            </td>
            <td>
                <button type='submit'>Save</button>
                <button type='button' onClick={onCancel}> Cancel </button>
            </td>
        </tr>
    )
};

export default observer(EditableContacts);


