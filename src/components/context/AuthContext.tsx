'use client'

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState
} from 'react'
import axios from 'axios'

import { User } from '../types/User'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { loginServer } from './loginServer'
/* import { loginServer } from '@/lib/loginServer' */

type AuthContextType = {
  user: User | null
  token: string | null
  getSession: () => Promise<any | null>
  recoverState: boolean
  setRecoverState: Dispatch<SetStateAction<boolean>>
  login: (formData: FormData) => Promise<void | Error>
  logout: () => void
  register: (formData: FormData) => Promise<void | Error>
  recover: (formData: FormData) => Promise<void | Error>
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

  async function getSession(): Promise<any | null> {
    let session = null
    await fetch('https://jsonplaceholder.typicode.com/users/1')
      .then((response) => response.json())
      .then((json) => {
        session = json
      })

    return { session }
  }

  async function login(formData: FormData) {
    try {
      const response = await loginServer(formData)

      console.log(response)
      if (response instanceof Error) {
        throw new Error('Login failed')
      }

      const authToken = response.data.jwt
      localStorage.setItem('token', authToken)
      localStorage.setItem('user', JSON.stringify(response.data.user))

      setToken(authToken)
      setUser(response.data.user)
      router.push('/panel-de-control')
    } catch (error: any) {
      console.error('Login error:', error)

      if (error.response && error.response.status >= 400) {
        throw new Error(
          `Login failed: ${error.response.data.message || 'Server error'}`
        )
      } else {
        throw new Error('An unexpected error occurred during login.')
      }
    }
  }

  async function logout() {
    try {
      const response = await axios.delete(
        'https://7beb-190-191-171-9.ngrok-free.app/users/sign_out',
        {
          headers: {
            Authorization: token
          }
        }
      )

      if (response.status === 200 || response.status === 204) {
        setUser(null)
        localStorage.removeItem('token')
        if (pathname === '/') {
          window.location.reload()
          return
        }
        localStorage.setItem('isLoggedOut', 'true')
        router.push('/')
      } else {
        throw new Error('Logout failed:', response.data)
      }
    } catch (error) {
      console.error('Logout error:', error)
      if (error instanceof Error) {
        return error
      } else {
        console.error('Unexpected error:', error)
        throw new Error('An unexpected error occurred during logout.')
      }
    }
  }

  async function register(formData: FormData): Promise<void | Error> {
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
        'https://7beb-190-191-171-9.ngrok-free.app/users',
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
        const authToken = response.data.token
        localStorage.setItem('token', authToken)
        localStorage.setItem('user', JSON.stringify(response.data))

        setToken(authToken)
        setUser(response.data)
        router.push('/panel-de-control')
      } else {
        throw new Error('Register failed: ' + response.data?.message)
      }
    } catch (error) {
      console.error('Register error:', error)
      if (error instanceof Error) {
        return error
      } else {
        console.error('Unexpected error:', error)
        throw new Error('An unexpected error occurred during register.')
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

  console.log(user)

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        getSession,
        recoverState,
        setRecoverState,
        login,
        logout,
        register,
        recover
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
