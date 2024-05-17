'use client'

import axios from 'axios'
import BusinessItem from './BusinessItem'
import { Business } from '@/components/types/Business'
import { toast } from '@/components/ui/use-toast'
import { useEffect, useState } from 'react'
import useUser from '@/components/hooks/useUser'
import { Button } from '@/components/ui/button'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL

export default function BusinessList() {
  const [getData, setGetData] = useState(false)
  const [loading, setLoading] = useState(false)
  const { businesses, getBusinesses } = useUser()

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
    </div>
  )
}
