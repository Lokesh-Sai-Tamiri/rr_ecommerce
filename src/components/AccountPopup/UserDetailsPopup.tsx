/**
 * @fileoverview User details collection popup modal component
 * Features form fields for user information collection after OTP verification
 */

"use client";

import React, { useState, useEffect } from "react";
import usePopupPreventClose from "../../hooks/usePopupPreventClose";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Stack,
  useTheme,
  MenuItem,
  Fade,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { FormattedMessage } from "react-intl";
import Logo from "ui-component/Logo";
import { useUser } from "contexts/UserContext";
import { useDispatch } from "react-redux";
import { openSnackbar } from "store/slices/snackbar";
import { useUser as useClerkUser } from "@clerk/nextjs";
import { useClerkMetadata } from "../../hooks/useClerkMetadata";
import WelcomePopup from "./WelcomePopup";
import {
  getPopupPaperStyles,
  getBackdropStyles,
  getDialogContentStyles,
  getHeaderStyles,
  getLogoStyles,
  getCloseButtonStyles,
  getContentBoxStyles,
  getTitleStyles,
  getEmailInputStyles,
  getPrimaryButtonStyles,
} from "./sharedStyles";

// Types
interface UserDetailsPopupProps {
  open: boolean;
  onClose: () => void;
  isNewUser?: boolean; // Whether this is a new signup or existing user completing profile
}

/**
 * User details collection popup modal
 * Features:
 * - Form fields for user information
 * - Country selection dropdown
 * - Consistent styling with other popups
 * - Shows WelcomePopup after successful submission for first-time users
 */
export default function UserDetailsPopup({
  open,
  onClose,
  isNewUser = true,
}: UserDetailsPopupProps) {
  const theme = useTheme();
  const { user, login } = useUser();
  const dispatch = useDispatch();
  const { user: clerkUser } = useClerkUser();
  const { saveProfileToClerk } = useClerkMetadata();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    country: "",
  });
  const [showWelcome, setShowWelcome] = useState(false);

  // Get email from either context or Clerk user
  const userEmail =
    user?.email || clerkUser?.emailAddresses?.[0]?.emailAddress || "";
  const [showToast, setShowToast] = useState(false);

  // Debug log when popup opens and show toast
  React.useEffect(() => {
    if (open) {
      console.log("📝 UserDetailsPopup opened for new user");
      console.log("🔍 Available emails:", {
        contextUserEmail: user?.email,
        clerkUserEmail: clerkUser?.emailAddresses?.[0]?.emailAddress,
        finalEmail: userEmail,
      });
      // Show toast immediately to ensure visibility
      setShowToast(true);
      console.log("✅ Toast should be visible now");
    } else {
      setShowToast(false);
    }
  }, [open, user?.email, clerkUser?.emailAddresses, userEmail]);

  const handleClose = () => {
    onClose();
    setFormData({
      firstName: "",
      lastName: "",
      contactNumber: "",
      country: "",
    });
    setShowWelcome(false);
  };

  // Use the hook to prevent closing on outside touch
  const { handleDialogClose } = usePopupPreventClose({
    preventOutsideClose: true,
    preventEscapeClose: false, // Allow escape key to close
    onClose: handleClose,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!isFormValid) {
      console.log("❌ Form is not valid, not submitting");
      return;
    }

    console.log("✅ Form is valid, saving user data");

    try {
      // Save user data to Clerk metadata first
      if (clerkUser) {
        console.log("💾 Saving profile data to Clerk metadata");
        const savedToClerk = await saveProfileToClerk({
          firstName: formData.firstName,
          lastName: formData.lastName,
          country: formData.country,
          phoneNumber: formData.contactNumber,
        });

        if (savedToClerk) {
          console.log("✅ Profile data saved to Clerk metadata successfully");
        } else {
          console.log(
            "⚠️ Failed to save to Clerk metadata, continuing with local storage"
          );
        }
      } else {
        console.log("⚠️ No Clerk user found, saving only to local context");
      }

      // Save user data to local context
      login({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: userEmail, // Use the determined email
        contactNumber: formData.contactNumber,
        country: formData.country,
      });

      // For new users, show welcome popup. For existing users, close directly
      if (isNewUser) {
        console.log(
          "✅ User details saved, showing welcome popup for new user"
        );
        setShowWelcome(true);
      } else {
        console.log("✅ User details saved, closing popup for existing user");
        handleClose();
      }
    } catch (error) {
      console.error("❌ Error saving user data:", error);
      // Still save to local context even if Clerk metadata fails
      login({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: userEmail,
        contactNumber: formData.contactNumber,
        country: formData.country,
      });

      if (isNewUser) {
        setShowWelcome(true);
      } else {
        handleClose();
      }
    }
  };

  const isFormValid = formData.firstName && formData.lastName;

  return (
    <>
      <Dialog
        open={open && !showWelcome}
        onClose={handleDialogClose}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            ...getPopupPaperStyles(false),
            maxWidth: "1200px !important",
            maxHeight: "80vh",
            position: "relative",
            zIndex: 1000,
          },
        }}
        BackdropProps={{
          sx: getBackdropStyles(),
        }}
        TransitionProps={{
          timeout: 300,
        }}
        sx={{
          zIndex: 1000,
        }}
      >
        <DialogContent sx={getDialogContentStyles()}>
          {/* Header */}
          <Box
            sx={{
              ...getHeaderStyles(),
              p: 2, // Minimal padding
              pb: 0.8,
              minHeight: "40px", // Reduce minimum height
            }}
          >
            {/* Logo */}

            {/* Close Button - Positioned absolutely */}
            <IconButton onClick={handleClose} sx={getCloseButtonStyles()}>
              <CloseIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>

          {/* Content */}
          <Box
            sx={{
              ...getContentBoxStyles(),
              pt: 0, // No top padding - start from the very top
              pb: 0,
              mt: -2,
              // Move content up to align with close icon
            }}
          >
            {/* Title */}
            <Typography
              variant="h4"
              sx={{
                ...getTitleStyles(),
                mt: 0, // Remove top margin
                mb: 2, // Reduce bottom margin
              }}
            >
              <FormattedMessage
                id="userdetails.popup.title"
                defaultMessage={
                  isNewUser ? "One Last Step!" : "Complete Your Profile"
                }
              />
            </Typography>

            {/* Subtitle */}
            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                color: "#115293",
                mb: 3, // Reduce bottom margin
                fontSize: "0.9rem",
                lineHeight: 1.4,
              }}
            >
              <FormattedMessage
                id="userdetails.popup.subtitle"
                defaultMessage={
                  isNewUser
                    ? "Enter your details to finish setting up your account."
                    : "Please provide your details to complete your profile."
                }
              />
            </Typography>

            {/* Form */}
            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={3}>
                {/* First Name and Last Name Row - Desktop: Side by side, Mobile: Stacked */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 2,
                  }}
                >
                  <TextField
                    fullWidth
                    label="First Name *"
                    variant="outlined"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    sx={getEmailInputStyles(theme)}
                  />
                  <TextField
                    fullWidth
                    label="Last Name *"
                    variant="outlined"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    sx={getEmailInputStyles(theme)}
                  />
                </Box>

                {/* Contact Number and Country Row - Desktop: Side by side, Mobile: Stacked */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 2,
                  }}
                >
                  <TextField
                    fullWidth
                    label="Contact Number"
                    variant="outlined"
                    value={formData.contactNumber}
                    onChange={(e) =>
                      handleInputChange("contactNumber", e.target.value)
                    }
                    sx={getEmailInputStyles(theme)}
                  />
                  <TextField
                    fullWidth
                    select
                    label="Select your Country"
                    variant="outlined"
                    value={formData.country}
                    onChange={(e) =>
                      handleInputChange("country", e.target.value)
                    }
                    sx={{
                      ...getEmailInputStyles(theme),
                      "& .MuiSelect-select": {
                        backgroundColor: "#E9F3FD !important",
                        color: theme.palette.text.primary,
                      },
                      "& .MuiSvgIcon-root": {
                        color: "#1976D2 !important", // Blue dropdown arrow matching Figma sign up button
                      },
                    }}
                    SelectProps={{
                      MenuProps: {
                        disablePortal: false,
                        PaperProps: {
                          sx: { zIndex: 10000000 },
                        },
                        sx: { zIndex: 10000000 },
                      },
                    }}
                  >
                    <MenuItem value="india">India</MenuItem>
                    <MenuItem value="usa">United States</MenuItem>
                    <MenuItem value="uk">United Kingdom</MenuItem>
                    <MenuItem value="canada">Canada</MenuItem>
                    <MenuItem value="australia">Australia</MenuItem>
                    <MenuItem value="germany">Germany</MenuItem>
                    <MenuItem value="france">France</MenuItem>
                    <MenuItem value="japan">Japan</MenuItem>
                    <MenuItem value="china">China</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </TextField>
                </Box>

                {/* Submit Button */}
                <Box sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
                  {" "}
                  {/* Center the smaller button */}
                  <Button
                    type="submit"
                    variant="contained"
                    size="small"
                    disabled={!isFormValid}
                    sx={{
                      ...getPrimaryButtonStyles(theme),
                      minWidth: "200px", // Decreased width
                      maxWidth: "220px",
                      minHeight: "40px",
                      maxHeight: "45px", // Set maximum width
                    }}
                  >
                    <FormattedMessage
                      id="userdetails.popup.submit"
                      defaultMessage={isNewUser ? "Sign up" : "Sign up"}
                    />
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Welcome Popup - Show after successful form submission */}
      <WelcomePopup
        open={showWelcome}
        onClose={() => {
          console.log("🎉 Welcome popup closed, closing entire popup flow");
          handleClose();
        }}
        userName={formData.firstName}
      />

      {/* Toast Message - OTP Verification Success */}
      <Fade in={showToast} timeout={300}>
        <Box
          sx={{
            position: "fixed",
            top: "80vh", // Position below the card - more reliable positioning
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10000, // Higher z-index to ensure visibility
            display: "flex",
            alignItems: "center",
            gap: 2.5,
            background:
              "linear-gradient(105.34deg, #115293 0%, #1976D2 50%, #115293 100%)", // Same color as proceed button
            color: "white",
            px: 2,
            py: 1.25,
            borderRadius: 1,
            minWidth: 261,
            maxWidth: 310,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            animation: "slideUp 0.3s ease-out",
            "@keyframes slideUp": {
              "0%": {
                opacity: 0,
                transform: "translateX(-50%) translateY(20px)",
              },
              "100%": {
                opacity: 1,
                transform: "translateX(-50%) translateY(0)",
              },
            },
          }}
        >
          {/* Use a checkmark icon from MUI */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 28,
              height: 28,
              borderRadius: "50%",
              // backgroundColor: "white",
              background:
                "linear-gradient(105.34deg, #115293 0%, #1976D2 50%, #115293 100%)", // Same blue gradient as toast background
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ display: "block" }}
            >
              <circle cx="10" cy="10" r="10" fill="#115293" />
              <path
                d="M6 10.5L9 13.5L14 8.5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Box>

          <Typography
            variant="body2"
            sx={{
              color: "white",
              fontWeight: 500,
              fontSize: "0.9rem",
            }}
          >
            OTP Verification was Successfull
          </Typography>
        </Box>
      </Fade>
    </>
  );
}
