import {
  useState,
  useRef,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect
} from 'react'

import { PropsAddBusiness } from '@/components/types/Business'

interface ColorPickerProps {
  value: string
  name: string
  setDataBusiness: Dispatch<SetStateAction<PropsAddBusiness>>
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  name,
  setDataBusiness
}) => {
  const [color, setColor] = useState<string>(value)
  const colorInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value
    setColor(newColor)
    setDataBusiness((prev) => ({ ...prev, [name]: newColor }))
  }

  useEffect(() => {
    setColor(value)
  }, [value])

  return (
    <div className="relative w-max p-2 flex justify-center items-center">
      <input
        type="color"
        name={name}
        className="bg-card w-12 h-12 opacity-0 absolute inset-0 cursor-pointer"
        value={color}
        onChange={handleChange}
        ref={colorInputRef}
      />
      <div
        className="w-8 h-8 rounded-full cursor-pointer ring-2 ring-foreground"
        style={{ backgroundColor: color }}
        onClick={() => colorInputRef.current?.click()}
      />
    </div>
  )
}

export default ColorPicker
