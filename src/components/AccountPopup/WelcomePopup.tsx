/**
 * @fileoverview Welcome popup modal component
 * Features welcome message with user's name and laboratory illustration
 */

"use client";

import React from "react";
import usePopupPreventClose from "../../hooks/usePopupPreventClose";
import { useUser } from "contexts/UserContext";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  IconButton,
  Stack,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FormattedMessage } from "react-intl";
import Logo from "ui-component/Logo";
import {
  getPopupPaperStyles,
  getBackdropStyles,
  getDialogContentStyles,
  getHeaderStyles,
  getLogoStyles,
  getCloseButtonStyles,
  getContentBoxStyles,
  getTitleStyles,
  getPrimaryButtonStyles,
} from "./sharedStyles";

// Types
interface WelcomePopupProps {
  open: boolean;
  onClose: () => void;
  userName: string;
}

/**
 * Welcome popup modal
 * Features:
 * - Welcome message with user's name
 * - Laboratory illustration
 * - Two action buttons: Explore More and Go to Dashboard
 */
export default function WelcomePopup({ open, onClose, userName }: WelcomePopupProps) {
  const theme = useTheme();
  const { user } = useUser();
  const router = useRouter();

  const handleExploreMore = () => {
    console.log("Explore More clicked - navigating to /about-us");
    // Close the popup first
    onClose();
    // Navigate to about-us page
    router.push("/about-us");
  };

  const handleGoToDashboard = () => {
    console.log("Go to Dashboard clicked - navigating to home");
    // Close the popup first
    onClose();
    // Navigate to home page
    router.push("/");
  };

  // Debug log when popup opens
  React.useEffect(() => {
    if (open) {
      // console.log("🎉 Welcome popup opened for user:", userName);
    }
  }, [open, userName]);

  // Use the hook to prevent closing on outside touch
  const { handleDialogClose } = usePopupPreventClose({
    preventOutsideClose: true,
    preventEscapeClose: false, // Allow escape key to close
    onClose: () => {
      console.log("🔴 Welcome popup closing");
      onClose();
    },
  });

  // Simple close handler for testing
  const handleCloseButton = () => {
    console.log("🔴 Close button clicked - calling onClose");
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          ...getPopupPaperStyles(false),
          maxWidth: "550px !important",
          maxHeight: "80vh",
        },
      }}
      BackdropProps={{
        sx: getBackdropStyles(),
      }}
      TransitionProps={{
        timeout: 300,
      }}
    >
      <DialogContent sx={getDialogContentStyles()}>
        {/* Header */}
        <Box sx={getHeaderStyles()}>
          {/* Centered Logo */}
         

          {/* Close Button - Absolutely positioned */}
          <IconButton 
            onClick={handleCloseButton}
            sx={getCloseButtonStyles()}
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={getContentBoxStyles()}>
          {/* Laboratory Illustration */}
          <Box sx={{ 
            display: "flex", 
            justifyContent: "center", 
            mt: -14,
            height: "400px",
            // background: "#F3F3F4",
            borderRadius: 2,
            alignItems: "center",
            position: "relative",
            overflow: "hidden"
          }}>
            <img
              src="/assets/Group.svg"
              alt="Laboratory Scientists"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                borderRadius: "8px"
              }}
              onError={(e) => {
                // Fallback to a placeholder if image doesn't load
                e.currentTarget.style.display = "none";
                e.currentTarget.nextElementSibling?.setAttribute("style", "display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; color: #666; font-size: 14px;");
              }}
            />
            {/* Fallback text if image fails to load */}
            <div style={{ display: "none", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", color: "#666", fontSize: "14px" }}>
              Laboratory Scientists Illustration
            </div>
          </Box>

          {/* Title */}
          <Typography variant="h4" sx={{
            ...getTitleStyles(),
            color: "#115293",
            fontSize: { xs: "1.75rem", sm: "2rem" },
            mt: -5
          }}>
            Welcome aboard, {userName}!
          </Typography>

          {/* Subtitle */}
          <Typography variant="body1" sx={{
            textAlign: "center",
            color: "#115293",
            mb: 4,
            fontSize: "1rem",
            lineHeight: 1.5,
            maxWidth: "400px",
            mx: "auto"
          }}>
            Your account has been created successfully. You now have access to Radiant Research services.
          </Typography>

          {/* Action Buttons */}
          <Box sx={{ 
            display: "flex", 
            gap: 2, 
            maxWidth: "400px", 
            mx: "auto",
            flexDirection: { xs: "column", sm: "row" }
          }}>
            {/* Explore More Button */}
            <Button
              fullWidth
              variant="outlined"
              size="large"
              onClick={handleExploreMore}
              sx={{
                borderColor: "#115293",
                color: "#115293",
                borderWidth: "2px",
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 500,
                textTransform: "none",
                "&:hover": {
                  borderColor: "#0d3d6b",
                  backgroundColor: "rgba(17, 82, 147, 0.04)",
                  borderWidth: "2px",
                },
              }}
            >
              <FormattedMessage
                id="welcome.popup.explore"
                defaultMessage="Explore More"
              />
            </Button>

            {/* Go to Dashboard Button */}
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleGoToDashboard}
              sx={{
                ...getPrimaryButtonStyles(theme),
                backgroundColor: "#115293 !important",
                "&:hover": {
                  backgroundColor: "#0d3d6b !important",
                },
              }}
            >
              <FormattedMessage
                id="welcome.popup.dashboard"
                defaultMessage="Go to Dashboard"
              />
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
