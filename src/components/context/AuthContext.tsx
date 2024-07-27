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

import {
  PropsRegister,
  PropsUpdatePassword,
  PropsUpdateProfile,
  User
} from '../types/User'
import { useToast } from '../ui/use-toast'
import { Business, PropsAddBusiness } from '../types/Business'
import { customUser, initialBusiness } from '../db/AuthData'

type AuthContextType = {
  user: User | null
  businesses: Business[] | []
  token: string | null
  recoverState: boolean
  loadingUser: boolean
  setLoadingUser: Dispatch<SetStateAction<boolean>>
  loadingBusiness: boolean
  setRecoverState: Dispatch<SetStateAction<boolean>>
  userSignIn: ({
    authToken,
    user,
    business,
    error
  }: {
    authToken: string | null
    user: User
    business: Business[]
    error: string | null
  }) => void
  userSignOut: () => void
  signUp: ({ dataRegister }: { dataRegister: PropsRegister }) => Promise<void>
  recover: ({ email }: { email: string }) => Promise<void>
  getProfile: () => Promise<void>
  updateProfilePhoto: ({ imgSrc }: { imgSrc: string }) => Promise<boolean>
  updateProfile: ({
    dataUpdate
  }: {
    dataUpdate: PropsUpdateProfile
  }) => Promise<boolean>
  updatePassword: ({
    dataUpdatePassword
  }: {
    dataUpdatePassword: PropsUpdatePassword
  }) => Promise<boolean>
  getBusinesses: () => Promise<void>
  getBusinessById: (id: string) => Promise<Business | null>
  deleteBusinessById: (id: number) => Promise<boolean>
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

export default function AuthContextProvider({
  children
}: {
  children: ReactNode
}) {
  const [user, setUser] = useState<User | null>(null)
  const [businesses, setBusinesses] = useState<Business[] | []>([])
  const [token, setToken] = useState<string | null>('1234')
  const [recoverState, setRecoverState] = useState<boolean>(false)
  const [loadingUser, setLoadingUser] = useState(false)
  const [loadingBusiness, setLoadingBusiness] = useState(true)
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

  async function userSignIn({
    authToken,
    user,
    business,
    error
  }: {
    authToken: string | null
    user: User
    business: Business[]
    error: string | null
  }) {
    if (error) {
      toast({
        variant: 'destructive',
        title: 'Oh no! Algo salió mal.',
        description: error
      })
      return
    }

    if (authToken) {
      localStorage.setItem('token', authToken)
      localStorage.setItem('user', JSON.stringify(user))

      setToken(authToken)
      setUser(user)
      setBusinesses(business)
      setLoadingUser(false)
      setTimeout(() => {
        router.push('/')
      }, 100)
    }
  }

  async function userSignOut() {
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    if (pathname === '/') {
      window.location.reload()
      return
    }
    localStorage.setItem('isLoggedOut', 'true')
    router.push('/')
  }

  async function signUp({
    dataRegister
  }: {
    dataRegister: PropsRegister
  }): Promise<void> {
    setLoadingUser(true)
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
      setLoadingUser(false)
    }
  }

  async function recover({ email }: { email: string }): Promise<void> {
    setLoadingUser(true)
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
      setLoadingUser(false)
    }
  }

  async function getProfile(): Promise<void> {
    setUser(customUser)
    return
    setLoadingUser(true)
    try {
      const response = await axios.get(`${BASE_URL}api/v1/user`, {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        }
      })
      if (response.status === 200) {
        setUser(response.data)
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
      setLoadingUser(false)
    }
  }

  async function updateProfilePhoto({
    imgSrc
  }: {
    imgSrc: string
  }): Promise<boolean> {
    setLoadingUser(true)
    try {
      const response = await axios.put(
        `${BASE_URL}api/v1/user/photo`,
        { imgSrc },
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json'
          }
        }
      )
      if (response.status === 200 || response.status === 204) {
        toast({
          title: 'Foto actualizada con éxito.',
          description: 'Tu foto de perfil ha sido actualizada.'
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
      setLoadingUser(false)
    }
  }

  async function updateProfile({
    dataUpdate
  }: {
    dataUpdate: PropsUpdateProfile
  }): Promise<boolean> {
    setLoadingUser(true)
    try {
      const response = await axios.put(
        `${BASE_URL}api/v1/user`,
        {
          user: dataUpdate
        },
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.status === 200 || response.status === 204) {
        toast({
          title: 'Perfil actualizado con éxito.',
          description: 'Tus cambios han sido guardados.'
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
      setLoadingUser(false)
    }
  }

  async function updatePassword({
    dataUpdatePassword
  }: {
    dataUpdatePassword: PropsUpdatePassword
  }): Promise<boolean> {
    setLoadingUser(true)
    try {
      const response = await axios.put(
        `${BASE_URL}api/v1/user/password`,
        {
          user: dataUpdatePassword
        },
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json'
          }
        }
      )
      if (response.status === 200 || response.status === 204) {
        toast({
          title: 'Contraseña actualizada con éxito.',
          description: 'Tu contraseña ha sido actualizada.'
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
      setLoadingUser(false)
    }
  }

  async function getBusinesses() {
    setLoadingBusiness(true)

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
      setLoadingBusiness(false)
      /* setBusinesses(initialBusiness) */
    }
  }

  async function getBusinessById(id: string) {
    setLoadingBusiness(true)
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
      setLoadingBusiness(false)
    }
  }

  async function addBusiness({
    dataBusiness
  }: {
    dataBusiness: PropsAddBusiness
  }): Promise<boolean> {
    setLoadingBusiness(true)

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
        const id = response.data.id

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
            const response = await axios.post(`${url}?id=${id}`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: token
              }
            })

            if (response.status === 201) {
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
      setLoadingBusiness(false)
    }
  }

  async function updateBusiness({
    dataBusiness
  }: {
    dataBusiness: PropsAddBusiness
  }): Promise<boolean> {
    setLoadingBusiness(true)

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

            if (response.status === 200 || response.status === 204) {
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
      setLoadingBusiness(false)
    }
  }

  async function updateStatusBusiness(id: number): Promise<boolean> {
    setLoadingBusiness(true)
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
      setLoadingBusiness(false)
    }
  }

  async function updateWorkingBusiness(id: number): Promise<boolean> {
    setLoadingBusiness(true)
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
      setLoadingBusiness(false)
    }
  }

  async function deleteBusinessById(id: number) {
    setLoadingBusiness(true)
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
      setLoadingBusiness(false)
    }
  }

  async function getWorkingBusiness() {
    return initialBusiness[0]
    setLoadingBusiness(true)
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
      setLoadingBusiness(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        businesses,
        token,
        recoverState,
        loadingUser,
        setLoadingUser,
        loadingBusiness,
        setRecoverState,
        userSignIn,
        userSignOut,
        signUp,
        recover,
        getProfile,
        updateProfilePhoto,
        updateProfile,
        updatePassword,
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
