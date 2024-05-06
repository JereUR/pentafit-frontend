import ActivitiesTable from '@/components/dashboard/activities/ActiviesTable'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PentaFit - Actividades'
}

export default function ActivitiesPage() {
  return <ActivitiesTable />
}
