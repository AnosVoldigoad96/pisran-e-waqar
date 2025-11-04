import { supabase } from "@/lib/supabase";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';

type PageSeoData = {
    seo_title: string | null;
    seo_description: string | null;
    seo_tags: string | null;
};

export async function generateMetadata(): Promise<Metadata> {
    const { data, error } = await supabase
        .from('page_seo_data')
        .select('seo_title, seo_description, seo_tags')
        .eq('page_slug', 'terms')
        .single<PageSeoData>();

    if (error || !data) {
        return {
            title: "Terms and Conditions",
            description: "Read our terms and conditions before using our services.",
        };
    }

    return { title: data.seo_title, description: data.seo_description, keywords: data.seo_tags };
}

export default function TermsAndConditionsPage() {
    return (
        <div className="w-full bg-background">
            <div className="w-full bg-secondary py-16">
                <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-secondary-foreground sm:text-4xl">
                        Terms and Conditions
                    </h1>
                    <p className="mt-2 text-lg leading-8 text-secondary-foreground/80">
                        Last updated: November 2, 2025
                    </p>
                </div>
            </div>
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-16">
                <div className="prose prose-lg max-w-4xl mx-auto">
                    <p>
                        Welcome to Pisran-e-Waqar. These terms and conditions outline the rules and regulations for the use of our website and services.
                    </p>

                    <h2>1. Agreement to Terms</h2>
                    <p>
                        By using our services, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
                    </p>

                    <h2>2. Services</h2>
                    <p>
                        We provide travel and pilgrimage services, including but not limited to Umrah packages, flight bookings, and hotel accommodations. All services are subject to availability and confirmation. We reserve the right to modify or discontinue any service without notice at any time.
                    </p>

                    <h2>3. Booking and Payment</h2>
                    <p>
                        All bookings must be accompanied by the required payment. Prices are subject to change without prior notice. We accept various forms of payment as indicated on our website.
                    </p>

                    <h2>4. Cancellations and Refunds</h2>
                    <p>
                        Cancellation policies vary depending on the service booked. Please refer to the specific cancellation terms provided at the time of booking. Refunds, if applicable, will be processed according to our refund policy.
                    </p>

                    <h2>5. User Responsibilities</h2>
                    <p>
                        You are responsible for ensuring that all travel documents, including passports and visas, are valid and up-to-date. You must comply with all applicable laws and regulations of the countries you are visiting.
                    </p>

                    <h2>6. Intellectual Property</h2>
                    <p>
                        The content, layout, design, data, databases and graphics on this website are protected by intellectual property laws. You may not reproduce, republish, or redistribute the material on this website without our written consent.
                    </p>

                    <h2>7. Limitation of Liability</h2>
                    <p>
                        We will not be liable for any direct, indirect, incidental, special, or consequential damages that result from the use of, or the inability to use, our services or website.
                    </p>

                    <h2>8. Governing Law</h2>
                    <p>
                        These terms and conditions are governed by and construed in accordance with the laws of Pakistan and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                    </p>

                    <h2>9. Changes to Terms</h2>
                    <p>
                        We reserve the right to amend these terms and conditions at any time. Any changes will be posted on this page, and your continued use of our services will constitute your acceptance of the new terms.
                    </p>
                </div>
            </div>
        </div>
    );
}