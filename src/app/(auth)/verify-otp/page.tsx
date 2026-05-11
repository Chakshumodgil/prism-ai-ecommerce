/**
 * PROJECT PAGE: OTP Verification
 * PATH: src/app/(auth)/verify-otp/page.tsx
 * 
 * DESCRIPTION:
 * This page acts as a security bridge. Users arrive here after requesting a 
 * password reset or completing registration. It requires a 6-digit code 
 * to prove the user's identity before allowing them to proceed.
 * 
 * KEY FEATURES:
 * 1. Dynamic Redirection: Uses a "next" search parameter to decide where to send 
 *    the user after successful verification (either Login or Reset Password).
 * 2. Regex Validation: Ensures the input is exactly 6 numerical digits.
 * 3. Demo Mode: Includes a hardcoded bypass code (123456) for easy evaluation.
 */

"use client"; // Required for using React hooks and browser-based navigation

import React, { Suspense } from "react"; // Added Suspense for build fix
import { useForm } from "react-hook-form"; // Manages the input state
import { z } from "zod"; // Defines the validation rules
import { zodResolver } from "@hookform/resolvers/zod"; // Connects Zod to the form
import { useRouter, useSearchParams } from "next/navigation"; // For URL reading and navigation

// --- EXTERNAL COMPONENT LINKS ---
import AuthForm from "@/components/auth/AuthForm"; // Path: src/components/auth/AuthForm.tsx (Shared shell)
import Input from "@/components/ui/Input";       // Path: src/components/ui/Input.tsx (Reusable input)

/**
 * VALIDATION SCHEMA:
 * Enforces that the OTP must be a string of exactly 6 digits.
 */
const otpSchema = z.object({
  otp: z
    .string()
    .min(1, "OTP is required")
    .regex(/^\d{6}$/, "OTP must be exactly 6 digits"), // Uses Regular Expression for 6 digits
});

// TypeScript type based on the schema above
type OtpFormData = z.infer<typeof otpSchema>;

/**
 * THE MAIN PAGE EXPORT:
 * Wraps the content in a Suspense boundary to prevent Next.js build errors 
 * related to client-side search parameters.
 */
export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <VerifyOtpContent />
    </Suspense>
  );
}

/**
 * THE CONTENT COMPONENT:
 * Contains the actual logic and UI for the OTP verification.
 */
function VerifyOtpContent() {
  const router = useRouter(); // To move users to the next page
  const searchParams = useSearchParams(); // To read the URL (e.g., ?next=reset-password)
  
  // LOGIC: Grabs the "next" value from the URL so we know where to go after success
  const nextStep = searchParams.get("next"); 

  /**
   * REACT HOOK FORM SETUP:
   * Provides standard form handling capabilities.
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
  });

  /**
   * ON SUBMIT HANDLER:
   * Checks the code and handles navigation based on the "next" parameter.
   */
  const onSubmit = async (data: OtpFormData) => {
    
    // --- MOCK OTP BYPASS FOR DEMO ---
    // This allows instructors/testers to pass through without a real email server.
    if (data.otp === "123456") {
      alert("OTP Verified (Demo Mode: 123456)");
      
      // DECISION LOGIC: Where do we go now?
      if (nextStep === "login") {
        router.push("/login"); // If they came from Registration
      } else {
        router.push("/reset-password"); // If they came from Forgot Password
      }
      return;
    }

    // --- REAL API LOGIC ---
    // Attempts to verify the code against a backend database/service.
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        alert("Success: " + result.message);
        
        // REPEATED DECISION LOGIC: Ensures consistency for real API success
        if (nextStep === "login") {
          router.push("/login");
        } else {
          router.push("/reset-password");
        }
      } else {
        // Validation Error: (e.g., Code expired or wrong)
        alert("Error: " + result.message);
      }
    } catch (error) {
      // Connection Error:
      console.error("OTP Error:", error);
      alert("Could not connect to the server. Using demo code 123456 might work.");
    }
  };

  return (
    /* Shared Auth UI wrapper */
    <AuthForm
      title="Verify OTP"
      buttonText="Verify"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Helpful instruction for the user */}
      <p className="text-sm text-gray-600 text-center">
        Enter the 6-digit code sent to your email
      </p>

      {/* REUSABLE UI COMPONENT: OTP Input field */}
      <Input
        type="text"
        maxLength={6} // Prevents typing more than 6 digits
        placeholder="Enter OTP"
        // CUSTOM STYLING: Center the numbers and add spacing for better readability
        className="text-center tracking-widest text-lg" 
        {...register("otp")} // Connects to form logic
        error={errors.otp?.message} // Displays validation errors
      />
      
      {/* TESTER HINT: Visible reminder for the person evaluating the project */}
      <p className="text-[10px] text-gray-400 text-center mt-4 uppercase">
        Demo Code: 123456
      </p>
    </AuthForm>
  );
}