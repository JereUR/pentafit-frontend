'use client'

import { ImCross } from 'react-icons/im'
import { IoSettings } from 'react-icons/io5'

import useActivities from '@/components/hooks/useActivities'
import { Button } from '@/components/ui/button'
import { FaCheck } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { PropsAdd } from '@/components/types/Activity'
import Loader from '@/components/Loader'
import ErrorText from '@/components/ErrorText'

const payments = [
  'Por sesion',
  'Por período',
  'Mensual',
  'Mensual con sesiones'
]

const inputItems = [
  {
    label: 'Actividad',
    name: 'activity',
    type: 'text'
  },
  {
    label: 'Costo',
    name: 'cost',
    type: 'number'
  },
  {
    label: 'Sesiones Máximas',
    name: 'sessionMax',
    type: 'number'
  },
  {
    label: 'Fecha Desde',
    name: 'dateFrom',
    type: 'date'
  },
  {
    label: 'Fecha Hasta',
    name: 'dateUntil',
    type: 'date'
  }
]

const checkboxItems = [
  {
    label: '¿Es una actividad Pública? (Turnos/clase de prueba)',
    name: 'isPublic'
  },
  {
    label: '¿Permite generación de cuota?',
    name: 'quotaGeneration'
  },
  {
    label: '¿Permite pago con Mercado Pago?',
    name: 'mpAvailable'
  }
]

interface FormErrors {
  activity?: string
  cost?: string
  isPublic?: string
  quotaGeneration?: string
  sessionMax?: string
  mpAvailable?: string
  dateFrom?: string
  dateUntil?: string
  paymentType?: string
  publicName?: string
  [key: string]: string | undefined
}

const initialData = {
  activity: '',
  cost: '',
  isPublic: 'false',
  quotaGeneration: 'false',
  mpAvailable: 'false',
  publicName: '',
  sessionMax: '',
  dateFrom: '',
  dateUntil: '',
  paymentType: ''
}

export default function ActivityForm() {
  const [dataActivity, setDataActivity] = useState<PropsAdd>(initialData)
  const { addActivity } = useActivities()
  const [loading, setLoading] = useState(false)
  const [addErrors, setAddErrors] = useState<FormErrors>({
    activity: '',
    cost: '',
    isPublic: '',
    sessionMax: '',
    dateFrom: '',
    dateUntil: '',
    paymentType: '',
    publicName: ''
  })
  const router = useRouter()

  const validations = ({ dataActivity }: { dataActivity: PropsAdd }) => {
    const errorsForm: FormErrors = {}

    if (!dataActivity.activity.trim()) {
      errorsForm.activity = `Este campo no debe ser vacío.`
    }

    if (!dataActivity.cost) {
      errorsForm.cost = `Este campo no debe ser vacío.`
    } else if (parseInt(dataActivity.cost) < 0) {
      errorsForm.cost = 'Este valor no puede ser negativo.'
    }

    if (!dataActivity.sessionMax) {
      errorsForm.sessionMax = `Este campo no debe ser vacío.`
    } else if (parseInt(dataActivity.sessionMax) < 0) {
      errorsForm.sessionMax = 'Este valor no puede ser negativo.'
    }

    if (!dataActivity.dateFrom) {
      errorsForm.dateFrom = `Este campo no debe ser vacío.`
    }

    if (!dataActivity.dateUntil) {
      errorsForm.dateUntil = `Este campo no debe ser vacío.`
    }

    if (dataActivity.isPublic === 'true') {
      if (!dataActivity.publicName) {
        errorsForm.publicName = `Este campo no debe ser vacío.`
      }
    }

    return errorsForm
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDataActivity({ ...dataActivity, [name]: value })
  }

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setDataActivity({ ...dataActivity, [name]: value })
  }

  async function handleAction(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const err = validations({ dataActivity })
    setAddErrors(err)

    console.log(dataActivity)

    if (Object.keys(err).length === 0) {
      setLoading(true)
      await addActivity({ dataActivity })
      setAddErrors({
        activity: '',
        cost: '',
        isPublic: '',
        sessionMax: '',
        dateFrom: '',
        dateUntil: '',
        paymentType: '',
        publicName: ''
      })
    }

    setLoading(false)
  }

  return (
    <div>
      <form onSubmit={handleAction}>
        <div className="grid grid-cols-3 gap-8 mb-4">
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <label htmlFor="activity" className="font-[600]">
                Actividad
              </label>
              {addErrors.activity && <ErrorText text={addErrors.activity} />}
            </div>
            <input
              type="text"
              name="activity"
              className="border border-gray-300 dark:border-gray-700 p-2 focus:border-primary-orange-500 focus:outline-none focus:ring-0"
              value={dataActivity.activity}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <label htmlFor="cost" className="font-[600]">
                Costo
              </label>
              {addErrors.cost && <ErrorText text={addErrors.cost} />}
            </div>
            <input
              type="number"
              name="cost"
              className="border border-gray-300 dark:border-gray-700 p-2 focus:border-primary-orange-500 focus:outline-none focus:ring-0"
              value={dataActivity.cost}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <label htmlFor="sessionMax" className="font-[600]">
                Sesiones Máximas
              </label>
              {addErrors.sessionMax && (
                <span className="text-xs text-red-600 py-[2px] px-1 rounded-md animate-pulse">
                  {addErrors.sessionMax}
                </span>
              )}
            </div>
            <input
              type="number"
              name="sessionMax"
              className="border border-gray-300 dark:border-gray-700 p-2 focus:border-primary-orange-500 focus:outline-none focus:ring-0"
              value={dataActivity.sessionMax}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <label htmlFor="dateFrom" className="font-[600]">
                Fecha Desde
              </label>
              {addErrors.dateFrom && <ErrorText text={addErrors.dateFrom} />}
            </div>
            <input
              type="date"
              name="dateFrom"
              className="border border-gray-300 dark:border-gray-700 p-2 focus:border-primary-orange-500 focus:outline-none focus:ring-0"
              value={dataActivity.dateFrom}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <label htmlFor="dateUntil" className="font-[600]">
                Fecha Hasta
              </label>
              {addErrors.dateUntil && <ErrorText text={addErrors.dateUntil} />}
            </div>
            <input
              type="date"
              name="dateUntil"
              className="border border-gray-300 dark:border-gray-700 p-2 focus:border-primary-orange-500 focus:outline-none focus:ring-0"
              value={dataActivity.dateUntil}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="paymentType" className="font-[600]">
              Control de Pago
            </label>
            <select
              name="paymentType"
              className="border border-gray-300 dark:border-gray-700 p-[10px] cursor-pointer focus:border-primary-orange-500 focus:outline-none focus:ring-0"
              onChange={handleChangeSelect}
            >
              {payments.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="border border-gray-300 dark:border-gray-700 mt-6 mb-8">
          <div className="border-b border-gray-300 dark:border-gray-700 py-4 px-6 bg-muted">
            <span className="flex items-center gap-2">
              <IoSettings /> Completá esta sección si la actividad puede ser
              reservada por el usuario
            </span>
          </div>
          <div className="grid grid-cols-3 gap-8 my-8 py-4 px-6">
            <div className="flex flex-col gap-4 ">
              <label htmlFor="isPublic" className="font-[600]">
                ¿Es una actividad Pública? (Turnos/clase de prueba)
              </label>
              <div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="isPublic"
                    className="sr-only peer"
                    value={dataActivity.isPublic ? 'true' : 'false'}
                    onChange={handleChange}
                  />
                  <div className="group peer ring-0  bg-gradient-to-bl from-neutral-800 via-neutral-700 to-neutral-600 dark:from-gray-400 dark:via-gray-300 dark:to-gray-200  rounded-full outline-none duration-1000 after:duration-300 w-12 h-6  shadow-md  peer-focus:outline-none  after:content-[''] after:rounded-full after:absolute peer-checked:after:rotate-180 after:[background:conic-gradient(from_135deg,_#b2a9a9,_#b2a8a8,_#ffffff,_#d7dbd9_,_#ffffff,_#b2a8a8)]  after:outline-none after:h-4 after:w-4 after:top-1 after:left-1 peer-checked:after:translate-x-6 peer-hover:after:scale-95 peer-checked:bg-gradient-to-r peer-checked:from-emerald-500 peer-checked:to-emerald-900"></div>
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-4 ">
              <label htmlFor="isPublic" className="font-[600]">
                ¿Permite generación de cuota?
              </label>
              <div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="quotaGeneration"
                    className="sr-only peer"
                    value={dataActivity.quotaGeneration ? 'true' : 'false'}
                    onChange={handleChange}
                  />
                  <div className="group peer ring-0  bg-gradient-to-bl from-neutral-800 via-neutral-700 to-neutral-600 dark:from-gray-400 dark:via-gray-300 dark:to-gray-200  rounded-full outline-none duration-1000 after:duration-300 w-12 h-6  shadow-md  peer-focus:outline-none  after:content-[''] after:rounded-full after:absolute peer-checked:after:rotate-180 after:[background:conic-gradient(from_135deg,_#b2a9a9,_#b2a8a8,_#ffffff,_#d7dbd9_,_#ffffff,_#b2a8a8)]  after:outline-none after:h-4 after:w-4 after:top-1 after:left-1 peer-checked:after:translate-x-6 peer-hover:after:scale-95 peer-checked:bg-gradient-to-r peer-checked:from-emerald-500 peer-checked:to-emerald-900"></div>
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-4 ">
              <label htmlFor="isPublic" className="font-[600]">
                ¿Permite pago con Mercado Pago?
              </label>
              <div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="mpAvailable"
                    className="sr-only peer"
                    value={dataActivity.mpAvailable ? 'true' : 'false'}
                    onChange={handleChange}
                  />
                  <div className="group peer ring-0  bg-gradient-to-bl from-neutral-800 via-neutral-700 to-neutral-600 dark:from-gray-400 dark:via-gray-300 dark:to-gray-200  rounded-full outline-none duration-1000 after:duration-300 w-12 h-6  shadow-md  peer-focus:outline-none  after:content-[''] after:rounded-full after:absolute peer-checked:after:rotate-180 after:[background:conic-gradient(from_135deg,_#b2a9a9,_#b2a8a8,_#ffffff,_#d7dbd9_,_#ffffff,_#b2a8a8)]  after:outline-none after:h-4 after:w-4 after:top-1 after:left-1 peer-checked:after:translate-x-6 peer-hover:after:scale-95 peer-checked:bg-gradient-to-r peer-checked:from-emerald-500 peer-checked:to-emerald-900"></div>
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-4 items-center">
                <label htmlFor="publicName" className="font-[600]">
                  Nombre Público
                </label>
                {addErrors.publicName && (
                  <ErrorText text={addErrors.publicName} />
                )}
              </div>
              <input
                type="text"
                name="publicName"
                placeholder="Nombre para mostrar"
                className="border border-gray-300 dark:border-gray-700 p-2 focus:border-primary-orange-500 focus:outline-none focus:ring-0"
                value={dataActivity.publicName}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="border border-blue-300 bg-blue-100 text-blue-500 text-sm p-4">
          <p>Control de pago:</p>
          <p>
            1° MENSUAL: No contempla sesiones, y la persona puede reservar
            turnos solo teniendo la cuota disponible.
          </p>
          <p>
            2° MENSUAL CON SESIONES: Contenpla las sesiones y solo permite
            reservar turno si este tiene sesiones disponibles para el período
          </p>
          <p>
            3° POR PERIODO: Contenpla sesiones y al generar la cuota se indica
            el período y la cantidad de sesiones de la misma
          </p>
          <p>
            4° POR SESION (pago individual): Se crea una sola sesión, la cual se
            deve pagar de a una.
          </p>
        </div>
        <div className="flex absolute right-8 mt-12">
          <Button
            type="button"
            className="gap-2 mr-2 font-bold text-background bg-red-600 transition duration-300 ease-in-out hover:scale-[1.02] hover:bg-red-600 border-none"
            onClick={() => router.replace('/panel-de-control/actividades')}
          >
            <ImCross /> Cerrar
          </Button>
          <Button
            type="submit"
            className="gap-2 font-bold text-background bg-green-600 transition duration-300 ease-in-out hover:scale-[1.02] hover:bg-green-600 border-none"
          >
            {!loading ? (
              <div className="flex gap-2 items-center">
                <FaCheck /> Guardar
              </div>
            ) : (
              <Loader className="mt-[1.1vh] ml-[1vw]" />
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
