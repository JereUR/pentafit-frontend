'use client'

import { createContext, ReactNode, useState } from 'react'
import axios from 'axios'

import { useToast } from '../ui/use-toast'
import useUser from '../hooks/useUser'
import { User } from '../types/User'
import { PropsAddMember } from '../types/Team'
import { initialMembers } from '../db/TeamData'

type TeamContextType = {
  members: User[] | []
  loadingTeam: boolean
  loadingTeamForm: boolean
  count: number
  getAllMembers: (business_id: number) => Promise<User[] | []>
  getMembers: ({
    q,
    page,
    business_id,
    ITEMS_PER_PAGE
  }: {
    q: string
    page: string
    business_id: number
    ITEMS_PER_PAGE: number
  }) => Promise<void>
  getMemberById: ({
    id,
    business_id
  }: {
    id: string
    business_id: number
  }) => Promise<User | null>
  addMember: ({
    dataMember,
    company_id
  }: {
    dataMember: PropsAddMember
    company_id: number
  }) => Promise<boolean>
  updateMember: ({
    dataMember,
    company_id
  }: {
    dataMember: PropsAddMember
    company_id: number
  }) => Promise<boolean>
  deleteMembersById: (members: number[]) => Promise<boolean>
  addMembersToBusinesses: ({
    members,
    businesses
  }: {
    members: number[]
    businesses: number[]
  }) => Promise<boolean>
}

export const TeamContext = createContext<TeamContextType | null>(null)

export default function TeamContextProvider({
  children
}: {
  children: ReactNode
}) {
  const [members, setMembers] = useState<User[] | []>([])
  const [loadingTeam, setLoadingTeam] = useState<boolean>(true)
  const [loadingTeamForm, setLoadingTeamForm] = useState<boolean>(false)
  const [count, setCount] = useState(0)
  const { toast } = useToast()
  const { token } = useUser()
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL

  async function getAllMembers(business_id: number): Promise<User[] | []> {
    return initialMembers
    setLoadingTeam(true)
    const url = `${BASE_URL}api/v1/all_members?company_id=${business_id}`

    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      })

      if (response.status === 200 || response.status === 204) {
        return response.data
      } else {
        toast({
          title: 'Oh no! Algo salió mal.',
          description: response.statusText
        })
        return []
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Oh no! Algo salió mal.',
        description: error.message
      })
      return []
    } finally {
      setLoadingTeam(false)
    }
  }

  async function getMembers({
    q,
    page,
    business_id,
    ITEMS_PER_PAGE
  }: {
    q: string
    page: string
    business_id: number
    ITEMS_PER_PAGE: number
  }): Promise<void> {
    setLoadingTeam(true)
    const params = new URLSearchParams()
    params.append('regex', q)
    params.append('page', page)
    params.append('items_per_page', ITEMS_PER_PAGE.toString())
    params.append('company_id', business_id.toString())
    const url = `${BASE_URL}api/v1/members?${params.toString()}`

    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      })

      if (response.status === 200 || response.status === 204) {
        setMembers(response.data)
      } else {
        toast({
          title: 'Oh no! Algo salió mal.',
          description: response.statusText
        })
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Oh no! Algo salió mal.',
        description: error.message
      })
    } finally {
      setLoadingTeam(false)
      setMembers(initialMembers)
    }
  }

  async function getMemberById({
    id,
    business_id
  }: {
    id: string
    business_id: number
  }): Promise<User | null> {
    return initialMembers[0]
    setLoadingTeam(true)
    const params = new URLSearchParams()
    params.append('id', id)
    params.append('company_id', business_id.toString())
    const url = `${BASE_URL}api/v1/member?${params.toString()}`
    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      })

      if (response.status === 200 || response.status === 204) {
        return response.data
      } else {
        toast({
          title: 'Oh no! Algo salió mal.',
          description: response.statusText
        })
        return null
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Oh no! Algo salió mal.',
        description: error.message
      })
      return null
    } finally {
      setLoadingTeam(false)
    }
  }

  async function addMember({
    dataMember,
    company_id
  }: {
    dataMember: PropsAddMember
    company_id: number
  }): Promise<boolean> {
    setLoadingTeamForm(true)

    const newMember = {}

    const url = `${BASE_URL}api/v1/member`
    try {
      const response = await axios.post(
        url,
        {
          Team: newMember
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          }
        }
      )

      if (response.status === 201) {
        return true
      } else {
        toast({
          title: 'Oh no! Algo salió mal.',
          description: response.statusText
        })
        return false
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Oh no! Algo salió mal.',
        description: error.message
      })
      return false
    } finally {
      setLoadingTeamForm(false)
    }
  }

  async function updateMember({
    dataMember,
    company_id
  }: {
    dataMember: PropsAddMember
    company_id: number
  }): Promise<boolean> {
    setLoadingTeamForm(true)
    const newMember = {}

    const url = `${BASE_URL}api/v1/member`
    try {
      const response = await axios.put(
        url,
        {
          Team: newMember
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          }
        }
      )

      if (response.status === 200 || response.status === 204) {
        return true
      } else {
        toast({
          title: 'Oh no! Algo salió mal.',
          description: response.statusText
        })
        return false
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Oh no! Algo salió mal.',
        description: error.message
      })
      return false
    } finally {
      setLoadingTeamForm(false)
    }
  }

  async function deleteMembersById(members: number[]): Promise<boolean> {
    setLoadingTeam(true)
    const url = `${BASE_URL}api/v1/member`
    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: token
        },
        data: {
          ids: members
        }
      })

      if (response.status === 200 || response.status === 204) {
        toast({
          title: `Agendas con id:'${members.map(
            (member) => member
          )}' eliminadas.`,
          className: 'bg-green-600'
        })
        return true
      } else {
        toast({
          title: 'Oh no! Algo salió mal.',
          description: response.statusText
        })
        return false
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Oh no! Algo salió mal.',
        description: error.message
      })
      return false
    } finally {
      setLoadingTeam(false)
    }
  }

  async function addMembersToBusinesses({
    members,
    businesses
  }: {
    members: number[]
    businesses: number[]
  }): Promise<boolean> {
    console.log(members, businesses)
    setLoadingTeam(true)
    const url = `${BASE_URL}api/v1/duplicate_team`
    try {
      const response = await axios.post(
        url,
        {
          ids: members,
          company_ids: businesses
        },
        {
          headers: {
            Authorization: token
          }
        }
      )

      if (response.status === 200) {
        toast({
          title: `Actividades agregadas con éxito.`,
          className: 'bg-green-600'
        })
        return true
      } else {
        toast({
          title: 'Oh no! Algo salió mal.',
          description: response.statusText
        })
        return false
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Oh no! Algo salió mal.',
        description: error.message
      })
      return false
    } finally {
      setLoadingTeam(false)
    }
  }

  return (
    <TeamContext.Provider
      value={{
        members,
        loadingTeam,
        loadingTeamForm,
        count,
        getAllMembers,
        getMembers,
        getMemberById,
        addMember,
        updateMember,
        deleteMembersById,
        addMembersToBusinesses
      }}
    >
      {children}
    </TeamContext.Provider>
  )
}
