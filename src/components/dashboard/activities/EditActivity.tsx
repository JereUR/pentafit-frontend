'use client'

import useActivities from '@/components/hooks/useActivities'
import { initialData, PropsAddActivity } from '@/components/types/Activity'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import ActivityForm from './ActivityForm'
import useUser from '@/components/hooks/useUser'

export default function EditActivity() {
  const pathname = usePathname()
  const [activity, setActivity] = useState<PropsAddActivity>(initialData)
  const [workingBusiness, setWorkingBusiness] = useState(null)
  const id = pathname.split('/')[4]
  const { getActivityById } = useActivities()
  const { token, businesses, getBusinesses } = useUser()

  useEffect(() => {
    async function fetchActivity() {
      const act = await getActivityById(id)
      if (act) {
        setActivity({
          business: businesses.find((bus) => bus.id === act.company_id) || null,
          name: act.name,
          price: act.price.toString(),
          is_public: act.is_public ? 'true' : 'false',
          generate_invoice: act.generate_invoice ? 'true' : 'false',
          mp_available: act.mp_available ? 'true' : 'false',
          public_name: act.public_name,
          max_sessions: act.max_sessions.toString(),
          start_date: act.start_date,
          end_date: act.end_date,
          payment_type: act.payment_type
        })
      }
    }
    if (token) {
      getBusinesses()
      fetchActivity()
    }
  }, [id, token])

  return (
    <div className="m-10">
      <ActivityForm type="edit" activity={activity} />
    </div>
  )
}
