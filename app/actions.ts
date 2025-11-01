"use server";

import { supabase } from "@/lib/supabase";
import { z } from "zod";

const customPackageSchema = z.object({
    name: z.string().min(1, "Name is required"),
    phone_no: z.string().min(1, "Phone number is required"),
    email: z.string().email("Invalid email address").optional().or(z.literal('')),
    departure_city: z.string().min(1, "Departure city is required"),
    budget: z.string().optional(),
    details: z.string().optional(),
});

export async function submitCustomPackageRequest(formData: FormData) {
    const validatedFields = customPackageSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        throw new Error("Invalid form data.");
    }

    const { error } = await supabase.from("custom_package_requests").insert(validatedFields.data);

    if (error) {
        throw new Error("Failed to submit request. Please try again.");
    }
}