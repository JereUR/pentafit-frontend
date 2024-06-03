'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

const invoices = [
  {
    id: 1,
    name: 'John Doe',
    imgSrc: '/assets/noavatar.png',
    status: 'Pendiente',
    date: '14.02.2023',
    amount: '$3100'
  },
  {
    id: 2,
    name: 'Jane Smith',
    imgSrc: '/assets/noavatar.png',
    status: 'Completado',
    date: '16.05.2023',
    amount: '$1500'
  },
  {
    id: 3,
    name: 'John Smith',
    imgSrc: '/assets/noavatar.png',
    status: 'Cancelado',
    date: '26.04.2023',
    amount: '$2300'
  },
  {
    id: 4,
    name: 'John Smith',
    imgSrc: '/assets/noavatar.png',
    status: 'Completado',
    date: '16.05.2023',
    amount: '$1500'
  },
  {
    id: 5,
    name: 'Jane Smith',
    imgSrc: '/assets/noavatar.png',
    status: 'Completado',
    date: '16.05.2023',
    amount: '$1500'
  }
]

export default function Transactions() {
  const router = useRouter()
  let total = 0

  invoices.forEach((invoice) => {
    total += parseFloat(invoice.amount.replace(/[^0-9.]/g, ''))
  })

  return (
    <Table>
      <TableHeader className="h-[6vh]">
        <TableRow>
          <TableHead className="w-[20vw]">Usuario</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead className="text-right">Monto</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow
            key={invoice.id}
            className="cursor-pointer"
            onClick={() =>
              router.push(`/panel-de-control/transacciones/${invoice.id}`)
            }
          >
            <TableCell className="font-medium">
              <div className="flex gap-3 items-center">
                <Image
                  className="object-cover rounded-full"
                  src={invoice.imgSrc}
                  alt={`${invoice.id} photo`}
                  width={40}
                  height={40}
                />
                {invoice.name}
              </div>
            </TableCell>
            <TableCell>
              <span
                className={`inline-flex items-center px-2 py-1 rounded-lg text-sm text-foreground ${
                  invoice.status === 'Pendiente' &&
                  'bg-yellow-400 bg-opacity-45'
                } ${
                  invoice.status === 'Completado' &&
                  'bg-green-200 bg-opacity-55'
                } ${
                  invoice.status === 'Cancelado' && 'bg-red-400 bg-opacity-55'
                }`}
              >
                {invoice.status}
              </span>
            </TableCell>
            <TableCell>{invoice.date}</TableCell>
            <TableCell className="text-right">{invoice.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter className="h-[6vh]">
        <TableRow>
          <TableCell colSpan={3} className="text-lg">
            Total
          </TableCell>
          <TableCell className="text-right">${total}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
