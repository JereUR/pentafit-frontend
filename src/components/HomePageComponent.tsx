'use client'

import { useRef } from 'react'

import BannerSection from '@/components/home/BannerSection'
import ContactForm from '@/components/home/ContactForm'
import ServicesSection from '@/components/home/ServicesSection'

export default function HomePageComponent() {
  const servicesRef = useRef<HTMLDivElement | null>(null)

  return (
    <div className="flex flex-col min-w-full">
      <main className="flex w-full justify-center pt-20 min-h-screen bg-primary-orange-400">
        <div>
          <BannerSection servicesRef={servicesRef} />
        </div>
      </main>
      <div>
        <ServicesSection servicesRef={servicesRef} />
        <div className="flex justify-end">
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
