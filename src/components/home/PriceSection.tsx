import React from 'react'

interface Props {
  title: string
  description: string[]
  price: string
}

const PriceSection: React.FC<Props> = ({ title, description, price }) => {
  return (
    <div className="flex flex-col bg-card text-foreground rounded-3xl shadow-lg flex-1 m-4">
      {' '}
      {/* Added flex-1 and margin */}
      <div className="px-6 py-8 sm:p-10 sm:pb-6 flex flex-col flex-grow">
        <div className="flex-grow">
          <h2 className="text-lg xl:text-xl font-medium tracking-tighter lg:text-3xl pb-4 border-b">
            {title}
          </h2>
          <div className="m-2 mt-4">
            {description.map((item) => (
              <p
                key={item}
                className="text-sm xl:text-base italic text-gray-500 dark:text-gray-300"
              >
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className="mt-6 pt-4 border-t">
          <p className="text-center">
            <span className="text-2xl xl:text-4xl font-light tracking-tight">
              {price}
            </span>
            <span className="text-base font-medium"> /mes </span>
          </p>
        </div>
      </div>
      <div className="flex px-6 pb-8 sm:px-8">
        <a
          className="flex items-center justify-center w-full px-6 py-2.5 text-center text-white dark:text-black duration-200 bg-foreground border-2 border-white dark:border-black rounded-full nline-flex hover:bg-transparent hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white focus:outline-none focus-visible:outline-black text-sm"
          href="#"
        >
          Contratar
        </a>
      </div>
    </div>
  )
}

export default PriceSection
