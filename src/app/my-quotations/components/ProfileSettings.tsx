/**
 * @fileoverview Profile Settings Component - Matches Figma Design
 */

"use client";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  CardContent,
  Fade,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { IconUser } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import MainCard from "ui-component/cards/MainCard";
import useConfig from "hooks/useConfig";
import { FONT_FAMILIES, FONT_WEIGHTS } from "views/pages/landing/utils/styleUtils";
import { gridSpacing } from "store/constant";
import { useUser } from "@clerk/nextjs";
import { useClerkMetadata } from "../../../hooks/useClerkMetadata";
import { useUser as useUserContext } from "contexts/UserContext";

const THEME_COLORS = {
  primary: "#115293",
  secondary: "#115293",
  white: "#ffffff",
  lightBlue: "#E0F2F7",
  lightGray: "#F5F5F5",
  borderGray: "#E0E0E0",
  textPrimary: "#115293",
  textSecondary: "#666666",
  formBackground: "#E0F2F7",
  cardBackground: "#E0F2F7",
};

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  country: string;
}
interface UserMetadata {
  firstName?: string;
  lastName?: string;
  contactNumber?: string;
  phoneNumber?: string;
  country?: string;
  completedProfile?: boolean;
  profileCompletedAt?: string;
}

export default function ProfileSettings() {
  const theme = useTheme();
  const config = useConfig();
  const { user: clerkUser, isSignedIn } = useUser();
  const { getUserMetadata, saveProfileToClerk } = useClerkMetadata();
  
  // Initialize with empty data - will be populated from Clerk metadata
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    country: "",
  });
  const [originalData, setOriginalData] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    country: "",
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isAnyFieldFocused, setIsAnyFieldFocused] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const { login: updateUserContext } = useUserContext();

  // FIXED useEffect with proper typing
  useEffect(() => {
    if (isSignedIn && clerkUser) {
      console.log("🔍 Loading user data from Clerk");
      console.log("📋 Clerk User Object:", clerkUser);
      console.log("📋 Clerk unsafeMetadata:", clerkUser.unsafeMetadata);
      
      // Get email from Clerk
      const clerkEmail = clerkUser.emailAddresses?.[0]?.emailAddress || "";
      
      // Access unsafeMetadata directly from clerkUser and cast it properly
      const metadata = (clerkUser.unsafeMetadata || {}) as UserMetadata;
      
      console.log("📋 Metadata being used:", metadata);
      
      // Build profile data from metadata and Clerk user data with proper type checking
      const updatedProfileData: ProfileData = {
        firstName: metadata.firstName || clerkUser.firstName || "",
        lastName: metadata.lastName || clerkUser.lastName || "",
        email: clerkEmail,
        // IMPORTANT: Check for contactNumber in unsafeMetadata with proper typing
        contactNumber: metadata.contactNumber || 
                      metadata.phoneNumber || 
                      clerkUser.phoneNumbers?.[0]?.phoneNumber || 
                      "",
        country: metadata.country || "",
      };
     
      console.log("✅ Profile data loaded:", updatedProfileData);
      setProfileData(updatedProfileData);
      setOriginalData(updatedProfileData);
    }
  }, [isSignedIn, clerkUser]);

  // Check if form has changes and update button visibility
  useEffect(() => {
    const isChanged = JSON.stringify(profileData) !== JSON.stringify(originalData);
    setHasChanges(isChanged);
    setShowButtons(isChanged || isAnyFieldFocused);
  }, [profileData, originalData, isAnyFieldFocused]);

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    // Prevent changes to disabled fields
    if (field === 'email' || field === 'country') {
      return;
    }
    
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFieldFocus = () => {
    setIsAnyFieldFocused(true);
  };

  const handleFieldBlur = () => {
    // Small delay to check if another field gets focus
    setTimeout(() => {
      const activeElement = document.activeElement;
      const isInputFocused = activeElement && (
        activeElement.tagName === 'INPUT' || 
        activeElement.tagName === 'TEXTAREA'
      );
      setIsAnyFieldFocused(!!isInputFocused);
    }, 100);
  };

  const handleSave = async () => {
    setLoading(true);
    setSaveSuccess(false);
    
    try {
      console.log("💾 Saving profile data to Clerk:", profileData);
      
      // Save to Clerk metadata - ensure contactNumber is saved
      const saved = await saveProfileToClerk({
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        country: profileData.country,
        phoneNumber: profileData.contactNumber, // For backward compatibility
      });
  
      if (saved) {
        console.log("✅ Profile data saved successfully to Clerk");
        
        // Reload user to get updated metadata
        await clerkUser?.reload();
        
        // UPDATE LOCAL USER CONTEXT IMMEDIATELY
        updateUserContext({
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          email: profileData.email,
          country: profileData.country,
          contactNumber: profileData.contactNumber,
        });
        
        setOriginalData(profileData);
        setHasChanges(false);
        setSaveSuccess(true);
        setIsAnyFieldFocused(false);
        setShowButtons(false);
        
        // Clear success message after 3 seconds
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        console.error("❌ Failed to save profile data to Clerk");
        setSaveSuccess(false);
      }
    } catch (error) {
      console.error("❌ Error saving profile data:", error);
      setSaveSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setProfileData(originalData);
    setHasChanges(false);
    setIsAnyFieldFocused(false);
    setShowButtons(false);
  };
  return (
    <Box
      sx={{
        width: "100%",
        pt: { xs: 0, md: 1 },
        pb: { xs: 2, md: 3 },
        px: { xs: 1, md: 3 },
        display: "flex",
        justifyContent: "center", // Center the card
      }}
    >
      <MainCard
        sx={{
          height: "auto", // Changed from "100%" to "auto" for shorter card
          display: "flex",
          flexDirection: "column",
          border: "none",
          justifyContent: "left",
          alignItems: "left",
          outline: "none",
          backgroundColor: `${theme.palette.text.primary}15 !important`,
          boxShadow: theme.shadows[4],
          transition: theme.transitions.create(
            ["transform", "box-shadow"],
            {
              duration: theme.transitions.duration.standard,
            }
          ),
          "&:hover": {
            transform: { xs: "none", md: "translateY(-4px)" },
            boxShadow: { xs: theme.shadows[4], md: theme.shadows[8] },
            backgroundColor: `${theme.palette.text.primary}20 !important`,
          },
          maxWidth: { xs: "100%", md: "600px" },
          width: "100%",
          margin: "0",
          marginRight: { xs: "0", md: "1px" } // Move slightly to the right on desktop only
        }}
        content={false}
      >
        <CardContent
          sx={{
            p: { xs: 1, sm: 1.5, md: 2 }, // Reduced padding
            display: "flex",
            flexDirection: "column",
            height: "100%",
            "&:last-child": {
              paddingBottom: { xs: 1.5, sm: 2, md: 2 }, // Reduced padding
            },
          }}
        >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2, // Reduced from 4
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor: THEME_COLORS.primary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mr: 2,
            }}
          >
            <IconUser
              size={20}
              color={THEME_COLORS.white}
            />
          </Box>
          <Typography
            variant="h5"
            component="h3"
            sx={{
              fontWeight: FONT_WEIGHTS.BOLD,
              fontFamily: config.fontFamily,
              fontSize: { md: "1.5rem", xs: "1.25rem" },
              color: theme.palette.text.primary,
              transition: theme.transitions.create("color"),
              marginTop: theme.spacing(0.5),
              textAlign: "center",
              mb: { xs: 1, sm: 1.5, md: 2 },
            }}
          >
            My Profile
          </Typography>
        </Box>

        {/* Form Fields */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
            },
            gap: { xs: 2, sm: 3 }, // Increased gap for more space between fields
            width: "100%",
            maxWidth: { xs: "100%", sm: "600px" }, // Full width on mobile
            mx: "auto",
          }}
        >
          {/* First Name */}
          <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
            <TextField
              fullWidth
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                  First Name
                  <Box component="span" sx={{ color: 'inherit', fontSize: 'inherit', mr: 1 }}>*</Box>
                </Box>
              }
              value={profileData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              onFocus={handleFieldFocus}
              onBlur={handleFieldBlur}
              variant="outlined"
              sx={{
                mb: { xs: 0.5, sm: 1, md: 1 }, // Reduced margin bottom
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "transparent !important",
                  "& fieldset": {
                    borderColor: theme.palette.text.primary,
                  },
                  "&:hover fieldset": {
                    borderColor: theme.palette.text.primary,
                  },
                  "&:hover": {
                    backgroundColor: "transparent !important",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "transparent !important",
                  },
                },
                "& .MuiInputBase-root": {
                  backgroundColor: "transparent !important",
                  minHeight: "44px", // Decreased from "56px"
                  "& .MuiInputBase-input": {
                    paddingTop: "12px", // Decreased from "16.5px"
                    paddingBottom: "12px", // Decreased from "16.5px"
                    paddingLeft: "14px",
                    paddingRight: "14px",
                  },
                },
                "& .MuiInputBase-input": {
                  backgroundColor: "transparent !important",
                  color: theme.palette.text.primary,
                  fontFamily: config.fontFamily,
                  fontWeight: FONT_WEIGHTS.REGULAR,
                  fontSize: "1rem",
                  padding: "12px 14px", // Decreased from "16.5px 14px"
                  lineHeight: 1.5,
                  minHeight: "1.5em",
                  "&::placeholder": {
                    color: theme.palette.text.primary,
                    opacity: 0.7,
                  },
                  "&:-webkit-autofill": {
                    WebkitBoxShadow: `0 0 0 1000px transparent inset !important`,
                    WebkitTextFillColor: `${theme.palette.text.primary} !important`,
                    transition: "background-color 5000s ease-in-out 0s",
                  },
                  "&:-webkit-autofill:hover": {
                    WebkitBoxShadow: `0 0 0 1000px transparent inset !important`,
                  },
                  "&:-webkit-autofill:focus": {
                    WebkitBoxShadow: `0 0 0 1000px transparent inset !important`,
                  },
                },
                "& .MuiInputLabel-root": {
                  color: theme.palette.primary.main,
                  fontFamily: config.fontFamily,
                  fontWeight: FONT_WEIGHTS.REGULAR,
                  fontSize: "1rem",
                  transform: "translate(14px, 12px) scale(1)", // Adjusted from "16px" to "12px"
                  "&.Mui-focused": {
                    color: theme.palette.primary.main,
                    transform: "translate(14px, -9px) scale(0.75)",
                  },
                  "&.MuiFormLabel-filled": {
                    color: theme.palette.primary.main,
                    transform: "translate(14px, -9px) scale(0.75)",
                  },
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.text.primary,
                },
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.text.primary,
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.text.primary,
                },
              }}
            />
          </Box>

          {/* Last Name */}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <TextField
              fullWidth
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                  Last Name
                  <Box component="span" sx={{ color: 'inherit', fontSize: 'inherit', mr: 1 }}>*</Box>
                </Box>
              }
              value={profileData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              onFocus={handleFieldFocus}
              onBlur={handleFieldBlur}
              variant="outlined"
              sx={{
                mb: { xs: 0.5, sm: 1, md: 1 }, // Reduced margin bottom
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "transparent !important",
                  "& fieldset": {
                    borderColor: theme.palette.text.primary,
                  },
                  "&:hover fieldset": {
                    borderColor: theme.palette.text.primary,
                  },
                  "&:hover": {
                    backgroundColor: "transparent !important",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "transparent !important",
                  },
                },
                "& .MuiInputBase-root": {
                  backgroundColor: "transparent !important",
                  minHeight: "44px", // Decreased from "56px"
                  "& .MuiInputBase-input": {
                    paddingTop: "12px", // Decreased from "16.5px"
                    paddingBottom: "12px", // Decreased from "16.5px"
                    paddingLeft: "14px",
                    paddingRight: "14px",
                  },
                },
                "& .MuiInputBase-input": {
                  backgroundColor: "transparent !important",
                  color: theme.palette.text.primary,
                  fontFamily: config.fontFamily,
                  fontWeight: FONT_WEIGHTS.REGULAR,
                  fontSize: "1rem",
                  padding: "12px 14px", // Decreased from "16.5px 14px"
                  lineHeight: 1.5,
                  minHeight: "1.5em",
                  "&::placeholder": {
                    color: theme.palette.text.primary,
                    opacity: 0.7,
                  },
                  "&:-webkit-autofill": {
                    WebkitBoxShadow: `0 0 0 1000px transparent inset !important`,
                    WebkitTextFillColor: `${theme.palette.text.primary} !important`,
                    transition: "background-color 5000s ease-in-out 0s",
                  },
                  "&:-webkit-autofill:hover": {
                    WebkitBoxShadow: `0 0 0 1000px transparent inset !important`,
                  },
                  "&:-webkit-autofill:focus": {
                    WebkitBoxShadow: `0 0 0 1000px transparent inset !important`,
                  },
                },
                "& .MuiInputLabel-root": {
                  color: theme.palette.primary.main,
                  fontFamily: config.fontFamily,
                  fontWeight: FONT_WEIGHTS.REGULAR,
                  fontSize: "1rem",
                  transform: "translate(14px, 12px) scale(1)", // Adjusted from "16px" to "12px"
                  "&.Mui-focused": {
                    color: theme.palette.primary.main,
                    transform: "translate(14px, -9px) scale(0.75)",
                  },
                  "&.MuiFormLabel-filled": {
                    color: theme.palette.primary.main,
                    transform: "translate(14px, -9px) scale(0.75)",
                  },
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.text.primary,
                },
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.text.primary,
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.text.primary,
                },
              }}
            />
          </Box>

          {/* Email */}
          <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
            <TextField
              fullWidth
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                  Email
                  <Box component="span" sx={{ color: 'inherit', fontSize: 'inherit', mr: 1 }}>*</Box>
                </Box>
              }
              type="email"
              value={profileData.email}
              disabled
              variant="outlined"
              sx={{
                mb: { xs: 0.5, sm: 1, md: 1 }, // Reduced margin bottom
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(17, 82, 147, 0.08) !important",
                  "& fieldset": {
                    borderColor: "rgba(17, 82, 147, 0.3)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(17, 82, 147, 0.3)",
                  },
                  "&.Mui-disabled": {
                    backgroundColor: "rgba(17, 82, 147, 0.08) !important",
                    "& fieldset": {
                      borderColor: "rgba(17, 82, 147, 0.3)",
                    },
                  },
                },
                "& .MuiInputBase-input.Mui-disabled": {
                  color: "rgba(17, 82, 147, 0.7)",
                  WebkitTextFillColor: "rgba(17, 82, 147, 0.7)",
                },
                "& .MuiInputBase-root": {
                  backgroundColor: "transparent !important",
                  minHeight: "44px", // Decreased from "56px"
                  "& .MuiInputBase-input": {
                    paddingTop: "12px", // Decreased from "16.5px"
                    paddingBottom: "12px", // Decreased from "16.5px"
                    paddingLeft: "14px",
                    paddingRight: "14px",
                  },
                },
                "& .MuiInputBase-input": {
                  backgroundColor: "transparent !important",
                  color: theme.palette.text.primary,
                  fontFamily: config.fontFamily,
                  fontWeight: FONT_WEIGHTS.REGULAR,
                  fontSize: "1rem",
                  padding: "12px 14px", // Decreased from "16.5px 14px"
                  lineHeight: 1.5,
                  minHeight: "1.5em",
                  "&::placeholder": {
                    color: theme.palette.text.primary,
                    opacity: 0.7,
                  },
                  "&:-webkit-autofill": {
                    WebkitBoxShadow: `0 0 0 1000px transparent inset !important`,
                    WebkitTextFillColor: `${theme.palette.text.primary} !important`,
                    transition: "background-color 5000s ease-in-out 0s",
                  },
                  "&:-webkit-autofill:hover": {
                    WebkitBoxShadow: `0 0 0 1000px transparent inset !important`,
                  },
                  "&:-webkit-autofill:focus": {
                    WebkitBoxShadow: `0 0 0 1000px transparent inset !important`,
                  },
                },
                "& .MuiInputLabel-root": {
                  color: theme.palette.primary.main,
                  fontFamily: config.fontFamily,
                  fontWeight: FONT_WEIGHTS.REGULAR,
                  fontSize: "1rem",
                  transform: "translate(14px, 12px) scale(1)", // Adjusted from "16px" to "12px"
                  "&.Mui-focused": {
                    color: theme.palette.primary.main,
                    transform: "translate(14px, -9px) scale(0.75)",
                  },
                  "&.MuiFormLabel-filled": {
                    color: theme.palette.primary.main,
                    transform: "translate(14px, -9px) scale(0.75)",
                  },
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.text.primary,
                },
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.text.primary,
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.text.primary,
                },
              }}
            />
          </Box>

          {/* Contact Number */}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <TextField
              fullWidth
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                  Contact Number
                  <Box component="span" sx={{ color: 'inherit', fontSize: 'inherit', mr: 1 }}>*</Box>
                </Box>
              }
              value={profileData.contactNumber}
              onChange={(e) => handleInputChange("contactNumber", e.target.value)}
              onFocus={handleFieldFocus}
              onBlur={handleFieldBlur}
              variant="outlined"
              sx={{
                mb: { xs: 0.5, sm: 1, md: 1 }, // Reduced margin bottom
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "transparent !important",
                  "& fieldset": {
                    borderColor: theme.palette.text.primary,
                  },
                  "&:hover fieldset": {
                    borderColor: theme.palette.text.primary,
                  },
                  "&:hover": {
                    backgroundColor: "transparent !important",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "transparent !important",
                  },
                },
                "& .MuiInputBase-root": {
                  backgroundColor: "transparent !important",
                  minHeight: "44px", // Decreased from "56px"
                  "& .MuiInputBase-input": {
                    paddingTop: "12px", // Decreased from "16.5px"
                    paddingBottom: "12px", // Decreased from "16.5px"
                    paddingLeft: "14px",
                    paddingRight: "14px",
                  },
                },
                "& .MuiInputBase-input": {
                  backgroundColor: "transparent !important",
                  color: theme.palette.text.primary,
                  fontFamily: config.fontFamily,
                  fontWeight: FONT_WEIGHTS.REGULAR,
                  fontSize: "1rem",
                  padding: "12px 14px", // Decreased from "16.5px 14px"
                  lineHeight: 1.5,
                  minHeight: "1.5em",
                  "&::placeholder": {
                    color: theme.palette.text.primary,
                    opacity: 0.7,
                  },
                  "&:-webkit-autofill": {
                    WebkitBoxShadow: `0 0 0 1000px transparent inset !important`,
                    WebkitTextFillColor: `${theme.palette.text.primary} !important`,
                    transition: "background-color 5000s ease-in-out 0s",
                  },
                  "&:-webkit-autofill:hover": {
                    WebkitBoxShadow: `0 0 0 1000px transparent inset !important`,
                  },
                  "&:-webkit-autofill:focus": {
                    WebkitBoxShadow: `0 0 0 1000px transparent inset !important`,
                  },
                },
                "& .MuiInputLabel-root": {
                  color: theme.palette.primary.main,
                  fontFamily: config.fontFamily,
                  fontWeight: FONT_WEIGHTS.REGULAR,
                  fontSize: "1rem",
                  transform: "translate(14px, 12px) scale(1)", // Adjusted from "16px" to "12px"
                  "&.Mui-focused": {
                    color: theme.palette.primary.main,
                    transform: "translate(14px, -9px) scale(0.75)",
                  },
                  "&.MuiFormLabel-filled": {
                    color: theme.palette.primary.main,
                    transform: "translate(14px, -9px) scale(0.75)",
                  },
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.text.primary,
                },
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.text.primary,
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.text.primary,
                },
              }}
            />
          </Box>

          {/* Country */}
          <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
            <TextField
              fullWidth
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                  Country
                  <Box component="span" sx={{ color: 'inherit', fontSize: 'inherit', mr: 1 }}>*</Box>
                </Box>
              }
              value={profileData.country}
              disabled
              variant="outlined"
              sx={{
                mb: { xs: 0.5, sm: 1, md: 1 }, // Reduced margin bottom
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(17, 82, 147, 0.08) !important",
                  "& fieldset": {
                    borderColor: "rgba(17, 82, 147, 0.3)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(17, 82, 147, 0.3)",
                  },
                  "&.Mui-disabled": {
                    backgroundColor: "rgba(17, 82, 147, 0.08) !important",
                    "& fieldset": {
                      borderColor: "rgba(17, 82, 147, 0.3)",
                    },
                  },
                },
                "& .MuiInputBase-input.Mui-disabled": {
                  color: "rgba(17, 82, 147, 0.7)",
                  WebkitTextFillColor: "rgba(17, 82, 147, 0.7)",
                },
                "& .MuiInputBase-root": {
                  backgroundColor: "transparent !important",
                  minHeight: "44px", // Decreased from "56px"
                  "& .MuiInputBase-input": {
                    paddingTop: "12px", // Decreased from "16.5px"
                    paddingBottom: "12px", // Decreased from "16.5px"
                    paddingLeft: "14px",
                    paddingRight: "14px",
                  },
                },
                "& .MuiInputBase-input": {
                  backgroundColor: "transparent !important",
                  color: theme.palette.text.primary,
                  fontFamily: config.fontFamily,
                  fontWeight: FONT_WEIGHTS.REGULAR,
                  fontSize: "1rem",
                  padding: "12px 14px", // Decreased from "16.5px 14px"
                  lineHeight: 1.5,
                  minHeight: "1.5em",
                  "&::placeholder": {
                    color: theme.palette.text.primary,
                    opacity: 0.7,
                  },
                  "&:-webkit-autofill": {
                    WebkitBoxShadow: `0 0 0 1000px transparent inset !important`,
                    WebkitTextFillColor: `${theme.palette.text.primary} !important`,
                    transition: "background-color 5000s ease-in-out 0s",
                  },
                  "&:-webkit-autofill:hover": {
                    WebkitBoxShadow: `0 0 0 1000px transparent inset !important`,
                  },
                  "&:-webkit-autofill:focus": {
                    WebkitBoxShadow: `0 0 0 1000px transparent inset !important`,
                  },
                },
                "& .MuiInputLabel-root": {
                  color: theme.palette.primary.main,
                  fontFamily: config.fontFamily,
                  fontWeight: FONT_WEIGHTS.REGULAR,
                  fontSize: "1rem",
                  transform: "translate(14px, 12px) scale(1)", // Adjusted from "16px" to "12px"
                  "&.Mui-focused": {
                    color: theme.palette.primary.main,
                    transform: "translate(14px, -9px) scale(0.75)",
                  },
                  "&.MuiFormLabel-filled": {
                    color: theme.palette.primary.main,
                    transform: "translate(14px, -9px) scale(0.75)",
                  },
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.text.primary,
                },
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.text.primary,
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.text.primary,
                },
              }}
            />
          </Box>
        </Box>

        {/* Action Buttons - Only show when fields are focused or there are changes */}
        {showButtons && (
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: { xs: "stretch", sm: "flex-end" },
            gap: { xs: 2, sm: 3 },
            mt: 2,
          }}
        >
          <Button
            variant="outlined"
            onClick={handleCancel}
            disabled={!hasChanges}
            sx={{
              borderColor: THEME_COLORS.primary,
              color: THEME_COLORS.primary,
              backgroundColor:"transparent",
              borderRadius: 2,
              px: { xs: 3, sm: 6 },
              py: 1.5,
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 500,
              minWidth: { xs: "auto", sm: "120px" },
              width: { xs: "100%", sm: "auto" },
              "&:hover": {
                borderColor: THEME_COLORS.primary,
                backgroundColor: "rgba(17, 82, 147, 0.04)",
              },
              "&:disabled": {
                borderColor: THEME_COLORS.primary,
                color: THEME_COLORS.primary,
                backgroundColor: "transparent",
                opacity: 0.5,
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={!hasChanges || loading}
            sx={{
              backgroundColor: hasChanges ? THEME_COLORS.primary : THEME_COLORS.lightGray,
              color: hasChanges ? THEME_COLORS.white : THEME_COLORS.textSecondary,
              borderRadius: 2,
              px: { xs: 3, sm: 6 },
              py: 1.5,
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 500,
              minWidth: { xs: "auto", sm: "120px" },
              width: { xs: "100%", sm: "auto" },
              "&:hover": {
                backgroundColor: hasChanges ? THEME_COLORS.primary : THEME_COLORS.lightGray,
                opacity: hasChanges ? 0.9 : 1,
              },
              "&:disabled": {
                backgroundColor: THEME_COLORS.primary,
                color: THEME_COLORS.white,
                opacity: 0.5,
              },
            }}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </Box>
        )}
        
        </CardContent>
      </MainCard>

      {/* Toast Message - Profile Update Success - Outside MainCard */}
      <Fade in={saveSuccess} timeout={300}>
        <Box
          sx={{
            position: "fixed",
            bottom: "100px", // Position from bottom instead of top
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10000, // Very high z-index
            display: "flex",
            alignItems: "center",
            gap: 2.5,
            background: "linear-gradient(105.34deg, #115293 0%, #1976D2 50%, #115293 100%)",
            color: "white",
            px: 3,
            py: 1.5,
            borderRadius: 2,
            minWidth: 300,
            maxWidth: 400,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
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
          {/* Checkmark icon */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ display: "block" }}
            >
              <path
                d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
                fill="white"
              />
            </svg>
          </Box>
             
          <Typography
            variant="body2"
            sx={{
              color: "white",
              fontWeight: 600,
              fontSize: "1rem",
            }}
          >
            Profile updated successfully
          </Typography>
        </Box>
      </Fade>
    </Box>
  );
}