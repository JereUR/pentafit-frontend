import { Days, daysOfWeek } from '@/components/types/Diary'
import { Button } from '@/components/ui/button'
import { Dispatch, SetStateAction, useState } from 'react'
import { FaTableCells } from 'react-icons/fa6'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'

interface Props {
  selectedDays: Days
  setSelectedDays: Dispatch<SetStateAction<Days>>
}

const SelectDaysToShow: React.FC<Props> = ({
  selectedDays,
  setSelectedDays
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleChange = (name: number, value: boolean) => {
    setSelectedDays({ ...selectedDays, [name]: value })
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
        Días
        {isOpen ? (
          <MdExpandLess className="w-5 h-5" />
        ) : (
          <MdExpandMore className="w-5 h-5" />
        )}
      </Button>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="absolute w-[20vw] xl:w-[15vw] bg-card mt-3 mr-5 rounded shadow-lg z-50"
        >
          <div className="p-4" onClick={handleMenuClick}>
            <p className="text-lg font-medium text-foreground">
              Días a mostrar
            </p>
            <hr className="my-2 border-gray-200 dark:border-gray-500" />
            {daysOfWeek.map((day, index) => (
              <label key={day} className="flex items-center cursor-pointer ">
                <input
                  type="checkbox"
                  className="mr-2 cursor-pointer"
                  checked={selectedDays[index]}
                  onChange={() => handleChange(index, !selectedDays[index])}
                />
                <span className="text-sm ml-2 mr-4 my-1 p-1 w-full rounded-r-full transition duration-500 ease-in-out hover:bg-primary-orange-600">
                  {daysOfWeek[index]}
                </span>
              </label>
            ))}

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

export default SelectDaysToShow
