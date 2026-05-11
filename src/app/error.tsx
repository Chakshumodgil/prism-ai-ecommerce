/**
 * GLOBAL COMPONENT: Error Boundary
 * PATH: src/app/error.tsx
 * 
 * DESCRIPTION:
 * This acts as a safety net for the entire application. If a component 
 * crashes during rendering, Next.js will catch the error and display 
 * this UI instead of a blank white screen.
 */

"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner"; // Feedback tool to notify the user of the glitch

/**
 * Next.js automatically passes two props here:
 * 1. 'error': The specific object containing details about the crash.
 * 2. 'reset': A function to re-render the segment to see if the error clears.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  
  /**
   * AUTOMATIC LOGGING:
   * When a crash occurs, we log it to the console and trigger a toast.
   * In a production app, you might send this error to a service like Sentry here.
   */
  useEffect(() => {
    console.error("Critical Glitch caught by Boundary:", error);

    toast.error("Application Error", {
      description: "Something unexpected happened, but we've secured the session.",
    });
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0f1115] flex flex-col items-center justify-center px-6">
      
      {/* ERROR CARD: A clean, branded box to inform the user without scaring them */}
      <div className="max-w-md w-full text-center space-y-8 bg-white p-10 rounded-[2.5rem] shadow-2xl">
        
        {/* VISUAL ALERT: Warning icon wrapped in a soft red container */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center">
            <svg 
              className="w-10 h-10 text-red-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
          </div>
        </div>

        {/* COMMUNICATION: Explaining the situation clearly to the user */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-black tracking-tight">
            Something went wrong!
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Our safety net caught an unexpected error. You can try to refresh the 
            current page or return to the safety of the homepage.
          </p>
        </div>

        {/* RECOVERY ACTIONS: Giving the user a way out */}
        <div className="flex flex-col gap-3">
          {/* reset() attempts to re-render the page segment that failed */}
          <button
            onClick={() => reset()}
            className="w-full bg-black text-white py-4 rounded-2xl font-bold text-sm hover:bg-gray-800 transition-all active:scale-95"
          >
            Try Again
          </button>
          
          {/* A safe exit to the landing page */}
          <Link 
            href="/"
            className="w-full bg-gray-100 text-gray-600 py-4 rounded-2xl font-bold text-sm hover:bg-gray-200 transition-all text-center"
          >
            Go to Homepage
          </Link>
        </div>

        {/* SUBTLE BRANDING: Professional tracking for the system status label */}
        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-[0.2em]">
          Error Boundary System Active
        </p>
      </div>
    </div>
  );
}