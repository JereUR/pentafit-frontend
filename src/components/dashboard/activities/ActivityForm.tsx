'use client'

import { CheckIcon } from '@radix-ui/react-icons'
import { ImCross } from 'react-icons/im'
import { IoSettings } from 'react-icons/io5'

import useActivities from '@/components/hooks/useActivities'
import { Button } from '@/components/ui/button'
import { FaCheck } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const payments = [
  'Por sesion',
  'Por período',
  'Mensual',
  'Mensual con sesiones'
]

const inputItems = [
  {
    label: 'Actividad',
    name: 'activity',
    type: 'text'
  },
  {
    label: 'Costo',
    name: 'cost',
    type: 'number'
  },
  {
    label: 'Sesiones Máximas',
    name: 'sessionMax',
    type: 'number'
  },
  {
    label: 'Fecha Desde',
    name: 'dateFrom',
    type: 'date'
  },
  {
    label: 'Fecha Hasta',
    name: 'dateUntil',
    type: 'date'
  }
]

const checkboxItems = [
  {
    label: '¿Es una actividad Pública? (Turnos/clase de prueba)',
    name: 'isPublic'
  },
  {
    label: '¿Permite generación de cuota?',
    name: 'quotaGeneration'
  },
  {
    label: '¿Permite pago con Mercado Pago?',
    name: 'mpAvailable'
  }
]

export default function ActivityForm() {
  const { addActivity } = useActivities()
  const [isPublic, setIsPublic] = useState(false)
  const [quotaGeneration, setQuotaGeneration] = useState(false)
  const [mpAvailable, setMpAvailable] = useState(false)
  const router = useRouter()

  return (
    <div>
      <form action={addActivity}>
        <div className="grid grid-cols-3 gap-8 mb-4">
          {inputItems.map((item) => (
            <div key={item.name} className="flex flex-col gap-2">
              <label htmlFor={item.name} className="font-[600]">
                {item.label}
              </label>
              <input
                type={item.type}
                name={item.name}
                placeholder={item.label}
                className="border border-gray-300 dark:border-gray-700 p-2 focus:border-primary-orange-500 focus:outline-none focus:ring-0"
              />
            </div>
          ))}
          <div className="flex flex-col gap-2">
            <label htmlFor="paymentType" className="font-[600]">
              Control de Pago
            </label>
            <select
              name="paymentType"
              className="border border-gray-300 dark:border-gray-700 p-[10px] cursor-pointer focus:border-primary-orange-500 focus:outline-none focus:ring-0"
            >
              {payments.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="border border-gray-300 dark:border-gray-700 mt-6 mb-8">
          <div className="border-b border-gray-300 dark:border-gray-700 py-4 px-6 bg-muted">
            <span className="flex items-center gap-2">
              <IoSettings /> Completá esta sección si la actividad puede ser
              reservada por el usuario
            </span>
          </div>
          <div className="grid grid-cols-3 gap-8 my-8 py-4 px-6">
            <div className="flex flex-col gap-4 ">
              <label htmlFor="isPublic" className="font-[600]">
                ¿Es una actividad Pública? (Turnos/clase de prueba)
              </label>
              <div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="isPublic"
                    defaultValue={isPublic ? 'true' : 'false'}
                    className="sr-only peer"
                    onChange={() => setIsPublic(!isPublic)}
                  />
                  <div className="group peer ring-0  bg-gradient-to-bl from-neutral-800 via-neutral-700 to-neutral-600 dark:from-gray-400 dark:via-gray-300 dark:to-gray-200  rounded-full outline-none duration-1000 after:duration-300 w-12 h-6  shadow-md  peer-focus:outline-none  after:content-[''] after:rounded-full after:absolute peer-checked:after:rotate-180 after:[background:conic-gradient(from_135deg,_#b2a9a9,_#b2a8a8,_#ffffff,_#d7dbd9_,_#ffffff,_#b2a8a8)]  after:outline-none after:h-4 after:w-4 after:top-1 after:left-1 peer-checked:after:translate-x-6 peer-hover:after:scale-95 peer-checked:bg-gradient-to-r peer-checked:from-emerald-500 peer-checked:to-emerald-900"></div>
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-4 ">
              <label htmlFor="isPublic" className="font-[600]">
                ¿Permite generación de cuota?
              </label>
              <div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="quotaGeneration"
                    defaultValue={quotaGeneration ? 'true' : 'false'}
                    className="sr-only peer"
                    onChange={() => setQuotaGeneration(!quotaGeneration)}
                  />
                  <div className="group peer ring-0  bg-gradient-to-bl from-neutral-800 via-neutral-700 to-neutral-600 dark:from-gray-400 dark:via-gray-300 dark:to-gray-200  rounded-full outline-none duration-1000 after:duration-300 w-12 h-6  shadow-md  peer-focus:outline-none  after:content-[''] after:rounded-full after:absolute peer-checked:after:rotate-180 after:[background:conic-gradient(from_135deg,_#b2a9a9,_#b2a8a8,_#ffffff,_#d7dbd9_,_#ffffff,_#b2a8a8)]  after:outline-none after:h-4 after:w-4 after:top-1 after:left-1 peer-checked:after:translate-x-6 peer-hover:after:scale-95 peer-checked:bg-gradient-to-r peer-checked:from-emerald-500 peer-checked:to-emerald-900"></div>
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-4 ">
              <label htmlFor="isPublic" className="font-[600]">
                ¿Permite pago con Mercado Pago?
              </label>
              <div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="mpAvailable"
                    defaultValue={mpAvailable ? 'true' : 'false'}
                    className="sr-only peer"
                    onChange={() => setMpAvailable(!mpAvailable)}
                  />
                  <div className="group peer ring-0  bg-gradient-to-bl from-neutral-800 via-neutral-700 to-neutral-600 dark:from-gray-400 dark:via-gray-300 dark:to-gray-200  rounded-full outline-none duration-1000 after:duration-300 w-12 h-6  shadow-md  peer-focus:outline-none  after:content-[''] after:rounded-full after:absolute peer-checked:after:rotate-180 after:[background:conic-gradient(from_135deg,_#b2a9a9,_#b2a8a8,_#ffffff,_#d7dbd9_,_#ffffff,_#b2a8a8)]  after:outline-none after:h-4 after:w-4 after:top-1 after:left-1 peer-checked:after:translate-x-6 peer-hover:after:scale-95 peer-checked:bg-gradient-to-r peer-checked:from-emerald-500 peer-checked:to-emerald-900"></div>
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="publicName" className="font-[600]">
                Nombre Público
              </label>
              <input
                type="text"
                name="publicName"
                placeholder="Nombre para mostrar"
                className="border border-gray-300 dark:border-gray-700 p-2 focus:border-primary-orange-500 focus:outline-none focus:ring-0"
              />
            </div>
          </div>
        </div>
        <div className="border border-blue-300 bg-blue-100 text-blue-500 text-sm p-4">
          <p>Control de pago:</p>
          <p>
            1° MENSUAL: No contempla sesiones, y la persona puede reservar
            turnos solo teniendo la cuota disponible.
          </p>
          <p>
            2° MENSUAL CON SESIONES: Contenpla las sesiones y solo permite
            reservar turno si este tiene sesiones disponibles para el período
          </p>
          <p>
            3° POR PERIODO: Contenpla sesiones y al generar la cuota se indica
            el período y la cantidad de sesiones de la misma
          </p>
          <p>
            4° POR SESION (pago individual): Se crea una sola sesión, la cual se
            deve pagar de a una.
          </p>
        </div>
        <div className="absolute right-8 mt-12">
          <Button
            type="button"
            className="gap-2 mr-2 font-bold text-background bg-red-600 transition duration-300 ease-in-out hover:scale-[1.02] hover:bg-red-600 border-none"
            onClick={() => router.replace('/panel-de-control/actividades')}
          >
            <ImCross /> Cerrar
          </Button>
          <Button
            type="submit"
            className="gap-2 font-bold text-background bg-green-600 transition duration-300 ease-in-out hover:scale-[1.02] hover:bg-green-600 border-none"
          >
            <FaCheck /> Guardar
          </Button>
        </div>
      </form>
    </div>
  )
}
