import { Cross1Icon } from '@radix-ui/react-icons'
import React, { useState } from 'react'
import { Button } from '../ui/button'

interface ForgotPasswordModalProps {
  isOpen: boolean
  onClose: () => void
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose
}) => {
  const [showModal, setShowModal] = useState(isOpen)

  const handleClose = () => {
    setShowModal(false)
    onClose() // Call the provided onClose function to notify parent
  }

  return (
    <div
      className={`fixed inset-0 bg-gray-500/50 flex justify-center items-center z-50 transition-all ${
        !showModal && 'opacity-0 pointer-events-none'
      } duration-300 ease-in-out`}
    >
      <div className="bg-background w-[60vw] rounded-lg shadow-md p-10 flex flex-col gap-4">
        <h2 className="text-3xl font-bold text-center mx-4 my-2 text-foreground">
          Recuperar Contraseña
        </h2>
        <span className="mx-4 my-2">
          Ingrese si correo electrónico y recibirá un mail con la información
          necesaria para reestablecer su contraseña.
        </span>
        <input
          type="email"
          placeholder="Correo electrónico"
          className="bg-transparent border rounded-md text-xl p-2 focus:outline-none my-2 mx-4"
        />
        <Button className="bg-primary-orange-600 h-[5vh] text-xl m-4 text-foreground rounded-md hover:bg-primary-orange-700">
          Enviar
        </Button>
        <button
          type="button"
          className="absolute top-right mt-[-2vh] ml-[-2vh] focus:outline-none"
          onClick={handleClose}
        >
          <Cross1Icon className="h-6 w-6 text-gray-500 hover:text-gray-700" />
        </button>
      </div>
    </div>
  )
}

export default ForgotPasswordModal
