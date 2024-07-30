'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import useDiaries from 'components/hooks/useDiaries'
import { initialData, PropsAddDiary } from 'components/types/Diary'
import DiaryForm from './DiaryForm'
import useUser from 'components/hooks/useUser'

export default function EditDiary() {
  const pathname = usePathname()
  const [diary, setDiary] = useState<PropsAddDiary>(initialData)
  const id = pathname.split('/')[4]
  const { getDiaryById } = useDiaries()
  const { token, getWorkingBusiness, workingBusiness } = useUser()

  useEffect(() => {
    if (token && !workingBusiness) {
      getWorkingBusiness()
    }
  }, [token, workingBusiness])

  useEffect(() => {
    async function fetchDiary() {
      if (workingBusiness) {
        const d = await getDiaryById({
          id,
          business_id: workingBusiness.id
        })
        console.log(d)
        if (d) {
          setDiary({
            ...diary,
            id: d.id ? d.id : null,
            activity: d.activity ? d.activity : initialData.activity,
            name: d.name ? d.name : '',
            type_schedule: d.type_schedule ? d.type_schedule : '',
            date_from: new Date(d.date_from),
            date_until: new Date(d.date_until),
            days_available: d.days_available
              ? d.days_available
              : Array(7).fill({
                  active: false,
                  time_start: '',
                  time_end: ''
                }),
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
