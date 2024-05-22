import { MutableRefObject } from 'react'
import { Button } from '../ui/button'

export default function BannerSection({
  servicesRef
}: {
  servicesRef: MutableRefObject<HTMLDivElement | null>
}) {
  return (
    <div className="flex flex-col justify-around items-center h-[85vh]">
      <div>
        <div className="h-[300px] w-[90vw] flex items-center justify-center text-gradient-to-r from-primary-orange-400 to-primary-orange-600 text-7xl border">
          Banner
        </div>
      </div>
      <div>
        <span className="flex items-center justify-center font-bold text-7xl dark:text-muted">
          PENTA
        </span>
      </div>
      <div className="flex flex-col gap-6">
        <span className="text-xl font-bold italic dark:text-muted">
          Que ofrecemos
        </span>
        <Button
          className="cursor-pointer bg-background px-2 py-2 rounded-md text-foreground tracking-wider shadow-xl animate-bounce hover:animate-none hover:text-white dark:hover:text-muted mb-[-40px]"
          onClick={() => {
            servicesRef.current?.scrollIntoView({
              behavior: 'smooth'
            })
          }}
        >
          <svg
            className="w-5 h-5"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
              strokeLinejoin="round"
              strokeLinecap="round"
            ></path>
          </svg>
        </Button>
      </div>
    </div>
  )
}
