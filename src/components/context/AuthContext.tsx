'use client'

import { createContext, ReactNode, useEffect, useState } from 'react'
import { User } from '../types/User'
import { useRouter } from 'next/navigation'

type AuthContextType = {
  user: User | null
  token: string | null
  login: (formData: FormData) => void
  logout: (email: string) => void
  register: (formDate: FormData) => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export default function AuthContextProvider({
  children
}: {
  children: ReactNode
}) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage?.getItem('token')
    if (token) {
      setToken(token)
    }
  }, [])

  async function login(formData: FormData) {
    const { email, password } = Object.fromEntries(formData)
    const user = { email, password }

    try {
      await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user })
      })
        .then((res: any) => {
          console.log(res.headers.get('Authorization'))
          const token = 'Bearer 12345667'
          /* localStorage.setItem('token', res.headers.get('Authorization')) */
          localStorage.setItem('token', token)
          setToken(token)
          res.json()
        })
        .then((data: any) => {
          console.log(data)
          router.push('/panel-de-control')
          if (data?.success) {
            console.log('success')
            // setUser(data.user)
            // setToken(data.token)
          }
        })
    } catch (error) {
      console.log(error)
    }
  }

  const logout = (email: string) => {}

  function register(formData: FormData) {
    const {
      first_name,
      last_name,
      email,
      gender,
      date,
      password,
      confirm_password
    } = Object.fromEntries(formData)

    const user = {
      first_name,
      last_name,
      email,
      gender,
      date,
      password,
      confirm_password
    }

    console.log(user)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
