'use client'

import useActivities from '@/components/hooks/useActivities'
import { initialData, PropsAddActivity } from '@/components/types/Activity'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import ActivityForm from './ActivityForm'

export default function EditActivity() {
  const pathname = usePathname()
  const [activity, setActivity] = useState<PropsAddActivity>(initialData)
  const id = pathname.split('/')[4]
  const { getActivityById } = useActivities()

  useEffect(() => {
    async function fetchActivity() {
      const act = await getActivityById(id)
      if (act) {
        setActivity({
          id_business: act.id_business.map((c) => c.id),
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

    fetchActivity()
  }, [id])

  return (
    <div className="m-10">
      <ActivityForm type="edit" activity={activity} />
    </div>
  )
}
