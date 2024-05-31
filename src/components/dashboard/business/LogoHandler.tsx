'use client'

import Image from 'next/image'
import { Dispatch, SetStateAction, useRef, useState } from 'react'
import { Pencil1Icon } from '@radix-ui/react-icons'

import noImage from '@public/assets/no-image.png'
import Modal from '../../Modal'
import LogoCropper from './LogoCropper'
import { PropsAddBusiness } from '@/components/types/Business'

interface LogoProps {
  imageUrl: string | null
  setDataBusiness: Dispatch<SetStateAction<PropsAddBusiness>>
}

const LogoHandler: React.FC<LogoProps> = ({ imageUrl, setDataBusiness }) => {
  const photoUrl = useRef(imageUrl)
  const [modalOpen, setModalOpen] = useState(false)

  const updatePhoto = (imgSrc: string) => {
    photoUrl.current = imgSrc
  }

  return (
    <div className="flex flex-col items-center ">
      <div className="relative">
        <Image
          src={photoUrl.current ? photoUrl.current : noImage}
          alt="Avatar"
          width={150}
          height={150}
          className="w-[150px] h-[150px] rounded-full border-[1px] border-gray-600"
        />
        <button
          type="button"
          className="absolute -bottom-3 left-0 right-0 m-auto w-fit p-[.35rem] rounded-full transition duration-300 ease-in-out bg-background hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-600"
          title="Cambiar logo"
          onClick={() => setModalOpen(true)}
        >
          <Pencil1Icon className="h-4 w-4" />
        </button>
      </div>
      {modalOpen && (
        <Modal closeModal={() => setModalOpen(false)}>
          <LogoCropper
            text="Elige Logo de Negocio"
            setDataBusiness={setDataBusiness}
            closeModal={() => setModalOpen(false)}
            updatePhoto={updatePhoto}
          />
        </Modal>
      )}
    </div>
  )
}

export default LogoHandler
