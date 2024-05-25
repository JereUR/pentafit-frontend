import React, { ChangeEvent, Dispatch, SetStateAction } from 'react'
import ColorPicker from './ColorPicker'
import { PropsAddBusiness } from '@/components/types/Business'
import { FormErrors } from './BusinessForm'
import ErrorText from '@/components/ErrorText'

interface MetadataProps {
  dataBusiness: PropsAddBusiness
  setDataBusiness: Dispatch<SetStateAction<PropsAddBusiness>>
  formErrors: FormErrors
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const MetadataForm: React.FC<MetadataProps> = ({
  dataBusiness,
  setDataBusiness,
  formErrors,
  handleChange
}) => {
  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (/^#[0-9A-F]{0,6}$/i.test(value)) {
      setDataBusiness({ ...dataBusiness, [name]: value })
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
        </div>
      </div>
    </div>
  )
}

export default MetadataForm
