"use client"

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { Clock, PlaneTakeoff, Star, Eye, ChevronsLeftRight } from "lucide-react";
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

async function getPackages(): Promise<Package[]> {
    const { data, error } = await supabase
        .from('packages')
        .select('*') // Fetch all columns
        .order('package_name', { ascending: true });

    if (error) {
        console.error("Error fetching packages:", error);
        return [];
    }

    return data as Package[];
}

export function UmrahPackages({ packages, contactInfo }: { packages: Package[], contactInfo: ContactInfo | null }) {
    const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const packagesPerPage = 3;
    const whatsappLink = `https://wa.me/${contactInfo?.whatsapp_no}`;

    return (
        <>
            <section className="w-full py-12 sm:py-16 bg-gradient-to-b from-background via-background to-muted/20 relative overflow-hidden">
                {/* Decorative gradient circles */}
                <div className="absolute top-20 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
                
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
                <div className="mx-auto max-w-2xl text-center">
                    <div className="inline-block px-4 py-2 bg-gradient-to-r from-secondary/10 to-accent/10 rounded-full mb-4">
                        <span className="text-sm font-semibold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">Our Packages</span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Umrah Packages
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-muted-foreground">
                        Choose from our curated packages designed for your comfort and spiritual needs.
                    </p>
                </div>
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full mt-6"
                >
                    <CarouselContent className="-ml-6">
                        {packages.map((pkg) => (
                            <CarouselItem key={pkg.id} className="pl-6 md:basis-1/2">
                                <div className="h-full p-1">
                                    <div className="group relative flex h-full flex-col justify-between rounded-xl border-2 border-border bg-card text-card-foreground shadow-lg transition-all duration-500 hover:shadow-2xl hover:shadow-secondary/30 hover:-translate-y-2 hover:border-secondary/50 overflow-hidden">
                                            {/* Gradient overlay on hover */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-secondary/0 via-transparent to-accent/0 group-hover:from-secondary/5 group-hover:via-secondary/5 group-hover:to-accent/5 transition-all duration-500 rounded-xl" />
                                            <div className="p-4 sm:p-6 relative z-10">
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
                                                <div className="hidden space-y-3 border-t pt-4 text-sm md:block">
                                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                            {/* Makkah Column */}
                                                            <div className="flex items-center gap-3">
                                                                <Image src="https://lvylckenosoiinbragac.supabase.co/storage/v1/object/public/site-images/Makkah.svg" alt="Makkah" width={32} height={32} className="flex-shrink-0" />
                                                                <div className="text-left">
                                                                    <p className="font-bold text-foreground">{pkg.makkah_hotel_name} {pkg.makkah_hotel_distance && `(${pkg.makkah_hotel_distance})`}</p>
                                                                    <p className="text-xs text-muted-foreground">{pkg.makkah_days_stay} Days in Makkah</p>
                                                                </div>
                                                            </div>
                                                            {/* Madinah Column */}
                                                            <div className="flex items-center gap-3">
                                                                <Image src="https://lvylckenosoiinbragac.supabase.co/storage/v1/object/public/site-images/Madinah.svg" alt="Madinah" width={32} height={32} className="flex-shrink-0" />
                                                                <div className="text-left">
                                                                    <p className="font-bold text-foreground">{pkg.madinah_hotel_name} {pkg.madinah_hotel_distance && `(${pkg.madinah_hotel_distance})`}</p>
                                                                    <p className="text-xs text-muted-foreground">{pkg.madinah_days_stay} Days in Madinah</p>
                                                                </div>
                                                            </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                            {/* --- Mobile View --- */}
                                            <div className="mt-4 flex items-end justify-between border-t p-4 pt-4 md:hidden relative z-10">
                                                <div>
                                                    <p className="text-sm text-muted-foreground">From</p>
                                                    <p className="font-bold text-lg text-foreground group-hover:text-secondary transition-colors duration-300">PKR {pkg.pricing?.sharing}</p>
                                                </div>
                                                <Button 
                                                    variant="outline" 
                                                    size="icon" 
                                                    onClick={() => setSelectedPackage(pkg)}
                                                    className="border-secondary/20 hover:border-secondary hover:bg-secondary/10 hover:text-secondary transition-all duration-300"
                                                >
                                                    <Eye className="h-5 w-5" />
                                                </Button>
                                            </div>

                                            {/* --- Desktop View --- */}
                                            <div className="hidden space-y-3 border-t p-4 md:block">
                                                {pkg.pricing && typeof pkg.pricing === 'object' && Object.keys(pkg.pricing).length > 0 && (
                                                    <div className="grid grid-cols-2 gap-3 text-center">
                                                        {Object.entries(pkg.pricing).map(([sharing, price], index) => (
                                                            <div key={index} className="rounded-lg bg-gradient-to-br from-secondary/10 to-accent/10 border border-secondary/20 p-3 group-hover:from-secondary/20 group-hover:to-accent/20 transition-all duration-300">
                                                                <p className="text-xs font-medium capitalize text-muted-foreground mb-1">{sharing}</p>
                                                                <p className="font-bold text-lg text-foreground group-hover:text-secondary transition-colors duration-300">PKR {price}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                                <div className="pt-4">
                                                    {contactInfo?.whatsapp_no && (
                                                        <Button className="group w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" asChild>
                                                            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex h-10 items-center justify-center px-4">
                                                                <WhatsAppIcon className="h-4 w-4 flex-shrink-0 text-white transition-all duration-300 group-hover:mr-2" />
                                                                <span className="text-sm font-semibold text-white">
                                                                    WhatsApp Us
                                                                </span>
                                                            </a>
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="flex justify-center gap-2 pt-4">
                        <CarouselPrevious className="static translate-x-0 translate-y-0" />
                        <CarouselNext className="static translate-x-0 translate-y-0" />
                    </div>
                    <div className="mt-4 flex items-center justify-center text-sm text-muted-foreground md:hidden">
                        <ChevronsLeftRight className="mr-2 h-4 w-4" />
                        <span>Swipe for more packages</span>
                    </div>
                </Carousel>
            </div>  
            </section>

            <Dialog open={!!selectedPackage} onOpenChange={() => setSelectedPackage(null)}>
                <DialogContent className="sm:max-w-[425px] border-2 border-border shadow-2xl">
                    {selectedPackage && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                                    {selectedPackage.package_name}
                                </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-3 text-sm">
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div className="flex items-center gap-3">
                                            <Image src="https://lvylckenosoiinbragac.supabase.co/storage/v1/object/public/site-images/Makkah.svg" alt="Makkah" width={32} height={32} className="flex-shrink-0" />
                                            <div className="text-left">
                                                <p className="font-bold text-foreground">{selectedPackage.makkah_hotel_name} {selectedPackage.makkah_hotel_distance && `(${selectedPackage.makkah_hotel_distance})`}</p>
                                                <p className="text-xs text-muted-foreground">{selectedPackage.makkah_days_stay} Days in Makkah</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Image src="https://lvylckenosoiinbragac.supabase.co/storage/v1/object/public/site-images/Madinah.svg" alt="Madinah" width={32} height={32} className="flex-shrink-0" />
                                            <div className="text-left">
                                                <p className="font-bold text-foreground">{selectedPackage.madinah_hotel_name} {selectedPackage.madinah_hotel_distance && `(${selectedPackage.madinah_hotel_distance})`}</p>
                                                <p className="text-xs text-muted-foreground">{selectedPackage.madinah_days_stay} Days in Madinah</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-3 border-t pt-4">
                                    {selectedPackage.pricing && typeof selectedPackage.pricing === 'object' && Object.keys(selectedPackage.pricing).length > 0 && (
                                        <div className="grid grid-cols-2 gap-3 text-center">
                                            {Object.entries(selectedPackage.pricing).map(([sharing, price], index) => (
                                                <div key={index} className="rounded-lg bg-gradient-to-br from-secondary/10 to-accent/10 border border-secondary/20 p-3">
                                                    <p className="text-xs font-medium capitalize text-muted-foreground mb-1">{sharing}</p>
                                                    <p className="font-bold text-lg text-foreground">PKR {price}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <div className="pt-4">
                                        {contactInfo?.whatsapp_no && (
                                            <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" asChild>
                                                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex h-10 items-center justify-center px-4">
                                                    <WhatsAppIcon className="h-4 w-4 mr-2 text-white" />
                                                    <span className="text-sm font-semibold text-white">
                                                        WhatsApp Us
                                                    </span>
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