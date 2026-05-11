/**
 * PROJECT PAGE: Forgot Password
 * PATH: src/app/(auth)/forgot-password/page.tsx
 * 
 * DESCRIPTION:
 * This page provides a secure interface for users to request a password reset.
 * It validates the user's email and, if found in the system, redirects them 
 * to the OTP verification screen.
 * 
 * TECH STACK USED:
 * - React Hook Form: For efficient form state management.
 * - Zod: For strict schema-based validation.
 * - Next.js Router: To handle redirection to the OTP page.
 */

"use client"; // Enables client-side features like state and form handling

import { useForm } from "react-hook-form";
import { z } from "zod"; // Zod is used to define the "rules" for the input
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// --- EXTERNAL COMPONENT LINKS ---
import AuthForm from "@/components/auth/AuthForm"; // Path: src/components/auth/AuthForm.tsx (The shared wrapper for login/signup/reset)
import Input from "@/components/ui/Input";       // Path: src/components/ui/Input.tsx (Reusable styled input)

/**
 * VALIDATION SCHEMA:
 * Defines exactly what a valid "forgot password" request looks like.
 * - email: Must not be empty and must be a properly formatted email string.
 */
const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
});

// TypeScript type extracted from the Zod schema for type safety
type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter(); // Next.js hook for programmatically moving between pages
  const [error, setError] = useState<string | null>(null); // Local state for manual server-side style errors

  /**
   * REACT HOOK FORM SETUP:
   * register: Connects our inputs to the form logic.
   * handleSubmit: Wraps our onSubmit function to handle validation.
   * errors: Automatically tracks validation mistakes (e.g., "Invalid email").
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema), // Connects Zod rules to React Hook Form
  });

  /**
   * ON SUBMIT HANDLER:
   * Executed only if the email passes the basic Zod validation.
   */
  const onSubmit = async (data: ForgotPasswordData) => {
    setError(null); // Clear previous errors on new attempt

    // MOCK DATA: Simulating a database check for existing users
    const validUsers = ["admin@test.com", "user@test.com"];

    if (validUsers.includes(data.email.toLowerCase())) {
      /**
       * SUCCESS LOGIC:
       * Redirects the user to the OTP page.
       * 
       * FIXED FLOW: 
       * We change the 'next' parameter to 'reset-password'. 
       * This ensures that after the user enters the correct OTP, they are 
       * sent to create a new password rather than just going to Login.
       */
      router.push(`/verify-otp?email=${encodeURIComponent(data.email)}&next=reset-password`);
    } else {
      // FAILURE LOGIC: Shown if the email isn't in our "database"
      setError("User not found. Please check the email address.");
    }
  };

  return (
    /* Shared Auth wrapper that provides the layout, title, and submit button */
    <AuthForm
      title="Reset Password"
      buttonText="Send Reset Link"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Helpful instruction text for the user */}
      <p className="text-sm text-gray-600 text-center mb-4">
        Enter your email address and we'll send you a link to reset your password.
      </p>

      {/* REUSABLE UI COMPONENT: Email Input */}
      <Input
        type="email"
        placeholder="Email"
        {...register("email")} // Registers the input with hook-form
        error={errors.email?.message} // Displays the validation error if present
      />

      {/* MANUAL ERROR ALERT: Shown if the user is not found in the "database" */}
      {error && (
        <p className="text-sm text-red-600 bg-red-50 p-2 rounded text-center font-medium mt-2">
          {error}
        </p>
      )}

      {/* NAVIGATION LINKS */}
      <div className="flex flex-col items-center pt-2">
        <Link
          href="/login"
          className="text-sm text-blue-500 hover:underline"
        >
          Back to Login
        </Link>
      </div>
    </AuthForm>
  );
}