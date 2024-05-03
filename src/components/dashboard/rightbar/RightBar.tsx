import Image from 'next/image'
import { MdPlayCircleFilled, MdReadMore } from 'react-icons/md'

const RightBar = () => {
  return (
    <div className="fixed mr-1">
      <div className="relative bg-gradient-to-t from-gray-200 to-background dark:from-gray-700 py-5 px-6 rounded-lg mb-5">
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2">
          <Image
            className="object-contain opacity-20"
            src="/astronaut.png"
            alt="Astronaut"
            fill
          />
        </div>
        <div className="flex flex-col gap-6">
          <span className="font-bold">🔥 Available Now</span>
          <h3 className="font-medium text-xs text-gray-300">
            How to use the new version of the admin dashboard?
          </h3>
          <span className="subttitle">Takes 4 minutes to learn</span>
          <p className="desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            illum laborum, alias obcaecati, dolorum iusto labore voluptatum
            quidem eos, aliquam maiores necessitatibus tempore rem quisquam.
          </p>
          <button className="p-2 flex items-center gap-2 bg-purple-800 text-white border-none rounded-md cursor-pointer w-max">
            <MdPlayCircleFilled />
            Watch
          </button>
        </div>
      </div>
      <div className="relative bg-gradient-to-t from-gray-200 to-background dark:from-gray-700 py-5 px-6 rounded-lg mb-5">
        <div className="flex flex-col gap-6">
          <span className="font-bold">🚀 Coming Soon</span>
          <h3 className="font-medium text-xs text-gray-300">
            New server actions are available, partial pre-rendering is coming
            up!
          </h3>
          <span className="subtitle">Boost your productivity</span>
          <p className="desc">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores
            sunt corrupti similique, voluptatem, et quo maiores voluptates sed,
            ratione ipsam nobis. Ipsam voluptatem aliquid esse soluta ex?
          </p>
          <button className="p-2 flex items-center gap-2 bg-purple-800 text-white border-none rounded-md cursor-pointer w-max">
            <MdReadMore size={20} />
            Learn
          </button>
        </div>
      </div>
    </div>
  )
}

export default RightBar
