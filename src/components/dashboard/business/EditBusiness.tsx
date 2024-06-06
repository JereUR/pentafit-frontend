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
  const { getBusinessById, token } = useUser()
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL

  useEffect(() => {
    async function fetchBusiness() {
      const bus = await getBusinessById(id)
      if (bus) {
        setBusiness({
          id: bus.id,
          name: bus.name ? bus.name : '',
          description: bus.description ? bus.description : '',
          email: bus.email ? bus.email : '',
          address: bus.address ? bus.address : '',
          phone: bus.phone ? bus.phone : '',
          instagram: bus.instagram ? bus.instagram : '',

          facebook: bus.facebook ? bus.facebook : '',

          logoUrl: bus.logo ? `${BASE_URL}${bus.logo}` : '',
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
          slogan: bus.metadata?.slogan ? bus.metadata.slogan : '',
          logoWebUrl: bus.metadata?.logoWeb
            ? `${BASE_URL}${bus?.metadata.logoWeb}`
            : '',
          logoWeb: null
        })
      }
    }
    if (token) {
      fetchBusiness()
    }
  }, [id, token])

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
