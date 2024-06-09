import useActivities from '@/components/hooks/useActivities'
import { Activity } from '@/components/types/Activity'
import { Business } from '@/components/types/Business'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'
import ActivityItems from './ActivityItems'
import { FormErrorActivities, PropsAddPlan } from '@/components/types/Plan'

interface Props {
  workingBusiness: Business | null
  token: string | null
  dataPlan: PropsAddPlan
  setDataPlan: React.Dispatch<React.SetStateAction<PropsAddPlan>>
  formErrorsActivities: FormErrorActivities[]
}

const AddActivitiesButton: React.FC<Props> = ({
  workingBusiness,
  token,
  dataPlan,
  setDataPlan,
  formErrorsActivities
}) => {
  const [addIsOpen, setAddIsOpen] = useState<boolean>(false)
  const [activities, setActivities] = useState<Activity[] | []>([])
  const { getAllActivities } = useActivities()

  useEffect(() => {
    async function updateActivities() {
      if (workingBusiness) {
        const res = await getAllActivities(workingBusiness.id)
        if (res) setActivities(res)
      }
    }

    if (token && workingBusiness) {
      updateActivities()
    }
  }, [token, workingBusiness])

  const handleChangeActivities = (id: number) => {
    if (dataPlan.activities.some((activity) => activity.id === id)) {
      setDataPlan({
        ...dataPlan,
        activities: dataPlan.activities.filter((activity) => activity.id !== id)
      })
    } else {
      setDataPlan({
        ...dataPlan,
        activities: [
          ...dataPlan.activities,
          { id, days_of_week: Array(7).fill(true), sessions_per_week: '7' }
        ]
      })
    }
  }

  const handleButtonClick = () => {
    setAddIsOpen(!addIsOpen)
  }

  const handleCloseMenu = () => {
    setAddIsOpen(false)
  }

  const handleMenuClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
  }

  return (
    <div className="flex flex-col justify-center gap-6 items-center mb-8">
      <div className="relative">
        <Button
          type="button"
          variant="outline"
          className="flex h-10 text-foreground font-semibold items-center gap-2 border-none bg-green-600 transition duration-300 ease-in-out hover:bg-green-700"
          onClick={handleButtonClick}
        >
          Agregar actividades
          {addIsOpen ? <MdExpandLess /> : <MdExpandMore />}
        </Button>
        {addIsOpen && (
          <div
            onClick={() => setAddIsOpen(false)}
            className="absolute w-[20vw] xl:w-[15vw] bg-card mt-3 mr-5 rounded shadow-lg z-10"
          >
            <div className="p-4" onClick={handleMenuClick}>
              <p className="text-lg font-medium text-foreground">
                Actividades a agregar
              </p>
              <hr className="my-2 border-gray-200 dark:border-gray-500" />
              {activities.length > 0 ? (
                activities.map((activity) => (
                  <label
                    key={activity.id}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="mr-2 cursor-pointer"
                      checked={dataPlan.activities.some(
                        (a) => a.id === activity.id
                      )}
                      onChange={() => handleChangeActivities(activity.id)}
                    />
                    <span className="flex gap-2 text-sm ml-2 mr-4 my-1 p-1 w-full rounded-r-full transition duration-500 ease-in-out hover:bg-primary-orange-600">
                      {activity.name}
                    </span>
                  </label>
                ))
              ) : (
                <div>No hay actividades</div>
              )}

              <hr className="my-2 border-gray-200 dark:border-gray-500" />
              <div className="flex justify-center">
                <Button
                  type="button"
                  className="font-semibold text-foreground bg-background transition duration-300 ease-in-out hover:bg-accent w-full mx-4 mb-1 mt-2 p-1"
                  onClick={handleCloseMenu}
                >
                  Confirmar
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ActivityItems
        activities={activities}
        dataPlan={dataPlan}
        setDataPlan={setDataPlan}
        formErrorsActivities={formErrorsActivities}
      />
    </div>
  )
}

export default AddActivitiesButton
