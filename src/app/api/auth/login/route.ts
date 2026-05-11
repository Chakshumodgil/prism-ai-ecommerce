/**
 * BACKEND ROUTE: User Authentication (Login)
 * Processes sign-in requests by validating credentials and returning user session data.
 */

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Parse the incoming request body to extract user credentials
    const body = await req.json();
    const { email, password } = body;

    // Early return if mandatory fields are missing to prevent unnecessary processing
    if (!email || !password) {
      return NextResponse.json(
        { message: "Missing fields" },
        { status: 400 }
      );
    }

    /**
     * MOCK AUTHENTICATION CHECK:
     * In a production environment, we would use bcrypt to compare the hashed password 
     * against a record in the database (e.g., via Prisma or Mongoose).
     */
    if (email === "admin@test.com" && password === "123456") {
      return NextResponse.json(
        {
          message: "Login successful",
          user: { email }, // Returning user data to be stored in localStorage/Session
        },
        { status: 200 }
      );
    }

    // Return 401 (Unauthorized) if the email/password combination doesn't match
    return NextResponse.json(
      { message: "Invalid credentials. Try admin@test.com / 123456" },
      { status: 401 }
    );
    
  } catch (error) {
    // Standard error log for debugging server-side crashes
    console.error("Login API Error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}