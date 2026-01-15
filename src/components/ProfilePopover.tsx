/**
 * @fileoverview Profile popover component for logged-in users
 */

"use client";

import {
  Popover,
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Button,
} from "@mui/material";
import {
  IconClipboardList,
  IconSettings,
  IconLogout,
  IconMail,
  IconPhone,
} from "@tabler/icons-react";
import { THEME_COLORS } from "../ui-component/extended/AppBar/constants";
import { useUser } from "contexts/UserContext";
import { useRouter } from "next/navigation";
import { useUser as useClerkUser } from "@clerk/nextjs";
import { Tooltip } from "@mui/material"; // Make sure this import is present
import { useState } from "react";
import DeleteConfirmationModal from "./common/DeleteConfirmationModal";

interface ProfilePopoverProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export default function ProfilePopover({
  anchorEl,
  open,
  onClose,
  onLogout,
}: ProfilePopoverProps) {
  const { user } = useUser();
  const { user: clerkUser } = useClerkUser();
  const router = useRouter();
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

  const handleMyQuotations = () => {
    onClose();
    router.push("/my-quotations");
  };

  const handleProfileSettings = () => {
    onClose();
    router.push("/my-quotations/profile");
  };

  const handleLogoutClick = () => {
    setLogoutConfirmOpen(true);
  };

  const handleLogoutConfirm = () => {
    setLogoutConfirmOpen(false);
    onClose();
    onLogout();
  };

  const handleLogoutCancel = () => {
    setLogoutConfirmOpen(false);
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  // Use local user data if available, otherwise fall back to Clerk user data
  const displayUser = user || {
    firstName: (clerkUser?.unsafeMetadata as any)?.firstName || "User",
    lastName: (clerkUser?.unsafeMetadata as any)?.lastName || "",
    email: clerkUser?.emailAddresses?.[0]?.emailAddress || "",
    contactNumber: clerkUser?.phoneNumbers?.[0]?.phoneNumber || "",
  };

  // Don't show if neither local user nor Clerk user data is available
  if (!user && !clerkUser) return null;

  return (
    <Popover
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      PaperProps={{
        sx: {
          width: 320,
          borderRadius: 2,
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          border: `1px solid ${THEME_COLORS.secondary}20`,
          mt: 1,
          backgroundImage: `linear-gradient(rgba(17, 82, 147, 0.15), rgba(17, 82, 147, 0.15)), url('/assets/images/home-bg.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "transparent",
          position: "relative",
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        {/* User Info Header */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar
            sx={{
              width: 48,
              height: 48,
              backgroundColor: THEME_COLORS.secondary,
              color: THEME_COLORS.white,
              fontWeight: 600,
              mr: 1,
            }}
          >
            {getInitials(displayUser.firstName, displayUser.lastName)}
          </Avatar>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: THEME_COLORS.secondary,
                lineHeight: 1.2,
              }}
            >
              {String(displayUser.firstName)} {String(displayUser.lastName)}
            </Typography>
          

<Box sx={{ display: "flex", alignItems: "center", mt: 0.5, maxWidth: "100%" }}>
  <IconMail size={14} color={THEME_COLORS.secondary} />
  <Tooltip title={displayUser.email}>
    <Typography
      variant="body2"
      noWrap
      sx={{
        ml: 0.5,
        fontSize: "0.8rem",
        color: THEME_COLORS.secondary,
        maxWidth: 160, // Adjust width as needed
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        cursor: "default"
      }}
    >
      {displayUser.email}
    </Typography>
  </Tooltip>
</Box>
            {displayUser.contactNumber && (
              <Box sx={{ display: "flex", alignItems: "center", mt: 0.2 }}>
                <IconPhone size={14} color={THEME_COLORS.secondary} />
                <Typography
                  variant="body2"
                  sx={{ ml: 0.5, fontSize: "0.8rem", color: THEME_COLORS.secondary }}
                >
                  {displayUser.contactNumber}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>



        {/* Menu Items */}
        <List sx={{ p: 0 }}>
          <ListItem disablePadding>
            <ListItemButton
              onClick={handleMyQuotations}
              sx={{
                borderRadius: 1,
                mb: 0.5,
                "&:hover": {
                  backgroundColor: "rgba(25, 118, 210, 0.1)", // Same hover color as quotations sidebar
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                <IconClipboardList size={20} color={THEME_COLORS.secondary} />
              </ListItemIcon>
              <ListItemText
                primary="My Quotations"
                primaryTypographyProps={{
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  color: THEME_COLORS.secondary,
                }}
                sx={{
                  "& .MuiListItemText-primary": {
                    color: `${THEME_COLORS.secondary} !important`,
                  },
                }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              onClick={handleProfileSettings}
              sx={{
                borderRadius: 1,
                mb: 0.5,
                "&:hover": {
                  backgroundColor: "rgba(25, 118, 210, 0.1)", // Same hover color as quotations sidebar
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                <IconSettings size={20} color={THEME_COLORS.secondary} />
              </ListItemIcon>
              <ListItemText
                primary="Profile Settings"
                primaryTypographyProps={{
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  color: THEME_COLORS.secondary,
                }}
                sx={{
                  "& .MuiListItemText-primary": {
                    color: `${THEME_COLORS.secondary} !important`,
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>



        <Button
          fullWidth
          variant="contained"
          startIcon={<IconLogout size={18} />}
          onClick={handleLogoutClick}
          sx={{
            backgroundColor: THEME_COLORS.secondary,
            color: THEME_COLORS.white,
            borderRadius: "8px", // ← Add your desired border radius here
            "&:hover": {
              backgroundColor: THEME_COLORS.secondary,
              opacity: 0.9,
            },
          }}
        >
          Logout
        </Button>

        {/* Logout Confirmation Modal */}
        <DeleteConfirmationModal
          isOpen={logoutConfirmOpen}
          onClose={handleLogoutCancel}
          onConfirm={handleLogoutConfirm}
          title="Are you sure you want to logout?"
          message="You will be signed out of your account and redirected to the home page."
          confirmButtonText="Yes, Logout"
          cancelButtonText="Cancel"
        />

      </Box>
    </Popover>
  );
}