'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'

import useTeam from '@/components/hooks/useTeam'
import useUser from '@/components/hooks/useUser'
import { Item, MemberRecord } from '@/components/types/Team'
import { User } from '@/components/types/User'
import noAvatar from '../../../../public/assets/noavatar.png'

const MemberInfo = () => {
  const [user, setUser] = useState<User | null>(null)
  const [memberRecord, setMemberRecord] = useState<MemberRecord | null>(null)

  const pathname = usePathname()
  const id = pathname.split('/')[3]

  const { workingBusiness, getWorkingBusiness, token } = useUser()
  const { getMemberById, getRecordFromMember } = useTeam()

  useEffect(() => {
    if (token && !workingBusiness) {
      getWorkingBusiness()
    }
  }, [token, workingBusiness])

  useEffect(() => {
    if (id && workingBusiness) {
      const fetchData = async () => {
        const userData = await getMemberById({ id: id as string })
        setUser(userData)

        if (userData) {
          const recordData = await getRecordFromMember({
            member_id: userData.id
          })
          setMemberRecord(recordData)
        }
      }

      fetchData()
    }
  }, [id, workingBusiness])

  if (!user || !memberRecord) {
    return <div>Loading...</div>
  }

  const creationCount = memberRecord.creations.length
  const assignmentCount = memberRecord.assignments.length
  const erasedCount = memberRecord.erased.length
  const updateCount = memberRecord.updates.length

  return (
    <div className="p-4 bg-background rounded-lg shadow-md">
      <div className="flex">
        <div className="w-1/3 p-4 bg-card rounded-lg shadow">
          <Image
            className="rounded-full w-32 h-32 mx-auto"
            width={150}
            height={150}
            src={user.photo ? user.photo : noAvatar}
            alt={`${user.first_name} ${user.last_name}`}
          />
          <h2 className="text-center text-xl font-semibold mt-2">{`${user.first_name} ${user.last_name}`}</h2>
          <p className="text-center text-green-500">
            {user.role || 'Sin rol asignado'}
          </p>

          <div className="mt-6">
            <div className="flex flex-col bg-accent p-2 rounded-lg mb-2">
              <span className="w-1/3 text-primary-orange-500 dark:text-primary-orange-600">
                Email:
              </span>
              <span className="w-2/3 ml-4">{user.email}</span>
            </div>
            <div className="flex flex-col bg-accent p-2 rounded-lg mb-2">
              <span className="w-1/3 text-primary-orange-500 dark:text-primary-orange-600">
                Fecha de Nacimiento:
              </span>
              <span className="w-2/3 ml-4">{user.birthdate}</span>
            </div>
            <div className="flex flex-col bg-accent p-2 rounded-lg mb-2">
              <span className="w-1/3 text-primary-orange-500 dark:text-primary-orange-600">
                Teléfono:
              </span>
              <span className="w-2/3 ml-4">
                {user.phone ? user.phone : '-'}
              </span>
            </div>
            <div className="flex flex-col bg-accent p-2 rounded-lg mb-2">
              <span className="w-1/3 text-primary-orange-500 dark:text-primary-orange-600">
                Dirección:
              </span>
              <span className="w-2/3 ml-4">
                {user.address ? user.address : '-'}
              </span>
            </div>
            <div className="flex flex-col bg-accent p-2 rounded-lg mb-2">
              <span className="w-1/3 text-primary-orange-500 dark:text-primary-orange-600">
                Género:
              </span>
              <span className="w-2/3 ml-4">{user.gender}</span>
            </div>
            <div className="flex flex-col bg-accent p-2 rounded-lg mb-2">
              <span className="w-1/3 text-primary-orange-500 dark:text-primary-orange-600">
                Negocios:
              </span>
              <span className="w-2/3 ml-4">
                {user.businesses && user.businesses.length
                  ? user.businesses.map((business, index) => (
                      <span key={business.id}>
                        {business.name}
                        {index < user.businesses.length - 1 && (
                          <span className="mx-2">-</span>
                        )}
                      </span>
                    ))
                  : 'Sin negocios asignados.'}
              </span>
            </div>
          </div>
        </div>
        <div className="w-2/3 ml-4 p-4">
          <div className="flex justify-between gap-4 mb-4">
            <div className="w-full bg-card p-4 rounded-lg shadow text-center">
              <h3 className="text-2xl font-semibold">{creationCount}</h3>
              <p>Altas</p>
            </div>
            <div className="w-full bg-card p-4 rounded-lg shadow text-center">
              <h3 className="text-2xl font-semibold">{assignmentCount}</h3>
              <p>Asignaciones</p>
            </div>
            <div className="w-full bg-card p-4 rounded-lg shadow text-center">
              <h3 className="text-2xl font-semibold">{erasedCount}</h3>
              <p>Bajas</p>
            </div>
            <div className="w-full bg-card p-4 rounded-lg shadow text-center">
              <h3 className="text-2xl font-semibold">{updateCount}</h3>
              <p>Ediciones</p>
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-4">Operaciones</h3>
          <div className="bg-card p-4 rounded-lg shadow max-h-[66vh] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-track-rounded scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-700">
            <div className='py-2'>
              {memberRecord.assignments.map((assignment: Item) => (
                <div key={assignment.id} className="border-b py-2">
                  <div className="flex justify-between bg-accent p-2 rounded-lg">
                    <div>
                      <p className="font-semibold">{assignment.field_name}</p>
                      <p>{assignment.date}</p>
                    </div>
                    <p
                      className="px-2 py-1 rounded bg-blue-200 text-blue-600 flex items-center"
                    >
                      Asignado
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div>
              {memberRecord.creations.map((creation: Item) => (
                <div key={creation.id} className="border-b py-2">
                  <div className="flex justify-between bg-accent p-2 rounded-lg">
                    <div>
                      <p className="font-semibold">{creation.field_name}</p>
                      <p>{creation.date}</p>
                    </div>
                    <p className="px-2 py-1 rounded bg-green-200 text-green-600 flex items-center">
                      Creado
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div>
              {memberRecord.erased.map((erased: Item) => (
                <div key={erased.id} className="border-b py-2">
                  <div className="flex justify-between bg-accent p-2 rounded-lg">
                    <div>
                      <p className="font-semibold">{erased.field_name}</p>
                      <p>{erased.date}</p>
                    </div>
                    <p className="px-2 py-1 rounded bg-red-200 text-red-600 flex items-center">
                      Borrado
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div>
              {memberRecord.updates.map((update: Item) => (
                <div key={update.id} className="border-b py-2">
                  <div className="flex justify-between bg-accent p-2 rounded-lg">
                    <div>
                      <p className="font-semibold">{update.field_name}</p>
                      <p>{update.date}</p>
                    </div>
                    <p className="px-2 py-1 rounded bg-yellow-200 text-yellow-600 flex items-center">
                      Actualizado
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemberInfo
