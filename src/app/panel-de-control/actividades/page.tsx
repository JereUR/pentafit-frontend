import { Metadata } from 'next'
import { Suspense } from 'react'

import ActivitiesTable from '@/components/dashboard/activities/ActiviesTable'
import ActivitiesSkeleton from '@/components/dashboard/activities/ActivitiesSkeleton'

export const metadata: Metadata = {
  title: 'PentaFit - Actividades'
}

export default function ActivitiesPage() {
  return (
    <Suspense fallback={<ActivitiesSkeleton />}>
      <ActivitiesTable />
    </Suspense>
  )
}
