import Image from "next/image";

export function ContactHeader() {
    return (
        <div className="relative w-full overflow-hidden">
            <Image
                src="https://lvylckenosoiinbragac.supabase.co/storage/v1/object/public/site-images/public/contact_hero.png"
                alt="Pilgrims at the Kaaba"
                fill
                style={{ objectFit: 'cover' }}
                className="z-0 animate-zoom-pan"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0C2B4E]/30 via-transparent to-[#0C2B4E]/30 z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(12,43,78,0.3)_100%)] z-10" />
            <div className="relative z-20">
                <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-16 sm:py-20 text-center">
                    <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-4">
                        <span className="text-sm font-semibold text-white">Get In Touch</span>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl drop-shadow-lg">
                        Contact Us
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mt-4 mb-6" />
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-white/90">
                        We&apos;re here to help with all your travel needs. Reach out to us for questions, bookings, or support.
                    </p>
                </div>
            </div>
        </div>
    );
}