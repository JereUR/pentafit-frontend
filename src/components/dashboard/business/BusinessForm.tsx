'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ImCross } from 'react-icons/im'
import { FaCheck } from 'react-icons/fa'

import ErrorText from '@/components/ErrorText'
import useUser from '@/components/hooks/useUser'
import { PropsAddBusiness } from '@/components/types/Business'
import MetadataForm from './MetadataForm'
import { Button } from '@/components/ui/button'
import ContactForm from './ContactForm'
import { useToast } from '@/components/ui/use-toast'
import Loader from '@/components/Loader'
import LogoHandler from './LogoHandler'

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
  business,
  type
}: {
  business: PropsAddBusiness
  type: string
}) {
  const { loadingBusiness, addBusiness, updateBusiness } = useUser()
  const [showConfirmBack, setShowConfirmBack] = useState<boolean>(false)
  const [dataBusiness, setDataBusiness] = useState<PropsAddBusiness>(business)
  const [imgLogo, setImgLogo] = useState<string | null>(
    business.logoUrl ? business.logoUrl : null
  )
  const [imgLogoWeb, setImgLogoWeb] = useState<string | null>(
    business.logoWebUrl ? business.logoWebUrl : null
  )
  const [charCount, setCharCount] = useState(
    business.description ? 200 - business.description.length : 200
  )
  const [formErrors, setFormErrors] = useState<FormErrors>(initialErrors)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    if (type === 'edit') {
      setDataBusiness(business)
    }
  }, [business, type])

  const handleBack = () => {
    if (showConfirmBack) {
      router.replace('/panel-de-control/negocios')
    }
    setShowConfirmBack(false)
  }

  const handleConfirmBack = () => {
    setShowConfirmBack(true)
  }

  const handleCancelBack = () => {
    setShowConfirmBack(false)
  }

  const validations = () => {
    const errorsForm: FormErrors = {}

    const regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/
    const regexHexColor = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/

    if (!dataBusiness.name.trim()) {
      errorsForm.name = `Este campo es obligatorio.`
    }

    if (dataBusiness.email && dataBusiness?.email !== '') {
      if (!regexEmail.test(dataBusiness.email)) {
        errorsForm.email = 'Correo no válido.'
      }
    }

    if (
      dataBusiness.primary_color &&
      !regexHexColor.test(dataBusiness.primary_color)
    ) {
      errorsForm.primary_color = 'Color hexadecimal no válido.'
    }

    if (
      dataBusiness.secondary_color &&
      !regexHexColor.test(dataBusiness.secondary_color)
    ) {
      errorsForm.secondary_color = 'Color hexadecimal no válido.'
    }

    if (
      dataBusiness.third_color &&
      !regexHexColor.test(dataBusiness.third_color)
    ) {
      errorsForm.third_color = 'Color hexadecimal no válido.'
    }

    return errorsForm
  }

  const getCharCountColor = () => {
    if (charCount <= 20) {
      return 'text-red-600'
    } else if (charCount <= 50) {
      return 'text-orange-600'
    } else {
      return 'text-gray-600 dark:text-gray-400'
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDataBusiness({ ...dataBusiness, [name]: value })
  }

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCharCount(200 - value.length)
    setDataBusiness({ ...dataBusiness, [name]: value })
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const err = validations()
    setFormErrors(err)

    if (Object.keys(err).length === 0) {
      if (type === 'add') {
        const response = await addBusiness({ dataBusiness })
        if (response) {
          toast({
            title: 'Negocio agregado.',
            description: 'Redireccionando...',
            className: 'bg-green-600'
          })

          setTimeout(() => {
            router.replace('/panel-de-control/negocios')
          }, 1000)
        }
      } else {
        const response = await updateBusiness({ dataBusiness })
        if (response) {
          toast({
            title: 'Negocio editado.',
            description: 'Redireccionando...',
            className: 'bg-green-600'
          })

          setTimeout(() => {
            router.replace('/panel-de-control/negocios')
          }, 1000)
        }
      }
    }
  }

  return (
    <div className="m-10">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-6 my-6 p-4 border border-gray-300 dark:border-gray-700 rounded-lg">
          <div className="w-1/3">
            <div className="flex m-4 ">
              <label htmlFor="logo" className="font-[600]">
                Foto de Negocio
              </label>
            </div>
            <div className="flex flex-col justify-center items-center mt-8">
              <div className="flexjustify-center items-center p-6 border border-primary-orange-500 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                <LogoHandler
                  imageUrl={imgLogo}
                  setDataBusiness={setDataBusiness}
                />
              </div>
            </div>
          </div>
          <div className="w-2/3 pt-6 px-8">
            <div className="flex flex-col gap-2 my-4">
              <div className="flex gap-4 items-center">
                <label htmlFor="name" className="flex font-[600] gap-2">
                  Nombre <span className="text-primary-orange-600">*</span>
                </label>
                {formErrors.name && <ErrorText text={formErrors.name} />}
              </div>
              <input
                type="text"
                name="name"
                className="bg-card border border-gray-300 dark:border-gray-700 rounded-lg p-2 focus:border-primary-orange-500 focus:outline-none focus:ring-0"
                value={dataBusiness.name}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2 my-4">
              <div className="flex gap-4 items-center">
                <label htmlFor="description" className="font-[600]">
                  Descripción
                </label>
                <div
                  className={`text-right italic font-extralight text-xs ${getCharCountColor()}`}
                >
                  ({charCount} caracteres restantes)
                </div>
              </div>
              <textarea
                name="description"
                className="bg-card border border-gray-300 dark:border-gray-700 rounded-lg p-2 focus:border-primary-orange-500 focus:outline-none focus:ring-0"
                value={dataBusiness.description}
                onChange={handleChangeTextArea}
                maxLength={200}
                rows={5}
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
          imgLogoWeb={imgLogoWeb}
          setImgLogoWeb={setImgLogoWeb}
        />
        <div className="flex justify-end mt-10">
          <Button
            type="button"
            className="gap-2 mr-2 font-bold text-background bg-red-600 transition duration-300 ease-in-out hover:scale-[1.02] hover:bg-red-600 border-none"
            onClick={handleConfirmBack}
          >
            <ImCross /> Cerrar
          </Button>
          <Button
            type="submit"
            className="gap-2 font-bold text-background bg-green-600 transition duration-300 ease-in-out hover:scale-[1.02] hover:bg-green-600 border-none"
          >
            {!loadingBusiness ? (
              <div className="flex gap-2 items-center">
                <FaCheck /> {type === 'add' ? 'Agregar' : 'Actualizar'}
              </div>
            ) : (
              <Loader className="mt-[1.8vh] ml-[1vw]" />
            )}
          </Button>
          {showConfirmBack && (
            <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex justify-center items-center">
              <div className="flex flex-col gap-4 justify-center items-center bg-background border border-primary-orange-600 p-8 rounded-lg shadow-md">
                <p>
                  Todos los cambios realizados se perderán. ¿Estás seguro de
                  cerrar el formulario?
                </p>
                <div className="flex justify-end gap-2">
                  <Button variant="secondary" onClick={handleCancelBack}>
                    No
                  </Button>
                  <Button onClick={() => handleBack()}>Sí</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}
