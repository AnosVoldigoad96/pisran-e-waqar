"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FlightCard } from "@/components/flights/flight-list";
import { ChevronsLeftRight } from "lucide-react";

type Flight = {
    id: number;
    flight_number: string;
    departure_city: string;
    arrival_city: string;
    price: number | null;
    departure_time: string | null;
    arrival_time: string | null;
    return_flight_number: string | null;
    return_departure_city: string | null;
    return_arrival_city: string | null;
    return_departure_time: string | null;
    return_arrival_time: string | null;
    airlines: {
        name: string;
        logo_url: string | null;
    } | null;
};

type ContactInfo = {
    whatsapp_no: string | null;
};

export function FeaturedFlights({ flights, contactInfo }: { flights: Flight[], contactInfo: ContactInfo | null }) {
    if (!flights || flights.length === 0) {
        return null;
    }

    return (
        <section className="pt-8 sm:pt-12 pb-8 sm:pb-12 bg-background">
            <div className="container px-4 sm:px-8 lg:px-32">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Featured Flight Deals
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-muted-foreground">
                        Take advantage of our exclusive offers on flights for your sacred journey.
                    </p>
                </div>
                <Carousel
                    opts={{ align: "start", loop: flights.length > 2 }}
                    className="w-full mt-12"
                >
                    <CarouselContent className="-ml-6">
                        {flights.map((flight) => (
                            <CarouselItem key={flight.id} className="pl-6 md:basis-1/2 lg:basis-1/3">
                                <FlightCard flight={flight} contactInfo={contactInfo} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="hidden sm:flex justify-center gap-2 pt-4">
                        <CarouselPrevious className="static translate-x-0 translate-y-0" />
                        <CarouselNext className="static translate-x-0 translate-y-0" />
                    </div>
                    <div className="mt-4 flex items-center justify-center text-sm text-muted-foreground sm:hidden">
                        <ChevronsLeftRight className="mr-2 h-4 w-4" />
                        <span>Swipe for more flights</span>
                    </div>
                </Carousel>
                <div className="mt-12 text-center">
                    <Button asChild size="lg">
                        <Link href="/flights">View All Flights</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}