import Image from "next/image";

export function ContactHeader() {
    return (
        <div className="relative w-full overflow-hidden">
            <Image
                src="https://lvylckenosoiinbragac.supabase.co/storage/v1/object/public/site-images/public/contact_hero.png"
                alt="Pilgrims at the Kaaba"
                fill
                style={{ objectFit: 'cover' }}
                className="z-0"
            />
            <div className="absolute inset-0 bg-black/50 z-10" />
            <div className="absolute inset-0 bg-secondary/30 z-10" />
            <div className="relative z-20">
                <div className="container mx-auto px-4 sm:px-8 lg:px-32 py-16 sm:py-20 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Contact Us
                    </h1>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-white/80">
                        We&apos;re here to help with all your travel needs. Reach out to us for questions, bookings, or support.
                    </p>
                </div>
            </div>
        </div>
    );
}