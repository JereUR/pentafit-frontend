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
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { setCookies } from './setCookies'
import { removeCookies } from './removeCookies'
import axios from 'axios'

type AuthContextType = {
  user: User | null
  token: string | null
  recoverState: boolean
  loading: boolean
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
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const [recoverState, setRecoverState] = useState<boolean>(false)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

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
    setLoading(true)
    const { email, password } = Object.fromEntries(formData)
    try {
      const response = await axios.post(
        `https://ca9b-190-191-171-9.ngrok-free.app/login`,
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
    } finally {
      setLoading(false)
    }
  }

  async function signOut() {
    setLoading(true)
    try {
      const response = await axios.delete(
        `https://ca9b-190-191-171-9.ngrok-free.app/logout`,
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
    } finally {
      setLoading(false)
    }
  }

  async function signUp(formData: FormData): Promise<void | Error> {
    setLoading(true)
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
        `https://ca9b-190-191-171-9.ngrok-free.app/signup`,
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
    } finally {
      setLoading(false)
    }
  }

  async function recover(formData: FormData): Promise<void | Error> {
    setLoading(true)
    const { email } = Object.fromEntries(formData)

    try {
      const response = await axios.post(
        `https://ca9b-190-191-171-9.ngrok-free.app/recover`,
        {
          user: { email }
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.status === 200 || response.status === 204) {
        setRecoverState(true)
      } else {
        setRecoverState(false)
        throw new Error('Recover failed: ' + response.data?.message)
      }
    } catch (error) {
      console.error('Recovery error:', error)
      setRecoverState(false)
      throw new Error('An unexpected error occurred during recover.')
    } finally {
      setLoading(false)
    }
  }

  async function updatePassword(formData: FormData): Promise<void | Error> {
    const token = searchParams.get('reset_password_token')
    setLoading(true)
    const { password, confirm_password } = Object.fromEntries(formData)

    const user = {
      user: {
        password,
        password_confirmation: confirm_password,
        reset_password_token: token
      }
    }

    try {
      const response = await axios.post(
        `https://ca9b-190-191-171-9.ngrok-free.app/recover`,
        user,
        {
          headers: {
            'Content-Type': 'application/json' // Include Bearer prefix for authorization
          }
        }
      )
      if (response.status === 200 || response.status === 204) {
        console.log('Password update response:', response.data)
        router.push('/iniciar-sesion')
      } else {
        throw new Error('Update password failed: ' + response.data?.message)
      }
    } catch (error) {
      console.error('Password update error:', error)
      throw new Error('An unexpected error occurred during update password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        recoverState,
        loading,
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
