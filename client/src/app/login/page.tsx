'use client'
import React from 'react'
import InputController from '../componets/InputController'
import useLogin from './useLogin'

const LoginPage: React.FC = () => {

    const { control, handleSubmit, onSubmit } = useLogin()

    return (
        <div>
            <h1>ログイン</h1>
            <p>Login</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputController name='email' control={control} label='メールアドレス' rules={{ required: 'メールアドレスは必須です' }} placeholder='メールアドレス' />
                <InputController name='password' control={control} label='パスワード' rules={{ required: 'パスワードは必須です' }} placeholder='パスワード' />
                <button type="submit">ログイン</button>
            </form>
        </div>
    );
};

export default LoginPage