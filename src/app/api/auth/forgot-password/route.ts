import { NextResponse } from "next/server";

/**
 * Handle password reset requests by validating the user's email 
 * and simulating an OTP delivery.
 */
export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Basic server-side validation to ensure the payload isn't empty
    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // This is a hardcoded check for demo purposes. 
    // In production, we'd query the DB here (e.g., Prisma/MongoDB).
    if (email === "admin@test.com" || email === "user@test.com") {
      return NextResponse.json({
        message: "OTP sent to your email",
      });
    }

    // Standard 404 response if the email doesn't exist in our records
    return NextResponse.json(
      { message: "User not found" },
      { status: 404 }
    );

  } catch (error) {
    // Catch-all for unexpected issues like malformed JSON
    console.error("Forgot Password API Error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}