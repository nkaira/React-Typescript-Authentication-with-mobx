import React, { FC, useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { observer } from "mobx-react";

import { Context } from 'index';
import IUser from 'models/authModels/IUser';
import styles from './login.module.scss';

const Login: FC = () => {

    const [loginError, setLoginError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { authStore } = useContext(Context);

    const {
        register,
        formState: {
            errors, isValid
        },
        handleSubmit, reset
    } = useForm<IUser>({
        mode: 'onChange'
    });

    const onSubmit = async (data: IUser) => {
        const response = await authStore.login(data);
        reset({ password: '' });
        if (response?.status! >= 200 && response?.status! < 300) {
            navigate('/dashboard');
        }
        setLoginError(response?.data as string);
    };

    return (
        <section className={styles.main}>
            <h1>Authorization</h1>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Email:
                    <input className={styles.input} type='email' placeholder='enter email'
                        {...register('email', {
                            required: 'this field is required'
                        })}
                    />
                    <div className={styles.error}>
                        {loginError ? <p>{loginError}</p> : errors?.password && <p>{errors?.email?.message}</p>}
                    </div>
                </label>
                <label>
                    Password:
                    <input className={styles.input} type='password' autoComplete='on' placeholder='enter password'
                        {...register('password', {
                            required: 'this field is required',
                            minLength: {
                                value: 4,
                                message: 'min 4 characters'
                            }
                        })}
                    />
                    <div className={styles.error}>
                        {errors?.password && <p>{errors?.password?.message}</p>}
                    </div>
                </label>
                <button className={styles.button} type='submit' disabled={!isValid}>Login</button>
                <p>
                    Don't have an account? <Link className={styles.login} to='/register'>Create Account</Link>
                </p>
            </form>
        </section>
    )
};

export default observer(Login);