"use client";

import { useRef, useState } from "react";
import { submitCustomPackageRequest } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type FormState = "idle" | "submitting";

export function CustomPackageForm() {
    const [formState, setFormState] = useState<FormState>("idle");
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormState("submitting");

        const formData = new FormData(event.currentTarget);

        try {
            await submitCustomPackageRequest(formData);
            toast.success("Thank you! Your request has been submitted successfully.");
            formRef.current?.reset();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "An unknown error occurred.");
        } finally {
            setFormState("idle");
        }
    };

    return (
        <section className="py-12 sm:py-16">
            <div className="container px-4 sm:px-8 lg:px-32">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Design Your Own Package
                    </h2>
                    <p className="mt-2 text-lg leading-8 text-muted-foreground">
                        Tell us your preferences, and we&apos;ll craft a personalized Umrah journey just for you.
                    </p>
                </div>

                <div className="mx-auto mt-10 max-w-xl">
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                            <div>
                                <Label htmlFor="name">Full Name</Label>
                                <Input type="text" name="name" id="name" required disabled={formState === 'submitting'} className="mt-1.5" />
                            </div>
                            <div>
                                <Label htmlFor="phone_no">Phone Number</Label>
                                <Input type="tel" name="phone_no" id="phone_no" required disabled={formState === 'submitting'} className="mt-1.5" />
                            </div>
                            <div>
                                <Label htmlFor="departure_city">Departure City</Label>
                                <Input type="text" name="departure_city" id="departure_city" required disabled={formState === 'submitting'} className="mt-1.5" />
                            </div>
                            <div>
                                <Label htmlFor="email">Email (Optional)</Label>
                                <Input type="email" name="email" id="email" disabled={formState === 'submitting'} className="mt-1.5" />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="budget">Your Budget (Optional)</Label>
                            <Input type="text" name="budget" id="budget" placeholder="e.g., Around 300,000 PKR per person" disabled={formState === 'submitting'} className="mt-1.5" />
                        </div>
                        <div>
                            <Label htmlFor="details">Details</Label>
                            <Textarea name="details" id="details" rows={4} placeholder="Tell us about your desired travel dates, hotel preferences, number of people, or any other special requests." disabled={formState === 'submitting'} className="mt-1.5" />
                        </div>
                        <div>
                            <Button type="submit" className="w-full" disabled={formState === 'submitting'}>
                                {formState === 'submitting' ? "Submitting..." : "Submit Request"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}