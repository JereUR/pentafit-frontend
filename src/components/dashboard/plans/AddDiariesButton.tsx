import { useEffect, useState } from 'react'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'
import { Cross1Icon } from '@radix-ui/react-icons'

import useDiaries from 'components/hooks/useDiaries'
import { Business } from 'components/types/Business'
import { Button } from 'components/ui/button'
import { FormErrorDiaries, PropsAddPlan } from 'components/types/Plan'
import { Diary } from '@/components/types/Diary'
import DiaryItems from './DiaryItems'

interface Props {
  workingBusiness: Business | null
  token: string | null
  dataPlan: PropsAddPlan
  setDataPlan: React.Dispatch<React.SetStateAction<PropsAddPlan>>
  formErrorsDiaries: FormErrorDiaries[]
}

const AddDiariesButton: React.FC<Props> = ({
  workingBusiness,
  token,
  dataPlan,
  setDataPlan,
  formErrorsDiaries
}) => {
  const [addIsOpen, setAddIsOpen] = useState<boolean>(false)
  const [diaries, setDiaries] = useState<Diary[] | []>([])
  const { getAllDiaries } = useDiaries()

  useEffect(() => {
    async function updateDiaries() {
      if (workingBusiness) {
        const res = await getAllDiaries(workingBusiness.id)
        if (res) setDiaries(res)
      }
    }

    if (token && workingBusiness) {
      updateDiaries()
    }
  }, [token, workingBusiness])

  const handleChangeDiaries = (
    id: number,
    diaryName: string,
    activityName: string
  ) => {
    if (dataPlan.diaries.some((diary) => diary.id === id)) {
      setDataPlan({
        ...dataPlan,
        diaries: dataPlan.diaries.filter((diary) => diary.id !== id)
      })
    } else {
      const diary = diaries.find((d) => d.id === id)
      if (diary) {
        setDataPlan({
          ...dataPlan,
          diaries: [
            ...dataPlan.diaries,
            {
              id,
              name: diaryName,
              activity: activityName,
              days_of_week: diary.days_available.map((day) => day.active),
              sessions_per_week: parseInt('7')
            }
          ]
        })
      }
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
    <div className="flex flex-col gap-6 mb-8">
      <div className="relative">
        <Button
          type="button"
          variant="outline"
          className="flex h-10 text-foreground font-semibold  gap-2 border-none bg-green-500 dark:bg-green-600 transition duration-300 ease-in-out hover:bg-green-600 dark:hover:bg-green-700"
          onClick={handleButtonClick}
        >
          Agregar agendas
          {addIsOpen ? <MdExpandLess /> : <MdExpandMore />}
        </Button>
        {addIsOpen && (
          <div
            onClick={() => setAddIsOpen(false)}
            className="absolute w-[40vw] xl:w-[30vw] bg-card mt-3 mr-5 rounded-lg shadow-lg border dark:border-none z-20"
          >
            <div className="p-4" onClick={handleMenuClick}>
              <div className="flex justify-between items-center">
                <p className="text-lg font-medium text-foreground">
                  Agenda a agregar
                </p>
                <Button
                  onClick={handleCloseMenu}
                  className="text-gray-400 dark:text-muted bg-transparent border transition duration-300 ease-in-out hover:text-foreground dark:hover:text-foreground hover:bg-gray-50 dark:hover:bg-background"
                >
                  <Cross1Icon />
                </Button>
              </div>
              <hr className="my-2 border-gray-200 dark:border-gray-500" />
              <div className="grid grid-cols-2 gap-1">
                {diaries.length > 0 ? (
                  diaries.map((diary) => (
                    <label
                      key={diary.id}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="mr-2 cursor-pointer"
                        checked={dataPlan.diaries.some(
                          (d) => d.id === diary.id
                        )}
                        onChange={() =>
                          handleChangeDiaries(
                            diary.id,
                            diary.name,
                            diary.activity.name
                          )
                        }
                      />
                      <span className="flex gap-2 text-sm ml-2 mr-4 my-1 p-1 w-full rounded-r-full transition duration-500 ease-in-out link-progress">
                        {diary.activity.name} ({diary.name})
                      </span>
                    </label>
                  ))
                ) : (
                  <div>No hay actividades</div>
                )}
              </div>

              <hr className="my-2 border-gray-200 dark:border-gray-500" />
              <div className="flex justify-center">
                <Button
                  type="button"
                  className="font-semibold text-foreground bg-background transition duration-300 ease-in-out hover:bg-gray-50 w-full mx-4 mb-1 mt-2 p-1"
                  onClick={handleCloseMenu}
                >
                  Confirmar
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <DiaryItems
        diaries={diaries}
        dataPlan={dataPlan}
        setDataPlan={setDataPlan}
        formErrorsDiaries={formErrorsDiaries}
      />
    </div>
  )
}

export default AddDiariesButton
