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
          business:
            businesses.find((bus) => bus.id === act.id_business) || null,
          activity: act.activity,
          cost: act.cost.toString(),
          isPublic: act.isPublic ? 'true' : 'false',
          quotaGeneration: act.quotaGeneration ? 'true' : 'false',
          mpAvailable: act.mpAvailable ? 'true' : 'false',
          publicName: act.publicName,
          sessionMax: act.sessionMax.toString(),
          dateFrom: act.dateFrom.toLocaleString(),
          dateUntil: act.dateUntil.toLocaleString(),
          paymentType: act.paymentType
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
