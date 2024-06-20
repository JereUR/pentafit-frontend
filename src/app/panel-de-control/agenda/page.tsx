import { Metadata } from 'next'
import { Suspense } from 'react'

import DiariesList from '@/components/dashboard/diaries/DiariesList'
import DiariesSkeleton from '@/components/dashboard/diaries/DiariesSkeleton'

export const metadata: Metadata = {
  title: 'PentaFit - Agenda'
}

export default function DiaryPage() {
  return (
    <div>
      <Suspense fallback={<DiariesSkeleton />}>
        <DiariesList />
      </Suspense>
    </div>
  )
}
