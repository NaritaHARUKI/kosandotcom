'use client'
import React, { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { Input } from 'antd';
import styled from 'styled-components';

interface ControlledInputProps {
    name: string;
    control: Control;
    label: string;
    rules: any;
    placeholder: string;
    type?: 'text' | 'password';
    defaultValue?: string
}

//nameにpasswordが含まれている場合はパスワード入力欄を表示
const InputController: React.FC<ControlledInputProps> = ({ control, name, label, rules, ...rest }) => {
    if(name.includes('password')) {
        return (
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field , fieldState: { error } }) => (
                    <>
                        <Input.Password
                            {...field}
                            {...rest}
                        />
                        {error && <StyledError>{error.message}</StyledError>}
                    </>
                    
                )}
            />
        )
    }
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

export default InputController

const StyledError = styled.span`
    color: red;
    font-size: 12px;
`
