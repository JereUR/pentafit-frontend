'use client'

import React, { Dispatch, SetStateAction } from 'react'
import { Cross1Icon } from '@radix-ui/react-icons'

import {
  initialDataUpdateProfile,
  PropsUpdateProfile
} from '@/components/types/User'
import PersonalInfoForm from './PersonalInfoForm'
import PasswordFrom from './PasswordFrom'

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
  const handleClose = () => {
    setDataUpdate(initialDataUpdateProfile)
    setShowForm(false)
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
      <PersonalInfoForm
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        handleClose={handleClose}
      />
      <h2 className="text-2xl mt-4">Actualizar contraseña</h2>
      <PasswordFrom handleClose={handleClose} />
    </div>
  )
}

export default UpdateInfoForm
