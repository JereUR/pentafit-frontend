'use client'

import BusinessItem from './BusinessItem'
import { useEffect, useState } from 'react'
import useUser from '@/components/hooks/useUser'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

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
    <div>
      {businesses?.length > 0 ? (
        <div>
          {businesses.map((b) => (
            <BusinessItem key={b.id} item={b} />
          ))}
        </div>
      ) : (
        <div>No data</div>
      )}
      <div className="flex justify-center">
        <div
          className="bg-transparent w-[5vw] h-[5vw] mb-6 text-7xl text-center text-foreground border-b border-lg border-foreground rounded-lg cursor-pointer transition duration-800 ease-in-out hover:text-green-600 hover:border-green-600 dark:hover:text-green-500 dark:hover:border-green-500  hover:animate-bounce"
          onClick={() => router.push('/panel-de-control/negocios/agregar')}
        >
          +
        </div>
      </div>
    </div>
  )
}
