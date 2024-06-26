import { Skeleton } from 'components/ui/skeleton'

const DiariesSkeleton = (props: any) => (
  <div className="flex flex-col gap-10 m-10">
    <div className="flex justify-between mx-10">
      <Skeleton className="h-48 w-[22vw] rounded-lg" />
      <Skeleton className="h-32 w-64 rounded-lg mr-10" />
    </div>
    <div className="flex justify-between mx-10">
      <div className="flex gap-2">
        <Skeleton className="h-[4vh] w-56 rounded-lg" />
        <Skeleton className="h-[3vh] w-32 rounded-lg" />
        <Skeleton className="h-[3vh] w-32 rounded-lg" />
      </div>
      <div>
        <Skeleton className="h-[4vh] w-40 rounded-lg" />
      </div>
    </div>
    <div className="flex flex-col justify-center pt-[6vh] mx-10 border">
      <Skeleton className="h-[6vh] w-full mt-1 rounded-none" />
      <Skeleton className="h-[6vh] w-full mt-1 rounded-none" />
      <Skeleton className="h-[6vh] w-full mt-1 rounded-none" />
      <Skeleton className="h-[6vh] w-full mt-1 rounded-none" />
      <Skeleton className="h-[6vh] w-full mt-1 rounded-none" />
    </div>
    <div className="flex justify-between mx-10 -mt-5">
      <Skeleton className="h-[3vh] w-20 rounded-lg" />
      <Skeleton className="h-[3vh] w-20 rounded-lg" />
    </div>
  </div>
)

export default DiariesSkeleton
