import { Hotel, Bus, Plane, Stamp } from "lucide-react";
import Image from "next/image";

const includedFeatures = [
    { icon: <Hotel className="h-10 w-10 text-accent" />, text: "Hotel" },
    { icon: <Bus className="h-10 w-10 text-accent" />, text: "Transport" },
    { icon: <Plane className="h-10 w-10 text-accent" />, text: "Return Flight" },
    { icon: <Stamp className="h-10 w-10 text-accent" />, text: "Umrah Visa" },
];

export function PackageInclusions() {
    return (
        <section className="relative w-full py-12 sm:py-16 text-white overflow-hidden">
            <Image
                src="https://lvylckenosoiinbragac.supabase.co/storage/v1/object/public/site-images/public/packages_hero.png"
                alt="Pilgrims at the Kaaba"
                fill
                style={{ objectFit: 'cover' }}
                className="z-0 animate-zoom-pan"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0C2B4E]/30 via-transparent to-[#0C2B4E]/30 z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(12,43,78,0.3)_100%)] z-10" />
            <div className="relative z-20">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
                <div className="mx-auto max-w-2xl text-center">
                    <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-4">
                        <span className="text-sm font-semibold text-white">Package Includes</span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl drop-shadow-lg">
                        Included in Every Package
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mt-4 mb-6" />
                    <p className="mt-4 text-lg leading-8 text-white/90">
                        We take care of the essentials so you can focus on your spiritual journey.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-lg sm:max-w-xl lg:max-w-4xl">
                    <div className="grid grid-cols-2 gap-6 text-center lg:grid-cols-4">
                        {includedFeatures.map((feature, index) => (
                            <div 
                                key={index} 
                                className="group flex cursor-pointer flex-col items-center rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-sm p-6 sm:p-8 text-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:scale-110 hover:shadow-2xl hover:shadow-accent/50 hover:border-accent/50 hover:bg-white/20"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                                    {feature.icon}
                                </div>
                                <p className="mt-4 font-semibold text-sm sm:text-base group-hover:text-accent transition-colors duration-300">{feature.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            </div>
        </section>
    );
}
