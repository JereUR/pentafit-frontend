import { Skeleton } from '@/components/ui/skeleton'

const BusinessSkeleton = (props: any) => (
  <div className="flex flex-col gap-10 mt-10">
    <div className="flex justify-around">
      <Skeleton className="h-32 w-60 rounded-lg" />
      <Skeleton className="h-32 w-60 rounded-lg" />
      <Skeleton className="h-32 w-60 rounded-lg" />
    </div>
    <div className="flex justify-between p-6 mx-10 border rounded-md">
      <div className="flex ml-10">
        <Skeleton className="h-44 w-44 mt-3 rounded-full" />
        <div className="ml-10 mt-4">
          <div className="flex flex-col gap-4">
            <Skeleton className="h-8 w-48 xl:w-72 rounded-lg" />
            <Skeleton className="h-5 w-64 xl:w-96 rounded-lg" />
            <Skeleton className="h-5 w-32 xl:w-52 rounded-lg" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 xl:mr-24">
        <Skeleton className="h-10 w-48 rounded-lg" />
        <Skeleton className="h-10 w-48 rounded-lg" />
        <Skeleton className="h-10 w-48 rounded-lg" />
        <Skeleton className="h-10 w-48 rounded-lg" />
      </div>
    </div>
    <div className="flex justify-between p-6 mx-10 border rounded-md">
      <div className="flex ml-10">
        <Skeleton className="h-44 w-44 mt-3 rounded-full" />
        <div className="ml-10 mt-4">
          <div className="flex flex-col gap-4">
            <Skeleton className="h-8 w-48 xl:w-72 rounded-lg" />
            <Skeleton className="h-5 w-64 xl:w-96 rounded-lg" />
            <Skeleton className="h-5 w-32 xl:w-52 rounded-lg" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 xl:mr-24">
        <Skeleton className="h-10 w-48 rounded-lg" />
        <Skeleton className="h-10 w-48 rounded-lg" />
        <Skeleton className="h-10 w-48 rounded-lg" />
        <Skeleton className="h-10 w-48 rounded-lg" />
      </div>
    </div>
    <div className="flex justify-between p-6 mx-10 border rounded-md">
      <div className="flex ml-8">
        <Skeleton className="h-44 w-44 mt-3 rounded-full" />
        <div className="ml-10 mt-4">
          <div className="flex flex-col gap-4">
            <Skeleton className="h-8 w-48 xl:w-72 rounded-lg" />
            <Skeleton className="h-5 w-64 xl:w-96 rounded-lg" />
            <Skeleton className="h-5 w-32 xl:w-52 rounded-lg" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 xl:mr-24">
        <Skeleton className="h-10 w-48 rounded-lg" />
        <Skeleton className="h-10 w-48 rounded-lg" />
        <Skeleton className="h-10 w-48 rounded-lg" />
        <Skeleton className="h-10 w-48 rounded-lg" />
      </div>
    </div>
  </div>
)

export default BusinessSkeleton
