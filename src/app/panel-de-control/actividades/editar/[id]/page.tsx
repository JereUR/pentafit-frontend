import EditActivity from '@/components/dashboard/activities/EditActivity'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PentaFit - Editar actividad'
}

export default function EditPage() {
  return <EditActivity />
}
