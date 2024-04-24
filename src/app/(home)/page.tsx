'use client'

import BannerSection from '@/components/home/BannerSection'
import ServicesSection from '@/components/home/ServicesSection'
import { useRef } from 'react'

export default function HomePage() {
  const servicesRef = useRef<HTMLDivElement | null>(null)

  return (
    <div>
      <BannerSection servicesRef={servicesRef} />
      <ServicesSection servicesRef={servicesRef} />
    </div>
  )
}
