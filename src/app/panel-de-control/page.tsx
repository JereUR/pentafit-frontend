'use client'

import useUser from '@/components/hooks/useUser'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const { user, token } = useUser()
  const router = useRouter()

  if (!token) {
    router.push('/')
  }

  return <div>DashboardPage</div>
}
