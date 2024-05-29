'use client'

import { ImCross } from 'react-icons/im'
import { IoSettings } from 'react-icons/io5'

import useActivities from '@/components/hooks/useActivities'
import { Button } from '@/components/ui/button'
import { FaCheck } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormErrors, PropsAddActivity } from '@/components/types/Activity'
import Loader from '@/components/Loader'
import ErrorText from '@/components/ErrorText'
import TextForm from './TextForm'
import useUser from '@/components/hooks/useUser'
import Image from 'next/image'
import { PublicActivityForm } from './PublicActivityForm'
import noImage from '@public/assets/no-image.png'
import { useToast } from '@/components/ui/use-toast'

const payments = [
  'Por sesion',
  'Por período',
  'Mensual',
  'Mensual con sesiones'
]
const initialErrors = {
  business: '',
  activity: '',
  cost: '',
  isPublic: '',
  sessionMax: '',
  dateFrom: '',
  dateUntil: '',
  paymentType: '',
  publicName: ''
}

export default function ActivityForm({
  type,
  activity
}: {
  type: string
  activity: PropsAddActivity
}) {
  const [dataActivity, setDataActivity] = useState<PropsAddActivity>(activity)
  const [workingBusiness, setWorkingBusiness] = useState(activity.business)
  const [formErrors, setFormErrors] = useState<FormErrors>(initialErrors)
  const { toast } = useToast()
  const router = useRouter()
  const { getWorkingBusiness, loading, token, businesses } = useUser()
  const { addActivity, updateActivity } = useActivities()
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL
  useEffect(() => {
    setDataActivity(activity)
  }, [activity])

  useEffect(() => {
    async function updateWorkingBusiness() {
      const res = await getWorkingBusiness()
      setDataActivity({ ...dataActivity, business: res })
      setWorkingBusiness(res)
    }

    if (type === 'add' && token) {
      updateWorkingBusiness()
    }
  }, [token, businesses])

  const validations = ({
    dataActivity
  }: {
    dataActivity: PropsAddActivity
  }) => {
    const errorsForm: FormErrors = {}

    if (!dataActivity.business) {
      errorsForm.id_business = `Debes tener un area de trabajo (negocio) activo.`
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

  /* const handleChangeBusiness = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const newId = Number(value)
    let id_business = dataActivity.id_business.map((Business) => Business)
    if (id_business.includes(newId)) {
      id_business = id_business.filter((c) => c !== newId)
    } else {
      id_business.push(newId)
    }

    setDataActivity({ ...dataActivity, id_business: id_business })
  } */

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setDataActivity({ ...dataActivity, [name]: value })
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const err = validations({ dataActivity })
    setFormErrors(err)

    console.log(dataActivity)

    if (Object.keys(err).length === 0) {
      if (type === 'add') {
        const response = await addActivity({ dataActivity })
        if (response) {
          toast({
            title: 'Actividad agregada.',
            description: 'Redireccionando...',
            className: 'bg-green-600'
          })

          setTimeout(() => {
            router.replace('/panel-de-control/negocios')
          }, 1000)
        }
      } else {
        const response = await updateActivity({ dataActivity })
        if (response) {
          toast({
            title: 'Actividad editada.',
            description: 'Redireccionando...',
            className: 'bg-green-600'
          })

          setTimeout(() => {
            router.replace('/panel-de-control/negocios')
          }, 1000)
        }
      }

      setFormErrors(initialErrors)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6 mb-6 border border-gray-300 dark:border-gray-700 pt-2 pb-6 px-2">
          <div className="flex gap-4 items-center">
            <label className="text-xl font-light">Area de Trabajo</label>
            {formErrors.id_business && (
              <ErrorText text={formErrors.id_business} />
            )}
          </div>
          {workingBusiness ? (
            <div className="flex items-center">
              <div className="flex px-6">
                <Image
                  src={
                    workingBusiness.logo ? `${BASE_URL}${workingBusiness.logo}` : noImage
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
            <div>* Sin area de trabajo asignada *</div>
          )}
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
        <PublicActivityForm
          dataActivity={dataActivity}
          setDataActivity={setDataActivity}
          formErrors={formErrors}
          handleChange={handleChange}
        />
        <TextForm />
        <div className="flex justify-end mt-10">
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
                <FaCheck /> {type === 'add' ? 'Agregar' : 'Actualizar'}
              </div>
            ) : (
              <Loader className="mt-[1.8vh] ml-[1vw]" />
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
