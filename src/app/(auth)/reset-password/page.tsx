/**
 * PROJECT PAGE: Reset Password (Final Step)
 * PATH: src/app/(auth)/reset-password/page.tsx
 * 
 * DESCRIPTION:
 * This page is the final destination for the password recovery process. 
 * After a user verifies their identity via OTP, they are sent here to 
 * create a brand new password.
 * 
 * KEY FEATURES:
 * 1. Matching Logic: Uses Zod .refine to ensure the user hasn't made a typo between fields.
 * 2. API Communication: Connects to the reset-password endpoint to update the database.
 * 3. User Feedback: Uses 'alerts' to signal success or failure before redirecting.
 */

"use client"; // Marks this as a Client Component for form handling and navigation

import { useForm } from "react-hook-form"; // Main library for form state
import { z } from "zod"; // Schema validation for security and UX
import { zodResolver } from "@hookform/resolvers/zod"; // Connects Zod to Hook Form
import { useRouter } from "next/navigation"; // Next.js hook to redirect the user

// --- EXTERNAL COMPONENT LINKS ---
import AuthForm from "@/components/auth/AuthForm"; // Path: src/components/auth/AuthForm.tsx (The shared layout shell)
import Input from "@/components/ui/Input";       // Path: src/components/ui/Input.tsx (Reusable styled input)

/**
 * 1. VALIDATION SCHEMA (Zod):
 * Defines exactly what we require for a safe password reset.
 */
const resetPasswordSchema = z
  .object({
    // Security: Enforce a minimum length of 6 characters
    password: z.string().min(6, "Password must be at least 6 characters"),
    // Required field check
    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  /**
   * REFINEMENT LOGIC:
   * This logic runs after the individual fields are validated.
   * It ensures 'password' and 'confirmPassword' are identical.
   */
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Highlights the second input if there's an error
  });

// Generating a TypeScript type based on our Zod rules
type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const router = useRouter(); // Initialize the router for navigation

  /**
   * REACT HOOK FORM SETUP:
   * register: Links our inputs to the form state.
   * handleSubmit: A wrapper that checks validation before allowing onSubmit to run.
   * errors: Automatically holds error messages if validation fails.
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema), // Apply our matching rules
  });

  /**
   * ON SUBMIT HANDLER:
   * This function only runs if the passwords match and meet the 6-character requirement.
   */
  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      /**
       * API CALL: Sending the new password to the server.
       * LINKED API FILE: src/app/api/auth/reset-password/route.ts
       */
      const res = await fetch("/api/auth/reset-password", {
        method: "POST", // Using POST to securely transmit the data
        headers: {
          "Content-Type": "application/json",
        },
        // We only send the final password to the server, not the confirmation field
        body: JSON.stringify({ password: data.password }),
      });

      const result = await res.json(); // Wait for the server's answer

      if (res.ok) {
        // SUCCESS PATH:
        alert("Success: " + result.message);
        
        /**
         * REDIRECTION:
         * Now that the password is changed, send them back to Login to sign in.
         */
        router.push("/login");
      } else {
        // ERROR PATH: (e.g., The reset token expired or the user doesn't exist)
        alert("Error: " + result.message);
      }
    } catch (error) {
      // NETWORK ERROR:
      console.error("Reset Error:", error);
      alert("Could not connect to the server.");
    }
  };

  return (
    /* AuthForm: Sets the title to "Reset Password" and the button to "Update Password" */
    <AuthForm
      title="Reset Password"
      buttonText="Update Password"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* NEW PASSWORD INPUT */}
      <Input
        type="password"
        placeholder="New Password"
        {...register("password")} // Connects field to form logic
        error={errors.password?.message} // Displays "min 6 characters" or other errors
      />

      {/* CONFIRMATION INPUT */}
      <Input
        type="password"
        placeholder="Confirm Password"
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message} // Displays "Passwords do not match" error
      />
    </AuthForm>
  );
}