import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube, ShieldCheck, BadgePercent, Users, Rocket, Phone, Mail, MessageCircle, ChevronRight, Link2, Headset, MapPin, Clock, Send, Mail as MailIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Define the structure of our site settings data
type SiteSettings = {
    brand_name: string | null;
    social_links: { [key: string]: string } | null;
    address: string | null;
    contact_no: string | null;
    email: string | null;
    whatsapp_no: string | null;
};

// Define the props for our Footer component
type FooterProps = {
    settings: SiteSettings | null;
};

const socialIcons: { [key: string]: React.ReactNode } = {
    facebook: <Facebook className="h-5 w-5" />,
    instagram: <Instagram className="h-5 w-5" />,
    twitter: <Twitter className="h-5 w-5" />,
    youtube: <Youtube className="h-5 w-5" />,
};

const features = [
    { icon: <ShieldCheck className="h-10 w-10 mb-4 text-accent" />, text: "Trusted" },
    { icon: <BadgePercent className="h-10 w-10 mb-4 text-accent" />, text: "Best Price" },
    { icon: <Users className="h-10 w-10 mb-4 text-accent" />, text: "50k+ Happy Customers" },
    { icon: <Rocket className="h-10 w-10 mb-4 text-accent" />, text: "Fast Booking" },
];

const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/packages", label: "Packages" },
    { href: "/hotels", label: "Hotels" },
    { href: "/flights", label: "Flights" },
    { href: "/about-us", label: "About Us" },
    { href: "/contact-us", label: "Contact Us" },
];

export function Footer({ settings }: FooterProps) {
    const currentYear = new Date().getFullYear();
    const whatsappLink = `https://wa.me/${settings?.whatsapp_no}`;

    return (
        <footer className="bg-primary text-primary-foreground">
            <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-8 lg:px-32 text-left">
                {/* "Why Choose Us" Section */}
                <div className="py-12 text-center">
                    <h3 className="text-2xl font-bold mb-8">Why Choose Us</h3>
                    <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
                        {features.map((feature, index) => (
                            <div key={index} className="flex flex-col items-center">
                                {feature.icon}
                                <p className="font-semibold">{feature.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Original Footer Content */}
                <div className="grid grid-cols-1 gap-8 border-t border-primary-foreground/20 py-12 md:grid-cols-4">
                    {/* Column 1: Company Info */}
                    <div>
                        <h3 className="font-bold text-lg">{settings?.brand_name || "Pisran-e-Waqar"}</h3>
                        <p className="text-sm italic text-primary-foreground/70 mt-1">Your trusted partner for Umrah.</p>
                        <p className="text-sm text-primary-foreground/80 mt-4">Dedicated to providing memorable and sacred journeys. We handle every detail of your pilgrimage with care, ensuring a seamless and spiritually fulfilling experience.</p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="space-y-4">
                        <h4 className="font-semibold flex items-center"><Link2 className="mr-2 h-5 w-5" /> Quick Links</h4>
                        <nav className="flex flex-col space-y-2">
                            {quickLinks.map((link) => (
                                <Link key={link.href} href={link.href} className="flex items-center text-sm text-primary-foreground/80 hover:text-primary-foreground hover:underline">
                                    <ChevronRight className="mr-2 h-4 w-4" />
                                    <span>{link.label}</span>
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Column 3: Contact Info */}
                    <div className="space-y-4">
                        <h4 className="font-semibold flex items-center"><Headset className="mr-2 h-5 w-5" /> Contact Us</h4>
                        <div className="space-y-2 text-sm text-primary-foreground/80">
                            {settings?.address && <p className="flex items-start"><MapPin className="mr-2 h-4 w-4 flex-shrink-0 mt-1" /> {settings.address}</p>}
                            {settings?.contact_no && <p className="flex items-center"><Phone className="mr-2 h-4 w-4" /> {settings.contact_no}</p>}
                            {settings?.email && <p className="flex items-center"><Mail className="mr-2 h-4 w-4" /> {settings.email}</p>}
                            {settings?.whatsapp_no && <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-primary-foreground"><MessageCircle className="mr-2 h-4 w-4" /> {settings.whatsapp_no}</a>}
                        </div>
                    </div>

                    {/* Column 4: Socials & Hours */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h4 className="font-semibold flex items-center"><Users className="mr-2 h-5 w-5" /> Follow Us</h4>
                            <div className="flex space-x-4">
                                {settings?.social_links && Object.entries(settings.social_links).map(([platform, url]) => (
                                    <Link key={platform} href={url} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/80 hover:text-primary-foreground">
                                        {socialIcons[platform.toLowerCase()] || null}
                                        <span className="sr-only">{platform}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h4 className="font-semibold flex items-center"><Clock className="mr-2 h-5 w-5" /> Business Hours</h4>
                            <p className="text-sm text-primary-foreground/80">Mon - Sat: 9:00 AM - 5:00 PM</p>
                        </div>
                    </div>
                </div>

                {/* Newsletter Subscription Section */}
                <div className="border-t border-primary-foreground/20 py-12 text-center">
                    <h3 className="text-2xl font-bold mb-4">Stay Updated with Exclusive Umrah Packages</h3>
                    <p className="max-w-2xl mx-auto mb-8 text-primary-foreground/80">
                        Subscribe to our newsletter and be the first to know about special offers, last-minute deals, and travel inspiration for your next spiritual journey.
                    </p>
                    <div className="relative flex w-full max-w-sm mx-auto items-center space-x-2">
                        <MailIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-primary-foreground/50" />
                        <Input type="email" placeholder="Enter your email address" className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:ring-accent pl-10" />
                        <Button type="submit" variant="secondary" className="flex items-center gap-2">
                            <Send className="h-4 w-4" />
                            <span>Subscribe</span>
                        </Button>
                    </div>
                    <p className="text-xs text-primary-foreground/60 mt-4">We respect your privacy. Unsubscribe at any time.</p>
                </div>

                {/* Privacy & Legal Section */}
                <div className="grid grid-cols-1 gap-4 border-t border-primary-foreground/20 py-8 text-sm md:grid-cols-2 md:items-center">
                    <div className="text-center text-primary-foreground/80 md:text-left">
                        <p>&copy; {currentYear} {settings?.brand_name || "Pisran-e-Waqar"}. All rights reserved.</p>
                        <p className="mt-1">Registered in Pakistan. License No# LHR11414.</p>
                    </div>
                    <div className="flex justify-center space-x-6 md:justify-end">
                        <Link href="/privacy-policy" className="text-primary-foreground/80 hover:text-primary-foreground hover:underline">Privacy Policy</Link>
                        <Link href="/terms-and-conditions" className="text-primary-foreground/80 hover:text-primary-foreground hover:underline">Terms & Conditions</Link>
                    </div>
                </div>

                {/* Creator Credit Section */}
                <div className="border-t border-primary-foreground/20 py-6 text-center text-sm text-primary-foreground/60">
                    <p>Created by AnosVoldigoad96</p>
                </div>
            </div>
        </footer>
    );
}
