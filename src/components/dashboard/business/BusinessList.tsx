'use client'

import BusinessItem from './BusinessItem'
import useUser from '@/components/hooks/useUser'

export default function BusinessList() {
  const { business } = useUser()

  return (
    <div>
      {business.map((b) => (
        <BusinessItem item={b} />
      ))}
    </div>
  )
}
