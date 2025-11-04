"use client";

import { useState, useEffect } from "react";
import { WhatsAppIcon } from "./icons/whatsapp-icon";
import { MessageCircle } from "lucide-react";

type FloatingWhatsAppButtonProps = {
  whatsappNo: string | null;
};

export function FloatingWhatsAppButton({ whatsappNo }: FloatingWhatsAppButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Show button after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!whatsappNo) return null;

  const whatsappLink = `https://wa.me/${whatsappNo}`;

  return (
    <div
      className={`fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-50 transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-2 rounded-full bg-gradient-to-r from-green-500 to-green-600 px-2.5 py-2.5 sm:px-3 sm:py-3 shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-110 hover:from-green-600 hover:to-green-700 active:scale-95"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Pulse animation ring */}
        <div className="absolute inset-0 rounded-full bg-green-500/30 animate-ping opacity-75" />
        <div className="absolute inset-0 rounded-full bg-green-500/20 animate-pulse-slow" />
        
        {/* Icon container */}
        <div className="relative flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 shadow-lg">
          <WhatsAppIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white drop-shadow-lg" />
        </div>

        {/* Text that appears on hover */}
        <div
          className={`overflow-hidden transition-all duration-300 hidden sm:block ${
            isHovered ? "max-w-28 opacity-100 ml-1.5" : "max-w-0 opacity-0 ml-0"
          }`}
        >
          <span className="whitespace-nowrap text-xs sm:text-sm font-semibold text-white drop-shadow-lg">
            Chat with us
          </span>
        </div>

        {/* Badge notification */}
        <div className="absolute -top-0.5 -right-0.5 flex items-center justify-center h-4 w-4 rounded-full bg-red-500 border-2 border-white shadow-lg group-hover:scale-110 transition-transform duration-300">
          <MessageCircle className="h-2.5 w-2.5 text-white" />
        </div>
      </a>
    </div>
  );
}

