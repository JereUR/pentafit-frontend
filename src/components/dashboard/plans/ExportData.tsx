'use client'

import ExcelJS from 'exceljs'
import { SiMicrosoftexcel } from 'react-icons/si'
import React from 'react'
import { saveAs } from 'file-saver'

import { Button } from '@/components/ui/button'
import { Business } from '@/components/types/Business'
import usePlans from '@/components/hooks/usePlans'
import Loader from '@/components/Loader'

interface Props {
  business: Business
}

interface Data {
  ID?: number
  Nombre?: string
  Descripción?: string
  Precio?: string
  Fecha_inicio?: string
  Fecha_fin?: string
  Plazo_de_vencimiento?: number
  Genera_cuotas?: string
  Tipo_de_cobro?: string
  Tipo_de_plan?: string
  Ofrece_clase_de_prueba?: string
  Vigente?: string
  Numero_de_Actividades?: number
}

const ExportData: React.FC<Props> = ({ business }) => {
  const { getAllPlans, loadingPlan } = usePlans()

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
    const allPlans = await getAllPlans(business.id)

    if (allPlans.length > 0) {
      const data: Data[] = allPlans.map((plan) => {
        console.log(plan)
        return {
          ID: plan.id,
          Nombre: plan.name,
          Descripción: plan.description,
          Precio: `$${plan.price}`,
          Fecha_inicio: plan.start_date,
          Fecha_fin: plan.end_date,
          Plazo_de_vencimiento: plan.expiration_period,
          Tipo_de_cobro: plan.payment_type.toString(),
          Tipo_de_plan: plan.plan_type,
          Ofrece_clase_de_prueba: plan.free_test ? 'Si' : 'No',
          Vigente: plan.current ? 'Si' : 'No',
          Numero_de_Actividades: plan.activities
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
      {loadingPlan ? (
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
