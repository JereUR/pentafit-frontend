import { Cross1Icon } from '@radix-ui/react-icons'
import React from 'react'

import ErrorText from '@/components/ErrorText'
import { Activity } from '@/components/types/Activity'
import { FormErrorActivities, PropsAddPlan } from '@/components/types/Plan'
import { Button } from '@/components/ui/button'

interface Props {
  dataPlan: PropsAddPlan
  setDataPlan: React.Dispatch<React.SetStateAction<PropsAddPlan>>
  activities: Activity[]
  formErrorsActivities: FormErrorActivities[]
}

const ActivityItems: React.FC<Props> = ({
  dataPlan,
  setDataPlan,
  activities,
  formErrorsActivities
}) => {
  const handleRemoveActivity = (activityId: number) => {
    setDataPlan({
      ...dataPlan,
      activities: dataPlan.activities.filter(
        (activity) => activity.id !== activityId
      )
    })
  }

  const handleDayChange = (activityId: number, dayIndex: number) => {
    setDataPlan((prev) => ({
      ...prev,
      activities: prev.activities.map((activity) =>
        activity.id === activityId
          ? {
              ...activity,
              days_of_week: activity.days_of_week.map((day, index) =>
                index === dayIndex ? !day : day
              )
            }
          : activity
      )
    }))
  }

  const handleSessionsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    activityId: number
  ) => {
    const { value } = e.target

    setDataPlan((prev) => ({
      ...prev,
      activities: prev.activities.map((activity) =>
        activity.id === activityId
          ? { ...activity, sessions_per_week: value }
          : activity
      )
    }))
  }

  const daysOfWeekLabels = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']

  return (
    <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-8">
      {dataPlan.activities.map(
        (activity: {
          id: number
          days_of_week: boolean[]
          sessions_per_week: string
        }) => {
          const activityData = activities.find((act) => act.id === activity.id)
          if (!activityData) return null

          return (
            <div
              key={activity.id}
              className="bg-card mx-2 xl:mx-6 p-4 rounded-lg flex flex-col justify-between h-full shadow-md"
            >
              <div>
                <div className="flex justify-between gap-4">
                  <span className="mr-2 text-lg font-light py-1 px-2 bg-gray-100 dark:bg-background rounded-lg">
                    {activityData.name}
                  </span>
                  <Button
                    type="button"
                    className="bg-gray-50 dark:bg-background transition duration-300 ease-in-out hover:bg-background dark:hover:bg-card hover:border hover:scale-[1.02]"
                    onClick={() => handleRemoveActivity(activity.id)}
                  >
                    <Cross1Icon className="text-red-600" />
                  </Button>
                </div>
              </div>

              <div>
                <div className="my-4">
                  <p className="italic text-primary-orange-600">
                    Restricciones (Opcional)
                  </p>
                </div>
                <div className="m-2 p-4 border rounded-lg">
                  <span className="font-semibold">
                    Días de la semana habilitados:
                  </span>
                  <div className="flex justify-center items-center gap-2 mt-2">
                    {daysOfWeekLabels.map((day, index) => (
                      <label
                        key={index}
                        className="flex flex-col items-center gap-2 cursor-pointer"
                      >
                        <span className="ml-1">{day}</span>
                        <input
                          type="checkbox"
                          checked={activity.days_of_week[index]}
                          onChange={() => handleDayChange(activity.id, index)}
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
                    value={activity.sessions_per_week}
                    onChange={(e) => handleSessionsChange(e, activity.id)}
                  />
                </div>
              </div>
              {formErrorsActivities &&
                formErrorsActivities.map((errorActivity) => {
                  if (errorActivity.id === activity.id) {
                    return (
                      <ErrorText
                        key={errorActivity.id}
                        text={errorActivity.error}
                      />
                    )
                  }
                  return null
                })}
            </div>
          )
        }
      )}
    </div>
  )
}

export default ActivityItems
