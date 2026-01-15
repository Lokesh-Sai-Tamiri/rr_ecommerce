/**
 * @fileoverview User Name Display Component
 * Shows the logged-in user's name in the header
 */

"use client";

import React from "react";
import { Box, Typography, Tooltip } from "@mui/material";
import { IconUser } from "@tabler/icons-react";
import { useUser } from "contexts/UserContext";
import { useUser as useClerkUser } from "@clerk/nextjs";
import { THEME_COLORS } from "ui-component/extended/AppBar/constants";

/**
 * User name display component
 * Shows user's first name in the header with a styled container and account icon
 */
export default function UserNameDisplay() {
  const { user, isLoggedIn } = useUser();
  const { isSignedIn, user: clerkUser } = useClerkUser();

  // Debug logging
  console.log("=== UserNameDisplay Debug ===");
  console.log("isLoggedIn (UserContext):", isLoggedIn);
  console.log("isSignedIn (Clerk):", isSignedIn);
  console.log("user:", user);
  console.log("clerkUser:", clerkUser);
  console.log("user?.firstName:", user?.firstName);
  
  // Enhanced logout detection - ALL conditions must be true to show component
  const shouldShow = Boolean(
    isLoggedIn &&       // UserContext says logged in
    isSignedIn &&       // Clerk says signed in  
    user?.firstName &&  // UserContext has firstName
    clerkUser           // Clerk has user object
  );
  
  console.log("Should show component:", shouldShow);
  console.log("========================");
  
  if (!shouldShow) {
    console.log("🚫 UserNameDisplay: Not showing - missing auth or user data");
    return null;
  }

  return (
    <Tooltip title={`${user.firstName} ${user.lastName}`.trim()} placement="bottom" arrow>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mr: 2,
          px: 2,
          py: 1,
          borderRadius: 2,
          backgroundColor: "rgba(17, 82, 147, 0.1)",
          border: `1px solid ${THEME_COLORS.secondary}`,
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            backgroundColor: "rgba(17, 82, 147, 0.15)",
            transform: "translateY(-1px)",
            boxShadow: "0 4px 8px rgba(17, 82, 147, 0.2)",
          },
        }}
      >
        <IconUser size={20} color={THEME_COLORS.secondary} />
        <Typography
          variant="body2"
          sx={{
            color: THEME_COLORS.secondary,
            fontWeight: 600,
            fontSize: "0.9rem",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "120px",
          }}
        >
          {user.firstName}
        </Typography>
      </Box>
    </Tooltip>
  );
}
