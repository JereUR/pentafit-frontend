'use client'

import useActivities from '@/components/hooks/useActivities'
import { Button } from '@/components/ui/button'
import { CheckIcon, Cross1Icon } from '@radix-ui/react-icons'
import React from 'react'
import { IoSettings } from 'react-icons/io5'

const payments = [
  'Por sesion',
  'Por período',
  'Mensual',
  'Mensual con sesiones'
]

export default function ActivityForm() {
  const { addActivity } = useActivities()
  return (
    <div className="">
      <form action={addActivity}>
        <div className="grid grid-cols-3 gap-8 mb-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="activity" className="">
              Actividad
            </label>
            <input
              type="text"
              name="activity"
              placeholder="Actividad"
              className=""
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="cost" className="">
              Costo
            </label>
            <input type="text" name="cost" placeholder="Costo" className="" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="dateFrom" className="">
              Fecha Desde
            </label>
            <input type="date" name="dateFrom" className="" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="dateUntil" className="">
              Fecha hasta
            </label>
            <input type="date" name="dateUntil" className="" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="paymentType" className="">
              Control de Pago
            </label>
            <select name="paymentType" id="">
              {payments.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="">
            <label htmlFor="sessionMax" className="">
              Sesiones Máximas
            </label>
            <input type="number" name="sessionMax" className="" />
          </div>
        </div>
        <div>
          <div>
            <span className="flex items-center gap-2">
              <IoSettings /> Completá esta sección si la actividad puede ser
              reservada por el usuario
            </span>
          </div>
          <div>
            <div>
              <label htmlFor="isPublic" className="">
                ¿Es una actividad Pública? (Turnos/clase de prueba)
              </label>
            </div>
            <div>
              <label htmlFor="quotaGeneration" className="">
                ¿Permite generación de cuota?
              </label>
            </div>
            <div>
              <label htmlFor="publicName" className="">
                ¿Permite generación de cuota?
              </label>
            </div>
            <div className="">
              <label htmlFor="publicName" className="">
                Nombre Público
              </label>
              <input
                type="text"
                name="publicName"
                placeholder="Nombre para mostrar"
                className=""
              />
            </div>
            <div>
              <label htmlFor="publicName" className="">
                ¿Permite pago con Mercado Pago?
              </label>
            </div>
          </div>
          <div>
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
              4° POR SESION (pago individual): Se crea una sola sesión, la cual
              se deve pagar de a una.
            </p>
          </div>
        </div>
        <div className="absolute right-8">
          <Button type="button" className="gap-2 mr-2">
            <Cross1Icon /> Cerrar
          </Button>
          <Button type="submit" className="gap-2">
            <CheckIcon /> Guardar
          </Button>
        </div>
      </form>
    </div>
  )
}
