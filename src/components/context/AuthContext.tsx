'use client'

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState
} from 'react'

import { PropsLogin, PropsRegister, User } from '../types/User'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { setCookies } from './setCookies'
import { removeCookies } from './removeCookies'
import axios from 'axios'
import { useToast } from '../ui/use-toast'
import { Business, PropsAddBusiness } from '../types/Business'

type AuthContextType = {
  user: User | null
  businesses: Business[] | []
  token: string | null
  recoverState: boolean
  loading: boolean
  setRecoverState: Dispatch<SetStateAction<boolean>>
  signIn: ({ dataLogin }: { dataLogin: PropsLogin }) => Promise<void>
  signOut: () => Promise<void>
  signUp: ({ dataRegister }: { dataRegister: PropsRegister }) => Promise<void>
  recover: ({ email }: { email: string }) => Promise<void>
  getBusinesses: () => Promise<void>
  addBusiness: ({
    dataBusiness
  }: {
    dataBusiness: PropsAddBusiness
  }) => Promise<boolean>
}

export const AuthContext = createContext<AuthContextType | null>(null)

const initialBusiness = [
  {
    id: 1,
    name: 'Gimnasio Chupete',
    isActive: true,
    isWorking: true
  },
  {
    id: 2,
    name: 'Business 2',
    isActive: false,
    isWorking: false
  },
  {
    id: 3,
    name: 'BOCA BOCA BOCA',
    isActive: true,
    isWorking: false
  }
]

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
  const [businesses, setBusinesses] = useState<Business[] | []>([])
  const [token, setToken] = useState<string | null>(null)
  const [recoverState, setRecoverState] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL

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

  async function signIn({ dataLogin }: { dataLogin: PropsLogin }) {
    setLoading(true)
    console.log("test");
    try {
      const response = await axios.post(
        `${BASE_URL}login`,
        {
          user: {
            email: dataLogin.email,
            password: dataLogin.password
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
        setBusinesses(response.data.user.business)
        setTimeout(() => {
          router.push('/panel-de-control')
        }, 100)
      } else {
        console.log(response)
        toast({
          title: 'Oh no! Algo salió mal.',
          description: response.statusText
        })
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        toast({
          title: 'Oh no! Algo salió mal.',
          description: 'Credenciales incorrectas.'
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'Oh no! Algo salió mal.',
          description: error.message
        })
      }
    } finally {
      setLoading(false)
    }
  }

  async function signOut() {
    setLoading(true)
    try {
      const response = await axios.delete(`${BASE_URL}logout`, {
        headers: {
          Authorization: token
        }
      })

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
        toast({
          title: 'Oh no! Algo salió mal.',
          description: response.statusText
        })
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Oh no! Algo salió mal.',
        description: error.message
      })
    } finally {
      setLoading(false)
    }
  }

  async function signUp({
    dataRegister
  }: {
    dataRegister: PropsRegister
  }): Promise<void> {
    setLoading(true)
    const user = {
      first_name: dataRegister.first_name,
      last_name: dataRegister.last_name,
      email: dataRegister.email,
      gender: dataRegister.gender,
      date: dataRegister.date,
      password: dataRegister.password
    }
    try {
      const response = await axios.post(
        `${BASE_URL}signup`,
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
        toast({
          title: 'Usuario creado con éxito.',
          description:
            'Se te ha enviado un mail a tu correo electrónico para verificar tu cuenta.'
        })
      } else {
        toast({
          title: 'Oh no! Algo salió mal.',
          description: response.statusText
        })
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Oh no! Algo salió mal.',
        description: error.message
      })
    } finally {
      setLoading(false)
    }
  }

  async function recover({ email }: { email: string }): Promise<void> {
    setLoading(true)
    try {
      const response = await axios.post(
        `${BASE_URL}recover`,
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
        toast({
          title: 'Oh no! Algo salió mal.',
          description: response.statusText
        })
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Oh no! Algo salió mal.',
        description: error.message
      })
    } finally {
      setLoading(false)
    }
  }

  async function getBusinesses() {
    setLoading(true)
    try {
      const response = await axios.get(`${BASE_URL}api/v1/businesses`, {
        headers: {
          Authorization: token
        }
      })

      if (response.status === 200 || response.status === 204) {
        console.log(response)
        if (response.data instanceof Array) {
          setBusinesses(response.data)
        }
      } else {
        toast({
          title: 'Oh no! Algo salió mal.',
          description: response.statusText
        })
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Oh no! Algo salió mal.',
        description: error.message
      })
    } finally {
      setLoading(false)
    }
  }

  async function addBusiness({
    dataBusiness
  }: {
    dataBusiness: PropsAddBusiness
  }): Promise<boolean> {
    setLoading(true)

    const metadata = {
      title: dataBusiness.title,
      primary_color: dataBusiness.primary_color,
      secondary_color: dataBusiness.secondary_color,
      third_color: dataBusiness.third_color,
      slogan: dataBusiness.slogan
    }

    const data = {
      name: dataBusiness.name,
      description: dataBusiness.description,
      email: dataBusiness.email,
      address: dataBusiness.address,
      phone: dataBusiness.phone,
      instagram: dataBusiness.instagram,
      facebook: dataBusiness.facebook,
      isActive: false,
      isWorking: false,
      metadata
    }

    console.log(data)

    let url = `${BASE_URL}api/v1/business`
    try {
      const response = await axios.post(
        url,
        {
          data
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          }
        }
      )

      if (response.status === 201) {
        const newBusiness: Business = {
          id: response.data.id,
          ...data
        }

        const newBusinesses = [...businesses, newBusiness]
        setBusinesses(newBusinesses)
        /* revalidatePath('/panel-de-control/negocios') */
        return true

        /* try {
          const formData = new FormData()
          formData.append('image', dataBusiness.logo)
          console.log(dataBusiness.logo)
          url = `${BASE_URL}api/v1/business_photo`
          const response = await axios.post(
            `${url}?id=${newBusiness.id}`,

            {
              body: formData
            },
            {
              headers: {
                Authorization: token
              }
            }
          )

          if (response.status !== 201) {
            toast({
              title: 'Oh no! Algo salió mal.',
              description: response.statusText
            })
            return false
          }
        } catch (error: any) {
          toast({
            variant: 'destructive',
            title: 'Oh no! Algo salió mal.',
            description: error.message
          })
          return false
        } */
      } else {
        toast({
          title: 'Oh no! Algo salió mal.',
          description: response.statusText
        })
        return false
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Oh no! Algo salió mal.',
        description: error.message
      })
      return false
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        businesses,
        token,
        recoverState,
        loading,
        setRecoverState,
        signIn,
        signOut,
        signUp,
        recover,
        getBusinesses,
        addBusiness
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
