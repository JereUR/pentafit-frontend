import { Metadata } from 'next'

import TeamTable from '@/components/dashboard/team/TeamTable'

export const metadata: Metadata = {
  title: 'PentaFit - Equipo'
}

export default function TeamPage() {
  return (
    <div className="m-10">
      <TeamTable />
    </div>
  )
}
