import React, { useState } from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'
import { BsCheck2 } from 'react-icons/bs'

import ErrorText from '../global/ErrorText'
import {
  FormErrorsUpdateProfile,
  initialDataUpdateProfile,
  initialErrorsUpdateProfile,
  PropsUpdateProfile
} from '@/components/types/User'
import useUser from '@/components/hooks/useUser'
import { useToast } from '@/components/ui/use-toast'
import { posibleGenders } from '@/components/types/Team'
import { Button } from '@/components/ui/button'
import Loader from '@/components/Loader'

interface Props {
  dataUpdate: PropsUpdateProfile
  setDataUpdate: React.Dispatch<React.SetStateAction<PropsUpdateProfile>>
  handleClose: () => void
}

const PersonalInfoForm: React.FC<Props> = ({
  dataUpdate,
  setDataUpdate,
  handleClose
}) => {
  const [formErrorsProfile, setFormErrorsProfile] =
    useState<FormErrorsUpdateProfile>(initialErrorsUpdateProfile)

  const { updateProfile, loadingUser } = useUser()
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

  return (
    <form onSubmit={handleSubmit} className="my-10 h-full">
      <div className="grid grid-cols-2 gap-8 items-center mb-[5vh]">
        <div>
          <div className="flex gap-2 items-center">
            <label htmlFor="first_name" className="font-light text-foreground">
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
  )
}

export default PersonalInfoForm
