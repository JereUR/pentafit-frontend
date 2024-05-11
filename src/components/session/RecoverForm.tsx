'use client'

import { Button } from '@/components/ui/button'
import useUser from '../hooks/useUser'
import { useState } from 'react'
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import { useRouter, useSearchParams } from 'next/navigation'
import axios from 'axios'

export default function RecoverForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()

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

  async function updatePassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
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
    <div className="w-[60vw] shadow-sm p-8 flex flex-col gap-4">
      <h2 className="text-4xl font-bold text-center m-4 text-foreground">
        Reestablecer Contraseña
      </h2>
      <form onSubmit={updatePassword} className="py-6">
        <div className="flex flex-col gap-4 mb-[2vh]">
          <label htmlFor="password" className="text-lg font-extralight">
            Nueva Contraseña
          </label>
          <div className="relative">
            <input
              type={`${showPassword ? 'text' : 'password'}`}
              name="password"
              value={password}
              onChange={handleChangePassword}
              className="bg-transparent border w-full rounded-md text-lg p-1 focus:outline-none"
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
          <label htmlFor="confirm_password" className="text-lg font-extralight">
            Confirmar Contraseña
          </label>
          <div className="relative">
            <input
              type={`${showPassword ? 'text' : 'password'}`}
              name="confirm_password"
              value={confirmPassword}
              onChange={handleChangeConfirmPassword}
              className="bg-transparent border w-full rounded-md text-lg p-1 focus:outline-none"
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
          <Button className="bg-primary-orange-600 h-[5vh] w-[40vw] text-xl m-4 text-foreground rounded-md transition duration-300 ease-in-out hover:bg-primary-orange-700 cursor-pointer">
            Enviar
          </Button>
        </div>
        {loading && 'Procesando...'}
      </form>
    </div>
  )
}
