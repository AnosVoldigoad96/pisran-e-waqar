import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { supabase } from "@/lib/supabase";
import { Header } from "@/components/header";
import { Toaster } from "sonner";
import { Footer } from "@/components/footer";
import RecaptchaProvider from "./components/recaptcha-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { FloatingWhatsAppButton } from "@/components/floating-whatsapp-button";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pisran-e-Waqar",
  description: "Your trusted partner for Umrah journeys.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// This function fetches the site settings from Supabase
async function getSiteSettings() {
  // The .single() method is perfect here because we only have one row
  const { data, error } = await supabase
    .from('site_settings')
    .select('site_logo_url, brand_name, whatsapp_no, social_links, address, contact_no, email')
    .eq('singleton_guard', true)
    .single();

  if (error) {
    console.error("Error fetching site settings:", error);
    return null;
  }

  return data;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch the settings on the server
  const settings = await getSiteSettings();

  return (
    <html lang="en" suppressHydrationWarning>
      {/* The body will have the background color for the sides */}
      <body className={`${inter.className} bg-background`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <RecaptchaProvider>
            {/* This container div centers everything inside it */}
            <div className="relative flex min-h-screen flex-col w-full overflow-x-hidden">
              <Header settings={settings} />
              <main className="flex-1 w-full">{children}</main>
              <Footer settings={settings} />
              <FloatingWhatsAppButton whatsappNo={settings?.whatsapp_no || null} />
              <Toaster />
            </div>
          </RecaptchaProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
