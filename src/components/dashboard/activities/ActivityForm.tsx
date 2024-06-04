'use client'

import { ImCross } from 'react-icons/im'
import Image from 'next/image'
import { FaCheck } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import useActivities from '@/components/hooks/useActivities'
import { Button } from '@/components/ui/button'
import {
  activitiesType,
  FormErrors,
  paymentsType,
  PropsAddActivity
} from '@/components/types/Activity'
import Loader from '@/components/Loader'
import ErrorText from '@/components/ErrorText'
import TextForm from './TextForm'
import useUser from '@/components/hooks/useUser'
import { PublicActivityForm } from './PublicActivityForm'
import noImage from '@public/assets/no-image.png'
import { useToast } from '@/components/ui/use-toast'

const initialErrors = {
  business: '',
  activity: '',
  price: '',
  is_public: '',
  max_sessions: '',
  start_date: '',
  end_date: '',
  payment_type: '',
  public_name: ''
}

export default function ActivityForm({
  type,
  activity
}: {
  type: string
  activity: PropsAddActivity
}) {
  const [showConfirmBack, setShowConfirmBack] = useState<boolean>(false)
  const [dataActivity, setDataActivity] = useState<PropsAddActivity>(activity)
  const [workingBusiness, setWorkingBusiness] = useState(activity.business)
  const [formErrors, setFormErrors] = useState<FormErrors>(initialErrors)
  const { toast } = useToast()
  const router = useRouter()
  const { getWorkingBusiness, token, businesses } = useUser()
  const { addActivity, updateActivity, loading } = useActivities()
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

  const handleBack = () => {
    if (showConfirmBack) {
      router.replace('/panel-de-control/actividades')
    }
    setShowConfirmBack(false)
  }

  const handleConfirmBack = () => {
    setShowConfirmBack(true)
  }

  const handleCancelBack = () => {
    setShowConfirmBack(false)
  }

  const validations = ({
    dataActivity
  }: {
    dataActivity: PropsAddActivity
  }) => {
    const errorsForm: FormErrors = {}

    if (!dataActivity.business) {
      errorsForm.company_id = `Debes tener un area de trabajo (negocio) activo.`
    }

    if (!dataActivity.name.trim()) {
      errorsForm.name = `Este campo no debe ser vacío.`
    }

    if (!dataActivity.price) {
      errorsForm.price = `Este campo no debe ser vacío.`
    } else if (parseInt(dataActivity.price) < 0) {
      errorsForm.price = 'Este valor no puede ser negativo.'
    }

    if (!dataActivity.max_sessions) {
      errorsForm.max_sessions = `Este campo no debe ser vacío.`
    } else if (parseInt(dataActivity.max_sessions) < 0) {
      errorsForm.max_sessions = 'Este valor no puede ser negativo.'
    }

    if (!dataActivity.start_date) {
      errorsForm.start_date = `Este campo no debe ser vacío.`
    }

    if (!dataActivity.end_date) {
      errorsForm.end_date = `Este campo no debe ser vacío.`
    }

    if (!dataActivity.payment_type.trim()) {
      errorsForm.payment_type = `Elija una de las opciones.`
    }

    if (!dataActivity.activity_type.trim()) {
      errorsForm.activity_type = `Elija una de las opciones.`
    }

    if (dataActivity.is_public === 'true') {
      if (!dataActivity.public_name) {
        errorsForm.public_name = `Este campo no debe ser vacío.`
      }
    }

    return errorsForm
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'start_date' || name === 'end_date') {
      setDataActivity({ ...dataActivity, [name]: new Date(value) })
    } else {
      setDataActivity({ ...dataActivity, [name]: value })
    }
  }

  /* const handleChangeBusiness = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const newId = Number(value)
    let company_id = dataActivity.company_id.map((Business) => Business)
    if (company_id.includes(newId)) {
      company_id = company_id.filter((c) => c !== newId)
    } else {
      company_id.push(newId)
    }

    setDataActivity({ ...dataActivity, company_id: company_id })
  } */

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setDataActivity({ ...dataActivity, [name]: value })
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const err = validations({ dataActivity })
    setFormErrors(err)

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
        <div className="flex flex-col gap-6 mb-10 bg-card rounded-lg shadow-md pt-2 pb-6 px-2">
          <div className="flex gap-4 items-center">
            <label className="text-xl font-light mt-4 ml-4">
              Area de Trabajo
            </label>
            {formErrors.company_id && (
              <ErrorText text={formErrors.company_id} />
            )}
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
              <p className="text-xl font-semibold">
                Sin area de trabajo asignada
              </p>
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
        <div className="grid grid-cols-3 gap-8 mb-4">
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <label htmlFor="name" className="font-[600]">
                Actividad
              </label>
              {formErrors.name && <ErrorText text={formErrors.name} />}
            </div>
            <input
              type="text"
              name="name"
              className="border border-gray-300 dark:border-gray-700 rounded-lg p-2 focus:border-primary-orange-500 focus:outline-none focus:ring-0"
              value={dataActivity.name}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <label htmlFor="price" className="font-[600]">
                Precio
              </label>
              {formErrors.price && <ErrorText text={formErrors.price} />}
            </div>
            <input
              type="number"
              name="price"
              className="border border-gray-300 dark:border-gray-700 rounded-lg p-2 focus:border-primary-orange-500 focus:outline-none focus:ring-0"
              value={dataActivity.price}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <label htmlFor="max_sessions" className="font-[600]">
                Sesiones Máximas
              </label>
              {formErrors.max_sessions && (
                <span className="text-xs text-red-600 py-[2px] px-1 rounded-lg animate-pulse">
                  {formErrors.max_sessions}
                </span>
              )}
            </div>
            <input
              type="number"
              name="max_sessions"
              className="border border-gray-300 dark:border-gray-700 rounded-lg p-2 focus:border-primary-orange-500 focus:outline-none focus:ring-0"
              value={dataActivity.max_sessions}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <label htmlFor="start_date" className="font-[600]">
                Fecha Desde
              </label>
              {formErrors.start_date && (
                <ErrorText text={formErrors.start_date} />
              )}
            </div>
            <input
              type="date"
              name="start_date"
              className="border border-gray-300 dark:border-gray-700 rounded-lg p-2 focus:border-primary-orange-500 focus:outline-none focus:ring-0"
              value={dataActivity.start_date.toISOString().split('T')[0]}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <label htmlFor="end_date" className="font-[600]">
                Fecha Hasta
              </label>
              {formErrors.end_date && <ErrorText text={formErrors.end_date} />}
            </div>
            <input
              type="date"
              name="end_date"
              className="border border-gray-300 dark:border-gray-700 rounded-lg p-2 focus:border-primary-orange-500 focus:outline-none focus:ring-0"
              value={dataActivity.end_date.toISOString().split('T')[0]}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <label htmlFor="payment_type" className="font-[600]">
                Control de Pago
              </label>
              {formErrors.payment_type && (
                <ErrorText text={formErrors.payment_type} />
              )}
            </div>
            <select
              name="payment_type"
              className="border border-gray-300 dark:border-gray-700 rounded-lg p-[10px] cursor-pointer focus:border-primary-orange-500 focus:outline-none focus:ring-0"
              onChange={handleChangeSelect}
              defaultValue={dataActivity.payment_type}
            >
              <option value="" selected={dataActivity.payment_type === ''}>
                Seleccione tipo de cobro
              </option>
              {paymentsType.map((item) => (
                <option
                  key={item}
                  value={item}
                  selected={dataActivity.payment_type === item}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <label htmlFor="activity_type" className="font-[600]">
                Modalidad
              </label>
              {formErrors.activity_type && (
                <ErrorText text={formErrors.activity_type} />
              )}
            </div>
            <select
              name="activity_type"
              className="border border-gray-300 dark:border-gray-700 rounded-lg p-[10px] cursor-pointer focus:border-primary-orange-500 focus:outline-none focus:ring-0"
              onChange={handleChangeSelect}
              defaultValue={dataActivity.activity_type}
            >
              <option value="" selected={dataActivity.activity_type === ''}>
                Seleccione modalidad de actividad
              </option>
              {activitiesType.map((item) => (
                <option
                  key={item}
                  value={item}
                  selected={dataActivity.activity_type === item}
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
            onClick={handleConfirmBack}
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
          {showConfirmBack && (
            <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex justify-center items-center">
              <div className="flex flex-col gap-4 justify-center items-center bg-background border border-primary-orange-600 p-8 rounded-lg shadow-md">
                <p>
                  Todos los cambios realizados se perderán. ¿Estás seguro de
                  cerrar el formulario?
                </p>
                <div className="flex justify-end gap-2">
                  <Button variant="secondary" onClick={handleCancelBack}>
                    No
                  </Button>
                  <Button onClick={() => handleBack()}>Sí</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}
