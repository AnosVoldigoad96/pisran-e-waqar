"use client";

import { Plane, PlaneLanding, PlaneTakeoff, ArrowRightLeft } from "lucide-react";
import { Button } from "../ui/button";
import { WhatsAppIcon } from "../icons/whatsapp-icon";
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem
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
        <div className="bg-background">
            <div className="bg-secondary py-16">
                <div className="container px-4 sm:px-8 lg:px-32">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-3xl font-bold tracking-tight text-secondary-foreground sm:text-4xl">
                            Book Your Flights
                        </h1>
                        <p className="mt-2 text-lg leading-8 text-secondary-foreground/80">
                            Find the best deals on flights to Makkah, Madinah, and beyond.
                        </p>
                    </div>
                </div>
            </div>
            <div className="container px-4 sm:px-8 lg:px-32 py-16">
                {flights.length === 0 ? (
                    <div className="text-center py-20">
                        <Plane className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-2 text-sm font-semibold text-foreground">No flights available</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            We are currently updating our flight schedules. Please check back later.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-16">
                        {oneWayFlights.length > 0 && (
                            <section>
                                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8">
                                    One-way Flights
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {oneWayFlights.map((flight) => (
                                        <FlightCard key={flight.id} flight={flight} contactInfo={contactInfo} />
                                    ))}
                                </div>
                            </section>
                        )}
                        {roundTripFlights.length > 0 && (
                            <section>
                                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8">
                                    Round-trip Flights
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {roundTripFlights.map((flight) => (
                                        <FlightCard key={flight.id} flight={flight} contactInfo={contactInfo} />
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

function FlightCard({ flight, contactInfo }: { flight: Flight, contactInfo: ContactInfo | null }) {
    const whatsappLink = `https://wa.me/${contactInfo?.whatsapp_no}`;
    const formatTime = (dateString: string | null) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    const isRoundTrip = !!flight.return_departure_time;

    return (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4">
                        {flight.airlines?.logo_url && (
                            <Image
                                src={flight.airlines.logo_url}
                                alt={flight.airlines.name}
                                width={40}
                                height={40}
                                className="h-10 w-10 rounded-full object-contain"
                            />
                        )}
                        <div>
                            <p className="font-bold text-lg">{flight.airlines?.name || 'Unknown Airline'}</p>
                            <p className="text-sm text-muted-foreground">Flight {flight.flight_number}</p>
                        </div>
                    </div>
                    <div className={`text-xs font-semibold px-2.5 py-1 rounded-full ${isRoundTrip
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300'
                            : 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                        }`}>
                        {isRoundTrip ? 'Round-trip' : 'One-way'}
                    </div>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <div className="text-center">
                        <p className="font-bold text-xl">{flight.departure_city}</p>
                        <p className="text-muted-foreground flex items-center justify-center gap-1"><PlaneTakeoff className="h-4 w-4" /> {formatTime(flight.departure_time)}</p>
                    </div>
                    <Plane className="h-5 w-5 text-muted-foreground mx-4" />
                    <div className="text-center">
                        <p className="font-bold text-xl">{flight.arrival_city}</p>
                        <p className="text-muted-foreground flex items-center justify-center gap-1"><PlaneLanding className="h-4 w-4" /> {formatTime(flight.arrival_time)}</p>
                    </div>
                </div>
                {flight.return_departure_time && (
                    <>
                        <div className="flex items-center justify-center my-4">
                            <div className="flex-grow border-t border-dashed"></div>
                            <ArrowRightLeft className="h-4 w-4 text-muted-foreground mx-2" />
                            <div className="flex-grow border-t border-dashed"></div>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <div className="text-center">
                                <p className="font-bold text-xl">{flight.return_departure_city}</p>
                                <p className="text-muted-foreground flex items-center justify-center gap-1"><PlaneTakeoff className="h-4 w-4" /> {formatTime(flight.return_departure_time)}</p>
                            </div>
                            <Plane className="h-5 w-5 text-muted-foreground mx-4" />
                            <div className="text-center">
                                <p className="font-bold text-xl">{flight.return_arrival_city}</p>
                                <p className="text-muted-foreground flex items-center justify-center gap-1"><PlaneLanding className="h-4 w-4" /> {formatTime(flight.return_arrival_time)}</p>
                            </div>
                        </div>
                    </>
                )}
                {flight.price && (
                    <div className="mt-4 pt-4 border-t flex justify-between items-center">
                        {contactInfo?.whatsapp_no && (
                            <Button size="sm" asChild className="bg-green-500 hover:bg-green-600 text-white">
                                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                                    <WhatsAppIcon className="mr-2 h-4 w-4" />
                                    Book Now
                                </a>
                            </Button>
                        )}
                        <p className="text-right text-xl font-bold text-primary">PKR {flight.price.toLocaleString()}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
