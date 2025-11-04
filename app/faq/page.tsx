import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { supabase } from "@/lib/supabase";
import { Metadata } from "next";
import { HelpCircle } from "lucide-react";

export const dynamic = 'force-dynamic';

type Faq = {
    id: number;
    question: string;
    answer: string | null;
};

type PageSeoData = {
    seo_title: string | null;
    seo_description: string | null;
    seo_tags: string | null;
};

export async function generateMetadata(): Promise<Metadata> {
    const { data, error } = await supabase
        .from('page_seo_data')
        .select('seo_title, seo_description, seo_tags')
        .eq('page_slug', 'faq')
        .single<PageSeoData>();

    if (error || !data) {
        return {
            title: "Frequently Asked Questions",
            description: "Find answers to common questions about our Umrah packages, flights, hotels, and other services.",
        };
    }

    return { title: data.seo_title, description: data.seo_description, keywords: data.seo_tags };
}

async function getFaqs(): Promise<Faq[]> {
    const { data, error } = await supabase
        .from('faqs')
        .select('id, question, answer')
        .order('created_at', { ascending: true });

    if (error) {
        console.error("Error fetching FAQs:", error);
        return [];
    }
    return data as Faq[];
}

export default async function FaqPage() {
    const faqs = await getFaqs();

    return (
        <div className="w-full bg-background">
            <div className="w-full bg-secondary py-16">
                <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-secondary-foreground sm:text-4xl">
                        Frequently Asked Questions
                    </h1>
                    <p className="mt-2 text-lg leading-8 text-secondary-foreground/80">
                        Find answers to common questions about our Umrah packages and services.
                    </p>
                </div>
            </div>
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-16">
                <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto">
                    {faqs.map((faq) => (
                        <AccordionItem key={faq.id} value={`item-${faq.id}`}>
                            <AccordionTrigger className="text-left text-lg">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-base">{faq.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
}