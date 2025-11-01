import { Hotel, Bus, Plane, Stamp } from "lucide-react";

const includedFeatures = [
    { icon: <Hotel className="h-10 w-10 text-accent" />, text: "Hotel" },
    { icon: <Bus className="h-10 w-10 text-accent" />, text: "Transport" },
    { icon: <Plane className="h-10 w-10 text-accent" />, text: "Return Flight" },
    { icon: <Stamp className="h-10 w-10 text-accent" />, text: "Umrah Visa" },
];

export function PackageInclusions() {
    return (
        <section className="py-12 sm:py-16 bg-secondary text-secondary-foreground">
            <div className="container px-4 sm:px-8 lg:px-32">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Included in Every Package
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-secondary-foreground/80">
                        We take care of the essentials so you can focus on your spiritual journey.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-lg sm:max-w-xl lg:max-w-4xl">
                    <div className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
                        {includedFeatures.map((feature, index) => (
                            <div key={index} className="flex cursor-pointer flex-col items-center rounded-lg border-b-8 border-primary-foreground/10 bg-primary p-8 text-primary-foreground shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl hover:shadow-accent/50">
                                {feature.icon}
                                <p className="mt-4 font-semibold">{feature.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
