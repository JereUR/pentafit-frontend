'use client'

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState
} from 'react'

import { User } from '../types/User'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { setCookies } from './setCookies'
import { removeCookies } from './removeCookies'
import axios from 'axios'

type AuthContextType = {
  user: User | null
  token: string | null
  recoverState: boolean
  setRecoverState: Dispatch<SetStateAction<boolean>>
  signIn: (formData: FormData) => Promise<void | Error>
  signOut: () => void
  signUp: (formData: FormData) => Promise<void | Error>
  recover: (formData: FormData) => Promise<void | Error>
  updatePassword: (formData: FormData) => Promise<void | Error>
}

export const AuthContext = createContext<AuthContextType | null>(null)

export default function AuthContextProvider({
  children
}: {
  children: ReactNode
}) {
  const [user, setUser] = useState<User | null>(
    null /* {
      id: 1,
      first_name: 'Jeremías',
      last_name: 'Dominguez Vega',
      email: 'jeremias.jdv@gmail.com',
      photo_url: '/assets/profile-photo.png',
      token: 'Bearer 1234'
    } */
  )
  const [token, setToken] = useState<string | null>(null)
  const [recoverState, setRecoverState] = useState<boolean>(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    let userFromStorage

    try {
      userFromStorage = JSON.parse(localStorage.getItem('user') || 'null')
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error)
    }

    if (storedToken && userFromStorage) {
      setToken(storedToken)
      setUser(userFromStorage)
    }
  }, [])

  async function signIn(formData: FormData) {
    const { email, password } = Object.fromEntries(formData)
    try {
      const response = await axios.post(
        'https://6448-190-191-171-9.ngrok-free.app/login',
        {
          user: {
            email,
            password
          }
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.status === 200 || response.status === 204) {
        const authToken = response.headers.authorization
        setCookies(authToken)
        localStorage.setItem('token', authToken)
        localStorage.setItem('user', JSON.stringify(response.data.user))

        setToken(authToken)
        setUser(response.data.user)
        setTimeout(() => {
          router.push('/panel-de-control')
        }, 100)
      } else {
        throw new Error('Sign in failed')
      }
    } catch (error: any) {
      console.error('Sign in error:', error)

      if (error.response && error.response.status >= 400) {
        throw new Error(
          `sign in failed: ${error.response.data.message || 'Server error'}`
        )
      } else {
        throw new Error('An unexpected error occurred during sign in.')
      }
    }
  }

  async function signOut() {
    try {
      const response = await axios.delete(
        'https://6448-190-191-171-9.ngrok-free.app/logout',
        {
          headers: {
            Authorization: token
          }
        }
      )

      if (response.status === 200 || response.status === 204) {
        removeCookies()
        setUser(null)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        if (pathname === '/') {
          window.location.reload()
          return
        }
        localStorage.setItem('isLoggedOut', 'true')
        router.push('/')
      } else {
        throw new Error('Sign out failed')
      }
    } catch (error) {
      console.error('Sign out error:', error)
      if (error instanceof Error) {
        return error
      } else {
        console.error('Unexpected error:', error)
        throw new Error('An unexpected error occurred during sign out.')
      }
    }
  }

  async function signUp(formData: FormData): Promise<void | Error> {
    const { first_name, last_name, email, gender, date, password } =
      Object.fromEntries(formData)

    const user = {
      first_name,
      last_name,
      email,
      gender,
      date,
      password
    }
    try {
      const response = await axios.post(
        'https://6448-190-191-171-9.ngrok-free.app/signup',
        {
          user
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.status === 200 || response.status === 204) {
        const authToken = response.headers.authorization
        setCookies(authToken)
        localStorage.setItem('token', authToken)
        localStorage.setItem('user', JSON.stringify(response.data))

        setToken(authToken)
        setUser(response.data)
        setTimeout(() => {
          router.push('/panel-de-control')
        }, 100)
      } else {
        throw new Error('Sign up failed')
      }
    } catch (error) {
      console.error('Sign up error:', error)
      if (error instanceof Error) {
        return error
      } else {
        console.error('Unexpected error:', error)
        throw new Error('An unexpected error occurred during sign up.')
      }
    }
  }

  async function recover(formData: FormData): Promise<void | Error> {
    const { email } = Object.fromEntries(formData)

    try {
      await fetch('http://localhost:3000/recover', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      })
        .then((response) => response.json())
        .then((data) => {
          if (data?.success) {
            console.log('Recovery email sent successfully!')
            setRecoverState(true)
          } else {
            console.error('Recovery failed:', data?.message)
            setRecoverState(false)
            throw new Error('Recover failed: ' + data?.message)
          }
        })
    } catch (error) {
      console.error('Recovery error:', error)
      setRecoverState(false)
      throw new Error('An unexpected error occurred during recover.')
    }
  }

  async function updatePassword(formData: FormData): Promise<void | Error> {
    const { password, confirm_password } = Object.fromEntries(formData)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        recoverState,
        setRecoverState,
        signIn,
        signOut,
        signUp,
        recover,
        updatePassword
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
