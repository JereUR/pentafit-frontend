'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { FaEdit, FaTrash } from 'react-icons/fa'

import Search from '../search/Search'
import Pagination from '../pagination/Pagination'
import useActivities from 'components/hooks/useActivities'
import { Button } from 'components/ui/button'
import CustomButton from 'components/CustomButton'
import useUser from 'components/hooks/useUser'
import { Activity, Columns, initialColumns } from 'components/types/Activity'
import SelectColumns from './SelectColumns'
import { Business } from 'components/types/Business'
import SelectedActivitiesActions from './SelectedActivitiesActions'
import Loader from 'components/Loader'
import { Card, CardContent, CardHeader } from 'components/ui/card'
import ExportData from './ExportData'
import SelectItemsPerPage from '../SelectItemsPerPage'
import TableSkeleton from '../skeletons/TableSkeleton'
import CountItemsSkeleton from '../skeletons/CountItemsSkeleton'
import WorkingBusiness from '../WorkingBusiness'
import ActivityItem from './ActivityItem'

export default function ActivitiesTable() {
  const [workingBusiness, setWorkingBusiness] = useState<Business | null>(null)
  const [selectedActivities, setSelectedActivities] = useState<number[]>([])
  const [selectAll, setSelectAll] = useState<boolean>(false)
  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState<number>(5)
  const [selectedColumns, setSelectedColumns] =
    useState<Columns>(initialColumns)
  const [showConfirmDeleteMap, setShowConfirmDeleteMap] = useState<{
    [key: number]: boolean
  }>({})
  const [showInfo, setShowInfo] = useState<boolean>(false)
  const [activityToShow, setActivityToShow] = useState<Activity | null>(null)

  const router = useRouter()

  const searchParams = useSearchParams()
  const { token, getWorkingBusiness, loadingBusiness } = useUser()
  const {
    activities,
    getActivities,
    loadingActivity,
    deleteActivitiesById,
    count
  } = useActivities()

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
      getActivities({
        q,
        page,
        business_id: workingBusiness.id,
        ITEMS_PER_PAGE: selectedItemsPerPage
      })
    }
  }, [searchParams, token, workingBusiness, selectedItemsPerPage])

  useEffect(() => {
    if (window != undefined) {
      const columns = localStorage.getItem('columns-activities')

      if (columns) {
        setSelectedColumns(JSON.parse(columns))
      }
    }
  }, [])

  const handleDelete = async (activity: number) => {
    const activitiesToDelete = [activity]

    const res = await deleteActivitiesById(activitiesToDelete)

    if (res) {
      setShowConfirmDeleteMap((prevState) => ({
        ...prevState,
        [activity]: false
      }))
      window.location.reload()
    }
  }

  const handleConfirmDelete = (activityId: number) => {
    setShowConfirmDeleteMap((prevState) => ({
      ...prevState,
      [activityId]: true
    }))
  }

  const handleCancelDelete = (activityId: number) => {
    setShowConfirmDeleteMap((prevState) => ({
      ...prevState,
      [activityId]: false
    }))
  }

  const handleSelectAllChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked
    setSelectAll(checked)

    if (checked) {
      setSelectedActivities(activities.map((activity) => activity.id))
    } else {
      setSelectedActivities([])
    }
  }

  const handleCheckboxChange = (
    activityId: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked
    const newSelectedActivities = checked
      ? [...selectedActivities, activityId]
      : selectedActivities.filter((id) => id !== activityId)

    setSelectedActivities(newSelectedActivities)
  }

  const handleShowInfo = (activity: Activity) => {
    setActivityToShow(activity)
    setShowInfo(true)
  }

  const handleCloseInfo = () => {
    setShowInfo(false)
    setActivityToShow(null)
  }

  return (
    <div className="m-10 bg-background p-1 rounded-lg w-[88vw]">
      <div className="flex justify-between">
        <WorkingBusiness workingBusiness={workingBusiness} />
        {workingBusiness && loadingActivity ? (
          <CountItemsSkeleton />
        ) : (
          <div className="mr-10">
            <Card className="px-4 py-2 border border-none rounded-lg">
              <CardHeader className="text-5xl text-center py-1 text-primary-orange-500 font-semibold dark:text-primary-orange-700">
                {activities.length}
              </CardHeader>
              <CardContent className="text-lg py-1 font-medium">
                Actividades Totales
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between my-4">
        <div className="flex justify-center gap-2">
          <Search placeholder="Buscar una actividad..." />
          <SelectColumns
            selectedColumns={selectedColumns}
            setSelectedColumns={setSelectedColumns}
          />
          <SelectItemsPerPage
            selectedItemsPerPage={selectedItemsPerPage}
            setSelectedItemsPerPage={setSelectedItemsPerPage}
          />
          {workingBusiness && activities.length > 0 && (
            <ExportData business={workingBusiness} />
          )}
        </div>
        <div className="flex justify-center gap-4">
          <Link href="/panel-de-control/actividades/agregar">
            <CustomButton text="Agregar" />
          </Link>
          {selectedActivities.length > 0 && (
            <SelectedActivitiesActions
              selectedActivities={selectedActivities}
              setSelectedActivities={setSelectedActivities}
            />
          )}
        </div>
      </div>

      {workingBusiness && loadingActivity && activities ? (
        <TableSkeleton />
      ) : (
        <table className="transactions-table w-full mb-4 mt-8">
          <thead className="font-bold text-center text-muted bg-foreground text-xs xl:text-sm">
            <tr>
              <td className="px-2 py-5">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                  className="cursor-pointer h-5 w-5"
                />
              </td>
              {selectedColumns.name && <td className="px-2 py-5">Nombre</td>}
              {selectedColumns.description && (
                <td className="px-2 py-5">Descripción</td>
              )}
              {selectedColumns.price && <td className="px-2 py-5">Precio</td>}
              {selectedColumns.is_public && (
                <td className="px-2 py-5">Es pública?</td>
              )}
              {selectedColumns.is_public && (
                <td className="px-2 py-5">Nombre público</td>
              )}
              {selectedColumns.generate_invoice && (
                <td className="px-2 py-5">Generación de cuotas</td>
              )}
              {selectedColumns.max_sessions && (
                <td className="px-2 py-5">Sesiones máximas</td>
              )}
              {selectedColumns.mp_available && (
                <td className="px-2 py-5">MP disponible</td>
              )}
              {selectedColumns.start_date && (
                <td className="px-2 py-5">Fecha desde</td>
              )}
              {selectedColumns.end_date && (
                <td className="px-2 py-5">Fecha hasta</td>
              )}
              {selectedColumns.payment_type && (
                <td className="px-2 py-5">Tipo de cobro</td>
              )}
              {selectedColumns.activity_type && (
                <td className="px-2 py-5">Modalidad </td>
              )}
              <td className="px-2 py-5">Acción</td>
            </tr>
          </thead>
          {activities.length > 0 ? (
            <tbody className="text-foreground text-xs xl:text-sm font-light">
              {activities.map((activity) => (
                <tr
                  key={activity.id}
                  className={`my-4 transition duration-300 ease-in-out hover:bg-muted cursor-pointer items-center text-center ${
                    selectedActivities.includes(activity.id) &&
                    'bg-gray-300 dark:bg-gray-700'
                  }`}
                >
                  <td className="border-b border-foreground px-2 py-5">
                    <input
                      type="checkbox"
                      checked={selectedActivities.includes(activity.id)}
                      onChange={(event) =>
                        handleCheckboxChange(activity.id, event)
                      }
                      className="cursor-pointer h-5 w-5"
                    />
                  </td>
                  {selectedColumns.name && (
                    <td
                      className="border-b border-foreground px-2 py-5 hover:underline"
                      onClick={() => handleShowInfo(activity)}
                    >
                      {activity.name}
                    </td>
                  )}
                  {selectedColumns.description && (
                    <td
                      className="border-b border-foreground px-2 py-5 hover:underline"
                      onClick={() => handleShowInfo(activity)}
                    >
                      {activity.description}
                    </td>
                  )}
                  {selectedColumns.price && (
                    <td
                      className="border-b border-foreground px-2 py-5 hover:underline"
                      onClick={() => handleShowInfo(activity)}
                    >
                      ${activity.price}
                    </td>
                  )}
                  {selectedColumns.is_public && (
                    <td
                      className="border-b border-foreground px-2 py-5 hover:underline"
                      onClick={() => handleShowInfo(activity)}
                    >
                      <div
                        className={`rounded-xl w-[3vw] ${
                          activity.is_public ? 'bg-green-400 ' : 'bg-red-400'
                        } mx-auto`}
                      >
                        {activity.is_public ? 'Sí' : 'No'}
                      </div>
                    </td>
                  )}
                  {selectedColumns.is_public && (
                    <td
                      className="border-b border-foreground px-2 py-5 hover:underline"
                      onClick={() =>
                        router.push(
                          `/panel-de-control/actividades/${activity.id}`
                        )
                      }
                    >
                      {activity.public_name ? activity.public_name : '-'}
                    </td>
                  )}
                  {selectedColumns.generate_invoice && (
                    <td
                      className="border-b border-foreground px-2 py-5 hover:underline"
                      onClick={() => handleShowInfo(activity)}
                    >
                      <div
                        className={`rounded-xl w-[3vw] ${
                          activity.generate_invoice
                            ? 'bg-green-400 '
                            : 'bg-red-400'
                        } mx-auto`}
                      >
                        {activity.generate_invoice ? 'Sí' : 'No'}
                      </div>
                    </td>
                  )}
                  {selectedColumns.max_sessions && (
                    <td
                      className="border-b border-foreground px-2 py-5 hover:underline"
                      onClick={() => handleShowInfo(activity)}
                    >
                      {activity.max_sessions}
                    </td>
                  )}
                  {selectedColumns.mp_available && (
                    <td
                      className="border-b border-foreground px-2 py-5 hover:underline"
                      onClick={() => handleShowInfo(activity)}
                    >
                      <div
                        className={`rounded-xl w-[3vw] ${
                          activity.mp_available ? 'bg-green-400 ' : 'bg-red-400'
                        } mx-auto`}
                      >
                        {activity.mp_available ? 'Sí' : 'No'}
                      </div>
                    </td>
                  )}
                  {selectedColumns.start_date && (
                    <td
                      className="border-b border-foreground px-2 py-5 hover:underline"
                      onClick={() => handleShowInfo(activity)}
                    >
                      {activity.start_date}
                    </td>
                  )}
                  {selectedColumns.end_date && (
                    <td
                      className="border-b border-foreground px-2 py-5 hover:underline"
                      onClick={() => handleShowInfo(activity)}
                    >
                      {activity.end_date}
                    </td>
                  )}
                  {selectedColumns.payment_type && (
                    <td
                      className="border-b border-foreground px-2 py-5 hover:underline"
                      onClick={() => handleShowInfo(activity)}
                    >
                      {activity.payment_type}
                    </td>
                  )}
                  {selectedColumns.activity_type && (
                    <td
                      className="border-b border-foreground px-2 py-5 hover:underline"
                      onClick={() => handleShowInfo(activity)}
                    >
                      {activity.activity_type}
                    </td>
                  )}
                  <td className="border-b border-foreground px-2 py-5">
                    <div className="flex justify-center gap-2">
                      <div>
                        <Link
                          href={`/panel-de-control/actividades/editar/${activity.id}`}
                        >
                          <button className="p-2 rounded-lg text-white bg-sky-600 border-none cursor-pointer transitiopn duration-300 ease-in-out hover:scale-105 hover:shadow-md">
                            <FaEdit />
                          </button>
                        </Link>
                      </div>
                      <div>
                        <button
                          className="p-2 rounded-lg text-white bg-red-600 border-none cursor-pointer transitiopn duration-300 ease-in-out  hover:scale-105 hover:shadow-md"
                          onClick={() => handleConfirmDelete(activity.id)}
                        >
                          <FaTrash />
                        </button>
                        {showConfirmDeleteMap[activity.id] && (
                          <div className="fixed top-0 left-0 w-full h-full bg-black/30 z-[101] flex justify-center items-center">
                            <div className="flex flex-col gap-4 justify-center items-center bg-background border border-primary-orange-600 p-8 rounded-lg shadow-md">
                              <p>
                                {`¿Está seguro de que desea eliminar la actividad '
                                ${activity.name}'?`}
                              </p>
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="secondary"
                                  onClick={() =>
                                    handleCancelDelete(activity.id)
                                  }
                                >
                                  Cancelar
                                </Button>
                                <Button
                                  onClick={() => handleDelete(activity.id)}
                                >
                                  {loadingActivity ? (
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
                  Sin Actividades.
                </td>
              </tr>
            </tbody>
          )}
        </table>
      )}
      <Pagination count={count} ITEMS_PER_PAGE={selectedItemsPerPage} />
      <ActivityItem
        activityToShow={activityToShow}
        showInfo={showInfo}
        handleCloseInfo={handleCloseInfo}
        handleClickDelete={handleConfirmDelete}
      />
    </div>
  )
}
