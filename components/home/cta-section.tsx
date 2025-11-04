import { Phone } from "lucide-react";
import { Button } from "../ui/button";
import { WhatsAppIcon } from "../icons/whatsapp-icon";

type ContactInfo = {
    whatsapp_no: string | null;
    contact_no: string | null;
};

export function CtaSection({ contactInfo }: { contactInfo: ContactInfo | null }) {
    const whatsappLink = `https://wa.me/${contactInfo?.whatsapp_no}`;

    return (
        <section className="w-full bg-gradient-to-br from-[#0C2B4E] via-[#1A3D64] to-[#0C2B4E] relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,_rgba(29,84,108,0.3)_0%,_transparent_50%)]" />
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_50%,_rgba(29,84,108,0.2)_0%,_transparent_50%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(12,43,78,0.9)_0%,_rgba(26,61,100,0.9)_50%,_rgba(12,43,78,0.9)_100%)]" />
            
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
                <div className="mx-auto max-w-4xl pt-16 pb-8 sm:pt-24 sm:pb-12 text-center">
                    <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-4">
                        <span className="text-sm font-semibold text-white">Get Started</span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl drop-shadow-lg">
                        Begin Your Sacred Journey Today
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mt-4 mb-6" />
                    <p className="mt-4 text-lg leading-8 text-white/90 max-w-2xl mx-auto">
                        Have questions or ready to book your pilgrimage? Our dedicated team is here to assist you every step of the way.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-4">
                        {contactInfo?.whatsapp_no && (
                            <Button asChild size="lg" className="shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-green-500/50 bg-green-500 hover:bg-green-600 text-white">
                                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                                    <WhatsAppIcon className="mr-2 h-5 w-5" /> WhatsApp Us
                                </a>
                            </Button>
                        )}
                        {contactInfo?.contact_no && (
                            <Button asChild size="lg" variant="outline" className="shadow-2xl transition-all duration-300 hover:scale-110 border-white/50 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm bg-white/10">
                                <a href={`tel:${contactInfo.contact_no}`}><Phone className="mr-2 h-5 w-5" /> Call Us</a>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}