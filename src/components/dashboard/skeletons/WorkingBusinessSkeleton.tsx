import { Skeleton } from 'components/ui/skeleton'

const WorkingBusinessSkeleton = (props: any) => (
  <div className="flex justify-between mb-6">
    <Skeleton className="h-48 w-[22vw] rounded-lg" />
  </div>
)

export default WorkingBusinessSkeleton
