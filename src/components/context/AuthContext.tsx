'use client'

import { createContext, ReactNode, useEffect, useState } from 'react'
import { User } from '../types/User'

type AuthContextType = {
  user: User | null
  token: string | null
  login: (formData: FormData) => void
  logout: (email: string) => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export default function AuthContextProvider({
  children
}: {
  children: ReactNode
}) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setToken(token)
    }
  }, [])
  

  function login(formData: FormData) {
    const { email, password } = Object.fromEntries(formData)
    const user = { email, password }
    console.log(user)
    const data = fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user})
    })
      .then((res) => {
        res.json()
        localStorage.setItem('token',res.headers.get('Authorization'))
      })
      .then((data) => {
        console.log(data)
        if (data?.success) {
          console.log('success');
          // setUser(data.user)
          // setToken(data.token)
        }
      })
      .catch((error) => console.error(error))
  }

  const logout = (email: string) => {}

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
