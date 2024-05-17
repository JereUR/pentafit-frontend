import Image from 'next/image'

import { Business } from '@/components/types/Business'
import noImage from '@public/assets/no-image.png'
import { Button } from '@/components/ui/button'
import {
  MdArrowDownward,
  MdArrowUpward,
  MdDelete,
  MdEdit,
  MdOutlineWork,
  MdOutlineWorkOff,
  MdRestoreFromTrash
} from 'react-icons/md'

export default function BusinessItem({ item }: { item: Business }) {
  return (
    <div className="p-4 m-8 border border-gray-300 dark:border-gray-600 rounded-lg">
      <div className="flex py-6">
        <div className={`flex ${!item.isActive && 'opacity-40'}`}>
          <div className="px-16">
            <Image
              src={item.logo ? item.logo : noImage}
              alt={`${item.name} logo`}
              width={150}
              height={150}
              className="rounded-full ring-2 ring-primary-orange-600 dark:ring-primary-orange-400"
            />
          </div>
          <div className="w-[40vw]">
            <h2 className="text-2xl font-bold">{item.name}</h2>
            <p className="text-lg">
              {item.description ? item.description : 'Sin descripción.'}
            </p>
            <p>{item.isActive ? 'Activo' : 'Inactivo'}</p>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-4 px-8 border-l ml-[10vw]">
          <Button
            className={`flex justify-start items-center shadow-md dark:text-foreground gap-2 ${
              item.isWorking
                ? 'bg-orange-500 dark:bg-orange-600'
                : 'bg-purple-500 dark:bg-purple-600'
            } transition duration-300 ease-in-out hover:scale-[1.02] ${
              item.isWorking
                ? 'hover:bg-orange-600 dark:hover:bg-orange-700'
                : 'hover:bg-green-600 dark:hover:bg-green-700'
            }`}
          >
            {item.isWorking ? (
              <MdOutlineWork className="h-5 w-5" />
            ) : (
              <MdOutlineWorkOff className="h-5 w-5" />
            )}
            {item.isWorking ? (
              <span className="flex m-auto ">Salir Area de Trabajo</span>
            ) : (
              <span className="flex m-auto ">Entrar Area de Trabajo</span>
            )}
          </Button>
          <Button
            className={`flex justify-start items-center shadow-md dark:text-foreground gap-2 ${
              item.isActive
                ? 'bg-orange-500 dark:bg-orange-600'
                : 'bg-green-500 dark:bg-green-600'
            } transition duration-300 ease-in-out hover:scale-[1.02] ${
              item.isActive
                ? 'hover:bg-orange-600 dark:hover:bg-orange-700'
                : 'hover:bg-green-600 dark:hover:bg-green-700'
            }`}
          >
            {item.isActive ? (
              <MdArrowDownward className="h-5 w-5" />
            ) : (
              <MdArrowUpward className="h-5 w-5" />
            )}
            {item.isActive ? (
              <span className="flex m-auto ">Dar de Baja</span>
            ) : (
              <span className="flex m-auto ">Dar de Alta</span>
            )}
          </Button>
          <Button className="flex justify-start items-center shadow-md dark:text-foreground gap-2 bg-sky-500 dark:bg-sky-600 transition duration-300 ease-in-out hover:scale-[1.02] hover:bg-sky-600 dark:hover:bg-sky-600">
            <MdEdit className="h-5 w-5" />
            <span className="flex m-auto ">Editar</span>
          </Button>
          <Button className="flex justify-start items-center shadow-md dark:text-foreground gap-2 bg-red-500 dark:bg-red-600 transition duration-300 ease-in-out hover:scale-[1.02] hover:bg-red-600 dark:hover:bg-red-700">
            <MdDelete className="h-5 w-5" />
            <span className="flex m-auto ">Borrar</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
