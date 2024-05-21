'use client'

import { useRef, useState } from 'react'

import ErrorText from '@/components/ErrorText'
import useUser from '@/components/hooks/useUser'
import { PropsAddBusiness } from '@/components/types/Business'
import ColorPicker from './ColorPicker'
import MetadataForm from './MetadataForm'
import { Button } from '@/components/ui/button'
import ContactForm from './ContactForm'

export interface FormErrors {
  name?: string
  description?: string
  email?: string
  address?: string
  phone?: string
  instagram?: string
  facebook?: string
  logo?: string
  title?: string
  primary_color?: string
  secondary_color?: string
  third_color?: string
  slogan?: string
  [key: string]: string | undefined
}

const initialErrors = {
  name: '',
  description: '',
  email: '',
  address: '',
  phone: '',
  instagram: '',
  facebook: '',
  logo: '',
  title: '',
  primary_color: '',
  secondary_color: '',
  third_color: '',
  slogan: ''
}

export default function BusinessForm({
  business
}: {
  business: PropsAddBusiness
}) {
  const { loading, addBusiness } = useUser()
  const [dataBusiness, setDataBusiness] = useState<PropsAddBusiness>(business)
  const [formErrors, setFormErrors] = useState<FormErrors>(initialErrors)
  const colorInputRef = useRef(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDataBusiness({ ...dataBusiness, [name]: value })
  }

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setDataBusiness({ ...dataBusiness, [name]: value })
  }

  const handleChangeLogo = (e: React.ChangeEvent<HTMLInputElement>) => {}

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    console.log(dataBusiness)
  }

  return (
    <div className="m-10">
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <label htmlFor="activity" className="font-[600]">
                Logo
              </label>
              {formErrors.activity && <ErrorText text={formErrors.activity} />}
            </div>
            <input
              type="file"
              name="logo"
              className="border border-gray-300 dark:border-gray-700 p-2 focus:border-primary-orange-500 focus:outline-none focus:ring-0"
              value={dataBusiness.logo}
              onChange={handleChangeLogo}
            />
          </div>
          <div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-4 items-center">
                <label htmlFor="name" className="font-[600]">
                  Nombre
                </label>
                {formErrors.name && <ErrorText text={formErrors.name} />}
              </div>
              <input
                type="text"
                name="name"
                className="border border-gray-300 dark:border-gray-700 p-2 focus:border-primary-orange-500 focus:outline-none focus:ring-0"
                value={dataBusiness.name}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-4 items-center">
                <label htmlFor="description" className="font-[600]">
                  Descripción
                </label>
                {formErrors.description && (
                  <ErrorText text={formErrors.description} />
                )}
              </div>
              <textarea
                name="description"
                className="border border-gray-300 dark:border-gray-700 p-2 focus:border-primary-orange-500 focus:outline-none focus:ring-0"
                value={dataBusiness.description}
                onChange={handleChangeTextArea}
              />
            </div>
          </div>
        </div>
        <ContactForm
          dataBusiness={dataBusiness}
          formErrors={formErrors}
          handleChange={handleChange}
        />
        <MetadataForm
          dataBusiness={dataBusiness}
          setDataBusiness={setDataBusiness}
          formErrors={formErrors}
          handleChange={handleChange}
        />
        <Button type="submit">Agregar</Button>
      </form>
    </div>
  )
}
