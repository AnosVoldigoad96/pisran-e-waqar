"use client";

import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

type CallButtonProps = {
    href: string;
};

export function CallButton({ href }: CallButtonProps) {
    return (
        <Button variant="ghost" size="icon" asChild className="group rounded-full transition-all duration-300 hover:w-32 hover:bg-secondary/10">
            <a href={href} className="flex items-center justify-center">
                <Phone className="h-5 w-5 flex-shrink-0 text-secondary" />
                <span className="w-0 overflow-hidden whitespace-nowrap text-sm font-medium text-secondary transition-all duration-300 group-hover:ml-2 group-hover:w-20">Call Us</span>
            </a>
        </Button>
    );
}