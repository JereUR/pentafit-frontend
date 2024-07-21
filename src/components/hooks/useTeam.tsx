'use client'

import { useContext } from 'react'

import { TeamContext } from '../context/TeamContext'

export default function useTeam() {
  const context = useContext(TeamContext)

  if (!context) {
    throw new Error('useTeam must be used within a TeamContext')
  }

  return context
}
