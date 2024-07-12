'use client'

import { ImCross } from 'react-icons/im'
import Image from 'next/image'
import { FaCheck } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import useDiaries from 'components/hooks/useDiaries'
import { Button } from 'components/ui/button'
import {
  scheduleTypes,
  PropsAddDiary,
  genreTypes,
  daysOfWeekCut,
  DaysAvailable,
  hoursOfDays,
  FormErrors,
  initialErrors
} from 'components/types/Diary'
import Loader from 'components/Loader'
import useUser from 'components/hooks/useUser'
import noImage from '../../../../public/assets/no-image.png'
import { useToast } from 'components/ui/use-toast'
import { Business } from 'components/types/Business'
import { CustomCheckbox } from '../CustomCheckbox'
import ErrorText from '../global/ErrorText'
import { Activity } from '@/components/types/Activity'
import useActivities from '@/components/hooks/useActivities'
import ActivityPicker from './ActivityPicker'
import WorkingArea from '../WorkingArea'
import DayTimes from './DayTimes'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

export default function DiaryForm({
  type,
  diary
}: {
  type: string
  diary: PropsAddDiary
}) {
  const [showConfirmBack, setShowConfirmBack] = useState<boolean>(false)
  const [dataDiary, setDataDiary] = useState<PropsAddDiary>(diary)
  const [showTimes, setShowTimes] = useState<boolean>(false)
  const [workingBusiness, setWorkingBusiness] = useState<Business | null>(null)
  const [activities, setActivities] = useState<Activity[]>([])
  const [formErrors, setFormErrors] = useState<FormErrors>(initialErrors)
  const { toast } = useToast()
  const router = useRouter()
  const { getWorkingBusiness, token, businesses } = useUser()
  const { addDiary, updateDiary, loadingDiary } = useDiaries()
  const { getAllActivities } = useActivities()

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

  useEffect(() => {
    async function updateActivities() {
      if (workingBusiness) {
        const res = await getAllActivities(workingBusiness.id)
        setActivities(res)
      }
    }

    if (token && workingBusiness) {
      updateActivities()
    }
  }, [token, workingBusiness])

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
      errorsForm.activity = `Debe asignar una actividad a la agenda.`
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

    if (!dataDiary.days_available.some((day) => day.active)) {
      errorsForm.days_available = `Debe seleccionar al menos un día disponible.`
    }

    for (const day of dataDiary.days_available) {
      if (day.active) {
        if (!day.time_start.trim()) {
          errorsForm.time_start =
            'Debe completar el horario de inicio de todos los dias.'
        }
        if (!day.time_end.trim()) {
          errorsForm.time_end =
            'Debe completar el horario de fin de todos los dia.'
        }
        if (day.time_start && day.time_end && day.time_start >= day.time_end) {
          errorsForm.time_end =
            'El horario final debe ser mayor que el inicial en todos los dias.'
        }
      }
    }

    if (dataDiary.term_duration <= 0) {
      errorsForm.term_duration = `La duración debe ser mayor a 0.`
    }

    if (dataDiary.amount_of_people <= 0) {
      errorsForm.amount_of_people = `La cantidad de personas debe ser mayor a 0.`
    }

    for (let i = 0; i < dataDiary.days_available.length; i++) {
      if (dataDiary.offer_days[i] && !dataDiary.days_available[i].active) {
        errorsForm.offer_days = `No puede haber un día de oferta donde el día no está disponible.`
        break
      }
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

  const handleHourSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    idx?: number
  ) => {
    const { value, name } = e.target
    console.log(name, value)

    if (name === 'time_start' || name === 'time_end') {
      if (idx !== undefined) {
        const updatedDays = [...dataDiary.days_available]
        updatedDays[idx][name] = value
        setDataDiary({ ...dataDiary, days_available: updatedDays })
      }
    } else {
      if (name === 'time_from') {
        const updatedDays = [...dataDiary.days_available]
        updatedDays.map((day) => {
          day['time_start'] = value
        })
        setDataDiary({
          ...dataDiary,
          [name]: value,
          days_available: updatedDays
        })
      }
      if (name === 'time_until') {
        const updatedDays = [...dataDiary.days_available]
        updatedDays.map((day) => {
          day['time_end'] = value
        })
        setDataDiary({
          ...dataDiary,
          [name]: value,
          days_available: updatedDays
        })
      }
    }
  }

  const handleChangeDays = (
    e: React.ChangeEvent<HTMLInputElement>,
    dayIndex: number
  ) => {
    const { name, value } = e.target
    if (name === 'days_available') {
      setDataDiary({
        ...dataDiary,
        days_available: dataDiary.days_available.map((day, index) =>
          index === dayIndex ? { ...day, active: !day.active } : day
        )
      })
    } else if (name === 'time_start' || name === 'time_end') {
      setDataDiary({
        ...dataDiary,
        days_available: dataDiary.days_available.map((day, index) =>
          index === dayIndex ? { ...day, [name]: value } : day
        )
      })
    } else if (name === 'offer_days') {
      setDataDiary({
        ...dataDiary,
        offer_days: dataDiary.offer_days.map((day, index) =>
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

  console.log(dataDiary)

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <WorkingArea
          formErrors={formErrors}
          workingBusiness={workingBusiness}
        />
        <div className="flex justify-center mb-10">
          <ActivityPicker
            dataDiary={dataDiary}
            setDataDiary={setDataDiary}
            activities={activities}
          />
        </div>
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
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
              value={dataDiary.name}
              onChange={handleChange}
            />
          </div>
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
                Horario Desde (global)
              </label>
            </div>
            <select
              name="time_from"
              value={dataDiary.time_from}
              onChange={(e) => handleHourSelectChange(e)}
              className="bg-card border border-gray-300 dark:border-gray-700 rounded-lg p-[10px] cursor-pointer focus:border-primary-orange-500 focus:outline-none focus:ring-0"
            >
              <option value="" selected={dataDiary.time_from === ''}>
                Seleccione un horario de inicio
              </option>
              {hoursOfDays.map((time, timeIdx) => (
                <option
                  key={`${timeIdx}-${dataDiary.time_from === time}`} // Combine index and selected time
                  value={time}
                  selected={dataDiary.time_from === time}
                >
                  {time}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <label htmlFor="time_until" className="font-[600]">
                Horario Hasta (global)
              </label>
            </div>
            <select
              name="time_until"
              value={dataDiary.time_until}
              onChange={(e) => handleHourSelectChange(e)}
              className="bg-card border border-gray-300 dark:border-gray-700 rounded-lg p-[10px] cursor-pointer focus:border-primary-orange-500 focus:outline-none focus:ring-0"
            >
              <option value="" selected={dataDiary.time_until === ''}>
                Seleccione un horario de inicio
              </option>
              {hoursOfDays.map((time, timeIdx) => (
                <option
                  key={timeIdx}
                  value={time}
                  selected={dataDiary.time_until === time}
                >
                  {time}
                </option>
              ))}
            </select>
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
        </div>

        <div>
          <div className="flex gap-16 mb-6">
            <div className="flex-1 flex flex-col gap-2 p-6 bg-card justify-center items-center rounded-lg border">
              <div className="flex flex-col gap-4 items-center">
                {formErrors.offer_days && (
                  <ErrorText text={formErrors.offer_days} />
                )}
                <label className="text-lg font-[600] text-center mb-4">
                  Días disponibles
                </label>
              </div>
              <div className="flex flex-col flex-wrap items-center mx-6 mb-2">
                <div className="flex flex-col items-center">
                  <div className="flex gap-2">
                    {daysOfWeekCut.map((day, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        <input
                          type="checkbox"
                          name="days_available"
                          id={`days_available_${idx}`}
                          className="mb-1 cursor-pointer"
                          checked={dataDiary.days_available[idx].active}
                          onChange={(e) => handleChangeDays(e, idx)}
                        />
                        <label>{day}</label>
                      </div>
                    ))}
                  </div>
                  <div className="relative mt-2">
                    <button
                      type="button"
                      onClick={() => setShowTimes(!showTimes)}
                      className="cursor-pointer text-gray-500"
                    >
                      {showTimes &&
                      dataDiary.days_available.some((day) => day.active) ? (
                        <IoIosArrowUp className="h-5 w-5" />
                      ) : (
                        <IoIosArrowDown className="h-5 w-5" />
                      )}
                    </button>
                    {showTimes &&
                      dataDiary.days_available.some((day) => day.active) && (
                        <div className="flex justify-center">
                          <DayTimes
                            dataDiary={dataDiary}
                            formErrors={formErrors}
                            handleSelectChange={handleHourSelectChange}
                          />
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-2 p-6 bg-card justify-center items-center rounded-lg border">
              <div className="flex flex-col gap-4 items-center">
                {formErrors.offer_days && (
                  <ErrorText text={formErrors.offer_days} />
                )}
                <label className="text-lg font-[600] text-center mb-4">
                  Días de Oferta
                </label>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                {daysOfWeekCut.map((day, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <input
                      type="checkbox"
                      name="offer_days"
                      id={`offer_days_${index}`}
                      className="mb-1 cursor-pointer"
                      checked={dataDiary.offer_days[index]}
                      onChange={(e) => handleChangeDays(e, index)}
                    />
                    <label
                      htmlFor={`offer_days_${index}`}
                      className="cursor-pointer"
                    >
                      {day}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-16 mb-6">
            <div className="border bg-card rounded-lg flex items-center py-4 w-[20vw]">
              <CustomCheckbox
                label="Activa"
                value={dataDiary.is_active}
                name="is_active"
                action={handleChangeBoolean}
                className="flex-col"
              />
            </div>
            <div className="border bg-card rounded-lg flex items-center py-4 w-[20vw]">
              <CustomCheckbox
                label="¿Trabaja feriados?"
                value={dataDiary.works_holidays}
                name="works_holidays"
                action={handleChangeBoolean}
                className="flex-col"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <label htmlFor="description" className="font-[600]">
                Observaciones
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
