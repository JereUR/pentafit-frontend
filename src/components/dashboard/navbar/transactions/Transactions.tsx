import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import Image from 'next/image'

const invoices = [
  {
    id: 1,
    name: 'John Doe',
    imgSrc: '/assets/noavatar.png',
    status: 'Pending',
    date: '14.02.2023',
    amount: '$3100'
  },
  {
    id: 2,
    name: 'Jane Smith',
    imgSrc: '/assets/noavatar.png',
    status: 'Done',
    date: '16.05.2023',
    amount: '$1500'
  },
  {
    id: 3,
    name: 'John Smith',
    imgSrc: '/assets/noavatar.png',
    status: 'Cancelled',
    date: '26.04.2023',
    amount: '$2300'
  },
  {
    id: 4,
    name: 'John Smith',
    imgSrc: '/assets/noavatar.png',
    status: 'Done',
    date: '16.05.2023',
    amount: '$1500'
  },
  {
    id: 5,
    name: 'Jane Smith',
    imgSrc: '/assets/noavatar.png',
    status: 'Done',
    date: '16.05.2023',
    amount: '$1500'
  }
]

export default function Transactions() {
  let total = 0

  invoices.forEach((invoice) => {
    total += parseFloat(invoice.amount.replace(/[^0-9.]/g, ''))
  })

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Usuario</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead className="text-right">Monto</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
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
            <TableCell>{invoice.status}</TableCell>
            <TableCell>{invoice.date}</TableCell>
            <TableCell className="text-right">{invoice.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">${total}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
