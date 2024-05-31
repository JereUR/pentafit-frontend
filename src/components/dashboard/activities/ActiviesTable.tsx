'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { FaEdit, FaTrash } from 'react-icons/fa'

import Search from '../search/Search'
import Pagination from '../pagination/Pagination'
import useActivities from '@/components/hooks/useActivities'
import { Button } from '@/components/ui/button'
import CustomButton from '@/components/CustomButton'
import useUser from '@/components/hooks/useUser'
import { Columns, initialColumns } from '@/components/types/Activity'
import SelectColumns from './SelectColumns'
import { Business } from '@/components/types/Business'

export default function ActivitiesTable() {
  const [workingBusiness, setWorkingBusiness] = useState<Business | null>(null)
  const [selectedActivities, setSelectedActivities] = useState<number[]>([])
  const [selectAll, setSelectAll] = useState<boolean>(false)
  const [selectedColumns, setSelectedColumns] =
    useState<Columns>(initialColumns)
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false)
  const [showConfirmMultipleDelete, setShowConfirmMultipleDelete] =
    useState<boolean>(false)
  const { theme } = useTheme()
  const router = useRouter()

  const searchParams = useSearchParams()
  const count = 4
  const q = searchParams.get('q') || ''
  const { token } = useUser()
  const { activities, getActivities } = useActivities()
  const { getWorkingBusiness } = useUser()

  const styles = {
    deleteRow: {
      backgroundColor:
        theme === 'light' ? 'delete-row-light' : 'delete-row-dark' // Ejemplo de color oscuro
    }
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
      const page = searchParams.get('page') || '1'
      getActivities(q, page, workingBusiness.id)
    }
  }, [searchParams, token, workingBusiness])

  useEffect(() => {
    if (window != undefined) {
      const columns = localStorage.getItem('columns')

      if (columns) {
        setSelectedColumns(JSON.parse(columns))
      }
    }
  }, [])

  const handleDelete = async (activities: number[]) => {
    console.log(activities)
    if (showConfirmDelete) setShowConfirmDelete(false)
    if (showConfirmMultipleDelete) setShowConfirmMultipleDelete(false)
    setSelectedActivities([])

    /* const res = await deleteActivityById(id)
    if (res) router.refresh() */
  }

  const handleConfirmDelete = () => {
    setShowConfirmDelete(true)
  }

  const handleCancelDelete = () => {
    setShowConfirmDelete(false)
  }

  const handleConfirmMultipleDelete = () => {
    setShowConfirmMultipleDelete(true)
  }

  const handleCancelMultipleDelete = () => {
    setShowConfirmMultipleDelete(false)
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

  return (
    <div className="container bg-background p-1 rounded-lg mt-5">
      <div className="flex items-center justify-between my-4">
        <Search placeholder="Buscar una actividad..." />
        <div className="flex gap-2">
          <SelectColumns
            selectedColumns={selectedColumns}
            setSelectedColumns={setSelectedColumns}
          />
          <Link href="/panel-de-control/actividades/agregar">
            <CustomButton text="Agregar" />
          </Link>
          {selectedActivities.length > 0 && (
            <>
              <Button
                className="py-2 px-4 rounded-md text-white bg-red-600 border-none cursor-pointer"
                onClick={handleConfirmMultipleDelete}
              >
                Borrar seleccionados ({selectedActivities.length})
              </Button>
              {showConfirmMultipleDelete && (
                <div className="fixed top-0 left-0 w-full h-full bg-black/30 z-50 flex justify-center items-center">
                  <div className="flex flex-col gap-4 justify-center items-center bg-background border border-primary-orange-600 p-8 rounded-lg shadow-md">
                    <p>
                      {`¿Está seguro de que desea eliminar las ${selectedActivities.length} actividades seleccionadas?`}
                    </p>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="secondary"
                        onClick={handleCancelMultipleDelete}
                      >
                        No
                      </Button>
                      <Button onClick={() => handleDelete(selectedActivities)}>
                        Sí
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {activities ? (
        <table className="transactions-table w-full mb-4 mt-8">
          <thead className="font-bold text-center text-muted bg-foreground text-sm">
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
              {selectedColumns.price && <td className="px-2 py-5">Precio</td>}
              {selectedColumns.is_public && (
                <td className="px-2 py-5">Es pública?</td>
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
                <td className="px-2 py-5">Tipo cobro</td>
              )}
              <td className="px-2 py-5">Acción</td>
            </tr>
          </thead>
          {activities.length > 0 ? (
            <tbody className="text-foreground text-sm font-light">
              {activities.map((activity) => (
                <tr
                  key={activity.id}
                  className={`my-4 transition duration-300 ease-in-out hover:bg-muted cursor-pointer items-center text-center ${
                    selectedActivities.includes(activity.id) &&
                    styles.deleteRow.backgroundColor
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
                  <td
                    className="border-b border-foreground px-2 py-5"
                    onClick={() =>
                      router.push(
                        `/panel-de-control/actividades/${activity.id}`
                      )
                    }
                  >
                    {activity.name}
                  </td>
                  <td
                    className="border-b border-foreground px-2 py-5"
                    onClick={() =>
                      router.push(
                        `/panel-de-control/actividades/${activity.id}`
                      )
                    }
                  >
                    ${activity.price}
                  </td>
                  <td
                    className="border-b border-foreground px-2 py-5"
                    onClick={() =>
                      router.push(
                        `/panel-de-control/actividades/${activity.id}`
                      )
                    }
                  >
                    <div
                      className={`rounded-xl w-[3vw] ${
                        activity.is_public ? 'bg-green-400 ' : 'bg-red-400'
                      } mx-auto`}
                    >
                      {activity.is_public ? 'Sí' : 'No'}
                    </div>
                  </td>
                  <td
                    className="border-b border-foreground px-2 py-5"
                    onClick={() =>
                      router.push(
                        `/panel-de-control/actividades/${activity.id}`
                      )
                    }
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
                  <td
                    className="border-b border-foreground px-2 py-5"
                    onClick={() =>
                      router.push(
                        `/panel-de-control/actividades/${activity.id}`
                      )
                    }
                  >
                    {activity.max_sessions}
                  </td>
                  <td
                    className="border-b border-foreground px-2 py-5"
                    onClick={() =>
                      router.push(
                        `/panel-de-control/actividades/${activity.id}`
                      )
                    }
                  >
                    <div
                      className={`rounded-xl w-[3vw] ${
                        activity.mp_available ? 'bg-green-400 ' : 'bg-red-400'
                      } mx-auto`}
                    >
                      {activity.mp_available ? 'Sí' : 'No'}
                    </div>
                  </td>
                  <td
                    className="border-b border-foreground px-2 py-5"
                    onClick={() =>
                      router.push(
                        `/panel-de-control/actividades/${activity.id}`
                      )
                    }
                  >
                    {activity.start_date}
                  </td>
                  <td
                    className="border-b border-foreground px-2 py-5"
                    onClick={() =>
                      router.push(
                        `/panel-de-control/actividades/${activity.id}`
                      )
                    }
                  >
                    {activity.end_date}
                  </td>
                  <td
                    className="border-b border-foreground px-2 py-5"
                    onClick={() =>
                      router.push(
                        `/panel-de-control/actividades/${activity.id}`
                      )
                    }
                  >
                    {activity.payment_type}
                  </td>
                  <td className="border-b border-foreground px-2 py-5">
                    <div className="flex gap-2">
                      <div>
                        <Link
                          href={`/panel-de-control/actividades/editar/${activity.id}`}
                        >
                          <button className="p-2 rounded-md text-white bg-sky-600 border-none cursor-pointer transitiopn duration-300 ease-in-out hover:scale-105 hover:shadow-md">
                            <FaEdit />
                          </button>
                        </Link>
                      </div>
                      <div>
                        <button
                          className="p-2 rounded-md text-white bg-red-600 border-none cursor-pointer transitiopn duration-300 ease-in-out  hover:scale-105 hover:shadow-md"
                          onClick={handleConfirmDelete}
                        >
                          <FaTrash />
                        </button>
                        {showConfirmDelete && (
                          <div className="fixed top-0 left-0 w-full h-full bg-black/30 z-50 flex justify-center items-center">
                            <div className="flex flex-col gap-4 justify-center items-center bg-background border border-primary-orange-600 p-8 rounded-lg shadow-md">
                              <p>
                                {`¿Está seguro de que desea eliminar la actividad '
                                ${activity.name}'?`}
                              </p>
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="secondary"
                                  onClick={handleCancelDelete}
                                >
                                  No
                                </Button>
                                <Button
                                  onClick={() => handleDelete([activity.id])}
                                >
                                  Sí
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
                  colSpan={11}
                  className="py-4 text-lg font-light italic border-b"
                >
                  Sin Actividades.
                </td>
              </tr>
            </tbody>
          )}
        </table>
      ) : (
        <div>
          <h1>No data</h1>
        </div>
      )}
      <Pagination count={count} />
    </div>
  )
}
