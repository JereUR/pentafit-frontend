'use client'

import { useContext } from 'react'
import { ActivitiesContext } from '../context/ActivitiesContext'

export default function useActivities() {
  const context = useContext(ActivitiesContext)

  if (!context) {
    throw new Error('useActivities must be used within a ActivitiesContext')
  }

  return context
}
