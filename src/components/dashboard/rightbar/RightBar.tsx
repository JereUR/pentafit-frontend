"use client"
import useUser from '@/components/hooks/useUser'
import { Business } from '@/components/types/Business'
import { Card } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { MdPlayCircleFilled, MdReadMore } from 'react-icons/md'

const RightBar = () => {
  const [workingBusiness, setWorkingBusiness] = useState<Business | null>(null)
  const { getWorkingBusiness, token } = useUser()

  useEffect(() => {
    async function getWorkingBusinessData() {
      const business = await getWorkingBusiness()
      setWorkingBusiness(business)
    }

    if (token) {
      getWorkingBusinessData()
    }
  }, [token])

  console.log(workingBusiness)

  return (
    <div className="fixed mr-1">
      <Card className="relative bg-gradient-to-t from-bg-background to-bg-card py-5 px-6 rounded-lg mb-5 border-none shadow-md">
        <div className="flex flex-col gap-6">
          <span className="font-bold">🔥 Available Now</span>
          <h3 className="font-medium text-xs text-foreground opacity-80">
            How to use the new version of the admin dashboard?
          </h3>
          <span className="subttitle">Takes 4 minutes to learn</span>
          <p className="desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            illum laborum, alias obcaecati, dolorum iusto labore voluptatum
            quidem eos, aliquam maiores necessitatibus tempore rem quisquam.
          </p>
          <button className="p-2 flex items-center gap-2 bg-primary-orange-600 text-foregroundborder-none rounded-md cursor-pointer w-max">
            <MdPlayCircleFilled />
            Watch
          </button>
        </div>
      </Card>
      <Card className="relative bg-gradient-to-t from-bg-background to-bg-card py-5 px-6 rounded-lg mb-5 border-none shadow-md">
        <div className="flex flex-col gap-6">
          <span className="font-bold">🚀 Coming Soon</span>
          <h3 className="font-medium text-xs text-foreground opacity-80">
            New server actions are available, partial pre-rendering is coming
            up!
          </h3>
          <span className="subtitle">Boost your productivity</span>
          <p className="desc">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores
            sunt corrupti similique, voluptatem, et quo maiores voluptates sed,
            ratione ipsam nobis. Ipsam voluptatem aliquid esse soluta ex?
          </p>
          <button className="p-2 flex items-center gap-2 bg-primary-orange-600 text-foreground border-none rounded-md cursor-pointer w-max">
            <MdReadMore size={20} />
            Learn
          </button>
        </div>
      </Card>
    </div>
  )
}

export default RightBar
