import { Card, CardContent } from '@/components/ui/card'
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
    <Carousel className="w-full max-w-[1600px] lg:max-w-[1000px]">
      <CarouselContent>
        {Array.from({ length: 3 }).map((_, index) => (
          <CarouselItem key={index} className="max-h-[600px]">
            <Image
              src={banner}
              alt="Banner Image"
              width={1920}
              height={675}
              className="rounded-md"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
