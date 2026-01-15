/**
 * @fileoverview Component to display user name from Clerk metadata
 * Automatically fetches and displays user's name from Clerk unsafe_metadata
 */

"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Typography, Box } from "@mui/material";

interface ClerkUserNameDisplayProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body1" | "body2" | "caption";
  sx?: any;
  fallbackText?: string;
}

/**
 * Component that displays user's name from Clerk metadata
 * @param {ClerkUserNameDisplayProps} props - Component props
 * @returns {JSX.Element} User name display component
 */
export default function ClerkUserNameDisplay({ 
  variant = "body1", 
  sx = {}, 
  fallbackText = "User" 
}: ClerkUserNameDisplayProps): JSX.Element {
  const { user, isLoaded } = useUser();
  const [userName, setUserName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && user) {
      console.log("🔍 ClerkUserNameDisplay: Fetching user metadata");
      
      // Get metadata from Clerk user
      const metadata = user.unsafeMetadata as any;
      
      console.log("📋 User metadata from Clerk:", metadata);
      
      if (metadata && metadata.firstName) {
        const fullName = metadata.lastName 
          ? `${metadata.firstName} ${metadata.lastName}`
          : metadata.firstName;
        
        console.log("✅ Displaying name from Clerk metadata:", fullName);
        setUserName(fullName);
      } else {
        console.log("⚠️ No name found in Clerk metadata, using fallback");
        setUserName(fallbackText);
      }
      
      setIsLoading(false);
    } else if (isLoaded && !user) {
      console.log("⚠️ No user found in Clerk");
      setUserName(fallbackText);
      setIsLoading(false);
    }
  }, [user, isLoaded, fallbackText]);

  if (isLoading) {
    return (
      <Typography variant={variant} sx={sx}>
        Loading...
      </Typography>
    );
  }

  return (
    <Typography variant={variant} sx={sx}>
      {userName}
    </Typography>
  );
}

/**
 * Hook to get user name from Clerk metadata
 * @returns {string} User's full name from metadata
 */
export function useClerkUserName(): string {
  const { user, isLoaded } = useUser();
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    if (isLoaded && user) {
      const metadata = user.unsafeMetadata as any;
      
      if (metadata && metadata.firstName) {
        const fullName = metadata.lastName 
          ? `${metadata.firstName} ${metadata.lastName}`
          : metadata.firstName;
        setUserName(fullName);
      } else {
        setUserName("");
      }
    }
  }, [user, isLoaded]);

  return userName;
}
