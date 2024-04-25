import React, { useState } from 'react'
import { Button } from '../ui/button'

interface FormData {
  name: string
  lastname: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  lastname?: string
  email?: string
  message?: string
}

const inputFields = [
  { name: 'name', label: 'Nombre' },
  { name: 'lastname', label: 'Apellido' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'message', label: 'Mensaje', type: 'textarea' }
]

function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    lastname: '',
    email: '',
    message: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})

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

    const validationErrors: FormErrors = {} // Object to store validation errors

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

    if (Object.keys(validationErrors).length === 0) {
      console.log('Formulario enviado:', formData)
      setFormData({ name: '', lastname: '', email: '', message: '' })
    }
  }

  return (
    <div className="bg-gray-300 dark:bg-gray-600 p-10 m-10 mr-20 w-[70vw] rounded-md shadow-md">
      <form onSubmit={handleSubmit}>
        {inputFields.map((field) => (
          <div className="flex flex-col gap-5" key={field.name}>
            <label htmlFor={field.name} className="text-2xl font-bold">
              {field.label}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="bg-background border-none rounded-md text-xl mb-4 ml-1 p-2 h-40 focus:outline-none"
              />
            ) : (
              <input
                type={field.type || 'text'} // Default to 'text' if type not specified
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="bg-background border-none rounded-md text-xl mb-4 ml-1 p-2 focus:outline-none"
              />
            )}
            {errors[field.name] && (
              <span className="text-red-500">{errors[field.name]}</span>
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
