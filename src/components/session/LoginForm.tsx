'use client'

import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import Link from 'next/link'

import { Button } from '../ui/button'
import useUser from '../hooks/useUser'
import ForgotPasswordModal from './ForgotPasswordModal'
import { PropsLogin } from '../types/User'
import Loader from '../Loader'
import ErrorText from '../dashboard/global/ErrorText'
import { useToast } from '../ui/use-toast'

interface FormErrors {
  email?: string
  password?: string
  [key: string]: string | undefined
}

const initialData = {
  email: '',
  password: ''
}

export default function LoginForm() {
  const [dataLogin, setDataLogin] = useState<PropsLogin>(initialData)
  const [showPassword, setShowPassword] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [loginErrors, setLoginErrors] = useState<FormErrors>({
    email: '',
    password: ''
  })
  const { loadingUser, setLoadingUser, userSignIn } = useUser()
  const { toast } = useToast()

  const handleOpenModal = () => {
    setShowModal(true) // Open the modal on click
  }

  const handleCloseModal = () => {
    setShowModal(false) // Close the modal from within or parent
  }

  const validations = () => {
    const errorsForm: FormErrors = {}

    const regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/

    if (!dataLogin.email.trim()) {
      errorsForm.email = `Este campo no debe ser vacío.`
    } else if (!regexEmail.test(dataLogin.email)) {
      errorsForm.email = 'Correo no válido.'
    }

    if (!dataLogin.password.trim()) {
      errorsForm.password = `Ingrese su contraseña.`
    }

    return errorsForm
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDataLogin({ ...dataLogin, [name]: value })
  }

  async function handleAction(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const err = validations()
    setLoginErrors(err)

    if (Object.keys(err).length === 0) {
      setLoadingUser(true)

      try {
        const response = await fetch('/api/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ dataLogin })
        })
        const result = await response.json()
        console.log(response)

        if (response.ok) {
          userSignIn({
            authToken: result.authToken,
            user: result.data.user,
            business: result.data.user.business,
            error: null
          })
          setDataLogin(initialData)
          setLoginErrors({
            email: '',
            password: ''
          })
        }
      } catch (error: any) {
        console.error('Error:', error)
        toast({
          variant: 'destructive',
          title: 'Oh no! Algo salió mal.',
          description: error.message
        })
      } finally {
        setLoadingUser(false)
      }
    }
  }

  return (
    <div className="m-8 px-8">
      <form onSubmit={handleAction}>
        <div className="flex flex-col gap-4 mb-[8vh]">
          <p className="text-3xl font-bold">Iniciar Sesión</p>
          <span>Disfruta de las funcionalidades que ofrecemos</span>
        </div>
        <div className="flex flex-col gap-4 mb-[5vh]">
          <div className="flex gap-4 items-center">
            <label htmlFor="email" className="text-xl font-extralight">
              Email
            </label>
            {loginErrors.email && <ErrorText text={loginErrors.email} />}
          </div>
          <input
            type="email"
            name="email"
            className="bg-transparent border rounded-lg text-xl p-2 focus:outline-none"
            value={dataLogin.email}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-4 mb-[5vh]">
          <div className="flex gap-4 items-center">
            <label htmlFor="password" className="text-xl font-extralight">
              Contraseña
            </label>
            {loginErrors.password && <ErrorText text={loginErrors.password} />}
          </div>
          <div className="relative">
            <input
              type={`${showPassword ? 'text' : 'password'}`}
              name="password"
              className="bg-transparent border rounded-lg text-xl focus:outline-none w-full p-2"
              value={dataLogin.password}
              onChange={handleChange}
            />
            <div
              className="absolute inset-y-0 right-0 flex items-center mr-5 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOpenIcon className="h-5 w-5" />
              ) : (
                <EyeClosedIcon className="h-5 w-5" />
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <span className="font-bold cursor-pointer" onClick={handleOpenModal}>
            ¿Olvidaste tu contraseña?
          </span>
        </div>
        <Button
          type="submit"
          className="bg-primary-orange-600 w-full my-[5vh] py-6 text-xl transition duration-300 ease-in-out hover:bg-primary-orange-700"
        >
          {!loadingUser ? 'Enviar' : <Loader className="mt-[1.8vh]" />}
        </Button>
      </form>
      {showModal && (
        <ForgotPasswordModal isOpen={showModal} onClose={handleCloseModal} />
      )}
      <div className="separator flex justify-center items-center w-full">
        <span className="border w-full block h-1 bg-gray-300 ml-4 mr-2"></span>
        <span className="inline-block w-8 h-8 rounded-full text-center text-gray-400">
          ó
        </span>
        <span className="border w-full block h-1 bg-gray-300 mr-4 ml-2"></span>
      </div>
      <div>
        <Link href={'/registrarse'}>
          <Button className="bg-background text-foreground border border-sky-600 w-full my-[5vh] py-6 text-xl transition duration-300 ease-in-out hover:bg-sky-600 dark:hover:bg-sky-700 hover:border-foreground">
            Registrarse
          </Button>
        </Link>
      </div>
    </div>
  )
}
