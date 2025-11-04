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
        <div className="w-full bg-gradient-to-b from-background via-background to-muted/20 py-16 sm:py-24 relative overflow-hidden">
            {/* Decorative gradient circles */}
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
            
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
                <div className="mx-auto max-w-2xl text-center">
                    <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-4">
                        <span className="text-sm font-semibold text-secondary">Our Values</span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Core Values</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mt-4 mb-6" />
                    <p className="mt-6 text-lg leading-8 text-muted-foreground">The principles that guide our every action and define who we are.</p>
                </div>
                <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
                    {values.map((value, index) => (
                        <div 
                            key={value.name} 
                            className="group text-center flex flex-col items-center bg-card border-2 border-border text-card-foreground p-8 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-secondary/30 transition-all duration-500 ease-in-out hover:-translate-y-2 hover:scale-105 hover:border-secondary/50 relative overflow-hidden"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Gradient overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-secondary/0 via-transparent to-accent/0 group-hover:from-secondary/5 group-hover:via-secondary/5 group-hover:to-accent/5 transition-all duration-500 rounded-xl" />
                            <div className="relative z-10">
                                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-secondary/20 to-accent/20 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                    <value.icon className="h-7 w-7 text-secondary group-hover:text-accent transition-colors duration-300" aria-hidden="true" />
                                </div>
                                <h3 className="mt-6 font-bold text-lg group-hover:text-secondary transition-colors duration-300">{value.name}</h3>
                                <p className="mt-2 text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300 leading-relaxed">{value.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}