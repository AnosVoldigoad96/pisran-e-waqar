import { ShieldCheck, HeartHandshake, Gem } from "lucide-react";

const values = [
    {
        name: "Integrity",
        description: "We operate with unwavering honesty and transparency in all our dealings, ensuring trust is at the heart of our relationships.",
        icon: ShieldCheck,
    },
    {
        name: "Service",
        description: "Our commitment is to serve pilgrims with dedication and empathy, anticipating their needs and exceeding their expectations.",
        icon: HeartHandshake,
    },
    {
        name: "Excellence",
        description: "We strive for the highest standards in every aspect of our service, from travel arrangements to spiritual guidance.",
        icon: Gem,
    },
];

export function OurValues() {
    return (
        <div className="bg-background py-16 sm:py-24">
            <div className="container px-4 sm:px-8 lg:px-32">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Core Values</h2>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground">The principles that guide our every action and define who we are.</p>
                </div>
                <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
                    {values.map((value) => (
                        <div key={value.name} className="text-center flex flex-col items-center bg-primary text-primary-foreground p-8 rounded-xl shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-accent-foreground"><value.icon className="h-6 w-6" aria-hidden="true" /></div>
                            <h3 className="mt-6 font-semibold">{value.name}</h3>
                            <p className="mt-2 text-sm text-primary-foreground/80">{value.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}