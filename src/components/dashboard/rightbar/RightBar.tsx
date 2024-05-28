'use client'

import { useEffect } from 'react'
import { MdPlayCircleFilled } from 'react-icons/md'

import useUser from '@/components/hooks/useUser'
import { Card } from '@/components/ui/card'

const RightBar = () => {
  const { token, businesses, getBusinesses } = useUser()

  useEffect(() => {
    if (token) {
      getBusinesses()
    }
  }, [token])

  console.log(businesses)

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
          <select>
            <option value="">Company 1</option>
            <option value="">Company 2</option>
            <option value="">Company 3</option>
            <option value="">Company 4</option>
            <option value="">Company 5</option>
          </select>
          <button className="p-2 flex items-center gap-2 bg-primary-orange-600 text-foregroundborder-none rounded-md cursor-pointer w-max">
            <MdPlayCircleFilled />
            Watch
          </button>
        </div>
      </Card>
    </div>
  )
}

export default RightBar
