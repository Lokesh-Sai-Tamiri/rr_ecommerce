/**
 * @fileoverview API route for updating user metadata in Clerk
 */

import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { saveProfileToClerk } from "../../../../utils/clerkMetadata";
import { corsJsonResponse, handleOptions } from "../../../../utils/cors";

export async function OPTIONS() {
  return handleOptions();
}

export async function POST(request: NextRequest) {
  try {
    // Get the authenticated user
    const { userId } = await auth();

    if (!userId) {
      return corsJsonResponse({ error: "Unauthorized" }, 401);
    }

    // Parse request body
    const body = await request.json();
    const { firstName, lastName, country, phoneNumber } = body;

    // Validate required fields
    if (!firstName || !lastName || !country || !phoneNumber) {
      return corsJsonResponse({ error: "Missing required fields" }, 400);
    }

    // Import Clerk client
    const { clerkClient } = await import("@clerk/nextjs/server");
    const user = await clerkClient.users.getUser(userId);

    if (!user) {
      return corsJsonResponse({ error: "User not found" }, 404);
    }

    // Save profile data to Clerk metadata
    const success = await saveProfileToClerk(user, {
      firstName,
      lastName,
      country,
      phoneNumber,
    });

    if (success) {
      return corsJsonResponse(
        { message: "Profile data saved successfully" },
        200
      );
    } else {
      return corsJsonResponse({ error: "Failed to save profile data" }, 500);
    }
  } catch (error) {
    console.error("❌ Error in metadata API route:", error);
    return corsJsonResponse({ error: "Internal server error" }, 500);
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get the authenticated user
    const { userId } = await auth();

    if (!userId) {
      return corsJsonResponse({ error: "Unauthorized" }, 401);
    }

    // Import Clerk client
    const { clerkClient } = await import("@clerk/nextjs/server");
    const user = await clerkClient.users.getUser(userId);

    if (!user) {
      return corsJsonResponse({ error: "User not found" }, 404);
    }

    // Get user metadata
    const metadata = user.unsafeMetadata as any;

    return corsJsonResponse({
      firstName: metadata.firstName || "",
      lastName: metadata.lastName || "",
      country: metadata.country || "",
      phoneNumber: metadata.phoneNumber || "",
      completedProfile: metadata.completedProfile || false,
      profileCompletedAt: metadata.profileCompletedAt || "",
    });
  } catch (error) {
    console.error("❌ Error getting metadata:", error);
    return corsJsonResponse({ error: "Internal server error" }, 500);
  }
}
