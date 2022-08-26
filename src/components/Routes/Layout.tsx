import React, { FC, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { observer } from "mobx-react";

import HomePage from 'components/HomePage/HomePage';
import Register from 'components/Register/Register';
import Login from 'components/Login/Login';
import Dashboard from 'components/Dashboard/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import { Context } from 'index';

const Layout: FC = () => {

    const { authStore } = useContext(Context);

    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<ProtectedRoute isAuth={authStore.isAuth} />}>
                    <Route path="dashboard" element={<Dashboard />} />
                </Route>
            </Routes>
        </>
    )
};

export default observer(Layout);

