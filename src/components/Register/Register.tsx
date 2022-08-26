import React, { FC, useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { observer } from "mobx-react";

import { Context } from 'index';
import INewUser from 'models/authModels/INewUser';
import styles from './register.module.scss';

const Register: FC = () => {

    const [registerError, setRegisterError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { authStore } = useContext(Context);

    const {
        register,
        formState: {
            errors, isValid
        },
        handleSubmit
    } = useForm<INewUser>({
        mode: 'onChange'
    });

    const onSubmit = async (data: INewUser) => {
        const response = await authStore.registration(data);
        console.log('response_inSubmit', response)
        if (response?.status! >= 200 && response?.status! < 300) {
            navigate('/dashboard');
        }
        setRegisterError(response?.data as string);
    };

    return (
        <section className={styles.main}>
            <h1>Create an account</h1>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Email:
                    <input className={styles.input} type='email' placeholder='enter email'
                        {...register('email', {
                            required: 'this field is required'
                        })}
                    />
                    <div className={styles.error}>
                        {registerError ? <p>{registerError}</p> : errors?.email && <p>{errors?.email?.message || 'Error!'}</p>}
                    </div>
                </label>
                <label>
                    Login:
                    <input className={styles.input} type='text' placeholder='enter login'
                        {...register('login', {
                            required: 'this field is required'
                        })}
                    />
                    <div className={styles.error}>
                        {errors?.login && <p>{errors?.login?.message || 'Error!'}</p>}
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
                        {errors?.password && <p>{errors?.password?.message || 'Error!'}</p>}
                    </div>
                </label>
                <button className={styles.button} type='submit' disabled={!isValid}>Registration</button>
                <p>
                    Have an account? <Link className={styles.login} to='/login'>Login</Link>
                </p>
            </form>
        </section>
    )
};

export default observer(Register);