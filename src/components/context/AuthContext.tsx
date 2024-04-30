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
  recoverState: boolean
  setRecoverState: Dispatch<SetStateAction<boolean>>
  login: (formData: FormData) => Promise<void | Error>
  logout: () => void
  register: (formData: FormData) => void | Error
  recover: (formData: FormData) => Error | void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export default function AuthContextProvider({
  children
}: {
  children: ReactNode
}) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [recoverState, setRecoverState] = useState<boolean>(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const token = localStorage?.getItem('token')
    if (token) {
      setToken(token)
    }
  }, [])

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

      /* if (!response.ok) {
        throw new Error('Login failed') // Handle non-2xx status codes
      } */

      const data = await response.json()

      /* if (data?.success) { */
      const authToken = data.token || 'Bearer 12345667' // Use token from response or placeholder
      localStorage.setItem('token', authToken) // Store token securely
      setToken(authToken)

      /*  // Assuming data.user contains user information
        setUser(data.user) */

      console.log('Login successful!')
      router.push('/panel-de-control')
      /* } else {
        throw new Error('Login failed: ' + data?.message) // Handle failed login with error message (if provided)
      } */
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

  const logout = () => {
    localStorage.removeItem('token')
    if (pathname === '/') {
      window.location.reload()
      return
    }
    localStorage.setItem('isLoggedOut', 'true')
    router.push('/')
  }

  function register(formData: FormData): void | Error {
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
      console.log(user)
      router.push('/panel-de-control')
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

  function recover(formData: FormData): void {
    const { email } = Object.fromEntries(formData)
    console.log('Recover for:', email)
    setRecoverState(true)

    /* try {
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
          // Set a temporary state variable to display a message
          setRecoverState('Hemos enviado un mail a tu cuenta...') // Set your desired message
        } else {
          console.error('Recovery failed:', data?.message)
          // Handle failed recovery (optional)
        }
      })
    } catch (error) {
      console.error('Recovery error:', error)
        // Handle errors (optional)
      
    } */
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
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
