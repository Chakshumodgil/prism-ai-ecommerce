/**
 * CORE PAGE: Main Landing (Home)
 * PATH: src/app/page.tsx
 * 
 * DESCRIPTION:
 * The entry point of Urban Prism. This page introduces the brand 
 * and provides navigation to the Login and Admin sectors. It also 
 * serves as a sandbox to verify that environment variables and 
 * the Sonner notification system are working correctly.
 */

"use client"; 

import Link from "next/link"; 
import { toast } from "sonner"; // TRIGGER: Communicates with the <Toaster /> in layout.tsx

export default function HomePage() {
  /**
   * TASK 22: ENVIRONMENT CONFIGURATION
   * We pull the application name from .env.local. If the variable 
   * isn't set, we fall back to "Urban Prism" to prevent UI breakage.
   */
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "Urban Prism";

  /**
   * TASK 24: NOTIFICATION HANDLER
   * This function demonstrates how we can trigger a success toast 
   * with a description from anywhere in the "use client" ecosystem.
   */
  const handleTestToast = () => {
    toast.success(`Welcome to ${appName}!`, {
      description: "The notification system is officially connected and ready.",
    });
  };

  return (
    <div className="min-h-screen bg-[#0f1115] text-white flex flex-col items-center justify-center px-6 overflow-hidden relative">
      
      {/* DESIGN ELEMENT: A radial blue glow to soften the dark interface */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-blue-600/10 blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl text-center space-y-8 relative z-10">
        
        {/* INTERACTIVE BADGE: Used for debugging Task 24 */}
        <button 
          onClick={handleTestToast}
          className="inline-block px-4 py-1.5 rounded-full border border-gray-800 bg-gray-900/50 backdrop-blur-md text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 mb-4 hover:border-blue-400 transition-all cursor-pointer active:scale-95"
        >
          Next.js 14 • Click to test Notifications
        </button>

        {/* HERO SECTION: High-impact typography with a linear gradient mask */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight">
          Manage Better <br />
          <span className="bg-linear-to-r from-white via-gray-400 to-gray-600 bg-clip-text text-transparent">
            Sell Better.
          </span>
        </h1>

        {/* VALUE PROPOSITION: Injecting the App Name from our Config */}
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          {appName} is a high-performance management system featuring real-time 
          AI generation, multi-language support, and secure role-based access control.
        </p>

        {/* CALL TO ACTION: Navigation routes */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <Link 
            href="/login" 
            className="w-full sm:w-auto bg-white text-black px-10 py-4 rounded-2xl font-bold text-sm hover:bg-gray-200 transition-all active:scale-95 shadow-xl shadow-white/5"
          >
            Get Started
          </Link>
          <Link 
            href="/admin" 
            className="w-full sm:w-auto bg-[#1a1d23] text-white border border-gray-800 px-10 py-4 rounded-2xl font-bold text-sm hover:bg-gray-800 transition-all active:scale-95"
          >
            Admin Panel
          </Link>
        </div>

        {/* CORE TECH STACK: Visual confirmation of integrated features */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-20 opacity-50">
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Language</p>
            <p className="text-sm font-medium">i18n Context Ready</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Content</p>
            <p className="text-sm font-medium">AI Generation Logic</p>
          </div>
          <div className="col-span-2 md:col-span-1 space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Security</p>
            <p className="text-sm font-medium">Role-Based Auth</p>
          </div>
        </div>
      </div>

      {/* SYSTEM STATUS FOOTER */}
      <p className="absolute bottom-10 text-[10px] text-gray-700 font-bold uppercase tracking-[0.4em]">
        Urban Prism Core Engine
      </p>
    </div>
  );
}