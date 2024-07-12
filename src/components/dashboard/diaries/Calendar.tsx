import { BiEdit, BiTrash } from 'react-icons/bi'
import {
  daysOfWeek,
  Diary,
  DiaryGroup,
  GroupedData,
  hoursOfDays
} from '@/components/types/Diary'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DiaryItem from './DiaryItem'
import Link from 'next/link'

interface Props {
  diaries: Diary[]
  diaryGroup: DiaryGroup
  day: number
}

const Calendar: React.FC<Props> = ({ diaries, diaryGroup, day }) => {
  const [diaryToDelete, setDiaryToDelete] = useState<
    GroupedData | Diary | null
  >(null)
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false)
  const [cellClasses, setCellClasses] = useState<string[][]>(
    Array(diaryGroup.length).fill(
      Array(hoursOfDays.length).fill('bg-background')
    )
  )
  const [showInfo, setShowInfo] = useState<boolean>(false)
  const [diaryToShow, setDiaryToShow] = useState<Diary | null>(null)

  const router = useRouter()

  const closeModal = () => {
    setShowConfirmDelete(false)
  }

  const handleClickDelete = ({ diary }: { diary: GroupedData | Diary }) => {
    setDiaryToDelete(diary)
    setShowConfirmDelete(true)
  }

  const handleDelete = () => {
    console.log('Deleting diary:', diaryToDelete?.name)
    closeModal()
  }

  const handleShowInfo = (diaryId: number) => {
    const diary = diaries.find((d) => d.id === diaryId) || null
    setDiaryToShow(diary)
    setShowInfo(true)
  }

  const handleCloseInfo = () => {
    setShowInfo(false)
    setDiaryToShow(null)
  }

  useEffect(() => {
    const newCellClasses = Array(diaryGroup.length)
      .fill(null)
      .map(() => Array(hoursOfDays.length).fill('bg-background'))

    diaryGroup.forEach((diary, diaryIndex) => {
      let paintCell = false
      let lastPaint = false

      hoursOfDays.forEach((time, timeIndex) => {
        if (lastPaint) paintCell = false
        if (diary.time_start === time) {
          paintCell = true
          lastPaint = false
        }
        if (diary.time_end === time) lastPaint = true

        newCellClasses[diaryIndex][timeIndex] = paintCell
          ? 'bg-green-500 dark:bg-green-600'
          : 'bg-background'
      })
    })

    // Check for empty columns and update the classes
    hoursOfDays.forEach((time, timeIndex) => {
      const isColumnEmpty = newCellClasses.every(
        (row) => row[timeIndex] === 'bg-background'
      )
      if (isColumnEmpty) {
        newCellClasses.forEach((row) => {
          row[timeIndex] = 'bg-sky-200 dark:bg-sky-400'
        })
      }
    })

    setCellClasses(newCellClasses)
  }, [diaryGroup])

  return (
    <div className="p-2 md:p-6 my-4 md:my-8 bg-gray-50 dark:bg-slate-700 shadow-lg rounded-lg">
      <div className="mb-4">
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          {daysOfWeek[day].toUpperCase()}
        </p>
      </div>
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-track-rounded scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-slate-700 dark:bg-slate-300 text-card dark:text-primary-orange-700 font-semibold">
            <tr>
              <th className="sticky left-0 z-20 py-3 md:px-2 text-left text-xs uppercase tracking-wider w-[90px] md:max-w-xs whitespace-normal bg-slate-700 dark:bg-slate-300">
                <span>Agenda \ Horario</span>
              </th>
              {hoursOfDays.map((time) => (
                <th
                  key={time}
                  className="md:px-1 py-3 text-left text-xs uppercase tracking-wider"
                >
                  {time}
                </th>
              ))}
              <th className="sticky right-0 z-20 md:px-3 py-3 text-left text-xs uppercase tracking-wider w-[90px] md:max-w-xs whitespace-normal bg-slate-700 dark:bg-slate-300">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {diaryGroup.length === 0 ? (
              <tr>
                <td
                  colSpan={hoursOfDays.length + 2}
                  className="text-center py-4"
                >
                  No hay actividades asignadas al día {daysOfWeek[day]}
                </td>
              </tr>
            ) : (
              diaryGroup.map((diary, diaryIndex) => (
                <tr key={diary.id}>
                  <td
                    className="cursor-pointer text-card dark:text-primary-orange-700 font-semibold text-center sticky left-0 z-10 bg-slate-700 dark:bg-slate-300 md:px-1 py-4 text-xs tracking-wider max-w-[90px] md:max-w-xs whitespace-normal hover:underline"
                    onClick={() => handleShowInfo(diary.id)}
                  >
                      {diary.activity.name} ({diary.name})
                  </td>
                  {hoursOfDays.map((time, timeIndex) => (
                    <td
                      key={time}
                      className={`${cellClasses[diaryIndex][timeIndex]} md:px-1 py-4 whitespace-nowrap`}
                    ></td>
                  ))}
                  <td className="sticky right-0 z-10 bg-slate-700 dark:bg-slate-300 md:px-1 tracking-wider max-w-[90px] md:max-w-xs whitespace-normal">
                    <div className="flex justify-center gap-2">
                      <button
                        className="bg-transparent text-white py-2 rounded"
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push(
                            `/panel-de-control/agenda/editar/${diary.id}`
                          )
                        }}
                      >
                        <BiEdit className="h-4 w-4 md:h-5 md:w-5 text-blue-500 dark:text-blue-600 transition duration-300 ease-in-out hover:scale-[1.07] hover:text-blue-800 dark:hover:text-blue-700" />
                      </button>
                      <button
                        className="bg-transparent text-white py-2 rounded"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleClickDelete({ diary })
                        }}
                      >
                        <BiTrash className="h-4 w-4 md:h-5 md:w-5 text-red-500 dark:text-red-600 transition duration-300 ease-in-out hover:scale-[1.07] hover:text-red-800 dark:hover:text-red-700" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {showConfirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-card text-foreground p-6 rounded-lg shadow-lg w-3/4 md:w-1/3">
            <h4 className="text-lg font-semibold mb-4">
              Confirmar eliminación
            </h4>
            <p className="text-center">
              ¿Estás seguro de que deseas eliminar la agenda de{' '}
              {`' ${diaryToDelete?.activity.name} (${diaryToDelete?.name})'`}?
            </p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setShowConfirmDelete(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleDelete}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
      <DiaryItem
        diaryToShow={diaryToShow}
        showInfo={showInfo}
        handleCloseInfo={handleCloseInfo}
        handleClickDelete={handleClickDelete}
      />
    </div>
  )
}

export default Calendar
