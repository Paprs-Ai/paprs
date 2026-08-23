import { NextRequest } from "next/server";
import { WaitlistService } from "@/services/waitlist.service";

export async function POST(request: NextRequest) {
  try {
    let body: { email?: string };
    try {
      body = await request.json();
    } catch {
      return Response.json(
        {
          success: false,
          message: "Invalid JSON in request body.",
          error: "INVALID_JSON",
        },
        { status: 400 }
      );
    }

    const { email } = body;

    if (!email || typeof email !== "string") {
      return Response.json(
        {
          success: false,
          message: "Email is required.",
          error: "MISSING_EMAIL",
        },
        { status: 400 }
      );
    }

    const result = await WaitlistService.addToWaitlist(email);

    if (!result.success) {
      const status = result.error === "INVALID_EMAIL" ? 400 : 500;
      return Response.json(result, { status });
    }

    // Return 200 if already registered, 201 for fresh creation
    const status = result.alreadyRegistered ? 200 : 201;
    return Response.json(result, { status });
  } catch (error: unknown) {
    console.error("Waitlist API route error:", error);
    return Response.json(
      {
        success: false,
        message: "Internal server error occurred.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return Response.json({
    status: "ok",
    message: "Paprs Waitlist API is active.",
  });
}
