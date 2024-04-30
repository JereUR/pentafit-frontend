'use client'

import useUser from '@/components/hooks/useUser'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardPage() {
  const { token } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (token === null) {
      router.replace('/')
    }
  }, [token, router])

  useEffect(() => {
    document.title = 'PentaFit - Panel de Control'
  }, [])

  return <div>DashboardPage</div>
}
