import { FaTableCells } from 'react-icons/fa6'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'
import React, { Dispatch, SetStateAction, useState } from 'react'

import { Columns } from 'components/types/Team'
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
    localStorage.setItem('columns-team', JSON.stringify(selectedColumns))
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
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="mr-2 cursor-pointer"
                checked={selectedColumns.first_name}
                onChange={() =>
                  handleChange('first_name', !selectedColumns.first_name)
                }
              />
              <span className="text-sm ml-2 mr-4 my-1 p-1 w-full rounded-r-full transition duration-500 ease-in-out link-progress z-50">
                Nombre
              </span>
            </label>
            <label className="flex items-center cursor-pointer ">
              <input
                type="checkbox"
                className="mr-2 cursor-pointer"
                checked={selectedColumns.last_name}
                onChange={() =>
                  handleChange('last_name', !selectedColumns.last_name)
                }
              />
              <span className="text-sm ml-2 mr-4 my-1 p-1 w-full rounded-r-full transition duration-500 ease-in-out link-progress z-50">
                Apellido
              </span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="mr-2 cursor-pointer"
                checked={selectedColumns.email}
                onChange={() => handleChange('email', !selectedColumns.email)}
              />
              <span className="text-sm ml-2 mr-4 my-1 p-1 w-full rounded-r-full transition duration-500 ease-in-out link-progress z-50">
                Email
              </span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="mr-2 cursor-pointer"
                checked={selectedColumns.role}
                onChange={() => handleChange('role', !selectedColumns.role)}
              />
              <span className="text-sm ml-2 mr-4 my-1 p-1 w-full rounded-r-full transition duration-500 ease-in-out link-progress z-50">
                Rol
              </span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="mr-2 cursor-pointer"
                checked={selectedColumns.businesses}
                onChange={() =>
                  handleChange('businesses', !selectedColumns.businesses)
                }
              />
              <span className="text-sm ml-2 mr-4 my-1 p-1 w-full rounded-r-full transition duration-500 ease-in-out link-progress z-50">
                Negocios
              </span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="mr-2 cursor-pointer"
                checked={selectedColumns.phone}
                onChange={() => handleChange('phone', !selectedColumns.phone)}
              />
              <span className="text-sm ml-2 mr-4 my-1 p-1 w-full rounded-r-full transition duration-500 ease-in-out link-progress z-50">
                Teléfono
              </span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="mr-2 cursor-pointer"
                checked={selectedColumns.birthdate}
                onChange={() =>
                  handleChange('birthdate', !selectedColumns.birthdate)
                }
              />
              <span className="text-sm ml-2 mr-4 my-1 p-1 w-full rounded-r-full transition duration-500 ease-in-out link-progress z-50">
                Fecha de Nacimiento
              </span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="mr-2 cursor-pointer"
                checked={selectedColumns.gender}
                onChange={() => handleChange('gender', !selectedColumns.gender)}
              />
              <span className="text-sm ml-2 mr-4 my-1 p-1 w-full rounded-r-full transition duration-500 ease-in-out link-progress z-50">
                Género
              </span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="mr-2 cursor-pointer"
                checked={selectedColumns.created_at}
                onChange={() =>
                  handleChange('created_at', !selectedColumns.created_at)
                }
              />
              <span className="text-sm ml-2 mr-4 my-1 p-1 w-full rounded-r-full transition duration-500 ease-in-out link-progress z-50">
                Fecha de creación de usuario
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
