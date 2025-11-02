import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube, Users } from "lucide-react";

type SocialLinks = {
    [key: string]: string;
} | null;

const socialIcons: { [key: string]: React.ReactNode } = {
    facebook: <Facebook className="h-6 w-6" />,
    instagram: <Instagram className="h-6 w-6" />,
    twitter: <Twitter className="h-6 w-6" />,
    youtube: <Youtube className="h-6 w-6" />,
};

export function FollowUsCard({ socialLinks }: { socialLinks: SocialLinks }) {
    return (
        <div className="bg-background p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6 flex items-center"><Users className="mr-3 h-6 w-6" /> Follow Us</h2>
            <div className="flex space-x-6">
                {socialLinks && Object.entries(socialLinks).map(([platform, url]) => (
                    <Link key={platform} href={url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        {socialIcons[platform.toLowerCase()] || null}
                        <span className="sr-only">{platform}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}