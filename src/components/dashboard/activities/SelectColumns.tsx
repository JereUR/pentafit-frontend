import { FaTableCells } from 'react-icons/fa6'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'
import React, { Dispatch, SetStateAction, useState } from 'react'

import { Columns } from '@/components/types/Activity'
import { Button } from '@/components/ui/button'

interface Props {
  selectedColumns: Columns
  setSelectedColumns: Dispatch<SetStateAction<Columns>>
}

const SelectColumns: React.FC<Props> = ({
  selectedColumns,
  setSelectedColumns
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleChange = (name: string, value: boolean) => {
    setSelectedColumns({ ...selectedColumns, [name]: value })
  }

  const handleButtonClick = () => {
    setIsOpen(!isOpen)
  }

  const handleCloseMenu = () => {
    setIsOpen(false)
  }

  const handleMenuClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        className="flex items-center gap-2 bg-card "
        onClick={handleButtonClick}
      >
        <FaTableCells />
        Columnas
        {isOpen ? <MdExpandLess /> : <MdExpandMore />}
      </Button>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="absolute w-[20vw] xl:w-[15vw] bg-card mt-3 mr-5 rounded shadow-lg"
        >
          <div className="p-4" onClick={handleMenuClick}>
            <p className="text-lg font-medium text-foreground">
              Columnas a mostrar
            </p>
            <hr className="my-2 border-gray-200 dark:border-gray-500" />
            <label className="flex items-center cursor-pointer ">
              <input
                type="checkbox"
                className="mr-2 cursor-pointer"
                checked={selectedColumns.name}
                onChange={() => handleChange('name', !selectedColumns.name)}
              />
              <span className="text-sm ml-2 mr-4 my-1 p-1 w-full rounded-r-full transition duration-500 ease-in-out hover:bg-primary-orange-600">
                Nombre
              </span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="mr-2 cursor-pointer"
                checked={selectedColumns.price}
                onChange={() => handleChange('price', !selectedColumns.price)}
              />
              <span className="text-sm ml-2 mr-4 my-1 p-1 w-full rounded-r-full transition duration-500 ease-in-out hover:bg-primary-orange-600">
                Precio
              </span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="mr-2 cursor-pointer"
                checked={selectedColumns.is_public}
                onChange={() =>
                  handleChange('is_public', !selectedColumns.is_public)
                }
              />
              <span className="text-sm ml-2 mr-4 my-1 p-1 w-full rounded-r-full transition duration-500 ease-in-out hover:bg-primary-orange-600">
                Es pública?
              </span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="mr-2 cursor-pointer"
                checked={selectedColumns.generate_invoice}
                onChange={() =>
                  handleChange(
                    'generate_invoice',
                    !selectedColumns.generate_invoice
                  )
                }
              />
              <span className="text-sm ml-2 mr-4 my-1 p-1 w-full rounded-r-full transition duration-500 ease-in-out hover:bg-primary-orange-600">
                Generación de cuotas
              </span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="mr-2 cursor-pointer"
                checked={selectedColumns.max_sessions}
                onChange={() =>
                  handleChange('max_sessions', !selectedColumns.max_sessions)
                }
              />
              <span className="text-sm ml-2 mr-4 my-1 p-1 w-full rounded-r-full transition duration-500 ease-in-out hover:bg-primary-orange-600">
                Sesiones máximas
              </span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="mr-2 cursor-pointer"
                checked={selectedColumns.mp_available}
                onChange={() =>
                  handleChange('mp_available', !selectedColumns.mp_available)
                }
              />
              <span className="text-sm ml-2 mr-4 my-1 p-1 w-full rounded-r-full transition duration-500 ease-in-out hover:bg-primary-orange-600">
                MP disponible
              </span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="mr-2 cursor-pointer"
                checked={selectedColumns.start_date}
                onChange={() =>
                  handleChange('start_date', !selectedColumns.start_date)
                }
              />
              <span className="text-sm ml-2 mr-4 my-1 p-1 w-full rounded-r-full transition duration-500 ease-in-out hover:bg-primary-orange-600">
                Fecha desde
              </span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="mr-2 cursor-pointer"
                checked={selectedColumns.end_date}
                onChange={() =>
                  handleChange('end_date', !selectedColumns.end_date)
                }
              />
              <span className="text-sm ml-2 mr-4 my-1 p-1 w-full rounded-r-full transition duration-500 ease-in-out hover:bg-primary-orange-600">
                Fecha hasta
              </span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="mr-2 cursor-pointer"
                checked={selectedColumns.payment_type}
                onChange={() =>
                  handleChange('payment_type', !selectedColumns.payment_type)
                }
              />
              <span className="text-sm ml-2 mr-4 my-1 p-1 w-full rounded-r-full transition duration-500 ease-in-out hover:bg-primary-orange-600">
                Tipo de pago
              </span>
            </label>
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
  )
}

export default SelectColumns
