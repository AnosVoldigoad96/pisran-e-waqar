import { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import { HotelList } from "@/components/hotels/hotel-list";

type Hotel = {
    id: number;
    name: string;
    city: 'Makkah' | 'Madinah';
    rating: number;
    features_offered: { distance_from_haram?: string } | null;
    images: string[] | null;
    description: string | null;
};

type ContactInfo = {
    whatsapp_no: string | null;
    contact_no: string | null;
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
        .eq('page_slug', 'hotels')
        .single<PageSeoData>();

    if (error || !data) {
        return {
            title: "Our Hotels",
            description: "Browse our selection of hotels in Makkah and Madinah.",
        };
    }

    return { title: data.seo_title, description: data.seo_description, keywords: data.seo_tags };
};

async function getHotels(): Promise<Hotel[]> {
    const { data: hotels, error } = await supabase
        .from('hotels')
        .select('*')
        .order('rating', { ascending: false });

    if (error) console.error("Error fetching hotels:", error);
    return (hotels as Hotel[]) || [];
}

async function getContactInfo(): Promise<ContactInfo | null> {
    const { data, error } = await supabase
        .from('site_settings')
        .select('whatsapp_no, contact_no')
        .eq('singleton_guard', true)
        .single();

    if (error) console.error("Error fetching contact info:", error);
    return data;
}

export default async function HotelsPage() {
    const hotels = await getHotels();
    const contactInfo = await getContactInfo();
    return <HotelList hotels={hotels} contactInfo={contactInfo} />;
}