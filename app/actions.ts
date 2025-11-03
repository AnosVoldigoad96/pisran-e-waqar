"use server";

import { supabase } from "@/lib/supabase";
import { z } from "zod";

interface FormState {
  success: boolean;
  message: string;
}

const customPackageSchema = z.object({
    name: z.string().min(1, "Name is required"),
    phone_no: z.string().min(1, "Phone number is required"),
    email: z.string().email("Invalid email address").optional().or(z.literal('')),
    departure_city: z.string().min(1, "Departure city is required"),
    budget: z.string().optional(),
    details: z.string().optional(),
});

export async function submitCustomPackageRequest(
    prevState: FormState,
    formData: FormData,
): Promise<FormState> {
    const token = formData.get("g-recaptcha-response");
    if (!token) {
        return { success: false, message: "reCAPTCHA token not found." };
    }

    try {
        const secretKey = process.env.RECAPTCHA_SECRET_KEY;
        const recaptchaResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `secret=${secretKey}&response=${token}`,
        });
        const recaptchaData = await recaptchaResponse.json();

        // Log the verification data to your server terminal
        console.log("reCAPTCHA verification data:", recaptchaData);

        if (!recaptchaData.success || recaptchaData.score < 0.5) {
            return { success: false, message: "reCAPTCHA verification failed." };
        }

        const validatedFields = customPackageSchema.safeParse(Object.fromEntries(formData.entries()));

        if (!validatedFields.success) {
            return { success: false, message: "Invalid form data." };
        }

        const { error } = await supabase.from("custom_package_requests").insert(validatedFields.data);

        if (error) {
            console.error("Supabase error:", error);
            return { success: false, message: "Failed to submit request. Please try again." };
        }

        return { success: true, message: "Your request has been submitted successfully!" };
    } catch (error) {
        console.error("Error during form submission:", error);
        return { success: false, message: "An unexpected error occurred." };
    }
}

const flightInquirySchema = z.object({
    departure_city: z.string().min(1, "Departure city is required"),
    arrival_city: z.string().min(1, "Arrival city is required"),
    departure_date: z.string().min(1, "Departure date is required"),
    return_date: z.string().optional(),
    adults: z.coerce.number().min(1),
    children: z.coerce.number().min(0),
    infants: z.coerce.number().min(0),
    contact_name: z.string().min(1, "Name is required"),
    contact_phone: z.string().min(1, "Phone number is required"),
    contact_email: z.string().email("Invalid email address").optional().or(z.literal('')),
});

export async function submitFlightInquiry(
    prevState: FormState,
    formData: FormData,
): Promise<FormState> {
    const token = formData.get("g-recaptcha-response");
    if (!token) {
        return { success: false, message: "reCAPTCHA token not found." };
    }

    try {
        const secretKey = process.env.RECAPTCHA_SECRET_KEY;
        const recaptchaResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `secret=${secretKey}&response=${token}`,
        });
        const recaptchaData = await recaptchaResponse.json();
        console.log("Flight Inquiry reCAPTCHA data:", recaptchaData);

        if (!recaptchaData.success || recaptchaData.score < 0.5) {
            return { success: false, message: "reCAPTCHA verification failed." };
        }

        const validatedFields = flightInquirySchema.safeParse(Object.fromEntries(formData.entries()));

        if (!validatedFields.success) {
            return { success: false, message: "Invalid form data. Please check your inputs." };
        }

        const { error } = await supabase.from("flight_inquiries").insert(validatedFields.data);

        if (error) {
            console.error("Supabase error:", error);
            return { success: false, message: "Failed to submit inquiry. Please try again." };
        }

        return { success: true, message: "Your inquiry has been submitted successfully!" };
    } catch (error) {
        console.error("Error during form submission:", error);
        return { success: false, message: "An unexpected error occurred." };
    }
}

const contactInquirySchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

export async function submitContactInquiry(
    prevState: FormState,
    formData: FormData,
): Promise<FormState> {
    const token = formData.get("g-recaptcha-response");
    if (!token) {
        return { success: false, message: "reCAPTCHA token not found." };
    }

    try {
        const secretKey = process.env.RECAPTCHA_SECRET_KEY;
        const recaptchaResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `secret=${secretKey}&response=${token}`,
        });
        const recaptchaData = await recaptchaResponse.json();
        console.log("Contact Inquiry reCAPTCHA data:", recaptchaData);

        if (!recaptchaData.success || recaptchaData.score < 0.5) {
            return { success: false, message: "reCAPTCHA verification failed." };
        }

        const validatedFields = contactInquirySchema.safeParse(Object.fromEntries(formData.entries()));

        if (!validatedFields.success) {
            return { success: false, message: "Invalid form data. Please check your inputs." };
        }

        const { error } = await supabase.from("contact_inquiries").insert(validatedFields.data);

        if (error) {
            console.error("Supabase error:", error);
            return { success: false, message: "Failed to send message. Please try again." };
        }

        return { success: true, message: "Your message has been sent successfully!" };
    } catch (error) {
        console.error("Error during form submission:", error);
        return { success: false, message: "An unexpected error occurred." };
    }
}