import { TbArrowsRight } from 'react-icons/tb'

import useTeam from '@/components/hooks/useTeam'
import { ItemAssignment } from '@/components/types/Team'
import { User } from '@/components/types/User'
import { Cross1Icon } from '@radix-ui/react-icons'
import React, { useEffect, useState } from 'react'
import noAvatar from '../../../../public/assets/noavatar.png'
import Image from 'next/image'

interface InfoModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  data: any[]
  type: string
}

const InfoActionModal: React.FC<InfoModalProps> = ({
  isOpen,
  onClose,
  title,
  data,
  type
}) => {
  const [users, setUsers] = useState<User[]>([])
  const { getUsersByIds } = useTeam()

  useEffect(() => {
    if (type === 'assignments' && data.length > 0) {
      const assigmentIds = data.flatMap(
        (item: ItemAssignment) => item.assigment_to || []
      )
      getUsersByIds(assigmentIds).then(setUsers)
    }
  }, [type, data])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-card text-foreground p-6 rounded-lg shadow-lg w-3/4 max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-track-rounded scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-700">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose}>
            <Cross1Icon className="h-4 w-4 md:h-6 md:w-6 text-red-500 dark:text-red-600 transition duration-300 ease-in-out hover:scale-[1.07] hover:text-red-800 dark:hover:text-red-700" />
          </button>
        </div>
        <div className="p-4">
          {type === 'assignments'
            ? data.map((item: ItemAssignment, index: number) => (
                <div
                  key={index}
                  className="py-2 px-4 mb-4 flex justify-between items-center border border-gray-300 dark:border-gray-700 rounded-lg"
                >
                  <div>
                    <h2 className="font-semibold">{item.field}</h2>
                    <h5 className="font-light">{item.field_name.join(', ')}</h5>

                    <p className="text-sm text-gray-500">{item.date}</p>
                  </div>
                  <div>
                    <TbArrowsRight className='h-12 w-12 text-gray-500 dark:text-gray-300'/>
                  </div>
                  <div className='grid grid-cols-2 gap-2'>
                    {users.map((user) => (
                      <div key={user.id} className="flex items-center mb-2 gap-2 justify-center">
                        <Image
                          className="rounded-full w-8 h-8"
                          width={30}
                          height={30}
                          src={user.photo ? user.photo : noAvatar}
                          alt={`${user.first_name} ${user.last_name}`}
                        />
                        <p className="text-sm">{`${user.first_name} ${user.last_name}`}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            : data.map((item, index) => (
                <div key={index} className="py-2 px-4 mb-4 border flex justify-between items-center border-gray-300 dark:border-gray-700 rounded-lg">
                  <div>
                    <h2 className="font-semibold">{item.field}</h2>
                    <h5 className="font-light">{item.field_name}</h5>
                  </div>
                  <p className="text-sm text-gray-500">{item.date}</p>
                </div>
              ))}
        </div>
        <div className="flex justify-end p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-primary-orange-500 text-white rounded"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}

export default InfoActionModal
