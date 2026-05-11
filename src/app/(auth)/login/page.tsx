/**
 * PROJECT PAGE: Login Page
 * PATH: src/app/(auth)/login/page.tsx
 * 
 * DESCRIPTION:
 * This page serves as the entry point for users to access protected parts of 
 * the application. It handles authentication logic, distinguishes between 
 * 'Admin' and 'User' roles, and manages local session storage.
 * 
 * KEY FEATURES:
 * 1. Role-Based Redirection: Sends admins to /admin and users to /products.
 * 2. Session Persistence: Uses localStorage to keep users logged in.
 * 3. Validation: Powered by Zod and React Hook Form for real-time feedback.
 */

"use client"; // Required for interactivity, hooks, and localStorage access

import { useForm } from "react-hook-form";
import { z } from "zod"; // Schema validation tool
import { zodResolver } from "@hookform/resolvers/zod"; // Bridges Zod with React Hook Form
import Link from "next/link";
import { useRouter } from "next/navigation";

// --- EXTERNAL COMPONENT LINKS ---
import AuthForm from "@/components/auth/AuthForm"; // Path: src/components/auth/AuthForm.tsx (Shared layout wrapper)
import Input from "@/components/ui/Input";       // Path: src/components/ui/Input.tsx (Reusable input component)

/**
 * VALIDATION SCHEMA:
 * Defines the requirements for a valid login attempt.
 */
const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

// Extracting the TypeScript type from the Zod schema
type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter(); // Next.js navigation hook

  /**
   * REACT HOOK FORM INITIALIZATION:
   * Handles form state, validation errors, and submission.
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema), // Connects the validation rules defined above
  });

  /**
   * ON SUBMIT HANDLER:
   * Processes the login data and handles local session management.
   */
  const onSubmit = async (data: LoginFormData) => {
    // ROLE DETERMINATION: 
    // For this project, we treat 'admin@test.com' as the superuser.
    const role = data.email === "admin@test.com" ? "admin" : "user";

    // SESSION MANAGEMENT:
    // Saving user data to localStorage so the AuthGuard and Navbar can detect the user state.
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userRole", role);
    localStorage.setItem("userEmail", data.email);

    // NAVIGATION LOGIC:
    // Direct users to their appropriate dashboard based on their role.
    if (role === "admin") {
      router.push("/admin");
    } else {
      router.push("/products");
    }

    // REFRESH TRIGGER:
    // Small delay followed by a reload to ensure the Navbar updates its "Login/Logout" status immediately.
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    /* Shared wrapper that provides the card design and central submit button */
    <AuthForm
      title="Login"
      buttonText="Sign In"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* REUSABLE UI COMPONENT: Email Field */}
      <Input
        type="email"
        placeholder="Email"
        {...register("email")} // Connects to react-hook-form
        error={errors.email?.message} // Displays validation error messages
      />

      {/* REUSABLE UI COMPONENT: Password Field */}
      <Input
        type="password"
        placeholder="Password"
        {...register("password")}
        error={errors.password?.message}
      />

      {/* NAVIGATION LINKS: Forgot Password and Registration */}
      <div className="flex flex-col items-center space-y-2 pt-2">
        <Link
          href="/forgot-password"
          className="text-sm text-blue-500 hover:underline"
        >
          Forgot Password?
        </Link>

        <p className="text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-blue-500 hover:underline"
          >
            Register Now
          </Link>
        </p>
      </div>

      {/* --- TEST ACCESS BOX (MAINTAINED) --- */}
      {/* This section helps reviewers and instructors quickly log in to test both roles. */}
      <div className="mt-8 pt-6 border-t border-gray-100 text-center">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">
          Test Access Credentials
        </p>
        <div className="bg-gray-50 rounded-md py-2 px-4 inline-block border border-gray-200">
          <p className="text-xs text-gray-600">
            <span className="font-bold">Admin:</span> admin@test.com
          </p>
          <p className="text-xs text-gray-600 mt-1">
            <span className="font-bold">User:</span> user@test.com
          </p>
        </div>
      </div>
    </AuthForm>
  );
}