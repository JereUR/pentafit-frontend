'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { FaEdit, FaTrash } from 'react-icons/fa'

import Pagination from '../pagination/Pagination'
import useDiaries from 'components/hooks/useDiaries'
import CustomButton from 'components/CustomButton'
import useUser from 'components/hooks/useUser'
import { Business } from 'components/types/Business'
import {
  Columns,
  daysOfWeek,
  Diary,
  DiaryGroup,
  GroupedData,
  initialColumns
} from 'components/types/Diary'
import WorkingBusiness from '../WorkingBusiness'
import TableSkeleton from '../skeletons/TableSkeleton'
import DiariesCalendar from './DiariesCalendar'

export default function DiariesTable() {
  const [groupDiaries, setGroupDiaries] = useState<DiaryGroup[]>([])
  const [workingBusiness, setWorkingBusiness] = useState<Business | null>(null)
  const [selectedDiaries, setSelectedDiaries] = useState<number[]>([])
  const [selectAll, setSelectAll] = useState<boolean>(false)
  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState<number>(5)
  const [selectedColumns, setSelectedColumns] =
    useState<Columns>(initialColumns)
  const [showConfirmDeleteMap, setShowConfirmDeleteMap] = useState<{
    [key: number]: boolean
  }>({})

  const searchParams = useSearchParams()
  const { token, getWorkingBusiness, loadingBusiness } = useUser()
  const { diaries, getDiaries, loadingDiary, deleteDiariesById, count } =
    useDiaries()

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

  console.log(groupDiaries)

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
      const page = searchParams.get('page') || '1'
      getDiaries({
        q,
        page,
        business_id: workingBusiness.id,
        ITEMS_PER_PAGE: selectedItemsPerPage
      })
    }
  }, [searchParams, token, workingBusiness, selectedItemsPerPage])

  useEffect(() => {
    if (window != undefined) {
      const columns = localStorage.getItem('columns-diaries')

      if (columns) {
        setSelectedColumns(JSON.parse(columns))
      }
    }
  }, [])

  useEffect(() => {
    if (diaries.length > 0) {
      setGroupDiaries(groupDiaryByDays(diaries))
    }
  }, [diaries])

  const handleDelete = async (diary: number) => {
    const diariesToDelete = [diary]

    const res = await deleteDiariesById(diariesToDelete)

    if (res) {
      setShowConfirmDeleteMap((prevState) => ({
        ...prevState,
        [diary]: false
      }))
      window.location.reload()
    }
  }

  const handleConfirmDelete = (diaryId: number) => {
    setShowConfirmDeleteMap((prevState) => ({
      ...prevState,
      [diaryId]: true
    }))
  }

  const handleCancelDelete = (diaryId: number) => {
    setShowConfirmDeleteMap((prevState) => ({
      ...prevState,
      [diaryId]: false
    }))
  }

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
      <div className="flex justify-between">
        <WorkingBusiness workingBusiness={workingBusiness} />
        {/* {workingBusiness && loadingDiary ? (
          <CountItemsSkeleton />
        ) : (
          <div className="mr-10">
            <Card className="px-4 py-2 border border-none rounded-lg">
              <CardHeader className="text-5xl text-center py-1 text-primary-orange-500 font-semibold dark:text-primary-orange-700">
                {diaries.length}
              </CardHeader>
              <CardContent className="text-lg py-1 font-medium">
                Agendas Totales
              </CardContent>
            </Card>
          </div>
        )} */}
      </div>
      <div className="flex items-center my-4">
        {/* <div className="flex justify-center gap-2">
          <Search placeholder="Buscar una agenda..." />
          <SelectColumns
            selectedColumns={selectedColumns}
            setSelectedColumns={setSelectedColumns}
          />
          <SelectItemsPerPage
            selectedItemsPerPage={selectedItemsPerPage}
            setSelectedItemsPerPage={setSelectedItemsPerPage}
          />
          {workingBusiness && diaries.length > 0 && (
            <ExportData business={workingBusiness} />
          )}
        </div> */}
        <div className="flex gap-4">
          <Link href="/panel-de-control/agenda/agregar">
            <CustomButton text="Agregar" />
          </Link>
          {/* {selectedDiaries.length > 0 && (
            <SelectedDiariesActions
              selectedDiaries={selectedDiaries}
              setSelectedDiaries={setSelectedDiaries}
            />
          )} */}
        </div>
      </div>

      {workingBusiness && loadingDiary && diaries ? (
        <TableSkeleton />
      ) : (
        <div>
          <DiariesCalendar groupDiaries={groupDiaries} />
        </div>
      )}
    </div>
  )
}
