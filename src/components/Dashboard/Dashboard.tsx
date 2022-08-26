import React, { FC, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { Context } from 'index';

import InputPanel from 'components/InputPanel/InputPanel';
import ContactList from 'components/ContactList/ContactList';
import styles from './dashboard.module.scss';

const Dashboard: FC = () => {

    const navigate = useNavigate();
    const { authStore, contactsStore } = useContext(Context);

    useEffect(() => {
        const getContacts = async () => {
            await contactsStore.getContacts();
        }
        getContacts();
    }, []);

    const logout = async () => {
        const response = await authStore.logout();
        if (!authStore.isAuth) {
            navigate('/login');
        }
    };

    return (
        <section className={styles.main}>
            <div className={styles.login}>
                {authStore.user.login ? <h3>welcome {authStore.user.login}!</h3> : <h3>welcome user!</h3>}
                <button className={styles.logout} onClick={logout}>logout</button>
            </div>
            <InputPanel />
            <ContactList />
        </section >
    )
};

export default observer(Dashboard);