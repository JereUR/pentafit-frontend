import React from 'react'

export default function CustomButton({ text }: { text: string }) {
  return (
    <div>
      <button className="rounded-lg relative w-36 h-10 cursor-pointer flex items-center border-none bg-primary-orange-600 group hover:bg-primary-orange-700 active:bg-primary-orange-700">
        <span className="text-foreground font-semibold ml-8 transform group-hover:translate-x-10 transition-all duration-300">
          {text}
        </span>
        <span className="absolute right-0 h-full w-10 rounded-lg bg-primary-orange-600 hover:bg-primary-orange-700 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
          <svg
            className="svg w-8 text-foreground"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="12" x2="12" y1="5" y2="19"></line>
            <line x1="5" x2="19" y1="12" y2="12"></line>
          </svg>
        </span>
      </button>
    </div>
  )
}
