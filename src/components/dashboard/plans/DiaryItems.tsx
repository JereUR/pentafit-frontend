import { useState } from 'react'
import { Cross1Icon } from '@radix-ui/react-icons'
import React from 'react'

import { daysOfWeekCut, Diary } from 'components/types/Diary'
import { FormErrorDiaries, PropsAddPlan } from 'components/types/Plan'
import { Button } from 'components/ui/button'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'
import ErrorText from '../global/ErrorText'

interface Props {
  dataPlan: PropsAddPlan
  setDataPlan: React.Dispatch<React.SetStateAction<PropsAddPlan>>
  diaries: Diary[]
  formErrorsDiaries: FormErrorDiaries[]
}

const DiaryItems: React.FC<Props> = ({
  dataPlan,
  setDataPlan,
  diaries,
  formErrorsDiaries
}) => {
  const [dropdownOpen, setDropdownOpen] = useState<{ [key: number]: boolean }>(
    {}
  )

  const handleRemoveDiary = (diaryId: number) => {
    setDataPlan({
      ...dataPlan,
      diaries: dataPlan.diaries.filter((diary) => diary.id !== diaryId)
    })
  }

  const handleDayChange = (diaryId: number, dayIndex: number) => {
    setDataPlan((prev) => ({
      ...prev,
      diaries: prev.diaries.map((diary) =>
        diary.id === diaryId
          ? {
              ...diary,
              days_of_week: diary.days_of_week.map((day, index) =>
                index === dayIndex ? !day : day
              )
            }
          : diary
      )
    }))
  }

  const handleSessionsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    diaryId: number
  ) => {
    const { value } = e.target

    setDataPlan((prev) => ({
      ...prev,
      diaries: prev.diaries.map((diary) =>
        diary.id === diaryId
          ? { ...diary, sessions_per_week: parseInt(value) }
          : diary
      )
    }))
  }

  const toggleDropdown = (DiaryId: number) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [DiaryId]: !prev[DiaryId]
    }))
  }

  const handleDisabled = (id: number, index: number) => {
    const diary = diaries.find((d) => d.id === id)
    if (diary) {
      return !diary.days_available[index].active
    }
    return false
  }

  return (
    <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-8">
      {dataPlan.diaries.map((diary) => {
        const diaryData = diaries.find((d) => d.id === diary.id)
        if (!diaryData) return null

        return (
          <div
            key={diary.id}
            className="bg-card mx-2 xl:mx-6 p-4 rounded-lg flex flex-col justify-between h-full shadow-md relative"
          >
            <div>
              <div className="flex justify-between gap-4">
                <span className="mr-2 text-lg font-light py-1 px-2 bg-gray-100 dark:bg-background rounded-lg">
                  {`${diaryData.activity.name} (${diaryData.name})`}
                </span>
                <Button
                  type="button"
                  className="bg-gray-50 dark:bg-background transition duration-300 ease-in-out hover:bg-background dark:hover:bg-card hover:border hover:scale-[1.02]"
                  onClick={() => handleRemoveDiary(diary.id)}
                >
                  <Cross1Icon className="text-red-600" />
                </Button>
              </div>
            </div>
            <div className="relative m-2 mt-6">
              <Button
                type="button"
                className="flex items-center bg-card justify-between w-full text-left p-2 border rounded-lg transition duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-background"
                onClick={() => toggleDropdown(diary.id)}
              >
                <span className="italic text-primary-orange-600">
                  Configurar Restricciones (Opcional)
                </span>
                {dropdownOpen[diary.id] ? (
                  <MdExpandLess className="text-primary-orange-600" />
                ) : (
                  <MdExpandMore className="text-primary-orange-600" />
                )}
              </Button>
              {dropdownOpen[diary.id] && (
                <div className="absolute left-0 w-full mt-2 p-4 bg-card border rounded-lg shadow-lg z-10">
                  <div className="m-2 p-4 border rounded-lg">
                    <span className="font-semibold">
                      Días de la semana habilitados:
                    </span>
                    <div className="flex justify-center items-center gap-2 mt-2">
                      {daysOfWeekCut.map((day, index) => (
                        <label
                          key={index}
                          className="flex flex-col items-center gap-2 cursor-pointer"
                        >
                          <span className="ml-1">{day}</span>
                          <input
                            type="checkbox"
                            className="cursor-pointer"
                            checked={diary.days_of_week[index]}
                            disabled={handleDisabled(diary.id, index)}
                            onChange={() => handleDayChange(diary.id, index)}
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2 my-4 mx-2 p-4 border rounded-lg">
                    <span>Maximo de sesiones por semana:</span>
                    <input
                      className="bg-card border border-gray-300 dark:border-gray-700 text-center rounded-lg p-2 focus:border-primary-orange-500 focus:outline-none focus:ring-0"
                      type="number"
                      min="1"
                      max="7"
                      value={diary.sessions_per_week}
                      onChange={(e) => handleSessionsChange(e, diary.id)}
                    />
                  </div>
                </div>
              )}
            </div>
            {formErrorsDiaries &&
              formErrorsDiaries.map((errorDiary) => {
                if (errorDiary.id === diary.id) {
                  return (
                    <ErrorText key={errorDiary.id} text={errorDiary.error} />
                  )
                }
                return null
              })}
          </div>
        )
      })}
    </div>
  )
}

export default DiaryItems
