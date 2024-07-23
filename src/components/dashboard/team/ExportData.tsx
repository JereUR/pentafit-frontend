'use client'

import ExcelJS from 'exceljs'
import { SiMicrosoftexcel } from 'react-icons/si'
import React from 'react'
import { saveAs } from 'file-saver'

import { Button } from 'components/ui/button'
import { Business } from 'components/types/Business'
import Loader from 'components/Loader'
import useTeam from '@/components/hooks/useTeam'

interface Props {
  business: Business
}

interface Data {
  ID?: number
  Nombre?: string
  Apellido?: string
  Email?: string
  Rol?: string
  Negocios_a_los_que_pertenece?: number
  Fecha_de_nacimiento: string
  Género?: string
  Fecha_de_creación_de_usuario: string
}

const ExportData: React.FC<Props> = ({ business }) => {
  const { getAllMembers, loadingTeam } = useTeam()

  const exportToExcel = async (jsonData: Data[], fileName: string) => {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Sheet1')

    const headers = Object.keys(jsonData[0])
    worksheet.addRow(headers)

    jsonData.forEach((data) => {
      worksheet.addRow(Object.values(data))
    })

    const buffer = await workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    })
    saveAs(blob, `${fileName}.xlsx`)
  }

  const handleExport = async () => {
    const allMembers = await getAllMembers(business.id)

    if (allMembers.length > 0) {
      const data: Data[] = allMembers.map((member) => {
        return {
          ID: member.id,
          Nombre: member.first_name,
          Apellido: member.last_name,
          Email: member.email,
          Rol: member.role ? member.role : 'Sin determinar',
          Negocios_a_los_que_pertenece: member.businesses.length,
          Fecha_de_nacimiento: member.birthdate,
          Género: member.gender,
          Fecha_de_creación_de_usuario: member.created_at
        }
      })

      exportToExcel(data, `${business.name} - Equipo`)
    }
  }

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2 bg-card"
      onClick={handleExport}
    >
      {loadingTeam ? (
        <Loader className="mt-[1.8vh] ml-[1vw]" />
      ) : (
        <>
          <SiMicrosoftexcel className="w-5 h-5" />
          Exportar
        </>
      )}
    </Button>
  )
}

export default ExportData
