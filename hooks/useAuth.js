'use client'
import authenticate from '@/components/Login/authenticate'
import { createContext, useContext, useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import getUser from '@/app/profile/[name]/getUser'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  let initialToken
  if (typeof window !== 'undefined') {
    initialToken = window && window.localStorage.getItem('token')
  }
  const [token, setToken] = useState(initialToken)

  const [tokenDecoded, setTokenDecoded] = useState(
    () => jwt.decode(token) || null
  )
  const [user, setUser] = useState(null)
  const [userStatusCode, setUserStatusCode] = useState(null)
  const [msg, setMsg] = useState(null)

  const handleLogin = async (e, username, password) => {
    e.preventDefault()
    window.localStorage.removeItem('token') // * Remove the token from localStorage if it exists

    if (username === '' || password === '') {
      setMsg('Please provide all fields')
    }

    const auth = await authenticate(username, password)

    // * If credentials are correct, login
    if (auth.status === 200) {
      setToken(auth.text)
      window.localStorage.setItem('token', auth.text)
    }

    // * If credentials are wrong, display a message
    if (auth.status === 400) {
      setMsg(auth.text)
    }
  }

  useEffect(() => {
    if (token) {
      const decoded = jwt.decode(token)
      setTokenDecoded(decoded)
    }
  }, [token])

  const fetchUser = async (username) => {
    const data = await getUser(username)
    setUser(data.text)
    setUserStatusCode(data.status)
  }

  useEffect(() => {
    fetchUser(tokenDecoded?.unique_name)
  }, [tokenDecoded?.unique_name])

  return (
    <AuthContext.Provider
      value={{
        handleLogin,
        token,
        msg,
        tokenDecoded,
        user,
        userStatusCode,
        setUserStatusCode
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
