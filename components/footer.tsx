import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube, ShieldCheck, BadgePercent, Users, Rocket, Phone, Mail, MessageCircle, ChevronRight, Link2, Headset, MapPin, Clock, Send, Mail as MailIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Define the structure of our site settings data
type SiteSettings = {
    brand_name: string | null;
    site_logo_url: string | null;
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
    { href: "/faq", label: "FAQs" },
];

export function Footer({ settings }: FooterProps) {
    const currentYear = new Date().getFullYear();
    const whatsappLink = `https://wa.me/${settings?.whatsapp_no}`;

    return (
        <footer style={{ backgroundColor: '#0C2B4E', color: '#F4F4F4' }} className="relative overflow-hidden">
            {/* Decorative gradient circles */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
            
            <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 text-left relative z-10">
                {/* "Why Choose Us" Section */}
                <div className="py-12 text-center">
                    <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-4">
                        <span className="text-sm font-semibold text-white">Why Choose Us</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-8 text-[#F4F4F4]">Why Choose Us</h3>
                    <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
                        {features.map((feature, index) => (
                            <div 
                                key={index} 
                                className="group flex flex-col items-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-2 hover:scale-105"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                                    {feature.icon}
                                </div>
                                <p className="font-semibold text-[#F4F4F4] group-hover:text-accent transition-colors duration-300">{feature.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Original Footer Content */}
                <div className="grid grid-cols-1 gap-8 border-t border-[#F4F4F4]/20 py-12 md:grid-cols-4">
                    {/* Column 1: Company Info */}
                    <div className="group">
                        <Link href="/" className="flex items-center gap-3 mb-4 transition-transform duration-300 hover:scale-105 inline-flex">
                            {settings?.site_logo_url && (
                                <div className="relative flex-shrink-0">
                                    <Image
                                        src={settings.site_logo_url}
                                        alt={settings.brand_name || "Pisran-e-Waqar"}
                                        width={60}
                                        height={60}
                                        className="h-12 w-12 object-contain transition-all duration-300 sm:h-14 sm:w-14 md:h-16 md:w-16 group-hover:brightness-110"
                                        style={{ height: "auto" }}
                                        sizes="(max-width: 640px) 48px, (max-width: 768px) 56px, 64px"
                                    />
                                </div>
                            )}
                            <div className="hidden sm:flex flex-col">
                                <h3 className="font-bold text-lg sm:text-xl md:text-2xl text-[#F4F4F4] group-hover:text-accent transition-colors duration-300 leading-tight">
                                    {settings?.brand_name || "Pisran-e-Waqar"}
                                </h3>
                                <span className="text-xs sm:text-sm text-[#F4F4F4]/70 font-medium leading-tight">
                                    Travels & Tours Pvt. (Ltd.)
                                </span>
                            </div>
                        </Link>
                        <p className="text-sm italic text-[#F4F4F4]/70 mt-1">Your trusted partner for Umrah.</p>
                        <p className="text-sm text-[#F4F4F4]/80 mt-4 leading-relaxed">Dedicated to providing memorable and sacred journeys. We handle every detail of your pilgrimage with care, ensuring a seamless and spiritually fulfilling experience.</p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="space-y-4">
                        <h4 className="font-semibold flex items-center text-[#F4F4F4]">
                            <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-white/10 mr-2">
                                <Link2 className="h-4 w-4" />
                            </div>
                            Quick Links
                        </h4>
                        <nav className="flex flex-col space-y-2">
                            {quickLinks.map((link, index) => (
                                <Link 
                                    key={link.href} 
                                    href={link.href} 
                                    className="group flex items-center text-sm text-[#F4F4F4]/80 hover:text-accent transition-all duration-300 hover:translate-x-2"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <ChevronRight className="mr-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                                    <span>{link.label}</span>
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Column 3: Contact Info */}
                    <div className="space-y-4">
                        <h4 className="font-semibold flex items-center text-[#F4F4F4]">
                            <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-white/10 mr-2">
                                <Headset className="h-4 w-4" />
                            </div>
                            Contact Us
                        </h4>
                        <div className="space-y-3 text-sm text-[#F4F4F4]/80">
                            {settings?.address && (
                                <div className="group flex items-start p-2 rounded-lg hover:bg-white/5 transition-all duration-300">
                                    <MapPin className="mr-2 h-4 w-4 flex-shrink-0 mt-1 group-hover:text-accent transition-colors duration-300" />
                                    <span className="group-hover:text-[#F4F4F4] transition-colors duration-300">{settings.address}</span>
                                </div>
                            )}
                            {settings?.contact_no && (
                                <a href={`tel:${settings.contact_no}`} className="group flex items-center p-2 rounded-lg hover:bg-white/5 transition-all duration-300">
                                    <Phone className="mr-2 h-4 w-4 group-hover:text-accent transition-colors duration-300" />
                                    <span className="group-hover:text-[#F4F4F4] transition-colors duration-300">{settings.contact_no}</span>
                                </a>
                            )}
                            {settings?.email && (
                                <a href={`mailto:${settings.email}`} className="group flex items-center p-2 rounded-lg hover:bg-white/5 transition-all duration-300">
                                    <Mail className="mr-2 h-4 w-4 group-hover:text-accent transition-colors duration-300" />
                                    <span className="group-hover:text-[#F4F4F4] transition-colors duration-300">{settings.email}</span>
                                </a>
                            )}
                            {settings?.whatsapp_no && (
                                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="group flex items-center p-2 rounded-lg hover:bg-white/5 transition-all duration-300">
                                    <MessageCircle className="mr-2 h-4 w-4 group-hover:text-green-400 transition-colors duration-300" />
                                    <span className="group-hover:text-green-400 transition-colors duration-300">{settings.whatsapp_no}</span>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Column 4: Socials & Hours */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h4 className="font-semibold flex items-center text-[#F4F4F4]">
                                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-white/10 mr-2">
                                    <Users className="h-4 w-4" />
                                </div>
                                Follow Us
                            </h4>
                            <div className="flex flex-wrap gap-3">
                                {settings?.social_links && Object.entries(settings.social_links).map(([platform, url], index) => (
                                    <Link 
                                        key={platform} 
                                        href={url} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="group flex items-center justify-center h-10 w-10 rounded-lg bg-white/10 hover:bg-white/20 text-[#F4F4F4]/80 hover:text-[#F4F4F4] transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                                        style={{ animationDelay: `${index * 50}ms` }}
                                    >
                                        {socialIcons[platform.toLowerCase()] || null}
                                        <span className="sr-only">{platform}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h4 className="font-semibold flex items-center text-[#F4F4F4]">
                                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-white/10 mr-2">
                                    <Clock className="h-4 w-4" />
                                </div>
                                Business Hours
                            </h4>
                            <div className="space-y-2">
                                <p className="text-sm text-[#F4F4F4]/80 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300">Mon - Sat: 9:00 AM - 5:00 PM</p>
                                <p className="text-sm text-[#F4F4F4]/80 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300">Sunday: Closed</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Newsletter Subscription Section */}
                <div className="border-t border-[#F4F4F4]/20 py-12 text-center relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                    <div className="relative z-10">
                        <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-4">
                            <span className="text-sm font-semibold text-white">Newsletter</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-[#F4F4F4]">Stay Updated with Exclusive Umrah Packages</h3>
                        <p className="max-w-2xl mx-auto mb-8 text-[#F4F4F4]/80 leading-relaxed">
                            Subscribe to our newsletter and be the first to know about special offers, last-minute deals, and travel inspiration for your next spiritual journey.
                        </p>
                        <div className="relative flex flex-col sm:flex-row w-full max-w-md mx-auto items-center space-y-3 sm:space-y-0 sm:space-x-3">
                            <div className="relative w-full">
                                <MailIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#F4F4F4]/50" />
                                <Input 
                                    type="email" 
                                    placeholder="Enter your email address" 
                                    className="bg-[#F4F4F4]/10 border-[#F4F4F4]/20 text-[#F4F4F4] placeholder:text-[#F4F4F4]/50 focus:ring-accent focus:border-accent pl-10 transition-all duration-300 hover:bg-[#F4F4F4]/15" 
                                />
                            </div>
                            <Button 
                                type="submit" 
                                className="flex items-center gap-2 bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                            >
                                <Send className="h-4 w-4" />
                                <span>Subscribe</span>
                            </Button>
                        </div>
                        <p className="text-xs text-[#F4F4F4]/60 mt-4">We respect your privacy. Unsubscribe at any time.</p>
                    </div>
                </div>

                {/* Privacy & Legal Section */}
                <div className="grid grid-cols-1 gap-4 border-t border-[#F4F4F4]/20 py-8 text-sm md:grid-cols-2 md:items-center">
                    <div className="text-center text-[#F4F4F4]/80 md:text-left">
                        <p>&copy; {currentYear} {settings?.brand_name || "Pisran-e-Waqar"}. All rights reserved.</p>
                        <p className="mt-1">Registered in Pakistan. License No# LHR11414.</p>
                    </div>
                    <div className="flex justify-center space-x-6 md:justify-end">
                        <Link 
                            href="/privacy" 
                            className="text-[#F4F4F4]/80 hover:text-accent transition-colors duration-300 hover:underline"
                        >
                            Privacy Policy
                        </Link>
                        <Link 
                            href="/terms" 
                            className="text-[#F4F4F4]/80 hover:text-accent transition-colors duration-300 hover:underline"
                        >
                            Terms & Conditions
                        </Link>
                    </div>
                </div>

                {/* Creator Credit Section */}
                <div className="border-t border-[#F4F4F4]/20 py-6 text-center text-sm text-[#F4F4F4]/60">
                    <p className="hover:text-[#F4F4F4]/80 transition-colors duration-300">Created by AnosVoldigoad96</p>
                </div>
            </div>
        </footer>
    );
}
