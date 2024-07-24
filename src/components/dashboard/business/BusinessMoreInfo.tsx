'use client'

import { Cross1Icon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import React from 'react'
import { BiEdit, BiTrash } from 'react-icons/bi'
import Image from 'next/image'

import { Business } from '@/components/types/Business'
import noImage from '../../../../public/assets/no-image.png'

interface Props {
  showInfo: boolean
  businessToShow: Business | null
  handleCloseInfo: () => void
  handleClickDelete: (businessId: number) => void
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL

const BusinessMoreInfo: React.FC<Props> = ({
  showInfo,
  businessToShow,
  handleCloseInfo,
  handleClickDelete
}) => {
  const router = useRouter()

  return (
    <div>
      {showInfo && businessToShow && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-card text-foreground p-6 rounded-lg shadow-lg w-3/4 max-h-[80vh] overflow-y-auto  scrollbar-thin scrollbar-thumb-rounded scrollbar-track-rounded scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-semibold mb-4 text-primary-orange-500 dark:text-primary-orange-600">
                Información del Negocio
              </h4>
              <div className="flex justify-center gap-2">
                <button
                  className="bg-transparent text-white py-2 rounded"
                  onClick={(e) => {
                    e.stopPropagation()
                    router.push(
                      `/panel-de-control/negocios/editar/${businessToShow.id}`
                    )
                  }}
                >
                  <BiEdit className="h-4 w-4 md:h-6 md:w-6 text-blue-500 dark:text-blue-600 transition duration-300 ease-in-out hover:scale-[1.07] hover:text-blue-800 dark:hover:text-blue-700" />
                </button>
                <button
                  className="bg-transparent text-white py-2 rounded"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleClickDelete(businessToShow.id)
                  }}
                >
                  <BiTrash className="h-4 w-4 md:h-6 md:w-6 text-red-500 dark:text-red-600 transition duration-300 ease-in-out hover:scale-[1.07] hover:text-red-800 dark:hover:text-red-700" />
                </button>
                <button onClick={handleCloseInfo}>
                  <Cross1Icon className="h-4 w-4 md:h-6 md:w-6 text-red-500 dark:text-red-600 transition duration-300 ease-in-out hover:scale-[1.07] hover:text-red-800 dark:hover:text-red-700" />
                </button>
              </div>
            </div>
            <div className="flex px-16">
              <Image
                src={
                  businessToShow.logo
                    ? `${BASE_URL}${businessToShow.logo}`
                    : noImage
                }
                alt={`${businessToShow.name} logo`}
                width={150}
                height={150}
                className="w-[180px] h-[180px] border-2 border-primary-orange-600 rounded-xl p-2 dark:ring-primary-orange-400"
              />
            </div>
            <div className="flex gap-8 mt-8">
              <p className="text-lg bg-gray-100 dark:bg-gray-800 text-primary-orange-500 dark:text-primary-orange-600 rounded-lg p-2">
                <strong className="text-foreground">Nombre:</strong>{' '}
                {businessToShow.name}
              </p>
              <p className="text-lg bg-gray-100 dark:bg-gray-800 text-primary-orange-500 dark:text-primary-orange-600 rounded-lg p-2">
                <strong className="text-foreground">Descripción:</strong>{' '}
                {businessToShow.description}
              </p>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-primary-orange-500 dark:text-primary-orange-600 mt-8">
              Información de Contacto
            </h3>
            <div className="grid grid-cols-3 gap-8">
              <p className="text-lg bg-gray-100 dark:bg-gray-800 text-primary-orange-500 dark:text-primary-orange-600 rounded-lg p-2">
                <strong className="text-foreground">Email:</strong>{' '}
                {businessToShow.email ? businessToShow.email : '-'}
              </p>
              <p className="text-lg bg-gray-100 dark:bg-gray-800 text-primary-orange-500 dark:text-primary-orange-600 rounded-lg p-2">
                <strong className="text-foreground">Dirección:</strong>{' '}
                {businessToShow.address ? businessToShow.address : '-'}
              </p>
              <p className="text-lg bg-gray-100 dark:bg-gray-800 text-primary-orange-500 dark:text-primary-orange-600 rounded-lg p-2">
                <strong className="text-foreground">Teléfono:</strong>{' '}
                {businessToShow.phone ? businessToShow.phone : '-'}
              </p>
              <p className="text-lg bg-gray-100 dark:bg-gray-800 text-primary-orange-500 dark:text-primary-orange-600 rounded-lg p-2">
                <strong className="text-foreground">Instagram:</strong>{' '}
                {businessToShow.instagram ? businessToShow.instagram : '-'}
              </p>
              <p className="text-lg bg-gray-100 dark:bg-gray-800 text-primary-orange-500 dark:text-primary-orange-600 rounded-lg p-2">
                <strong className="text-foreground">Facebook:</strong>{' '}
                {businessToShow.facebook ? businessToShow.facebook : '-'}
              </p>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-primary-orange-500 dark:text-primary-orange-600 mt-8">
              Metadata
            </h3>
            <div className="grid grid-cols-3 gap-8">
              <p className="text-lg bg-gray-100 dark:bg-gray-800 text-primary-orange-500 dark:text-primary-orange-600 rounded-lg p-2">
                <strong className="text-foreground">
                  Título/Nombre de Página Web:
                </strong>{' '}
                {businessToShow.metadata?.title
                  ? businessToShow.metadata?.title
                  : '-'}
              </p>
              <p className="text-lg bg-gray-100 dark:bg-gray-800 text-primary-orange-500 dark:text-primary-orange-600 rounded-lg p-2">
                <strong className="text-foreground">Slogan:</strong>{' '}
                {businessToShow.metadata?.slogan
                  ? businessToShow.metadata?.slogan
                  : '-'}
              </p>
              <p className="text-lg bg-gray-100 dark:bg-gray-800 text-primary-orange-500 dark:text-primary-orange-600 rounded-lg p-2">
                <strong className="text-foreground">Color Primario:</strong>{' '}
                {businessToShow.metadata?.primary_color ? (
                  <div
                    className="w-8 h-8 rounded-full cursor-pointer ring-2 ring-foreground"
                    style={{
                      backgroundColor: businessToShow.metadata.primary_color
                    }}
                  />
                ) : (
                  '-'
                )}
              </p>
              <p className="text-lg bg-gray-100 dark:bg-gray-800 text-primary-orange-500 dark:text-primary-orange-600 rounded-lg p-2">
                <strong className="text-foreground">Color Secundario:</strong>{' '}
                {businessToShow.metadata?.secondary_color?<div
                  className="w-8 h-8 rounded-full cursor-pointer ring-2 ring-foreground"
                  style={{
                    backgroundColor: businessToShow.metadata.secondary_color
                  }}
                />:'-'}
              </p>
              <p className="text-lg bg-gray-100 dark:bg-gray-800 text-primary-orange-500 dark:text-primary-orange-600 rounded-lg p-2">
                <strong className="text-foreground">Color Terciario:</strong>{' '}
                {businessToShow.metadata?.third_color?<div
                  className="w-8 h-8 rounded-full cursor-pointer ring-2 ring-foreground"
                  style={{
                    backgroundColor: businessToShow.metadata.third_color
                  }}
                />:'-'}
              </p>
              
            </div>
            <p className="text-lg bg-gray-100 dark:bg-gray-800 text-primary-orange-500 dark:text-primary-orange-600 rounded-lg py-2 px-8 mt-8 w-fit">
                <strong className="text-foreground">Logo App Web:</strong>{' '}
                <Image
                  src={
                    businessToShow.metadata?.logoWeb
                      ? `${BASE_URL}${businessToShow.metadata.logoWeb}`
                      : noImage
                  }
                  alt={`${businessToShow.name} logo`}
                  width={150}
                  height={150}
                  className="w-[180px] h-[180px] border-2 border-primary-orange-600 rounded-xl p-2 dark:ring-primary-orange-400"
                />
              </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default BusinessMoreInfo
