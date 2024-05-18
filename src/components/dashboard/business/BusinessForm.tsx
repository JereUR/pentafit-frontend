'use client'

import { useRef, useState } from 'react'

import ErrorText from '@/components/ErrorText'
import useUser from '@/components/hooks/useUser'
import { PropsAddBusiness } from '@/components/types/Business'
import ColorPicker from './ColorPicker'

interface FormErrors {
  name?: string
  description?: string
  logo?: string
  title?: string
  primary_color?: string
  secondary_color?: string
  [key: string]: string | undefined
}

export default function BusinessForm({
  business
}: {
  business: PropsAddBusiness
}) {
  const { loading, addBusiness } = useUser()
  const [dataBusiness, setDataBusiness] = useState<PropsAddBusiness>(business)
  const [formErrors, setFormErrors] = useState<FormErrors>({
    name: '',
    description: '',
    logo: '',
    title: '',
    primary_color: '',
    secondary_color: ''
  })
  const colorInputRef = useRef(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDataBusiness({ ...dataBusiness, [name]: value })
  }

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (/^#[0-9A-F]{0,6}$/i.test(value)) {
      setDataBusiness({ ...dataBusiness, [name]: value })
    }
  }

  const handleChangeLogo = (e: React.ChangeEvent<HTMLInputElement>) => {}

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  console.log(dataBusiness)

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <div className="flex gap-4 items-center">
            <label htmlFor="activity" className="font-[600]">
              Nombre
            </label>
            {formErrors.activity && <ErrorText text={formErrors.activity} />}
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
            <label htmlFor="activity" className="font-[600]">
              Descripción
            </label>
            {formErrors.description && (
              <ErrorText text={formErrors.description} />
            )}
          </div>
          <input
            type="text"
            name="description"
            className="border border-gray-300 dark:border-gray-700 p-2 focus:border-primary-orange-500 focus:outline-none focus:ring-0"
            value={dataBusiness.description}
            onChange={handleChange}
          />
        </div>
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
        <div className="flex flex-col gap-2">
          <div className="flex gap-4 items-center">
            <label htmlFor="title" className="font-[600]">
              Título de Página Web
            </label>
            {formErrors.title && <ErrorText text={formErrors.title} />}
          </div>
          <input
            type="text"
            name="title"
            className="border border-gray-300 dark:border-gray-700 p-2 focus:border-primary-orange-500 focus:outline-none focus:ring-0"
            value={dataBusiness.title}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-4 items-center">
            <label htmlFor="primary_color" className="font-[600]">
              Color Primario de Página Web
            </label>
            {formErrors.primary_color && (
              <ErrorText text={formErrors.primary_color} />
            )}
          </div>
          <ColorPicker
            value={dataBusiness.primary_color}
            name="primary_color"
            setDataBusiness={setDataBusiness}
          />
          <div className="flex gap-4 items-center">
            <label htmlFor="primary_color_hex" className="font-[600]">
              ó Ingrese el Valor Hexadecimal
            </label>
            {formErrors.primary_color && (
              <ErrorText text={formErrors.primary_color} />
            )}
          </div>
          <input
            type="text"
            name="primary_color"
            className="border border-gray-300 dark:border-gray-700 p-2 focus:border-primary-orange-500 focus:outline-none focus:ring-0"
            value={dataBusiness.primary_color}
            onChange={handleHexChange}
            maxLength={7}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-4 items-center">
            <label htmlFor="secondary_color" className="font-[600]">
              Color Secundario de Página Web
            </label>
            {formErrors.secondary_color && (
              <ErrorText text={formErrors.secondary_color} />
            )}
          </div>
          <ColorPicker
            value={dataBusiness.secondary_color}
            name="secondary_color"
            setDataBusiness={setDataBusiness}
          />
          <div className="flex gap-4 items-center">
            <label htmlFor="secondary_color_hex" className="font-[600]">
              ó Ingrese el Valor Hexadecimal
            </label>
            {formErrors.secondary_color && (
              <ErrorText text={formErrors.secondary_color} />
            )}
          </div>
          <input
            type="text"
            name="secondary_color"
            className="border border-gray-300 dark:border-gray-700 p-2 focus:border-primary-orange-500 focus:outline-none focus:ring-0"
            value={dataBusiness.secondary_color}
            onChange={handleHexChange}
            maxLength={7}
          />
        </div>
      </form>
    </div>
  )
}
