"use client";

import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "./icons/whatsapp-icon";

type WhatsAppButtonProps = {
    href: string;
};

export function WhatsAppButton({ href }: WhatsAppButtonProps) {
    return (
        <Button 
            variant="ghost" 
            size="icon" 
            asChild 
            className="group rounded-lg transition-all duration-300 hover:w-36 hover:bg-green-500/10 hover:shadow-lg hover:scale-105"
        >
            <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-green-500/10 group-hover:bg-green-500/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                    <WhatsAppIcon className="h-5 w-5 flex-shrink-0 text-green-500 transition-transform duration-300" />
                </div>
                <span className="w-0 overflow-hidden whitespace-nowrap text-sm font-medium text-green-500 transition-all duration-300 group-hover:ml-2 group-hover:w-24">
                    Whatsapp Us
                </span>
            </a>
        </Button>
    );
}