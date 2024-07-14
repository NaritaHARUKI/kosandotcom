'use client'
import React from 'react'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import InputController from '../componets/InputController'
import UserModules from '../module/UserModule'

const RegisterUserPage = () => {
  const { control, handleSubmit, watch } = useForm();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    await UserModules.registerUser(data.name, data.email, data.password)
  }

  return (
    <div>
      <h1>Register User</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputController name="name" control={control} label="名前" rules={{ required: '名前は必須です' }} placeholder="名前" />
        <InputController name="email" control={control} label="メールアドレス" rules={{ required: 'メールアドレスは必須です' }} placeholder="メールアドレス" />
        <InputController name="password" control={control} label="パスワード" rules={{ required: 'パスワードは必須です' }} placeholder="パスワード" />
        <InputController 
          name="passwordConfirmation" 
          control={control} label="パスワード確認" 
          rules={{ 
            required: 'パスワード確認は必須です',
            validate: (value: string) => value === watch('password') || 'パスワードが一致しません'
           }} 
          placeholder="パスワード確認" />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default RegisterUserPage