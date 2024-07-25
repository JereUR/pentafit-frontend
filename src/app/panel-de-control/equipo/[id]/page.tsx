import { Metadata } from 'next'

import MemberInfo from '@/components/dashboard/team/MemberInfo'

export const metadata: Metadata = {
  title: 'PentaFit - Información de usuario'
}

export default function MemberPage() {
  return (
    <div className="m-10">
      <MemberInfo />
    </div>
  )
}
