'use client'

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import {
  Cross1Icon,
  Cross2Icon,
  EyeClosedIcon,
  EyeOpenIcon
} from '@radix-ui/react-icons'
import { BsCheck2 } from 'react-icons/bs'
import { useSearchParams } from 'next/navigation'

import { Button } from '@/components/ui/button'
import Loader from '@/components/Loader'
import { useToast } from '@/components/ui/use-toast'
import ErrorText from '../global/ErrorText'
import {
  FormErrorsUpdatePassword,
  FormErrorsUpdateProfile,
  initialDataUpdatePassword,
  initialDataUpdateProfile,
  initialErrorsUpdatePassword,
  initialErrorsUpdateProfile,
  PropsUpdatePassword,
  PropsUpdateProfile
} from '@/components/types/User'
import useUser from '@/components/hooks/useUser'
import { posibleGenders } from '@/components/types/Team'

interface Props {
  dataUpdate: PropsUpdateProfile
  setDataUpdate: Dispatch<SetStateAction<PropsUpdateProfile>>
  setShowForm: Dispatch<SetStateAction<boolean>>
}

const UpdateInfoForm: React.FC<Props> = ({
  dataUpdate,
  setDataUpdate,
  setShowForm
}) => {
  const [dataUpdatePassword, setDataUpdatePassword] =
    useState<PropsUpdatePassword>(initialDataUpdatePassword)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [formErrorsProfile, setFormErrorsProfile] =
    useState<FormErrorsUpdateProfile>(initialErrorsUpdateProfile)
  const [formErrorsPassword, setFormErrorsPassword] =
    useState<FormErrorsUpdatePassword>(initialErrorsUpdatePassword)

  const { updateProfile, updatePassword, loadingUser } = useUser()
  const { toast } = useToast()

  const validationsProfile = () => {
    const errors: FormErrorsUpdateProfile = {}

    if (!dataUpdate.first_name.trim()) {
      errors.first_name = 'Este campo es obligatorio.'
    } else {
      if (dataUpdate.first_name.length > 20) {
        errors.first_name = 'El nombre no puede tener más de 20 caracteres.'
      }
    }

    if (!dataUpdate.last_name.trim()) {
      errors.last_name = 'Este campo es obligatorio.'
    } else {
      if (dataUpdate.last_name.length > 20) {
        errors.last_name = 'El apellido no puede tener más de 20 caracteres.'
      }
    }

    if (dataUpdate.phone) {
      if (dataUpdate.phone.toString().length > 20) {
        errors.phone =
          'El número de teléfono no puede tener más de 20 caracteres.'
      }
    }

    if (dataUpdate.address) {
      if (dataUpdate.address.length > 50) {
        errors.address = 'La dirección no puede tener más de 50 caracteres.'
      }
    }

    if (dataUpdate.birthdate) {
      const birthdate = new Date(dataUpdate.birthdate)
      const today = new Date()
      const eighteenYearsAgo = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
      )

      if (birthdate > eighteenYearsAgo) {
        errors.birthdate = 'Debes tener al menos 18 años.'
      }
    }

    return errors
  }

  const validationsPassword = () => {
    const errors: FormErrorsUpdateProfile = {}

    if (dataUpdatePassword.actual_password) {
      if (dataUpdatePassword.new_password) {
        if (!dataUpdatePassword.new_password.trim()) {
          errors.new_password = 'Este campo es obligatorio.'
        } else {
          if (dataUpdatePassword.new_password.length < 8) {
            errors.new_password =
              'La nueva contraseña debe tener al menos 8 caracteres.'
          }
        }
      }

      if (dataUpdatePassword.new_password === '') {
        errors.new_password = 'Este campo es obligatorio.'
      }

      if (
        dataUpdatePassword.new_password &&
        dataUpdatePassword.new_password?.length < 8
      ) {
        errors.new_password =
          'La nueva contraseña debe tener al menos 8 caracteres.'
      }

      if (dataUpdatePassword.confirm_new_password === '') {
        errors.confirm_new_password = 'Este campo es obligatorio.'
      } else if (
        dataUpdatePassword.confirm_new_password !==
        dataUpdatePassword.new_password
      ) {
        errors.confirm_new_password = 'Las contraseñas no coinciden.'
        errors.new_password = 'Las contraseñas no coinciden.'
      }
    }

    return errors
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target
    setDataUpdate({ ...dataUpdate, [name]: value })
    if (value) setFormErrorsProfile({ ...formErrorsProfile, [name]: '' })
  }

  const handleInputChangeProfile = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target
    if (name === 'birthdate') {
      setDataUpdate({ ...dataUpdate, [name]: new Date(value) })
    } else {
      setDataUpdate({ ...dataUpdate, [name]: value })
    }
    if (value) setFormErrorsProfile({ ...formErrorsProfile, [name]: '' })
  }

  const handleInputChangePassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target
    setDataUpdatePassword({ ...dataUpdatePassword, [name]: value })
    if (value) setFormErrorsPassword({ ...formErrorsPassword, [name]: '' })
  }

  const handleClose = () => {
    setDataUpdate(initialDataUpdateProfile)
    setShowForm(false)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const err = validationsProfile()
    setFormErrorsProfile(err)

    if (Object.keys(err).length === 0) {
      const res = await updateProfile({ dataUpdate })
      if (res) {
        toast({
          title: 'Perfil actualizado.',
          className: 'bg-green-600'
        })
        setDataUpdate(initialDataUpdateProfile)
        setFormErrorsProfile(initialErrorsUpdateProfile)
      }
    }
  }

  const handleSubmitPassword = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    const err = validationsPassword()
    setFormErrorsPassword(err)

    if (Object.keys(err).length === 0) {
      const res = await updatePassword({ dataUpdatePassword })
      if (res) {
        toast({
          title: 'Contraseña actualizada.',
          className: 'bg-green-600'
        })
        setDataUpdatePassword(initialDataUpdatePassword)
        setFormErrorsPassword(initialErrorsUpdatePassword)
      }
    }
  }

  return (
    <div className="max-w-lg mx-auto p-4 bg-background overflow-y-auto">
      <div
        className="absolute cursor-pointer top-0 right-0 mt-4 mr-4 trasition duration-300 ease-in-out hover:scale-[1.03]"
        onClick={() => handleClose()}
      >
        <Cross1Icon className="text-red-600 h-5 w-5" />
      </div>
      <h2 className="text-2xl mb-4">Actualizar información</h2>
      <form onSubmit={handleSubmit} className="my-10 h-full">
        <div className="grid grid-cols-2 gap-8 items-center mb-[5vh]">
          <div>
            <div className="flex gap-2 items-center">
              <label
                htmlFor="first_name"
                className="font-light text-foreground"
              >
                Nombre
              </label>
              {formErrorsProfile.first_name && (
                <ErrorText text={formErrorsProfile.first_name} />
              )}
            </div>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={dataUpdate.first_name}
              onChange={handleInputChangeProfile}
              className="mt-1 block w-full p-2 border border-gray-400 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <div className="flex gap-2 items-center">
              <label htmlFor="last_name" className="font-light text-foreground">
                Apellido
              </label>
              {formErrorsProfile.last_name && (
                <ErrorText text={formErrorsProfile.last_name} />
              )}
            </div>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={dataUpdate.last_name}
              onChange={handleInputChangeProfile}
              className="mt-1 block w-full p-2 border border-gray-400 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <div className="flex gap-2 items-center">
              <label htmlFor="gender" className="font-light text-foreground">
                Género
              </label>
              {formErrorsProfile.gender && (
                <ErrorText text={formErrorsProfile.gender} />
              )}
            </div>
            <select
              id="gender"
              name="gender"
              onChange={handleSelectChange}
              className="mt-1 block w-full p-2 border border-gray-400 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-pointer"
            >
              <option value="" selected={dataUpdate.gender === ''}>
                -- Seleccione género --
              </option>
              {posibleGenders.map((gender) => (
                <option
                  key={gender}
                  value={gender}
                  selected={dataUpdate.gender === gender}
                >
                  {gender}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div className="flex gap-2 items-center">
              <label htmlFor="phone" className="font-light text-foreground">
                Teléfono
              </label>
              {formErrorsProfile.phone && (
                <ErrorText text={formErrorsProfile.phone} />
              )}
            </div>
            <input
              type="number"
              id="phone"
              name="phone"
              value={dataUpdate.phone}
              inputMode="numeric"
              onChange={handleInputChangeProfile}
              className="mt-1 block w-full p-2 border border-gray-400 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <div className="flex gap-2 items-center">
              <label htmlFor="birthdate" className="font-light text-foreground">
                Fecha de nacimiento
              </label>
              {formErrorsProfile.birthdate && (
                <ErrorText text={formErrorsProfile.birthdate} />
              )}
            </div>
            <input
              type="date"
              name="birthdate"
              className="mt-1 block w-full p-2 border border-gray-400 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-pointer"
              value={
                dataUpdate.birthdate
                  ? dataUpdate.birthdate.toISOString().split('T')[0]
                  : new Date().toISOString().split('T')[0]
              }
              onChange={handleInputChangeProfile}
            />
          </div>
          <div>
            <div className="flex gap-2 items-center">
              <label htmlFor="address" className="font-light text-foreground">
                Dirección
              </label>
              {formErrorsProfile.address && (
                <ErrorText text={formErrorsProfile.address} />
              )}
            </div>
            <input
              type="text"
              id="address"
              name="address"
              value={dataUpdate.address}
              onChange={handleInputChangeProfile}
              className="mt-1 block w-full p-2 border border-gray-400 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="flex justify-end items-end gap-2 mt-4">
          <Button
            type="button"
            className="flex gap-2 items-center text-foreground bg-red-500 hover:bg-red-600"
            onClick={handleClose}
          >
            <Cross2Icon className="h-5 w-5" /> Cerrar
          </Button>
          <Button
            type="submit"
            className=" text-foreground bg-green-500 hover:bg-green-600"
          >
            {loadingUser ? (
              <Loader className="mt-[1.8vh] ml-[1vw]" />
            ) : (
              <p className="flex gap-2 items-center">
                <BsCheck2 className="h-5 w-5" /> Guardar
              </p>
            )}
          </Button>
        </div>
      </form>

      <h2 className="text-2xl mt-4">Actualizar contraseña</h2>
      <form onSubmit={handleSubmitPassword} className="my-10 h-full">
        <div className="flex flex-col gap-4 mb-[5vh]">
          <div>
            <div className="flex gap-2 items-center">
              <label
                htmlFor="actual_password"
                className="font-light text-foreground"
              >
                Contraseña actual
              </label>
              {formErrorsPassword.actual_password && (
                <ErrorText text={formErrorsPassword.actual_password} />
              )}
            </div>
            <div className="relative">
              <input
                type={`${showPassword ? 'text' : 'password'}`}
                name="actual_password"
                className="mt-1 block w-full p-2 border border-gray-400 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={dataUpdatePassword.actual_password}
                onChange={handleInputChangePassword}
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
          <div>
            <div className="flex gap-2 items-center">
              <label
                htmlFor="new_password"
                className="font-light text-foreground"
              >
                Nueva contraseña
              </label>
              {formErrorsPassword.new_password && (
                <ErrorText text={formErrorsPassword.new_password} />
              )}
            </div>
            <div className="relative">
              <input
                type={`${showPassword ? 'text' : 'password'}`}
                name="new_password"
                className="mt-1 block w-full p-2 border border-gray-400 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={dataUpdatePassword.new_password}
                onChange={handleInputChangePassword}
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
          <div>
            <div className="flex gap-2 items-center">
              <label
                htmlFor="confirm_new_password"
                className="font-light text-foreground"
              >
                Confirmar nueva contraseña
              </label>
              {formErrorsPassword.confirm_new_password && (
                <ErrorText text={formErrorsPassword.confirm_new_password} />
              )}
            </div>
            <div className="relative">
              <input
                type={`${showPassword ? 'text' : 'password'}`}
                name="confirm_new_password"
                className="mt-1 block w-full p-2 border border-gray-400 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={dataUpdatePassword.confirm_new_password}
                onChange={handleInputChangePassword}
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
        </div>
        <div className="flex justify-end items-end gap-2 mt-4">
          <Button
            type="button"
            className="flex gap-2 items-center text-foreground bg-red-500 hover:bg-red-600"
            onClick={handleClose}
          >
            <Cross2Icon className="h-5 w-5" /> Cerrar
          </Button>
          <Button
            type="submit"
            className=" text-foreground bg-green-500 hover:bg-green-600"
          >
            {loadingUser ? (
              <Loader className="mt-[1.8vh] ml-[1vw]" />
            ) : (
              <p className="flex gap-2 items-center">
                <BsCheck2 className="h-5 w-5" /> Actualizar Contraseña
              </p>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default UpdateInfoForm
