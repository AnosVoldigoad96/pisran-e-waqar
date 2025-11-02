"use client";

import { Phone } from "lucide-react";
import { Button } from "../ui/button";
import { WhatsAppIcon } from "../icons/whatsapp-icon";

type ContactInfo = {
    whatsapp_no: string | null;
    contact_no: string | null;
};

export function FlightCTA({ contactInfo }: { contactInfo: ContactInfo | null }) {
    const whatsappLink = `https://wa.me/${contactInfo?.whatsapp_no}`;

    return (
        <div className="bg-[#18181b] text-white">
            <div className="container px-4 sm:px-8 lg:px-32 py-16 sm:py-20 text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to Book Your Flight?</h2>
                <p className="mt-4 text-lg max-w-2xl mx-auto text-white/80">
                    Let our travel experts handle the details. Contact us for personalized flight options and the best prices available.
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
    );
}