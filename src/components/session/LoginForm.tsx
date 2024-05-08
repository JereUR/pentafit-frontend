'use client'

import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import useUser from '../hooks/useUser'
import ForgotPasswordModal from './ForgotPasswordModal'

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const { signIn } = useUser()

  const handleOpenModal = () => {
    setShowModal(true) // Open the modal on click
  }

  const handleCloseModal = () => {
    setShowModal(false) // Close the modal from within or parent
  }

  return (
    <div className="m-8 px-8">
      <form action={signIn}>
        <div className="flex flex-col gap-4 mb-[8vh]">
          <p className="text-3xl font-bold">Iniciar Sesión</p>
          <span>Disfruta de las funcionalidades que ofrecemos</span>
        </div>
        <div className="flex flex-col gap-4 mb-[5vh]">
          <label htmlFor="email" className="text-xl font-extralight">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="bg-transparent border rounded-md text-xl p-2 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-4 mb-[5vh]">
          <label htmlFor="password" className="text-xl font-extralight">
            Contraseña
          </label>
          <div className="relative">
            <input
              type={`${showPassword ? 'text' : 'password'}`}
              name="password"
              className="bg-transparent border rounded-md text-xl focus:outline-none w-full p-2"
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
        <Button className="bg-primary-orange-600 w-full my-[5vh] py-6 text-xl hover:bg-primary-orange-700">
          Enviar
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
          <Button className="bg-background text-foreground border border-primary-orange-600 w-full my-[5vh] py-6 text-xl hover:bg-primary-orange-100 hover:dark:text-muted">
            Registrarse
          </Button>
        </Link>
      </div>
    </div>
  )
}
