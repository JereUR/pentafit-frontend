import { Metadata } from 'next'

import { initialData } from '@/components/types/Diary'
import DiaryForm from '@/components/dashboard/diaries/DiaryForm'

export const metadata: Metadata = {
  title: 'PentaFit - Agregar agenda'
}

export default function AddDiaryPage() {
  return (
    <div className="m-10">
      <DiaryForm type="add" diary={initialData} />
    </div>
  )
}
