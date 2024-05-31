import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import Image from 'next/image'

import ColorPicker from './ColorPicker'
import { PropsAddBusiness } from '@/components/types/Business'
import { FormErrors } from './BusinessForm'
import ErrorText from '@/components/ErrorText'
import noImage from '@public/assets/no-image.png'
import { useToast } from '@/components/ui/use-toast'

interface MetadataProps {
  dataBusiness: PropsAddBusiness
  setDataBusiness: Dispatch<SetStateAction<PropsAddBusiness>>
  formErrors: FormErrors
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  imgLogoWeb: string | null
  setImgLogoWeb: Dispatch<SetStateAction<string | null>>
}

const MetadataForm: React.FC<MetadataProps> = ({
  dataBusiness,
  setDataBusiness,
  formErrors,
  handleChange,
  imgLogoWeb,
  setImgLogoWeb
}) => {
  const { toast } = useToast()

  const handleHexChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (/^#[0-9A-F]{0,6}$/i.test(value)) {
      setDataBusiness({ ...dataBusiness, [name]: value })
    }
  }

  const handleChangeLogo = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]

      if (file && file.type.substring(0, 5) === 'image') {
        const imageUrl = URL.createObjectURL(file)
        setDataBusiness({ ...dataBusiness, logoWeb: file })
        setImgLogoWeb(imageUrl)
      } else {
        toast({
          variant: 'destructive',
          title: 'Archivo no compatible.',
          description: 'Solo archivos tipo .jpg, .jpeg y .png.'
        })
      }
    }
  }

  return (
    <div className="border border-gray-300 dark:border-gray-700 my-4">
      <p className="text-xl font-semibold p-4">
        Metadata{' '}
        <span className="text-sm italic font-light">
          (Configuraciones para App Web)
        </span>
      </p>
      <div className="grid grid-cols-2 p-4 m-4 mt-0 gap-4">
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
            <label htmlFor="slogan" className="font-[600]">
              Slogan
            </label>
            {formErrors.slogan && <ErrorText text={formErrors.slogan} />}
          </div>
          <input
            type="text"
            name="slogan"
            className="border border-gray-300 dark:border-gray-700 p-2 focus:border-primary-orange-500 focus:outline-none focus:ring-0"
            value={dataBusiness.slogan}
            onChange={handleChange}
          />
        </div>
        <div>
          <p className="my-2">Colores de Página Web</p>
          <div className="flex gap-10">
            <div className="flex gap-2 my-4 p-4 border border-gray-300 rounded-md dark:border-gray-700">
              <div className="flex flex-col justify-center items-center">
                <div className="flex gap-4 items-center">
                  <label htmlFor="primary_color" className="font-[600]">
                    Primario
                  </label>
                </div>
                <ColorPicker
                  value={dataBusiness.primary_color}
                  name="primary_color"
                  setDataBusiness={setDataBusiness}
                />
              </div>
              <div className="m-2 ml-4">
                <div className="flex gap-4 items-center">
                  <label
                    htmlFor="primary_color_hex"
                    className="text-sm font-light mb-1"
                  >
                    Hexadecimal
                  </label>
                  {formErrors.primary_color && (
                    <ErrorText text={formErrors.primary_color} />
                  )}
                </div>
                <input
                  type="text"
                  name="primary_color"
                  className="border border-gray-300 w-[7vw] dark:border-gray-700 p-1 focus:border-primary-orange-500 focus:outline-none focus:ring-0"
                  value={dataBusiness.primary_color}
                  onChange={handleHexChange}
                  maxLength={7}
                />
              </div>
            </div>
            <div className="flex gap-2 my-4 p-4 border border-gray-300 rounded-md dark:border-gray-700">
              <div className="flex flex-col justify-center items-center">
                <div className="flex gap-4 items-center">
                  <label htmlFor="secondary_color" className="font-[600]">
                    Secundario
                  </label>
                </div>
                <ColorPicker
                  value={dataBusiness.secondary_color}
                  name="secondary_color"
                  setDataBusiness={setDataBusiness}
                />
              </div>
              <div className="m-2 ml-4">
                <div className="flex gap-4 items-center">
                  <label
                    htmlFor="secondary_color_hex"
                    className="text-sm font-light mb-1"
                  >
                    Hexadecimal
                  </label>
                  {formErrors.secondary_color && (
                    <ErrorText text={formErrors.secondary_color} />
                  )}
                </div>
                <input
                  type="text"
                  name="secondary_color"
                  className="border border-gray-300 w-[7vw] dark:border-gray-700 p-1 focus:border-primary-orange-500 focus:outline-none focus:ring-0"
                  value={dataBusiness.secondary_color}
                  onChange={handleHexChange}
                  maxLength={7}
                />
              </div>
            </div>
            <div className="flex gap-2 my-4 p-4 border border-gray-300 rounded-md dark:border-gray-700">
              <div className="flex flex-col justify-center items-center">
                <div className="flex gap-4 items-center">
                  <label htmlFor="third_color" className="font-[600]">
                    Terciario
                  </label>
                </div>
                <ColorPicker
                  value={dataBusiness.third_color}
                  name="third_color"
                  setDataBusiness={setDataBusiness}
                />
              </div>
              <div className="m-2 ml-4">
                <div className="flex gap-4 items-center">
                  <label
                    htmlFor="third_color_hex"
                    className="text-sm font-light mb-1"
                  >
                    Hexadecimal
                  </label>
                  {formErrors.third_color && (
                    <ErrorText text={formErrors.third_color} />
                  )}
                </div>
                <input
                  type="text"
                  name="third_color"
                  className="border border-gray-300 w-[7vw] dark:border-gray-700 p-1 focus:border-primary-orange-500 focus:outline-none focus:ring-0"
                  value={dataBusiness.third_color}
                  onChange={handleHexChange}
                  maxLength={7}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center w-fit p-4">
            <div className="flex gap-4 items-center mb-6 -ml-10">
              <label htmlFor="logoWeb" className="font-[600]">
                Logo para App Web
              </label>
            </div>
            <div className="logo-preview mb-4 w-40 h-40 border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden flex items-center justify-center bg-gray-50 dark:bg-gray-800">
              <Image
                src={imgLogoWeb ? imgLogoWeb : noImage}
                width={150}
                height={150}
                alt="Business logo"
                className="object-contain m-2"
              />
            </div>
            <input
              type="file"
              id="logo"
              name="logoWeb"
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
      </div>
    </div>
  )
}

export default MetadataForm
