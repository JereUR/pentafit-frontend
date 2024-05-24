'use client'

import Image from 'next/image'
import { TfiReload } from 'react-icons/tfi'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import errorImage from '@public/assets/404-image.png'
import Loader from '@/components/Loader'

export default function Business404({ id }: { id: string }) {
  const [loading, setLoading] = useState(false)
  return (
    <div className="flex flex-col gap-6 justify-center items-center">
      <Image src={errorImage} width={500} height={500} alt="404 not Found" />
      <p className='text-lg italic font-light'>
        No existe un Negocio con 'id: {id}' ó quizás ocurrió un error en la conexión
      </p>
      <Button
        className="text-lg text-foreground p-4 font-light bg-primary-orange-600 group hover:bg-primary-orange-700"
        onClick={() => {
          setLoading(true)
          window.location.reload()
        }}
      >
        {!loading ? (
          <div className="flex gap-2 items-center">
            <TfiReload size={20} /> Reintentar
          </div>
        ) : (
          <Loader className="mt-[1.8vh] ml-[1.3vw]" />
        )}
      </Button>
    </div>
  )
}
