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
        <nav className="flex items-center space-x-4 text-sm font-medium md:space-x-6">
            {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={cn("relative cursor-pointer py-2 text-primary-foreground/60 transition-colors hover:text-primary-foreground/80 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full",
                            isActive && "text-primary-foreground after:w-full"
                        )}
                    >
                        {link.label}
                    </Link>
                );
            })}
        </nav>
    );
}