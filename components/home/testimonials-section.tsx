"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Quote } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

type Testimonial = {
    id: number;
    author_name: string;
    author_location: string | null;
    quote: string | null;
};

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
    if (!testimonials || testimonials.length === 0) {
        return null;
    }

    return (
        <section className="w-full pt-8 sm:pt-12 pb-8 sm:pb-12 bg-gradient-to-b from-muted/30 via-background to-background relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
            
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
                <div className="mx-auto max-w-2xl text-center">
                    <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-4">
                        <span className="text-sm font-semibold text-secondary">Testimonials</span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        What Our Pilgrims Say
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-muted-foreground">
                        Hear from those who have embarked on their sacred journey with us.
                    </p>
                </div>
                <Carousel
                    opts={{ align: "start", loop: true }}
                    plugins={[
                        Autoplay({
                            delay: 5000,
                            stopOnInteraction: true,
                        }),
                    ]}
                    className="w-full mt-12"
                >
                    <CarouselContent className="-ml-6">
                        {testimonials.map((testimonial) => (
                            <CarouselItem key={testimonial.id} className="pl-6 md:basis-1/2 lg:basis-1/3">
                                <div className="h-full p-1">
                                    <div className="flex h-full flex-col justify-between rounded-xl border-2 border-border bg-card p-6 text-card-foreground shadow-lg transition-all duration-500 hover:shadow-2xl hover:shadow-secondary/20 hover:-translate-y-2 group">
                                        <div className="flex-grow">
                                            <Quote className="h-8 w-8 text-secondary mb-4" />
                                            <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                                        </div>
                                        <div className="mt-6 text-right">
                                            <p className="font-bold text-foreground">{testimonial.author_name}</p>
                                            {testimonial.author_location && <p className="text-sm text-muted-foreground">{testimonial.author_location}</p>}
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </section>
    );
}