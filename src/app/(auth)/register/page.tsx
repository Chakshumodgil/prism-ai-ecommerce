/**
 * PROJECT PAGE: User Registration
 * PATH: src/app/(auth)/register/page.tsx
 * 
 * DESCRIPTION:
 * This page allows new users to create an account at Urban Prism. It features
 * advanced form validation (including password matching) and connects to a 
 * backend API route to process the registration.
 * 
 * KEY FEATURES:
 * 1. Zod Refinement: Custom logic to ensure "Password" and "Confirm Password" match.
 * 2. API Integration: Sends a POST request to the server-side registration route.
 * 3. Flow Control: Redirects users to OTP verification upon successful registration.
 */

"use client"; // Marks this as a Client Component for state, hooks, and browser events

import { useForm } from "react-hook-form"; // Library for managing form state
import { z } from "zod"; // Library for data validation
import { zodResolver } from "@hookform/resolvers/zod"; // Connects Zod validation to React Hook Form
import Link from "next/link"; // Next.js component for optimized internal navigation
import { useRouter } from "next/navigation"; // Hook for programmatically changing pages

// --- EXTERNAL COMPONENT LINKS ---
import AuthForm from "@/components/auth/AuthForm"; // Path: src/components/auth/AuthForm.tsx (Visual container for auth pages)
import Input from "@/components/ui/Input";       // Path: src/components/ui/Input.tsx (Reusable styled input component)

/**
 * REGISTRATION SCHEMA:
 * Defines the strict rules for the registration form.
 */
const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"), // Name cannot be empty
    email: z.string().min(1, "Email is required").email("Invalid email"), // Must be valid email format
    password: z.string().min(6, "Password must be at least 6 characters"), // Security: minimum length
    confirmPassword: z.string().min(1, "Confirm Password is required"), // Cannot be empty
  })
  // REFINEMENT: This is a custom check that runs after the basic fields are validated
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Attaches the error specifically to the confirmPassword field
  });

// Automatically generates a TypeScript type based on the Zod schema above
type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter(); // Initialize the router for navigation

  /**
   * REACT HOOK FORM SETUP:
   * register: Function to "hook up" our HTML inputs to the form logic.
   * handleSubmit: Function that validates the data before running our onSubmit.
   * errors: Object containing any validation mistakes to show the user.
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema), // Use our Zod rules for validation
  });

  /**
   * ON SUBMIT HANDLER:
   * This runs when the user clicks "Create Account" and all fields pass validation.
   */
  const onSubmit = async (data: RegisterFormData) => {
    try {
      // API CALL: Sending registration data to the backend
      // LINKED API FILE: src/app/api/auth/register/route.ts (or similar)
      const res = await fetch("/api/auth/register", {
        method: "POST", // HTTP method for creating data
        headers: { "Content-Type": "application/json" }, // Telling the server we are sending JSON
        body: JSON.stringify(data), // Converting the JS object to a string for transmission
      });

      const result = await res.json(); // Parsing the server response

      if (res.ok) {
        // SUCCESS PATH:
        alert("Success: " + result.message);
        
        // Redirection logic: We send the user to the OTP verification page
        // We add '?next=login' to the URL so the OTP page knows where to send them after success
        router.push("/verify-otp?next=login");
      } else {
        // SERVER-SIDE ERROR: (e.g., User already exists)
        alert("Error: " + result.message);
      }
    } catch (error) {
      // NETWORK/CONNECTION ERROR:
      console.error("Register Error:", error);
      alert("Something went wrong with the connection.");
    }
  };

  return (
    /* AuthForm: Provides the consistent branding, title, and submit button layout */
    <AuthForm
      title="Register"
      buttonText="Create Account"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* FULL NAME INPUT */}
      <Input
        type="text"
        placeholder="Full Name"
        {...register("name")} // Connects to React Hook Form
        error={errors.name?.message} // Pass validation error down to the UI
      />

      {/* EMAIL INPUT */}
      <Input
        type="email"
        placeholder="Email"
        {...register("email")}
        error={errors.email?.message}
      />

      {/* PASSWORD INPUT */}
      <Input
        type="password"
        placeholder="Password"
        {...register("password")}
        error={errors.password?.message}
      />

      {/* CONFIRM PASSWORD INPUT */}
      <Input
        type="password"
        placeholder="Confirm Password"
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
      />

      {/* NAVIGATION LINK: Redirect back to login if they already have an account */}
      <div className="text-center pt-2">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </AuthForm>
  );
}