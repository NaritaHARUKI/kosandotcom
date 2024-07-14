'use client'
import React, { FC } from 'react'
import { Control, Controller } from 'react-hook-form'
import { Input } from 'antd'
import styled from 'styled-components'

interface ControlledInputProps {
    name: string;
    control: Control;
    label: string;
    rules: any;
    placeholder: string;
    type?: 'text' | 'password';
}

const ImageController: React.FC<ControlledInputProps> = ({ control, name, label, rules, ...rest }) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState: { error } }) => (
                <>
                    <Input
                        {...field}
                        {...rest}
                    />
                    {error && <StyledError>{error.message}</StyledError>}
                </>
            )}
        />
    )
}

export default ImageController

const StyledError = styled.span`
    color: red;
    font-size: 12px;
`
