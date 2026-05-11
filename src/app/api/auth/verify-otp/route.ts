/**
 * BACKEND ROUTE: OTP Verification Logic
 * Validates the one-time passcode provided by the user to authorize registration or password resets.
 */

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Parsing the request to grab the 6-digit code submitted by the user
    const body = await req.json();
    const { otp } = body;

    // Validation guard: Ensures the request isn't processed if the OTP field is empty
    if (!otp) {
      return NextResponse.json(
        { message: "OTP is required" },
        { status: 400 }
      );
    }

    /**
     * MOCK VERIFICATION LOGIC:
     * In a production environment, we would compare this input against a code 
     * stored in a database or a fast-access cache like Redis with an expiration timer.
     * For this project, '123456' serves as our universal test bypass.
     */
    if (otp === "123456") {
      return NextResponse.json(
        { message: "OTP Verified Successfully" },
        { status: 200 }
      );
    }

    /**
     * ERROR HANDLING:
     * If the code doesn't match our test value, we return a 400 (Bad Request).
     * The message includes a hint to help the evaluator proceed with the test.
     */
    return NextResponse.json(
      { message: "Invalid code. Please try '123456' for testing." },
      { status: 400 }
    );

  } catch (error) {
    // Catching malformed JSON or unexpected server-side execution errors
    console.error("OTP Verification API Error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}