import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { WhatsAppIcon } from "../icons/whatsapp-icon";

type HeroData = {
    hero_title: string | null;
    hero_subtitle: string | null;
    hero_image_url: string | null;
};

type ContactInfo = {
    whatsapp_no: string | null;
};

export function Hero({ heroData, contactInfo }: { heroData: HeroData | null, contactInfo: ContactInfo | null }) {
    const defaultTitle = "Your Sacred Journey, Our Commitment";
    const defaultSubtitle = "Experience a seamless and spiritually fulfilling pilgrimage with our expertly crafted Umrah and Hajj packages.";
    const defaultImageUrl = "/images/hero-bg.jpg"; // A fallback image in your public folder
    const whatsappLink = `https://wa.me/${contactInfo?.whatsapp_no}`;

    return (
        <div className="relative h-[60vh] min-h-[400px] sm:h-[70vh] md:h-screen flex items-center justify-center text-center text-white overflow-hidden">
            <Image
                src={heroData?.hero_image_url || defaultImageUrl}
                alt="A beautiful view of the Kaaba"
                fill
                priority
                style={{ objectFit: 'cover' }}
                className="z-0 animate-zoom-pan"
            />
            <div className="absolute inset-0 bg-black/40 z-10" />
            <div className="absolute inset-0 bg-secondary/20 z-10" />
            <div className="relative z-20 container px-4 sm:px-8 lg:px-32">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl drop-shadow-lg">
                    {heroData?.hero_title || defaultTitle}
                </h1>
                <p className="mt-6 text-lg max-w-3xl mx-auto drop-shadow-md">
                    {heroData?.hero_subtitle || defaultSubtitle}
                </p>
                <div className="mt-10 flex flex-row items-center justify-center gap-4">
                    <Button asChild size="lg" className="text-base font-semibold shadow-lg transition-transform hover:scale-105 flex-1 sm:flex-initial">
                        <Link href="/packages">Explore Packages</Link>
                    </Button>
                    {contactInfo?.whatsapp_no && (
                        <Button asChild size="lg" variant="secondary" className="text-base font-semibold shadow-lg transition-transform hover:scale-105 flex-1 sm:flex-initial">
                            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                                <WhatsAppIcon className="mr-2 h-5 w-5" /> WhatsApp Us
                            </a>
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}