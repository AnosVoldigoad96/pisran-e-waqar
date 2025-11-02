import { Hero } from "@/components/home/hero";
import { FeaturedPackages } from "@/components/home/featured-packages";
import { TrustedSection } from "@/components/home/trusted-section";
import { ServicesSection } from "@/components/home/services-section";
import { FeaturedFlights } from "@/components/home/featured-flights";
import { FollowUsSection } from "@/components/home/follow-us-section";
import { FeaturedHotels } from "@/components/home/featured-hotels";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { FaqSection } from "@/components/home/faq-section";
import { supabase } from "@/lib/supabase";
import { CtaSection } from "@/components/home/cta-section";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';

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
    social_links: { [key: string]: string } | null;
    contact_no: string | null;
};

type Package = {
    id: number;
    package_name: string;
    departure_city: string | null;
    duration_days: number | null;
    makkah_hotel_name: string | null;
    makkah_days_stay: number | null;
    makkah_hotel_distance: string | null;
    madinah_hotel_name: string | null;
    madinah_days_stay: number | null;
    madinah_hotel_distance: string | null;
    pricing: { [key: string]: string } | null;
};

type Flight = {
    id: number;
    flight_number: string;
    departure_city: string;
    arrival_city: string;
    price: number | null;
    departure_time: string | null;
    arrival_time: string | null;
    return_flight_number: string | null;
    return_departure_city: string | null;
    return_arrival_city: string | null;
    return_departure_time: string | null;
    return_arrival_time: string | null;
    airlines: {
        name: string;
        logo_url: string | null;
    } | null;
};

type Hotel = {
    id: number;
    name: string;
    city: 'Makkah' | 'Madinah' | null;
    rating: number | null;
    images: string[] | null;
    description: string | null;
    features_offered: { [key: string]: string } | null;
};

type Testimonial = {
    id: number;
    author_name: string;
    author_location: string | null;
    quote: string | null;
};

type Faq = {
    id: number;
    question: string;
    answer: string | null;
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
        .select('whatsapp_no, social_links, contact_no')
        .eq('singleton_guard', true)
        .single();

    if (error) {
        console.error("Error fetching contact info:", error);
        return null;
    }
    return data;
}

async function getFeaturedPackages(): Promise<Package[]> {
    const { data, error } = await supabase
        .from('packages')
        .select('*')
        .eq('is_featured', true)
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching featured packages:", error);
        return [];
    }
    return data as Package[];
}

async function getFeaturedFlights(): Promise<Flight[]> {
    const { data, error } = await supabase
        .from('flights')
        .select('*, airlines(name, logo_url)')
        .eq('is_featured', true)
        .order('departure_time', { ascending: true });

    if (error) {
        console.error("Error fetching featured flights:", error);
        return [];
    }
    return data as unknown as Flight[];
}

async function getFeaturedHotels(): Promise<Hotel[]> {
    const { data, error } = await supabase
        .from('hotels')
        .select('id, name, city, rating, images, description, features_offered')
        .eq('is_featured', true)
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching featured hotels:", error);
        return [];
    }
    return data as Hotel[];
}

async function getTestimonials(): Promise<Testimonial[]> {
    const { data, error } = await supabase
        .from('testimonials')
        .select('id, author_name, author_location, quote')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching testimonials:", error);
        return [];
    }
    return data as Testimonial[];
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

export default async function HomePage() {
    const heroData = await getHeroData();
    const contactInfo = await getContactInfo();
    const featuredPackages = await getFeaturedPackages();
    const featuredFlights = await getFeaturedFlights();
    const featuredHotels = await getFeaturedHotels();
    const testimonials = await getTestimonials();
    const faqs = await getFaqs();

    return <>
        <Hero heroData={heroData} contactInfo={contactInfo} />
        <TrustedSection />
        <FeaturedPackages packages={featuredPackages} contactInfo={contactInfo} />
        <ServicesSection />
        <FeaturedFlights flights={featuredFlights} contactInfo={contactInfo} />
        <FollowUsSection socialLinks={contactInfo?.social_links || null} />
        <FeaturedHotels hotels={featuredHotels} />
        <TestimonialsSection testimonials={testimonials} />
        <FaqSection faqs={faqs} />
        <CtaSection contactInfo={contactInfo} />
    </>;
}