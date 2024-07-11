import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'

import ErrorText from './global/ErrorText'
import noImage from '../../../public/assets/no-image.png'
import { Button } from '../ui/button'
import { Business } from '../types/Business'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL

interface Props {
  formErrors: any
  workingBusiness: Business | null
}

const WorkingArea: React.FC<Props> = ({ formErrors, workingBusiness }) => {
  const router = useRouter()

  return (
    <div className="flex flex-col gap-8 mb-10 bg-card rounded-lg shadow-md pt-2 pb-6 px-2">
      <div className="flex gap-4 items-center">
        <label className="text-xl font-light mt-4 ml-4">Area de Trabajo</label>
        {formErrors.company_id && <ErrorText text={formErrors.company_id} />}
      </div>
      {workingBusiness ? (
        <div className="flex items-center mx-6 mb-2">
          <div className="flex px-6">
            <Image
              src={
                workingBusiness.logo
                  ? `${BASE_URL}${workingBusiness.logo}`
                  : noImage
              }
              alt={`${workingBusiness.name} logo`}
              width={80}
              height={80}
              className="w-[80px] h-[80px] border-[1px] border-primary-orange-600 rounded-full p-1 dark:ring-primary-orange-400"
            />
          </div>
          <div>
            <h2 className="text-lg font-bold">{workingBusiness.name}</h2>
            <p className="text-sm">
              {workingBusiness.description
                ? workingBusiness.description
                : 'Sin descripción.'}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-2 ">
          <p className="text-xl font-semibold">Sin area de trabajo asignada</p>
          <span className="text-sm italic">
            Debes seleccionar un area de trabajo para realizar tareas
          </span>
          <Button
            className="flex mt-2 items-center font-semibold transition duration-300 ease-in-out bg-primary-orange-700 hover:bg-primary-orange-600"
            onClick={() => router.push('/panel-de-control/negocios')}
          >
            Ir a sección Negocios
          </Button>
        </div>
      )}
    </div>
  )
}

export default WorkingArea
