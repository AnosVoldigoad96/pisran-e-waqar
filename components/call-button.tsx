"use client";

import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

type CallButtonProps = {
    href: string;
};

export function CallButton({ href }: CallButtonProps) {
    return (
        <Button 
            variant="ghost" 
            size="icon" 
            asChild 
            className="group rounded-lg transition-all duration-300 hover:w-32 hover:bg-white/10 hover:shadow-lg hover:scale-105"
        >
            <a href={href} className="flex items-center justify-center">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-white/10 group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                    <Phone className="h-4 w-4 flex-shrink-0 text-[#F4F4F4] transition-transform duration-300" />
                </div>
                <span className="w-0 overflow-hidden whitespace-nowrap text-sm font-medium text-[#F4F4F4] transition-all duration-300 group-hover:ml-2 group-hover:w-20">Call Us</span>
            </a>
        </Button>
    );
}