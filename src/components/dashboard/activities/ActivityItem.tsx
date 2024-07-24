'use client'

import { Cross1Icon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import { BiEdit, BiTrash } from 'react-icons/bi'

import { Activity } from '@/components/types/Activity'

interface Props {
  showInfo: boolean
  activityToShow: Activity | null
  handleCloseInfo: () => void
  handleClickDelete: (activityId: number) => void
}

const ActivityItem: React.FC<Props> = ({
  showInfo,
  activityToShow,
  handleCloseInfo,
  handleClickDelete
}) => {
  const router = useRouter()

  return (
    <div>
      {showInfo && activityToShow && (
        <div className="fixed inset-0  z-[100] flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-card text-foreground p-6 rounded-lg shadow-lg w-3/4 max-h-[80vh] overflow-y-auto  scrollbar-thin scrollbar-thumb-rounded scrollbar-track-rounded scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-semibold mb-4 text-primary-orange-500 dark:text-primary-orange-600">
                Información de la Actividad
              </h4>
              <div className="flex justify-center gap-2">
                <button
                  className="bg-transparent text-white py-2 rounded"
                  onClick={(e) => {
                    e.stopPropagation()
                    router.push(
                      `/panel-de-control/actividades/editar/${activityToShow.id}`
                    )
                  }}
                >
                  <BiEdit className="h-4 w-4 md:h-6 md:w-6 text-blue-500 dark:text-blue-600 transition duration-300 ease-in-out hover:scale-[1.07] hover:text-blue-800 dark:hover:text-blue-700" />
                </button>
                <button
                  className="bg-transparent text-white py-2 rounded"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleClickDelete(activityToShow.id)
                  }}
                >
                  <BiTrash className="h-4 w-4 md:h-6 md:w-6 text-red-500 dark:text-red-600 transition duration-300 ease-in-out hover:scale-[1.07] hover:text-red-800 dark:hover:text-red-700" />
                </button>
                <button onClick={handleCloseInfo}>
                  <Cross1Icon className="h-4 w-4 md:h-6 md:w-6 text-red-500 dark:text-red-600 transition duration-300 ease-in-out hover:scale-[1.07] hover:text-red-800 dark:hover:text-red-700" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-8">
              <p className="text-lg bg-gray-100 dark:bg-gray-800 text-primary-orange-500 dark:text-primary-orange-600 rounded-lg p-2">
                <strong className="text-foreground">Nombre:</strong>{' '}
                {activityToShow.name}
              </p>
              <p className="text-lg bg-gray-100 dark:bg-gray-800 text-primary-orange-500 dark:text-primary-orange-600 rounded-lg p-2">
                <strong className="text-foreground">Descripción:</strong>{' '}
                {activityToShow.description}
              </p>
              <p className="text-lg bg-gray-100 dark:bg-gray-800 text-primary-orange-500 dark:text-primary-orange-600 rounded-lg p-2">
                <strong className="text-foreground">Precio:</strong>{' '}
                {activityToShow.price}
              </p>
              <p className="text-lg bg-gray-100 dark:bg-gray-800 text-primary-orange-500 dark:text-primary-orange-600 rounded-lg p-2">
                <strong className="text-foreground">¿Es pública?:</strong>{' '}
                {activityToShow.is_public ? 'Sí' : 'No'}
              </p>
              <p className="text-lg bg-gray-100 dark:bg-gray-800 text-primary-orange-500 dark:text-primary-orange-600 rounded-lg p-2">
                <strong className="text-foreground">Nombre público:</strong>{' '}
                {activityToShow.public_name ? activityToShow.public_name : '-'}
              </p>
              <p className="text-lg bg-gray-100 dark:bg-gray-800 text-primary-orange-500 dark:text-primary-orange-600 rounded-lg p-2">
                <strong className="text-foreground">¿Genera cuota?:</strong>{' '}
                {activityToShow.generate_invoice ? 'Sí' : 'No'}
              </p>
              <p className="text-lg bg-gray-100 dark:bg-gray-800 text-primary-orange-500 dark:text-primary-orange-600 rounded-lg p-2">
                <strong className="text-foreground">Sesiones máximas:</strong>{' '}
                {activityToShow.max_sessions}
              </p>
              <p className="text-lg bg-gray-100 dark:bg-gray-800 text-primary-orange-500 dark:text-primary-orange-600 rounded-lg p-2">
                <strong className="text-foreground">
                  ¿Mercado Libre disponible?:
                </strong>{' '}
                {activityToShow.mp_available ? 'Sí' : 'No'}
              </p>
              <p className="text-lg bg-gray-100 dark:bg-gray-800 text-primary-orange-500 dark:text-primary-orange-600 rounded-lg p-2">
                <strong className="text-foreground">Fecha desde:</strong>{' '}
                {activityToShow.start_date}
              </p>
              <p className="text-lg bg-gray-100 dark:bg-gray-800 text-primary-orange-500 dark:text-primary-orange-600 rounded-lg p-2">
                <strong className="text-foreground">Fecha hasta:</strong>{' '}
                {activityToShow.end_date}
              </p>
              <p className="text-lg bg-gray-100 dark:bg-gray-800 text-primary-orange-500 dark:text-primary-orange-600 rounded-lg p-2">
                <strong className="text-foreground">Tipo de cobro:</strong>{' '}
                {activityToShow.payment_type}
              </p>
              <p className="text-lg bg-gray-100 dark:bg-gray-800 text-primary-orange-500 dark:text-primary-orange-600 rounded-lg p-2">
                <strong className="text-foreground">Tipo de actividad:</strong>{' '}
                {activityToShow.activity_type}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ActivityItem
