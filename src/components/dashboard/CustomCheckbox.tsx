import React from 'react'

interface Props {
  label: string
  value: string
  action: (name: string) => void
  name: string
}

export const CustomCheckbox: React.FC<Props> = ({
  label,
  value,
  action,
  name
}) => {
  return (
    <div className="flex flex-col gap-4 ">
      <label htmlFor={name} className="font-[600]">
        {label}
      </label>
      <div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            name={name}
            className="sr-only peer"
            value={value}
            checked={value === 'true' ? true : false}
            onChange={() => action(name)}
          />
          <div className="group peer ring-0  bg-gradient-to-bl from-neutral-800 via-neutral-700 to-neutral-600 dark:from-gray-400 dark:via-gray-300 dark:to-gray-200  rounded-full outline-none duration-1000 after:duration-300 w-12 h-6  shadow-md  peer-focus:outline-none  after:content-[''] after:rounded-full after:absolute peer-checked:after:rotate-180 after:[background:conic-gradient(from_135deg,_#b2a9a9,_#b2a8a8,_#ffffff,_#d7dbd9_,_#ffffff,_#b2a8a8)]  after:outline-none after:h-4 after:w-4 after:top-1 after:left-1 peer-checked:after:translate-x-6 peer-hover:after:scale-95 peer-checked:bg-gradient-to-r peer-checked:from-emerald-500 peer-checked:to-emerald-900"></div>
        </label>
      </div>
    </div>
  )
}
