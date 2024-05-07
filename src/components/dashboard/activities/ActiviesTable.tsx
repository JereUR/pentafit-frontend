'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

import Search from '../search/Search'
import Pagination from '../pagination/Pagination'
import useActivities from '@/components/hooks/useActivities'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'
import Link from 'next/link'

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
  const { theme } = useTheme()

  const searchParams = useSearchParams()
  const count = 4
  const q = searchParams.get('q') || ''
  const page = parseInt(searchParams.get('page') || '1')
  const { activities } = useActivities()
  /* const { activitys, count } = await fetchactivitys(q, page)  */

  const styles = {
    deleteRow: {
      backgroundColor:
        theme === 'light' ? 'delete-row-light' : 'delete-row-dark' // Ejemplo de color oscuro
    }
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
            <Button className="py-2 px-4 rounded-md text-foreground bg-primary-orange-600 transition duration-300 ease-in-out hover:bg-primary-orange-700 border-none cursor-pointer">
              Agregar
            </Button>
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
      <table className="transactions-table w-full my-4">
        <thead className="font-bold text-left bg-background text-sm">
          <tr>
            <td className="border-r px-2 py-6">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAllChange}
                className="cursor-pointer"
              />
            </td>
            <td className="border-r px-2 py-6">Descripción</td>
            <td className="border-r px-2 py-6">Costo</td>
            <td className="border-r px-2 py-6">Es pública?</td>
            <td className="border-r px-2 py-6">Permite generación de cuotas</td>
            <td className="border-r px-2 py-6">Cantida máxima de sesiones</td>
            <td className="border-r px-2 py-6">
              Permite MP a través de la app
            </td>
            <td className="border-r px-2 py-6">Fecha desde</td>
            <td className="border-r px-2 py-6">Fecha hasta</td>
            <td className="border-r px-2 py-6">Tipo cobro</td>
            <td className="border-r px-2 py-6">Acción</td>
          </tr>
        </thead>
        <tbody className="text-foreground text-sm font-light">
          {activities.map((activity) => (
            <tr
              key={activity.id}
              className={`my-4 even:bg-gray-100 odd:bg-gray-300 even:dark:bg-gray-600 odd:dark:bg-gray-800 transition duration-300 ease-in-out hover:bg-primary-orange-400 hover:dark:bg-primary-orange-700 cursor-pointer items-center text-center ${
                selectedActivities.includes(activity.id) &&
                styles.deleteRow.backgroundColor
              }`}
            >
              <td className=" px-2 py-4">
                <input
                  type="checkbox"
                  checked={selectedActivities.includes(activity.id)}
                  onChange={(event) => handleCheckboxChange(activity.id, event)}
                  className="cursor-pointer"
                />
              </td>
              <td className="px-2 py-4">{activity.description}</td>
              <td className="px-2 py-4">${activity.amount}</td>
              <td className="px-2 py-4">
                <div
                  className={`rounded-xl w-[3vw] ${
                    activity.isPublic ? 'bg-green-400 ' : 'bg-red-400'
                  } mx-auto`}
                >
                  {activity.isPublic ? 'Sí' : 'No'}
                </div>
              </td>
              <td className="px-2 py-4">
                <div
                  className={`rounded-xl w-[3vw] ${
                    activity.quotaGeneration ? 'bg-green-400 ' : 'bg-red-400'
                  } mx-auto`}
                >
                  {activity.quotaGeneration ? 'Sí' : 'No'}
                </div>
              </td>
              <td className="px-2 py-4">{activity.sessionMax}</td>
              <td className="px-2 py-4">
                <div
                  className={`rounded-xl w-[3vw] ${
                    activity.mpAvailable ? 'bg-green-400 ' : 'bg-red-400'
                  } mx-auto`}
                >
                  {activity.mpAvailable ? 'Sí' : 'No'}
                </div>
              </td>
              <td className="px-2 py-4">
                {activity.dateFrom.toLocaleDateString()}
              </td>
              <td className="px-2 py-4">
                {activity.dateUntil.toLocaleDateString()}
              </td>
              <td className="px-2 py-4">{activity.paymentType}</td>
              <td className="px-2 py-4">
                <div className="flex gap-2">
                  <div>
                    <Link href={`/panel-de-control/actividades/${activity.id}`}>
                      <button className="py-1 px-2 rounded-md text-white bg-teal-600 border-none cursor-pointer">
                        Editar
                      </button>
                    </Link>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  )
}
