'use client'

import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import useUser from '@/components/hooks/useUser'
import { Business } from '@/components/types/Business'
import noImage from '@public/assets/no-image.png'
import usePlans from '@/components/hooks/usePlans'
import Loader from '@/components/Loader'

interface Props {
  selectedPlans: number[]
  setSelectedPlans: Dispatch<SetStateAction<number[]>>
}

const SelectedPlansActions: React.FC<Props> = ({
  selectedPlans,
  setSelectedPlans
}) => {
  const [showConfirmMultipleDelete, setShowConfirmMultipleDelete] =
    useState<boolean>(false)
  const [showConfirmAddToBusinesses, setShowConfirmAddToBusinesses] =
    useState<boolean>(false)
  const [otherBusinesses, setOtherBusinesses] = useState<Business[] | []>([])
  const [businessesToAdd, setBusinessesToAdd] = useState<number[]>([])
  const [addIsOpen, setAddIsOpen] = useState<boolean>(false)
  const { businesses } = useUser()
  const { deletePlansById, addPlansToBusinesses, loading } = usePlans()

  useEffect(() => {
    if (businesses.length > 0) {
      const otherBusinesses = businesses.filter(
        (business) => !business.is_working
      )
      setOtherBusinesses(otherBusinesses)
    }
  }, [businesses])

  const handleConfirmMultipleDelete = () => {
    setShowConfirmMultipleDelete(true)
  }

  const handleCancelMultipleDelete = () => {
    setShowConfirmMultipleDelete(false)
  }

  const handleButtonClick = () => {
    setAddIsOpen(!addIsOpen)
  }

  const handleCloseMenu = () => {
    setAddIsOpen(false)
    setShowConfirmAddToBusinesses(true)
  }

  const handleMenuClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
  }

  const handleCancelAddToBusinesses = () => {
    setShowConfirmAddToBusinesses(false)
  }

  const handleChange = (id: number) => {
    if (businessesToAdd.includes(id)) {
      setBusinessesToAdd(
        businessesToAdd.filter((businessId) => businessId !== id)
      )
    } else {
      setBusinessesToAdd([...businessesToAdd, id])
    }
  }

  const handleDelete = async () => {
    const res = await deletePlansById(selectedPlans)

    if (res) {
      setShowConfirmMultipleDelete(false)
      setSelectedPlans([])
      window.location.reload()
    }
  }

  const handleAdd = async () => {
    const res = await addPlansToBusinesses({
      plans: selectedPlans,
      businesses: businessesToAdd
    })

    if (res) {
      setSelectedPlans([])
      setShowConfirmAddToBusinesses(false)
      setBusinessesToAdd([])
    }
  }

  return (
    <div className="flex gap-4">
      <div>
        <div className="relative">
          <Button
            variant="outline"
            className="flex h-10 text-foreground font-semibold items-center gap-2 border-none bg-green-600 transition duration-300 ease-in-out hover:bg-green-700"
            onClick={handleButtonClick}
          >
            ({selectedPlans.length}) Agregar a
            {addIsOpen ? <MdExpandLess /> : <MdExpandMore />}
          </Button>
          {addIsOpen && (
            <div
              onClick={() => setAddIsOpen(false)}
              className="absolute w-[20vw] xl:w-[15vw] bg-card mt-3 mr-5 rounded shadow-lg"
            >
              <div className="p-4" onClick={handleMenuClick}>
                <p className="text-lg font-medium text-foreground">
                  Negocios a agregar
                </p>
                <hr className="my-2 border-gray-200 dark:border-gray-500" />
                {otherBusinesses.length > 0 ? (
                  otherBusinesses.map((business) => (
                    <label
                      key={business.id}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="mr-2 cursor-pointer"
                        checked={businessesToAdd.includes(business.id)}
                        onChange={() => handleChange(business.id)}
                      />
                      <span className="flex gap-2 text-sm ml-2 mr-4 my-1 p-1 w-full rounded-r-full transition duration-500 ease-in-out hover:bg-primary-orange-600">
                        <Image
                          src={business.logo ? business.logo : noImage}
                          alt={`${business?.name} logo`}
                          width={20}
                          height={20}
                          className="rounded-full"
                        />
                        {business.name}
                      </span>
                    </label>
                  ))
                ) : (
                  <div>No hay negocios</div>
                )}

                <hr className="my-2 border-gray-200 dark:border-gray-500" />
                <div className="flex justify-center">
                  <Button
                    className="font-semibold text-foreground bg-background transition duration-300 ease-in-out hover:bg-accent w-full mx-4 mb-1 mt-2 p-1"
                    onClick={handleCloseMenu}
                  >
                    Confirmar
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
        {showConfirmAddToBusinesses && (
          <div className="fixed top-0 left-0 w-full h-full bg-black/30 z-50 flex justify-center items-center">
            <div className="flex flex-col gap-4 justify-center items-center bg-background border border-primary-orange-600 p-8 rounded-lg shadow-md">
              <p>
                {`Agregar las ${selectedPlans.length} actividades seleccionadas a los siguientes negocios: `}
              </p>
              <ul className="flex flex-col justify-start items-start">
                {businessesToAdd.map((item) => {
                  const business = businesses.find((bus) => bus.id === item)
                  return (
                    <li
                      key={business?.id}
                      className="flex items-center gap-2 m-2"
                    >
                      <Image
                        src={business?.logo ? business.logo : noImage}
                        alt={`${business?.name} logo`}
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                      {business?.name}
                    </li>
                  )
                })}
              </ul>
              <div className="flex justify-end gap-2">
                <Button
                  variant="secondary"
                  onClick={handleCancelAddToBusinesses}
                >
                  Cancelar
                </Button>
                <Button onClick={handleAdd}>
                  {loading ? (
                    <Loader className="mt-[1.8vh] ml-[1vw]" />
                  ) : (
                    'Confirmar'
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
        <Button
          className="flex items-center text-foreground font-semibold gap-2 py-2 px-4 h-10 rounded-lg border-none bg-red-600 transition duration-300 ease-in-out hover:bg-red-700"
          onClick={handleConfirmMultipleDelete}
        >
          ({selectedPlans.length}) <FaTrash />
        </Button>
        {showConfirmMultipleDelete && (
          <div className="fixed top-0 left-0 w-full h-full bg-black/30 z-50 flex justify-center items-center">
            <div className="flex flex-col gap-4 justify-center items-center bg-background border border-primary-orange-600 p-8 rounded-lg shadow-md">
              <p>
                {`¿Está seguro de que desea eliminar las ${selectedPlans.length} actividades seleccionadas?`}
              </p>
              <div className="flex justify-end gap-2">
                <Button
                  variant="secondary"
                  onClick={handleCancelMultipleDelete}
                >
                  Cancelar
                </Button>
                <Button onClick={handleDelete}>
                  {loading ? (
                    <Loader className="mt-[1.8vh] ml-[1vw]" />
                  ) : (
                    'Confirmar'
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SelectedPlansActions
