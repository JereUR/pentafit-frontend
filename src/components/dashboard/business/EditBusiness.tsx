'use client'

import { initialData, PropsAddBusiness } from '@/components/types/Business'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import BusinessForm from './BusinessForm'
import useUser from '@/components/hooks/useUser'

export default function EditBusiness() {
  const pathname = usePathname()
  const [business, setBusiness] = useState<PropsAddBusiness>(initialData)
  const id = pathname.split('/')[4]
  const { getBusinessById } = useUser()

  useEffect(() => {
    async function fetchBusiness() {
      const bus = await getBusinessById(id)
      console.log(bus);
      if (bus) {
        setBusiness({
          name: bus.name,
          description: bus.description,
          email: bus.email,
          address: bus.address,
          phone: bus.phone,
          instagram: bus.instagram,
          facebook: bus.facebook,
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
      <BusinessForm type="edit" business={business} />
    </div>
  )
}
