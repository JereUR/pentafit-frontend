import { IoSettings } from 'react-icons/io5'
import { Dispatch, SetStateAction } from 'react'

import { FormErrors, PropsAddActivity } from '@/components/types/Activity'
import ErrorText from '@/components/ErrorText'

interface PublicActivityProps {
  dataActivity: PropsAddActivity
  setDataActivity: Dispatch<SetStateAction<PropsAddActivity>>
  formErrors: FormErrors
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const PublicActivityForm: React.FC<PublicActivityProps> = ({
  dataActivity,
  setDataActivity,
  formErrors,
  handleChange
}) => {
  const handleChangeis_public = () => {
    let value
    if (dataActivity.is_public === 'true') {
      value = 'false'
    } else {
      value = 'true'
    }

    setDataActivity({ ...dataActivity, is_public: value })
  }

  const handleChangegenerate_invoice = () => {
    let value
    if (dataActivity.generate_invoice === 'true') {
      value = 'false'
    } else {
      value = 'true'
    }

    setDataActivity({ ...dataActivity, generate_invoice: value })
  }

  const handleChangemp_available = () => {
    let value
    if (dataActivity.mp_available === 'true') {
      value = 'false'
    } else {
      value = 'true'
    }

    setDataActivity({ ...dataActivity, mp_available: value })
  }
  return (
    <div className="border border-gray-300 dark:border-gray-700 mt-6 mb-8 rounded-lg">
      <div className="border-b border-gray-300 dark:border-gray-700 py-4 px-6 bg-muted  rounded-t-lg">
        <span className="flex items-center gap-2">
          <IoSettings /> Completá esta sección si la actividad puede ser
          reservada por el usuario
        </span>
      </div>
      <div className="grid grid-cols-3 gap-8 my-8 py-4 px-6">
        <div className="flex flex-col gap-4 ">
          <label htmlFor="is_public" className="font-[600]">
            ¿Es una actividad Pública? (Turnos/clase de prueba)
          </label>
          <div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="is_public"
                className="sr-only peer"
                value={dataActivity.is_public}
                checked={dataActivity.is_public === 'true' ? true : false}
                onChange={handleChangeis_public}
              />
              <div className="group peer ring-0  bg-gradient-to-bl from-neutral-800 via-neutral-700 to-neutral-600 dark:from-gray-400 dark:via-gray-300 dark:to-gray-200  rounded-full outline-none duration-1000 after:duration-300 w-12 h-6  shadow-md  peer-focus:outline-none  after:content-[''] after:rounded-full after:absolute peer-checked:after:rotate-180 after:[background:conic-gradient(from_135deg,_#b2a9a9,_#b2a8a8,_#ffffff,_#d7dbd9_,_#ffffff,_#b2a8a8)]  after:outline-none after:h-4 after:w-4 after:top-1 after:left-1 peer-checked:after:translate-x-6 peer-hover:after:scale-95 peer-checked:bg-gradient-to-r peer-checked:from-emerald-500 peer-checked:to-emerald-900"></div>
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-4 ">
          <label htmlFor="is_public" className="font-[600]">
            ¿Permite generación de cuota?
          </label>
          <div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="generate_invoice"
                className="sr-only peer"
                value={dataActivity.generate_invoice}
                checked={
                  dataActivity.generate_invoice === 'true' ? true : false
                }
                onChange={handleChangegenerate_invoice}
              />
              <div className="group peer ring-0  bg-gradient-to-bl from-neutral-800 via-neutral-700 to-neutral-600 dark:from-gray-400 dark:via-gray-300 dark:to-gray-200  rounded-full outline-none duration-1000 after:duration-300 w-12 h-6  shadow-md  peer-focus:outline-none  after:content-[''] after:rounded-full after:absolute peer-checked:after:rotate-180 after:[background:conic-gradient(from_135deg,_#b2a9a9,_#b2a8a8,_#ffffff,_#d7dbd9_,_#ffffff,_#b2a8a8)]  after:outline-none after:h-4 after:w-4 after:top-1 after:left-1 peer-checked:after:translate-x-6 peer-hover:after:scale-95 peer-checked:bg-gradient-to-r peer-checked:from-emerald-500 peer-checked:to-emerald-900"></div>
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-4 ">
          <label htmlFor="is_public" className="font-[600]">
            ¿Permite pago con Mercado Pago?
          </label>
          <div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="mp_available"
                className="sr-only peer"
                value={dataActivity.mp_available}
                checked={dataActivity.mp_available === 'true' ? true : false}
                onChange={handleChangemp_available}
              />
              <div className="group peer ring-0  bg-gradient-to-bl from-neutral-800 via-neutral-700 to-neutral-600 dark:from-gray-400 dark:via-gray-300 dark:to-gray-200  rounded-full outline-none duration-1000 after:duration-300 w-12 h-6  shadow-md  peer-focus:outline-none  after:content-[''] after:rounded-full after:absolute peer-checked:after:rotate-180 after:[background:conic-gradient(from_135deg,_#b2a9a9,_#b2a8a8,_#ffffff,_#d7dbd9_,_#ffffff,_#b2a8a8)]  after:outline-none after:h-4 after:w-4 after:top-1 after:left-1 peer-checked:after:translate-x-6 peer-hover:after:scale-95 peer-checked:bg-gradient-to-r peer-checked:from-emerald-500 peer-checked:to-emerald-900"></div>
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-4 items-center">
            <label htmlFor="public_name" className="font-[600]">
              Nombre Público
            </label>
            {formErrors.public_name && (
              <ErrorText text={formErrors.public_name} />
            )}
          </div>
          <input
            type="text"
            name="public_name"
            placeholder="Nombre para mostrar"
            className="border border-gray-300 dark:border-gray-700 rounded-lg p-2 focus:border-primary-orange-500 focus:outline-none focus:ring-0"
            value={dataActivity.public_name}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  )
}
