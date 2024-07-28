'use client'

import { Cross1Icon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import { BiEdit, BiTrash } from 'react-icons/bi'
import { useEffect, useState } from 'react'

import { Plan, DiaryPlan } from '@/components/types/Plan'
import { daysOfWeek } from '@/components/types/Diary'
import usePlans from '@/components/hooks/usePlans'
import Loader from '@/components/Loader'

interface Props {
  showInfo: boolean
  planToShow: Plan | null
  handleCloseInfo: () => void
  handleClickDelete: (planId: number) => void
}

const PlanItem: React.FC<Props> = ({
  showInfo,
  planToShow,
  handleCloseInfo,
  handleClickDelete
}) => {
  const [diaries, setDiaries] = useState<DiaryPlan[]>([])
  const { getDiariesForPlan, loadingPlan } = usePlans()
  console.log(diaries)

  const router = useRouter()

  useEffect(() => {
    async function getDiaries() {
      if (planToShow) {
        const res = await getDiariesForPlan({ id: planToShow.id })
        if (res) {
          setDiaries(res)
        }
      }
    }

    getDiaries()
  }, [planToShow])

  return (
    <div>
      {showInfo && planToShow && (
        <div className="fixed inset-0  z-[100] flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-card text-foreground p-6 rounded-lg shadow-lg w-3/4 max-h-[80vh] overflow-y-auto  scrollbar-thin scrollbar-thumb-rounded scrollbar-track-rounded scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-semibold mb-4 text-primary-orange-500 dark:text-primary-orange-600">
                Información del Plan
              </h4>
              <div className="flex justify-center gap-2">
                <button
                  className="bg-transparent text-white py-2 rounded"
                  onClick={(e) => {
                    e.stopPropagation()
                    router.push(
                      `/panel-de-control/planes/editar/${planToShow.id}`
                    )
                  }}
                >
                  <BiEdit className="h-4 w-4 md:h-6 md:w-6 text-blue-500 dark:text-blue-600 transition duration-300 ease-in-out hover:scale-[1.07] hover:text-blue-800 dark:hover:text-blue-700" />
                </button>
                <button
                  className="bg-transparent text-white py-2 rounded"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleClickDelete(planToShow.id)
                  }}
                >
                  <BiTrash className="h-4 w-4 md:h-6 md:w-6 text-red-500 dark:text-red-600 transition duration-300 ease-in-out hover:scale-[1.07] hover:text-red-800 dark:hover:text-red-700" />
                </button>
                <button onClick={handleCloseInfo}>
                  <Cross1Icon className="h-4 w-4 md:h-6 md:w-6 text-red-500 dark:text-red-600 transition duration-300 ease-in-out hover:scale-[1.07] hover:text-red-800 dark:hover:text-red-700" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-8">
              <p className="text-lg bg-gray-100 dark:bg-gray-800 text-primary-orange-500 dark:text-primary-orange-600 rounded-lg p-2">
                <strong className="text-foreground">Nombre:</strong>{' '}
                {planToShow.name}
              </p>
              <p className="text-lg bg-gray-100 dark:bg-gray-800 text-primary-orange-500 dark:text-primary-orange-600 rounded-lg p-2">
                <strong className="text-foreground">Descripción:</strong>{' '}
                {planToShow.description}
              </p>
              <p className="text-lg bg-gray-100 dark:bg-gray-800 text-primary-orange-500 dark:text-primary-orange-600 rounded-lg p-2">
                <strong className="text-foreground">Precio:</strong>{' '}
                {planToShow.price}
              </p>
              <p className="text-lg bg-gray-100 dark:bg-gray-800 text-primary-orange-500 dark:text-primary-orange-600 rounded-lg p-2">
                <strong className="text-foreground">Fecha desde:</strong>{' '}
                {planToShow.start_date}
              </p>
              <p className="text-lg bg-gray-100 dark:bg-gray-800 text-primary-orange-500 dark:text-primary-orange-600 rounded-lg p-2">
                <strong className="text-foreground">Fecha hasta:</strong>{' '}
                {planToShow.end_date}
              </p>
              <p className="text-lg bg-gray-100 dark:bg-gray-800 text-primary-orange-500 dark:text-primary-orange-600 rounded-lg p-2">
                <strong className="text-foreground">
                  Plazo de Vencimiento:
                </strong>{' '}
                {planToShow.expiration_period} días
              </p>
              <p className="text-lg bg-gray-100 dark:bg-gray-800 text-primary-orange-500 dark:text-primary-orange-600 rounded-lg p-2">
                <strong className="text-foreground">¿Genera cuota?:</strong>{' '}
                {planToShow.generate_invoice ? 'Sí' : 'No'}
              </p>
              <p className="text-lg bg-gray-100 dark:bg-gray-800 text-primary-orange-500 dark:text-primary-orange-600 rounded-lg p-2">
                <strong className="text-foreground">Tipo de cobro:</strong>{' '}
                {planToShow.payment_type.map((payment, index) => {
                  if (index < planToShow.payment_type.length - 1) {
                    return payment + ' | '
                  } else {
                    return payment
                  }
                })}
              </p>
              <p className="text-lg bg-gray-100 dark:bg-gray-800 text-primary-orange-500 dark:text-primary-orange-600 rounded-lg p-2">
                <strong className="text-foreground">Tipo de actividad:</strong>{' '}
                {planToShow.plan_type}
              </p>
              <p className="text-lg bg-gray-100 dark:bg-gray-800 text-primary-orange-500 dark:text-primary-orange-600 rounded-lg p-2">
                <strong className="text-foreground">
                  ¿Ofrece clase de prueba?:
                </strong>{' '}
                {planToShow.free_test ? 'Sí' : 'No'}
              </p>
              <p className="text-lg bg-gray-100 dark:bg-gray-800 text-primary-orange-500 dark:text-primary-orange-600 rounded-lg p-2">
                <strong className="text-foreground">¿Está vigente?:</strong>{' '}
                {planToShow.current ? 'Sí' : 'No'}
              </p>
            </div>
            <div className="mt-6">
              <h5 className="text-lg font-semibold mb-4 text-primary-orange-500 dark:text-primary-orange-600">
                Agendas
              </h5>
              {loadingPlan ? (
                <Loader className="text-center" />
              ) : diaries ? (
                diaries.map((diary) => (
                  <div
                    key={diary.id}
                    className="mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"
                  >
                    <p className="text-lg text-primary-orange-500 dark:text-primary-orange-600">
                      <strong className="text-foreground">Nombre:</strong>{' '}
                      {diary.name}
                    </p>
                    <p className="text-lg text-primary-orange-500 dark:text-primary-orange-600">
                      <strong className="text-foreground">Actividad:</strong>{' '}
                      {diary.activity}
                    </p>
                    <p className="text-lg">
                      <strong className="text-foreground">
                        Días disponibles:
                      </strong>
                      {diary.days_of_week.map((available, index) => (
                        <span
                          key={index}
                          className={`inline-block px-2 py-1 mx-1 rounded-full ${
                            available
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-300 text-gray-600'
                          }`}
                        >
                          {daysOfWeek[index]}
                        </span>
                      ))}
                    </p>
                    <p className="text-lg text-primary-orange-500 dark:text-primary-orange-600">
                      <strong className="text-foreground">
                        Sesiones por semana:
                      </strong>{' '}
                      {diary.sessions_per_week}
                    </p>
                  </div>
                ))
              ) : (
                <div>
                  <p className="text-lg text-primary-orange-500 dark:text-primary-orange-600">
                    No hay agendas registradas para este plan.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PlanItem
