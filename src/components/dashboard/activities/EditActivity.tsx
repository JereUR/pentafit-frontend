'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import useActivities from '@/components/hooks/useActivities'
import { initialData, PropsAddActivity } from '@/components/types/Activity'
import ActivityForm from './ActivityForm'
import useUser from '@/components/hooks/useUser'
import { Business } from '@/components/types/Business'

export default function EditActivity() {
  const pathname = usePathname()
  const [activity, setActivity] = useState<PropsAddActivity>(initialData)
  const [workingBusiness, setWorkingBusiness] = useState<Business | null>(null)
  const id = pathname.split('/')[4]
  const { getActivityById } = useActivities()
  const { token, businesses, getBusinesses, getWorkingBusiness } = useUser()

  useEffect(() => {
    async function getData() {
      const res = await getWorkingBusiness()
      if (res) {
        setWorkingBusiness(res)
      }
    }
    if (token) {
      getData()
    }
  }, [token])

  useEffect(() => {
    async function fetchActivity() {
      if (workingBusiness) {
        const act = await getActivityById(id, workingBusiness?.id)
        if (act) {
          setActivity({
            name: act.name,
            price: act.price.toString(),
            is_public: act.is_public ? 'true' : 'false',
            generate_invoice: act.generate_invoice ? 'true' : 'false',
            mp_available: act.mp_available ? 'true' : 'false',
            public_name: act.public_name,
            max_sessions: act.max_sessions.toString(),
            start_date: new Date(act.start_date),
            end_date: new Date(act.end_date),
            payment_type: act.payment_type,
            activity_type: act.activity_type
          })
        }
      }
    }
    if (token && workingBusiness) {
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
