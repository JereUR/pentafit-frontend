'use client'

import Link from 'next/link'
import Search from '../search/Search'
import Pagination from '../pagination/Pagination'
import { useSearchParams } from 'next/navigation'

const activities: Activity[] = [
  {
    id: 'm5gr84i9',
    description: 'Actividad 1',
    amount: 200,
    isPublic: false,
    quotaGeneration: true,
    sessionMax: 5,
    mpAvailable: false,
    dateFrom: new Date(2024, 4, 20),
    dateUntil: new Date(2024, 5, 20),
    paymentType: 'Mensual'
  },
  {
    id: '3u1reuv4',
    description: 'Actividad 2',
    amount: 300,
    isPublic: true,
    quotaGeneration: true,
    sessionMax: 15,
    mpAvailable: true,
    dateFrom: new Date(2024, 4, 20),
    dateUntil: new Date(2024, 5, 20),
    paymentType: 'Mensual'
  },
  {
    id: 'derv1ws0',
    description: 'Actividad 3',
    amount: 400,
    isPublic: true,
    quotaGeneration: true,
    sessionMax: 10,
    mpAvailable: true,
    dateFrom: new Date(2024, 4, 20),
    dateUntil: new Date(2024, 5, 20),
    paymentType: 'Sesion'
  },
  {
    id: '5kma53ae',
    description: 'Actividad 4',
    amount: 200,
    isPublic: false,
    quotaGeneration: true,
    sessionMax: 30,
    mpAvailable: false,
    dateFrom: new Date(2024, 4, 20),
    dateUntil: new Date(2024, 5, 20),
    paymentType: 'Diario'
  },
  {
    id: 'bhqecj4p',
    description: 'Actividad 5',
    amount: 500,
    isPublic: true,
    quotaGeneration: true,
    sessionMax: 7,
    mpAvailable: true,
    dateFrom: new Date(2024, 4, 20),
    dateUntil: new Date(2024, 5, 20),
    paymentType: 'Semanal'
  }
]

export type Activity = {
  id: string
  description: string
  amount: number
  isPublic: boolean
  quotaGeneration: boolean
  sessionMax: number
  mpAvailable: boolean
  dateFrom: Date
  dateUntil: Date
  paymentType: 'Sesion' | 'Diario' | 'Semanal' | 'Mensual'
}

export default function ActivitiesTable() {
  const searchParams = useSearchParams()
  const count = 4
  const q = searchParams.get('q') || ''
  const page = parseInt(searchParams.get('page') || '1')
  console.log(q, page)
  /* const { activitys, count } = await fetchactivitys(q, page)  */

  return (
    <div className="bg-background p-5 rounded-lg mt-5">
      <div className="flex items-center justify-between">
        <Search placeholder="Buscar una actividad..." />
        <Link href="/panel-de-control/actividades/agregar">
          <button className="p-2 bg-purple-800 text-white border-none rounded-md cursor-pointer">
            Agregar
          </button>
        </Link>
      </div>
      <table className="transactions-table w-full">
        <thead>
          <tr>
            <td>Checkbox</td>
            <td>Descripción</td>
            <td>Costo</td>
            <td>Es pública?</td>
            <td>Permite generación de cuotas</td>
            <td>Cantida máxima de sesiones</td>
            <td>Permite MP a través de la app</td>
            <td>Fecha desde</td>
            <td>Fecha hasta</td>
            <td>Tipo cobro</td>
            <td>Acción</td>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr className="my-4" key={activity.id}>
              <td>Checkbox</td>
              <td>
                <div className="flex items-center gap-2">
                  {activity.description}
                </div>
              </td>
              <td>{activity.amount}</td>
              <td>{activity.isPublic ? 'Sí' : 'No'}</td>
              <td>{activity.quotaGeneration ? 'Sí' : 'No'}</td>
              <td>{activity.sessionMax}</td>
              <td>{activity.mpAvailable ? 'Sí' : 'No'}</td>
              <td>{activity.dateFrom.toLocaleString()}</td>
              <td>{activity.dateUntil.toLocaleString()}</td>
              <td>{activity.paymentType}</td>
              <td>
                <div className="flex gap-2">
                  <div>
                    <Link href={`/panel-de-control/actividades/${activity.id}`}>
                      <button className="py-1 px-2 rounded-md text-white border-none cursor-pointer bg-teal-700">
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
