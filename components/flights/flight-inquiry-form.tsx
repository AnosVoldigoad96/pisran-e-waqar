"use client";

import { useActionState, useEffect, useRef, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { submitFlightInquiry } from "@/app/actions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";
import { DatePickerWithInput } from "@/components/ui/date-picker";
import Image from "next/image";

const initialState = {
    success: false,
    message: "",
};

function SubmitButton({ isPending }: { isPending: boolean }) {
    const { pending } = useFormStatus();
    const disabled = pending || isPending;
    return (
        <Button type="submit" size="lg" disabled={disabled} className="w-full sm:w-auto shadow-lg bg-gradient-to-r from-primary to-primary/80 text-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
            <Send className="mr-2 h-5 w-5" />
            {disabled ? "Submitting..." : "Submit Inquiry"}
        </Button>
    );
}

export function FlightInquiryForm() {
    const [state, formAction] = useActionState(submitFlightInquiry, initialState);
    const [isPending, startTransition] = useTransition();
    const formRef = useRef<HTMLFormElement>(null);
    const { executeRecaptcha } = useGoogleReCaptcha();

    useEffect(() => {
        if (state.message) {
            if (state.success) {
                toast.success("Inquiry submitted successfully!", {
                    description: "Our team will get back to you shortly with the best flight options.",
                });
                formRef.current?.reset();
            } else {
                toast.error("Submission failed. Please try again.", {
                    description: state.message,
                });
            }
        }
    }, [state]);

    const handleFormSubmit = async (formData: FormData) => {
        if (!executeRecaptcha) {
            toast.error("reCAPTCHA not ready. Please try again.");
            return;
        }

        try {
            const token = await executeRecaptcha("flight_inquiry_form");
            formData.set("g-recaptcha-response", token);
            startTransition(() => {
                formAction(formData);
            });
        } catch (error) {
            toast.error("An error occurred while generating reCAPTCHA token.");
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

                <form ref={formRef} action={handleFormSubmit} className="mt-10 max-w-4xl mx-auto text-left space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="departure-city" className="text-white/90">Departure City</Label>
                            <Input id="departure-city" name="departure_city" placeholder="e.g., Lahore" required className="bg-white/95 text-foreground placeholder:text-muted-foreground" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="arrival-city" className="text-white/90">Arrival City</Label>
                            <Input id="arrival-city" name="arrival_city" placeholder="e.g., Jeddah" required className="bg-white/95 text-foreground placeholder:text-muted-foreground" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="departure-date" className="text-white/90">Departure Date</Label>
                            <DatePickerWithInput name="departure_date" className="bg-white/95 text-foreground" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="return-date" className="text-white/90">Return Date (Optional)</Label>
                            <DatePickerWithInput name="return_date" className="bg-white/95 text-foreground" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="adults" className="text-white/90">Adults</Label>
                            <Input id="adults" name="adults" type="number" defaultValue={1} min={1} className="bg-white/95 text-foreground" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="children" className="text-white/90">Children</Label>
                            <Input id="children" name="children" type="number" defaultValue={0} min={0} className="bg-white/95 text-foreground" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="infants" className="text-white/90">Infants</Label>
                            <Input id="infants" name="infants" type="number" defaultValue={0} min={0} className="bg-white/95 text-foreground" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="contact-name" className="text-white/90">Full Name</Label>
                            <Input id="contact-name" name="contact_name" placeholder="Your Name" required className="bg-white/95 text-foreground placeholder:text-muted-foreground" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contact-phone" className="text-white/90">Phone Number</Label>
                            <Input id="contact-phone" name="contact_phone" type="tel" placeholder="0300-1234567" required className="bg-white/95 text-foreground placeholder:text-muted-foreground" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contact-email" className="text-white/90">Email (Optional)</Label>
                            <Input id="contact-email" name="contact_email" type="email" placeholder="you@example.com" className="bg-white/95 text-foreground placeholder:text-muted-foreground" />
                        </div>
                    </div>

                    <div className="text-center pt-4">
                        <SubmitButton isPending={isPending} />
                    </div>
                </form>
            </div>
        </div>
    );
}