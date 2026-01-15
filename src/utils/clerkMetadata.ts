/**
 * @fileoverview Utility functions for managing Clerk user metadata
 * Handles storing and retrieving user profile data in Clerk metadata
 */

import { User } from "@clerk/nextjs/server";

// Types for user metadata
export interface UserMetadata {
  firstName: string;
  lastName: string;
  country: string;
  phoneNumber: string;
  completedProfile: boolean;
  profileCompletedAt?: string;
}

/**
 * Save user metadata to Clerk (Server-side version)
 * @param user - Clerk user object
 * @param metadata - User profile data to store
 * @returns Promise<boolean> - Success status
 */
export async function saveUserMetadata(user: User, metadata: UserMetadata): Promise<boolean> {
  try {
    console.log("💾 Saving user metadata to Clerk:", metadata);
    
    if (!user) {
      console.error("❌ No user found in Clerk");
      return false;
    }

    // Update user metadata
    await user.update({
      unsafeMetadata: {
        ...user.unsafeMetadata,
        ...metadata,
      },
    });

    console.log("✅ User metadata saved successfully to Clerk");
    return true;
  } catch (error) {
    console.error("❌ Error saving user metadata to Clerk:", error);
    return false;
  }
}

/**
 * Get user metadata from Clerk (Server-side version)
 * @param user - Clerk user object
 * @returns UserMetadata | null
 */
export function getUserMetadata(user: User | null): UserMetadata | null {
  try {
    if (!user || !user.unsafeMetadata) {
      return null;
    }

    const metadata = user.unsafeMetadata as any;
    
    return {
      firstName: metadata.firstName || "",
      lastName: metadata.lastName || "",
      country: metadata.country || "",
      phoneNumber: metadata.phoneNumber || "",
      completedProfile: metadata.completedProfile || false,
      profileCompletedAt: metadata.profileCompletedAt || "",
    };
  } catch (error) {
    console.error("❌ Error getting user metadata from Clerk:", error);
    return null;
  }
}

/**
 * Check if user has completed their profile (Server-side version)
 * @param user - Clerk user object
 * @returns boolean
 */
export function hasCompletedProfile(user: User | null): boolean {
  const metadata = getUserMetadata(user);
  return metadata?.completedProfile || false;
}

/**
 * Save user profile data to Clerk metadata (Server-side version)
 * @param user - Clerk user object
 * @param profileData - Profile data to save
 */
export async function saveProfileToClerk(
  user: User, 
  profileData: {
    firstName: string;
    lastName: string;
    country: string;
    phoneNumber: string;
  }
): Promise<boolean> {
  const metadata: UserMetadata = {
    ...profileData,
    completedProfile: true,
    profileCompletedAt: new Date().toISOString(),
  };

  return await saveUserMetadata(user, metadata);
}
