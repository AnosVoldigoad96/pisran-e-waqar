"use client";

import { Plane, PlaneLanding, PlaneTakeoff, ArrowRightLeft, ChevronsLeftRight } from "lucide-react";
import { Button } from "../ui/button";
import { WhatsAppIcon } from "../icons/whatsapp-icon";
import Image from "next/image";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";


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

export function FlightList({ flights, contactInfo }: { flights: Flight[], contactInfo: ContactInfo | null }) {
    const oneWayFlights = flights.filter(f => !f.return_departure_time);
    const roundTripFlights = flights.filter(f => f.return_departure_time);

    return (
        <div className="w-full bg-gradient-to-b from-background via-background to-muted/20 relative overflow-hidden">
            {/* Decorative gradient circles */}
            <div className="absolute top-20 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
            
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-16 relative z-10">
                {flights.length === 0 ? (
                    <div className="text-center py-20">
                        <Plane className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-2 text-sm font-semibold text-foreground">No flights available</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            We are currently updating our flight schedules. Please check back later.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-20">
                        <FlightSection title="One-way Flights" flights={oneWayFlights} contactInfo={contactInfo} type="one-way" />
                        <FlightSection title="Round-trip Flights" flights={roundTripFlights} contactInfo={contactInfo} type="round-trip" />
                    </div>
                )}
            </div>
        </div>
    );
}

function FlightSection({ title, flights, contactInfo, type }: { title: string, flights: Flight[], contactInfo: ContactInfo | null, type: string }) {
    if (flights.length === 0) return null;

    return (
        <section>
            <div className="mb-10">
                <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-3">
                    <span className="text-sm font-semibold text-secondary">{type === "one-way" ? "One-way" : "Round-trip"}</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h2>
                <div className="w-16 h-0.5 bg-gradient-to-r from-secondary to-accent mt-2" />
            </div>

            {/* --- Mobile Carousel View --- */}
            <div className="sm:hidden">
                <Carousel
                    opts={{ align: "start", loop: flights.length > 1 }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-4">
                        {flights.map((flight) => (
                            <CarouselItem key={flight.id} className="pl-4 basis-4/5">
                                <div className="p-1 h-full">
                                    <FlightCard flight={flight} contactInfo={contactInfo} />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="flex justify-center gap-2 pt-4">
                        <CarouselPrevious className="static translate-x-0 translate-y-0" />
                        <CarouselNext className="static translate-x-0 translate-y-0" />
                    </div>
                    <div className="mt-4 flex items-center justify-center text-sm text-muted-foreground">
                        <ChevronsLeftRight className="mr-2 h-4 w-4" />
                        <span>Swipe for more</span>
                    </div>
                </Carousel>
            </div>

            {/* --- Desktop Grid View --- */}
            <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-8">
                {flights.map((flight) => <FlightCard key={flight.id} flight={flight} contactInfo={contactInfo} />)}
            </div>
        </section>
    );
}
export function FlightCard({ flight, contactInfo }: { flight: Flight, contactInfo: ContactInfo | null }) {
    const [mounted, setMounted] = useState(false);
    const whatsappLink = `https://wa.me/${contactInfo?.whatsapp_no}`;
    
    useEffect(() => {
        setMounted(true);
    }, []);

    const formatTime = (dateString: string | null) => {
        if (!dateString) return 'N/A';
        if (!mounted) return 'N/A'; // Return placeholder during SSR
        try {
            const date = new Date(dateString);
            // Use date-fns for consistent formatting across server and client
            return format(date, "h:mm a");
        } catch (error) {
            return 'N/A';
        }
    };

    const isRoundTrip = !!flight.return_departure_time;

    return (
        <div className="group h-full flex flex-col rounded-xl border-2 border-border bg-card text-card-foreground shadow-lg transition-all duration-500 sm:hover:shadow-2xl sm:hover:shadow-secondary/30 sm:hover:-translate-y-2 sm:hover:scale-[1.02] sm:hover:border-secondary/50 relative overflow-hidden">
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/0 via-transparent to-accent/0 group-hover:from-secondary/5 group-hover:via-secondary/5 group-hover:to-accent/5 transition-all duration-500 rounded-xl pointer-events-none z-0" />
            
            <div className="p-6 relative z-10">
                <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4">
                        {flight.airlines?.logo_url && (
                            <div className="relative h-12 w-12 rounded-full overflow-hidden ring-2 ring-secondary/20 group-hover:ring-secondary/50 transition-all duration-300 group-hover:scale-110">
                                <Image
                                    src={flight.airlines.logo_url}
                                    alt={flight.airlines.name}
                                    width={48}
                                    height={48}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        )}
                        <div>
                            <p className="font-bold text-lg group-hover:text-secondary transition-colors duration-300">{flight.airlines?.name || 'Unknown Airline'}</p>
                            <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">Flight {flight.flight_number}</p>
                        </div>
                    </div>
                    <div className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-300 ${
                        isRoundTrip
                            ? 'bg-blue-500/10 text-blue-600 border-blue-500/20 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-500/30'
                            : 'bg-green-500/10 text-green-600 border-green-500/20 dark:bg-green-900/30 dark:text-green-400 dark:border-green-500/30'
                    }`}>
                        {isRoundTrip ? 'Round-trip' : 'One-way'}
                    </div>
                </div>
                <div className="flex justify-between items-center text-sm mb-4">
                    <div className="text-center flex-1">
                        <p className="font-bold text-xl group-hover:text-secondary transition-colors duration-300">{flight.departure_city}</p>
                        <p className="text-muted-foreground flex items-center justify-center gap-1 mt-1 group-hover:text-foreground/80 transition-colors duration-300">
                            <PlaneTakeoff className="h-4 w-4" /> 
                            <span suppressHydrationWarning>{formatTime(flight.departure_time)}</span>
                        </p>
                    </div>
                    <div className="flex items-center mx-4">
                        <div className="flex-1 h-px bg-gradient-to-r from-secondary/30 to-accent/30"></div>
                        <Plane className="h-5 w-5 text-secondary mx-2 group-hover:text-accent transition-colors duration-300" />
                        <div className="flex-1 h-px bg-gradient-to-r from-accent/30 to-secondary/30"></div>
                    </div>
                    <div className="text-center flex-1">
                        <p className="font-bold text-xl group-hover:text-secondary transition-colors duration-300">{flight.arrival_city}</p>
                        <p className="text-muted-foreground flex items-center justify-center gap-1 mt-1 group-hover:text-foreground/80 transition-colors duration-300">
                            <PlaneLanding className="h-4 w-4" /> 
                            <span suppressHydrationWarning>{formatTime(flight.arrival_time)}</span>
                        </p>
                    </div>
                </div>
                {flight.return_departure_time && (
                    <div className="flex-grow">
                        <div className="flex items-center justify-center my-4">
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-secondary/30 to-secondary/30"></div>
                            <div className="mx-3 p-2 rounded-full bg-secondary/10 border border-secondary/20">
                                <ArrowRightLeft className="h-4 w-4 text-secondary group-hover:text-accent transition-colors duration-300" />
                            </div>
                            <div className="flex-1 h-px bg-gradient-to-r from-secondary/30 via-secondary/30 to-transparent"></div>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <div className="text-center flex-1">
                                <p className="font-bold text-xl group-hover:text-secondary transition-colors duration-300">{flight.return_departure_city}</p>
                                <p className="text-muted-foreground flex items-center justify-center gap-1 mt-1 group-hover:text-foreground/80 transition-colors duration-300">
                                    <PlaneTakeoff className="h-4 w-4" /> 
                                    <span suppressHydrationWarning>{formatTime(flight.return_departure_time)}</span>
                                </p>
                            </div>
                            <div className="flex items-center mx-4">
                                <div className="flex-1 h-px bg-gradient-to-r from-secondary/30 to-accent/30"></div>
                                <Plane className="h-5 w-5 text-secondary mx-2 group-hover:text-accent transition-colors duration-300" />
                                <div className="flex-1 h-px bg-gradient-to-r from-accent/30 to-secondary/30"></div>
                            </div>
                            <div className="text-center flex-1">
                                <p className="font-bold text-xl group-hover:text-secondary transition-colors duration-300">{flight.return_arrival_city}</p>
                                <p className="text-muted-foreground flex items-center justify-center gap-1 mt-1 group-hover:text-foreground/80 transition-colors duration-300">
                                    <PlaneLanding className="h-4 w-4" /> 
                                    <span suppressHydrationWarning>{formatTime(flight.return_arrival_time)}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                )}
                {flight.price && (
                    <div className="mt-auto pt-4 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
                        {contactInfo?.whatsapp_no && (
                            <Button 
                                size="sm" 
                                asChild 
                                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                            >
                                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                                    <WhatsAppIcon className="mr-2 h-4 w-4" />
                                    Book Now
                                </a>
                            </Button>
                        )}
                        <div className="text-center sm:text-right">
                            <p className="text-xs text-muted-foreground mb-1">Starting from</p>
                            <p className="text-xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                                PKR {flight.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
