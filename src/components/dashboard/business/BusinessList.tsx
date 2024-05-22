'use client'

import BusinessItem from './BusinessItem'
import { useEffect, useState } from 'react'
import useUser from '@/components/hooks/useUser'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { MdKeyboardDoubleArrowDown } from 'react-icons/md'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL

export default function BusinessList() {
  const [getData, setGetData] = useState(false)
  const router = useRouter()
  const { loading, businesses, getBusinesses } = useUser()

  useEffect(() => {
    if (!getData) {
      getBusinesses()
      setGetData(true)
    }
  }, [getData])

  return (
    <div className="mt-8">
      {businesses?.length > 0 ? (
        <div>
          <div className="flex justify-around p-2 text-center ">
            <Card className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg">
              <CardHeader className="text-5xl py-1 text-primary-orange-500 font-semibold dark:text-primary-orange-700">
                {businesses.length}
              </CardHeader>
              <CardContent className="text-lg py-1 font-medium">
                Negocios Totales
              </CardContent>
            </Card>
            <Card className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg">
              <CardHeader className="text-5xl py-1 text-primary-orange-500 font-semibold dark:text-primary-orange-700">
                {businesses.filter((business) => business.isActive).length}
              </CardHeader>
              <CardContent className="text-lg py-1 font-medium">
                Negocios Activos
              </CardContent>
            </Card>
            <Card className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg">
              <CardHeader className="text-5xl py-1 text-primary-orange-500 font-semibold dark:text-primary-orange-700">
                {businesses.filter((business) => !business.isActive).length}
              </CardHeader>
              <CardContent className="text-lg py-1 font-medium">
                Negocios Inactivos
              </CardContent>
            </Card>
          </div>
          {businesses.map((b) => (
            <BusinessItem key={b.id} item={b} />
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
