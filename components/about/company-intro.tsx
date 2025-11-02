import { Building, Target } from "lucide-react";
import Image from "next/image";

type AboutContent = {
    intro: string | null;
    moto: string | null;
};

export function CompanyIntro({ aboutContent }: { aboutContent: AboutContent | null }) {
    const defaultIntro = "At Pisran-e-Waqar, we are dedicated to providing a seamless and spiritually enriching Umrah experience. Our mission is to handle all the worldly arrangements, allowing you to focus entirely on your pilgrimage.";
    const defaultMoto = "\"Service with sincerity, travel with tranquility.\" We strive to ensure every aspect of your journey is handled with the utmost care, providing peace of mind from departure to return.";

    return (
        <div className="bg-[#fff6f6]">
            <div className="container px-4 sm:px-8 lg:px-32 pt-16 sm:pt-24 pb-8 sm:pb-12">
                <div className="mx-auto max-w-2xl text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Your Sacred Journey, Our Commitment
                    </h1>
                </div>
                <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8 lg:gap-16">
                    <div className="md:col-span-2 bg-secondary text-secondary-foreground p-8 rounded-xl shadow-xl">
                        <div className="flex items-center mb-4">
                            <Building className="h-8 w-8 text-white mr-3" />
                            <h3 className="text-2xl font-semibold">Our Company</h3>
                        </div>
                        <p className="text-lg text-secondary-foreground/80 text-justify">
                            {aboutContent?.intro || defaultIntro}
                        </p>
                    </div>
                    <div className="group relative flex items-center justify-center p-8 rounded-xl shadow-xl overflow-hidden">
                        <Image
                            src="https://lvylckenosoiinbragac.supabase.co/storage/v1/object/public/site-images/public/moto.png"
                            alt="Decorative background for motto"
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            style={{ objectFit: 'cover' }}
                            className="z-0"
                        />
                        <div className="absolute inset-0 bg-primary/30 backdrop-blur-[2px] z-10 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
                        <p className="z-20 text-lg text-white text-center font-bold italic md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 ease-in-out md:delay-100">
                            &quot;{aboutContent?.moto || defaultMoto}&quot;
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}