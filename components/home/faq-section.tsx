import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Faq = {
    id: number;
    question: string;
    answer: string | null;
};

export function FaqSection({ faqs }: { faqs: Faq[] }) {
    if (!faqs || faqs.length === 0) {
        return null;
    }

    return (
        <section className="w-full pt-8 sm:pt-12 pb-8 sm:pb-12 bg-gradient-to-b from-background via-background to-muted/30 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
            
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                    <div className="lg:col-span-1">
                        <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-4">
                            <span className="text-sm font-semibold text-secondary">FAQs</span>
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            Frequently Asked Questions
                        </h2>
                        <p className="mt-4 text-lg leading-8 text-muted-foreground">
                            Find answers to common questions about our Umrah packages and services.
                        </p>
                    </div>
                    <div className="lg:col-span-2">
                        <Accordion type="single" collapsible className="w-full">
                            {faqs.slice(0, 5).map((faq) => (
                                <AccordionItem key={faq.id} value={`item-${faq.id}`}>
                                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                                    <AccordionContent>
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                        {faqs.length > 5 && (
                            <div className="mt-8 text-center">
                                <Button asChild size="lg">
                                    <Link href="/faq">View All FAQs</Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}