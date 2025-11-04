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
        <section className="w-full bg-[#fff6f6]">
            <div className="container mx-auto px-4 sm:px-8 lg:px-32 pt-16 sm:pt-24 pb-8 sm:pb-12">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        A Partner You Can Trust
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-muted-foreground">
                        Your sacred journey is our priority. We ensure a seamless and worry-free experience from start to finish.
                    </p>
                </div>
                <div className="mt-16 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3 lg:gap-x-12">
                    {features.map((feature) => (
                        <div key={feature.title} className="text-center">
                            <div className="flex items-center justify-center h-16 w-16 mx-auto bg-secondary/10 rounded-full">
                                {feature.icon}
                            </div>
                            <h3 className="mt-5 text-lg font-semibold leading-6 text-foreground">
                                {feature.title}
                            </h3>
                            <p className="mt-2 text-base text-muted-foreground">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}