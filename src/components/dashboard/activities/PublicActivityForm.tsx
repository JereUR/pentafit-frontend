import { IoSettings } from 'react-icons/io5'
import { Dispatch, SetStateAction } from 'react'

import { FormErrors, PropsAddActivity } from '@/components/types/Activity'
import ErrorText from '@/components/ErrorText'
import { CustomCheckbox } from '../CustomCheckbox'

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
  const handleChangeBoolean = (name: string) => {
    let value
    if (dataActivity[name] === 'true') {
      value = 'false'
    } else {
      value = 'true'
    }

    setDataActivity({ ...dataActivity, [name]: value })
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
        <CustomCheckbox
          label="¿Es una actividad Pública? (Turnos/clase de prueba)"
          value={dataActivity.is_public}
          name="is_public"
          action={handleChangeBoolean}
        />
        <CustomCheckbox
          label="¿Permite generación de cuota?"
          value={dataActivity.generate_invoice}
          name="generate_invoice"
          action={handleChangeBoolean}
        />
        <CustomCheckbox
          label="¿Permite pago con Mercado Pago?"
          value={dataActivity.mp_available}
          name="mp_available"
          action={handleChangeBoolean}
        />
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
