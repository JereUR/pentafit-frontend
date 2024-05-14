import { Cross1Icon } from '@radix-ui/react-icons'
import React, { useState } from 'react'

import { Button } from '../ui/button'
import useUser from '../hooks/useUser'
import mailPhoto from '../../../public/assets/recover-mail.png'
import Image from 'next/image'
import Loader from '../Loader'

interface ForgotPasswordModalProps {
  isOpen: boolean
  onClose: () => void
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose
}) => {
  const [showModal, setShowModal] = useState(isOpen)
  const [forgotError, setForgotError] = useState('')
  const [loading, setLoading] = useState(false)
  const { recover, recoverState, setRecoverState } = useUser()

  const handleClose = () => {
    setShowModal(false)
    setRecoverState(false)
    onClose() // Call the provided onClose function to notify parent
  }

  const validation = (email: string) => {
    let error = ''
    const regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/

    if (!email.trim()) {
      error = `Este campo no debe ser vacío.`
    } else if (!regexEmail.test(email)) {
      error = 'Correo no válido.'
    }

    return error
  }

  async function handleAction(formData: FormData) {
    const { email } = Object.fromEntries(formData)

    const err = validation(email.toString())
    setForgotError(err)

    if (Object.keys(err).length === 0) {
      setLoading(true)
      await recover(formData)
      setForgotError('')
    }

    setLoading(false)
  }

  return (
    <div
      className={`fixed inset-0 bg-gray-500/50 flex justify-center items-center z-50 transition-all ${
        !showModal && 'opacity-0 pointer-events-none'
      } duration-300 ease-in-out`}
    >
      <div></div>:
      <div className="bg-background w-[60vw] rounded-lg shadow-md p-10 flex flex-col gap-4">
        {recoverState ? (
          <div className="grid place-items-center text-center">
            <Image src={mailPhoto} alt="Email sent" height={150} width={300} />
            <span>
              Acabamos de enviarle un correo electrónico con instrucciones para
              restablecer su contraseña. Si no recibe un correo electrónico,{' '}
              <a
                className="italic font-extralight cursor-pointer underline"
                onClick={() => setRecoverState(false)}
              >
                intente nuevamente con una dirección de correo electrónico
                diferente
              </a>
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-4 text-center">
            <h2 className="text-3xl font-bold text-center mx-4 my-2 text-foreground">
              Recuperar Contraseña
            </h2>
            <span className="mx-4 my-2">
              Ingrese si correo electrónico y recibirá un mail con la
              información necesaria para reestablecer su contraseña.
            </span>
            <form action={handleAction} className="flex flex-col gap-4">
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                className="bg-transparent border rounded-md text-xl p-2 focus:outline-none my-2 mx-4"
              />
              {forgotError != '' && (
                <span className="text-xs w-max ml-[2vw] mt-[-2vh] text-red-600 py-[2px] px-1 rounded-md animate-pulse">
                  {forgotError}
                </span>
              )}
              <Button className="bg-primary-orange-600 h-[5vh] text-xl m-4 text-foreground rounded-md hover:bg-primary-orange-700">
                {!loading ? 'Enviar' : <Loader className="mt-[2vh]" />}
              </Button>
            </form>
          </div>
        )}
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
