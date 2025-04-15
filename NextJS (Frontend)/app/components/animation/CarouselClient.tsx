"use client";
import HeroProduct from "@/app/components/home/HeroProduct";
import Autoplay from 'embla-carousel-autoplay'
import { useEffect, useState } from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
  } from "@/components/ui/carousel"

export default function CarouselClient({className, category} : {className?: string, category: string}) {

    const [items, setItems] = useState<{ id: string; image: string; name: string }[]>([]);

    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {

        async function fetchItems() {

            const itemResponse = await fetch(`http://localhost:8000/getItems`);
            const items = await itemResponse.json();

            //@ts-ignore
            setItems(items);
        }
        fetchItems();
    }, [])



 return(

    <>
        <div className="mb-8 user-select: none">
        <Carousel
        plugins={[
            Autoplay({
            delay: 2500,
            stopOnInteraction: true,
            
            }),
        ]}
        opts={{
            loop: true,
        }}
    >
        <CarouselContent>

            {items?.map((data) => (
                <CarouselItem key={data.id} className="basis-2/6 rounded-lg user-select: none"><HeroProduct url={data?.image} text={data?.name}/></CarouselItem>
            ))}
            </CarouselContent>
            {/* <CarouselPrevious />
            <CarouselNext /> */}
        </Carousel>

        </div>
    </>


 );
}