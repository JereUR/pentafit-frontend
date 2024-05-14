'use client'

import { useEffect } from 'react'

import { Button } from '@/components/ui/button'

export default function TestPage({ confirmation_token }) {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://38ad-190-191-171-9.ngrok-free.app/confirmation?confirmation_token=${confirmation_token}`
      )
      await console.log(response)
      console.log(data)
    }
    fetchData()
  }, [confirmation_token])

  return (
    <div>
      <h1>ConfirmationPage</h1>
      <Button onClick={() => router.replace('/iniciar-sesion')}>
        Iniciar Sesión
      </Button>
    </div>
  )
}
