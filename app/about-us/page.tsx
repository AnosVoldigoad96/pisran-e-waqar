import { CompanyIntro } from "@/components/about/company-intro";
import { TeamSection } from "@/components/about/team-section";
import { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import { OurValues } from "@/components/about/our-values";

export const dynamic = 'force-dynamic';

type AboutContent = {
    intro: string | null;
    moto: string | null;
};

type PageSeoData = {
    seo_title: string | null;
    seo_description: string | null;
    seo_tags: string | null;
};

async function getAboutContent(): Promise<AboutContent | null> {
    const { data, error } = await supabase
        .from('about_us_content')
        .select('intro, moto')
        .eq('id', 1)
        .single();

    if (error) {
        console.error("Error fetching about us content:", error);
        return null;
    }
    return data;
}

type TeamMember = {
    id: number;
    name: string;
    role: string | null;
    imageUrl: string | null;
};

async function getTeamMembers(): Promise<TeamMember[]> {
    const { data, error } = await supabase
        .from('team_members')
        .select('id, name, position, image_url');

    if (error) {
        console.error("Error fetching team members:", error);
        return [];
    }

    // Map database fields to component props
    return data.map(member => ({ id: member.id, name: member.name, role: member.position, imageUrl: member.image_url })) || [];
}

export async function generateMetadata(): Promise<Metadata> {
    const { data, error } = await supabase
        .from('page_seo_data')
        .select('seo_title, seo_description, seo_tags')
        .eq('page_slug', 'about-us')
        .single<PageSeoData>();

    if (error || !data) {
        return {
            title: "About Us",
            description: "Learn more about Pisran-e-Waqar, our mission, and the dedicated team behind our success in providing exceptional Umrah services.",
        };
    }

    return { title: data.seo_title, description: data.seo_description, keywords: data.seo_tags };
}

export default async function AboutUsPage() {
    const aboutContent = await getAboutContent();
    const teamMembers = await getTeamMembers();

    return (
        <>
            <CompanyIntro aboutContent={aboutContent} />
            <OurValues />
            <TeamSection teamMembers={teamMembers} />
        </>
    );
}