import { PropsAddBusiness } from '@/components/types/Business'
import { FormErrors } from './BusinessForm'
import ErrorText from '@/components/ErrorText'

interface ContactProps {
  dataBusiness: PropsAddBusiness
  formErrors: FormErrors
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ContactForm: React.FC<ContactProps> = ({
  dataBusiness,
  formErrors,
  handleChange
}) => {
  return (
    <div className="border border-gray-300 dark:border-gray-700 my-4 rounded-lg">
      <p className="text-xl font-semibold p-4">Información de Contacto</p>
      <div className="grid grid-cols-2 gap-4 mx-8 mb-4 mt-2">
        <div className="flex flex-col gap-2">
          <div className="flex gap-4 items-center">
            <label htmlFor="email" className="font-[600]">
              Email
            </label>
            {formErrors.email && <ErrorText text={formErrors.email} />}
          </div>
          <input
            type="text"
            name="email"
            className="bg-card border border-gray-300 dark:border-gray-700 rounded-lg p-2 focus:border-primary-orange-500 focus:outline-none focus:ring-0"
            value={dataBusiness.email}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-4 items-center">
            <label htmlFor="address" className="font-[600]">
              Dirección
            </label>
            {formErrors.address && <ErrorText text={formErrors.address} />}
          </div>
          <input
            type="text"
            name="address"
            className="bg-card border border-gray-300 dark:border-gray-700 rounded-lg p-2 focus:border-primary-orange-500 focus:outline-none focus:ring-0"
            value={dataBusiness.address}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-4 items-center">
            <label htmlFor="phone" className="font-[600]">
              Teléfono
            </label>
            {formErrors.phone && <ErrorText text={formErrors.phone} />}
          </div>
          <input
            type="number"
            name="phone"
            className="bg-card phone-business border border-gray-300 dark:border-gray-700 rounded-lg p-2 focus:border-primary-orange-500 focus:outline-none focus:ring-0"
            value={dataBusiness.phone}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-4 items-center">
            <label htmlFor="instagram" className="font-[600]">
              Instagram
            </label>
            {formErrors.instagram && <ErrorText text={formErrors.instagram} />}
          </div>
          <input
            type="text"
            name="instagram"
            className="bg-card border border-gray-300 dark:border-gray-700 rounded-lg p-2 focus:border-primary-orange-500 focus:outline-none focus:ring-0"
            value={dataBusiness.instagram}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-4 items-center">
            <label htmlFor="facebook" className="font-[600]">
              Facebook
            </label>
            {formErrors.facebook && <ErrorText text={formErrors.facebook} />}
          </div>
          <input
            type="text"
            name="facebook"
            className="bg-card border border-gray-300 dark:border-gray-700 rounded-lg p-2 focus:border-primary-orange-500 focus:outline-none focus:ring-0"
            value={dataBusiness.facebook}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  )
}

export default ContactForm
