'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

import ErrorText from '@/components/ErrorText'
import useUser from '@/components/hooks/useUser'
import { PropsAddBusiness } from '@/components/types/Business'
import MetadataForm from './MetadataForm'
import { Button } from '@/components/ui/button'
import ContactForm from './ContactForm'
import { useToast } from '@/components/ui/use-toast'
import noImage from '@public/assets/no-image.png'
import { useRouter } from 'next/navigation'
import { ImCross } from 'react-icons/im'
import { FaCheck } from 'react-icons/fa'
import Loader from '@/components/Loader'

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
  const { loading, addBusiness, updateBusiness } = useUser()
  const [dataBusiness, setDataBusiness] = useState<PropsAddBusiness>(business)
  const [imgLogo, setImgLogo] = useState<string | null>(
    business.logoUrl ? business.logoUrl : null
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

  const handleChangeLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]

      if (file && file.type.substring(0, 5) === 'image') {
        const imageUrl = URL.createObjectURL(file)
        setDataBusiness({ ...dataBusiness, logo: file })
        setImgLogo(imageUrl)
      } else {
        toast({
          variant: 'destructive',
          title: 'Archivo no compatible.',
          description: 'Solo archivos tipo .jpg, .jpeg y .png.'
        })
      }
    }
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
        <div className="flex gap-6 my-6 p-4 border border-gray-300 dark:border-gray-700 rounded-md shadow-md">
          <div className="w-1/3">
            <div className="flex">
              <label htmlFor="logo" className="font-[600]">
                Logo
              </label>
            </div>
            <div className="flex flex-col justify-center items-center p-4">
              <div className="logo-preview mb-4 w-40 h-40 border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden flex items-center justify-center bg-gray-50 dark:bg-gray-800">
                <Image
                  src={imgLogo ? imgLogo : noImage}
                  width={150}
                  height={150}
                  alt="Business logo"
                  className="object-contain m-2"
                />
              </div>
              <input
                type="file"
                id="logo"
                name="logo"
                accept="image/*"
                className="hidden" // Hide the default input
                onChange={handleChangeLogo}
              />
              <label
                htmlFor="logo"
                className="cursor-pointer bg-primary-orange-500 text-white py-2 px-4 rounded-md hover:bg-primary-orange-600 transition-all duration-300"
              >
                Subir logo
              </label>
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
                className="border border-gray-300 dark:border-gray-700 p-2 focus:border-primary-orange-500 focus:outline-none focus:ring-0"
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
                className="border border-gray-300 dark:border-gray-700 p-2 focus:border-primary-orange-500 focus:outline-none focus:ring-0"
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
        />
        <div className="flex justify-end mt-10">
          <Button
            type="button"
            className="gap-2 mr-2 font-bold text-background bg-red-600 transition duration-300 ease-in-out hover:scale-[1.02] hover:bg-red-600 border-none"
            onClick={() => router.replace('/panel-de-control/negocios')}
          >
            <ImCross /> Cerrar
          </Button>
          <Button
            type="submit"
            className="gap-2 font-bold text-background bg-green-600 transition duration-300 ease-in-out hover:scale-[1.02] hover:bg-green-600 border-none"
          >
            {!loading ? (
              <div className="flex gap-2 items-center">
                <FaCheck /> {type === 'add' ? 'Agregar' : 'Actualizar'}
              </div>
            ) : (
              <Loader className="mt-[1.8vh] ml-[1vw]" />
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
