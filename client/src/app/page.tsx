'use client'
import React, { useEffect } from 'react'
import useHomePage from './useHome'
import styled from 'styled-components'
import { useRouter } from 'next/navigation'

const HomePage = () => {

  const { userData } = useHomePage()
  const router = useRouter()

  return (
    <>
      <StyledBackground>
        <StyledHeader>
          <img src="/top_logo.webp" alt="logo" style={{ width: '130px', height: '130px' }}/>
          <div style={{display:"flex", alignItems:"center"}}>
            <StyledLink onClick={() => router.push('/showBand')}>探す</StyledLink>
            {userData?.isAdministrator && (
              <StyledLink onClick={() => router.push('/editBand')}>編集する</StyledLink>
            )}
            {userData ? (
              <StyledButton onClick={() => router.push('/profile')}>プロフィール</StyledButton>
            ) : (
              <StyledButton onClick={() => router.push('/login')}>ログイン</StyledButton>
            )}
          </div>
        </StyledHeader>
        <StyledHeadfhone src="/headphone.webp" alt="headphone"/>
        <StyledTopLogo src="/top_logo.webp" alt="logo"/>
        <StyledMessage>
          今日から、<br/>
          <span className="underline">古参。</span>
        </StyledMessage>
      </StyledBackground>

      <StyledBackground2>
        <StyledMessage2>
          古参ドットコムは、未来のスーパースターと、未来のスーパースターを見つけたあなたを応援するサイトです<br/>
        </StyledMessage2>
        <StyledMessageContent>
          古参ドットコムで、未来のスーパースターを見つけましょう！<br/>
          このサイトには、未来のスーパースターが投稿した音楽やライブ映像がたくさん掲載されています。<br/><br/>
          古参ドットコムで、QRコードを読み込むことであのバンドのあのライブに参加したことを証明することができます！<br/>
          スターへの階段を登っていく過程を、古参ドットコムを使って共有しましょう！<br/><br/>
          古参ドットコムの基本利用に必要なのは、パッションだけです。<br/>
          利用料は必要ありません。いつか大きくなる様子を一緒に応援しています。<br/><br/>

        </StyledMessageContent>
        <StyledGuiter src="/guiter.webp" alt="guiter"/>
        <StyledFan src="/fan.webp" alt="fan"/>
      </StyledBackground2>

      <StyledFotter/>
    </>
    
  )
}

export default HomePage

//
const StyledHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  margin: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 100;
  background-color: white;
  overflow: hidden;
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
  scroll-behavior: smooth;
`
const StyledMessage = styled.div`
  position: absolute;
  top: 40%;
  left: 20%;
  font-size: 50px;
  color: #333;
  font-weight: bold;

  .underline {
    position: relative;
    display: inline-block;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .underline::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -10px; /* Adjust as needed */
    width: 50%;
    height: 24px; /* Adjust as needed */
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 16"><path d="M0,12 C40,4 80,12 120,8 C160,4 200,12 240,8" stroke="rgba(246,89,115,1)" fill="none" stroke-width="4" stroke-linecap="round"/></svg>') repeat-x;
    background-size: 250px 16px;
  }
`

const StyledHeadfhone = styled.img`
  position: absolute;
  top: 55%;
  right: 15%;
  width: 200px;
  height: 200px;
  animation: tiltAndShake 5s infinite;
  z-index: 3;

  @keyframes tiltAndShake {
            0% {
                transform: rotate(0deg);
            }
            60% {
                transform: rotate(5deg); 
            }
            62% {
                transform: rotate(3deg); 
            }
            64% {
                transform: rotate(7deg);
            }
            66% {
                transform: rotate(3deg);
            }
            68% {
                transform: rotate(7deg);
            }
            60% {
                transform: rotate(5deg);
            }
            100% {
                transform: rotate(0deg);
            }
        }
`
const StyledTopLogo = styled.img`
  position: absolute;
  top: 12.5%;
  right: 10%;
  width: 300px;
  height: 300px;
  rotate: 15deg;
  z-index: 3;
`

// This is a second background that has a border around it
const StyledBackground2 = styled.div`
  position: relative;
  height: 90vh;
  width: 100vw;
  scroll-behavior: smooth;

  &:before {
    position: absolute;
    border: 5px solid #333;
    content: "";
    top: 25px;
    bottom: 25px;
    left: 20px;
    right: 20px;
    z-index: 2;
  }
`
const StyledMessage2 = styled.h2`
  position: absolute;
  top: 7.7%;
  left: 7.5%;
  width: 100%;
  font-size: 25px;
  font-weight: 400;
  background-color: white;
  padding: 10px;
  font-weight: bold;
`
const StyledGuiter = styled.img`
  position: absolute;
  bottom: 10%;
  right: 15%;
  width: 200px;
  height: 200px;
  animation: tiltAndShake 5s infinite;
  z-index: 3;
`
const StyledFan = styled.img`
  position: absolute;
  bottom: 10%;
  left: 15%;
  width: 200px;
  height: 200px;
  animation: tiltAndShake 5s infinite;
  z-index: 3;
`
const StyledMessageContent = styled.p`
  position: absolute;
  top: 20%;
  left: 7%;
  font-size: 13px;
  color: #333;
  font-weight: bold;
  padding: 20px;
`
//
const StyledFotter = styled.div`
  width: 100%;
  height: 400px;
  background-color: #333;
`
//
const StyledButton = styled.button`
  padding: 5px 15px;
  background-color: white;
  color: #333;
  font-weight: bold;
  margin: 10px 5px;

  &:hover {
    cursor: pointer;
  }
`
const StyledLink = styled.div`
  margin: 0 10px;

  &:hover {
    cursor: pointer;
  }
`
