"use client";

import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "./icons/whatsapp-icon";

type WhatsAppButtonProps = {
    href: string;
};

export function WhatsAppButton({ href }: WhatsAppButtonProps) {
    return (
        <Button variant="ghost" size="icon" asChild className="group rounded-full transition-all duration-300 hover:w-36 hover:bg-green-500/10">
            <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                <WhatsAppIcon className="h-6 w-6 flex-shrink-0 text-green-500" />
                <span className="w-0 overflow-hidden whitespace-nowrap text-sm font-medium text-green-500 transition-all duration-300 group-hover:ml-2 group-hover:w-24">
                    Whatsapp Us
                </span>
            </a>
        </Button>
    );
}