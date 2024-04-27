import LoginForm from '@/components/LoginForm'
import React from 'react'

export default function LoginPage() {
  return (
    <div className="grid grid-cols-2 w-full mt-[12vh] h-[88vh]">
      <div className="w-full h-full border border-foreground text-center">
        <span>PHOTO</span>
      </div>
      <div>
        <LoginForm />
      </div>
    </div>
  )
}
