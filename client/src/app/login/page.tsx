'use client'
import React from 'react'
import InputController from '../componets/InputController'
import useLogin from './useLogin'
import styled from 'styled-components';

const LoginPage: React.FC = () => {

    const { control, handleSubmit, onSubmit } = useLogin()

    return (
        <StyledBackground>
            <StyledTitle>LOGIN</StyledTitle>
            <StyledFormWrapper>
              <form onSubmit={handleSubmit(onSubmit)} style={{marginTop:"50px", padding:"30px"}}>
                <StyledInput>
                    <label>メールアドレス</label>
                    <InputController name='email' control={control} label='メールアドレス' rules={{ required: 'メールアドレスは必須です' }} placeholder='メールアドレス'/>
                </StyledInput>
                <StyledInput>
                    <label style={{marginTop:"150px"}}>パスワード</label>
                    <InputController name='password' control={control} label='パスワード' rules={{ required: 'パスワードは必須です' }} placeholder='パスワード' />
                </StyledInput>
                
                <StyledButton type="submit">ログイン</StyledButton>
            </form>  
            </StyledFormWrapper>
        </StyledBackground>
    );
};

export default LoginPage

const StyledTitle = styled.h2`
    position: absolute;
    font-size: 7vw;
    font-weight: bold;
    left: 15%;

    @media screen and (max-width: 768px) {
        font-size: 20vw;
    }
`
const StyledInput = styled.div`
    margin: 50px 0;
` 

const StyledBackground = styled.div`
position: relative;
  background-color: #fff;
  background-image: 
      linear-gradient(0deg, transparent 24px, #ccc 25px, #ccc 26px, transparent 27px), 
      linear-gradient(90deg, transparent 24px, #ccc 25px, #ccc 26px, transparent 27px);
  background-size: 25px 25px;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`
const StyledFormWrapper = styled.div`
    position: relative;
    width: 70%;
    height: 70%;
    left: 15%;
    top: 20%;
`
const StyledButton = styled.button`
    position: absolute;
    left: 40%;
    top: 80%;
    width: 20%;
    height: 10vh;
    background-color: #fff;
    border: 1px solid #000;
    border-radius: 5px;
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
    color: #000;
    transition: all 0.3s;
    &:hover {
        background-color: #000;
        color: #fff;
    }

    @media screen and (max-width: 768px) {
        width: 40%;
        left: 30%;
    }
`