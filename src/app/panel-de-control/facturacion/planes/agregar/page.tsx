import { Metadata } from 'next'

import { initialData } from '@/components/types/Plan'
import PlanForm from '@/components/dashboard/plans/PlanForm'

export const metadata: Metadata = {
  title: 'PentaFit - Agregar plan'
}

export default function AddPlanPage() {
  return (
    <div className="m-10">
      <PlanForm type="add" plan={initialData} />
    </div>
  )
}
