'use client'

import {
  ArrowLeftIcon,
  EyeClosedIcon,
  EyeOpenIcon
} from '@radix-ui/react-icons'
import { useState } from 'react'
import Link from 'next/link'

import { Button } from '../ui/button'
import useUser from '../hooks/useUser'
import { PropsRegister } from '../types/User'
import Loader from '../Loader'
import ErrorText from '../ErrorText'

interface FormErrors {
  first_name?: string
  last_name?: string
  email?: string
  gender?: string
  date?: string
  password?: string
  confirm_password?: string
  [key: string]: string | undefined
}

const initialData = {
  first_name: '',
  last_name: '',
  email: '',
  gender: '',
  date: '',
  password: '',
  confirm_password: ''
}

export default function RegisterForm() {
  const [dataRegister, setDataRegister] = useState<PropsRegister>(initialData)
  const [showPassword, setShowPassword] = useState(false)
  const [registerErrors, setRegisterErrors] = useState<FormErrors>({
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    date: '',
    password: '',
    confirm_password: ''
  })
  const { signUp, loading } = useUser()

  const validations = ({ dataRegister }: { dataRegister: PropsRegister }) => {
    const errorsForm: FormErrors = {}

    const regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/
    const regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/

    if (!dataRegister.first_name.trim()) {
      errorsForm.first_name = `Este campo no debe ser vacío.`
    } else if (!regexName.test(dataRegister.first_name)) {
      errorsForm.first_name = 'Este campo solo acepta letras y espacios.'
    }

    if (!dataRegister.last_name.trim()) {
      errorsForm.last_name = `Este campo no debe ser vacío.`
    } else if (!regexName.test(dataRegister.last_name)) {
      errorsForm.last_name = 'Este campo solo acepta letras y espacios.'
    }

    if (!dataRegister.email.trim()) {
      errorsForm.email = `Este campo no debe ser vacío.`
    } else if (!regexEmail.test(dataRegister.email)) {
      errorsForm.email = 'Correo no válido.'
    }

    if (dataRegister.gender === null) {
      errorsForm.gender = `Este campo no debe ser vacío.`
    }

    if (!dataRegister.date) {
      errorsForm.date = `Este campo no debe ser vacío.`
    } else {
      let today = new Date()
      let birthDate = new Date(dataRegister.date)

      if (birthDate > today) {
        errorsForm.date =
          'La fecha de nacimiento no puede ser mayor que la fecha actual.'
      } else {
        let age = today.getFullYear() - birthDate.getFullYear()
        let monthDiff = today.getMonth() - birthDate.getMonth()

        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--
        }

        if (age < 18) {
          errorsForm.date = 'Debes tener al menos 18 años para registrarte.'
        }
      }
    }

    if (dataRegister.password.length < 8) {
      errorsForm.password = `La contraseña debe tener más de 8 caracteres.`
    }

    if (dataRegister.password !== dataRegister.confirm_password) {
      errorsForm.password = `La contraseña y su confirmación no coinciden.`
      errorsForm.confirm_password = `La contraseña y su confirmación no coinciden.`
    }

    return errorsForm
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDataRegister({ ...dataRegister, [name]: value })
  }

  async function handleAction(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const err = validations({ dataRegister })
    setRegisterErrors(err)

    if (Object.keys(err).length === 0) {
      await signUp({ dataRegister })
      setRegisterErrors({
        first_name: '',
        last_name: '',
        email: '',
        gender: '',
        date: '',
        password: '',
        confirm_password: ''
      })
    }
  }

  return (
    <div className="m-8 px-8">
      <form onSubmit={handleAction}>
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
          <div className="flex gap-4 items-center">
            <label htmlFor="first_name" className="text-lg font-extralight">
              Nombre/s
            </label>
            {registerErrors.first_name && (
              <ErrorText text={registerErrors.first_name} />
            )}
          </div>
          <input
            type="text"
            name="first_name"
            className="bg-transparent border rounded-md text-lg p-1 focus:outline-none"
            value={dataRegister.first_name}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <div className="flex gap-4 items-center">
            <label htmlFor="last_name" className="text-lg font-extralight">
              Apellido/s
            </label>
            {registerErrors.last_name && (
              <ErrorText text={registerErrors.last_name} />
            )}
          </div>
          <input
            type="text"
            name="last_name"
            className="bg-transparent border rounded-md text-lg p-1 focus:outline-none"
            value={dataRegister.last_name}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-4 mb-[2vh]">
          <div className="flex gap-4 items-center">
            <label htmlFor="email" className="text-lg font-extralight">
              Email
            </label>
            {registerErrors.email && <ErrorText text={registerErrors.email} />}
          </div>
          <input
            type="email"
            name="email"
            className="bg-transparent border rounded-md text-lg p-1 focus:outline-none"
            value={dataRegister.email}
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col gap-4 mb-[2vh] w-1/2">
            <div className="flex gap-4 items-center">
              <label htmlFor="gender" className="text-lg font-extralight">
                Sexo/Género
              </label>
              {registerErrors.gender && (
                <ErrorText text={registerErrors.gender} />
              )}
            </div>
            <div className="flex items-center gap-2 p-4 border rounded-md">
              <input
                type="radio"
                id="gender-masculino"
                name="gender"
                value="Male"
                checked={dataRegister.gender === 'Male'}
                onChange={handleChange}
              />
              <label htmlFor="gender-masculino">Masculino</label>
              <input
                type="radio"
                id="gender-femenino"
                name="gender"
                value="Female"
                checked={dataRegister.gender === 'Female'}
                onChange={handleChange}
              />
              <label htmlFor="gender-femenino">Femenino</label>
              <input
                type="radio"
                id="gender-otros"
                name="gender"
                value="Other"
                checked={dataRegister.gender === 'Other'}
                onChange={handleChange}
              />
              <label htmlFor="gender-otros">Otros</label>
            </div>
          </div>
          <div className="flex flex-col gap-4 mb-[2vh] w-1/2">
            <div className="flex gap-4 items-center">
              <label htmlFor="date" className="text-lg font-extralight">
                Fecha de Nacimiento
              </label>
              {registerErrors.date && <ErrorText text={registerErrors.date} />}
            </div>
            <input
              type="date"
              name="date"
              className="bg-transparent border rounded-md text-lg p-3 pr-[2vh] focus:outline-none"
              value={dataRegister.date}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 mb-[2vh]">
          <div className="flex gap-4 items-center">
            <label htmlFor="password" className="text-lg font-extralight">
              Contraseña
            </label>
            {registerErrors.password && (
              <ErrorText text={registerErrors.password} />
            )}
          </div>
          <div className="relative">
            <input
              type={`${showPassword ? 'text' : 'password'}`}
              name="password"
              className="bg-transparent border w-full rounded-md text-lg p-1 focus:outline-none"
              value={dataRegister.password}
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
        <div className="flex flex-col gap-4 mb-[2vh]">
          <div className="flex gap-4 items-center">
            <label
              htmlFor="confirm_password"
              className="text-lg font-extralight"
            >
              Confirmar Contraseña
            </label>
            {registerErrors.confirm_password && (
              <ErrorText text={registerErrors.confirm_password} />
            )}
          </div>
          <div className="relative">
            <input
              type={`${showPassword ? 'text' : 'password'}`}
              name="confirm_password"
              className="bg-transparent border w-full rounded-md text-lg p-1 focus:outline-none"
              value={dataRegister.confirm_password}
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
        <Button
          type="submit"
          className="bg-primary-orange-600 w-full my-[2vh] py-6 text-xl hover:bg-primary-orange-700"
        >
          {!loading ? 'Enviar' : <Loader className="mt-[2vh]" />}
        </Button>
      </form>
    </div>
  )
}
