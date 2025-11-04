import { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import { ContactHeader } from "@/components/contact-us/contact-header";
import { ContactDetails } from "@/components/contact-us/contact-details";
import { ContactForm } from "@/components/contact-us/contact-form";
import { MapLocation } from "@/components/contact-us/map-location";
import { FollowUsCard } from "@/components/contact-us/follow-us-card";
import { BusinessHoursCard } from "@/components/contact-us/business-hours-card";

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
        .eq('page_slug', 'contact-us')
        .single<PageSeoData>();

    if (error || !data) {
        return {
            title: "Contact Us",
            description: "Get in touch with Pisran-e-Waqar for any inquiries about our Umrah, Hajj, and flight booking services. We're here to help you with your sacred journey.",
        };
    }

    return { title: data.seo_title, description: data.seo_description, keywords: data.seo_tags };
};

type ContactInfo = {
    email: string | null;
    contact_no: string | null;
    address: string | null;
    whatsapp_no: string | null;
    social_links: { [key: string]: string } | null;
};

async function getContactInfo(): Promise<ContactInfo | null> {
    const { data, error } = await supabase
        .from('site_settings')
        .select('email, contact_no, address, whatsapp_no, social_links')
        .eq('singleton_guard', true)
        .single();

    if (error) {
        console.error("Error fetching contact info:", error);
        return null;
    }
    return data;
}

export default async function ContactUsPage() {
    const contactInfo = await getContactInfo();

    return (
        <>
            <ContactHeader />
            <div className="w-full bg-[#fff6f6]">
                <div className="container mx-auto px-4 sm:px-8 lg:px-32 py-16 sm:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                        <div className="lg:col-span-3 space-y-8">
                            <ContactForm />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <FollowUsCard socialLinks={contactInfo?.social_links || null} />
                                <BusinessHoursCard />
                            </div>
                    </div>
                    <div className="lg:col-span-2 space-y-8">
                        <ContactDetails contactInfo={contactInfo} />
                        <MapLocation />
                    </div>
                </div>
            </div>
            </div>
        </>
    );
}