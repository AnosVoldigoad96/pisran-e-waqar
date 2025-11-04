import { ShieldCheck, BadgePercent, Users } from "lucide-react";

const features = [
    {
        icon: <ShieldCheck className="h-10 w-10 text-secondary" />,
        title: "Trusted & Verified",
        description: "We are a licensed and trusted travel agency, committed to ensuring your peace of mind.",
    },
    {
        icon: <BadgePercent className="h-10 w-10 text-secondary" />,
        title: "Best Price Guarantee",
        description: "We offer competitive pricing on all our packages without compromising on quality or service.",
    },
    {
        icon: <Users className="h-10 w-10 text-secondary" />,
        title: "Expert Guidance",
        description: "Our experienced team provides dedicated support and guidance throughout your journey.",
    },
];

export function TrustedSection() {
    return (
        <section className="w-full bg-gradient-to-b from-background to-background relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#0C2B4E]/5 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
            
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-16 sm:pt-24 pb-8 sm:pb-12 relative z-10">
                <div className="mx-auto max-w-2xl text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0C2B4E]/10 rounded-full mb-4">
                        <ShieldCheck className="h-4 w-4 text-[#0C2B4E]" />
                        <span className="text-sm font-semibold text-[#0C2B4E]">Why Choose Us</span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        A Partner You Can Trust
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-muted-foreground">
                        Your sacred journey is our priority. We ensure a seamless and worry-free experience from start to finish.
                    </p>
                </div>
                <div className="mt-16 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3 lg:gap-x-12">
                    {features.map((feature, index) => (
                        <div 
                            key={feature.title} 
                            className="text-center group relative"
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-secondary/0 to-accent/0 group-hover:from-secondary/10 group-hover:to-accent/10 rounded-2xl transition-all duration-500 -z-10" />
                            <div className="flex items-center justify-center h-20 w-20 mx-auto bg-gradient-to-br from-secondary/20 via-secondary/10 to-accent/20 rounded-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-xl group-hover:shadow-secondary/30">
                                <div className="group-hover:scale-110 transition-transform duration-500">
                                    {feature.icon}
                                </div>
                            </div>
                            <h3 className="mt-5 text-lg font-semibold leading-6 text-foreground group-hover:text-secondary transition-colors duration-300">
                                {feature.title}
                            </h3>
                            <p className="mt-2 text-base text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}