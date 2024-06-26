import { Metadata } from 'next'
import React, { Suspense } from 'react'

import PlansSkeleton from 'components/dashboard/plans/PlansSkeleton'
import PlansTable from 'components/dashboard/plans/PlansTable'

export const metadata: Metadata = {
  title: 'PentaFit - Planes'
}

export default function PlansPage() {
  return (
    <Suspense fallback={<PlansSkeleton />}>
      <PlansTable />
    </Suspense>
  )
}
