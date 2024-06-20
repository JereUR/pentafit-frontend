import { FaTableCells } from 'react-icons/fa6'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'
import React, { Dispatch, SetStateAction, useState } from 'react'

import { Columns } from '@/components/types/Diary'
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
                checked={selectedColumns.id}
                onChange={() => handleChange('id', !selectedColumns.id)}
              />
              <span className="text-sm ml-2 mr-4 my-1 p-1 w-full rounded-r-full transition duration-500 ease-in-out hover:bg-primary-orange-600">
                #
              </span>
            </label>
            <label className="flex items-center cursor-pointer ">
              <input
                type="checkbox"
                className="mr-2 cursor-pointer"
                checked={selectedColumns.type_schedule}
                onChange={() =>
                  handleChange('type_schedule', !selectedColumns.type_schedule)
                }
              />
              <span className="text-sm ml-2 mr-4 my-1 p-1 w-full rounded-r-full transition duration-500 ease-in-out hover:bg-primary-orange-600">
                Tipo
              </span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="mr-2 cursor-pointer"
                checked={selectedColumns.date_from}
                onChange={() =>
                  handleChange('date_from', !selectedColumns.date_from)
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
                checked={selectedColumns.date_until}
                onChange={() =>
                  handleChange('date_until', !selectedColumns.date_until)
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
                checked={selectedColumns.time_from}
                onChange={() =>
                  handleChange('time_from', !selectedColumns.time_from)
                }
              />
              <span className="text-sm ml-2 mr-4 my-1 p-1 w-full rounded-r-full transition duration-500 ease-in-out hover:bg-primary-orange-600">
                Horario desde
              </span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="mr-2 cursor-pointer"
                checked={selectedColumns.time_until}
                onChange={() =>
                  handleChange('time_until', !selectedColumns.time_until)
                }
              />
              <span className="text-sm ml-2 mr-4 my-1 p-1 w-full rounded-r-full transition duration-500 ease-in-out hover:bg-primary-orange-600">
                Horario hasta
              </span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="mr-2 cursor-pointer"
                checked={selectedColumns.days_available}
                onChange={() =>
                  handleChange(
                    'days_available',
                    !selectedColumns.days_available
                  )
                }
              />
              <span className="text-sm ml-2 mr-4 my-1 p-1 w-full rounded-r-full transition duration-500 ease-in-out hover:bg-primary-orange-600">
                Días habilitados
              </span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="mr-2 cursor-pointer"
                checked={selectedColumns.repeat_for}
                onChange={() =>
                  handleChange('repeat_for', !selectedColumns.repeat_for)
                }
              />
              <span className="text-sm ml-2 mr-4 my-1 p-1 w-full rounded-r-full transition duration-500 ease-in-out hover:bg-primary-orange-600">
                Repetir cada
              </span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="mr-2 cursor-pointer"
                checked={selectedColumns.offer_days}
                onChange={() =>
                  handleChange('offer_days', !selectedColumns.offer_days)
                }
              />
              <span className="text-sm ml-2 mr-4 my-1 p-1 w-full rounded-r-full transition duration-500 ease-in-out hover:bg-primary-orange-600">
                Días de oferta
              </span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="mr-2 cursor-pointer"
                checked={selectedColumns.term_duration}
                onChange={() =>
                  handleChange('term_duration', !selectedColumns.term_duration)
                }
              />
              <span className="text-sm ml-2 mr-4 my-1 p-1 w-full rounded-r-full transition duration-500 ease-in-out hover:bg-primary-orange-600">
                Duración
              </span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="mr-2 cursor-pointer"
                checked={selectedColumns.amount_of_people}
                onChange={() =>
                  handleChange(
                    'amount_of_people',
                    !selectedColumns.amount_of_people
                  )
                }
              />
              <span className="text-sm ml-2 mr-4 my-1 p-1 w-full rounded-r-full transition duration-500 ease-in-out hover:bg-primary-orange-600">
                Cantidad de personas
              </span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="mr-2 cursor-pointer"
                checked={selectedColumns.is_active}
                onChange={() =>
                  handleChange('is_active', !selectedColumns.is_active)
                }
              />
              <span className="text-sm ml-2 mr-4 my-1 p-1 w-full rounded-r-full transition duration-500 ease-in-out hover:bg-primary-orange-600">
                Activa
              </span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="mr-2 cursor-pointer"
                checked={selectedColumns.genre_exclusive}
                onChange={() =>
                  handleChange(
                    'genre_exclusive',
                    !selectedColumns.genre_exclusive
                  )
                }
              />
              <span className="text-sm ml-2 mr-4 my-1 p-1 w-full rounded-r-full transition duration-500 ease-in-out hover:bg-primary-orange-600">
                Exclusividad de género
              </span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="mr-2 cursor-pointer"
                checked={selectedColumns.works_holidays}
                onChange={() =>
                  handleChange(
                    'works_holidays',
                    !selectedColumns.works_holidays
                  )
                }
              />
              <span className="text-sm ml-2 mr-4 my-1 p-1 w-full rounded-r-full transition duration-500 ease-in-out hover:bg-primary-orange-600">
                Trabaja feriados
              </span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="mr-2 cursor-pointer"
                checked={selectedColumns.observations}
                onChange={() =>
                  handleChange('observations', !selectedColumns.observations)
                }
              />
              <span className="text-sm ml-2 mr-4 my-1 p-1 w-full rounded-r-full transition duration-500 ease-in-out hover:bg-primary-orange-600">
                Observaciones
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
