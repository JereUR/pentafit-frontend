'use client'

import { createContext, ReactNode, useState } from 'react'
import { User } from '../types/User'

type AuthContextType = {
  user: User | null
  token: string | null
  login: (email: string, password: string) => void
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

  const login = (email: string, password: string) => {}

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
