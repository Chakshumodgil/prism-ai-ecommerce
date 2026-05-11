/**
 * GLOBAL CONFIGURATION: Root Layout
 * PATH: src/app/layout.tsx
 * 
 * DESCRIPTION:
 * The master wrapper for the Urban Prism application. This file defines 
 * the global HTML structure, injects global CSS, sets up fonts, and 
 * provides the Context Providers that wrap every page in the app.
 */

import type { Metadata } from "next"; 
import { Geist, Geist_Mono } from "next/font/google"; 
import "./globals.css"; // Global styles, including Tailwind directives

// TASK 24: Global Notification System (Sonner)
import { Toaster } from "sonner"; 

// SHARED UI COMPONENTS
import Navbar from "@/components/layout/NavbarNew"; 
import Footer from "@/components/layout/Footer";

// STATE MANAGEMENT: Multi-language support context
import { LanguageProvider } from "@/context/LanguageContext";

/**
 * TYPOGRAPHY SETUP:
 * Utilizing Next.js Font Optimization to load Google Fonts locally, 
 * reducing layout shift and improving performance.
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/** 
 * TASK 27: SEARCH ENGINE OPTIMIZATION (SEO)
 * This metadata object is read by Next.js to generate the <head> tags 
 * for every page, helping with Google rankings and social media sharing.
 */
export const metadata: Metadata = {
  // CONFIG: Dynamic titles using environment variables
  title: {
    default: process.env.NEXT_PUBLIC_APP_NAME || "Urban Prism",
    template: `%s | ${process.env.NEXT_PUBLIC_APP_NAME || "Urban Prism"}`
  },

  description: "Experience the future of premium tech and lifestyle products with Urban Prism. Curated quality for the modern enthusiast.",
  keywords: ["E-commerce", "Premium Tech", "Lifestyle", "Modern Design", "Urban Prism Shop"],
  
  // BRANDING: Favicon configuration
  icons: {
    icon: "/favicon.ico", 
  },

  // SOCIAL MEDIA: OpenGraph settings for rich link previews (Twitter/Facebook/WhatsApp)
  openGraph: {
    title: "Urban Prism | Premium Tech & Lifestyle",
    description: "Shop our exclusive collection of high-performance gadgets and furniture.",
    url: "https://urbanprism.com",
    siteName: "Urban Prism",
    images: [
      {
        url: "/og-image.jpg", // Located in /public
        width: 1200,
        height: 630,
        alt: "Urban Prism Brand Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

/**
 * THE ROOT COMPONENT:
 * Everything inside this function will stay mounted during page transitions.
 */
export default function RootLayout({
  children, // This prop dynamically injects the content of the current route
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body 
        className={`
          ${geistSans.variable} ${geistMono.variable} 
          antialiased min-h-screen flex flex-col m-0 p-0 bg-white text-black
        `}
      >
        {/* PROVIDER: Allows any component in the app to access currentLanguage and translate() */}
        <LanguageProvider>
          
          {/* PERSISTENT HEADER */}
          <Navbar />

          {/* 
            DYNAMIC CONTENT VIEWPORT:
            - 'grow' ensures the main area expands to push footer to the bottom.
            - 'max-w-7xl' ensures readability on ultra-wide monitors.
          */}
          <main className="grow w-full max-w-7xl mx-auto p-4 md:p-10 transition-all duration-300">
            {children} 
          </main>

          {/* PERSISTENT FOOTER */}
          <Footer />

          {/* 
            NOTIFCATION HUB:
            We place the Toaster here so it can stay visible even if 
            the user navigates between different pages.
          */}
          <Toaster position="bottom-right" richColors closeButton />
          
        </LanguageProvider>
      </body>
    </html>
  );
}