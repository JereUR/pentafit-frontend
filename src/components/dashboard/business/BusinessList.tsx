'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { MdKeyboardDoubleArrowDown } from 'react-icons/md'

import useUser from 'components/hooks/useUser'
import { Card, CardContent, CardHeader } from 'components/ui/card'
import BusinessSkeleton from './BusinessSkeleton'
import { Business } from '@/components/types/Business'
import BusinessMoreInfo from './BusinessMoreInfo'
import BusinessItem from './BusinessItem'
import { Button } from '@/components/ui/button'
import Loader from '@/components/Loader'

export default function BusinessList() {
  const [showInfo, setShowInfo] = useState<boolean>(false)
  const [businessToShow, setBusinessToShow] = useState<Business | null>(null)
  const [showConfirmDeleteMap, setShowConfirmDeleteMap] = useState<{
    [key: number]: boolean
  }>({})

  const router = useRouter()
  const {
    deleteBusinessById,
    token,
    businesses,
    getBusinesses,
    loadingBusiness
  } = useUser()

  useEffect(() => {
    if (token) {
      getBusinesses()
    }
  }, [token])

  const handleCancelDelete = (businessId: number) => {
    setShowConfirmDeleteMap((prevState) => ({
      ...prevState,
      [businessId]: false
    }))
  }

  const handleConfirmDelete = (businessId: number) => {
    setShowConfirmDeleteMap((prevState) => ({
      ...prevState,
      [businessId]: true
    }))
  }

  const handleDelete = async (id: number) => {
    const res = await deleteBusinessById(id)

    if (res) {
      setShowConfirmDeleteMap((prevState) => ({
        ...prevState,
        [id]: false
      }))
      window.location.reload()
    }
  }

  const handleShowInfo = (business: Business) => {
    setBusinessToShow(business)
    setShowInfo(true)
  }

  const handleCloseInfo = () => {
    setShowInfo(false)
    setBusinessToShow(null)
  }

  return (
    <div className="mt-8">
      {loadingBusiness ? (
        <BusinessSkeleton />
      ) : (
        <div>
          {businesses?.length > 0 ? (
            <div>
              <div className="flex justify-around p-2 text-center ">
                <Card className="px-4 py-2 border-none rounded-lg">
                  <CardHeader className="text-5xl py-1 text-primary-orange-500 font-semibold dark:text-primary-orange-700">
                    {businesses.length}
                  </CardHeader>
                  <CardContent className="text-lg py-1 font-medium">
                    Negocios Totales
                  </CardContent>
                </Card>
                <Card className="px-4 py-2 border-none rounded-lg">
                  <CardHeader className="text-5xl py-1 text-primary-orange-500 font-semibold dark:text-primary-orange-700">
                    {businesses.filter((business) => business.is_active).length}
                  </CardHeader>
                  <CardContent className="text-lg py-1 font-medium">
                    Negocios Activos
                  </CardContent>
                </Card>
                <Card className="px-4 py-2 border-none rounded-lg">
                  <CardHeader className="text-5xl py-1 text-primary-orange-500 font-semibold dark:text-primary-orange-700">
                    {
                      businesses.filter((business) => !business.is_active)
                        .length
                    }
                  </CardHeader>
                  <CardContent className="text-lg py-1 font-medium">
                    Negocios Inactivos
                  </CardContent>
                </Card>
              </div>
              {businesses.map((b) => (
                <div key={b.id}>
                  <BusinessItem
                    item={b}
                    handleShowInfo={handleShowInfo}
                    handleConfirmDelete={handleConfirmDelete}
                  />
                  <BusinessMoreInfo
                    businessToShow={businessToShow}
                    showInfo={showInfo}
                    handleCloseInfo={handleCloseInfo}
                    handleClickDelete={handleConfirmDelete}
                  />
                  {showConfirmDeleteMap[b.id] && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black/30 z-[101] flex justify-center items-center">
                      <div className="flex flex-col gap-4 justify-center items-center bg-background border border-primary-orange-600 p-8 rounded-lg shadow-md">
                        <p>
                          {`¿Está seguro de que desea eliminar el negocio'
                                ${b.name}'?`}
                        </p>
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="secondary"
                            onClick={() => handleCancelDelete(b.id)}
                          >
                            Cancelar
                          </Button>
                          <Button onClick={() => handleDelete(b.id)}>
                            {loadingBusiness ? (
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
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4 text-center justify-center m-10 mb-4">
              <div>
                <p className="text-2xl font-medium">
                  Todavía no has creado ningún negocio
                </p>
              </div>
              <div>
                <p className="flex justify-center items-center gap-2 text-lg italic animate-pulse">
                  <MdKeyboardDoubleArrowDown /> Agrega un tu primer negocio{' '}
                  <MdKeyboardDoubleArrowDown />
                </p>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="flex justify-center">
        <div
          className="bg-transparent w-[5vw] h-[5vw] my-4 text-7xl text-center text-foreground border-b border-lg border-foreground rounded-lg cursor-pointer transition duration-800 ease-in-out hover:text-green-600 hover:border-green-600 dark:hover:text-green-500 dark:hover:border-green-500  hover:animate-bounce"
          onClick={() => router.push('/panel-de-control/negocios/agregar')}
        >
          +
        </div>
      </div>
    </div>
  )
}
