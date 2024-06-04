'use client'

import { useContext } from 'react'

import { PlansContext } from '../context/PlansContext'

export default function usePlans() {
  const context = useContext(PlansContext)

  if (!context) {
    throw new Error('usePlans must be used within a PlansContext')
  }

  return context
}
