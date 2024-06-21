'use client'

import { ImCross } from 'react-icons/im'
import Image from 'next/image'
import { FaCheck } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import useDiaries from '@/components/hooks/useDiaries'
import { Button } from '@/components/ui/button'
import {
  FormErrors,
  scheduleTypes,
  PropsAddDiary,
  daysOfWeek,
  genreTypes
} from '@/components/types/Diary'
import Loader from '@/components/Loader'
import useUser from '@/components/hooks/useUser'
import noImage from '@public/assets/no-image.png'
import { useToast } from '@/components/ui/use-toast'
import { Business } from '@/components/types/Business'
import { CustomCheckbox } from '../CustomCheckbox'
import ErrorText from '../global/ErrorText'

const initialErrors = {
  company_id: '',
  Diary: '',
  price: '',
  is_public: '',
  max_sessions: '',
  start_date: '',
  end_date: '',
  payment_type: '',
  public_name: ''
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL

export default function DiaryForm({
  type,
  diary
}: {
  type: string
  diary: PropsAddDiary
}) {
  const [showConfirmBack, setShowConfirmBack] = useState<boolean>(false)
  const [dataDiary, setDataDiary] = useState<PropsAddDiary>(diary)
  const [workingBusiness, setWorkingBusiness] = useState<Business | null>(null)
  const [formErrors, setFormErrors] = useState<FormErrors>(initialErrors)
  const { toast } = useToast()
  const router = useRouter()
  const { getWorkingBusiness, token, businesses } = useUser()
  const { addDiary, updateDiary, loadingDiary } = useDiaries()

  useEffect(() => {
    setDataDiary(diary)
  }, [diary])

  useEffect(() => {
    async function updateWorkingBusiness() {
      const res = await getWorkingBusiness()
      setWorkingBusiness(res)
    }

    if (token) {
      updateWorkingBusiness()
    }
  }, [token, businesses])

  const handleBack = () => {
    if (showConfirmBack) {
      router.replace('/panel-de-control/agenda')
    }
    setShowConfirmBack(false)
  }

  const handleConfirmBack = () => {
    setShowConfirmBack(true)
  }

  const handleCancelBack = () => {
    setShowConfirmBack(false)
  }

  const validations = ({ dataDiary }: { dataDiary: PropsAddDiary }) => {
    const errorsForm: FormErrors = {}

    if (!workingBusiness) {
      errorsForm.company_id = `Debes tener un area de trabajo (negocio) activo.`
    }

    if (dataDiary.activity.id === 0 || dataDiary.activity.name === '') {
      errorsForm.activity = `Debe asignar una Agenda.`
    }

    if (!dataDiary.type_schedule.trim()) {
      errorsForm.type_schedule = `Debe seleccionar un tipo.`
    }

    if (!dataDiary.date_from) {
      errorsForm.date_from = `Este campo no debe ser vacío.`
    }

    if (!dataDiary.date_until) {
      errorsForm.date_until = `Este campo no debe ser vacío.`
    }

    if (!dataDiary.time_from.trim()) {
      errorsForm.time_from = `Debe completar un rango de horario.`
    }
    if (!dataDiary.time_until.trim()) {
      errorsForm.time_until = `Debe completar un rango de horario.`
    }
    if (
      dataDiary.time_from &&
      dataDiary.time_until &&
      dataDiary.time_from >= dataDiary.time_until
    ) {
      errorsForm.time_until = `El horario final debe ser mayor que el inicial.`
    }

    if (dataDiary.term_duration <= 0) {
      errorsForm.term_duration = `La duración debe ser mayor a 0.`
    }

    if (dataDiary.amount_of_people <= 0) {
      errorsForm.amount_of_people = `La cantidad de personas debe ser mayor a 0.`
    }

    return errorsForm
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'start_date' || name === 'end_date') {
      setDataDiary({ ...dataDiary, [name]: new Date(value) })
    } else {
      setDataDiary({ ...dataDiary, [name]: value })
    }
  }

  const handleChangeDays = (
    e: React.ChangeEvent<HTMLInputElement>,
    dayIndex: number
  ) => {
    const { name } = e.target
    if (name === 'days_available') {
      setDataDiary({
        ...dataDiary,
        [name]: dataDiary.days_available.map((day, index) =>
          index === dayIndex ? !day : day
        )
      })
    }

    if (name === 'offer_days') {
      setDataDiary({
        ...dataDiary,
        [name]: dataDiary.offer_days.map((day, index) =>
          index === dayIndex ? !day : day
        )
      })
    }
  }

  const handleChangeBoolean = (name: string) => {
    let value
    if (dataDiary[name] === 'true') {
      value = 'false'
    } else {
      value = 'true'
    }

    setDataDiary({ ...dataDiary, [name]: value })
  }

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setDataDiary({ ...dataDiary, [name]: value })
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const err = validations({ dataDiary })
    setFormErrors(err)

    if (Object.keys(err).length === 0 && workingBusiness) {
      if (type === 'add') {
        const response = await addDiary({
          dataDiary,
          company_id: workingBusiness.id
        })
        if (response) {
          toast({
            title: 'Agenda agregada.',
            description: 'Redireccionando...',
            className: 'bg-green-600'
          })

          setTimeout(() => {
            router.replace('/panel-de-control/agenda')
          }, 1000)
        }
      } else {
        const response = await updateDiary({
          dataDiary,
          company_id: workingBusiness.id
        })
        if (response) {
          toast({
            title: 'Agenda editada.',
            description: 'Redireccionando...',
            className: 'bg-green-600'
          })

          setTimeout(() => {
            router.replace('/panel-de-control/agenda')
          }, 1000)
        }
      }

      setFormErrors(initialErrors)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-8 mb-10 bg-card rounded-lg shadow-md pt-2 pb-6 px-2">
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
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <label htmlFor="type_schedule" className="font-[600]">
                Tipo de agenda
              </label>
              {formErrors.type_schedule && (
                <ErrorText text={formErrors.type_schedule} />
              )}
            </div>
            <select
              name="type_schedule"
              className="bg-card border border-gray-300 dark:border-gray-700 rounded-lg p-[10px] cursor-pointer focus:border-primary-orange-500 focus:outline-none focus:ring-0"
              onChange={handleChangeSelect}
              defaultValue={dataDiary.type_schedule}
            >
              <option value="" selected={dataDiary.type_schedule === ''}>
                Seleccione tipo de agenda
              </option>
              {scheduleTypes.map((item) => (
                <option
                  key={item}
                  value={item}
                  selected={dataDiary.type_schedule === item}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <label htmlFor="date_from" className="font-[600]">
                Fecha Desde
              </label>
              {formErrors.date_from && (
                <ErrorText text={formErrors.date_from} />
              )}
            </div>
            <input
              type="date"
              name="date_from"
              className="bg-card border border-gray-300 dark:border-gray-700 rounded-lg p-2 focus:border-primary-orange-500 focus:outline-none focus:ring-0"
              value={dataDiary.date_from.toISOString().split('T')[0]}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <label htmlFor="date_until" className="font-[600]">
                Fecha Hasta
              </label>
              {formErrors.date_until && (
                <ErrorText text={formErrors.date_until} />
              )}
            </div>
            <input
              type="date"
              name="date_until"
              className="bg-card border border-gray-300 dark:border-gray-700 rounded-lg p-2 focus:border-primary-orange-500 focus:outline-none focus:ring-0"
              value={dataDiary.date_until.toISOString().split('T')[0]}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <label htmlFor="time_from" className="font-[600]">
                Horario Inicial
              </label>
              {formErrors.time_from && (
                <span className="text-red-500">{formErrors.time_from}</span>
              )}
            </div>
            <input
              type="time"
              name="time_from"
              className="bg-card border border-gray-300 dark:border-gray-700 rounded-lg p-2 focus:border-primary-orange-500 focus:outline-none focus:ring-0"
              value={dataDiary.time_from}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <label htmlFor="time_until" className="font-[600]">
                Horario Final
              </label>
              {formErrors.time_until && (
                <span className="text-red-500">{formErrors.time_until}</span>
              )}
            </div>
            <input
              type="time"
              name="time_until"
              className="bg-card border border-gray-300 dark:border-gray-700 rounded-lg p-2 focus:border-primary-orange-500 focus:outline-none focus:ring-0"
              value={dataDiary.time_until}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-[600]">Días Disponibles</label>
            {daysOfWeek.map((day, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="days_available"
                  checked={dataDiary.days_available[index]}
                  onChange={(e) => handleChangeDays(e, index)}
                />
                <label>{day}</label>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <label htmlFor="repeat_for" className="font-[600]">
                Repetir cada (días)
              </label>
              {formErrors.repeat_for && (
                <ErrorText text={formErrors.repeat_for} />
              )}
            </div>
            <input
              type="number"
              name="repeat_for"
              className="bg-card border border-gray-300 dark:border-gray-700 rounded-lg p-2 focus:border-primary-orange-500 focus:outline-none focus:ring-0"
              value={dataDiary.repeat_for}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-[600]">Días de Oferta</label>
            {daysOfWeek.map((day, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="offer_days"
                  checked={dataDiary.offer_days[index]}
                  onChange={(e) => handleChangeDays(e, index)}
                />
                <label>{day}</label>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <label htmlFor="term_duration" className="font-[600]">
                Duración (días)
              </label>
              {formErrors.term_duration && (
                <ErrorText text={formErrors.term_duration} />
              )}
            </div>
            <input
              type="number"
              name="term_duration"
              className="bg-card border border-gray-300 dark:border-gray-700 rounded-lg p-2 focus:border-primary-orange-500 focus:outline-none focus:ring-0"
              value={dataDiary.term_duration}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <label htmlFor="amount_of_people" className="font-[600]">
                Cantidad de personas
              </label>
              {formErrors.amount_of_people && (
                <ErrorText text={formErrors.amount_of_people} />
              )}
            </div>
            <input
              type="number"
              name="amount_of_people"
              className="bg-card border border-gray-300 dark:border-gray-700 rounded-lg p-2 focus:border-primary-orange-500 focus:outline-none focus:ring-0"
              value={dataDiary.amount_of_people}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <label htmlFor="genre_exclusive" className="font-[600]">
                Exclusividad de género
              </label>
              {formErrors.genre_exclusive && (
                <ErrorText text={formErrors.genre_exclusive} />
              )}
            </div>
            <select
              name="genre_exclusive"
              className="bg-card border border-gray-300 dark:border-gray-700 rounded-lg p-[10px] cursor-pointer focus:border-primary-orange-500 focus:outline-none focus:ring-0"
              onChange={handleChangeSelect}
              defaultValue={dataDiary.genre_exclusive}
            >
              <option value="" selected={dataDiary.genre_exclusive === ''}>
                Seleccione exclusividad
              </option>
              {genreTypes.map((item) => (
                <option
                  key={item}
                  value={item}
                  selected={dataDiary.type_schedule === item}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-8 mb-4">
            <div className="border bg-card rounded-lg flex items-center p-4">
              <CustomCheckbox
                label="Activa"
                value={dataDiary.is_active}
                name="is_active"
                action={handleChangeBoolean}
              />
            </div>
            <div className="border bg-card rounded-lg flex items-center p-4">
              <CustomCheckbox
                label="¿Trabaja feriados?"
                value={dataDiary.works_holidays}
                name="works_holidays"
                action={handleChangeBoolean}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <label htmlFor="description" className="font-[600]">
                Observcaciones
              </label>
              {formErrors.description && (
                <ErrorText text={formErrors.description} />
              )}
            </div>
            <textarea
              name="observations"
              rows={4}
              className="bg-card border border-gray-300 dark:border-gray-700 rounded-lg p-2 focus:border-primary-orange-500 focus:outline-none focus:ring-0"
              value={dataDiary.observations}
              onChange={(e) =>
                setDataDiary({ ...dataDiary, observations: e.target.value })
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
              {!loadingDiary ? (
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
        </div>
      </form>
    </div>
  )
}
