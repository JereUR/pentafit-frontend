'use client'

import ExcelJS from 'exceljs'
import { SiMicrosoftexcel } from 'react-icons/si'
import React from 'react'
import { saveAs } from 'file-saver'

import { Button } from '@/components/ui/button'
import { Business } from '@/components/types/Business'
import useActivities from '@/components/hooks/useActivities'
import Loader from '@/components/Loader'

interface Props {
  business: Business
}

interface Data {
  ID?: number
  Nombre?: string
  Precio?: string
  Es_publica?: string
  Nombre_publico?: string
  Genera_cuotas?: string
  MP_disponible?: string
  Sesiones_máximas?: number
  Fecha_inicio?: string
  Fecha_fin?: string
  Tipo_de_cobro?: string
}

const ExportData: React.FC<Props> = ({ business }) => {
  const { getAllActivities, loading } = useActivities()

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
    const allActivities = await getAllActivities(business.id)

    if (allActivities.length > 0) {
      const data: Data[] = allActivities.map((activity) => {
        return {
          ID: activity.id,
          Nombre: activity.name,
          Precio: `$${activity.price}`,
          Es_publica: activity.is_public ? 'Si' : 'No',
          Nombre_publico: activity.public_name ? activity.public_name : '-',
          Genera_cuotas: activity.generate_invoice ? 'Si' : 'No',
          MP_disponible: activity.mp_available ? 'Si' : 'No',
          Sesiones_máximas: activity.max_sessions,
          Fecha_inicio: activity.start_date,
          Fecha_fin: activity.end_date,
          Tipo_de_cobro: activity.payment_type,
          Modalidad:activity.activity_type
        }
      })

      exportToExcel(data, `${business.name} - Actividades`)
    }
  }

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2 bg-card"
      onClick={handleExport}
    >
      {loading ? (
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
