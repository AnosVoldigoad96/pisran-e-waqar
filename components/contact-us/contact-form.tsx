"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export function ContactForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const { error } = await supabase
            .from('contact_inquiries')
            .insert({ name, email, phone, subject, message });

        setIsSubmitting(false);

        if (error) {
            toast.error("Something went wrong. Please try again.", {
                description: error.message,
            });
        } else {
            toast.success("Your message has been sent successfully!");
            setIsSubmitted(true);
            // Reset form
            setName('');
            setEmail('');
            setPhone('');
            setSubject('');
            setMessage('');
        }
    };

    if (isSubmitted) {
        return (
            <div className="bg-secondary text-secondary-foreground p-8 rounded-xl shadow-lg flex flex-col items-center justify-center text-center">
                <h3 className="text-2xl font-bold">Thank You!</h3>
                <p className="mt-2">Your message has been received. We will get back to you shortly.</p>
                <Button onClick={() => setIsSubmitted(false)} className="mt-6">Send Another Message</Button>
            </div>
        );
    }

    return (
        <div className="bg-background p-8 rounded-xl shadow-lg">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold tracking-tight text-foreground">Send Us a Message</h2>
                <p className="mt-2 text-lg text-muted-foreground">
                    Have a question or need to book a trip? Fill out the form below.
                </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Your Name" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="0300-1234567" required />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} type="text" placeholder="Inquiry about Umrah packages" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your message..." required rows={5} />
                </div>
                <div className="text-center pt-4">
                    <Button type="submit" disabled={isSubmitting} size="lg" className="px-12 text-base font-semibold rounded-md shadow-md bg-primary text-primary-foreground transition-all duration-300 ease-in-out hover:bg-primary/90 hover:shadow-lg hover:-translate-y-1">
                        {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                </div>
            </form>
        </div>
    );
}