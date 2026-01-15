/**
 * @fileoverview Custom hook for managing Clerk user metadata in React components
 */

import { useUser } from "@clerk/nextjs";
import { useCallback } from "react";

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
 * Custom hook for managing Clerk user metadata
 * @returns Object with metadata functions
 */
export function useClerkMetadata() {
  const { user } = useUser();

  /**
   * Save user metadata to Clerk
   * @param metadata - User profile data to store
   * @returns Promise<boolean> - Success status
   */
  const saveUserMetadata = useCallback(async (metadata: UserMetadata): Promise<boolean> => {
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
  }, [user]);

  /**
   * Get user metadata from Clerk
   * @returns UserMetadata | null
   */
  const getUserMetadata = useCallback((): UserMetadata | null => {
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
  }, [user]);

  /**
   * Check if user has completed their profile
   * @returns boolean
   */
  const hasCompletedProfile = useCallback((): boolean => {
    const metadata = getUserMetadata();
    return metadata?.completedProfile || false;
  }, [getUserMetadata]);

  /**
   * Save user profile data to Clerk metadata
   * @param profileData - Profile data to save
   */
  const saveProfileToClerk = useCallback(async (profileData: {
    firstName: string;
    lastName: string;
    country: string;
    phoneNumber: string;
  }): Promise<boolean> => {
    const metadata: UserMetadata = {
      ...profileData,
      completedProfile: true,
      profileCompletedAt: new Date().toISOString(),
    };

    return await saveUserMetadata(metadata);
  }, [saveUserMetadata]);

  return {
    saveUserMetadata,
    getUserMetadata,
    hasCompletedProfile,
    saveProfileToClerk,
    user,
  };
}
