'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { FaEdit, FaTrash } from 'react-icons/fa'

import Search from '../search/Search'
import Pagination from '../pagination/Pagination'
import useDiaries from 'components/hooks/useDiaries'
import { Button } from 'components/ui/button'
import CustomButton from 'components/CustomButton'
import useUser from 'components/hooks/useUser'
import { Business } from 'components/types/Business'
import noImage from '../../../../public/assets/no-image.png'
import Loader from 'components/Loader'
import { Card, CardContent, CardHeader } from 'components/ui/card'
import SelectItemsPerPage from '../SelectItemsPerPage'
import TableSkeleton from '../skeletons/TableSkeleton'
import WorkingBusinessSkeleton from '../skeletons/WorkingBusinessSkeleton'
import CountItemsSkeleton from '../skeletons/CountItemsSkeleton'
import { Columns, daysOfWeek, initialColumns } from 'components/types/Diary'
import SelectColumns from './SelectedColumn'
import SelectedDiariesActions from './SelectedDiariesActions'
import ExportData from './ExportData'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL

export default function DiariesTable() {
  const [workingBusiness, setWorkingBusiness] = useState<Business | null>(null)
  const [selectedDiaries, setSelectedDiaries] = useState<number[]>([])
  const [selectAll, setSelectAll] = useState<boolean>(false)
  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState<number>(5)
  const [selectedColumns, setSelectedColumns] =
    useState<Columns>(initialColumns)
  const [showConfirmDeleteMap, setShowConfirmDeleteMap] = useState<{
    [key: number]: boolean
  }>({})

  const router = useRouter()

  const searchParams = useSearchParams()
  const { token, getWorkingBusiness, loadingBusiness } = useUser()
  const { diaries, getDiaries, loadingDiary, deleteDiariesById, count } =
    useDiaries()

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
        {loadingBusiness ? (
          <WorkingBusinessSkeleton />
        ) : (
          <div className="flex flex-col gap-6 mb-6 border bg-card border-none rounded-lg shadow-md pt-2 pb-6 px-4">
            <div className="flex gap-4 items-center">
              <label className="text-xl font-light mt-4 ml-4">
                Area de Trabajo
              </label>
            </div>
            {workingBusiness ? (
              <div className="flex items-center mx-6 mb-2">
                <div className="flex px-6">
                  <Image
                    src={
                      workingBusiness.logo
                        ? `${BASE_URL}${workingBusiness.logo}`
                        : noImage
                    }
                    alt={`${workingBusiness.name} logo`}
                    width={80}
                    height={80}
                    className="w-[80px] h-[80px] border-[1px] border-primary-orange-600 rounded-full p-1 dark:ring-primary-orange-400"
                  />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">
                    {workingBusiness.name}
                  </h2>
                  <p className="text-sm">
                    {workingBusiness.description
                      ? workingBusiness.description
                      : 'Sin descripción.'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center gap-2 ">
                <p className="text-xl font-semibold">
                  Sin area de trabajo asignada
                </p>
                <span className="text-sm italic">
                  Debes seleccionar un area de trabajo para realizar tareas
                </span>
                <Button
                  className="flex mt-2 items-center font-semibold transition duration-300 ease-in-out bg-primary-orange-700 hover:bg-primary-orange-600"
                  onClick={() => router.push('/panel-de-control/negocios')}
                >
                  Ir a sección Negocios
                </Button>
              </div>
            )}
          </div>
        )}
        {workingBusiness && loadingDiary ? (
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
        )}
      </div>
      <div className="flex items-center justify-between my-4">
        <div className="flex justify-center gap-2">
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
        </div>
        <div className="flex justify-center gap-4">
          <Link href="/panel-de-control/agenda/agregar">
            <CustomButton text="Agregar" />
          </Link>
          {selectedDiaries.length > 0 && (
            <SelectedDiariesActions
              selectedDiaries={selectedDiaries}
              setSelectedDiaries={setSelectedDiaries}
            />
          )}
        </div>
      </div>

      {/* {workingBusiness && loadingDiary && diaries ? (
        <TableSkeleton />
      ) : (
        <table className="transactions-table w-full mb-4 mt-8">
          <thead className="font-bold text-center text-muted bg-foreground text-xs xl:text-sm">
            <tr>
              <td className="px-1 py-5">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                  className="cursor-pointer h-4 w-4"
                />
              </td>
              {selectedColumns.id && <td className="text-xs px-2 py-5">#</td>}
              {selectedColumns.activity && (
                <td className="text-xs px-2 py-5">Actividad</td>
              )}
              {selectedColumns.type_schedule && (
                <td className="text-xs px-2 py-5">Tipo</td>
              )}
              {selectedColumns.date_from && (
                <td className="text-xs px-2 py-5">Fecha desde</td>
              )}
              {selectedColumns.date_until && (
                <td className="text-xs px-2 py-5">Fecha hasta</td>
              )}
              {selectedColumns.time_from && (
                <td className="text-xs px-2 py-5">Horario desde</td>
              )}
              {selectedColumns.time_until && (
                <td className="text-xs px-2 py-5">Horario hasta</td>
              )}
              {selectedColumns.days_available && (
                <td className="text-xs px-2 py-5">Días habilitados</td>
              )}
              {selectedColumns.repeat_for && (
                <td className="text-xs px-2 py-5">Repetir cada</td>
              )}
              {selectedColumns.offer_days && (
                <td className="text-xs px-2 py-5">Días de oferta</td>
              )}
              {selectedColumns.term_duration && (
                <td className="text-xs px-2 py-5">Duración</td>
              )}
              {selectedColumns.amount_of_people && (
                <td className="text-xs px-2 py-5">Cantidad de personas</td>
              )}
              {selectedColumns.is_active && (
                <td className="text-xs px-2 py-5">Activa</td>
              )}
              {selectedColumns.genre_exclusive && (
                <td className="text-xs px-2 py-5">Exclusividad de género </td>
              )}
              {selectedColumns.works_holidays && (
                <td className="text-xs px-2 py-5">Trabaja feriados</td>
              )}
              {selectedColumns.observations && (
                <td className="text-xs px-2 py-5">Observaciones</td>
              )}
              <td className="text-xs px-2 py-5">Acción</td>
            </tr>
          </thead>
          {diaries.length > 0 ? (
            <tbody className="text-foreground text-xs xl:text-sm font-light">
              {diaries.map((diary) => (
                <tr
                  key={diary.id}
                  className={`my-4 transition duration-300 ease-in-out hover:bg-muted cursor-pointer items-center text-center ${
                    selectedDiaries.includes(diary.id) &&
                    'bg-gray-300 dark:bg-gray-700'
                  }`}
                >
                  <td className="border-b border-foreground px-2 py-5">
                    <input
                      type="checkbox"
                      checked={selectedDiaries.includes(diary.id)}
                      onChange={(event) =>
                        handleCheckboxChange(diary.id, event)
                      }
                      className="cursor-pointer h-4 w-4"
                    />
                  </td>
                  {selectedColumns.id && (
                    <td
                      className="text-xs border-b border-foreground px-2 py-5"
                      onClick={() =>
                        router.push(`/panel-de-control/actividades/${diary.id}`)
                      }
                    >
                      {diary.id}
                    </td>
                  )}
                  {selectedColumns.activity && (
                    <td
                      className="text-xs border-b border-foreground px-2 py-5"
                      onClick={() =>
                        router.push(`/panel-de-control/actividades/${diary.id}`)
                      }
                    >
                      {diary.activity.name}
                    </td>
                  )}
                  {selectedColumns.type_schedule && (
                    <td
                      className="text-xs border-b border-foreground px-2 py-5"
                      onClick={() =>
                        router.push(`/panel-de-control/actividades/${diary.id}`)
                      }
                    >
                      {diary.type_schedule}
                    </td>
                  )}
                  {selectedColumns.date_from && (
                    <td
                      className="text-xs border-b border-foreground px-2 py-5"
                      onClick={() =>
                        router.push(`/panel-de-control/actividades/${diary.id}`)
                      }
                    >
                      {diary.date_from}
                    </td>
                  )}
                  {selectedColumns.date_until && (
                    <td
                      className="text-xs border-b border-foreground px-2 py-5"
                      onClick={() =>
                        router.push(`/panel-de-control/actividades/${diary.id}`)
                      }
                    >
                      {diary.date_until}
                    </td>
                  )}
                  {selectedColumns.time_from && (
                    <td
                      className="text-xs border-b border-foreground px-2 py-5"
                      onClick={() =>
                        router.push(`/panel-de-control/actividades/${diary.id}`)
                      }
                    >
                      {diary.time_from}hs
                    </td>
                  )}
                  {selectedColumns.time_until && (
                    <td
                      className="text-xs border-b border-foreground px-2 py-5"
                      onClick={() =>
                        router.push(`/panel-de-control/actividades/${diary.id}`)
                      }
                    >
                      {diary.time_until}hs
                    </td>
                  )}
                  {selectedColumns.days_available && (
                    <td
                      className="text-xs border-b border-foreground px-2 py-5"
                      onClick={() =>
                        router.push(`/panel-de-control/actividades/${diary.id}`)
                      }
                    >
                      {diary.days_available?.map((day, index) => (
                        <div className="flex" key={index}>
                          <span>
                            {day
                              ? index < 6
                                ? `${daysOfWeek[index]}, `
                                : daysOfWeek[index]
                              : ''}
                          </span>
                        </div>
                      ))}
                    </td>
                  )}
                  {selectedColumns.repeat_for && (
                    <td
                      className="text-xs border-b border-foreground px-2 py-5"
                      onClick={() =>
                        router.push(`/panel-de-control/actividades/${diary.id}`)
                      }
                    >
                      {diary.repeat_for} días
                    </td>
                  )}
                  {selectedColumns.offer_days && (
                    <td
                      className="text-xs border-b border-foreground px-2 py-5"
                      onClick={() =>
                        router.push(`/panel-de-control/actividades/${diary.id}`)
                      }
                    >
                      {diary.offer_days?.map((day, index) => (
                        <div className="flex" key={index}>
                          <span>
                            {day
                              ? index < 6
                                ? `${daysOfWeek[index]}, `
                                : daysOfWeek[index]
                              : ''}
                          </span>
                        </div>
                      ))}
                    </td>
                  )}
                  {selectedColumns.term_duration && (
                    <td
                      className="text-xs border-b border-foreground px-2 py-5"
                      onClick={() =>
                        router.push(`/panel-de-control/actividades/${diary.id}`)
                      }
                    >
                      {diary.term_duration} días
                    </td>
                  )}
                  {selectedColumns.amount_of_people && (
                    <td
                      className="text-xs border-b border-foreground px-2 py-5"
                      onClick={() =>
                        router.push(`/panel-de-control/actividades/${diary.id}`)
                      }
                    >
                      {diary.amount_of_people}
                    </td>
                  )}
                  {selectedColumns.is_active && (
                    <td
                      className="text-xs border-b border-foreground px-2 py-5"
                      onClick={() =>
                        router.push(`/panel-de-control/actividades/${diary.id}`)
                      }
                    >
                      <div
                        className={`rounded-xl w-[3vw] ${
                          diary.is_active ? 'bg-green-400 ' : 'bg-red-400'
                        } mx-auto`}
                      >
                        {diary.is_active ? 'Sí' : 'No'}
                      </div>
                    </td>
                  )}
                  {selectedColumns.genre_exclusive && (
                    <td
                      className="text-xs border-b border-foreground px-2 py-5"
                      onClick={() =>
                        router.push(`/panel-de-control/actividades/${diary.id}`)
                      }
                    >
                      {diary.genre_exclusive}
                    </td>
                  )}
                  {selectedColumns.works_holidays && (
                    <td
                      className="text-xs border-b border-foreground px-2 py-5"
                      onClick={() =>
                        router.push(`/panel-de-control/actividades/${diary.id}`)
                      }
                    >
                      <div
                        className={`rounded-xl w-[3vw] ${
                          diary.works_holidays ? 'bg-green-400 ' : 'bg-red-400'
                        } mx-auto`}
                      >
                        {diary.works_holidays ? 'Sí' : 'No'}
                      </div>
                    </td>
                  )}
                  {selectedColumns.observations && (
                    <td
                      className="text-xs border-b border-foreground px-2 py-5"
                      onClick={() =>
                        router.push(`/panel-de-control/actividades/${diary.id}`)
                      }
                    >
                      {diary.observations}
                    </td>
                  )}
                  <td className="text-xs border-b border-foreground px-2 py-5">
                    <div className="flex justify-center gap-2">
                      <div>
                        <Link
                          href={`/panel-de-control/agenda/editar/${diary.id}`}
                        >
                          <button className="p-2 rounded-lg text-white bg-sky-600 border-none cursor-pointer transitiopn duration-300 ease-in-out hover:scale-105 hover:shadow-md">
                            <FaEdit />
                          </button>
                        </Link>
                      </div>
                      <div>
                        <button
                          className="p-2 rounded-lg text-white bg-red-600 border-none cursor-pointer transitiopn duration-300 ease-in-out  hover:scale-105 hover:shadow-md"
                          onClick={() => handleConfirmDelete(diary.id)}
                        >
                          <FaTrash />
                        </button>
                        {showConfirmDeleteMap[diary.id] && (
                          <div className="fixed top-0 left-0 w-full h-full bg-black/30 z-50 flex justify-center items-center">
                            <div className="flex flex-col gap-4 justify-center items-center bg-background border border-primary-orange-600 p-8 rounded-lg shadow-md">
                              <p>
                                {`¿Está seguro de que desea eliminar la agenda '
                                ${diary.id}'?`}
                              </p>
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="secondary"
                                  onClick={() => handleCancelDelete(diary.id)}
                                >
                                  Cancelar
                                </Button>
                                <Button onClick={() => handleDelete(diary.id)}>
                                  {loadingDiary ? (
                                    <Loader className="mt-[1.8vh] ml-[1vw]" />
                                  ) : (
                                    'Confirmar'
                                  )}
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody className="text-center">
              <tr>
                <td
                  colSpan={
                    Object.values(selectedColumns).filter(
                      (value) => value === true
                    ).length + 3
                  }
                  className="py-4 text-lg font-light italic border-b"
                >
                  Sin Agendas.
                </td>
              </tr>
            </tbody>
          )}
        </table>
      )} */}
      <Pagination count={count} ITEMS_PER_PAGE={selectedItemsPerPage} />
    </div>
  )
}
