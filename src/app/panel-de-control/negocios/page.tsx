import BusinessList from '@/components/dashboard/business/BusinessList'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'PentaFit - Compañias'
}

export default function BusinessPage() {
  return (
    <div>
      <Suspense fallback="Loading...">
        <BusinessList />
      </Suspense>
    </div>
  )
}
