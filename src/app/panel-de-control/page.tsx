'use client'

import useUser from '@/components/hooks/useUser'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const { getToken } = useUser()
  let token = null
  const router = useRouter()

  if (typeof window !== 'undefined') {
    token = getToken()
  }

  if (token === null) {
    router.replace('/')
  }

  return <div>DashboardPage</div>
}
