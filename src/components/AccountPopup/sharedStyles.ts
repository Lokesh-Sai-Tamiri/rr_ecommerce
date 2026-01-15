/**
 * @fileoverview Shared styles for Account and OTP popups
 * Contains all common styling to ensure consistency across popup components
 */

import { Theme } from "@mui/material";

// Common colors
export const POPUP_COLORS = {
  background: "#E9F3FD",
  textPrimary: "#115293",
  textSecondary: "text.primary",
  white: "#FFFFFF",
  disabled: "#ccc",
  disabledText: "#666",
} as const;

// Common popup paper styles
export const getPopupPaperStyles = (isOTP: boolean = false) => ({
  borderRadius: 3,
  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
  background: POPUP_COLORS.background,
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  overflow: "hidden",
  position: "relative" as const,
  minHeight: "20px",
  maxHeight: isOTP ? { xs: "90vh", sm: "85vh" } : { xs: "100vh", sm: "95vh", md: "85vh" },
  maxWidth: { xs: "95vw", sm: "450px" },
  width: { xs: "95vw", sm: "450px", md: "600px" },
  "&::before": {
    content: '""',
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
    pointerEvents: "none" as const,
    zIndex: 1,
  },
});

// Common backdrop styles
export const getBackdropStyles = () => ({
  backgroundColor: "rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(2px)",
});

// Common dialog content styles
export const getDialogContentStyles = () => ({
  p: 0,
  position: "relative" as const,
  zIndex: 2,
});

// Common header styles
export const getHeaderStyles = () => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  p: 2.5,
  pb: 1.5,
  backgroundColor: "transparent",
  position: "relative" as const,
  minHeight: "70px",
  zIndex: 5, // Ensure header is above content but below close button
});

// Common logo styles
export const getLogoStyles = () => ({
  '& img': {
    height: '50px !important',
    width: 'auto !important',
    maxHeight: '50px !important',
  }
});

// Common close button styles
export const getCloseButtonStyles = () => ({
  color: POPUP_COLORS.textSecondary,
  backgroundColor: "rgba(0, 0, 0, 0.04)",
  width: 36,
  height: 36,
  position: "absolute" as const,
  top: 16,
  right: 16,
  zIndex: 10, // Ensure it's above other elements
  transition: "all 0.2s ease-in-out",
  cursor: "pointer", // Explicit cursor
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    transform: "scale(1.05)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  },
  "&:active": {
    transform: "scale(0.95)",
  },
});

// Common content box styles
export const getContentBoxStyles = () => ({
  p: 2.5,
  pt: 1.5,
});

// Common title styles
export const getTitleStyles = () => ({
  fontWeight: 700,
  color: POPUP_COLORS.textSecondary,
  textAlign: "center" as const,
  mb: 1,
  fontSize: "24px", // Exact 24px font size for all titles
});

// Common subtitle styles
export const getSubtitleStyles = () => ({
  textAlign: "center" as const,
  color: POPUP_COLORS.textPrimary,
  mb: 2.5,
  fontSize: "0.9rem",
  lineHeight: 1.4,
});

// Common email input styles
export const getEmailInputStyles = (theme: Theme) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    backgroundColor: `${POPUP_COLORS.background} !important`,
    backdropFilter: "blur(10px)",
    transition: "all 0.2s ease-in-out",
    "& fieldset": {
      borderColor: POPUP_COLORS.textPrimary,
    },
    "&:hover fieldset": {
      borderColor: POPUP_COLORS.textPrimary,
    },
    "&:hover": {
      backgroundColor: `${POPUP_COLORS.background} !important`,
    },
    "&.Mui-focused": {
      backgroundColor: `${POPUP_COLORS.background} !important`,
      "& fieldset": {
        borderColor: POPUP_COLORS.textPrimary,
      },
    },
  },
  "& .MuiInputBase-input": {
    backgroundColor: `${POPUP_COLORS.background} !important`,
    color: theme.palette.text.primary,
  },
  "& .MuiInputLabel-root": {
    color: POPUP_COLORS.textPrimary,
    fontWeight: 500,
  },
  "& .MuiInputBase-input::placeholder": {
    color: POPUP_COLORS.textPrimary,
    opacity: 0.7,
  },
});

// Common OTP input styles
export const getOTPInputStyles = () => ({
  width: { xs: 60, sm: 70, md: 75 },
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    backgroundColor: `${POPUP_COLORS.white} !important`,
    "& fieldset": {
      borderColor: POPUP_COLORS.textPrimary,
      borderWidth: "1px",
    },
    "&:hover fieldset": {
      borderColor: POPUP_COLORS.textPrimary,
    },
    "&.Mui-focused fieldset": {
      borderColor: POPUP_COLORS.textPrimary,
    },
  },
  "& .MuiInputBase-input": {
    color: `${POPUP_COLORS.textPrimary} !important`,
    fontWeight: 600,
    fontSize: { xs: "0.9rem", sm: "1rem" },
    textAlign: "center",
    "&::placeholder": {
      color: `${POPUP_COLORS.textPrimary} !important`,
      opacity: 0.7,
    },
  },
  // Mobile-specific overrides
  "@media (max-width: 600px)": {
    "& .MuiInputBase-input": {
      color: `${POPUP_COLORS.textPrimary} !important`,
      fontSize: "0.9rem !important",
    },
  },
  "& .MuiInputBase-input::placeholder": {
    color: `${POPUP_COLORS.textPrimary} !important`,
    opacity: 0.7,
  },
});

// Common primary button styles (for Login/Sign up)
export const getPrimaryButtonStyles = (theme: Theme) => ({
  fontFamily: theme.typography.fontFamily,
  fontWeight: 500,
  fontSize: "1rem",
  py: 1.5,
  px: 3,
  borderRadius: 2,
  textTransform: "none" as const,
  border: "none",
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 50%, ${theme.palette.primary.main} 100%) !important`,
  color: `${POPUP_COLORS.white} !important`,
  transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
  "&:hover": {
    transform: "translateY(-2px) scale(1.015)",
    backgroundPosition: "100% 100%",
    boxShadow: `0 6px 20px rgba(0, 0, 0, 0.08), 0 3px 12px ${theme.palette.primary.main}35, inset 0 1px 0 rgba(255, 255, 255, 0.25)`,
  },
  "&:focus": {
    outline: "none",
    boxShadow: `0 2px 8px rgba(0, 0, 0, 0.06), 0 1px 4px ${theme.palette.primary.main}25, 0 0 0 2px ${theme.palette.primary.main}25`,
  },
  "&:active": {
    transform: "translateY(-1px) scale(1.005)",
    transition: "all 0.15s ease-out",
    boxShadow: `0 3px 10px rgba(0, 0, 0, 0.12), 0 2px 6px ${theme.palette.primary.main}40, inset 0 1px 2px rgba(0, 0, 0, 0.05)`,
  },
});

// Common secondary button styles (for Continue button)
export const getSecondaryButtonStyles = () => ({
  fontFamily: "inherit",
  fontWeight: 500,
  fontSize: "1rem",
  py: 1.5,
  px: 3,
  borderRadius: 2,
  textTransform: "none" as const,
  border: "none",
  background: POPUP_COLORS.textPrimary,
  color: POPUP_COLORS.white,
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    backgroundColor: "#0d3d6b",
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(17, 82, 147, 0.3)",
  },
  "&:disabled": {
    backgroundColor: POPUP_COLORS.disabled,
    color: POPUP_COLORS.disabledText,
    transform: "none",
    boxShadow: "none",
  },
});

// Common resend button styles
export const getResendButtonStyles = () => ({
  color: POPUP_COLORS.textPrimary,
  textTransform: "none" as const,
  fontSize: "0.85rem",
  "&:hover": {
    backgroundColor: "rgba(17, 82, 147, 0.1)",
  },
});

// Common edit button styles
export const getEditButtonStyles = () => ({
  color: POPUP_COLORS.textPrimary,
  p: 0.5,
  "&:hover": {
    backgroundColor: "rgba(17, 82, 147, 0.1)",
  },
});

// Common text styles
export const getTextStyles = () => ({
  color: POPUP_COLORS.textPrimary,
  fontSize: "0.85rem",
});

// Common country select styles with blue dropdown arrow
export const getCountrySelectStyles = (theme: Theme) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    backgroundColor: `${POPUP_COLORS.background} !important`,
    backdropFilter: "blur(10px)",
    transition: "all 0.2s ease-in-out",
    "& fieldset": {
      borderColor: theme.palette.text.primary,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.text.primary,
    },
    "&:hover": {
      backgroundColor: `${POPUP_COLORS.background} !important`,
    },
    "&.Mui-focused": {
      backgroundColor: `${POPUP_COLORS.background} !important`,
      "& fieldset": {
        borderColor: theme.palette.text.primary,
      },
    },
  },
  "& .MuiSelect-select": {
    backgroundColor: `${POPUP_COLORS.background} !important`,
    color: theme.palette.text.primary,
  },
  "& .MuiSvgIcon-root": {
    color: "#1976D2 !important", // Blue dropdown arrow matching Figma sign up button
  },
});
