import { Metadata } from 'next'
import { Suspense } from 'react'

import BusinessList from 'components/dashboard/business/BusinessList'
import BusinessSkeleton from 'components/dashboard/business/BusinessSkeleton'

export const metadata: Metadata = {
  title: 'PentaFit - Negocios'
}

export default function BusinessPage() {
  return (
    <div>
      <Suspense fallback={<BusinessSkeleton />}>
        <BusinessList />
      </Suspense>
    </div>
  )
}
