'use client'
import React, { useState } from 'react'
import InputController from '../componets/InputController'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import getUser from '../componets/hooks/getUser'
import QRMoudle from '../module/QRModule'

const CreateQR = () => {
    const user = getUser()
    const { control, handleSubmit } = useForm()
    const [qrCode, setQrCode] = useState('')

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            const response = await QRMoudle.createQR(data.name, data.location, user.email)
            const responseData = await response.json()
            setQrCode(responseData.qrCode)
        } catch (error) {
            console.error('Create QR failed', error)
        }
    }


    return (
        <div>
            Create QR
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputController label="name" control={control} name='name' rules={{ required: 'は必須です' }} placeholder='name'/>
                <InputController label="location" control={control} name='location' rules={{ required: 'は必須です' }} placeholder='location'/>
                <button type='submit'>Create QR</button>
            </form>

            {qrCode && <img src={qrCode} alt='QR Code'/>}
        </div>
    )
}

export default CreateQR