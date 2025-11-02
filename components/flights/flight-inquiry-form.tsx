"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";
import { DatePicker } from "../ui/date-picker";
import Image from "next/image";

export function FlightInquiryForm() {
    const [departureCity, setDepartureCity] = useState("");
    const [arrivalCity, setArrivalCity] = useState("");
    const [departureDate, setDepartureDate] = useState<Date | undefined>();
    const [returnDate, setReturnDate] = useState<Date | undefined>();
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);
    const [contactName, setContactName] = useState("");
    const [contactPhone, setContactPhone] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!departureCity || !arrivalCity || !departureDate || !contactName || !contactPhone) {
            toast.error("Please fill in all required fields.");
            return;
        }
        setIsSubmitting(true);

        const { error } = await supabase.from("flight_inquiries").insert({
            departure_city: departureCity,
            arrival_city: arrivalCity,
            departure_date: departureDate,
            return_date: returnDate,
            adults,
            children,
            infants,
            contact_name: contactName,
            contact_phone: contactPhone,
            contact_email: contactEmail,
        });

        setIsSubmitting(false);

        if (error) {
            toast.error("Submission failed. Please try again.", {
                description: error.message,
            });
        } else {
            toast.success("Inquiry submitted successfully!", {
                description: "Our team will get back to you shortly with the best flight options.",
            });
            // Reset form
            setDepartureCity("");
            setArrivalCity("");
            setDepartureDate(undefined);
            setReturnDate(undefined);
            setAdults(1);
            setChildren(0);
            setInfants(0);
            setContactName("");
            setContactPhone("");
            setContactEmail("");
        }
    };

    return (
        <div className="relative text-white overflow-hidden">
            <Image
                src="https://lvylckenosoiinbragac.supabase.co/storage/v1/object/public/site-images/public/flights_herov2.jpeg"
                alt="Airplane wing in the sky"
                fill
                style={{ objectFit: 'cover' }}
                className="z-0 animate-zoom-pan"
            />
            <div className="absolute inset-0 bg-black/50 z-10" />
            <div className="absolute inset-0 bg-secondary/30 z-10" />

            <div className="relative z-20 container px-4 sm:px-8 lg:px-16 py-16 sm:py-24 text-center">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Find Your Perfect Flight</h1>
                <p className="mt-4 text-lg max-w-2xl mx-auto text-white/80">
                    Enter your travel details below and let our experts find the best deals for you.
                </p>

                <form onSubmit={handleSubmit} className="mt-10 max-w-4xl mx-auto text-left space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="departure-city" className="text-white/90">Departure City</Label>
                            <Input id="departure-city" value={departureCity} onChange={(e) => setDepartureCity(e.target.value)} placeholder="e.g., Lahore" required className="bg-white/95 text-foreground placeholder:text-muted-foreground" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="arrival-city" className="text-white/90">Arrival City</Label>
                            <Input id="arrival-city" value={arrivalCity} onChange={(e) => setArrivalCity(e.target.value)} placeholder="e.g., Jeddah" required className="bg-white/95 text-foreground placeholder:text-muted-foreground" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="departure-date" className="text-white/90">Departure Date</Label>
                            <DatePicker date={departureDate} setDate={setDepartureDate} className="bg-white/95 text-foreground" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="return-date" className="text-white/90">Return Date (Optional)</Label>
                            <DatePicker date={returnDate} setDate={setReturnDate} className="bg-white/95 text-foreground" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="adults" className="text-white/90">Adults</Label>
                            <Input id="adults" type="number" value={adults} onChange={(e) => setAdults(parseInt(e.target.value))} min={1} className="bg-white/95 text-foreground" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="children" className="text-white/90">Children</Label>
                            <Input id="children" type="number" value={children} onChange={(e) => setChildren(parseInt(e.target.value))} min={0} className="bg-white/95 text-foreground" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="infants" className="text-white/90">Infants</Label>
                            <Input id="infants" type="number" value={infants} onChange={(e) => setInfants(parseInt(e.target.value))} min={0} className="bg-white/95 text-foreground" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="contact-name" className="text-white/90">Full Name</Label>
                            <Input id="contact-name" value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="Your Name" required className="bg-white/95 text-foreground placeholder:text-muted-foreground" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contact-phone" className="text-white/90">Phone Number</Label>
                            <Input id="contact-phone" type="tel" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} placeholder="0300-1234567" required className="bg-white/95 text-foreground placeholder:text-muted-foreground" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contact-email" className="text-white/90">Email (Optional)</Label>
                            <Input id="contact-email" type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="you@example.com" className="bg-white/95 text-foreground placeholder:text-muted-foreground" />
                        </div>
                    </div>

                    <div className="text-center pt-4">
                        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto shadow-lg bg-gradient-to-r from-primary to-primary/80 text-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
                            <Send className="mr-2 h-5 w-5" />
                            {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}