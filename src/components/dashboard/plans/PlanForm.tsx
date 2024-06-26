'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ImCross } from 'react-icons/im'
import { FaCheck } from 'react-icons/fa'

import usePlans from 'components/hooks/usePlans'
import useUser from 'components/hooks/useUser'
import { Business } from 'components/types/Business'
import {
  FormErrorActivities,
  FormErrors,
  initialErrors,
  paymentsType,
  plansType,
  PropsAddPlan
} from 'components/types/Plan'
import { useToast } from 'components/ui/use-toast'
import noImage from '@public/assets/no-image.png'
import { Button } from 'components/ui/button'
import Loader from 'components/Loader'
import { CustomCheckbox } from '../CustomCheckbox'
import AddActivitiesButton from './AddActivitiesButton'
import ErrorText from '../global/ErrorText'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL

export default function PlanForm({
  type,
  plan
}: {
  type: string
  plan: PropsAddPlan
}) {
  const [showConfirmBack, setShowConfirmBack] = useState<boolean>(false)
  const [dataPlan, setDataPlan] = useState<PropsAddPlan>(plan)
  const [workingBusiness, setWorkingBusiness] = useState<Business | null>(null)
  const [formErrors, setFormErrors] = useState<FormErrors>(initialErrors)
  const [formErrorsActivities, setFormErrorsActivities] = useState<
    FormErrorActivities[]
  >([])

  const { toast } = useToast()
  const router = useRouter()
  const { getWorkingBusiness, token } = useUser()
  const { addPlan, updatePlan, loadingPlan } = usePlans()

  useEffect(() => {
    setDataPlan(plan)
  }, [plan])

  useEffect(() => {
    async function updateWorkingBusiness() {
      const res = await getWorkingBusiness()
      setWorkingBusiness(res)
    }

    if (token) {
      updateWorkingBusiness()
    }
  }, [token])

  const handleBack = () => {
    if (showConfirmBack) {
      router.replace('/panel-de-control/facturacion/planes')
    }
    setShowConfirmBack(false)
  }

  const handleConfirmBack = () => {
    setShowConfirmBack(true)
  }

  const handleCancelBack = () => {
    setShowConfirmBack(false)
  }

  const validations = ({ dataPlan }: { dataPlan: PropsAddPlan }) => {
    const errorsForm: FormErrors = {}
    const errorsFormActivities: FormErrorActivities[] = []

    if (!workingBusiness) {
      errorsForm.company_id = `Debes tener un area de trabajo (negocio) activo.`
    }

    if (!dataPlan.name.trim()) {
      errorsForm.name = `Este campo no debe ser vacío.`
    }

    if (!dataPlan.price) {
      errorsForm.price = `Este campo no debe ser vacío.`
    } else if (parseInt(dataPlan.price) < 0) {
      errorsForm.price = 'Este valor no puede ser negativo.'
    }

    if (!dataPlan.expiration_period.trim()) {
      errorsForm.expiration_period = `Este campo no debe ser vacío.`
    }

    if (!dataPlan.start_date) {
      errorsForm.start_date = `Este campo no debe ser vacío.`
    }

    if (!dataPlan.end_date) {
      errorsForm.end_date = `Este campo no debe ser vacío.`
    }

    if (dataPlan.payment_type.length === 0) {
      errorsForm.payment_type = `Elija al menos una de las opciones.`
    }

    if (!dataPlan.plan_type.trim()) {
      errorsForm.plan_type = `Elija una de las opciones.`
    }

    if (dataPlan.activities.length > 0) {
      /* dataPlan.activities.forEach((activity) => {
        const activeDaysCount = activity.days_of_week.filter(
          (day) => day
        ).length
        if (activeDaysCount < parseInt(activity.sessions_per_week)) {
          errorsFormActivities.push({
            id: activity.id,
            error:
              'El número de sesiones por semana no puede ser mayor al número de días seleccionados.'
          })
        }
      }) */
    }

    return { errorsForm, errorsFormActivities }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'start_date' || name === 'end_date') {
      setDataPlan({ ...dataPlan, [name]: new Date(value) })
    } else {
      setDataPlan({ ...dataPlan, [name]: value })
    }
  }

  const handleChangeBoolean = (name: string) => {
    let value
    if (dataPlan[name] === 'true') {
      value = 'false'
    } else {
      value = 'true'
    }

    setDataPlan({ ...dataPlan, [name]: value })
  }

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setDataPlan({ ...dataPlan, [name]: value })
  }

  const handleChangePayments = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    if (dataPlan.payment_type.includes(value)) {
      const newPayments = dataPlan.payment_type.filter(
        (payment) => payment != value
      )
      setDataPlan({ ...dataPlan, payment_type: newPayments })
    } else {
      setDataPlan({
        ...dataPlan,
        payment_type: [...dataPlan.payment_type, value]
      })
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const { errorsForm, errorsFormActivities } = validations({ dataPlan })
    setFormErrors(errorsForm)
    setFormErrorsActivities(errorsFormActivities)

    if (
      Object.keys(errorsForm).length === 0 &&
      Object.keys(errorsFormActivities).length === 0 &&
      workingBusiness
    ) {
      if (type === 'add') {
        const response = await addPlan({
          dataPlan,
          company_id: workingBusiness.id
        })
        if (response) {
          toast({
            title: 'Plan agregado.',
            description: 'Redireccionando...',
            className: 'bg-green-600'
          })

          setTimeout(() => {
            router.replace('/panel-de-control/facturacion/planes')
          }, 1000)
        }
      } else {
        const response = await updatePlan({
          dataPlan,
          company_id: workingBusiness.id
        })
        if (response) {
          toast({
            title: 'Plan editado.',
            description: 'Redireccionando...',
            className: 'bg-green-600'
          })

          setTimeout(() => {
            router.replace('/panel-de-control/facturacion/planes')
          }, 1000)
        }
      }

      setFormErrors(initialErrors)
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-6 mb-10 bg-card rounded-lg shadow-md pt-2 pb-6 px-2">
        <div className="flex gap-4 items-center">
          <label className="text-xl font-light mt-4 ml-4">
            Area de Trabajo
          </label>
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
      <form onSubmit={handleSubmit}>
        <AddActivitiesButton
          workingBusiness={workingBusiness}
          token={token}
          dataPlan={dataPlan}
          setDataPlan={setDataPlan}
          formErrorsActivities={formErrorsActivities}
        />
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-10 mb-4">
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <label htmlFor="name" className="font-[600]">
                Nombre
              </label>
              {formErrors.name && <ErrorText text={formErrors.name} />}
            </div>
            <input
              type="text"
              name="name"
              className="bg-card border border-gray-300 dark:border-gray-700 rounded-lg p-2 focus:border-primary-orange-500 focus:outline-none focus:ring-0"
              value={dataPlan.name}
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
              className="bg-card border border-gray-300 dark:border-gray-700 rounded-lg p-2 focus:border-primary-orange-500 focus:outline-none focus:ring-0"
              value={dataPlan.start_date.toISOString().split('T')[0]}
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
              className="bg-card border border-gray-300 dark:border-gray-700 rounded-lg p-2 focus:border-primary-orange-500 focus:outline-none focus:ring-0"
              value={dataPlan.end_date.toISOString().split('T')[0]}
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
              className="bg-card border border-gray-300 dark:border-gray-700 rounded-lg p-2 focus:border-primary-orange-500 focus:outline-none focus:ring-0"
              value={dataPlan.price}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <label htmlFor="plan_type" className="font-[600]">
                Tipo de plan
              </label>
              {formErrors.plan_type && (
                <ErrorText text={formErrors.plan_type} />
              )}
            </div>
            <select
              name="plan_type"
              className="bg-card border border-gray-300 dark:border-gray-700 rounded-lg p-[10px] cursor-pointer focus:border-primary-orange-500 focus:outline-none focus:ring-0"
              onChange={handleChangeSelect}
              defaultValue={dataPlan.plan_type}
            >
              <option value="" selected={dataPlan.plan_type === ''}>
                Seleccione tipo de cobro
              </option>
              {plansType.map((item) => (
                <option
                  key={item}
                  value={item}
                  selected={dataPlan.plan_type === item}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <label htmlFor="expiration_period" className="font-[600]">
                Plazo de vencimiento (En días)
              </label>
              {formErrors.expiration_period && (
                <ErrorText text={formErrors.expiration_period} />
              )}
            </div>
            <input
              type="number"
              name="expiration_period"
              className="bg-card border border-gray-300 dark:border-gray-700 rounded-lg p-2 focus:border-primary-orange-500 focus:outline-none focus:ring-0"
              value={dataPlan.expiration_period}
              onChange={handleChange}
            />
          </div>
          <div className="border bg-card rounded-lg flex items-center p-4 mt-2">
            <CustomCheckbox
              label="¿Permite generación de cuota?"
              value={dataPlan.generate_invoice}
              action={handleChangeBoolean}
              name="generate_invoice"
            />
          </div>
          <div className="border bg-card rounded-lg flex items-center p-4 mt-2">
            <CustomCheckbox
              label="¿Ofrece clase de prueba?"
              value={dataPlan.free_test}
              action={handleChangeBoolean}
              name="free_test"
            />
          </div>
          <div className="border bg-card rounded-lg flex items-center p-4 mt-2">
            <CustomCheckbox
              label="Vigente"
              value={dataPlan.current}
              action={handleChangeBoolean}
              name="current"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-10 mt-12">
          <div className="flex gap-4 items-center">
            <label htmlFor="payment_type" className="font-[600]">
              Modalidad de cobro
            </label>
            {formErrors.payment_type && (
              <ErrorText text={formErrors.payment_type} />
            )}
          </div>
          <div className="bg-card flex justify-center items-center border rounded-lg py-6">
            {paymentsType.map((paymentType) => (
              <label
                key={paymentType}
                className="container flex justify-center items-center gap-4 whitespace-nowrap"
              >
                <input
                  value={paymentType}
                  className="peer cursor-pointer hidden after:opacity-100"
                  checked={dataPlan.payment_type.includes(paymentType)}
                  type="checkbox"
                  onChange={handleChangePayments}
                />
                <span className="inline-block w-5 h-5 border-2 relative cursor-pointer after:content-[''] after:absolute after:top-2/4 after:left-2/4 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[10px] after:h-[10px] after:bg-card-foreground after:rounded-[2px] after:opacity-0 peer-checked:after:opacity-100"></span>
                {paymentType}
              </label>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-4 items-center">
            <label htmlFor="description" className="font-[600]">
              Descripción
            </label>
            {formErrors.description && (
              <ErrorText text={formErrors.description} />
            )}
          </div>
          <textarea
            name="description"
            rows={4}
            className="bg-card border border-gray-300 dark:border-gray-700 rounded-lg p-2 focus:border-primary-orange-500 focus:outline-none focus:ring-0"
            value={dataPlan.description}
            onChange={(e) =>
              setDataPlan({ ...dataPlan, description: e.target.value })
            }
          />
        </div>
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
            {!loadingPlan ? (
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
