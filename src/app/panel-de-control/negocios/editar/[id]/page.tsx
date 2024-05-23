import EditBusiness from '@/components/dashboard/business/EditBusiness'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PentaFit - Editar negocio'
}

export default function EditPage() {
  return <EditBusiness />
}
