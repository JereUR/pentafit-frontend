'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

import useDiaries from 'components/hooks/useDiaries'
import CustomButton from 'components/CustomButton'
import useUser from 'components/hooks/useUser'
import {
  Days,
  Diary,
  DiaryGroup,
  GroupedData,
  initialDays
} from 'components/types/Diary'
import WorkingBusiness from '../WorkingBusiness'
import TableSkeleton from '../skeletons/TableSkeleton'
import DiariesCalendar from './DiariesCalendar'
import SelectDaysToShow from './SelectDaysToShow'
import SelectedDiariesActions from './SelectedDiariesActions'
import DiaryItem from './DiaryItem'

export default function DiariesTable() {
  const [groupDiaries, setGroupDiaries] = useState<DiaryGroup[]>([])
  const [selectedDays, setSelectedDays] = useState<Days>(initialDays)
  const [selectedDiaries, setSelectedDiaries] = useState<number[]>([])
  const [selectAll, setSelectAll] = useState<boolean>(false)
  const [showInfo, setShowInfo] = useState<boolean>(false)
  const [diaryToShow, setDiaryToShow] = useState<Diary | null>(null)
  const [diaryToDelete, setDiaryToDelete] = useState<
    GroupedData | Diary | null
  >(null)
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false)

  const searchParams = useSearchParams()
  const { token, getWorkingBusiness, workingBusiness } = useUser()
  const { diaries, getDiaries, loadingDiary, deleteDiariesById } = useDiaries()

  const groupDiaryByDays = (diaries: Diary[]): DiaryGroup[] => {
    const groupedData: DiaryGroup[] = Array.from(
      { length: 7 },
      () => [] as GroupedData[]
    )

    diaries.forEach((diary) => {
      diary.days_available.forEach((day, index) => {
        if (day.active) {
          groupedData[index].push({
            id: diary.id,
            company_id: diary.company_id,
            name: diary.name,
            activity: diary.activity,
            is_active: diary.is_active,
            time_start: day.time_start,
            time_end: day.time_end
          })
        }
      })
    })

    return groupedData
  }

  useEffect(() => {
    if (token && !workingBusiness) {
      getWorkingBusiness()
    }
  }, [token, workingBusiness])

  useEffect(() => {
    if (token && workingBusiness) {
      const q = searchParams.get('q') || ''
      getDiaries({
        q,
        business_id: workingBusiness.id
      })
    }
  }, [searchParams, token, workingBusiness])

  useEffect(() => {
    if (window != undefined) {
      const days = localStorage.getItem('days-diaries')

      if (days) {
        setSelectedDays(JSON.parse(days))
      }
    }
  }, [])

  useEffect(() => {
    if (diaries.length > 0) {
      setGroupDiaries(groupDiaryByDays(diaries))
    }
  }, [diaries])

  const handleSelectAllChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked
    setSelectAll(checked)

    if (checked) {
      setSelectedDiaries(diaries.map((diary) => diary.id))
    } else {
      setSelectedDiaries([])
    }
  }

  const handleClickDelete = ({ diary }: { diary: GroupedData | Diary }) => {
    setDiaryToDelete(diary)
    setShowConfirmDelete(true)
  }

  const handleCloseInfo = () => {
    setShowInfo(false)
    setDiaryToShow(null)
  }

  const handleCheckboxChange = (
    diaryId: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked
    const newSelectedDiaries = checked
      ? [...selectedDiaries, diaryId]
      : selectedDiaries.filter((id) => id !== diaryId)

    setSelectedDiaries(newSelectedDiaries)
  }

  const closeModal = () => {
    setShowConfirmDelete(false)
  }

  const handleDelete = async () => {
    if (diaryToDelete) {
      const diaries = [diaryToDelete.id]
      const res = await deleteDiariesById(diaries)

      if (res) {
        setShowConfirmDelete(false)
        setDiaryToDelete(null)
        window.location.reload()
      }
      closeModal()
    }
  }

  return (
    <div className="m-10 bg-background p-1 rounded-lg w-[88vw]">
      <div className="flex gap-10">
        <WorkingBusiness workingBusiness={workingBusiness} />
      </div>
      <div className="flex justify-between items-center my-4">
        <div className="flex gap-4">
          <Link href="/panel-de-control/agenda/agregar">
            <CustomButton text="Agregar" />
          </Link>
          <SelectDaysToShow
            selectedDays={selectedDays}
            setSelectedDays={setSelectedDays}
          />
        </div>
        <div>
          {selectedDiaries.length > 0 && (
            <SelectedDiariesActions
              selectedDiaries={selectedDiaries}
              setSelectedDiaries={setSelectedDiaries}
            />
          )}
        </div>
      </div>

      {workingBusiness && loadingDiary && diaries ? (
        <TableSkeleton />
      ) : (
        <div>
          <DiariesCalendar
            diaries={diaries}
            groupDiaries={groupDiaries}
            selectedDays={selectedDays}
            selectAll={selectAll}
            handleSelectAllChange={handleSelectAllChange}
            selectedDiaries={selectedDiaries}
            handleCheckboxChange={handleCheckboxChange}
            setDiaryToShow={setDiaryToShow}
            setShowInfo={setShowInfo}
            handleClickDelete={handleClickDelete}
          />
          <DiaryItem
            diaryToShow={diaryToShow}
            showInfo={showInfo}
            handleCloseInfo={handleCloseInfo}
            handleClickDelete={handleClickDelete}
          />
          {showConfirmDelete && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-75">
              <div className="bg-card text-foreground p-6 rounded-lg shadow-lg w-3/4 md:w-1/3">
                <h4 className="text-lg font-semibold mb-4">
                  Confirmar eliminación
                </h4>
                <p className="text-center">
                  ¿Estás seguro de que deseas eliminar la agenda de{' '}
                  {`' ${diaryToDelete?.activity.name} (${diaryToDelete?.name})'`}
                  ?
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
        </div>
      )}
    </div>
  )
}
