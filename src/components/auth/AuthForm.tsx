/**
 * UI COMPONENT: AuthForm Wrapper
 * PATH: src/components/auth/AuthForm.tsx
 * 
 * DESCRIPTION:
 * A reusable shell for authentication views. It provides a consistent 
 * layout, handles form submission events, and integrates our custom 
 * Button component with built-in loading states.
 */

"use client";

import React from "react";
import Button from "../ui/Button"; // Leveraging our reusable UI kit

// PROPS DEFINITION: Controlling the title, button label, and submission logic
type AuthFormProps = {
  title: string;
  buttonText: string;
  children: React.ReactNode; // This allows us to inject any input fields (Email, Password, etc.)
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean; // Passes down to the button to show a spinner during API calls
};

export default function AuthForm({
  title,
  buttonText,
  children,
  onSubmit,
  isLoading,
}: AuthFormProps) {
  
  /**
   * SUBMISSION HANDLER:
   * We intercept the native form event to prevent a browser page refresh, 
   * then fire our custom onSubmit logic passed from the parent page.
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    // CENTERED CONTAINER: Ensures the form is perfectly positioned on the viewport
    <div className="flex items-center justify-center min-h-[70vh]">
      
      {/* THE FORM CARD: Styled with a clean, minimal border and subtle shadow */}
      <div className="w-full max-w-md p-8 space-y-8 bg-white border border-gray-100 rounded-3xl shadow-xl shadow-gray-500/5">
        
        {/* HEADER: Dynamic title (e.g., "Welcome Back" or "Create Account") */}
        <h1 className="text-2xl font-black text-center text-gray-900 tracking-tight">
          {title}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* 
            SLOT: This is where the specific fields (inputs) from Login 
            or Register pages are injected. 
          */}
          <div className="space-y-4">
            {children}
          </div>

          {/* 
            PRIMARY ACTION: 
            Using our custom Button component to handle the submit type 
            and the visual loading state automatically.
          */}
          <div className="pt-2">
            <Button type="submit" isLoading={isLoading} className="w-full py-4 font-bold">
              {buttonText}
            </Button>
          </div>
        </form>

        {/* DESIGN FOOTER: Adds a touch of professional polish */}
        <div className="pt-4 text-center">
           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
             Urban Prism Security
           </p>
        </div>
      </div>
    </div>
  );
}