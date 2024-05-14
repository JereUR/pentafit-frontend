'use client'

import ActivityForm from '@/components/dashboard/activities/ActivityForm'
import useActivities from '@/components/hooks/useActivities'
import { initialData, PropsAdd } from '@/components/types/Activity'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function EditPage() {
  const pathname = usePathname()
  const router = useRouter()
  const [activity, setActivity] = useState<PropsAdd>(initialData)
  const id = pathname.split('/')[4]
  const { getActivityById, updateActivity } = useActivities()

  useEffect(() => {
    async function fetchActivity() {
      const act = await getActivityById(id)
      if (act) {
        setActivity({
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
