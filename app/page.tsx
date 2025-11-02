import { Hero } from "@/components/home/hero";
import { supabase } from "@/lib/supabase";
import { Metadata } from "next";

type PageSeoData = {
    seo_title: string | null;
    seo_description: string | null;
    seo_tags: string | null;
};

type HeroData = {
    hero_title: string | null;
    hero_subtitle: string | null;
    hero_image_url: string | null;
};

type ContactInfo = {
    whatsapp_no: string | null;
};

export async function generateMetadata(): Promise<Metadata> {
    const { data, error } = await supabase
        .from('page_seo_data')
        .select('seo_title, seo_description, seo_tags')
        .eq('page_slug', 'home')
        .single<PageSeoData>();

    if (error || !data) {
        return {
            title: "Pisran-e-Waqar | Your Trusted Partner for Umrah & Hajj",
            description: "Discover affordable Umrah and Hajj packages, book flights, and find the best hotels in Makkah and Madinah. Your sacred journey starts here.",
        };
    }

    return { title: data.seo_title, description: data.seo_description, keywords: data.seo_tags };
};

async function getHeroData(): Promise<HeroData | null> {
    const { data, error } = await supabase
        .from('homepage_content')
        .select('hero_title, hero_subtitle, hero_image_url')
        .eq('id', 1)
        .single();

    if (error) {
        console.error("Error fetching hero data:", error);
        return null;
    }
    return data;
}

async function getContactInfo(): Promise<ContactInfo | null> {
    const { data, error } = await supabase
        .from('site_settings')
        .select('whatsapp_no')
        .eq('singleton_guard', true)
        .single();

    if (error) {
        console.error("Error fetching contact info:", error);
        return null;
    }
    return data;
}

export default async function HomePage() {
    const heroData = await getHeroData();
    const contactInfo = await getContactInfo();
    return <Hero heroData={heroData} contactInfo={contactInfo} />;
}