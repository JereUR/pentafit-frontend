import { Metadata } from 'next'
import BusinessList from '@/components/dashboard/business/BusinessList'

export const metadata: Metadata = {
  title: 'PentaFit - Compañias'
}

export default function BusinessPage() {
  return (
    <div>
      <BusinessList />
    </div>
  )
}
