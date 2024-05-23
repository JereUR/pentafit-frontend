import { Metadata } from 'next'
import { Card, CardContent, CardDescription } from '@/components/ui/card'
import {
  FaArrowDown,
  FaArrowUp,
  FaHandHoldingUsd,
  FaUsers
} from 'react-icons/fa'
import { IoStorefrontOutline } from 'react-icons/io5'
import Transactions from '@/components/dashboard/transactions/Transactions'
import RightBar from '@/components/dashboard/rightbar/RightBar'
import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6'

export const metadata: Metadata = {
  title: 'PentaFit - Panel de Control'
}

const cardsContent = [
  {
    id: 1,
    title: 'Usuarios Totales',
    icon: <FaUsers className="h-10 w-10 xl:h-12 xl:w-12 text-emerald-600" />,
    state: true,
    value: '135',
    stats: '24'
  },
  {
    id: 2,
    title: 'Ingresos Totales',
    icon: (
      <FaHandHoldingUsd className="h-10 w-10 xl:h-12 xl:w-12 text-orange-600" />
    ),
    state: true,
    value: '$2.000',
    stats: '32'
  },
  {
    id: 3,
    title: 'Gastos Totales',
    icon: (
      <IoStorefrontOutline className="h-10 w-10 xl:h-12 xl:w-12 text-violet-600" />
    ),
    state: false,
    value: '$2.000',
    stats: '15'
  }
]

export default function DashboardPage() {
  return (
    <div className="flex gap-5 mt-4">
      <div className="w-2/3 xl:w-3/4 flex flex-col">
        <div className="flex gap-2 justify-between p-5">
          {cardsContent.map((card) => (
            <Card
              key={card.id}
              className="px-2 py-6 w-full border-none shadow-md"
            >
              <CardContent className="flex items-center justify-center">
                <div className="w-1/3 xl:mr-[-30px]">{card.icon}</div>
                <div className="flex flex-col w-2/3 gap-2">
                  <span className="text-sm font-light">{card.title}</span>
                  <span className="flex items-center gap-2 font-bold">
                    {card.state ? (
                      <FaArrowTrendUp className="h-5 w-5 text-green-600" />
                    ) : (
                      <FaArrowTrendDown className="h-5 w-5 text-red-600" />
                    )}
                    <span className="text-xl">{card.value}</span>
                  </span>
                </div>
              </CardContent>
              <CardDescription className="flex ml-8 gap-1 italic">
                <span
                  className={`${
                    card.state ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {card.stats}%
                </span>
                <span>
                  {card.state ? 'más ' : 'menos '} que la semana pasada
                </span>
              </CardDescription>
            </Card>
          ))}
        </div>
        <div className="p-8 m-4">
          <p className="text-xl font-light mb-5">Últimas Transacciones</p>
          <Transactions />
        </div>
      </div>
      <div className="w-1/3 xl:w-1/4">
        <RightBar />
      </div>
    </div>
  )
}
