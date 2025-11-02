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
        <section className="bg-[#18181b]">
            <div className="container px-4 sm:px-8 lg:px-32">
                <div className="mx-auto max-w-4xl pt-16 pb-8 sm:pt-24 sm:pb-12 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Begin Your Sacred Journey Today
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-white/80">
                        Have questions or ready to book your pilgrimage? Our dedicated team is here to assist you every step of the way.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        {contactInfo?.whatsapp_no && (
                            <Button asChild size="lg" className="shadow-lg transition-transform hover:scale-105">
                                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                                    <WhatsAppIcon className="mr-2 h-5 w-5" /> WhatsApp Us
                                </a>
                            </Button>
                        )}
                        {contactInfo?.contact_no && (
                            <Button asChild size="lg" variant="outline" className="shadow-lg transition-transform hover:scale-105 bg-transparent border-white/50 text-white hover:bg-white/10 hover:text-white">
                                <a href={`tel:${contactInfo.contact_no}`}><Phone className="mr-2 h-5 w-5" /> Call Us</a>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}