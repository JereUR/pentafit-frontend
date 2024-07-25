'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import useUser from '@/components/hooks/useUser'
import { MdOutlineEdit } from 'react-icons/md'
import Modal from '@/components/Modal'
import PhotoCropper from './PhotoCropper'

const Profile = () => {
  const { user, getProfile, token, updateProfilePhoto } = useUser()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [imgSrc, setImgSrc] = useState('')

  useEffect(() => {
    if (token) {
      getProfile()
    }
  }, [token])

  if (!user) return null

  const handleEditClick = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="p-6 rounded-lg shadow-md w-[35vw]">
      <div className="flex flex-col items-center">
        {user.photo && (
          <div className="relative">
            <Image
              src={imgSrc || user.photo}
              alt={`${user.first_name} ${user.last_name}`}
              className="rounded-full w-24 h-24"
              width={96}
              height={96}
            />
            <button
              onClick={handleEditClick}
              className="absolute top-0 right-0 text-gray-400 dark:text-gray-600 border border-gray-300 dark:border-gray-500 bg-background p-1 rounded-full transition duration-300 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-foreground dark:hover:text-foreground"
            >
              <MdOutlineEdit className="h-4 w-4 " />
            </button>
          </div>
        )}
        <h2 className="text-xl font-semibold mt-4">
          {user.first_name} {user.last_name}
        </h2>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-full mt-4">
          Editar Información
        </button>
      </div>
      <div className="flex flex-col gap-4 mt-12">
        <div className="flex items-center bg-accent p-2 rounded-lg mb-2">
          <span className="w-1/3 text-primary-orange-500 dark:text-primary-orange-600">
            Email:
          </span>
          <span className="w-2/3">{user.email}</span>
        </div>
        <div className="flex items-center bg-accent p-2 rounded-lg mb-2">
          <span className="w-1/3 text-primary-orange-500 dark:text-primary-orange-600">
            Fecha de Nacimiento:
          </span>
          <span className="w-2/3">{user.birthdate}</span>
        </div>
        <div className="flex items-center bg-accent p-2 rounded-lg mb-2">
          <span className="w-1/3 text-primary-orange-500 dark:text-primary-orange-600">
            Teléfono:
          </span>
          <span className="w-2/3">{user.phone ? user.phone : '-'}</span>
        </div>
        <div className="flex items-center bg-accent p-2 rounded-lg mb-2">
          <span className="w-1/3 text-primary-orange-500 dark:text-primary-orange-600">
            Dirección:
          </span>
          <span className="w-2/3">{user.address ? user.address : '-'}</span>
        </div>
        <div className="flex items-center bg-accent p-2 rounded-lg mb-2">
          <span className="w-1/3 text-primary-orange-500 dark:text-primary-orange-600">
            Género:
          </span>
          <span className="w-2/3">{user.gender}</span>
        </div>
        <div className="flex items-center bg-accent p-2 rounded-lg mb-2">
          <span className="w-1/3 text-primary-orange-500 dark:text-primary-orange-600">
            Negocios:
          </span>
          <span className="w-2/3">
            {user.businesses.length
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
      {isModalOpen && (
        <Modal closeModal={closeModal}>
          <PhotoCropper
            closeModal={closeModal}
            updateProfilePhoto={updateProfilePhoto}
          />
        </Modal>
      )}
    </div>
  )
}

export default Profile
