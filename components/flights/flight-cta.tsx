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
        <div className="w-full bg-gradient-to-br from-card via-card to-muted/20 text-card-foreground relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
            
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-16 sm:py-20 text-center relative z-10">
                <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-4">
                    <span className="text-sm font-semibold text-secondary">Get In Touch</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to Book Your Flight?</h2>
                <p className="mt-4 text-lg max-w-2xl mx-auto text-card-foreground/80">
                    Let our travel experts handle the details. Contact us for personalized flight options and the best prices available.
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
    );
}