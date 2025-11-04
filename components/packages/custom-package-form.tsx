"use client";

import { useActionState, useEffect, useRef, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { submitCustomPackageRequest } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
            className="w-full bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100" 
            disabled={disabled}
        >
            {disabled ? "Submitting..." : "Submit Request"}
        </Button>
    );
}

export function CustomPackageForm() {
    const [state, formAction] = useActionState(submitCustomPackageRequest, initialState);
    const [isPending, startTransition] = useTransition();
    const formRef = useRef<HTMLFormElement>(null);
    const { executeRecaptcha } = useGoogleReCaptcha();

    useEffect(() => {
        if (state.message) {
            if (state.success) {
                toast.success(state.message);
                formRef.current?.reset();
            } else {
                toast.error(state.message);
            }
        }
    }, [state]);

    const handleFormSubmit = async (formData: FormData) => {
        if (!executeRecaptcha) {
            toast.error("reCAPTCHA not ready. Please try again.");
            return;
        }

        try {
            const token = await executeRecaptcha("custom_package_form");
            formData.set("g-recaptcha-response", token);
            startTransition(() => {
                formAction(formData);
            });
        } catch (error) {
            toast.error("An error occurred while generating reCAPTCHA token.");
        }
    };

    return (
        <section className="w-full py-12 sm:py-16 bg-gradient-to-b from-muted/30 via-background to-background relative overflow-hidden">
            {/* Decorative gradient circles */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
            
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
                <div className="mx-auto max-w-2xl text-center">
                    <div className="inline-block px-4 py-2 bg-gradient-to-r from-secondary/10 to-accent/10 rounded-full mb-4">
                        <span className="text-sm font-semibold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">Custom Package</span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Design Your Own Package
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-muted-foreground">
                        Tell us your preferences, and we&apos;ll craft a personalized Umrah journey just for you.
                    </p>
                </div>

                <div className="mx-auto mt-10 max-w-xl">
                    <div className="rounded-2xl border-2 border-border bg-card p-6 sm:p-8 shadow-lg">
                        <form
                            ref={formRef}
                            action={handleFormSubmit}
                            className="space-y-6"
                        >
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                            <div>
                                <Label htmlFor="name">Full Name</Label>
                                <Input type="text" name="name" id="name" required className="mt-1.5" />
                            </div>
                            <div>
                                <Label htmlFor="phone_no">Phone Number</Label>
                                <Input type="tel" name="phone_no" id="phone_no" required className="mt-1.5" />
                            </div>
                            <div>
                                <Label htmlFor="departure_city">Departure City</Label>
                                <Input type="text" name="departure_city" id="departure_city" required className="mt-1.5" />
                            </div>
                            <div>
                                <Label htmlFor="email">Email (Optional)</Label>
                                <Input type="email" name="email" id="email" className="mt-1.5" />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="budget">Your Budget (Optional)</Label>
                            <Input type="text" name="budget" id="budget" placeholder="e.g., Around 300,000 PKR per person" className="mt-1.5" />
                        </div>
                        <div>
                            <Label htmlFor="details">Details</Label>
                            <Textarea name="details" id="details" rows={4} placeholder="Tell us about your desired travel dates, hotel preferences, number of people, or any other special requests." className="mt-1.5" />
                        </div>
                        <div>
                            <SubmitButton isPending={isPending} />
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </section>
    );
}