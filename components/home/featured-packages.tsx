"use client"

import { useState } from "react";
import Image from "next/image";
import { Clock, PlaneTakeoff, Eye, ChevronsLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "../icons/whatsapp-icon";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";

type Package = {
    id: number;
    package_name: string;
    departure_city: string | null;
    duration_days: number | null;
    makkah_hotel_name: string | null;
    makkah_days_stay: number | null;
    makkah_hotel_distance: string | null;
    madinah_hotel_name: string | null;
    madinah_days_stay: number | null;
    madinah_hotel_distance: string | null;
    pricing: { [key: string]: string } | null;
};

type ContactInfo = {
    whatsapp_no: string | null;
};

export function FeaturedPackages({ packages, contactInfo }: { packages: Package[], contactInfo: ContactInfo | null }) {
    const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
    const whatsappLink = `https://wa.me/${contactInfo?.whatsapp_no}`;

    if (!packages || packages.length === 0) {
        return null;
    }

    return (
        <>
            <section className="w-full pt-8 sm:pt-12 pb-8 sm:pb-12 bg-gradient-to-b from-background via-background to-muted/20 relative overflow-hidden">
                {/* Decorative gradient circles */}
                <div className="absolute top-20 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
                
                <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
                    <div className="mx-auto max-w-2xl text-center">
                        <div className="inline-block px-4 py-2 bg-gradient-to-r from-secondary/10 to-accent/10 rounded-full mb-4">
                            <span className="text-sm font-semibold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">Featured Packages</span>
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            Featured Umrah Packages
                        </h2>
                        <p className="mt-4 text-lg leading-8 text-muted-foreground">
                            Discover our most popular and recommended packages for a blessed journey.
                        </p>
                    </div>
                    <Carousel
                        opts={{ align: "start", loop: packages.length > 2 }}
                        className="w-full mt-12"
                    >
                        <CarouselContent className="-ml-6">
                            {packages.map((pkg) => (
                                <CarouselItem key={pkg.id} className="pl-6 md:basis-1/2 lg:basis-1/3">
                                    <div className="h-full p-1">
                                        <div className="relative flex h-full flex-col justify-between rounded-xl border-2 border-border bg-card text-card-foreground shadow-lg transition-all duration-500 hover:shadow-2xl hover:shadow-secondary/30 hover:-translate-y-2 hover:border-secondary/50 group overflow-hidden">
                                            {/* Gradient overlay on hover */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-secondary/0 via-transparent to-accent/0 group-hover:from-secondary/5 group-hover:via-secondary/5 group-hover:to-accent/5 transition-all duration-500 rounded-xl" />
                                            <div className="p-6 relative z-10">
                                                <div className="space-y-3">
                                                    <h3 className="text-xl font-bold group-hover:text-secondary transition-colors duration-300">{pkg.package_name}</h3>
                                                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                                                        {pkg.duration_days && (
                                                            <div className="flex items-center">
                                                                <Clock className="mr-2 h-4 w-4" />
                                                                <span>{pkg.duration_days} Days</span>
                                                            </div>
                                                        )}
                                                        {pkg.departure_city && (
                                                            <div className="flex items-center">
                                                                <PlaneTakeoff className="mr-2 h-4 w-4" />
                                                                <span>From {pkg.departure_city}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="hidden sm:block space-y-3 border-t pt-4 text-sm">
                                                        <div className="flex items-center gap-3">
                                                            <Image src="https://lvylckenosoiinbragac.supabase.co/storage/v1/object/public/site-images/Makkah.svg" alt="Makkah" width={32} height={32} className="flex-shrink-0" />
                                                            <div>
                                                                <p className="font-bold text-foreground">{pkg.makkah_hotel_name} {pkg.makkah_hotel_distance && `(${pkg.makkah_hotel_distance})`}</p>
                                                                <p className="text-xs text-muted-foreground">{pkg.makkah_days_stay} Days in Makkah</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <Image src="https://lvylckenosoiinbragac.supabase.co/storage/v1/object/public/site-images/Madinah.svg" alt="Madinah" width={32} height={32} className="flex-shrink-0" />
                                                            <div>
                                                                <p className="font-bold text-foreground">{pkg.madinah_hotel_name} {pkg.madinah_hotel_distance && `(${pkg.madinah_hotel_distance})`}</p>
                                                                <p className="text-xs text-muted-foreground">{pkg.madinah_days_stay} Days in Madinah</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-end justify-between border-t p-4 pt-4 relative z-10">
                                                <div>
                                                    <p className="text-sm text-muted-foreground">From</p>
                                                    <p className="font-bold text-lg text-foreground">PKR {pkg.pricing?.sharing}</p>
                                                </div>
                                                <Button variant="outline" size="icon" onClick={() => setSelectedPackage(pkg)} className="hover:bg-secondary/10 hover:border-secondary/50 transition-all duration-300">
                                                    <Eye className="h-5 w-5" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <div className="hidden sm:flex justify-center gap-2 pt-4">
                            <CarouselPrevious className="static translate-x-0 translate-y-0" />
                            <CarouselNext className="static translate-x-0 translate-y-0" />
                        </div>
                        <div className="mt-4 flex items-center justify-center text-sm text-muted-foreground sm:hidden">
                            <ChevronsLeftRight className="mr-2 h-4 w-4" />
                            <span>Swipe for more packages</span>
                        </div>
                    </Carousel>
                    <div className="mt-12 text-center">
                        <Button asChild size="lg">
                            <Link href="/packages">View All Packages</Link>
                        </Button>
                    </div>
                </div>
            </section>

            <Dialog open={!!selectedPackage} onOpenChange={() => setSelectedPackage(null)}>
                <DialogContent className="sm:max-w-[425px]">
                    {selectedPackage && (
                        <>
                            <DialogHeader>
                                <DialogTitle>{selectedPackage.package_name}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center gap-3">
                                        <Image src="https://lvylckenosoiinbragac.supabase.co/storage/v1/object/public/site-images/Makkah.svg" alt="Makkah" width={32} height={32} className="flex-shrink-0" />
                                        <div>
                                            <p className="font-bold text-foreground">{selectedPackage.makkah_hotel_name} {selectedPackage.makkah_hotel_distance && `(${selectedPackage.makkah_hotel_distance})`}</p>
                                            <p className="text-xs text-muted-foreground">{selectedPackage.makkah_days_stay} Days in Makkah</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Image src="https://lvylckenosoiinbragac.supabase.co/storage/v1/object/public/site-images/Madinah.svg" alt="Madinah" width={32} height={32} className="flex-shrink-0" />
                                        <div>
                                            <p className="font-bold text-foreground">{selectedPackage.madinah_hotel_name} {selectedPackage.madinah_hotel_distance && `(${selectedPackage.madinah_hotel_distance})`}</p>
                                            <p className="text-xs text-muted-foreground">{selectedPackage.madinah_days_stay} Days in Madinah</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t pt-4">
                                {selectedPackage.pricing && typeof selectedPackage.pricing === 'object' && Object.keys(selectedPackage.pricing).length > 0 && (
                                    <div className="grid grid-cols-2 gap-2 text-center">
                                        {Object.entries(selectedPackage.pricing).map(([sharing, price], index) => (
                                            <div key={index} className="rounded-md bg-muted p-2">
                                                <p className="text-xs font-medium capitalize text-muted-foreground">{sharing}</p>
                                                <p className="font-bold text-foreground">PKR {price}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div className="px-[20%]">
                                    {contactInfo?.whatsapp_no && (
                                        <Button asChild className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white">
                                            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                                                <WhatsAppIcon className="mr-2 h-5 w-5" /> WhatsApp Us
                                            </a>
                                        </Button>
                                    )}
                                </div>
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}