import { Cross2Icon, EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import React, { useState } from 'react'
import { BsCheck2 } from 'react-icons/bs'

import useUser from '@/components/hooks/useUser'
import Loader from '@/components/Loader'
import {
  FormErrorsUpdatePassword,
  FormErrorsUpdateProfile,
  initialDataUpdatePassword,
  initialErrorsUpdatePassword,
  PropsUpdatePassword
} from '@/components/types/User'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import ErrorText from '../global/ErrorText'

interface Props {
  handleClose: () => void
}

const PasswordFrom: React.FC<Props> = ({ handleClose }) => {
  const [dataUpdatePassword, setDataUpdatePassword] =
    useState<PropsUpdatePassword>(initialDataUpdatePassword)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [formErrorsPassword, setFormErrorsPassword] =
    useState<FormErrorsUpdatePassword>(initialErrorsUpdatePassword)

  const { updatePassword, loadingPassword } = useUser()
  const { toast } = useToast()

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

  const handleInputChangePassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target
    setDataUpdatePassword({ ...dataUpdatePassword, [name]: value })
    if (value) setFormErrorsPassword({ ...formErrorsPassword, [name]: '' })
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
          {loadingPassword ? (
            <Loader className="mt-[1.8vh] ml-[1vw]" />
          ) : (
            <p className="flex gap-2 items-center">
              <BsCheck2 className="h-5 w-5" /> Actualizar Contraseña
            </p>
          )}
        </Button>
      </div>
    </form>
  )
}

export default PasswordFrom
