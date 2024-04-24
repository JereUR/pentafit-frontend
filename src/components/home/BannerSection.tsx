import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import banner from '/src/assets/banner-test.jpg'
import Image from 'next/image'

export default function BannerSection() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Carousel className="w-full max-w-[75vw]">
        <CarouselContent>
          {Array.from({ length: 3 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="flex items-center justify-center h-full"
            >
              <Image
                src={banner}
                alt="Banner Image"
                width={1920}
                height={775}
                className="rounded-md w-full shadow-md"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
