'use client'

import ExcelJS from 'exceljs'
import { SiMicrosoftexcel } from 'react-icons/si'
import React from 'react'
import { saveAs } from 'file-saver'

import { Button } from 'components/ui/button'
import { Business } from 'components/types/Business'
import useDiaries from 'components/hooks/useDiaries'
import Loader from 'components/Loader'
import { ExcelData } from 'components/types/Diary'

interface Props {
  business: Business
}

const daysOfWeek = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado'
]

const ExportData: React.FC<Props> = ({ business }) => {
  const { getAllDiaries, loadingDiary } = useDiaries()

  const exportToExcel = async (jsonData: ExcelData[], fileName: string) => {
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
    const allDiaries = await getAllDiaries(business.id)

    if (allDiaries.length > 0) {
      const data: ExcelData[] = allDiaries.map((diary) => {
        const daysAvailable: string[] = []
        const daysOffer: string[] = []

        diary.days_available.forEach((diary, index) => {
          if (diary) {
            daysAvailable.push(daysOfWeek[index])
          }
        })

        diary.offer_days?.forEach((offer, index) => {
          if (offer) {
            daysOffer.push(daysOfWeek[index])
          }
        })
        return {
          ID: diary.id,
          Tipo: diary.type_schedule,
          Actividad: diary.activity.name,
          Fecha_inicio: diary.date_from,
          Fecha_fin: diary.date_until,
          Dias_habilitados: daysAvailable.toString(),
          Repetir_por: diary.repeat_for,
          Días_de_ofertas: daysOffer.toString(),
          Duración: diary.term_duration,
          Cantidad_de_personas: diary.amount_of_people,
          Activa: diary.is_active ? 'Si' : 'No',
          Exclusividad_de_géneros: diary.genre_exclusive,
          Trabaja_feriados: diary.works_holidays ? 'Si' : 'No',
          Observaciones: diary.observations
        }
      })

      exportToExcel(data, `${business.name} - Agenda`)
    }
  }

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2 bg-card"
      onClick={handleExport}
    >
      {loadingDiary ? (
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
