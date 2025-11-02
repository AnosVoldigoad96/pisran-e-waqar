import { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import { FlightList } from "@/components/flights/flight-list";
import { FlightInquiryForm } from "@/components/flights/flight-inquiry-form";
import { FlightCTA } from "@/components/flights/flight-cta";

export const dynamic = 'force-dynamic';

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
        .eq('page_slug', 'flights')
        .single<PageSeoData>();

    if (error || !data) {
        return {
            title: "Flights",
            description: "Find the best flights for your journey.",
        };
    }

    return { title: data.seo_title, description: data.seo_description, keywords: data.seo_tags };
};

async function getFlights(): Promise<Flight[]> {
    const { data: flights, error } = await supabase
        .from('flights')
        .select('*, airlines (name, logo_url)');

    if (error) console.error("Error fetching flights:", error);
    return (flights as Flight[]) || [];
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

export default async function FlightsPage() {
    const flights = await getFlights();
    const contactInfo = await getContactInfo();
    return (
        <>
            <FlightList flights={flights} contactInfo={contactInfo} />
            <FlightInquiryForm />
            <FlightCTA contactInfo={contactInfo} />
        </>
    );
}
