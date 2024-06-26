import { Metadata } from 'next'

import EditPlan from 'components/dashboard/plans/EditPlan'

export const metadata: Metadata = {
  title: 'PentaFit - Editar plan'
}

export default function EditPage() {
  return <EditPlan />
}
