import { Building, Target, Heart, Sparkles, ArrowRight } from "lucide-react";
import Image from "next/image";

type AboutContent = {
    intro: string | null;
    moto: string | null;
};

export function CompanyIntro({ aboutContent }: { aboutContent: AboutContent | null }) {
    const defaultIntro = "At Pisran-e-Waqar, we are dedicated to providing a seamless and spiritually enriching Umrah experience. Our mission is to handle all the worldly arrangements, allowing you to focus entirely on your pilgrimage.";
    const defaultMoto = "\"Service with sincerity, travel with tranquility.\" We strive to ensure every aspect of your journey is handled with the utmost care, providing peace of mind from departure to return.";

    const stats = [
        { value: "50K+", label: "Happy Pilgrims", icon: Heart },
        { value: "15+", label: "Years Experience", icon: Sparkles },
        { value: "100%", label: "Satisfaction Rate", icon: Target },
    ];

    return (
        <div className="w-full bg-gradient-to-b from-[#fff6f6] via-background to-[#fff6f6] relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
            
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-16 sm:pt-24 pb-16 sm:pb-24 relative z-10">
                {/* Hero Section */}
                <div className="mx-auto max-w-4xl text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full mb-6">
                        <Building className="h-5 w-5 text-secondary" />
                        <span className="text-sm font-semibold text-secondary">About Pisran-e-Waqar</span>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl mb-6">
                        Your Sacred Journey,{" "}
                        <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                            Our Commitment
                        </span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        We are more than a travel agency. We are your trusted partner in making your spiritual journey unforgettable.
                    </p>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="group relative bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                            <div className="relative z-10">
                                <div className="flex items-center justify-center h-14 w-14 mx-auto mb-4 bg-primary-foreground/20 rounded-xl">
                                    <stat.icon className="h-7 w-7 text-primary-foreground" />
                                </div>
                                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                                <div className="text-sm font-medium opacity-90">{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                    {/* Company Introduction Card */}
                    <div className="group relative bg-gradient-to-br from-secondary to-secondary/90 text-secondary-foreground p-8 sm:p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex items-center justify-center h-12 w-12 bg-white/20 rounded-xl backdrop-blur-sm">
                                    <Building className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold">Our Company</h3>
                            </div>
                            <p className="text-lg leading-relaxed text-secondary-foreground/90 mb-6">
                                {aboutContent?.intro || defaultIntro}
                            </p>
                            <div className="flex items-center gap-2 text-sm font-semibold opacity-90 group-hover:gap-4 transition-all">
                                <span>Learn more about us</span>
                                <ArrowRight className="h-4 w-4" />
                            </div>
                        </div>
                    </div>

                    {/* Mission/Motto Card */}
                    <div className="group relative rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                        <Image
                            src="https://lvylckenosoiinbragac.supabase.co/storage/v1/object/public/site-images/public/moto.png"
                            alt="Decorative background for motto"
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            style={{ objectFit: 'cover' }}
                            className="z-0 transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/70 to-secondary/80 z-10" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300 z-20" />
                        <div className="relative z-30 h-full flex flex-col items-center justify-center p-8 sm:p-10 text-center">
                            <div className="flex items-center justify-center h-16 w-16 bg-white/20 rounded-full backdrop-blur-sm mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Heart className="h-8 w-8 text-white" />
                            </div>
                            <div className="text-2xl font-bold text-white mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                Our Mission
                            </div>
                            <p className="text-lg sm:text-xl text-white font-bold italic leading-relaxed">
                                &quot;{aboutContent?.moto || defaultMoto}&quot;
                            </p>
                        </div>
                    </div>
                </div>

                {/* Additional Info Section */}
                <div className="bg-gradient-to-r from-accent/10 via-secondary/10 to-accent/10 rounded-2xl p-8 sm:p-12 border border-secondary/20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-2xl font-bold text-foreground mb-4">Why Choose Us?</h3>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                With years of experience and thousands of satisfied pilgrims, we understand what it takes to make your Umrah journey truly special. Our commitment goes beyond just booking your trip—we ensure every detail is perfect.
                            </p>
                            <ul className="space-y-3">
                                {[
                                    "Expert guidance throughout your journey",
                                    "Personalized service tailored to your needs",
                                    "24/7 support before, during, and after your trip",
                                    "Trusted partnerships with premium hotels and airlines"
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="h-2 w-2 rounded-full bg-secondary" />
                                        </div>
                                        <span className="text-foreground">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden">
                            <Image
                                src="https://lvylckenosoiinbragac.supabase.co/storage/v1/object/public/site-images/public/moto.png"
                                alt="Company commitment illustration"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                style={{ objectFit: 'cover' }}
                                className="rounded-xl"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 to-transparent" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}