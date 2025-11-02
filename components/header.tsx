"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { NavigationLinks } from "./navigation-links";
import { WhatsAppButton } from "./whatsapp-button";
import { WhatsAppIcon } from "./icons/whatsapp-icon";

// Define the structure of our site settings data
type SiteSettings = {
    site_logo_url: string | null;
    brand_name: string | null;
    whatsapp_no: string | null;
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

    return (
        <header className="sticky top-0 z-50 w-full border-b border-primary-foreground/20 bg-primary text-primary-foreground">
            <div className="flex h-16 items-center justify-between px-4 sm:px-8 lg:px-32">
                {/* Left side: Logo and Brand Name */}
                <div>
                    <Link href="/" className="flex items-center">
                        {settings?.site_logo_url ? (
                            <Image
                                src={settings.site_logo_url}
                                alt={settings.brand_name || "Pisran-e-Waqar"}
                                width={250}
                                height={100}
                                className="object-contain"
                            />
                        ) : null}
                    </Link>
                </div>

                {/* Center: Desktop Navigation Links */}
                <div className="hidden md:block">
                    <NavigationLinks />
                </div>

                {/* Right side: Icons */}
                <div className="flex items-center space-x-2">
                    {/* Mobile WhatsApp Icon with Pulse */}
                    <div className="md:hidden">
                        {settings?.whatsapp_no && (
                            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 w-10 animate-pulse-slow items-center justify-center rounded-md">
                                <WhatsAppIcon className="h-6 w-6 text-green-500" />
                            </a>
                        )}
                    </div>

                    {/* Desktop WhatsApp Button */}
                    <div className="hidden md:block">
                        {settings?.whatsapp_no && (
                            <WhatsAppButton href={whatsappLink} />
                        )}
                    </div>

                    {/* Mobile Menu (Burger Icon) */}
                    <div className="md:hidden">
                        <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </div>
                </div>
            </div>
            {/* Mobile Dropdown Menu */}
            <div
                className={`absolute w-full origin-top bg-primary text-primary-foreground shadow-lg transition-all duration-300 ease-in-out md:hidden ${
                    isMenuOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-95 pointer-events-none"
                }`}
            >
                <nav className="flex flex-col space-y-2 p-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="rounded-md px-4 py-2 text-sm font-medium text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
                            onClick={() => setIsMenuOpen(false)} // Close menu on link click
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}
