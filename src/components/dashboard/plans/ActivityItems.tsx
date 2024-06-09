import ErrorText from '@/components/ErrorText'
import { Activity } from '@/components/types/Activity'
import { FormErrorActivities, PropsAddPlan } from '@/components/types/Plan'
import React from 'react'

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
    <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
      {dataPlan.activities.map((activity) => {
        const activityData = activities.find((act) => act.id === activity.id)
        if (!activityData) return null

        return (
          <div
            key={activity.id}
            className="bg-card mx-4 p-2 border rounded-lg w-full"
          >
            <div className="flex items-center">
              <span className="mr-2">{activityData.name}</span>
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
              <button
                type="button"
                className="text-red-600 text-lg"
                onClick={() => handleRemoveActivity(activity.id)}
              >
                x
              </button>
            </div>

            <div className="flex items-center gap-2 mt-2">
              {daysOfWeekLabels.map((day, index) => (
                <label key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={activity.days_of_week[index]}
                    onChange={() => handleDayChange(activity.id, index)}
                  />
                  <span className="ml-1">{day}</span>
                </label>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-2">
              <label>
                Maximo de sesiones por semana:
                <input
                  type="number"
                  min="1"
                  max="7"
                  value={activity.sessions_per_week}
                  onChange={(e) => handleSessionsChange(e, activity.id)}
                />
              </label>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ActivityItems
