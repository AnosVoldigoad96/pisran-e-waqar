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
            <section className="py-12 sm:py-16 md:block">
            <div className="container px-4 sm:px-8 lg:px-32">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Umrah Packages
                    </h2>
                    <p className="mt-2 text-lg leading-8 text-muted-foreground">
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
                                    <div className="relative flex h-full flex-col justify-between rounded-lg border bg-card text-card-foreground shadow-sm">
                                            <div className="p-4">
                                            <div className="space-y-3">
                                                <h3 className="text-xl font-bold">{pkg.package_name}</h3>
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
                                            <div className="mt-4 flex items-end justify-between border-t p-4 pt-4 md:hidden">
                                                <div>
                                                    <p className="text-sm text-muted-foreground">From</p>
                                                    <p className="font-bold text-lg text-foreground">PKR {pkg.pricing?.sharing}</p>
                                                </div>
                                                <Button variant="outline" size="icon" onClick={() => setSelectedPackage(pkg)}>
                                                    <Eye className="h-5 w-5" />
                                                </Button>
                                            </div>

                                            {/* --- Desktop View --- */}
                                            <div className="hidden space-y-3 border-t p-4 md:block">
                                                {pkg.pricing && typeof pkg.pricing === 'object' && Object.keys(pkg.pricing).length > 0 && (
                                                    <div className="grid grid-cols-2 gap-2 text-center">
                                                        {Object.entries(pkg.pricing).map(([sharing, price], index) => (
                                                            <div key={index} className="rounded-md bg-muted p-2">
                                                                <p className="text-xs font-medium capitalize text-muted-foreground">{sharing}</p>
                                                                <p className="font-bold text-foreground">PKR {price}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                                <div className="pt-2 pl-[70%]">
                                                    {contactInfo?.whatsapp_no && (
                                                        <Button className="group w-full bg-green-500 hover:bg-green-600" asChild>
                                                            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex h-9 items-center justify-center px-3">
                                                                <WhatsAppIcon className="h-4 w-4 flex-shrink-0 text-white transition-all duration-300 group-hover:mr-2" />
                                                                <span className="w-0 overflow-hidden whitespace-nowrap text-xs font-medium text-white transition-all duration-300 group-hover:w-20">
                                                                    Whatsapp Us
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
                <DialogContent className="sm:max-w-[425px]">
                    {selectedPackage && (
                        <>
                            <DialogHeader>
                                <DialogTitle>{selectedPackage.package_name}</DialogTitle>
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
                                        <div className="grid grid-cols-2 gap-2 text-center">
                                            {Object.entries(selectedPackage.pricing).map(([sharing, price], index) => (
                                                <div key={index} className="rounded-md bg-muted p-2">
                                                    <p className="text-xs font-medium capitalize text-muted-foreground">{sharing}</p>
                                                    <p className="font-bold text-foreground">PKR {price}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <div className="pt-2 px-[35%]">
                                        {contactInfo?.whatsapp_no && (
                                            <Button className="w-full bg-green-500 hover:bg-green-600" asChild>
                                                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex h-9 items-center justify-center px-3">
                                                    <WhatsAppIcon className="h-4 w-4 mr-2 text-white" />
                                                    <span className="text-xs font-medium text-white">
                                                        Whatsapp Us
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