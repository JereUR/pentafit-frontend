'use client'


import { useToast } from '@/components/ui/use-toast'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import TestPage from './test';

export default function ConfirmationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const confirmation_token = searchParams.get('confirmation_token')

  return (
    <div>
      {confirmation_token&&<TestPage confirmation_token={confirmation_token}/>}
    </div>
  )
}
