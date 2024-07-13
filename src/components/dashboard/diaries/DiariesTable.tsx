'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

import useDiaries from 'components/hooks/useDiaries'
import CustomButton from 'components/CustomButton'
import useUser from 'components/hooks/useUser'
import { Business } from 'components/types/Business'
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

export default function DiariesTable() {
  const [groupDiaries, setGroupDiaries] = useState<DiaryGroup[]>([])
  const [workingBusiness, setWorkingBusiness] = useState<Business | null>(null)
  const [selectedDays, setSelectedDays] = useState<Days>(initialDays)
  const [selectedDiaries, setSelectedDiaries] = useState<number[]>([])
  const [selectAll, setSelectAll] = useState<boolean>(false)

  const searchParams = useSearchParams()
  const { token, getWorkingBusiness } = useUser()
  const { diaries, getDiaries, loadingDiary } = useDiaries()

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
    async function getData() {
      const res = await getWorkingBusiness()
      if (res) {
        setWorkingBusiness(res)
      }
    }
    if (token) {
      getData()
    }
  }, [token])

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
      const Days = localStorage.getItem('Days-diaries')

      if (Days) {
        setSelectedDays(JSON.parse(Days))
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

  return (
    <div className="container bg-background p-1 rounded-lg mt-10">
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
          />
        </div>
      )}
    </div>
  )
}
