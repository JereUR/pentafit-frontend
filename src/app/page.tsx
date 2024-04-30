import { Metadata } from 'next'

import HomePageComponent from '@/components/HomePageComponent'

export const metadata: Metadata = {
  title: 'PentaFit'
}

export default function HomePage() {
  return <HomePageComponent />
}
