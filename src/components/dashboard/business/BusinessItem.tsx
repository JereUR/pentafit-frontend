import Image from 'next/image'
import {
  MdArrowDownward,
  MdArrowUpward,
  MdDelete,
  MdEdit,
  MdOutlineWork,
  MdOutlineWorkOff
} from 'react-icons/md'
import { useRouter } from 'next/navigation'

import { Business } from 'components/types/Business'
import noImage from '../../../../public/assets/no-image.png'
import { Button } from 'components/ui/button'
import useUser from 'components/hooks/useUser'

interface Props {
  item: Business
  handleShowInfo: (business: Business) => void
  handleConfirmDelete: (businessId: number) => void
}

const BusinessItem: React.FC<Props> = ({
  item,
  handleShowInfo,
  handleConfirmDelete
}) => {
  const router = useRouter()
  const { updateStatusBusiness, updateWorkingBusiness } = useUser()
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL

  async function handleStatus(id: number) {
    const res = await updateStatusBusiness(id)

    if (res) {
      window.location.reload()
    }
  }

  async function handleWorking(id: number) {
    const res = await updateWorkingBusiness(id)

    if (res) {
      window.location.reload()
    }
  }

  return (
    <div className="p-4 m-10 bg-card rounded-lg shadow-md">
      <div className="flex justify-between py-6">
        <div
          className={`flex ${
            !item.is_active && 'opacity-40'
          } cursor-pointer hover:underline`}
          onClick={() => handleShowInfo(item)}
        >
          <div className="flex px-16">
            <Image
              src={item.logo ? `${BASE_URL}${item.logo}` : noImage}
              alt={`${item.name} logo`}
              width={150}
              height={150}
              className="w-[180px] h-[180px] border-2 border-primary-orange-600 rounded-full p-2 dark:ring-primary-orange-400"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{item.name}</h2>
            <p className="text-lg">
              {item.description ? item.description : 'Sin descripción.'}
            </p>
            <p>{item.is_active ? 'Activo' : 'Inactivo'}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 xl:px-8 border-l">
          <Button
            className={`flex justify-start items-center shadow-md dark:text-foreground gap-2 ${
              item.is_working
                ? 'bg-gray-500 dark:bg-gray-600'
                : 'bg-purple-500 dark:bg-purple-600'
            } transition duration-300 ease-in-out hover:scale-[1.02] ${
              item.is_working
                ? 'hover:bg-gray-600 dark:hover:bg-gray-700'
                : 'hover:bg-purple-600 dark:hover:bg-purple-700'
            }`}
            onClick={() => handleWorking(item.id)}
          >
            {item.is_working ? (
              <MdOutlineWork className="h-5 w-5" />
            ) : (
              <MdOutlineWorkOff className="h-5 w-5" />
            )}
            {item.is_working ? (
              <span className="flex m-auto ">Salir Area de Trabajo</span>
            ) : (
              <span className="flex m-auto ">Entrar Area de Trabajo</span>
            )}
          </Button>
          <Button
            className={`flex justify-start items-center shadow-md dark:text-foreground gap-2 ${
              item.is_active
                ? 'bg-orange-500 dark:bg-orange-600'
                : 'bg-green-500 dark:bg-green-600'
            } transition duration-300 ease-in-out hover:scale-[1.02] ${
              item.is_active
                ? 'hover:bg-orange-600 dark:hover:bg-orange-700'
                : 'hover:bg-green-600 dark:hover:bg-green-700'
            }`}
            onClick={() => handleStatus(item.id)}
          >
            {item.is_active ? (
              <MdArrowDownward className="h-5 w-5" />
            ) : (
              <MdArrowUpward className="h-5 w-5" />
            )}
            {item.is_active ? (
              <span className="flex m-auto ">Dar de Baja</span>
            ) : (
              <span className="flex m-auto ">Dar de Alta</span>
            )}
          </Button>
          <Button
            className="flex justify-start items-center shadow-md dark:text-foreground gap-2 bg-sky-500 dark:bg-sky-600 transition duration-300 ease-in-out hover:scale-[1.02] hover:bg-sky-600 dark:hover:bg-sky-600"
            onClick={() =>
              router.push(`/panel-de-control/negocios/editar/${item.id}`)
            }
          >
            <MdEdit className="h-5 w-5" />
            <span className="flex m-auto ">Editar</span>
          </Button>
          <Button
            className="flex justify-start items-center shadow-md dark:text-foreground gap-2 bg-red-500 dark:bg-red-600 transition duration-300 ease-in-out hover:scale-[1.02] hover:bg-red-600 dark:hover:bg-red-700"
            onClick={() => handleConfirmDelete(item.id)}
          >
            <MdDelete className="h-5 w-5" />
            <span className="flex m-auto ">Borrar</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default BusinessItem
