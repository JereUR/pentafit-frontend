'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { Button } from 'components/ui/button'
import { useToast } from 'components/ui/use-toast'

export default function ConfirmationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const confirmation_token = searchParams.get('confirmation_token')
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${BASE_URL}confirmation?confirmation_token=${confirmation_token}`
      )

      if (!response.ok) {
        toast({
          variant: 'destructive',
          title: 'Oh no! Algo salió mal.',
          description: response.status
        })
        console.error('Error en la petición:', response.status)
        return
      }
      const data = await response.json()
    }
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
