'use client'

import useUser from '@/components/hooks/useUser'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const { getToken } = useUser()
  const token = getToken()
  const router = useRouter()

  if (token === null) {
    router.replace('/')
  }

  return <div>DashboardPage</div>
}
