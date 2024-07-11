'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { FaEdit, FaTrash } from 'react-icons/fa'

import Search from '../search/Search'
import Pagination from '../pagination/Pagination'
import usePlans from 'components/hooks/usePlans'
import { Button } from 'components/ui/button'
import CustomButton from 'components/CustomButton'
import useUser from 'components/hooks/useUser'
import { Business } from 'components/types/Business'
import noImage from '../../../../public/assets/no-image.png'
import Loader from 'components/Loader'
import { Card, CardContent, CardHeader } from 'components/ui/card'
import SelectColumns from './SelectColumns'
import { Columns, initialColumns } from 'components/types/Plan'
import SelectedPlansActions from './SelectedPlansActions'
import ExportData from './ExportData'
import SelectItemsPerPage from '../SelectItemsPerPage'
import WorkingBusinessSkeleton from '../skeletons/WorkingBusinessSkeleton'
import TableSkeleton from '../skeletons/TableSkeleton'
import CountItemsSkeleton from '../skeletons/CountItemsSkeleton'
import WorkingBusiness from '../WorkingBusiness'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL

export default function PlansTable() {
  const [workingBusiness, setWorkingBusiness] = useState<Business | null>(null)
  const [selectedPlans, setSelectedPlans] = useState<number[]>([])
  const [selectAll, setSelectAll] = useState<boolean>(false)
  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState<number>(5)
  const [selectedColumns, setSelectedColumns] =
    useState<Columns>(initialColumns)
  const [showConfirmDeleteMap, setShowConfirmDeleteMap] = useState<{
    [key: number]: boolean
  }>({})

  const router = useRouter()

  const searchParams = useSearchParams()
  const { token, getWorkingBusiness, loadingBusiness } = useUser()
  const { plans, getPlans, loadingPlan, deletePlansById, count } = usePlans()

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
      getPlans({
        q,
        page,
        business_id: workingBusiness.id,
        ITEMS_PER_PAGE: selectedItemsPerPage
      })
    }
  }, [searchParams, token, workingBusiness, selectedItemsPerPage])

  useEffect(() => {
    if (window != undefined) {
      const columns = localStorage.getItem('columns-plans')

      if (columns) {
        setSelectedColumns(JSON.parse(columns))
      }
    }
  }, [])

  const handleDelete = async (plan: number) => {
    const plansToDelete = [plan]

    const res = await deletePlansById(plansToDelete)

    if (res) {
      setShowConfirmDeleteMap((prevState) => ({
        ...prevState,
        [plan]: false
      }))
      window.location.reload()
    }
  }

  const handleConfirmDelete = (planId: number) => {
    setShowConfirmDeleteMap((prevState) => ({
      ...prevState,
      [planId]: true
    }))
  }

  const handleCancelDelete = (planId: number) => {
    setShowConfirmDeleteMap((prevState) => ({
      ...prevState,
      [planId]: false
    }))
  }

  const handleSelectAllChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked
    setSelectAll(checked)

    if (checked) {
      setSelectedPlans(plans.map((plan) => plan.id))
    } else {
      setSelectedPlans([])
    }
  }

  const handleCheckboxChange = (
    planId: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked
    const newSelectedPlans = checked
      ? [...selectedPlans, planId]
      : selectedPlans.filter((id) => id !== planId)

    setSelectedPlans(newSelectedPlans)
  }

  return (
    <div className="container bg-background p-1 rounded-lg mt-10">
      <div className="flex justify-between">
        <WorkingBusiness workingBusiness={workingBusiness} />
        {workingBusiness && loadingPlan ? (
          <CountItemsSkeleton />
        ) : (
          <div className="mr-10">
            <Card className="px-4 py-2 border border-none rounded-lg">
              <CardHeader className="text-5xl text-center py-1 text-primary-orange-500 font-semibold dark:text-primary-orange-700">
                {plans.length}
              </CardHeader>
              <CardContent className="text-lg py-1 font-medium">
                Planes Totales
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between my-4">
        <div className="flex justify-center gap-2">
          <Search placeholder="Buscar un plan..." />
          <SelectColumns
            selectedColumns={selectedColumns}
            setSelectedColumns={setSelectedColumns}
          />
          <SelectItemsPerPage
            selectedItemsPerPage={selectedItemsPerPage}
            setSelectedItemsPerPage={setSelectedItemsPerPage}
          />
          {workingBusiness && plans.length > 0 && (
            <ExportData business={workingBusiness} />
          )}
        </div>
        <div className="flex justify-center gap-4">
          <Link href="/panel-de-control/facturacion/planes/agregar">
            <CustomButton text="Agregar" />
          </Link>
          {selectedPlans.length > 0 && (
            <SelectedPlansActions
              selectedPlans={selectedPlans}
              setSelectedPlans={setSelectedPlans}
            />
          )}
        </div>
      </div>
      {workingBusiness && loadingPlan && plans ? (
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
              {selectedColumns.name && <td className="px-2 py-5">Nombre</td>}
              {selectedColumns.description && (
                <td className="px-2 py-5">Descripción</td>
              )}
              {selectedColumns.price && <td className="px-2 py-5">Precio</td>}
              {selectedColumns.start_date && (
                <td className="px-2 py-5">Fecha desde</td>
              )}
              {selectedColumns.end_date && (
                <td className="px-2 py-5">Fecha hasta</td>
              )}
              {selectedColumns.expiration_period && (
                <td className="px-2 py-5">Plazo de vencimiento</td>
              )}
              {selectedColumns.generate_invoice && (
                <td className="px-2 py-5">Generación de cuotas</td>
              )}
              {selectedColumns.payment_type && (
                <td className="px-2 py-5">Tipo de cobro</td>
              )}
              {selectedColumns.plan_type && (
                <td className="px-2 py-5">Tipo de plan</td>
              )}
              {selectedColumns.free_test && (
                <td className="px-2 py-5">Ofrece clase de prueba</td>
              )}
              {selectedColumns.current && (
                <td className="px-2 py-5">Vigente </td>
              )}
              {selectedColumns.activities && (
                <td className="px-2 py-5">Actividades</td>
              )}
              <td className="px-2 py-5">Acción</td>
            </tr>
          </thead>
          {plans.length > 0 ? (
            <tbody className="text-foreground text-xs xl:text-sm font-light">
              {plans.map((plan) => (
                <tr
                  key={plan.id}
                  className={`my-4 transition duration-300 ease-in-out hover:bg-muted cursor-pointer items-center text-center ${
                    selectedPlans.includes(plan.id) &&
                    'bg-gray-300 dark:bg-gray-700'
                  }`}
                >
                  <td className="border-b border-foreground px-2 py-5">
                    <input
                      type="checkbox"
                      checked={selectedPlans.includes(plan.id)}
                      onChange={(event) => handleCheckboxChange(plan.id, event)}
                      className="cursor-pointer h-5 w-5"
                    />
                  </td>
                  {selectedColumns.name && (
                    <td
                      className="border-b border-foreground px-2 py-5"
                      onClick={() =>
                        router.push(`/panel-de-control/planes/${plan.id}`)
                      }
                    >
                      {plan.name}
                    </td>
                  )}
                  {selectedColumns.description && (
                    <td
                      className="border-b border-foreground px-2 py-5"
                      onClick={() =>
                        router.push(`/panel-de-control/planes/${plan.id}`)
                      }
                    >
                      {plan.description ? plan.description : '-'}
                    </td>
                  )}
                  {selectedColumns.price && (
                    <td
                      className="border-b border-foreground px-2 py-5"
                      onClick={() =>
                        router.push(`/panel-de-control/planes/${plan.id}`)
                      }
                    >
                      ${plan.price}
                    </td>
                  )}
                  {selectedColumns.start_date && (
                    <td
                      className="border-b border-foreground px-2 py-5"
                      onClick={() =>
                        router.push(`/panel-de-control/planes/${plan.id}`)
                      }
                    >
                      {plan.start_date}
                    </td>
                  )}
                  {selectedColumns.end_date && (
                    <td
                      className="border-b border-foreground px-2 py-5"
                      onClick={() =>
                        router.push(`/panel-de-control/planes/${plan.id}`)
                      }
                    >
                      {plan.end_date}
                    </td>
                  )}
                  {selectedColumns.expiration_period && (
                    <td
                      className="border-b border-foreground px-2 py-5"
                      onClick={() =>
                        router.push(`/panel-de-control/planes/${plan.id}`)
                      }
                    >
                      {plan.expiration_period}
                    </td>
                  )}
                  {selectedColumns.generate_invoice && (
                    <td
                      className="border-b border-foreground px-2 py-5"
                      onClick={() =>
                        router.push(`/panel-de-control/planes/${plan.id}`)
                      }
                    >
                      <div
                        className={`rounded-xl w-[3vw] ${
                          plan.generate_invoice ? 'bg-green-400 ' : 'bg-red-400'
                        } mx-auto`}
                      >
                        {plan.generate_invoice ? 'Sí' : 'No'}
                      </div>
                    </td>
                  )}
                  {selectedColumns.payment_type && (
                    <td
                      className="border-b border-foreground px-2 py-5"
                      onClick={() =>
                        router.push(`/panel-de-control/planes/${plan.id}`)
                      }
                    >
                      {plan?.payment_type?.map((payment, index) => {
                        if (index < plan.payment_type.length - 1) {
                          return payment + ' | '
                        } else {
                          return payment
                        }
                      })}
                    </td>
                  )}
                  {selectedColumns.plan_type && (
                    <td
                      className="border-b border-foreground px-2 py-5"
                      onClick={() =>
                        router.push(`/panel-de-control/planes/${plan.id}`)
                      }
                    >
                      {plan.plan_type}
                    </td>
                  )}
                  {selectedColumns.free_test && (
                    <td
                      className="border-b border-foreground px-2 py-5"
                      onClick={() =>
                        router.push(`/panel-de-control/planes/${plan.id}`)
                      }
                    >
                      <div
                        className={`rounded-xl w-[3vw] ${
                          plan.free_test ? 'bg-green-400 ' : 'bg-red-400'
                        } mx-auto`}
                      >
                        {plan.free_test ? 'Sí' : 'No'}
                      </div>
                    </td>
                  )}
                  {selectedColumns.current && (
                    <td
                      className="border-b border-foreground px-2 py-5"
                      onClick={() =>
                        router.push(`/panel-de-control/planes/${plan.id}`)
                      }
                    >
                      {plan.current ? plan.current : '-'}
                    </td>
                  )}

                  {selectedColumns.activities && (
                    <td
                      className="border-b border-foreground px-2 py-5"
                      onClick={() =>
                        router.push(`/panel-de-control/planes/${plan.id}`)
                      }
                    >
                      {plan?.activities}
                    </td>
                  )}
                  <td className="border-b border-foreground px-2 py-5">
                    <div className="flex justify-center gap-2">
                      <div>
                        <Link
                          href={`/panel-de-control/facturacion/planes/editar/${plan.id}`}
                        >
                          <button className="p-2 rounded-lg text-white bg-sky-600 border-none cursor-pointer transitiopn duration-300 ease-in-out hover:scale-105 hover:shadow-md">
                            <FaEdit />
                          </button>
                        </Link>
                      </div>
                      <div>
                        <button
                          className="p-2 rounded-lg text-white bg-red-600 border-none cursor-pointer transitiopn duration-300 ease-in-out  hover:scale-105 hover:shadow-md"
                          onClick={() => handleConfirmDelete(plan.id)}
                        >
                          <FaTrash />
                        </button>
                        {showConfirmDeleteMap[plan.id] && (
                          <div className="fixed top-0 left-0 w-full h-full bg-black/30 z-50 flex justify-center items-center">
                            <div className="flex flex-col gap-4 justify-center items-center bg-background border border-primary-orange-600 p-8 rounded-lg shadow-md">
                              <p>
                                {`¿Está seguro de que desea eliminar la actividad '
                                ${plan.name}'?`}
                              </p>
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="secondary"
                                  onClick={() => handleCancelDelete(plan.id)}
                                >
                                  Cancelar
                                </Button>
                                <Button onClick={() => handleDelete(plan.id)}>
                                  {loadingPlan ? (
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
                    ).length + 2
                  }
                  className="py-4 text-lg font-light italic border-b"
                >
                  Sin planes.
                </td>
              </tr>
            </tbody>
          )}
        </table>
      )}
      <Pagination count={count} ITEMS_PER_PAGE={selectedItemsPerPage} />
    </div>
  )
}
