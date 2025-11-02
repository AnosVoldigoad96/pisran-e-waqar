import { Metadata } from "next";
import { PackageInclusions } from "@/components/packages/package-inclusions";
import { FlightItineraries } from "@/components/packages/flight-itineraries";
import { UmrahPackages } from "@/components/packages/umrah-packages";
import { CustomPackageForm } from "@/components/packages/custom-package-form";
import { DisclaimerSection } from "@/components/packages/disclaimer-section";
import { supabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

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

type ContactInfo = {
    whatsapp_no: string | null;
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
        .eq('page_slug', 'packages')
        .single<PageSeoData>();

    if (error || !data) {
        return {};
    }

    return { title: data.seo_title, description: data.seo_description, keywords: data.seo_tags };
};

async function getPageData() {
    const packagesPromise = supabase.from('packages').select('*').order('package_name', { ascending: true });
    const contactInfoPromise = supabase.from('site_settings').select('whatsapp_no').eq('singleton_guard', true).single();

    const [{ data: packages, error: packagesError }, { data: contactInfo, error: contactInfoError }] = await Promise.all([packagesPromise, contactInfoPromise]);

    if (packagesError) console.error("Error fetching packages:", packagesError);
    if (contactInfoError) console.error("Error fetching contact info:", contactInfoError);

    return {
        packages: (packages as Package[]) || [],
        contactInfo: (contactInfo as ContactInfo) || null,
    };
}

export default async function PackagesPage() {
    const { packages, contactInfo } = await getPageData();

    return (
        <div>
            <PackageInclusions />
            <FlightItineraries />
            <UmrahPackages packages={packages} contactInfo={contactInfo} />
            <CustomPackageForm />
            <DisclaimerSection />
            {/* We will add more sections to this page later */}
        </div>
    );
}
