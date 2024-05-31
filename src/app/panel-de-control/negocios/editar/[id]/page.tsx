import { Metadata } from 'next'

import EditBusiness from '@/components/dashboard/business/EditBusiness'

export const metadata: Metadata = {
  title: 'PentaFit - Editar negocio'
}

export default function EditPage() {
  return <EditBusiness />
}
