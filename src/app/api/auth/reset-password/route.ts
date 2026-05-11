/**
 * BACKEND ROUTE: Reset Password Logic
 * Finalizes the recovery process by updating the user's credentials in the system.
 */

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Extract the new password from the request body
    const body = await req.json();
    const { password } = body;

    /**
     * SERVER-SIDE SECURITY CHECK:
     * Even though the frontend validates this, we re-check on the server to 
     * prevent malicious API injections with weak passwords.
     */
    if (!password || password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    /**
     * DATABASE UPDATE (MOCK):
     * In a real-world scenario, we would use a library like 'bcrypt' or 'argon2' 
     * to hash this password before saving it to the database to ensure 
     * that even if the database is leaked, user passwords remain secure.
     */
    return NextResponse.json(
      { message: "Password updated successfully! You can now log in." },
      { status: 200 }
    );
    
  } catch (error) {
    // Standard catch-all for server-side exceptions
    console.error("Reset Password API Error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}