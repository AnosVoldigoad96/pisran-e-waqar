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
        <div className="bg-card border-2 border-border p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-4">
                <span className="text-sm font-semibold text-secondary">Social Media</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6 flex items-center">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-secondary/10 mr-3">
                    <Users className="h-6 w-6 text-secondary" />
                </div>
                Follow Us
            </h2>
            <div className="flex flex-wrap gap-4">
                {socialLinks && Object.entries(socialLinks).map(([platform, url], index) => (
                    <Link 
                        key={platform} 
                        href={url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="group flex items-center justify-center h-12 w-12 rounded-lg bg-muted/50 hover:bg-secondary/10 text-muted-foreground hover:text-secondary transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        {socialIcons[platform.toLowerCase()] || null}
                        <span className="sr-only">{platform}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}