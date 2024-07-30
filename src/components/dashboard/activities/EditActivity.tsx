'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import useActivities from 'components/hooks/useActivities'
import { initialData, PropsAddActivity } from 'components/types/Activity'
import ActivityForm from './ActivityForm'
import useUser from 'components/hooks/useUser'

export default function EditActivity() {
  const pathname = usePathname()
  const [activity, setActivity] = useState<PropsAddActivity>(initialData)
  const id = pathname.split('/')[4]
  const { getActivityById } = useActivities()
  const { token, getWorkingBusiness, workingBusiness } = useUser()

  useEffect(() => {
    if (token && !workingBusiness) {
      getWorkingBusiness()
    }
  }, [token, workingBusiness])

  useEffect(() => {
    async function fetchActivity() {
      if (workingBusiness) {
        const act = await getActivityById({
          id,
          business_id: workingBusiness.id
        })
        if (act) {
          setActivity({
            id: act.id ? act.id : null,
            name: act.name ? act.name : '',
            price: act.price ? act.price.toString() : '',
            description: act.description ? act.description : '',
            is_public: act.is_public ? 'true' : 'false',
            generate_invoice: act.generate_invoice ? 'true' : 'false',
            mp_available: act.mp_available ? 'true' : 'false',
            public_name: act.public_name ? act.public_name : '',
            max_sessions: act.max_sessions ? act.max_sessions.toString() : '',
            start_date: new Date(act.start_date),
            end_date: new Date(act.end_date),
            payment_type: act.payment_type ? act.payment_type : '',
            activity_type: act.activity_type ? act.activity_type : ''
          })
        }
      }
    }

    if (token && workingBusiness) {
      fetchActivity()
    }
  }, [id, token, workingBusiness])

  return (
    <div className="m-10">
      <ActivityForm type="edit" activity={activity} />
    </div>
  )
}
