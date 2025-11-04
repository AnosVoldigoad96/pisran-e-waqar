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
        <section className="w-full pt-8 sm:pt-12 pb-8 sm:pb-12 bg-[#fff6f6]">
            <div className="container mx-auto px-4 sm:px-8 lg:px-32">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Comprehensive Travel Services
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-muted-foreground">
                        Beyond packages, we offer a range of services to make your sacred journey seamless and complete.
                    </p>
                </div>
                <div className="mx-auto mt-16 grid max-w-none grid-cols-1 gap-8 text-center sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => (
                        <Link key={service.title} href={service.link} className="block rounded-lg border bg-card p-8 text-card-foreground shadow-sm transition-all duration-300 hover:shadow-primary/20 hover:shadow-xl hover:-translate-y-1">
                            <div className="flex items-center justify-center h-16 w-16 mx-auto bg-secondary/10 rounded-full">
                                {service.icon}
                            </div>
                            <h3 className="mt-6 text-lg font-semibold leading-6 text-foreground">
                                {service.title}
                            </h3>
                            <p className="mt-2 text-base text-muted-foreground">{service.description}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}