import React, { useState } from 'react'
import Image from 'next/image'

import photo from '../../../public/assets/banner-login.png'
import { Button } from '../ui/button'

interface FormData {
  name: string
  lastname: string
  email: string
  message: string
  [key: string]: string // Index signature for any string property
}

interface FormErrors {
  name?: string
  lastname?: string
  email?: string
  message?: string
  [key: string]: string | undefined
}

const inputFields = [
  { name: 'name', label: 'Nombre' },
  { name: 'lastname', label: 'Apellido' },
  { name: 'email', label: 'Email' },
  { name: 'message', label: 'Mensaje', type: 'textarea' }
]

function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    lastname: '',
    email: '',
    message: ''
  })

  const [errors, setErrors] = useState<FormErrors>({
    name: '',
    lastname: '',
    email: '',
    message: ''
  })

  const validations = () => {
    const validationErrors: FormErrors = {}

    if (!formData.name) {
      validationErrors.name = 'Nombre es requerido'
    }

    if (!formData.lastname) {
      validationErrors.lastname = 'Apellido es requerido'
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      validationErrors.email = 'Ingrese un email válido'
    }

    if (!formData.message) {
      validationErrors.message = 'Mensaje es requerido'
    }

    return validationErrors
  }

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault() // Prevent default form submission

    const validationErrors = validations()

    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      console.log('Formulario enviado:', formData)
      setFormData({ name: '', lastname: '', email: '', message: '' })
    }
  }

  return (
    <div className="bg-primary-orange-400 p-10 w-full shadow-md">
      <div className="flex gap-2">
        <div className="w-full m-4">
          <Image
            src={photo}
            alt="login-banner"
            objectFit="fill"
            className="h-[60vh]"
          />
        </div>
        <div className=" m-8">
          <div className="flex flex-col gap-5 mb-5">
            <h1 className="text-xl font-bold">BUENAS!</h1>
            <p className="text-3xl italic">Dejanos tu consulta</p>
          </div>
          <form onSubmit={handleSubmit} className="w-[50vw] flex flex-col">
            {inputFields.map((field) => (
              <div className="flex flex-col gap-2" key={field.name}>
                <label htmlFor={field.name} className="font-bold mt-2">
                  {field.label}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="bg-background border-none rounded-md ml-1 h-32 focus:outline-none"
                  />
                ) : (
                  <input
                    type="text" // Default to 'text' if type not specified
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="bg-background border-none rounded-md ml-1 p-2  focus:outline-none"
                  />
                )}
                {errors[field.name] && (
                  <span className="text-red-600 ml-1">
                    {errors[field.name]}
                  </span>
                )}
              </div>
            ))}
            <div className="">
              <Button
                type="submit"
                className="absolute bg-primary-orange-600 hover:bg-primary-orange-700 text-xl font-bold p-6 mt-8 right-20 w-[10vw]"
              >
                Enviar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactForm
