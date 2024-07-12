'use client'

import { Diary, GroupedData } from '@/components/types/Diary'
import { useRouter } from 'next/navigation'
import React from 'react'
import { BiEdit, BiTrash } from 'react-icons/bi'

interface Props {
  showInfo: boolean
  diaryToShow: Diary | null
  handleCloseInfo: () => void
  handleClickDelete: ({ diary }: { diary: Diary | GroupedData }) => void
}

const DiaryItem: React.FC<Props> = ({
  showInfo,
  diaryToShow,
  handleCloseInfo,
  handleClickDelete
}) => {
  const router = useRouter()

  return (
    <div>
      {showInfo && diaryToShow && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-card text-foreground p-6 rounded-lg shadow-lg w-3/4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-semibold mb-4 text-primary-orange-500">
                Información de la Agenda
              </h4>
              <div className="flex justify-center gap-2">
                <button
                  className="bg-transparent text-white py-2 rounded"
                  onClick={(e) => {
                    e.stopPropagation()
                    router.push(
                      `/panel-de-control/agenda/editar/${diaryToShow.id}`
                    )
                  }}
                >
                  <BiEdit className="h-4 w-4 md:h-6 md:w-6 text-blue-500 dark:text-blue-600 transition duration-300 ease-in-out hover:scale-[1.07] hover:text-blue-800 dark:hover:text-blue-700" />
                </button>
                <button
                  className="bg-transparent text-white py-2 rounded"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleClickDelete({ diary: diaryToShow })
                  }}
                >
                  <BiTrash className="h-4 w-4 md:h-6 md:w-6 text-red-500 dark:text-red-600 transition duration-300 ease-in-out hover:scale-[1.07] hover:text-red-800 dark:hover:text-red-700" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-8">
              <p className="text-lg bg-primary-orange-400 dark:bg-primary-orange-800 text-gray-800 dark:text-gray-200 rounded-lg p-2">
                <strong className="text-card">Nombre:</strong>{' '}
                {diaryToShow.name}
              </p>
              <p className="text-lg bg-primary-orange-400 dark:bg-primary-orange-800 text-gray-800 dark:text-gray-200 rounded-lg p-2">
                <strong className="text-card">Actividad:</strong>{' '}
                {diaryToShow.activity.name}
              </p>
              <p className="text-lg bg-primary-orange-400 dark:bg-primary-orange-800 text-gray-800 dark:text-gray-200 rounded-lg p-2">
                <strong className="text-card">Tipo de agenda:</strong>{' '}
                {diaryToShow.type_schedule}
              </p>
              <p className="text-lg bg-primary-orange-400 dark:bg-primary-orange-800 text-gray-800 dark:text-gray-200 rounded-lg p-2">
                <strong className="text-card">Fecha desde:</strong>{' '}
                {diaryToShow.date_from}
              </p>
              <p className="text-lg bg-primary-orange-400 dark:bg-primary-orange-800 text-gray-800 dark:text-gray-200 rounded-lg p-2">
                <strong className="text-card">Fecha hasta:</strong>{' '}
                {diaryToShow.date_until}
              </p>
              <p className="text-lg bg-primary-orange-400 dark:bg-primary-orange-800 text-gray-800 dark:text-gray-200 rounded-lg p-2">
                <strong className="text-card">Reinicio cada:</strong>{' '}
                {diaryToShow.repeat_for !== 0
                  ? `${diaryToShow.repeat_for} días`
                  : 'Sin determinar'}
              </p>
              <p className="text-lg bg-primary-orange-400 dark:bg-primary-orange-800 text-gray-800 dark:text-gray-200 rounded-lg p-2">
                <strong className="text-card">Duración:</strong>{' '}
                {diaryToShow.term_duration} días
              </p>
              <p className="text-lg bg-primary-orange-400 dark:bg-primary-orange-800 text-gray-800 dark:text-gray-200 rounded-lg p-2">
                <strong className="text-card">Cantidad de personas:</strong>{' '}
                {diaryToShow.amount_of_people}
              </p>
              <p className="text-lg bg-primary-orange-400 dark:bg-primary-orange-800 text-gray-800 dark:text-gray-200 rounded-lg p-2">
                <strong className="text-card">Activa:</strong>{' '}
                {diaryToShow.is_active ? 'Sí' : 'No'}
              </p>
              <p className="text-lg bg-primary-orange-400 dark:bg-primary-orange-800 text-gray-800 dark:text-gray-200 rounded-lg p-2">
                <strong className="text-card">Exclusividad de género:</strong>{' '}
                {diaryToShow.genre_exclusive}
              </p>
              <p className="text-lg bg-primary-orange-400 dark:bg-primary-orange-800 text-gray-800 dark:text-gray-200 rounded-lg p-2">
                <strong className="text-card">¿Trabaja feriados?:</strong>{' '}
                {diaryToShow.works_holidays ? 'Sí' : 'No'}
              </p>
              {diaryToShow.observations && (
                <p className="text-lg col-span-2 bg-primary-orange-400 dark:bg-primary-orange-800 text-gray-800 dark:text-gray-200 rounded-lg p-2">
                  <strong className="text-card">Observaciones:</strong>{' '}
                  {diaryToShow.observations}
                </p>
              )}
            </div>

            <p>
              <strong>Días disponibles:</strong>{' '}
              {JSON.stringify(diaryToShow.days_available)}
            </p>

            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={handleCloseInfo}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DiaryItem
