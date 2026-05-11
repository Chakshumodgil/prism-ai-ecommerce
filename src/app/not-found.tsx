/**
 * SYSTEM PAGE: 404 Not Found
 * PATH: src/app/not-found.tsx
 * 
 * DESCRIPTION:
 * This is a reserved Next.js file. It automatically renders whenever a 
 * user navigates to a route that doesn't exist. It's designed to be 
 * helpful and visually consistent with the Urban Prism brand.
 */

"use client"; 

import Link from "next/link"; 

export default function NotFound() {
  return (
    /**
     * FULL-SCREEN WRAPPER:
     * Uses the brand's signature dark background (#0f1115) to maintain 
     * visual continuity with the Login and Profile pages.
     */
    <div className="min-h-screen bg-[#0f1115] text-white flex flex-col items-center justify-center px-6 text-center overflow-hidden relative">
      
      {/* 
        VISUAL DECORATION (The "Glow"): 
        A blurred radial gradient that adds depth and a premium "tech" feel 
        without using heavy image assets.
      */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-blue-600/5 blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 space-y-6">
        
        {/* 
          HERO TEXT: 
          Large '404' using low-opacity white to act as a background watermark. 
          The 'tracking-tighter' class adds a modern, high-fashion aesthetic.
        */}
        <h1 className="text-9xl font-black text-white/10 tracking-tighter">
          404
        </h1>
        
        <div className="space-y-2">
          {/* BRANDED MESSAGING: Uses the "Prism" motif for personality */}
          <h2 className="text-3xl font-bold tracking-tight">Lost in the Prism?</h2>
          
          <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
            We couldn't find the page you're looking for. It might have been 
            moved, deleted, or the URL might have a typo.
          </p>
        </div>

        {/* 
          PRIMARY ACTION:
          Using the Next.js <Link> component ensures that returning to the 
          homepage is an instantaneous client-side transition (no full reload).
        */}
        <div className="pt-6">
          <Link 
            href="/" 
            className="inline-block bg-white text-black px-10 py-4 rounded-2xl font-bold text-sm hover:bg-gray-200 transition-all active:scale-95 shadow-xl shadow-white/5"
          >
            Return to Home
          </Link>
        </div>

      </div>

      {/* SUBTLE SYSTEM FOOTER */}
      <p className="absolute bottom-10 text-[10px] text-gray-600 font-bold uppercase tracking-[0.4em]">
        Urban Prism Navigation System
      </p>
    </div>
  );
}