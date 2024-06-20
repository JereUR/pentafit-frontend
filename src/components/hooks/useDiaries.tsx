'use client'

import { useContext } from 'react'

import { DiariesContext } from '../context/DiariesContext'

export default function useDiaries() {
  const context = useContext(DiariesContext)

  if (!context) {
    throw new Error('useDiaries must be used within a DiariesContext')
  }

  return context
}
