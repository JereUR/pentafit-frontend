'use client'

import { createContext, ReactNode, useEffect, useState } from 'react'
import { User } from '../types/User'
import { useRouter } from 'next/navigation'

type AuthContextType = {
  user: User | null
  getToken: () => string | null
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
  const router = useRouter()

  useEffect(() => {
    const token = localStorage?.getItem('token')
    if (token) {
      setToken(token)
    }
  }, [])

  function getToken() {
    return localStorage?.getItem('token') || token
  }

  async function login(formData: FormData) {
    const { email, password } = Object.fromEntries(formData)
    const user = { email, password }
    console.log(user)
    const data = await fetch(
      'https://jsonplaceholder.typicode.com/todos/1' /* , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user })
    } */
    )
      .then((res: any) => {
        res.json()
        /* localStorage.setItem('token', res.headers.get('Authorization')) */
        const token = 'Bearer 12345678'
        localStorage.setItem('token', token)
        setToken(token)
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
      .catch((error) => console.error(error))
  }

  const logout = (email: string) => {}

  return (
    <AuthContext.Provider
      value={{
        user,
        getToken,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
