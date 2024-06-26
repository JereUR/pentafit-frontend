import Image from 'next/image'
import { Metadata } from 'next'

import photo from '../../../public/assets/banner-login.png'
import RegisterForm from 'components/session/RegisterForm'

export const metadata: Metadata = {
  title: 'PentaFit - Registrarse'
}

export default function RegisterPage() {
  return (
    <div className="grid grid-cols-2 w-full mt-[12vh] h-[88vh]">
      <div className="w-full m-4">
        <Image
          src={photo}
          alt="login-banner"
          objectFit="fill"
          className="h-[80vh]"
        />
      </div>
      <div>
        <RegisterForm />
      </div>
    </div>
  )
}
