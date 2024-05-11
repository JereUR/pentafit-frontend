'use client'

import { Button } from '@/components/ui/button'
import useUser from '../hooks/useUser'
import { useState } from 'react'
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'

export default function RecoverForm() {
  const { updatePassword, loading } = useUser()
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="w-[60vw] shadow-sm p-8 flex flex-col gap-4">
      <h2 className="text-4xl font-bold text-center m-4 text-foreground">
        Reestablecer Contraseña
      </h2>
      <form action={updatePassword} className="py-6">
        <div className="flex flex-col gap-4 mb-[2vh]">
          <label htmlFor="password" className="text-lg font-extralight">
            Nueva Contraseña
          </label>
          <div className="relative">
            <input
              type={`${showPassword ? 'text' : 'password'}`}
              name="password"
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
