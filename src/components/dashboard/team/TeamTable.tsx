'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

import Search from '../search/Search'
import SelectColumns from './SelectColumns'
import SelectItemsPerPage from '../SelectItemsPerPage'
import ExportData from './ExportData'
import CustomButton from '@/components/CustomButton'
import SelectedMembersActions from './SelectedMembersActions'
import WorkingBusiness from '../WorkingBusiness'
import CountItemsSkeleton from '../skeletons/CountItemsSkeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import TableSkeleton from '../skeletons/TableSkeleton'
import { Button } from '@/components/ui/button'
import Loader from '@/components/Loader'
import {
  Columns,
  initialColumns,
  initialDataAddMember,
  PropsAddMember
} from '@/components/types/Team'
import Pagination from '../pagination/Pagination'
import useTeam from '@/components/hooks/useTeam'
import useUser from '@/components/hooks/useUser'
import { Business } from '@/components/types/Business'
import MemberForm from './MemberForm'
import { User } from '@/components/types/User'

const TeamTable = () => {
  const [workingBusiness, setWorkingBusiness] = useState<Business | null>(null)
  const [selectedMembers, setSelectedMembers] = useState<number[]>([])
  const [selectAll, setSelectAll] = useState<boolean>(false)
  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState<number>(5)
  const [selectedColumns, setSelectedColumns] =
    useState<Columns>(initialColumns)
  const [showConfirmDeleteMap, setShowConfirmDeleteMap] = useState<{
    [key: number]: boolean
  }>({})
  const [showForm, setShowForm] = useState<boolean>(false)
  const [typeForm, setTypeForm] = useState<'add' | 'edit' | ''>('')
  const [dataMember, setDataMember] =
    useState<PropsAddMember>(initialDataAddMember)

  const router = useRouter()

  const searchParams = useSearchParams()
  const { token, getWorkingBusiness } = useUser()
  const {
    members,
    getMembers,
    loadingTeam,
    loadingTeamForm,
    deleteMembersById,
    count
  } = useTeam()

  useEffect(() => {
    async function getData() {
      const res = await getWorkingBusiness()
      if (res) {
        setWorkingBusiness(res)
      }
    }
    if (token) {
      getData()
    }
  }, [token])

  useEffect(() => {
    if (token && workingBusiness) {
      const q = searchParams.get('q') || ''
      const page = searchParams.get('page') || '1'
      getMembers({
        q,
        page,
        business_id: workingBusiness.id,
        ITEMS_PER_PAGE: selectedItemsPerPage
      })
    }
  }, [searchParams, token, workingBusiness, selectedItemsPerPage])

  useEffect(() => {
    if (window != undefined) {
      const columns = localStorage.getItem('columns-team')

      if (columns) {
        setSelectedColumns(JSON.parse(columns))
      }
    }
  }, [])

  const handleDelete = async (member: number) => {
    const membersToDelete = [member]

    const res = await deleteMembersById(membersToDelete)

    if (res) {
      setShowConfirmDeleteMap((prevState) => ({
        ...prevState,
        [member]: false
      }))
      window.location.reload()
    }
  }

  const handleConfirmDelete = (memberId: number) => {
    setShowConfirmDeleteMap((prevState) => ({
      ...prevState,
      [memberId]: true
    }))
  }

  const handleCancelDelete = (memberId: number) => {
    setShowConfirmDeleteMap((prevState) => ({
      ...prevState,
      [memberId]: false
    }))
  }

  const handleSelectAllChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked
    setSelectAll(checked)

    if (checked) {
      setSelectedMembers(members.map((member) => member.id))
    } else {
      setSelectedMembers([])
    }
  }

  const handleCheckboxChange = (
    memberId: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked
    const newSelectedMembers = checked
      ? [...selectedMembers, memberId]
      : selectedMembers.filter((id) => id !== memberId)

    setSelectedMembers(newSelectedMembers)
  }

  const handleAdd = () => {
    setShowForm(true)
    setTypeForm('add')
  }

  const handleEdit = (m: User) => {
    setDataMember({
      id: m.id,
      first_name: m.first_name,
      last_name: m.last_name,
      email: m.email,
      businesses: m.businesses,
      phone: m.phone,
      gender: m.gender ? m.gender : '',
      birthdate: m.birthdate ? new Date(m.birthdate) : new Date(),
      role: m.role
    })
    setShowForm(true)
    setTypeForm('edit')
  }

  return (
    <div className="m-10 bg-background p-1 rounded-lg w-[88vw]">
      <div className="flex justify-between">
        <WorkingBusiness workingBusiness={workingBusiness} />
        {workingBusiness && loadingTeam ? (
          <CountItemsSkeleton />
        ) : (
          <div className="mr-10">
            <Card className="px-4 py-2 border border-none rounded-lg">
              <CardHeader className="text-5xl text-center py-1 text-primary-orange-500 font-semibold dark:text-primary-orange-700">
                {members.length}
              </CardHeader>
              <CardContent className="text-lg py-1 font-medium">
                Usuarios Totales
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between my-4">
        <div className="flex justify-center gap-2">
          <Search placeholder="Buscar un usuario..." />
          <SelectColumns
            selectedColumns={selectedColumns}
            setSelectedColumns={setSelectedColumns}
          />
          <SelectItemsPerPage
            selectedItemsPerPage={selectedItemsPerPage}
            setSelectedItemsPerPage={setSelectedItemsPerPage}
          />
          {workingBusiness && members.length > 0 && (
            <ExportData business={workingBusiness} />
          )}
        </div>
        <div className="flex justify-center gap-4">
          <div onClick={handleAdd}>
            <CustomButton text="Agregar" />
          </div>
          {selectedMembers.length > 0 && (
            <SelectedMembersActions
              selectedMembers={selectedMembers}
              setSelectedMembers={setSelectedMembers}
            />
          )}
        </div>
      </div>

      {workingBusiness && loadingTeam && members ? (
        <TableSkeleton />
      ) : (
        <table className="transactions-table w-full mb-4 mt-8">
          <thead className="font-bold text-center text-muted bg-foreground text-xs xl:text-sm">
            <tr>
              <td className="px-2 py-5">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                  className="cursor-pointer h-5 w-5"
                />
              </td>
              {selectedColumns.first_name && (
                <td className="px-2 py-5">Nombre</td>
              )}
              {selectedColumns.last_name && (
                <td className="px-2 py-5">Apellido</td>
              )}
              {selectedColumns.email && <td className="px-2 py-5">Email</td>}
              {selectedColumns.role && <td className="px-2 py-5">Rol</td>}
              {selectedColumns.businesses && (
                <td className="px-2 py-5">Negocios a los que pertenece</td>
              )}
              {selectedColumns.phone && <td className="px-2 py-5">Teléfono</td>}

              {selectedColumns.birthdate && (
                <td className="px-2 py-5">Fecha de Nacimiento</td>
              )}
              {selectedColumns.gender && <td className="px-2 py-5">Género</td>}
              {selectedColumns.address && (
                <td className="px-2 py-5">Dirección</td>
              )}
              {selectedColumns.created_at && (
                <td className="px-2 py-5">Fecha de Creación de Usuario</td>
              )}
              <td className="px-2 py-5">Acciones</td>
            </tr>
          </thead>
          {members.length > 0 ? (
            <tbody className="text-foreground text-xs xl:text-sm font-light">
              {members.map((member) => (
                <tr
                  key={member.id}
                  className={`my-4 transition duration-300 ease-in-out hover:bg-muted cursor-pointer items-center text-center ${
                    selectedMembers.includes(member.id) &&
                    'bg-gray-300 dark:bg-gray-700'
                  }`}
                >
                  <td className="border-b border-foreground px-2 py-5">
                    <input
                      type="checkbox"
                      checked={selectedMembers.includes(member.id)}
                      onChange={(event) =>
                        handleCheckboxChange(member.id, event)
                      }
                      className="cursor-pointer h-5 w-5"
                    />
                  </td>
                  {selectedColumns.first_name && (
                    <td
                      className="border-b border-foreground px-2 py-5"
                      onClick={() =>
                        router.push(`/panel-de-control/equipo/${member.id}`)
                      }
                    >
                      {member.first_name}
                    </td>
                  )}
                  {selectedColumns.last_name && (
                    <td
                      className="border-b border-foreground px-2 py-5"
                      onClick={() =>
                        router.push(`/panel-de-control/equipo/${member.id}`)
                      }
                    >
                      {member.last_name}
                    </td>
                  )}
                  {selectedColumns.email && (
                    <td
                      className="border-b border-foreground px-2 py-5"
                      onClick={() =>
                        router.push(`/panel-de-control/equipo/${member.id}`)
                      }
                    >
                      {member.email}
                    </td>
                  )}
                  {selectedColumns.role && (
                    <td
                      className="border-b border-foreground px-2 py-5"
                      onClick={() =>
                        router.push(`/panel-de-control/equipo/${member.id}`)
                      }
                    >
                      {member.role}
                    </td>
                  )}
                  {selectedColumns.businesses && (
                    <td
                      className="border-b border-foreground px-2 py-5"
                      onClick={() =>
                        router.push(`/panel-de-control/equipo/${member.id}`)
                      }
                    >
                      {member.businesses
                        ? member.businesses
                            .map((business, index) => business.name)
                            .filter(String)
                            .join(' - ')
                        : '-'}
                    </td>
                  )}
                  {selectedColumns.phone && (
                    <td
                      className="border-b border-foreground px-2 py-5"
                      onClick={() =>
                        router.push(`/panel-de-control/equipo/${member.id}`)
                      }
                    >
                      {member.phone ? member.phone : '-'}
                    </td>
                  )}
                  {selectedColumns.birthdate && (
                    <td
                      className="border-b border-foreground px-2 py-5"
                      onClick={() =>
                        router.push(`/panel-de-control/equipo/${member.id}`)
                      }
                    >
                      {member.birthdate ? member.birthdate : '-'}
                    </td>
                  )}
                  {selectedColumns.gender && (
                    <td
                      className="border-b border-foreground px-2 py-5"
                      onClick={() =>
                        router.push(`/panel-de-control/equipo/${member.id}`)
                      }
                    >
                      {member.gender ? member.gender : '-'}
                    </td>
                  )}
                  {selectedColumns.address && (
                    <td
                      className="border-b border-foreground px-2 py-5"
                      onClick={() =>
                        router.push(`/panel-de-control/equipo/${member.id}`)
                      }
                    >
                      {member.address ? member.address : '-'}
                    </td>
                  )}
                  {selectedColumns.created_at && (
                    <td
                      className="border-b border-foreground px-2 py-5"
                      onClick={() =>
                        router.push(`/panel-de-control/equipo/${member.id}`)
                      }
                    >
                      {member.created_at}
                    </td>
                  )}
                  <td className="border-b border-foreground px-2 py-5">
                    <div className="flex justify-center gap-2">
                      <div>
                        <button
                          className="p-2 rounded-lg text-white bg-sky-600 border-none cursor-pointer transitiopn duration-300 ease-in-out hover:scale-105 hover:shadow-md"
                          onClick={() => handleEdit(member)}
                        >
                          <FaEdit />
                        </button>
                      </div>
                      <div>
                        <button
                          className="p-2 rounded-lg text-white bg-red-600 border-none cursor-pointer transitiopn duration-300 ease-in-out  hover:scale-105 hover:shadow-md"
                          onClick={() => handleConfirmDelete(member.id)}
                        >
                          <FaTrash />
                        </button>
                        {showConfirmDeleteMap[member.id] && (
                          <div className="fixed top-0 left-0 w-full h-full bg-black/30 z-50 flex justify-center items-center">
                            <div className="flex flex-col gap-4 justify-center items-center bg-background border border-primary-orange-600 p-8 rounded-lg shadow-md">
                              <p>
                                {`¿Está seguro de que desea eliminar al usuario '
                                ${member.first_name} ${member.last_name}'?`}
                              </p>
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="secondary"
                                  onClick={() => handleCancelDelete(member.id)}
                                >
                                  Cancelar
                                </Button>
                                <Button onClick={() => handleDelete(member.id)}>
                                  {loadingTeamForm ? (
                                    <Loader className="mt-[1.8vh] ml-[1vw]" />
                                  ) : (
                                    'Confirmar'
                                  )}
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody className="text-center">
              <tr>
                <td
                  colSpan={
                    Object.values(selectedColumns).filter(
                      (value) => value === true
                    ).length + 3
                  }
                  className="py-4 text-lg font-light italic border-b"
                >
                  Sin equipo.
                </td>
              </tr>
            </tbody>
          )}
        </table>
      )}
      <Pagination count={count} ITEMS_PER_PAGE={selectedItemsPerPage} />
      {showForm && workingBusiness && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div
            className={`absolute h-screen bottom-0 right-0 bg-background p-4 shadow-lg transform translate-x-0 transition duration-300 ease-in-out w-full max-w-lg ${
              showForm ? 'slide-in-left' : ''
            }`}
          >
            <MemberForm
              typeForm={typeForm}
              dataMember={dataMember}
              company_id={workingBusiness.id}
              setDataMember={setDataMember}
              setShowForm={setShowForm}
              selectedItemsPerPage={selectedItemsPerPage}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default TeamTable
