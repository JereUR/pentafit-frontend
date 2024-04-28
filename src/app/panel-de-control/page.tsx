'use client'

import useUser from '@/components/hooks/useUser'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const { token } = useUser()
  const router = useRouter()

  if (token === null) {
    router.replace('/')
  }

  return <div>DashboardPage</div>
}
