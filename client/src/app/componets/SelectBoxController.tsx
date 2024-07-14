'use client'
import React, { FC } from 'react'
import { Control, Controller } from 'react-hook-form'
import { Select } from 'antd'
import styled from 'styled-components'

interface ControlledSelectBoxProps {
    name: string;
    placeholder: string;
    control: Control;
    label: string;
    rules: any;
    options: { value: string; label: string }[];
}

const SelectBoxController: React.FC<ControlledSelectBoxProps> = ({ control, placeholder,name, label, rules, options }) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState: { error } }) => (
                <>
                    <Select
                        {...field}
                        options={options}
                        style={{ width: '100%' }}
                        placeholder={placeholder}
                    />
                    {error && <StyledError>{error.message}</StyledError>}
                </>
            )}
        />
    )
}

export default SelectBoxController

const StyledError = styled.span`
    color: red;
    font-size: 12px;
`