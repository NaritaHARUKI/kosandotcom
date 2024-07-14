'use client'
import React, { FC } from 'react'
import { Control, Controller } from 'react-hook-form'
import { Input } from 'antd'
import styled from 'styled-components'

interface ControlledTextareaProps {
    name: string;
    control: Control;
    label: string;
    rules: any;
    placeholder: string;
}

const TextareaController: React.FC<ControlledTextareaProps> = ({ control, name, label, rules, placeholder }) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState: { error } }) => (
                <>
                    <label>{label}</label>
                    <Input.TextArea
                        {...field}
                        placeholder={placeholder}
                    />
                    {error && <StyledError>{error.message}</StyledError>}
                </>
            )}
        />
    )
}

export default TextareaController

const StyledError = styled.span`
    color: red;
    font-size: 12px;
`