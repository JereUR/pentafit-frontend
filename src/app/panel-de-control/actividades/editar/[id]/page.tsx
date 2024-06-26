import { Metadata } from 'next'

import EditActivity from 'components/dashboard/activities/EditActivity'

export const metadata: Metadata = {
  title: 'PentaFit - Editar actividad'
}

export default function EditPage() {
  return <EditActivity />
}
