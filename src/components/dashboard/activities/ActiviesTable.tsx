'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import Search from '../search/Search'
import Pagination from '../pagination/Pagination'
import useActivities from '@/components/hooks/useActivities'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { FaEdit, FaTrash } from 'react-icons/fa'
import CustomButton from '@/components/CustomButton'
import useUser from '@/components/hooks/useUser'

const availableColumns = [
  { id: 'description', label: 'Descripción' },
  { id: 'amount', label: 'Costo' },
  { id: 'isPublic', label: 'Es pública?' },
  { id: 'quotaGeneration', label: 'Permite generación de cuotas' },
  { id: 'sessionMax', label: 'Cantida máxima de sesiones' },
  { id: 'mpAvailable', label: 'Permite MP a través de la app' },
  { id: 'dateFrom', label: 'Fecha desde' },
  { id: 'dateUntil', label: 'Fecha hasta' },
  { id: 'paymentType', label: 'Tipo cobro' }
  // Add more columns here if needed
]

export default function ActivitiesTable() {
  const [selectedActivities, setSelectedActivities] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState<boolean>(false)
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false)
  const { theme } = useTheme()
  const router = useRouter()

  const searchParams = useSearchParams()
  const count = 4
  const q = searchParams.get('q') || ''
  const { token } = useUser()
  const { activities, getActivities } = useActivities()
  /* const { activitys, count } = await fetchactivitys(q, page)  */

  const styles = {
    deleteRow: {
      backgroundColor:
        theme === 'light' ? 'delete-row-light' : 'delete-row-dark' // Ejemplo de color oscuro
    }
  }

  useEffect(() => {
    if (token) {
      const q = searchParams.get('q') || ''
      const page = searchParams.get('page') || '1'
      getActivities(q, page)
    }
  }, [searchParams, token])

  const handleDelete = async (id: string) => {
    /* if (showConfirmDelete) {
      const res = await deleteActivityById(id)
      if (res) router.refresh()
    } */
    setShowConfirmDelete(false)
  }

  const handleConfirmDelete = () => {
    setShowConfirmDelete(true)
  }

  const handleCancelDelete = () => {
    setShowConfirmDelete(false)
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
    activityId: string,
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
          <Link href="/panel-de-control/actividades/agregar">
            {/* <Button className="py-2 px-4 rounded-md text-foreground bg-primary-orange-600 transition duration-300 ease-in-out hover:bg-primary-orange-700 border-none cursor-pointer">
              Agregar
            </Button> */}
            <CustomButton text="Agregar" />
          </Link>
          {selectedActivities.length > 0 && (
            <Button
              className="py-2 px-4 rounded-md text-white bg-red-600 border-none cursor-pointer"
              onClick={() => {
                console.log('Selected activities:', selectedActivities)
              }}
            >
              Borrar seleccionados ({selectedActivities.length})
            </Button>
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
              <td className="px-2 py-5">Actividad</td>
              <td className="px-2 py-5">Costo</td>
              <td className="px-2 py-5">Es pública?</td>
              <td className="px-2 py-5">Permite generación de cuotas</td>
              <td className="px-2 py-5">Cantida máxima de sesiones</td>
              <td className="px-2 py-5">Permite MP a través de la app</td>
              <td className="px-2 py-5">Fecha desde</td>
              <td className="px-2 py-5">Fecha hasta</td>
              <td className="px-2 py-5">Tipo cobro</td>
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
                  <td
                    className="border-b border-foreground px-2 py-5"
                    onClick={() =>
                      router.push(
                        `/panel-de-control/actividades/${activity.id}`
                      )
                    }
                  >
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
                    {activity.activity}
                  </td>
                  <td
                    className="border-b border-foreground px-2 py-5"
                    onClick={() =>
                      router.push(
                        `/panel-de-control/actividades/${activity.id}`
                      )
                    }
                  >
                    ${activity.cost}
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
                        activity.isPublic ? 'bg-green-400 ' : 'bg-red-400'
                      } mx-auto`}
                    >
                      {activity.isPublic ? 'Sí' : 'No'}
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
                        activity.quotaGeneration
                          ? 'bg-green-400 '
                          : 'bg-red-400'
                      } mx-auto`}
                    >
                      {activity.quotaGeneration ? 'Sí' : 'No'}
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
                    {activity.sessionMax}
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
                        activity.mpAvailable ? 'bg-green-400 ' : 'bg-red-400'
                      } mx-auto`}
                    >
                      {activity.mpAvailable ? 'Sí' : 'No'}
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
                    {activity.dateFrom.toLocaleDateString()}
                  </td>
                  <td
                    className="border-b border-foreground px-2 py-5"
                    onClick={() =>
                      router.push(
                        `/panel-de-control/actividades/${activity.id}`
                      )
                    }
                  >
                    {activity.dateUntil.toLocaleDateString()}
                  </td>
                  <td
                    className="border-b border-foreground px-2 py-5"
                    onClick={() =>
                      router.push(
                        `/panel-de-control/actividades/${activity.id}`
                      )
                    }
                  >
                    {activity.paymentType}
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
                                {`¿Está seguro de que desea eliminar el negocio '
                                ${activity.activity}'?`}
                              </p>
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="secondary"
                                  onClick={handleCancelDelete}
                                >
                                  No
                                </Button>
                                <Button
                                  onClick={() =>
                                    handleDelete(activity.id.toString())
                                  }
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
            <tbody>
              <tr>
                <td colSpan={11}>Sin Actividades.</td>
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
