'use client'

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState
} from 'react'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import axios from 'axios'

import { PropsLogin, PropsRegister, User } from '../types/User'
import { setCookies } from './setCookies'
import { removeCookies } from './removeCookies'
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
  getBusinessById: (id: string) => Promise<Business | null>
  deleteBusinessById: (id: string) => Promise<boolean>
  addBusiness: ({
    dataBusiness
  }: {
    dataBusiness: PropsAddBusiness
  }) => Promise<boolean>
  updateBusiness: ({
    dataBusiness
  }: {
    dataBusiness: PropsAddBusiness
  }) => Promise<boolean>
  updateStatusBusiness: (id: number) => Promise<boolean>
  updateWorkingBusiness: (id: number) => Promise<boolean>
  getWorkingBusiness: () => Promise<Business | null>
}

export const AuthContext = createContext<AuthContextType | null>(null)

const initialBusiness = [
  {
    id: 1,
    name: 'Lo de Toscano',
    description: '11 puntos pibe, una cosa extraordinaria.',
    logo: 'https://www.elguardianmdp.com/img/notas/img_t-3717.jpg',
    is_active: true,
    is_working: true
  },
  {
    id: 2,
    name: 'Business 2',
    is_active: true,
    is_working: false
  },
  {
    id: 3,
    name: 'BOCA BOCA BOCA',
    logo: 'https://a.espncdn.com/i/teamlogos/soccer/500/5.png',
    is_active: true,
    is_working: false
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

      if (
        response.status === 200 ||
        response.status === 204 ||
        response.status === 401
      ) {
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

  async function getBusinessById(id: string) {
    setLoading(true)
    try {
      const response = await axios.get(`${BASE_URL}api/v1/business?id=${id}`, {
        headers: {
          Authorization: token
        }
      })

      if (response.status === 200 || response.status === 204) {
        return response.data
      } else {
        toast({
          title: 'Oh no! Algo salió mal.',
          description: response.statusText
        })
        return null
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Oh no! Algo salió mal.',
        description: error.message
      })
      return null
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
      is_active: false,
      is_working: false,
      metadata
    }

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

        if (dataBusiness.logo || dataBusiness.logoWeb) {
          try {
            const formData = new FormData()
            if (dataBusiness.logo) {
              formData.append('image', dataBusiness.logo)
            }
            if (dataBusiness.logoWeb) {
              formData.append('logo', dataBusiness.logoWeb)
            }
            url = `${BASE_URL}api/v1/attach_business_image`
            const response = await axios.post(
              `${url}?id=${newBusiness.id}`,
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: token
                }
              }
            )

            if (response.status !== 200) {
              toast({
                title: 'Oh no! Algo salió mal.',
                description: response.statusText
              })
              return false
            }
            return true
          } catch (error: any) {
            toast({
              variant: 'destructive',
              title: 'Oh no! Algo salió mal.',
              description: error.message
            })
            return false
          }
        } else {
          return true
        }
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

  async function updateBusiness({
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
      id: dataBusiness.id,
      name: dataBusiness.name,
      description: dataBusiness.description,
      email: dataBusiness.email,
      address: dataBusiness.address,
      phone: dataBusiness.phone,
      instagram: dataBusiness.instagram,
      facebook: dataBusiness.facebook,
      is_active: false,
      is_working: false,
      metadata
    }

    let url = `${BASE_URL}api/v1/business?id=${dataBusiness.id}`
    try {
      const response = await axios.put(
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

      if (response.status === 200) {
        const filterBusinesses = businesses.filter((b) => b.id !== data.id)
        const index = businesses.findIndex((b) => b.id === data.id)
        const newBusinesses = [
          ...filterBusinesses.slice(0, index),
          data,
          ...filterBusinesses.slice(index)
        ]
        setBusinesses(newBusinesses)
        /* revalidatePath('/panel-de-control/negocios') */
        if (dataBusiness.logo || dataBusiness.logoWeb) {
          try {
            const formData = new FormData()
            if (dataBusiness.logo) {
              formData.append('image', dataBusiness.logo)
            }
            if (dataBusiness.logoWeb) {
              formData.append('logo', dataBusiness.logoWeb)
            }
            url = `${BASE_URL}api/v1/attach_business_image`
            const response = await axios.post(
              `${url}?id=${data.id}`,
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: token
                }
              }
            )

            if (response.status !== 200) {
              toast({
                title: 'Oh no! Algo salió mal.',
                description: response.statusText
              })
              return false
            }
            return true
          } catch (error: any) {
            toast({
              variant: 'destructive',
              title: 'Oh no! Algo salió mal.',
              description: error.message
            })
            return false
          }
        } else {
          return true
        }
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

  async function updateStatusBusiness(id: number): Promise<boolean> {
    setLoading(true)
    let url = `${BASE_URL}api/v1/change_business_status?id=${id}`
    try {
      const response = await axios.put(url, null, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      })

      if (response.status === 200) {
        return true
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

  async function updateWorkingBusiness(id: number): Promise<boolean> {
    setLoading(true)
    let url = `${BASE_URL}api/v1/activate_business_working_status?id=${id}`
    try {
      const response = await axios.put(url, null, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      })

      if (response.status === 200) {
        return true
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

  async function deleteBusinessById(id: string) {
    setLoading(true)
    try {
      const response = await axios.delete(
        `${BASE_URL}api/v1/business?id=${id}`,
        {
          headers: {
            Authorization: token
          }
        }
      )

      if (response.status === 200 || response.status === 204) {
        toast({
          title: `Negocio con id:'${id}' eliminado.`,
          className: 'bg-green-600'
        })
        return true
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

  async function getWorkingBusiness() {
    return businesses[0]
    setLoading(true)
    try {
      const response = await axios.get(`${BASE_URL}api/v1/business_working`, {
        headers: {
          Authorization: token
        }
      })

      if (response.status === 200 || response.status === 204) {
        return response.data
      } else {
        toast({
          title: 'Oh no! Algo salió mal.',
          description: response.statusText
        })
        return null
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Oh no! Algo salió mal.',
        description: error.message
      })
      return null
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
        getBusinessById,
        deleteBusinessById,
        addBusiness,
        updateBusiness,
        updateStatusBusiness,
        updateWorkingBusiness,
        getWorkingBusiness
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
