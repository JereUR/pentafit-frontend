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
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [session, setSession] = useState<any | null>(null)
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
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user: { email, password } })
      })

      if (!response.ok) {
        throw new Error('Login failed') // Handle non-2xx status codes
      }

      const data = await response.json()

      if (data?.success) {
        const authToken = data.token
        localStorage.setItem('token', authToken) // Store token securely
        setToken(authToken)
        setUser(data.user)
        router.push('/panel-de-control')
      } else {
        throw new Error('Login failed: ' + data?.message) // Handle failed login with error message (if provided)
      }
    } catch (error) {
      console.error('Login error:', error)
      if (error instanceof Error) {
        return error
      } else {
        console.error('Unexpected error:', error)
        throw new Error('An unexpected error occurred during login.')
      }
    }
  }

  async function logout() {
    try {
      const response = await fetch('http://localhost:3000/logout')

      if (!response.ok) {
        throw new Error('Logout failed') // Handle non-2xx status codes
      }

      const data = await response.json()

      if (data?.success) {
        setSession(null)
        localStorage.removeItem('token')
        if (pathname === '/') {
          window.location.reload()
          return
        }
        localStorage.setItem('isLoggedOut', 'true')
        router.push('/')
      } else {
        throw new Error('Logout failed: ' + data?.message) // Handle failed login with error message (if provided)
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
