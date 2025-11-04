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
        <Button type="submit" className="w-full" disabled={disabled}>
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
        <section className="w-full py-12 sm:py-16">
            <div className="container mx-auto px-4 sm:px-8 lg:px-32">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Design Your Own Package
                    </h2>
                    <p className="mt-2 text-lg leading-8 text-muted-foreground">
                        Tell us your preferences, and we&apos;ll craft a personalized Umrah journey just for you.
                    </p>
                </div>

                <div className="mx-auto mt-10 max-w-xl">
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
        </section>
    );
}