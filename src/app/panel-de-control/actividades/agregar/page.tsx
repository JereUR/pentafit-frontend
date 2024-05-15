import ActivityForm from '@/components/dashboard/activities/ActivityForm'
import { initialData } from '@/components/types/Activity'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PentaFit - Agregar actividad'
}

export default function AddActivityPage() {
  return (
    <div className="m-10">
      <ActivityForm type="add" activity={initialData}/>
    </div>
  )
}
