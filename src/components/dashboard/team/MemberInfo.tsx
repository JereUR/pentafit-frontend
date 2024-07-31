'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'

import useTeam from '@/components/hooks/useTeam'
import useUser from '@/components/hooks/useUser'
import { LastRecords, MemberRecord } from '@/components/types/Team'
import { User } from '@/components/types/User'
import noAvatar from '../../../../public/assets/noavatar.png'
import InfoActionModal from './InfoActionModal'

const MemberInfo = () => {
  const [user, setUser] = useState<User | null>(null)
  const [memberRecord, setMemberRecord] = useState<MemberRecord | null>(null)
  const [modalData, setModalData] = useState<any[]>([])
  const [modalTitle, setModalTitle] = useState<string>('')
  const [showModal, setShowModal] = useState<boolean>(false)
  const [modalType, setModalType] = useState<string>('')

  const pathname = usePathname()
  const id = pathname.split('/')[3]

  const { workingBusiness, getWorkingBusiness, token } = useUser()
  const {
    getMemberById,
    getRecordFromMember,
    getCreationsFromMember,
    getAssignmentsFromMember,
    getErasedFromMember,
    getUpdatesFromMember
  } = useTeam()

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

  const handleModalOpen = async (type: string) => {
    let data: any[] = []

    switch (type) {
      case 'creations':
        data = await getCreationsFromMember({ member_id: Number(id) })
        setModalTitle('Altas')
        break
      case 'assignments':
        data = await getAssignmentsFromMember({ member_id: Number(id) })
        setModalTitle('Asignaciones')
        break
      case 'erased':
        data = await getErasedFromMember({ member_id: Number(id) })
        setModalTitle('Bajas')
        break
      case 'updates':
        data = await getUpdatesFromMember({ member_id: Number(id) })
        setModalTitle('Ediciones')
        break
    }

    setModalData(data || [])
    setShowModal(true)
    setModalType(type)
  }

  if (!user || !memberRecord) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-4 bg-background rounded-lg shadow-md">
      <div className="flex">
        <div className="w-1/3 p-4 bg-card rounded-lg shadow flex flex-col items-center justify-center">
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

          <div className="mt-6 flex flex-col items-center w-full">
            <div className="flex flex-col bg-accent p-2 rounded-lg mb-2 w-full">
              <span className="w-full text-primary-orange-500 dark:text-primary-orange-600">
                Email:
              </span>
              <span className="w-full ml-4">{user.email}</span>
            </div>
            <div className="flex flex-col bg-accent p-2 rounded-lg mb-2 w-full">
              <span className="w-full text-primary-orange-500 dark:text-primary-orange-600">
                Fecha de Nacimiento:
              </span>
              <span className="w-full ml-4">{user.birthdate}</span>
            </div>
            <div className="flex flex-col bg-accent p-2 rounded-lg mb-2 w-full">
              <span className="w-full text-primary-orange-500 dark:text-primary-orange-600">
                Teléfono:
              </span>
              <span className="w-full ml-4">
                {user.phone ? user.phone : '-'}
              </span>
            </div>
            <div className="flex flex-col bg-accent p-2 rounded-lg mb-2 w-full">
              <span className="w-full text-primary-orange-500 dark:text-primary-orange-600">
                Dirección:
              </span>
              <span className="w-full ml-4">
                {user.address ? user.address : '-'}
              </span>
            </div>
            <div className="flex flex-col bg-accent p-2 rounded-lg mb-2 w-full">
              <span className="w-full text-primary-orange-500 dark:text-primary-orange-600">
                Género:
              </span>
              <span className="w-full ml-4">{user.gender}</span>
            </div>
            <div className="flex flex-col bg-accent p-2 rounded-lg mb-2 w-full">
              <span className="w-full text-primary-orange-500 dark:text-primary-orange-600">
                Negocios:
              </span>
              <span className="w-full ml-4">
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
            <div
              className="w-full bg-card p-4 rounded-lg shadow text-center cursor-pointer"
              onClick={() => handleModalOpen('creations')}
            >
              <h3 className="text-4xl font-semibold text-primary-orange-500 dark:text-primary-orange-600">
                {memberRecord.creations}
              </h3>
              <p>Altas</p>
            </div>
            <div
              className="w-full bg-card p-4 rounded-lg shadow text-center cursor-pointer"
              onClick={() => handleModalOpen('assignments')}
            >
              <h3 className="text-4xl font-semibold text-primary-orange-500 dark:text-primary-orange-600">
                {memberRecord.assignments}
              </h3>
              <p>Asignaciones</p>
            </div>
            <div
              className="w-full bg-card p-4 rounded-lg shadow text-center cursor-pointer"
              onClick={() => handleModalOpen('erased')}
            >
              <h3 className="text-4xl font-semibold text-primary-orange-500 dark:text-primary-orange-600">
                {memberRecord.erased}
              </h3>
              <p>Bajas</p>
            </div>
            <div
              className="w-full bg-card p-4 rounded-lg shadow text-center cursor-pointer"
              onClick={() => handleModalOpen('updates')}
            >
              <h3 className="text-4xl font-semibold text-primary-orange-500 dark:text-primary-orange-600">
                {memberRecord.updates}
              </h3>
              <p>Ediciones</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-4">Operaciones</h3>
          <div className="bg-card p-4 rounded-lg shadow h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-track-rounded scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-700">
            <div className="py-2">
              {memberRecord.last_records.map((record: LastRecords) => (
                <div key={record.id} className="border-b py-2">
                  <div className="flex justify-between bg-accent p-2 rounded-lg">
                    <div>
                      <p className="font-bold">{record.field}</p>
                      <p className="font-light text-sm text-gray-400">
                        {record.date}
                      </p>
                    </div>
                    <p
                      className={`px-2 py-1 rounded  ${
                        record.type === 'Creación' &&
                        'bg-green-200 text-green-600'
                      } ${
                        record.type === 'Asignación' &&
                        'bg-yellow-200 text-yellow-600'
                      } ${
                        record.type === 'Borrado' && 'bg-red-200 text-red-600'
                      } ${
                        record.type === 'Actualización' &&
                        'bg-blue-200 text-blue-600'
                      } flex items-center`}
                    >
                      {record.type}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <InfoActionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={modalTitle}
        data={modalData}
        type={modalType}
      />
    </div>
  )
}

export default MemberInfo
