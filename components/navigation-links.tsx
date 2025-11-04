"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/packages", label: "Packages" },
    { href: "/hotels", label: "Hotels" },
    { href: "/flights", label: "Flights" },
    { href: "/about-us", label: "About Us" },
    { href: "/contact-us", label: "Contact Us" },
];

export function NavigationLinks() {
    const pathname = usePathname();

    return (
        <nav className="flex items-center space-x-1 text-sm font-medium md:space-x-2">
            {navLinks.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                            "group relative cursor-pointer rounded-lg px-3 py-2 text-[#F4F4F4]/60 transition-all duration-300 hover:text-[#F4F4F4] hover:bg-white/5",
                            "after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:w-0 after:-translate-x-1/2 after:bg-gradient-to-r after:from-transparent after:via-accent after:to-transparent after:transition-all after:duration-300 hover:after:w-full",
                            isActive && "text-[#F4F4F4] bg-white/10 after:w-full"
                        )}
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <span className="relative z-10">{link.label}</span>
                    </Link>
                );
            })}
        </nav>
    );
}