import { Stamp, Plane, Hotel } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const services = [
    {
        icon: <Stamp className="h-10 w-10 text-secondary" />,
        title: "Visa Processing",
        description: "We provide hassle-free visa processing services, ensuring all your documentation is handled with precision and care.",
        link: "/contact-us",
    },
    {
        icon: <Plane className="h-10 w-10 text-secondary" />,
        title: "Flight Bookings",
        description: "Find and book the best flight deals from a wide range of airlines to suit your travel dates and budget.",
        link: "/flights",
    },
    {
        icon: <Hotel className="h-10 w-10 text-secondary" />,
        title: "Hotel Reservations",
        description: "Choose from our curated selection of hotels in Makkah and Madinah for a comfortable and peaceful stay.",
        link: "/hotels",
    },
];

export function ServicesSection() {
    return (
        <section className="w-full pt-8 sm:pt-12 pb-8 sm:pb-12 bg-gradient-to-b from-background via-background to-muted/30 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
                <div className="mx-auto max-w-2xl text-center">
                    <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-4">
                        <span className="text-sm font-semibold text-secondary">Our Services</span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Comprehensive Travel Services
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-muted-foreground">
                        Beyond packages, we offer a range of services to make your sacred journey seamless and complete.
                    </p>
                </div>
                <div className="mx-auto mt-16 grid max-w-none grid-cols-1 gap-8 text-center sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, index) => (
                        <Link 
                            key={service.title} 
                            href={service.link} 
                            className="group block rounded-xl border-2 border-border bg-card p-8 text-card-foreground shadow-lg transition-all duration-500 hover:shadow-2xl hover:shadow-secondary/20 hover:-translate-y-2 hover:border-secondary/50 relative overflow-hidden"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Gradient overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-secondary/0 via-secondary/0 to-secondary/0 group-hover:from-secondary/5 group-hover:via-accent/5 group-hover:to-secondary/5 transition-all duration-500 rounded-xl" />
                            
                            <div className="relative z-10">
                                <div className="flex items-center justify-center h-20 w-20 mx-auto bg-gradient-to-br from-secondary/20 to-accent/20 rounded-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                                    <div className="group-hover:scale-110 transition-transform duration-500">
                                        {service.icon}
                                    </div>
                                </div>
                                <h3 className="mt-6 text-lg font-semibold leading-6 text-foreground group-hover:text-secondary transition-colors duration-300">
                                    {service.title}
                                </h3>
                                <p className="mt-2 text-base text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">{service.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}