import { RiExpandUpDownLine } from 'react-icons/ri'
import React, { Dispatch, SetStateAction, useState } from 'react'

import { Activity } from '@/components/types/Activity'
import { PropsAddDiary } from '@/components/types/Diary'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { FaCheck } from 'react-icons/fa'
import { cn } from '@/lib/utils'

interface Props {
  dataDiary: PropsAddDiary
  setDataDiary: Dispatch<SetStateAction<PropsAddDiary>>
  activities: Activity[]
}

const ActivityPicker: React.FC<Props> = ({
  dataDiary,
  setDataDiary,
  activities
}) => {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="text-lg w-[600px] justify-between bg-card"
        >
          {dataDiary.activity.id
            ? activities.find(
                (activity) => activity.id === dataDiary.activity.id
              )?.name
            : 'Seleccione una actividad...'}
          <RiExpandUpDownLine className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[600px] p-0 text-lg ">
        <Command>
          <CommandInput placeholder="Buscar actividad..." />
          <CommandList>
            <CommandEmpty>Actividad no encontrada.</CommandEmpty>
            <CommandGroup>
              {activities.map((activity) => (
                <CommandItem
                  key={activity.id}
                  value={activity.name}
                  className='cursor-pointer bg-transparent'
                  onSelect={() => {
                    setDataDiary((prev) => ({
                      ...prev,
                      activity: { id: activity.id, name: activity.name }
                    }))
                    setOpen(false)
                  }}
                >
                  <FaCheck
                    className={cn(
                      'mr-2 h-4 w-4',
                      dataDiary.activity.id === activity.id
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                  {activity.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default ActivityPicker
