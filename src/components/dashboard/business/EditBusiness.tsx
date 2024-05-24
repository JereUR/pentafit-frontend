'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { PropsAddBusiness } from '@/components/types/Business'
import BusinessForm from './BusinessForm'
import useUser from '@/components/hooks/useUser'
import Business404 from './Business404'

export default function EditBusiness() {
  const pathname = usePathname()
  const [business, setBusiness] = useState<PropsAddBusiness | null>(null)
  const id = pathname.split('/')[4]
  const { getBusinessById } = useUser()

  useEffect(() => {
    async function fetchBusiness() {
      const bus = await getBusinessById(id)
      console.log(bus)
      if (bus) {
        setBusiness({
          name: bus.name,
          description: bus.description,
          email: bus.email,
          address: bus.address,
          phone: bus.phone,
          instagram: bus.instagram,
          facebook: bus.facebook,
          logoUrl: bus.logo ? bus.logo : '',
          logo: null,
          title: bus.metadata?.title ? bus.metadata.title : '',
          primary_color: bus.metadata?.primary_color
            ? bus.metadata.primary_color
            : '',
          secondary_color: bus.metadata?.secondary_color
            ? bus.metadata.secondary_color
            : '',
          third_color: bus.metadata?.third_color
            ? bus.metadata.third_color
            : '',
          slogan: bus.metadata?.slogan ? bus.metadata.slogan : ''
        })
      }
    }

    fetchBusiness()
  }, [id])

  return (
    <div className="m-10">
      {business ? (
        <BusinessForm type="edit" business={business} />
      ) : (
        <Business404 id={id} />
      )}
    </div>
  )
}
