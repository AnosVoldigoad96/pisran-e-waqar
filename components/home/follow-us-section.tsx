import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { cn } from "@/lib/utils";

type SocialLinks = { [key: string]: string } | null;

type SocialPlatform = {
    icon: React.ReactNode;
    shadowColor: string;
};

const socialPlatforms: { [key: string]: SocialPlatform } = {
    facebook: { icon: <Facebook className="h-16 w-16" />, shadowColor: "hover:shadow-[#1877F2]/40" },
    instagram: { icon: <Instagram className="h-16 w-16" />, shadowColor: "hover:shadow-[#E4405F]/40" },
    twitter: { icon: <Twitter className="h-16 w-16" />, shadowColor: "hover:shadow-[#1DA1F2]/40" },
    youtube: { icon: <Youtube className="h-16 w-16" />, shadowColor: "hover:shadow-[#FF0000]/40" },
};

export function FollowUsSection({ socialLinks }: { socialLinks: SocialLinks }) {
    if (!socialLinks || Object.keys(socialLinks).length === 0) {
        return null;
    }

    return (
        <section className="pt-8 sm:pt-12 pb-8 sm:pb-12 bg-[#fff6f6]">
            <div className="container px-4 sm:px-8 lg:px-32">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Follow Our Journey
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-muted-foreground">
                        Connect with us on social media for the latest updates, offers, and travel inspiration.
                    </p>
                </div>
                <div className="mt-16 flex flex-wrap justify-center items-center gap-8">
                    {Object.entries(socialLinks).map(([platform, url]) => {
                        const social = socialPlatforms[platform.toLowerCase()];
                        return (
                            <div key={platform} className={cn("w-[150px] rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1", social?.shadowColor)}>
                                <Link
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center justify-center p-6 text-muted-foreground transition-colors duration-300 hover:text-secondary"
                                >
                                    {social?.icon || null}
                                    <span className="mt-4 font-semibold capitalize text-foreground">{platform}</span>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}