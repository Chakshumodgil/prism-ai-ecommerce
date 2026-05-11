/**
 * SECURITY COMPONENT: AuthGuard
 * PATH: src/components/AuthGuard.tsx
 * 
 * DESCRIPTION:
 * This is the application "Bouncer". It wraps protected pages (like Admin or Profile)
 * and checks localStorage for valid credentials before allowing the 'children' 
 * components to mount.
 */

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAdmin?: boolean; // Toggle this to true for routes like /admin
}

export default function AuthGuard({ children, requireAdmin = false }: AuthGuardProps) {
  const router = useRouter();
  
  // Local state to prevent "flickering" (showing private content for a split second)
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    /**
     * AUTH CHECK LOGIC:
     * We pull auth status from localStorage. 
     * Note: In a production app, we would ideally verify a JWT token here.
     */
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userRole = localStorage.getItem("userRole");

    // 1. If not logged in, kick them to the login page immediately
    if (!isLoggedIn) {
      router.push("/login");
    } 
    // 2. If the page requires admin rights but the user is a 'customer'
    else if (requireAdmin && userRole !== "admin") {
      alert("Access Denied: You do not have permission to view this section.");
      router.push("/products"); // Redirect to a safe public area
    } 
    // 3. Everything looks good, unlock the page
    else {
      setAuthorized(true);
    }
  }, [router, requireAdmin]);

  /**
   * LOADING STATE:
   * While the useEffect is running (checking localStorage), we show a 
   * fallback UI so the user doesn't see a blank screen or a flash of 
   * unauthorized content.
   */
  if (!authorized) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-8 h-8 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="text-sm font-bold uppercase tracking-widest text-gray-400">
          Verifying Credentials...
        </p>
      </div>
    );
  }

  // If authorized, render the actual page content
  return <>{children}</>;
}