import { Metadata } from 'next'

import ActivitiesTable from '@/components/dashboard/activities/ActiviesTable'

export const metadata: Metadata = {
  title: 'PentaFit - Actividades'
}

export default function ActivitiesPage() {
  return <ActivitiesTable />
}
