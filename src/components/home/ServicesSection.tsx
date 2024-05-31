import { IdCardIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import { MutableRefObject } from 'react'

import servicesImg from '../../../public/assets/services-test.png'

const services = [
  {
    id: 1,
    title: 'Service 1',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus dicta saepe, odio laudantium explicabo facilis rerum quidem aperiam verominus libero quaerat delectus laborum esse nisi neque ratione rem. Quae!',
    icon: <IdCardIcon className="w-8 h-8" />
  },
  {
    id: 2,
    title: 'Service 2',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus dicta saepe, odio laudantium explicabo facilis rerum quidem aperiam verominus libero quaerat delectus laborum esse nisi neque ratione rem. Quae!',
    icon: <IdCardIcon className="w-8 h-8" />
  },
  {
    id: 3,
    title: 'Service 3',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus dicta saepe, odio laudantium explicabo facilis rerum quidem aperiam verominus libero quaerat delectus laborum esse nisi neque ratione rem. Quae!',
    icon: <IdCardIcon className="w-8 h-8" />
  },
  {
    id: 4,
    title: 'Service 4',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus dicta saepe, odio laudantium explicabo facilis rerum quidem aperiam verominus libero quaerat delectus laborum esse nisi neque ratione rem. Quae!',
    icon: <IdCardIcon className="w-8 h-8" />
  },
  {
    id: 5,
    title: 'Service 5',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus dicta saepe, odio laudantium explicabo facilis rerum quidem aperiam verominus libero quaerat delectus laborum esse nisi neque ratione rem. Quae!',
    icon: <IdCardIcon className="w-8 h-8" />
  }
]

export default function ServicesSection({
  servicesRef
}: {
  servicesRef: MutableRefObject<HTMLDivElement | null>
}) {
  return (
    <>
      <div className="h-[100px]" ref={servicesRef}></div>
      <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-5 items-center h-screen pt-12 mt-6">
        {services.map((s) => (
          <div
            key={s.id}
            className={`w-full ${
              s.id === 5 ? 'lg:col-span-2 lg:w-[40%]' : 'md:w-[80%]'
            } min-h-[100px] p-8 mx-auto`}
          >
            <div className="my-6">
              <div>
                <p className="flex gap-3">
                  {s.icon}{' '}
                  <span className="text-2xl border-b border-white">
                    {s.title}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="ml-10 text-xl italic">{s.description}</div>
              <div
                className={`${
                  s.id === 5 ? 'h-[35vh] w-[35vw] ml-10' : 'h-[30vh] w-[30vw]'
                }`}
              >
                <Image
                  src={servicesImg}
                  width={200}
                  height={200}
                  alt="Service photo"
                  className="bg-gray-300 dark:bg-gray-200 my-4 rounded-xl "
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
