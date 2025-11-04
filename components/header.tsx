"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, Phone } from "lucide-react";
import { NavigationLinks } from "./navigation-links";
import { WhatsAppButton } from "./whatsapp-button";
import { WhatsAppIcon } from "./icons/whatsapp-icon";
import { CallButton } from "./call-button";
import { ThemeToggle } from "./theme-toggle";

// Define the structure of our site settings data
type SiteSettings = {
    site_logo_url: string | null;
    brand_name: string | null;
    whatsapp_no: string | null;
    contact_no: string | null;
};

// Define the props for our Header component
type HeaderProps = {
    settings: SiteSettings | null;
};

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/packages", label: "Packages" },
    { href: "/hotels", label: "Hotels" },
    { href: "/flights", label: "Flights" },
    { href: "/about-us", label: "About Us" },
    { href: "/contact-us", label: "Contact Us" },
];

export function Header({ settings }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const whatsappLink = `https://wa.me/${settings?.whatsapp_no}`;
    const callLink = `tel:${settings?.contact_no}`;

    return (
        <header className="sticky top-0 z-50 w-full border-b border-[#0C2B4E]/20 backdrop-blur-md shadow-lg" style={{ backgroundColor: '#0C2B4E', color: '#F4F4F4' }}>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0C2B4E] via-[#0C2B4E] to-[#0C2B4E]/95" />
            <div className="container relative mx-auto flex h-16 items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
                {/* Left side: Logo and Brand Name */}
                <div className="flex-shrink-0">
                    <Link href="/" className="group flex items-center transition-transform duration-300 hover:scale-105">
                        {settings?.site_logo_url ? (
                            <Image
                                src={settings.site_logo_url}
                                alt={settings.brand_name || "Pisran-e-Waqar"}
                                width={250}
                                height={100}
                                className="h-auto w-[120px] object-contain transition-all duration-300 sm:w-[180px] md:w-[220px] lg:w-[250px] group-hover:brightness-110"
                                style={{ height: "auto" }}
                                sizes="(max-width: 640px) 120px, (max-width: 768px) 180px, (max-width: 1024px) 220px, 250px"
                            />
                        ) : (
                            <span className="text-lg font-bold transition-colors duration-300 sm:text-xl md:text-2xl group-hover:text-accent">{settings?.brand_name || "Pisran-e-Waqar"}</span>
                        )}
                    </Link>
                </div>

                {/* Center: Desktop Navigation Links */}
                <div className="hidden md:flex md:flex-1 md:justify-center">
                    <NavigationLinks />
                </div>

                {/* Right side: Icons */}
                <div className="flex flex-shrink-0 items-center space-x-1 sm:space-x-2">
                    {/* Theme Toggle - Desktop */}
                    <div className="hidden md:block">
                        <ThemeToggle />
                    </div>

                    {/* Mobile WhatsApp Icon with Pulse */}
                    <div className="md:hidden flex items-center gap-2">
                        {settings?.whatsapp_no && (
                            <a 
                                href={whatsappLink} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="group inline-flex h-10 w-10 animate-pulse-slow items-center justify-center rounded-lg bg-green-500/10 hover:bg-green-500/20 transition-all duration-300 hover:scale-110"
                            >
                                <WhatsAppIcon className="h-6 w-6 text-green-500 transition-transform duration-300 group-hover:scale-110" />
                            </a>
                        )}
                        {settings?.contact_no && (
                            <a 
                                href={callLink} 
                                className="group inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110"
                            >
                                <Phone className="h-5 w-5 text-[#F4F4F4] transition-transform duration-300 group-hover:scale-110" />
                            </a>
                        )}
                    </div>

                    {/* Desktop WhatsApp Button */}
                    <div className="hidden md:block">
                        {settings?.contact_no && (
                            <CallButton href={callLink} />
                        )}
                        {settings?.whatsapp_no && (
                            <WhatsAppButton href={whatsappLink} />
                        )}
                    </div>

                    {/* Theme Toggle - Mobile */}
                    <div className="md:hidden">
                        <ThemeToggle />
                    </div>

                    {/* Mobile Menu (Burger Icon) */}
                    <div className="md:hidden">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => setIsMenuOpen(!isMenuOpen)} 
                            className="group text-[#F4F4F4] hover:bg-white/10 rounded-lg transition-all duration-300 hover:scale-110"
                        >
                            <Menu className={`h-6 w-6 transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`} />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </div>
                </div>
            </div>
            {/* Mobile Dropdown Menu */}
            <div
                className={`absolute w-full origin-top shadow-2xl backdrop-blur-md transition-all duration-300 ease-in-out md:hidden border-t border-white/10 ${
                    isMenuOpen ? "opacity-100 scale-y-100 translate-y-0" : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
                }`}
                style={{ backgroundColor: '#0C2B4E', color: '#F4F4F4' }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-[#0C2B4E] via-[#0C2B4E] to-[#0C2B4E]/95" />
                <nav className="relative flex flex-col space-y-1 p-4">
                    {navLinks.map((link, index) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="group relative rounded-lg px-4 py-3 text-sm font-medium text-[#F4F4F4]/80 transition-all duration-300 hover:bg-white/10 hover:text-[#F4F4F4] hover:translate-x-2 hover:pl-6"
                            style={{ animationDelay: `${index * 50}ms` }}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <span className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}
