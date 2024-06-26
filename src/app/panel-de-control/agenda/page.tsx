import { Metadata } from 'next'
import { Suspense } from 'react'

import DiariesTable from 'components/dashboard/diaries/DiariesTable'
import DiariesSkeleton from 'components/dashboard/diaries/DiariesSkeleton'

export const metadata: Metadata = {
  title: 'PentaFit - Agenda'
}

export default function DiaryPage() {
  return (
    <div>
      <Suspense fallback={<DiariesSkeleton />}>
        <DiariesTable />
      </Suspense>
    </div>
  )
}
