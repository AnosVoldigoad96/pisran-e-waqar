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
        <div className="relative w-full h-[60vh] min-h-[400px] sm:h-[70vh] md:h-screen flex items-center justify-center text-center text-white overflow-hidden">
            <Image
                src={heroData?.hero_image_url || defaultImageUrl}
                alt="A beautiful view of the Kaaba"
                fill
                priority
                style={{ objectFit: 'cover' }}
                className="z-0 animate-zoom-pan"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0C2B4E]/30 via-transparent to-[#0C2B4E]/30 z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(12,43,78,0.3)_100%)] z-10" />
            <div className="relative z-20 container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
                <div className="animate-fade-in-up">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl drop-shadow-2xl mb-2 bg-gradient-to-r from-white via-white to-white/90 bg-clip-text text-transparent">
                        {heroData?.hero_title || defaultTitle}
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mt-4 mb-6" />
                    <p className="mt-6 text-lg sm:text-xl max-w-3xl mx-auto drop-shadow-lg text-white/95 leading-relaxed">
                        {heroData?.hero_subtitle || defaultSubtitle}
                    </p>
                </div>
                <div className="mt-10 flex flex-row items-center justify-center gap-4 animate-fade-in-up-delay">
                    <Button asChild size="lg" className="text-base font-semibold shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-accent/50 flex-1 sm:flex-initial bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary">
                        <Link href="/packages">Explore Packages</Link>
                    </Button>
                    {contactInfo?.whatsapp_no && (
                        <Button asChild size="lg" variant="secondary" className="text-base font-semibold shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-secondary/50 flex-1 sm:flex-initial">
                            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                                <WhatsAppIcon className="mr-2 h-5 w-5" /> WhatsApp Us
                            </a>
                        </Button>
                    )}
                </div>
            </div>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
                <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
                </div>
            </div>
        </div>
    );
}