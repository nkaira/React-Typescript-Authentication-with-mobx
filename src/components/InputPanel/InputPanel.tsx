import React, { FC, useContext, useRef } from 'react';
import { observer } from "mobx-react";
import { useForm, SubmitHandler } from 'react-hook-form';
import { Context } from 'index';
import { v4 as uuidv4 } from 'uuid';

import { InputPanelFormValues } from 'models/formTypes';
import styles from './inputPanel.module.scss';

const InputPanel: FC = () => {

    const { contactsStore } = useContext(Context);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const {
        register,
        formState: {
            errors, isValid
        },
        handleSubmit, reset
    } = useForm<InputPanelFormValues>({
        mode: 'onChange'
    });

    const { ref } = register('name');

    const handleAddContact: SubmitHandler<InputPanelFormValues> = (data) => {
        const newContact = { ...data, uniqId: uuidv4() };
        contactsStore.addContact(newContact);
        reset();
        inputRef.current?.focus();
    };

    const handleGetContacts = async () => {
        const response = await contactsStore.getContacts();
    };

    return (
        <div className={styles.main}>
            <form className={styles.form} onSubmit={handleSubmit(handleAddContact)}>
                <label>
                    Name:
                    <input className={styles.input} type='text' placeholder='enter name'
                        {...register('name', {
                            required: 'this field is required'
                        })}
                        ref={(e) => {
                            ref(e)
                            inputRef.current = e
                        }}
                    />
                    <div className={styles.error}>
                        {errors?.name && <p>{errors?.name?.message || 'Error!'}</p>}
                    </div>
                </label>
                <label>
                    Telephone number:
                    <input className={styles.input} type='tel' placeholder='enter telephone number'
                        {...register('phone', {
                            required: 'this field is required',
                            minLength: {
                                value: 4,
                                message: 'min 4 characters'
                            },
                            pattern: {
                                value: /^[0-9]*$/,
                                message: 'Only numbers are allowed'
                            }
                        })}
                    />
                    <div className={styles.error}>
                        {errors?.phone && <p>{errors?.phone?.message || 'Error!'}</p>}
                    </div>
                </label>
                <button className={styles.button} type='submit' disabled={!isValid}>add contact</button>
            </form>
            <button className={styles.button} onClick={handleGetContacts}>get from DB (for tests)</button>
        </div>
    )
};

export default observer(InputPanel);