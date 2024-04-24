import { MutableRefObject } from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

export default function BannerSection({
  servicesRef
}: {
  servicesRef: MutableRefObject<HTMLDivElement | null>
}) {
  return (
    <div className="flex flex-col justify-around items-center h-[85vh] bg-teal-500 my-2 mx-6 rounded-lg">
      <div>
        <div className="text-4xl h-[300px] flex items-center justify-center">
          Banner
        </div>
      </div>
      <div>
        <span className="flex items-center justify-center ml-6 font-bold text-5xl">
          Nombre Empresa
        </span>
      </div>
      <div>
        <Button
          onClick={() => {
            servicesRef.current?.scrollIntoView({
              behavior: 'smooth'
            })
          }}
        >
          Que ofrecemos
        </Button>
      </div>
    </div>
  )
}
