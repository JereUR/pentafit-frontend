import { FaTableCells } from 'react-icons/fa6'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'
import React, { Dispatch, SetStateAction, useState } from 'react'

import { Columns } from 'components/types/Plan'
import { Button } from 'components/ui/button'

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
        className="flex items-center gap-2 bg-card"
        onClick={handleButtonClick}
      >
        <FaTableCells className="w-4 h-4" />
        Columnas
        {isOpen ? (
          <MdExpandLess className="w-5 h-5" />
        ) : (
          <MdExpandMore className="w-5 h-5" />
        )}
      </Button>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="absolute w-[20vw] xl:w-[15vw] bg-card mt-3 mr-5 rounded shadow-lg max-h-[50vh] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-track-rounded scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-700"
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
              <span className="text-sm ml-2 mr-4 my-1 p-1 w-full rounded-r-full transition duration-500 ease-in-out link-progress z-50">
                Nombre
              </span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="mr-2 cursor-pointer"
                checked={selectedColumns.diaries}
                onChange={() =>
                  handleChange('diaries', !selectedColumns.diaries)
                }
              />
              <span className="text-sm ml-2 mr-4 my-1 p-1 w-full rounded-r-full transition duration-500 ease-in-out link-progress z-50">
                Agendas
              </span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="mr-2 cursor-pointer"
                checked={selectedColumns.description}
                onChange={() =>
                  handleChange('description', !selectedColumns.description)
                }
              />
              <span className="text-sm ml-2 mr-4 my-1 p-1 w-full rounded-r-full transition duration-500 ease-in-out link-progress z-50">
                Descripción
              </span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="mr-2 cursor-pointer"
                checked={selectedColumns.price}
                onChange={() => handleChange('price', !selectedColumns.price)}
              />
              <span className="text-sm ml-2 mr-4 my-1 p-1 w-full rounded-r-full transition duration-500 ease-in-out link-progress z-50">
                Precio
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
              <span className="text-sm ml-2 mr-4 my-1 p-1 w-full rounded-r-full transition duration-500 ease-in-out link-progress z-50">
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
              <span className="text-sm ml-2 mr-4 my-1 p-1 w-full rounded-r-full transition duration-500 ease-in-out link-progress z-50">
                Fecha hasta
              </span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="mr-2 cursor-pointer"
                checked={selectedColumns.expiration_period}
                onChange={() =>
                  handleChange(
                    'expiration_period',
                    !selectedColumns.expiration_period
                  )
                }
              />
              <span className="text-sm ml-2 mr-4 my-1 p-1 w-full rounded-r-full transition duration-500 ease-in-out link-progress z-50">
                Plazo de vencimiento
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
              <span className="text-sm ml-2 mr-4 my-1 p-1 w-full rounded-r-full transition duration-500 ease-in-out link-progress z-50">
                Generación de cuotas
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
              <span className="text-sm ml-2 mr-4 my-1 p-1 w-full rounded-r-full transition duration-500 ease-in-out link-progress z-50">
                Tipo de pago
              </span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="mr-2 cursor-pointer"
                checked={selectedColumns.plan_type}
                onChange={() =>
                  handleChange('plan_type', !selectedColumns.plan_type)
                }
              />
              <span className="text-sm ml-2 mr-4 my-1 p-1 w-full rounded-r-full transition duration-500 ease-in-out link-progress z-50">
                Tipo de plan
              </span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="mr-2 cursor-pointer"
                checked={selectedColumns.free_test}
                onChange={() =>
                  handleChange('free_test', !selectedColumns.free_test)
                }
              />
              <span className="text-sm ml-2 mr-4 my-1 p-1 w-full rounded-r-full transition duration-500 ease-in-out link-progress z-50">
                Ofrece clase de prueba
              </span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="mr-2 cursor-pointer"
                checked={selectedColumns.current}
                onChange={() =>
                  handleChange('current', !selectedColumns.current)
                }
              />
              <span className="text-sm ml-2 mr-4 my-1 p-1 w-full rounded-r-full transition duration-500 ease-in-out link-progress z-50">
                Vigente
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
