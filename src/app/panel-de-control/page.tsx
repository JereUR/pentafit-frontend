'use client'

import useUser from '@/components/hooks/useUser'

export default function DashboardPage() {
  const { user, token } = useUser()

  if (!token) {
    window.location.replace('/')
    return null
  }

  return <div>DashboardPage</div>
}
