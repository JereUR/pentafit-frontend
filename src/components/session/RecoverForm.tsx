'use client'

import { Button } from 'components/ui/button'
import { useState } from 'react'
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import { useRouter, useSearchParams } from 'next/navigation'
import axios from 'axios'

import { useToast } from '../ui/use-toast'
import Loader from '../Loader'
import ErrorText from '../dashboard/global/ErrorText'

interface FormErrors {
  password?: string
  confirm_password?: string
  [key: string]: string | undefined
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL

export default function RecoverForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [recoverErrors, setRecoverErrors] = useState<FormErrors>({
    password: '',
    confirm_password: ''
  })
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()

  const handleChangePassword = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPassword(event.target.value)
  }

  const handleChangeConfirmPassword = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setConfirmPassword(event.target.value)
  }

  const validations = () => {
    const errorsForm: FormErrors = {}

    if (password.length < 8) {
      errorsForm.password = `La contraseña debe tener más de 8 caracteres.`
    }

    if (password !== confirmPassword) {
      errorsForm.password = `La contraseña y su confirmación no coinciden.`
      errorsForm.confirm_password = `La contraseña y su confirmación no coinciden.`
    }

    return errorsForm
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const err = validations()
    setRecoverErrors(err)

    if (Object.keys(err).length === 0) {
      await updatePassword()
      setRecoverErrors({
        password: '',
        confirm_password: ''
      })
    }
  }

  async function updatePassword() {
    const token = searchParams.get('reset_password_token')
    setLoading(true)

    const user = {
      user: {
        password,
        password_confirmation: confirmPassword,
        reset_password_token: token
      }
    }

    try {
      const response = await axios.post(`${BASE_URL}recover`, user, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.status === 200 || response.status === 204) {
        router.push('/iniciar-sesion')
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
    }

    setLoading(false)
  }

  return (
    <div className="w-[60vw] shadow-sm p-8 flex flex-col gap-4">
      <h2 className="text-4xl font-bold text-center m-4 text-foreground">
        Reestablecer Contraseña
      </h2>
      <form onSubmit={handleSubmit} className="py-6">
        <div className="flex flex-col gap-4 mb-[2vh]">
          <div className="flex gap-4 items-center">
            <label htmlFor="password" className="text-lg font-extralight">
              Nueva Contraseña
            </label>
            {recoverErrors.password && (
              <ErrorText text={recoverErrors.password} />
            )}
          </div>
          <div className="relative">
            <input
              type={`${showPassword ? 'text' : 'password'}`}
              name="password"
              value={password}
              onChange={handleChangePassword}
              className="bg-transparent border w-full rounded-lg text-lg p-1 focus:outline-none"
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
        <div className="flex flex-col gap-4 mb-[2vh]">
          <div className="flex gap-4 items-center">
            <label
              htmlFor="confirm_password"
              className="text-lg font-extralight"
            >
              Confirmar Contraseña
            </label>
            {recoverErrors.confirm_password && (
              <ErrorText text={recoverErrors.confirm_password} />
            )}
          </div>
          <div className="relative">
            <input
              type={`${showPassword ? 'text' : 'password'}`}
              name="confirm_password"
              value={confirmPassword}
              onChange={handleChangeConfirmPassword}
              className="bg-transparent border w-full rounded-lg text-lg p-1 focus:outline-none"
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
        <div className="flex justify-center">
          <Button className="bg-primary-orange-600 h-[5vh] w-[40vw] text-xl m-4 text-foreground rounded-lg transition duration-300 ease-in-out hover:bg-primary-orange-700 cursor-pointer">
            {!loading ? 'Enviar' : <Loader className="mt-[2vh]" />}
          </Button>
        </div>
      </form>
    </div>
  )
}
