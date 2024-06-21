import { Metadata } from 'next'

import EditDiary from '@/components/dashboard/diaries/EditDiary'

export const metadata: Metadata = {
  title: 'PentaFit - Editar agenda'
}

export default function EditPage() {
  return <EditDiary />
}
