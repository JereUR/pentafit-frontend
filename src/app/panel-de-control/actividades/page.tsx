import { Metadata } from 'next'
import { Suspense } from 'react'

import ActivitiesTable from '@/components/dashboard/activities/ActiviesTable'

export const metadata: Metadata = {
  title: 'PentaFit - Actividades'
}

export default function ActivitiesPage() {
  return (
    <Suspense fallback="Loading...">
      <ActivitiesTable />
    </Suspense>
  )
}
