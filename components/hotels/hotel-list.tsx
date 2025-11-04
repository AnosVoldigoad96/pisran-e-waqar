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
        <div className="w-full bg-background">
            <div className="relative w-full py-24 sm:py-32 text-white overflow-hidden">
                <Image
                    src="https://lvylckenosoiinbragac.supabase.co/storage/v1/object/public/site-images/public/hotels_herov2.jpeg"
                    alt="Grand Mosque"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="z-0 animate-zoom-pan"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0C2B4E]/30 via-transparent to-[#0C2B4E]/30 z-10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(12,43,78,0.3)_100%)] z-10" />
                <div className="relative z-20 container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
                    <div className="mx-auto max-w-2xl text-center">
                        <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-4">
                            <span className="text-sm font-semibold text-white">Partner Hotels</span>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl drop-shadow-lg">
                            Our Partner Hotels
                        </h1>
                        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mt-4 mb-6" />
                        <p className="mt-2 text-lg leading-8 text-white/90">
                            We partner with the best hotels in Makkah and Madinah to ensure a comfortable stay.
                        </p>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-16 bg-gradient-to-b from-background via-background to-muted/20 relative overflow-hidden">
                {/* Decorative gradient circles */}
                <div className="absolute top-20 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
                
                {hotels.length === 0 ? (
                    <div className="text-center py-20 relative z-10">
                        <Building className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-2 text-sm font-semibold text-foreground">No hotels available</h3>
                        <p className="mt-1 text-sm text-muted-foreground">Please check back later.</p>
                    </div>
                ) : (
                    <div className="space-y-20 relative z-10">
                        <HotelSection title="Hotels in Makkah" hotels={makkahHotels} city="Makkah" />
                        <HotelSection title="Hotels in Madinah" hotels={madinahHotels} city="Madinah" />
                    </div>
                )}
            </div>

            {/* --- CTA Section --- */}
            <div className="w-full bg-gradient-to-br from-card via-card to-muted/20 text-card-foreground relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
                
                <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-16 sm:py-20 text-center relative z-10">
                    <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-4">
                        <span className="text-sm font-semibold text-secondary">Get In Touch</span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready for a Blessed Journey?</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-card-foreground/80">
                        Our handpicked hotels ensure your comfort, so you can focus on your spiritual journey. Let us handle the details of your Umrah booking.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
                        {contactInfo?.whatsapp_no && (
                            <Button 
                                variant="secondary" 
                                size="lg" 
                                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" 
                                asChild
                            >
                                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                                    <WhatsAppIcon className="mr-2 h-5 w-5" /> WhatsApp Us
                                </a>
                            </Button>
                        )}
                        {contactInfo?.contact_no && (
                            <Button 
                                variant="outline" 
                                size="lg" 
                                className="border-2 border-card-foreground/30 text-card-foreground hover:bg-card-foreground/10 hover:text-card-foreground hover:border-card-foreground/50 transition-all duration-300 hover:scale-105" 
                                asChild
                            >
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

function HotelSection({ title, hotels, city }: { title: string, hotels: Hotel[], city: string }) {
    if (hotels.length === 0) return null;
    const [flippedCardId, setFlippedCardId] = useState<number | null>(null);

    return (
        <section>
            <div className="mb-10">
                <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-3">
                    <span className="text-sm font-semibold text-secondary">{city}</span>
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{title}</h2>
                <div className="w-16 h-0.5 bg-gradient-to-r from-secondary to-accent mt-2" />
            </div>

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
            className="group overflow-hidden rounded-xl border-2 border-border bg-card text-card-foreground shadow-lg transition-all duration-500 ease-in-out sm:hover:shadow-2xl sm:hover:shadow-secondary/30 sm:hover:-translate-y-2 sm:hover:scale-[1.02] sm:hover:border-secondary/50 relative"
        >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/0 via-transparent to-accent/0 group-hover:from-secondary/5 group-hover:via-secondary/5 group-hover:to-accent/5 transition-all duration-500 rounded-xl pointer-events-none z-0" />
            <div className="relative w-full aspect-square sm:aspect-video transition-all duration-300 sm:group-hover:aspect-square z-10">
                <div 
                    className="relative w-full h-full transition-transform duration-700" 
                    style={{ transformStyle: 'preserve-3d', transform: flippedCardId === hotel.id ? 'rotateY(180deg)' : 'none' }}
                >
                    {/* Front of the card */}
                    <div className="absolute w-full h-full" style={{ backfaceVisibility: 'hidden' }}>
                        <div className="relative w-full h-full overflow-hidden">
                            <Image
                                src={hotel.images?.[0] || "/placeholder.svg"}
                                alt={hotel.name}
                                fill
                                sizes="(max-width: 640px) 83vw, (max-width: 1024px) 50vw, 33vw"
                                style={{ objectFit: 'cover' }}
                                className="bg-muted transition-transform duration-500 group-hover:scale-110"
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        </div>
                         {/* --- Mobile Content Overlay --- */}
                        <div className="sm:hidden absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4 flex flex-col justify-end z-10">
                            <h3 className="font-semibold text-white text-lg drop-shadow-lg">{hotel.name}</h3>
                            <div className="flex items-center gap-1 mt-1">
                                <div className="flex items-center gap-1 bg-amber-500/90 backdrop-blur-sm px-2 py-1 rounded-full">
                                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> 
                                    <span className="text-sm font-bold text-white">{hotel.rating}</span>
                                </div>
                            </div>
                        </div>

                        {/* --- Mobile Flip Button --- */}
                        <button 
                            onClick={() => setFlippedCardId(hotel.id)} 
                            className="sm:hidden absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/80 transition-all duration-300 hover:scale-110 z-20 shadow-lg"
                        >
                            <Eye className="h-5 w-5" />
                        </button>

                        {/* --- Desktop Flip Button --- */}
                        <button 
                            onClick={() => setFlippedCardId(hotel.id)} 
                            className="hidden sm:block absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/80 transition-all duration-300 hover:scale-110 z-20 shadow-lg"
                        >
                            <MoreHorizontal className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Back of the card */}
                    <div className="absolute w-full h-full bg-gradient-to-br from-card via-card to-muted/30 p-4 sm:p-6 overflow-y-auto" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                        <button 
                            onClick={() => setFlippedCardId(null)} 
                            className="absolute top-2 right-2 text-muted-foreground p-2 rounded-full hover:bg-secondary/20 hover:text-secondary transition-all duration-300 hover:scale-110 z-10"
                        >
                            <X className="h-5 w-5" />
                        </button>
                        <h4 className="font-bold mb-2 text-lg bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">About</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{hotel.description || "No description available."}</p>
                        
                        {/* --- Mobile Features on Back --- */}
                        <div className="sm:hidden mt-4">
                            <h4 className="font-bold mb-3 text-lg bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">Features</h4>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                                {hotel.features_offered && Object.entries(hotel.features_offered).map(([key, value]) => (
                                    <FeatureItem key={key} text={`${value}`} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* --- Desktop Content Area --- */}
            <div className="p-4 sm:p-6 hidden sm:block relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg text-foreground group-hover:text-secondary transition-colors duration-300">{hotel.name}</h3>
                    <div className="flex items-center gap-1 bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20">
                        <Star className="h-4 w-4 fill-amber-500 text-amber-500" /> 
                        <span className="text-sm font-bold text-foreground">{hotel.rating}</span>
                    </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
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
        <div className="flex items-center gap-2 group/feature">
            <div className="flex items-center justify-center h-5 w-5 rounded-full bg-secondary/10 group-hover/feature:bg-secondary/20 transition-colors duration-300">
                <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 text-secondary" />
            </div>
            <span className="capitalize text-muted-foreground group-hover/feature:text-foreground transition-colors duration-300">{text}</span>
        </div>
    );
}