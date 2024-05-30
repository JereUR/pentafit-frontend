import { FaTableCells } from 'react-icons/fa6'
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu'
import React, { Dispatch, SetStateAction } from 'react'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { Columns } from '@/components/types/Activity'
import { Button } from '@/components/ui/button'

type Checked = DropdownMenuCheckboxItemProps['checked']

interface Props {
  selectedColumns: Columns
  setSelectedColumns: Dispatch<SetStateAction<Columns>>
}

const SelectColumns: React.FC<Props> = ({
  selectedColumns,
  setSelectedColumns
}) => {
  const handleChange = (name: string, value: boolean) => {
    setSelectedColumns({ ...selectedColumns, [name]: value })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <FaTableCells />
          Columnas
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Columnas a mostrar</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          className="cursor-pointer"
          checked={selectedColumns.name}
          onCheckedChange={() => handleChange('name', !selectedColumns.name)}
        >
          Nombre
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          className="cursor-pointer"
          checked={selectedColumns.price}
          onCheckedChange={() => handleChange('price', !selectedColumns.price)}
        >
          Precio
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          className="cursor-pointer"
          checked={selectedColumns.is_public}
          onCheckedChange={() =>
            handleChange('is_public', !selectedColumns.is_public)
          }
        >
          Es pública?
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SelectColumns
