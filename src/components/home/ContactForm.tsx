import React, { useState } from 'react'
import { Button } from '../ui/button'

interface FormData {
  name: string
  lastname: string
  email: string
  message: string
  [key: string]: string // Index signature for any string property
}

interface FormErrors {
  name: string
  lastname: string
  email: string
  message: string
  [key: string]: string
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

    const validationErrors: FormErrors = {
      name: '',
      lastname: '',
      email: '',
      message: ''
    }

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

    setErrors(validationErrors)

    if (
      validationErrors.email === '' &&
      validationErrors.lastname === '' &&
      validationErrors.name === '' &&
      validationErrors.message === ''
    ) {
      console.log('Formulario enviado:', formData)
      setFormData({ name: '', lastname: '', email: '', message: '' })
    }
  }

  return (
    <div className="bg-gray-300 dark:bg-gray-600 p-10 m-10 mr-20 w-[70vw] rounded-md shadow-md">
      <form onSubmit={handleSubmit}>
        {inputFields.map((field) => (
          <div className="flex flex-col gap-5" key={field.name}>
            <label htmlFor={field.name} className="text-2xl font-bold mt-4">
              {field.label}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="bg-background border-none rounded-md text-xl ml-1 p-2 h-40 focus:outline-none"
              />
            ) : (
              <input
                type="text" // Default to 'text' if type not specified
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="bg-background border-none rounded-md text-xl ml-1 p-2 focus:outline-none"
              />
            )}
            {errors[field.name] && (
              <span className="text-red-600 ml-1">{errors[field.name]}</span>
            )}
          </div>
        ))}
        <div className="grid place-items-center">
          <Button
            type="submit"
            className="bg-btnPrimary text-xl font-bold p-6 mt-4 w-[60vw] hover:bg-btnPrimaryHover"
          >
            Enviar
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ContactForm
