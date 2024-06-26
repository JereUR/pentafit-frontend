'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import useDiaries from 'components/hooks/useDiaries'
import { initialData, PropsAddDiary } from 'components/types/Diary'
import DiaryForm from './DiaryForm'
import useUser from 'components/hooks/useUser'
import { Business } from 'components/types/Business'

export default function EditDiary() {
  const pathname = usePathname()
  const [diary, setDiary] = useState<PropsAddDiary>(initialData)
  const [workingBusiness, setWorkingBusiness] = useState<Business | null>(null)
  const id = pathname.split('/')[4]
  const { getDiaryById } = useDiaries()
  const { token, getWorkingBusiness } = useUser()

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
    async function fetchDiary() {
      if (workingBusiness) {
        const d = await getDiaryById({
          id,
          business_id: workingBusiness.id
        })
        if (d) {
          setDiary({
            id: d.id ? d.id : null,
            activity: d.activity ? d.activity : initialData.activity,
            type_schedule: d.type_schedule ? d.type_schedule : '',
            date_from: new Date(d.date_from),
            date_until: new Date(d.date_until),
            time_from: d.time_from ? d.time_from : '',
            time_until: d.time_until ? d.time_until : '',
            days_available: d.days_available
              ? d.days_available
              : Array(7).fill(false),
            repeat_for: d.repeat_for ? d.repeat_for : 0,
            offer_days: d.offer_days ? d.offer_days : Array(7).fill(false),
            term_duration: d.term_duration ? d.term_duration : 0,
            amount_of_people: d.amount_of_people ? d.amount_of_people : 0,
            is_active: d.is_active ? 'true' : 'false',
            genre_exclusive: d.genre_exclusive ? d.genre_exclusive : 'No',
            works_holidays: d.works_holidays ? 'true' : 'false',
            observations: d.observations ? d.observations : ''
          })
        }
      }
    }

    if (token && workingBusiness) {
      fetchDiary()
    }
  }, [id, token, workingBusiness])

  return (
    <div className="m-10">
      <DiaryForm type="edit" diary={diary} />
    </div>
  )
}
