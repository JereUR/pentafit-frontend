'use client'

import { ImCross } from 'react-icons/im'
import { IoSettings } from 'react-icons/io5'

import useActivities from '@/components/hooks/useActivities'
import { Button } from '@/components/ui/button'
import { FaCheck } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { PropsAdd } from '@/components/types/Activity'
import Loader from '@/components/Loader'
import ErrorText from '@/components/ErrorText'
import TextForm from './TextForm'
import useUser from '@/components/hooks/useUser'
import Image from 'next/image'

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
  id_business?: string
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

export default function ActivityForm({
  type,
  activity
}: {
  type: string
  activity: PropsAdd
}) {
  const [dataActivity, setDataActivity] = useState<PropsAdd>(activity)
  const { addActivity, updateActivity } = useActivities()
  const [loading, setLoading] = useState(false)
  const [formErrors, setFormErrors] = useState<FormErrors>({
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
  const { businesses } = useUser()

  /* useEffect(() => {
      if (business.logo) {
        const imageUrl = URL.createObjectURL(business.logo)
        setImgLogo(imageUrl)
      }
    }
  }, [businesses]) */

  useEffect(() => {
    setDataActivity(activity)
  }, [activity])

  const validations = ({ dataActivity }: { dataActivity: PropsAdd }) => {
    const errorsForm: FormErrors = {}

    if (dataActivity.id_business.length === 0) {
      errorsForm.id_business = `La actividad debe pertenecer al menos a una compañia.`
    }

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

  const handleChangeBusiness = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const newId = Number(value)
    let id_business = dataActivity.id_business.map((Business) => Business)
    if (id_business.includes(newId)) {
      id_business = id_business.filter((c) => c !== newId)
    } else {
      id_business.push(newId)
    }

    setDataActivity({ ...dataActivity, id_business: id_business })
  }

  const handleChangeIsPublic = () => {
    let value
    if (dataActivity.isPublic === 'true') {
      value = 'false'
    } else {
      value = 'true'
    }

    setDataActivity({ ...dataActivity, isPublic: value })
  }

  const handleChangeQuotaGeneration = () => {
    let value
    if (dataActivity.quotaGeneration === 'true') {
      value = 'false'
    } else {
      value = 'true'
    }

    setDataActivity({ ...dataActivity, quotaGeneration: value })
  }

  const handleChangeMpAvailable = () => {
    let value
    if (dataActivity.mpAvailable === 'true') {
      value = 'false'
    } else {
      value = 'true'
    }

    setDataActivity({ ...dataActivity, mpAvailable: value })
  }

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setDataActivity({ ...dataActivity, [name]: value })
  }

  async function handleAction(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const err = validations({ dataActivity })
    setFormErrors(err)

    console.log(dataActivity)

    if (Object.keys(err).length === 0) {
      setLoading(true)

      if (type === 'add') {
        await addActivity({ dataActivity })
      } else {
        await updateActivity({ dataActivity })
      }

      setFormErrors({
        business: '',
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
        <div className="flex flex-col gap-6 mb-6 border border-gray-300 dark:border-gray-700 py-4 px-12">
          <div className="flex gap-4 items-center">
            <label>Compañia</label>
            {formErrors.id_business && (
              <ErrorText text={formErrors.id_business} />
            )}
          </div>
          <div className="flex justify-around gap-4">
            {businesses.map((item) => (
              <div
                key={item.id}
                className="flex flex-col py-6 px-8 gap-4 justify-center items-center ring-1 rounded-md ring-gray-300 dark:ring-gray-700"
              >
                <label
                  htmlFor={item.name}
                  className="flex flex-col gap-4 items-center font-[600]"
                >
                  {item.name}
                  {item.logo && (
                    <Image
                      src={URL.createObjectURL(item.logo)}
                      width={100}
                      height={100}
                      alt={`${item.name} logo`}
                    />
                  )}
                </label>
                <div className="content">
                  <label className="checkBox">
                    <input
                      className="cursor-pointer"
                      id="ch1"
                      type="checkbox"
                      name="id_business"
                      checked={dataActivity.id_business?.includes(item.id)}
                      value={item.id}
                      onChange={handleChangeBusiness}
                    />
                    <div className="transition"></div>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-8 mb-4">
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <label htmlFor="activity" className="font-[600]">
                Actividad
              </label>
              {formErrors.activity && <ErrorText text={formErrors.activity} />}
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
              {formErrors.cost && <ErrorText text={formErrors.cost} />}
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
              {formErrors.sessionMax && (
                <span className="text-xs text-red-600 py-[2px] px-1 rounded-md animate-pulse">
                  {formErrors.sessionMax}
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
              {formErrors.dateFrom && <ErrorText text={formErrors.dateFrom} />}
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
              {formErrors.dateUntil && (
                <ErrorText text={formErrors.dateUntil} />
              )}
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
              defaultValue={dataActivity.paymentType}
            >
              {payments.map((item) => (
                <option
                  key={item}
                  value={item}
                  selected={dataActivity.paymentType === item}
                >
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
                    value={dataActivity.isPublic}
                    checked={dataActivity.isPublic === 'true' ? true : false}
                    onChange={handleChangeIsPublic}
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
                    value={dataActivity.quotaGeneration}
                    checked={
                      dataActivity.quotaGeneration === 'true' ? true : false
                    }
                    onChange={handleChangeQuotaGeneration}
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
                    value={dataActivity.mpAvailable}
                    checked={dataActivity.mpAvailable === 'true' ? true : false}
                    onChange={handleChangeMpAvailable}
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
                {formErrors.publicName && (
                  <ErrorText text={formErrors.publicName} />
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
        <TextForm />
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
