"use client";

import { useActionState, useEffect, useRef, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { submitContactInquiry } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const initialState = {
    success: false,
    message: "",
};

function SubmitButton({ isPending }: { isPending: boolean }) {
    const { pending } = useFormStatus();
    const disabled = pending || isPending;
    return (
        <Button 
            type="submit" 
            disabled={disabled} 
            size="lg" 
            className="px-12 text-base font-semibold rounded-md shadow-lg bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 text-white transition-all duration-300 hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
            {disabled ? "Sending..." : "Send Message"}
        </Button>
    );
}

export function ContactForm() {
    const [state, formAction] = useActionState(submitContactInquiry, initialState);
    const [isPending, startTransition] = useTransition();
    const formRef = useRef<HTMLFormElement>(null);
    const { executeRecaptcha } = useGoogleReCaptcha();

    useEffect(() => {
        if (state.message) {
            if (state.success) {
                toast.success(state.message);
                formRef.current?.reset();
            } else {
                toast.error("Submission failed.", {
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
            const token = await executeRecaptcha("contact_us_form");
            formData.set("g-recaptcha-response", token);
            startTransition(() => {
                formAction(formData);
            });
        } catch (error) {
            toast.error("An error occurred while generating reCAPTCHA token.");
        }
    };

    return (
        <div className="bg-card border-2 border-border p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="text-center mb-8">
                <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-4">
                    <span className="text-sm font-semibold text-secondary">Contact Form</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground">Send Us a Message</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    Have a question or need to book a trip? Fill out the form below.
                </p>
            </div>
            <form ref={formRef} action={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" name="name" type="text" placeholder="Your Name" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" name="email" type="email" placeholder="you@example.com" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" name="phone" type="tel" placeholder="0300-1234567" required />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" name="subject" type="text" placeholder="Inquiry about Umrah packages" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" name="message" placeholder="Your message..." required rows={5} />
                </div>
                <div className="text-center pt-4">
                    <SubmitButton isPending={isPending} />
                </div>
            </form>
        </div>
    );
}