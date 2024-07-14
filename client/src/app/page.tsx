'use client'
import React from 'react'
import useHomePage from './useHome'

const HomePage = () => {

  const { userData } = useHomePage()

  return (
    <div>
      <h1>Home Page</h1>
      {!userData && <p>ログインしてください</p>}
      {userData && (
        <div>
          <p>welcome!</p>
          <p>{userData.name}</p>
          <p>{userData.email}</p>
          <p>{userData?.isAdministrator ? "管理者です" : "管理者じゃないです" }</p>
          <p>
            {Array.isArray(userData?.attendLives) && userData?.attendLives.map(live => (
              <ul key={live._id}>
                <li>
                  <p>{live.name}</p>
                  <p>{live.location}</p>
                  <p>{live.createdAt}</p>
                </li>
              </ul>
            ))}
          </p>
        </div>
      )}
    </div>
  )
}

export default HomePage


