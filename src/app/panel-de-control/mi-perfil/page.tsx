import { Metadata } from 'next'

import Profile from '@/components/dashboard/profile/Profile'

export const metadata: Metadata = {
  title: 'PentaFit - Mi perfil'
}

export default function ProfilePage() {
  return (
    <div className="m-10">
      <Profile />
    </div>
  )
}
