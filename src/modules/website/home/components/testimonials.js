/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"
import AvatarIcon from "@/assets/images/home/testimonials/avatar.svg";
import RatingIcon from "@/assets/images/home/testimonials/rating.svg";
import Image from 'next/image';

export default function Testimonials() {

    const [api, setApi] = useState(null)
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!api) return

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap())

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])

    return (
        <section className="relative">
            <div className="mx-auto max-w-7xl lg:px-0 px-4 lg:py-12 py-8">
                <h2 className="lg:text-text-32 text-text-26 font-medium leading-tight text-black text-center lg:px-0 px-4">
                    Customer testimonials
                </h2>
                <p className='text-black lg:text-lg text-base font-medium text-center mt-1 max-w-3xl mx-auto'>Discover the experiences of those who have trusted us with their health and well-being. Read testimonials from our satisfied patients.</p>
                <div className="flex items-center justify-center mt-6">
                    <div className='flex items-center gap-4 bg-[#FAF9F9] px-3 py-2 rounded-full'>
                        <Image src={RatingIcon} alt="rating" />
                        <p className="text-black font-medium text-sm">Reviews of more than 130k consumers</p>
                    </div>
                </div>
                <Carousel setApi={setApi}
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    plugins={[
                        Autoplay({
                            delay: 3000,
                            stopOnInteraction: false,
                        }),
                    ]}
                    className="w-full mt-8"
                >
                    <CarouselContent>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                <div className="p-1">
                                    <Card className="border-[#00000012] shadow-none rounded-4xl py-0">
                                        <CardContent className="flex flex-col aspect-3/2 justify-center p-6">
                                            <p className="text-black font-medium text-base">{"After my first consultation with Dr. Williams, I knew I was in good hands. His expertise and approachable manner made me feel comfortable and informed. The results have been outstanding, and I couldn't be happier."}</p>
                                            <div className='flex items-center gap-4 mt-10'>
                                                <Image src={AvatarIcon} alt="avatar" />
                                                <p className="text-black font-medium text-lg">Amanda Lawre</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="lg:-left-10 -left-3 border-brand-dark-green cursor-pointer [&>svg]:stroke-brand-dark-green" />
                    <CarouselNext className="lg:-right-10 -right-3 border-brand-dark-green cursor-pointer [&>svg]:stroke-brand-dark-green" />
                </Carousel>
                <div className="mt-6 flex justify-center gap-2">
                    {Array.from({ length: count }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => api?.scrollTo(index)}
                            className={`h-2.5 rounded-full transition-all duration-300 ease-in-out cursor-pointer ${
                                current === index
                                    ? "bg-brand-dark-green w-6"
                                    : "bg-brand-light-gray w-2.5"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
