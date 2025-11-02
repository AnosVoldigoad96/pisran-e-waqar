"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Star, MapPin, ChevronsLeftRight, MoreHorizontal, X, CheckCircle2, Eye } from "lucide-react";

type Hotel = {
    id: number;
    name: string;
    city: 'Makkah' | 'Madinah' | null;
    rating: number | null;
    images: string[] | null;
    description: string | null;
    features_offered: { [key: string]: string } | null;
};

export function FeaturedHotels({ hotels }: { hotels: Hotel[] }) {
    const [flippedCardId, setFlippedCardId] = useState<number | null>(null);
    if (!hotels || hotels.length === 0) { 
        return null;
    }

    return (
        <section className="pt-8 sm:pt-12 pb-16 sm:pb-24 bg-background">
            <div className="container px-4 sm:px-8 lg:px-32">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Our Partner Hotels
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-muted-foreground">
                        Handpicked hotels in Makkah and Madinah to ensure a comfortable and blessed stay.
                    </p>
                </div>
                <Carousel
                    opts={{ align: "start", loop: hotels.length > 2 }}
                    className="w-full mt-12"
                >
                    <CarouselContent className="-ml-6">
                        {hotels.map((hotel) => (
                            <CarouselItem key={hotel.id} className="pl-6 md:basis-1/2 lg:basis-1/3">
                                <HotelCard hotel={hotel} flippedCardId={flippedCardId} setFlippedCardId={setFlippedCardId} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="hidden sm:flex justify-center gap-2 pt-4">
                        <CarouselPrevious className="static translate-x-0 translate-y-0" />
                        <CarouselNext className="static translate-x-0 translate-y-0" />
                    </div>
                    <div className="mt-4 flex items-center justify-center text-sm text-muted-foreground sm:hidden">
                        <ChevronsLeftRight className="mr-2 h-4 w-4" />
                        <span>Swipe for more hotels</span>
                    </div>
                </Carousel>
                <div className="mt-12 text-center">
                    <Button asChild size="lg">
                        <Link href="/hotels">View All Hotels</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}

function HotelCard({ hotel, flippedCardId, setFlippedCardId }: { hotel: Hotel, flippedCardId: number | null, setFlippedCardId: (id: number | null) => void }) {
    return (
        <div className="group aspect-square p-1 [perspective:1000px] transition-transform duration-300 hover:scale-105">
            <div
                className="relative h-full w-full rounded-lg shadow-md transition-transform duration-700 [transform-style:preserve-3d]"
                style={{ transform: flippedCardId === hotel.id ? 'rotateY(180deg)' : 'none' }}
            >
                {/* Front of the card */}
                <div className="absolute flex flex-col w-full h-full rounded-lg overflow-hidden border bg-card [backface-visibility:hidden]">
                    <div className="relative w-full aspect-video group-hover:aspect-square transition-all duration-300">
                        <Image
                            src={hotel.images?.[0] || "/placeholder.svg"}
                            alt={hotel.name}
                            fill
                            sizes="(max-width: 768px) 50vw, 33vw"
                            className="object-cover"
                        />
                    </div>

                    {/* Content Area */}
                    <div className="flex flex-1 flex-col justify-between p-4">
                        <div>
                            <h3 className="font-bold text-lg">{hotel.name}</h3>
                            <p className="text-sm text-muted-foreground flex items-center gap-2"><MapPin className="h-4 w-4" />{hotel.city}</p>
                        </div>
                        {hotel.rating && (
                            <div className="flex items-center gap-1 text-amber-500 mt-2">
                                {Array.from({ length: hotel.rating }).map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                            </div>
                        )}
                    </div>

                    {/* Flip Button */}
                    <button onClick={() => setFlippedCardId(hotel.id)} className="absolute top-2 right-2 bg-black/50 text-white p-1.5 rounded-full hover:bg-black/70 transition-colors z-10">
                        <MoreHorizontal className="h-5 w-5" />
                    </button>
                </div>

                {/* Back of the card */}
                <div className="absolute w-full h-full rounded-lg border bg-card p-4 sm:p-6 overflow-y-auto [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <button onClick={() => setFlippedCardId(null)} className="absolute top-2 right-2 text-muted-foreground p-1.5 rounded-full hover:bg-accent transition-colors z-10">
                        <X className="h-5 w-5" />
                    </button>
                    <h4 className="font-bold mb-2 text-foreground">{hotel.name}</h4>
                    <p className="text-sm text-muted-foreground mb-4">{hotel.description || "No description available."}</p>
                    
                    {hotel.features_offered && Object.keys(hotel.features_offered).length > 0 && (
                        <>
                            <h4 className="font-bold mb-2 text-foreground border-t pt-4">Features</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground">
                                {Object.entries(hotel.features_offered).map(([key, value]) => (
                                    <FeatureItem key={key} text={`${value}`} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

function FeatureItem({ text }: { text?: string }) {
    if (!text) return null;
    return (
        <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-secondary" />
            <span className="capitalize">{text}</span>
        </div>
    );
}