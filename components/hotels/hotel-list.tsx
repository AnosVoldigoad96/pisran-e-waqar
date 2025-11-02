"use client";

import { useState } from "react";
import Image from "next/image";
import { Building, Star, MoreHorizontal, X, CheckCircle2, Eye, ChevronsLeftRight, Phone } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";
import { WhatsAppIcon } from "../icons/whatsapp-icon";

type Hotel = {
    id: number;
    name: string;
    city: 'Makkah' | 'Madinah';
    rating: number;
    features_offered: { [key: string]: string } | null;
    images: string[] | null;
    description: string | null;
};

type ContactInfo = {
    whatsapp_no: string | null;
    contact_no: string | null;
};

export function HotelList({ hotels, contactInfo }: { hotels: Hotel[], contactInfo: ContactInfo | null }) {
    const makkahHotels = hotels.filter(h => h.city === 'Makkah');
    const madinahHotels = hotels.filter(h => h.city === 'Madinah');
    const whatsappLink = `https://wa.me/${contactInfo?.whatsapp_no}`;

    return (
        <div className="bg-background">
            <div className="relative py-24 sm:py-32 text-white overflow-hidden">
                <Image
                    src="https://lvylckenosoiinbragac.supabase.co/storage/v1/object/public/site-images/public/hotels_herov2.jpeg"
                    alt="Grand Mosque"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="z-0 animate-zoom-pan"
                />
                <div className="absolute inset-0 bg-black/40 z-10" />
                <div className="absolute inset-0 bg-secondary/30 z-10" />
                <div className="relative z-20 container px-4 sm:px-8 lg:px-32">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Our Partner Hotels
                        </h1>
                        <p className="mt-2 text-lg leading-8 text-white/80">
                            We partner with the best hotels in Makkah and Madinah to ensure a comfortable stay.
                        </p>
                    </div>
                </div>
            </div>
            <div className="container px-4 sm:px-8 lg:px-32 py-16">
                {hotels.length === 0 ? (
                    <div className="text-center py-20">
                        <Building className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-2 text-sm font-semibold text-foreground">No hotels available</h3>
                        <p className="mt-1 text-sm text-muted-foreground">Please check back later.</p>
                    </div>
                ) : (
                    <div className="space-y-16">
                        <HotelSection title="Hotels in Makkah" hotels={makkahHotels} />
                        <HotelSection title="Hotels in Madinah" hotels={madinahHotels} />
                    </div>
                )}
            </div>

            {/* --- CTA Section --- */}
            <div className="bg-[#18181b] text-white">
                <div className="container px-4 sm:px-8 lg:px-32 py-16 sm:py-20 text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready for a Blessed Journey?</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-white/80">
                        Our handpicked hotels ensure your comfort, so you can focus on your spiritual journey. Let us handle the details of your Umrah booking.
                    </p>
                    <div className="mt-8 grid grid-cols-2 gap-4 max-w-md mx-auto">
                        {contactInfo?.whatsapp_no && (
                            <Button variant="secondary" size="lg" asChild>
                                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                                    <WhatsAppIcon className="mr-2 h-5 w-5" /> WhatsApp Us
                                </a>
                            </Button>
                        )}
                        {contactInfo?.contact_no && (
                            <Button variant="outline" size="lg" className="bg-transparent border-white/50 text-white hover:bg-white/10 hover:text-white" asChild>
                                <a href={`tel:${contactInfo.contact_no}`}>
                                    <Phone className="mr-2 h-5 w-5" /> Call Us
                                </a>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function HotelSection({ title, hotels }: { title: string, hotels: Hotel[] }) {
    if (hotels.length === 0) return null;
    const [flippedCardId, setFlippedCardId] = useState<number | null>(null);

    return (
        <section>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mb-8">{title}</h2>

            {/* --- Mobile Carousel View --- */}
            <div className="sm:hidden">
                <Carousel
                    opts={{ align: "center", loop: true }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-4">
                        {hotels.map((hotel) => (
                            <CarouselItem key={hotel.id} className="pl-4 basis-4/5">
                                <div className="p-1">
                                    <HotelCard hotel={hotel} flippedCardId={flippedCardId} setFlippedCardId={setFlippedCardId} />
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
                {hotels.map((hotel) => (
                    <HotelCard key={hotel.id} hotel={hotel} flippedCardId={flippedCardId} setFlippedCardId={setFlippedCardId} />
                ))}
            </div>
        </section>
    );
}

function HotelCard({ hotel, flippedCardId, setFlippedCardId }: { hotel: Hotel, flippedCardId: number | null, setFlippedCardId: (id: number | null) => void }) {
    return (
        <div 
            className="group overflow-hidden rounded-lg border bg-card text-card-foreground shadow-lg transition-all duration-300 ease-in-out sm:hover:shadow-primary/20 sm:hover:shadow-2xl sm:hover:-translate-y-2 sm:hover:scale-105"
        >
            <div className="relative w-full aspect-square sm:aspect-video transition-all duration-300 sm:group-hover:aspect-square">
                <div 
                    className="relative w-full h-full transition-transform duration-700" 
                    style={{ transformStyle: 'preserve-3d', transform: flippedCardId === hotel.id ? 'rotateY(180deg)' : 'none' }}
                >
                    {/* Front of the card */}
                    <div className="absolute w-full h-full" style={{ backfaceVisibility: 'hidden' }}>
                        <Image
                            src={hotel.images?.[0] || "/placeholder.svg"}
                            alt={hotel.name}
                            fill
                            sizes="(max-width: 640px) 83vw, (max-width: 1024px) 50vw, 33vw"
                            style={{ objectFit: 'cover' }}
                            className="bg-muted"
                        />
                         {/* --- Mobile Content Overlay --- */}
                        <div className="sm:hidden absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col justify-end">
                            <h3 className="font-semibold text-white text-lg">{hotel.name}</h3>
                            <div className="flex items-center gap-1 text-amber-400">
                                <Star className="h-4 w-4" /> <span className="text-sm font-bold text-white">{hotel.rating}</span>
                            </div>
                        </div>

                        {/* --- Mobile Flip Button --- */}
                        <button onClick={() => setFlippedCardId(hotel.id)} className="sm:hidden absolute top-2 right-2 bg-black/50 text-white p-1.5 rounded-full hover:bg-black/70 transition-colors">
                            <Eye className="h-5 w-5" />
                        </button>

                        {/* --- Desktop Flip Button --- */}
                        <button onClick={() => setFlippedCardId(hotel.id)} className="hidden sm:block absolute top-2 right-2 bg-black/50 text-white p-1.5 rounded-full hover:bg-black/70 transition-colors">
                            <MoreHorizontal className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Back of the card */}
                    <div className="absolute w-full h-full bg-card p-4 sm:p-6 overflow-y-auto" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                        <button onClick={() => setFlippedCardId(null)} className="absolute top-2 right-2 text-muted-foreground p-1.5 rounded-full hover:bg-accent transition-colors">
                            <X className="h-5 w-5" />
                        </button>
                        <h4 className="font-bold mb-2">About</h4>
                        <p className="text-sm text-muted-foreground">{hotel.description || "No description available."}</p>
                        
                        {/* --- Mobile Features on Back --- */}
                        <div className="sm:hidden mt-4">
                            <h4 className="font-bold mb-2">Features</h4>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-muted-foreground">
                                {hotel.features_offered && Object.entries(hotel.features_offered).map(([key, value]) => (
                                    <FeatureItem key={key} text={`${value}`} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* --- Desktop Content Area --- */}
            <div className="p-4 hidden sm:block">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">{hotel.name}</h3>
                    <div className="flex items-center gap-1 text-amber-500">
                        <Star className="h-4 w-4" /> <span className="text-sm font-bold">{hotel.rating}</span>
                    </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-muted-foreground">
                    {hotel.features_offered && Object.entries(hotel.features_offered).map(([key, value]) => (
                        <FeatureItem key={key} text={`${value}`} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function FeatureItem({ text }: { text?: string }) {
    if (!text) return null;
    return (
        <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-primary" />
            <span className="capitalize">{text}</span>
        </div>
    );
}