'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'
import { useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@radix-ui/react-dropdown-menu'

import useUser from '@/components/hooks/useUser'
import { Card } from '@/components/ui/card'
import noImage from '@public/assets/no-image.png'
import { Button } from '@/components/ui/button'
import { Business } from '@/components/types/Business'
import RightBarSkeleton from './RightBarSkeleton'

const RightBar = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [workingBusines, setWorkingBusines] = useState<
    Business | undefined | null
  >(null)
  const [otherBusinesses, setOtherBusinesses] = useState<Business[] | []>([])
  const {
    token,
    businesses,
    getBusinesses,
    updateWorkingBusiness,
    loadingBusiness
  } = useUser()
  const router = useRouter()
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL

  useEffect(() => {
    if (token) {
      getBusinesses()
    }
  }, [token])

  useEffect(() => {
    if (businesses) {
      if (businesses.length > 0) {
        const newWorkingBusines = businesses.find((bus) => bus.is_working)
        const newOthersBusinesses = businesses.filter(
          (bus) => bus.is_active && !bus.is_working
        )
        if (newWorkingBusines) {
          setWorkingBusines(newWorkingBusines)
        }
        if (newOthersBusinesses) {
          setOtherBusinesses(newOthersBusinesses)
        }
      }
    }
  }, [businesses])

  async function handleChangeWorkingBusiness(id: number) {
    const res = await updateWorkingBusiness(id)

    if (res) {
      window.location.reload()
    }
  }

  return (
    <div className="fixed w-[250px] xl:w-[330px] m-5">
      {loadingBusiness ? (
        <RightBarSkeleton />
      ) : (
        <Card className="relative flex flex-col gap-6 bg-gradient-to-t from-bg-background to-bg-card p-4 rounded-lg border-none shadow-md duration-300 ease-in-out">
          <div>
            {workingBusines ? (
              <>
                <p className="m-2 text-xl font-extralight">
                  Area de trabajo actual:
                </p>
                <div className="flex justify-center">
                  <Image
                    src={
                      workingBusines.logo
                        ? `${BASE_URL}${workingBusines.logo}`
                        : noImage
                    }
                    alt="Card Image"
                    width={150}
                    height={150}
                    className="w-[150px] h-[150px] border-2 border-primary-orange-600 rounded-full p-2 dark:ring-primary-orange-400"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold">
                    {workingBusines.name}
                  </h2>
                  <p className="text-gray-600">{workingBusines.description}</p>
                  {otherBusinesses.length > 0 ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger className="relative">
                        <div className="xl:w-full flex justify-center items-center mt-4">
                          <Button className="flex w-[180px] text-xs xl:w-full xl:text-base gap-2 items-center font-semibold transition duration-300 ease-in-out bg-primary-orange-700 hover:bg-primary-orange-600 cursor-pointer">
                            Cambiar Area de Trabajo
                            {showMenu ? (
                              <MdExpandLess className="h-6 w-6" />
                            ) : (
                              <MdExpandMore className="h-6 w-6" />
                            )}
                          </Button>
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="center"
                        className="mt-5 w-[220px] xl:w-[280px] flex flex-col justify-center gap-2 p-3 bg-card shadow-md rounded-lg border border-primary-orange-600"
                      >
                        {otherBusinesses.map((item: Business, key: number) => (
                          <DropdownMenuItem
                            key={key}
                            className="p-1 px-4 cursor-pointer rounded-r-full transition flex items-start hover:bg-primary-orange-500"
                            onClick={() => handleChangeWorkingBusiness(item.id)}
                          >
                            <div className="flex justify-start items-center gap-2">
                              <Image
                                src={
                                  item.logo
                                    ? `${BASE_URL}${item.logo}`
                                    : noImage
                                }
                                alt="Card Image"
                                width={35}
                                height={35}
                                className="w-[35px] h-[35px] rounded-full"
                              />
                              <p className="text-sm font-semibold">
                                {item.name}
                              </p>
                            </div>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <div className="flex flex-col justify-center w-full items-center mt-4">
                      <span>No existen otros negocios activos</span>
                      <Button
                        className="flex gap-2 items-center font-semibold transition duration-300 ease-in-out bg-primary-orange-700 hover:bg-primary-orange-600"
                        onClick={() =>
                          router.push('/panel-de-control/negocios')
                        }
                      >
                        Ir a sección Negocios
                      </Button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div>
                <span>Area de Trabajo no asignada</span>
                <div className="flex flex-col justify-center w-full items-center mt-4">
                  <Button
                    className="flex gap-2 items-center font-semibold transition duration-300 ease-in-out bg-primary-orange-700 hover:bg-primary-orange-600"
                    onClick={() => router.push('/panel-de-control/negocios')}
                  >
                    Ir a sección Negocios
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* {showMenu && (
          <div className="mx-auto -mt-3 w-[280px] flex flex-col justify-center gap-2 p-3 bg-card shadow-md rounded-lg border-2 border-primary-orange-600">
            <div className="flex flex-col gap-4">
              {otherBusinesses.map((business) => (
                <div
                  key={business.id}
                  className="p-1 flex items-center rounded-r-full transition duration-300 ease-in-out hover:bg-primary-orange-600 text-sm cursor-pointer"
                  onClick={() => handleChangeWorkingBusiness(business.id)}
                >
                  <div className="flex justify-start items-center gap-2">
                    <Image
                      src={
                        business.logo ? `${BASE_URL}${business.logo}` : noImage
                      }
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
        )} */}
        </Card>
      )}
    </div>
  )
}

export default RightBar
