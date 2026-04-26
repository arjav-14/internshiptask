import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // For JWT tokens, logout is handled client-side by removing the token from localStorage
    // Server just returns success response
    return NextResponse.json({
      success: true,
      message: "Logout successful"
    });

  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
