'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import usePlans from 'components/hooks/usePlans'
import { initialData, PropsAddPlan } from 'components/types/Plan'
import PlanForm from './PlanForm'
import useUser from 'components/hooks/useUser'
import { Business } from 'components/types/Business'

export default function EditPlan() {
  const pathname = usePathname()
  const [plan, setPlan] = useState<PropsAddPlan>(initialData)
  const [workingBusiness, setWorkingBusiness] = useState<Business | null>(null)
  const id = pathname.split('/')[5]
  const { getPlanById } = usePlans()
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
    async function fetchPlan() {
      if (workingBusiness) {
        const p = await getPlanById({ id, business_id: workingBusiness.id })
        console.log(p)
        if (p) {
          setPlan({
            id: p.id ? p.id : null,
            name: p.name ? p.name : '',
            description: p.description ? p.description : '',
            price: p.price ? p.price.toString() : '',
            start_date: new Date(p.start_date),
            end_date: new Date(p.end_date),
            expiration_period: p.expiration_period
              ? p.expiration_period.toString()
              : '',
            generate_invoice: p.generate_invoice ? 'true' : 'false',
            payment_type: p.payment_type ? p.payment_type : [],
            plan_type: p.plan_type ? p.plan_type : '',
            free_test: p.free_test ? 'true' : 'false',
            current: p.current ? 'true' : 'false',
            diaries: p.diaries ? p.diaries : []
          })
        }
      }
    }

    if (token && workingBusiness) {
      fetchPlan()
    }
  }, [id, token, workingBusiness])

  return (
    <div className="m-10">
      <PlanForm type="edit" plan={plan} />
    </div>
  )
}
