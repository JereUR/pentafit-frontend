'use client'

import { useState } from 'react'

import ErrorText from '@/components/ErrorText'
import useUser from '@/components/hooks/useUser'
import { PropsAddBusiness } from '@/components/types/Business'

interface FormErrors {
  name?: string
  description?: string
  logo?: string
  metadata?: string
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
    metadata: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDataBusiness({ ...dataBusiness, [name]: value })
  }

  const handleChangeLogo = (e: React.ChangeEvent<HTMLInputElement>) => {}

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

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
      </form>
    </div>
  )
}
