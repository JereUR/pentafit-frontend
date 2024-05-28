'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

import useUser from '@/components/hooks/useUser'
import { Card } from '@/components/ui/card'
import noImage from '@public/assets/no-image.png'
import { Button } from '@/components/ui/button'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'

const RightBar = () => {
  const [showMenu, setShowMenu] = useState(false)
  const { token, businesses, getBusinesses, updateWorkingBusiness } = useUser()
  const workingBusiness = businesses.filter((bus) => bus.is_working)
  const otherBusinesses = businesses.filter(
    (bus) => bus.is_active && !bus.is_working
  )

  useEffect(() => {
    if (token) {
      getBusinesses()
    }
  }, [token])

  async function handleChangeWorkingBusiness(id: number) {
    const res = await updateWorkingBusiness(id)

    if (res) {
      window.location.reload()
    }
  }

  return (
    <div className="fixed w-[330px] m-4">
      <Card className="relative flex flex-col gap-4 bg-gradient-to-t from-bg-background to-bg-card p-4 rounded-lg shadow-md duration-300 ease-in-out">
        <p className="m-2 text-xl font-extralight">Area de trabajo actual:</p>
        <div className="flex justify-center">
          <Image
            src={workingBusiness[0].logo ? workingBusiness[0].logo : noImage}
            alt="Card Image"
            width={150}
            height={150}
            className="w-[150px] h-[150px] border-2 border-primary-orange-600 rounded-full p-2 dark:ring-primary-orange-400"
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold">{workingBusiness[0].name}</h2>
          <p className="text-gray-600">{workingBusiness[0].description}</p>
          <div className="flex flex-col justify-center w-full items-center mt-4">
            <Button
              className="flex gap-2 items-center font-semibold transition duration-300 ease-in-out bg-primary-orange-700 hover:bg-primary-orange-600"
              onClick={() => setShowMenu(!showMenu)}
            >
              Cambiar Area de Trabajo
              {showMenu ? (
                <MdExpandLess className="h-6 w-6" />
              ) : (
                <MdExpandMore className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </Card>
      {showMenu && (
        <div className="absolute -bottom-[12vh] left-[25px] w-[280px] flex flex-col justify-start gap-2 p-3 bg-card shadow-md rounded-md border-2 border-primary-orange-600">
          <div className="flex flex-col gap-4">
            {otherBusinesses.map((business) => (
              <div
                key={business.id}
                className="p-1 flex items-center rounded-r-full transition duration-300 ease-in-out hover:bg-primary-orange-600 text-sm cursor-pointer"
                onClick={() => handleChangeWorkingBusiness(business.id)}
              >
                <div className="flex justify-start items-center gap-2">
                  <Image
                    src={business.logo ? business.logo : noImage}
                    alt="Card Image"
                    width={35}
                    height={35}
                    className="w-[35px] h-[35px] rounded-full"
                  />
                  <p className="text-sm font-semibold">{business.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default RightBar
