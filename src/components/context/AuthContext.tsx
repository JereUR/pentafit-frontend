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
    /* null */ {
      id: 1,
      name: 'Jeremías',
      last_name: 'Dominguez Vega',
      email: 'jeremias.jdv@gmail.com',
      photo_url: '/assets/profile-photo.png',
      token: 'Bearer 1234'
    }
  )
  const [token, setToken] = useState<string | null>(null)
  const [recoverState, setRecoverState] = useState<boolean>(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      setToken(storedToken)
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

  async function login(formData: FormData): Promise<void | Error> {
    const { email, password } = Object.fromEntries(formData)

    try {
      const response = await axios.post(
        'https://9db6-190-191-171-9.ngrok-free.app/login',
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

      console.log(response)

      if (!response.data.jwt) {
        throw new Error('Login failed')
      }

      const authToken = response.data.jwt
      localStorage.setItem('token', authToken)

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
        'https://9db6-190-191-171-9.ngrok-free.app/logout',
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
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user })
      })

      if (!response.ok) {
        throw new Error('Register failed') // Handle non-2xx status codes
      }

      const data = await response.json()

      if (data?.success) {
        const authToken = data.token
        localStorage.setItem('token', authToken) // Store token securely
        setToken(authToken)
        setUser(data.user)
        router.push('/panel-de-control')
      } else {
        throw new Error('Register failed: ' + data?.message) // Handle failed login with error message (if provided)
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
