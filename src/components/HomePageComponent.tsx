'use client'

import { useRef } from 'react'

import BannerSection from '@/components/home/BannerSection'
import ContactForm from '@/components/home/ContactForm'
import ServicesSection from '@/components/home/ServicesSection'
import PriceSection from './home/PriceSection'

export default function HomePageComponent() {
  const servicesRef = useRef<HTMLDivElement | null>(null)

  return (
    <div className="flex flex-col min-w-full">
      <main className="flex w-full justify-center pt-20 min-h-screen bg-primary-orange-500">
        <div>
          <BannerSection servicesRef={servicesRef} />
        </div>
      </main>
      <div>
        <ServicesSection servicesRef={servicesRef} />
        <div className="flex gap-4">
          <div className="w-1/3 flex items-center justify-center relative">
            <div className="absolute m-4 w-[80%] h-[70%] rounded-3xl bg-primary-orange-500 clip-triangle"></div>
            <p className="relative z-10 text-3xl -top-14 -left-10 -rotate-[51deg] xl:text-4xl xl:-top-12 xl:-left-20 xl:-rotate-[38deg] py-4 border-y-2 border-y-slate-800  text-wrap font-semibold ">
              Nuestros Precios
            </p>
          </div>
          <div className="w-2/3 flex justify-around items-stretch my-10">
            <PriceSection
              title="Estandar"
              description={['Servicio 1.', 'Servicio 2.']}
              price="AR$20000"
            />
            <PriceSection
              title="Premium"
              description={[
                'Servicio 1.',
                'Servicio 2.',
                'Servicio 3.',
                'Servicio 4.'
              ]}
              price="AR$30000"
            />
            <PriceSection
              title="Full"
              description={[
                'Servicio 1.',
                'Servicio 2.',
                'Servicio 3.',
                'Servicio 4.',
                'Servicio 5.'
              ]}
              price="AR$40000"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
