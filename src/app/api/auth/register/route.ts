/**
 * BACKEND ROUTE: User Registration
 * Handles the creation of new user accounts by validating input and checking for existing records.
 */

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Extracting user details from the incoming registration request
    const body = await req.json();
    const { name, email, password } = body;

    // Server-side guard: Ensures no required fields are submitted as empty or null
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    /**
     * DUPLICATE CHECK:
     * In a live app, we would perform a database 'find' here.
     * We use status 409 (Conflict) to specifically indicate the email is already taken.
     */
    if (email === "admin@test.com") {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    /**
     * SUCCESS:
     * Returns a 201 (Created) status code, which is the standard REST API 
     * response for successfully generating a new resource/user.
     */
    return NextResponse.json(
      {
        message: "User registered successfully",
        user: { name, email },
      },
      { status: 201 }
    );
    
  } catch (error) {
    // Logs the actual error to the server console while keeping the client response generic for security
    console.error("Registration API Error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}