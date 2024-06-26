import { Metadata } from 'next'

import BusinessForm from 'components/dashboard/business/BusinessForm'
import { initialData } from 'components/types/Business'

export const metadata: Metadata = {
  title: 'PentaFit - Agregar Negocio'
}

export default function AddBusinessPage() {
  return <BusinessForm business={initialData} type="add" />
}
