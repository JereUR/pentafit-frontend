import BusinessForm from '@/components/dashboard/business/BusinessForm'
import { initialData } from '@/components/types/Business'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PentaFit - Agregar Negocio'
}

export default function AddBusinessPage() {
  return <BusinessForm business={initialData} type="add" />
}
