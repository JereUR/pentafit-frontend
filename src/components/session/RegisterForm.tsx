'use client'

import {
  ArrowLeftIcon,
  EyeClosedIcon,
  EyeOpenIcon
} from '@radix-ui/react-icons'
import { useState } from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import useUser from '../hooks/useUser'

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [gender, setGender] = useState('')
  const { signOut } = useUser()

  return (
    <div className="m-8 px-8">
      <form action={signOut}>
        <div className="flex flex-col gap-4 mb-[2vh]">
          <div className="flex gap-4">
            <Link href={'/iniciar-sesion'}>
              <Button className="bg-background border border-foreground hover:bg-slate-100 dark:hover:bg-gray-800">
                <ArrowLeftIcon className="h-4 w-4 text-foreground" />
              </Button>
            </Link>
            <p className="text-3xl font-bold">Registrate</p>
          </div>
          <span>Disfruta de las funcionalidades que ofrecemos</span>
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <label htmlFor="first_name" className="text-lg font-extralight">
            Nombre/s
          </label>
          <input
            type="text"
            name="first_name"
            className="bg-transparent border rounded-md text-lg p-1 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <label htmlFor="last_name" className="text-lg font-extralight">
            Apellido/s
          </label>
          <input
            type="text"
            name="last_name"
            className="bg-transparent border rounded-md text-lg p-1 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-4 mb-[2vh]">
          <label htmlFor="email" className="text-lg font-extralight">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="bg-transparent border rounded-md text-lg p-1 focus:outline-none"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col gap-4 mb-[2vh] w-1/2">
            <label htmlFor="gender" className="text-lg font-extralight">
              Sexo/Género
            </label>
            <div className="flex items-center gap-2 p-4 border rounded-md">
              <input
                type="radio"
                id="gender-masculino"
                name="gender"
                value="Male"
                checked={gender === 'Male'}
                onChange={(e) => setGender(e.target.value)}
              />
              <label htmlFor="gender-masculino">Masculino</label>
              <input
                type="radio"
                id="gender-femenino"
                name="gender"
                value="Female"
                checked={gender === 'Female'}
                onChange={(e) => setGender(e.target.value)}
              />
              <label htmlFor="gender-femenino">Femenino</label>
              <input
                type="radio"
                id="gender-otros"
                name="gender"
                value="Other"
                checked={gender === 'Other'}
                onChange={(e) => setGender(e.target.value)}
              />
              <label htmlFor="gender-otros">Otros</label>
            </div>
          </div>
          <div className="flex flex-col gap-4 mb-[2vh] w-1/2">
            <label htmlFor="date" className="text-lg font-extralight">
              Fecha de Nacimiento
            </label>
            <input
              type="date"
              name="date"
              className="bg-transparent border rounded-md text-lg p-3 pr-[2vh] focus:outline-none"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 mb-[2vh]">
          <label htmlFor="password" className="text-lg font-extralight">
            Contraseña
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
        <Button className="bg-primary-orange-600 w-full my-[2vh] py-6 text-xl hover:bg-primary-orange-700">
          Enviar
        </Button>
      </form>
    </div>
  )
}
