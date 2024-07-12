import React from 'react'
import ErrorText from '../global/ErrorText'
import {
  daysOfWeekCut,
  FormErrors,
  hoursOfDays,
  PropsAddDiary
} from '@/components/types/Diary'

interface Props {
  formErrors: FormErrors
  dataDiary: PropsAddDiary
  handleSelectChange: (
    e: React.ChangeEvent<HTMLSelectElement>,
    idx?: number
  ) => void
}

const DayTimes: React.FC<Props> = ({
  formErrors,
  dataDiary,
  handleSelectChange
}) => {
  return (
    <div className="absolute mt-2 bg-card border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg py-4 px-8 w-fit slide-in-down-medium z-50">
      <div className="flex flex-col gap-2">
        {formErrors.time_start && <ErrorText text={formErrors.time_start} />}
        {formErrors.time_end && <ErrorText text={formErrors.time_end} />}
        <label className="font-[600] mb-2">
          Horarios de inicio y fin por día
        </label>
        <div className="flex flex-col gap-2">
          {dataDiary.days_available.map((day, idx) => {
            if (day.active)
              return (
                <div key={idx} className="flex gap-8 items-center">
                  <label>{daysOfWeekCut[idx]}</label>
                  <div className="flex gap-4">
                    <select
                      name="time_start"
                      value={dataDiary.days_available[idx].time_start}
                      onChange={(e) => handleSelectChange(e, idx)}
                      className="bg-card border border-gray-300 dark:border-gray-700 rounded-lg p-[10px] cursor-pointer focus:border-primary-orange-500 focus:outline-none focus:ring-0"
                    >
                      <option
                        value=""
                        selected={
                          dataDiary.days_available[idx].time_start === ''
                        }
                      >
                        Seleccione un horario de inicio
                      </option>
                      {hoursOfDays.map((time, timeIdx) => (
                        <option
                          key={timeIdx}
                          value={time}
                          selected={
                            dataDiary.days_available[idx].time_start === time
                          }
                        >
                          {time}
                        </option>
                      ))}
                    </select>

                    <select
                      name="time_end"
                      value={dataDiary.days_available[idx].time_end}
                      onChange={(e) => handleSelectChange(e, idx)}
                      className="bg-card border border-gray-300 dark:border-gray-700 rounded-lg p-[10px] cursor-pointer focus:border-primary-orange-500 focus:outline-none focus:ring-0"
                    >
                      <option
                        value=""
                        selected={dataDiary.days_available[idx].time_end === ''}
                      >
                        Seleccione un horario de fin
                      </option>
                      {hoursOfDays.map((time, timeIdx) => (
                        <option
                          key={timeIdx}
                          value={time}
                          selected={
                            dataDiary.days_available[idx].time_end === time
                          }
                        >
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )
          })}
        </div>
      </div>
    </div>
  )
}

export default DayTimes
