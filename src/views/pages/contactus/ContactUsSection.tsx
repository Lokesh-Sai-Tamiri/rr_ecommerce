/**
 * @fileoverview Contact Us section component with hero section and contact form
 */

"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  CardContent,
  Grid,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FormattedMessage } from "react-intl";
import useConfig from "hooks/useConfig";

// Project imports
import MainCard from "ui-component/cards/MainCard";

// Import centralized utilities from landing/utils
import { useScreenDetection } from "../landing/utils/screenUtils";
import {
  getTitleStyles,
  getButtonStyles,
  FONT_FAMILIES,
  FONT_WEIGHTS,
  LINE_HEIGHTS,
} from "../landing/utils/styleUtils";
import { gridSpacing } from "store/constant";
import config from "config";
import {
  getServiceContainerStyles,
  getFloatingParticlesStyles,
} from "app/services/[slug]/shared/service-styles";
import FindUsSection from "../findus/FindUsSection";
import { LocationIntro } from "../findus/components/locations";
import { getPortalApiUrl, API_ENDPOINTS } from "../../../utils/apiConfig";

/**
 * Contact Us section component using centralized utilities for consistent styling
 */
export default function ContactUsSection() {
  const theme = useTheme();
  const screen = useScreenDetection();
  const { i18n } = useConfig();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    phone: "",
    service: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    companyName: "",
    phone: "",
    service: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Global styles to override any white backgrounds and add asterisk spacing
  React.useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .MuiOutlinedInput-root {
        background-color: rgba(25, 118, 210, 0.1) !important;
      }
      .MuiOutlinedInput-root:hover {
        background-color: rgba(25, 118, 210, 0.1) !important;
      }
      .MuiOutlinedInput-root.Mui-focused {
        background-color: rgba(25, 118, 210, 0.1) !important;
      }
      .MuiInputBase-input {
        background-color: rgba(25, 118, 210, 0.1) !important;
      }
      .MuiFormLabel-asterisk {
        margin-left: 4px !important;
      }
      /* Fix for Full Name label visibility */
      .full-name-field .MuiInputLabel-root {
        transform: translate(14px, 16px) scale(1) !important;
        top: 0 !important;
        position: absolute !important;
        z-index: 1 !important;
      }
      .full-name-field .MuiInputLabel-root.Mui-focused {
        transform: translate(14px, -9px) scale(0.75) !important;
      }
      .full-name-field .MuiInputLabel-root.MuiFormLabel-filled {
        transform: translate(14px, -9px) scale(0.75) !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  // AboutCard content styles - exact same as AboutCard
  const contentStyles = {
    color: theme.palette.text.primary,
    textAlign: { xs: "center", sm: "justify" } as const,
    flex: 1,
    fontFamily: config.fontFamily,
    fontWeight: FONT_WEIGHTS.REGULAR,
    lineHeight: LINE_HEIGHTS.RELAXED,
    fontSize: screen.isDesktop
      ? "1rem"
      : screen.isTablet
        ? "0.95rem"
        : "0.9rem",
    mb: 2,
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Add Korean input handling
  const handleKoreanInput = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Allow Korean input by ensuring the input method is set to Korean
    const input = e.target as HTMLInputElement | HTMLTextAreaElement;
    if (input.tagName === "INPUT" || input.tagName === "TEXTAREA") {
      input.setAttribute("lang", "ko");
      input.setAttribute("inputmode", "text");
    }
  };

  const validateForm = () => {
    const newErrors = {
      fullName: "",
      email: "",
      companyName: "",
      phone: "",
      service: "",
      message: "",
    };

    // Validate Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = "contact.form.validation.full-name-required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "contact.form.validation.full-name-min";
    }

    // Validate Email
    if (!formData.email.trim()) {
      newErrors.email = "contact.form.validation.email-required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "contact.form.validation.email-invalid";
    }

    // Validate Company Name
    if (!formData.companyName.trim()) {
      newErrors.companyName = "contact.form.validation.company-required";
    }

    // Validate Phone
    if (!formData.phone.trim()) {
      newErrors.phone = "contact.form.validation.phone-required";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "contact.form.validation.phone-invalid";
    }

    // Validate Service
    if (!formData.service.trim()) {
      newErrors.service = "contact.form.validation.service-required";
    }

    // Validate Message
    if (!formData.message.trim()) {
      newErrors.message = "contact.form.validation.message-required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "contact.form.validation.message-min";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        const response = await fetch(getPortalApiUrl(API_ENDPOINTS.contact), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (result.success) {
          // Success message
          alert(
            "Thank you for your message! We will get back to you soon. A confirmation email has been sent to your email address."
          );

          // Reset form
          setFormData({
            fullName: "",
            email: "",
            companyName: "",
            phone: "",
            service: "",
            message: "",
          });
          setErrors({
            fullName: "",
            email: "",
            companyName: "",
            phone: "",
            service: "",
            message: "",
          });
        } else {
          alert(result.message || "Failed to send message. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert(
          "An error occurred while sending your message. Please try again later."
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  const containerStyles = getServiceContainerStyles(theme);

  return (
    <Box
      sx={{
        flex: 1,
        minHeight: "inherit",
        backgroundImage: `url('/assets/images/home-bg.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        // Use centralized screen detection for background attachment
        backgroundAttachment:
          screen.isMobile || screen.isTablet ? "scroll" : "fixed",
        // Responsive background handling using centralized utilities
        ...(screen.isTablet && {
          minHeight: "calc(100vh - 120px)",
          backgroundAttachment: "scroll", // Force scroll on tablets for better coverage
        }),
        paddingBottom: { xs: 6, sm: 10, md: 8 },
        paddingTop: { xs: 6 }, // Account for fixed header
      }}
    >
      {/* Hero Section with contact-hero.png Background Image - match Careers layout */}
      <Container {...containerStyles}>
        <Box
          sx={{
            height: { xs: 180, md: 250 },
            width: { xs: "89.2%", sm: "85%", md: "80%", lg: "93%" },
            margin: "0 auto",
            backgroundImage: "url(/assets/images/icons/contact-hero.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: { xs: 2, sm: 1, md: 2, lg: 1 },
            pt: { xs: 2, sm: 3, md: 4 },
            borderRadius: 8,
            mb: 3,
            overflow: "hidden",
            animation: "fadeInUp 1s ease-out",
            "@keyframes fadeInUp": {
              "0%": {
                opacity: 0,
                transform: "translateY(30px)",
              },
              "100%": {
                opacity: 1,
                transform: "translateY(0)",
              },
            },
          }}
        >
          {/* Floating Particles Overlay */}
          <Box sx={getFloatingParticlesStyles()} />
        </Box>
      </Container>

      <Container sx={{ textAlign: "center", mb: { xs: 2, sm: 3, md: 4 } }}>
        <LocationIntro />
      </Container>

      <Container
        {...containerStyles}
        sx={{
          px: { xs: 1, sm: 2, md: 4 },
          pb: { xs: 8, sm: 8, md: 10, lg: 12 },
        }}
      >
        {/* Contact Content Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            minHeight: "auto",
          }}
        >
          {/* Contact Form - Centered */}
          <Grid
            sx={{
              width: { xs: "90%", sm: "85%", md: "80%", lg: "93%" },
              margin: "0 auto",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
            container
            spacing={{ xs: 2, sm: 2, md: 3 }}
          >
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
              <Box sx={{ width: { xs: "100%", sm: "100%", md: "100%" } }}>
                <FindUsSection />
              </Box>
            </Grid>
            <Grid
    size={{ xs: 12, sm: 12, md: 6, lg: 6 }}
    sx={{
        // Original definition: applies maxHeight: 750px starting from the 'md' breakpoint (e.g., 900px)
        // This handles most tablets and smaller laptops.
        maxHeight: { xs: "auto", md: 750,lg: 750 },
        
       '@media (min-width: 1024px) and (max-width: 1199px)': {
            maxHeight: 980, 
        },
 
        // Your other margins
        mt: { xs: 1, sm: 2, md: 0 },
        mb: { xs: 0, sm: 8, md: 8, lg: 8 }, 
    }}
>

              <MainCard
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  border: "none",
                  justifyContent: "center",
                  alignItems: "center",
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
                    transform: "translateY(-4px)",
                    boxShadow: theme.shadows[8],
                    backgroundColor: `${theme.palette.text.primary}20 !important`,
                  },
                }}
                content={false}
              >
                <CardContent
                  sx={{
                    p: { xs: 2, sm: 2.5, md: theme.spacing(gridSpacing) }, // Increased padding for mobile
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    "&:last-child": {
                      paddingBottom: { xs: 6, sm: 6, md: 8, lg: 10 }, // Increased bottom padding for all screen sizes
                    },
                  }}
                >
                  <Typography
                    variant={screen.isDesktop ? "h5" : "h6"}
                    component="h3"
                    sx={{
                      fontWeight: FONT_WEIGHTS.BOLD,
                      fontFamily: config.fontFamily,
                      fontSize: screen.isDesktop
                        ? { md: "1.5rem" }
                        : { xs: "1.1rem", sm: "1.2rem" },
                      color: theme.palette.text.primary,
                      transition: theme.transitions.create("color"),
                      marginTop: theme.spacing(1),
                      textAlign: "center",
                      mb: { xs: 2, sm: 2.5, md: 3 },
                    }}
                  >
                    <FormattedMessage
                      id="contact.form.title"
                      defaultMessage="Send us a Message"
                    />
                  </Typography>

                  <Box component="form" onSubmit={handleSubmit} sx={{ 
                    mt: 2,
                    maxHeight: Object.values(errors).some(error => error !== "") ? "70vh" : "auto", // Only limit height when there are errors
                    overflowY: Object.values(errors).some(error => error !== "") ? "auto" : "visible", // Only scroll when there are errors
                    overflowX: "hidden", // Hide horizontal scroll
                    pr: Object.values(errors).some(error => error !== "") ? 1 : 0, // Only add right padding when scrolling
                    "&::-webkit-scrollbar": {
                      width: "0px", // Hide scrollbar
                    },
                    "&::-webkit-scrollbar-track": {
                      display: "none", // Hide track
                    },
                    "&::-webkit-scrollbar-thumb": {
                      display: "none", // Hide thumb
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                      display: "none", // Hide thumb on hover
                    },
                  }}>
                    <TextField
                      fullWidth
                      className="full-name-field"
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                          <FormattedMessage
                            id="contact.form.full-name"
                            defaultMessage="Full Name"
                          />
                          <Box component="span" sx={{ color: 'inherit', fontSize: 'inherit', mr: 1 }}>*</Box>
                        </Box>
                      }
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      onKeyDown={handleKoreanInput}
                      placeholder={
                        i18n === "ko"
                          ? "성명을 입력하세요"
                          : "Enter your full name"
                      }
                      inputProps={{
                        lang: "ko",
                        inputMode: "text",
                        "aria-label": "성명 입력",
                      }}
                       
                      error={!!errors.fullName}
                      helperText={
                        errors.fullName ? (
                          <FormattedMessage
                            id={errors.fullName}
                            defaultMessage={errors.fullName}
                          />
                        ) : (
                          ""
                        )
                      }
                      sx={{
                        mb: { xs: 1, sm: 1.5, md: 2 }, // Reduced gap between fields
                        mt: { xs: 2, sm: 2, md: 2 }, // Added top margin for spacing
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
                          minHeight: "56px", // Ensure minimum height for the input container
                          "& .MuiInputBase-input": {
                            paddingTop: "16.5px",
                            paddingBottom: "16.5px",
                            paddingLeft: "14px",
                            paddingRight: "14px",
                          },
                        },
                        "& .MuiInputBase-input": {
                          backgroundColor: "transparent !important",
                          color: theme.palette.text.primary,
                          fontFamily: config.fontFamily,
                          fontWeight: FONT_WEIGHTS.REGULAR,
                          fontSize: screen.isDesktop
                            ? "1rem"
                            : screen.isTablet
                              ? "0.95rem"
                              : "0.9rem",
                          padding: "16.5px 14px", // Ensure proper padding
                          lineHeight: 1.5, // Add proper line height
                          minHeight: "1.5em", // Ensure minimum height
                          "&::placeholder": {
                            color: theme.palette.text.primary,
                            opacity: 0.7,
                          },
                          // Prevent autofill background
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
                          fontSize: screen.isDesktop
                            ? "1rem"
                            : screen.isTablet
                              ? "0.95rem"
                              : "0.9rem",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.text.primary,
                        },
                        "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: theme.palette.text.primary,
                          },
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: theme.palette.text.primary,
                          },
                      }}
                    />

                    <TextField
                      fullWidth
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                          <FormattedMessage
                            id="contact.form.email"
                            defaultMessage="Email"
                          />
                          <Box component="span" sx={{ color: 'inherit', fontSize: 'inherit', mr: 1 }}>*</Box>
                        </Box>
                      }
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onKeyDown={handleKoreanInput}
                      placeholder={
                        i18n === "ko"
                          ? "이메일을 입력하세요"
                          : "Enter your email"
                      }
                      inputProps={{
                        lang: "ko",
                        inputMode: "email",
                        "aria-label": "이메일 입력",
                      }}
                       
                      error={!!errors.email}
                      helperText={
                        errors.email ? (
                          <FormattedMessage
                            id={errors.email}
                            defaultMessage={errors.email}
                          />
                        ) : (
                          ""
                        )
                      }
                      sx={{
                        mb: { xs: 1, sm: 1.5, md: 2 }, // Reduced gap between fields
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
                          minHeight: "56px", // Ensure minimum height for the input container
                          "& .MuiInputBase-input": {
                            paddingTop: "16.5px",
                            paddingBottom: "16.5px",
                            paddingLeft: "14px",
                            paddingRight: "14px",
                          },
                        },
                        "& .MuiInputBase-input": {
                          backgroundColor: "transparent !important",
                          color: theme.palette.text.primary,
                          fontFamily: config.fontFamily,
                          fontWeight: FONT_WEIGHTS.REGULAR,
                          fontSize: screen.isDesktop
                            ? "1rem"
                            : screen.isTablet
                              ? "0.95rem"
                              : "0.9rem",
                          padding: "16.5px 14px", // Ensure proper padding
                          lineHeight: 1.5, // Add proper line height
                          minHeight: "1.5em", // Ensure minimum height
                          "&::placeholder": {
                            color: theme.palette.text.primary,
                            opacity: 0.7,
                          },
                          // Prevent autofill background
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
                          fontSize: screen.isDesktop
                            ? "1rem"
                            : screen.isTablet
                              ? "0.95rem"
                              : "0.9rem",
                          transform: "translate(14px, 16px) scale(1)", // Ensure proper label positioning
                          "&.Mui-focused": {
                            color: theme.palette.primary.main,
                            transform: "translate(14px, -9px) scale(0.75)", // Proper focused position
                          },
                          "&.MuiFormLabel-filled": {
                            color: theme.palette.primary.main,
                            transform: "translate(14px, -9px) scale(0.75)", // Proper filled position
                          },
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.text.primary,
                        },
                        "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: theme.palette.text.primary,
                          },
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: theme.palette.text.primary,
                          },
                      }}
                    />

                    <TextField
                      fullWidth
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                          <FormattedMessage
                            id="contact.form.company-name"
                            defaultMessage="Company Name"
                          />
                          <Box component="span" sx={{ color: 'inherit', fontSize: 'inherit', mr: 1 }}>*</Box>
                        </Box>
                      }
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      onKeyDown={handleKoreanInput}
                      placeholder={
                        i18n === "ko"
                          ? "회사명을 입력하세요"
                          : "Enter your company name"
                      }
                      inputProps={{
                        lang: "ko",
                        inputMode: "text",
                        "aria-label": "회사명 입력",
                      }}
                       
                      error={!!errors.companyName}
                      helperText={
                        errors.companyName ? (
                          <FormattedMessage
                            id={errors.companyName}
                            defaultMessage={errors.companyName}
                          />
                        ) : (
                          ""
                        )
                      }
                      sx={{
                        mb: { xs: 1, sm: 1.5, md: 2 }, // Reduced gap between fields
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
                          minHeight: "56px", // Ensure minimum height for the input container
                          "& .MuiInputBase-input": {
                            paddingTop: "16.5px",
                            paddingBottom: "16.5px",
                            paddingLeft: "14px",
                            paddingRight: "14px",
                          },
                        },
                        "& .MuiInputBase-input": {
                          backgroundColor: "transparent !important",
                          color: theme.palette.text.primary,
                          fontFamily: config.fontFamily,
                          fontWeight: FONT_WEIGHTS.REGULAR,
                          fontSize: screen.isDesktop
                            ? "1rem"
                            : screen.isTablet
                              ? "0.95rem"
                              : "0.9rem",
                          padding: "16.5px 14px", // Ensure proper padding
                          lineHeight: 1.5, // Add proper line height
                          minHeight: "1.5em", // Ensure minimum height
                          "&::placeholder": {
                            color: theme.palette.text.primary,
                            opacity: 0.7,
                          },
                          // Prevent autofill background
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
                          fontSize: screen.isDesktop
                            ? "1rem"
                            : screen.isTablet
                              ? "0.95rem"
                              : "0.9rem",
                          transform: "translate(14px, 16px) scale(1)", // Ensure proper label positioning
                          "&.Mui-focused": {
                            color: theme.palette.primary.main,
                            transform: "translate(14px, -9px) scale(0.75)", // Proper focused position
                          },
                          "&.MuiFormLabel-filled": {
                            color: theme.palette.primary.main,
                            transform: "translate(14px, -9px) scale(0.75)", // Proper filled position
                          },
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.text.primary,
                        },
                        "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: theme.palette.text.primary,
                          },
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: theme.palette.text.primary,
                          },
                      }}
                    />

                    <TextField
                      fullWidth
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                          <FormattedMessage
                            id="contact.form.phone"
                            defaultMessage="Phone Number"
                          />
                          <Box component="span" sx={{ color: 'inherit', fontSize: 'inherit', mr: 1 }}>*</Box>
                        </Box>
                      }
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onKeyDown={handleKoreanInput}
                      placeholder={
                        i18n === "ko"
                          ? "전화번호를 입력하세요"
                          : "Enter your phone number"
                      }
                      inputProps={{
                        lang: "ko",
                        inputMode: "tel",
                        "aria-label": "전화번호 입력",
                      }}
                      //  
                      error={!!errors.phone}
                      helperText={
                        errors.phone ? (
                          <FormattedMessage
                            id={errors.phone}
                            defaultMessage={errors.phone}
                          />
                        ) : (
                          ""
                        )
                      }
                      sx={{
                        mb: { xs: 1, sm: 1.5, md: 2 }, // Reduced gap between fields
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
                          minHeight: "56px", // Ensure minimum height for the input container
                          "& .MuiInputBase-input": {
                            paddingTop: "16.5px",
                            paddingBottom: "16.5px",
                            paddingLeft: "14px",
                            paddingRight: "14px",
                          },
                        },
                        "& .MuiInputBase-input": {
                          backgroundColor: "transparent !important",
                          color: theme.palette.text.primary,
                          fontFamily: config.fontFamily,
                          fontWeight: FONT_WEIGHTS.REGULAR,
                          fontSize: screen.isDesktop
                            ? "1rem"
                            : screen.isTablet
                              ? "0.95rem"
                              : "0.9rem",
                          padding: "16.5px 14px", // Ensure proper padding
                          lineHeight: 1.5, // Add proper line height
                          minHeight: "1.5em", // Ensure minimum height
                          "&::placeholder": {
                            color: theme.palette.text.primary,
                            opacity: 0.7,
                          },
                          // Prevent autofill background
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
                          fontSize: screen.isDesktop
                            ? "1rem"
                            : screen.isTablet
                              ? "0.95rem"
                              : "0.9rem",
                          transform: "translate(14px, 16px) scale(1)", // Ensure proper label positioning
                          "&.Mui-focused": {
                            color: theme.palette.primary.main,
                            transform: "translate(14px, -9px) scale(0.75)", // Proper focused position
                          },
                          "&.MuiFormLabel-filled": {
                            color: theme.palette.primary.main,
                            transform: "translate(14px, -9px) scale(0.75)", // Proper filled position
                          },
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.text.primary,
                        },
                        "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: theme.palette.text.primary,
                          },
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: theme.palette.text.primary,
                          },
                      }}
                    />

                    <TextField
                      fullWidth
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                          <FormattedMessage
                            id="contact.form.service"
                            defaultMessage="Required Service"
                          />
                          <Box component="span" sx={{ color: 'inherit', fontSize: 'inherit', mr: 1 }}>*</Box>
                        </Box>
                      }
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      onKeyDown={handleKoreanInput}
                      placeholder={
                        i18n === "ko"
                          ? "필요한 서비스를 입력하세요"
                          : "Enter the service you need"
                      }
                      inputProps={{
                        lang: "ko",
                        inputMode: "text",
                        "aria-label": "필요한 서비스 입력",
                      }}
                       
                      error={!!errors.service}
                      helperText={
                        errors.service ? (
                          <FormattedMessage
                            id={errors.service}
                            defaultMessage={errors.service}
                          />
                        ) : (
                          ""
                        )
                      }
                      sx={{
                        mb: { xs: 1, sm: 1.5, md: 2 }, // Reduced gap between fields
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
                          minHeight: "56px", // Ensure minimum height for the input container
                          "& .MuiInputBase-input": {
                            paddingTop: "16.5px",
                            paddingBottom: "16.5px",
                            paddingLeft: "14px",
                            paddingRight: "14px",
                          },
                        },
                        "& .MuiInputBase-input": {
                          backgroundColor: "transparent !important",
                          color: theme.palette.text.primary,
                          fontFamily: config.fontFamily,
                          fontWeight: FONT_WEIGHTS.REGULAR,
                          fontSize: screen.isDesktop
                            ? "1rem"
                            : screen.isTablet
                              ? "0.95rem"
                              : "0.9rem",
                          padding: "16.5px 14px", // Ensure proper padding
                          lineHeight: 1.5, // Add proper line height
                          minHeight: "1.5em", // Ensure minimum height
                          "&::placeholder": {
                            color: theme.palette.text.primary,
                            opacity: 0.7,
                          },
                          // Prevent autofill background
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
                          fontSize: screen.isDesktop
                            ? "1rem"
                            : screen.isTablet
                              ? "0.95rem"
                              : "0.9rem",
                          transform: "translate(14px, 16px) scale(1)", // Ensure proper label positioning
                          "&.Mui-focused": {
                            color: theme.palette.primary.main,
                            transform: "translate(14px, -9px) scale(0.75)", // Proper focused position
                          },
                          "&.MuiFormLabel-filled": {
                            color: theme.palette.primary.main,
                            transform: "translate(14px, -9px) scale(0.75)", // Proper filled position
                          },
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.text.primary,
                        },
                        "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: theme.palette.text.primary,
                          },
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: theme.palette.text.primary,
                          },
                      }}
                    />

                    <TextField
                      fullWidth
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                          <FormattedMessage
                            id="contact.form.message"
                            defaultMessage="Message"
                          />
                          <Box component="span" sx={{ color: 'inherit', fontSize: 'inherit', mr: 1 }}>*</Box>
                        </Box>
                      }
                      name="message"
                      multiline
                      rows={screen.isMobile ? 2 : 3}
                      value={formData.message}
                      onChange={handleInputChange}
                      onKeyDown={handleKoreanInput}
                      placeholder={
                        i18n === "ko"
                          ? "메시지를 입력하세요"
                          : "Enter your message"
                      }
                      inputProps={{
                        lang: "ko",
                        inputMode: "text",
                        "aria-label": "메시지 입력",
                      }}
                       
                      error={!!errors.message}
                      helperText={
                        errors.message ? (
                          <FormattedMessage
                            id={errors.message}
                            defaultMessage={errors.message}
                          />
                        ) : (
                          ""
                        )
                      }
                      sx={{
                        mb: { xs: 1, sm: 1.5, md: 2 }, // Reduced gap between fields
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
                          minHeight: "56px", // Ensure minimum height for the input container
                          "& .MuiInputBase-input": {
                            paddingTop: "16.5px",
                            paddingBottom: "16.5px",
                            paddingLeft: "14px",
                            paddingRight: "14px",
                          },
                        },
                        "& .MuiInputBase-input": {
                          backgroundColor: "transparent !important",
                          color: theme.palette.text.primary,
                          fontFamily: config.fontFamily,
                          fontWeight: FONT_WEIGHTS.REGULAR,
                          fontSize: screen.isDesktop
                            ? "1rem"
                            : screen.isTablet
                              ? "0.95rem"
                              : "0.9rem",
                          padding: "16.5px 14px", // Ensure proper padding
                          lineHeight: 1.5, // Add proper line height
                          minHeight: "1.5em", // Ensure minimum height
                          "&::placeholder": {
                            color: theme.palette.text.primary,
                            opacity: 0.7,
                          },
                          // Prevent autofill background
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
                          fontSize: screen.isDesktop
                            ? "1rem"
                            : screen.isTablet
                              ? "0.95rem"
                              : "0.9rem",
                          transform: "translate(14px, 16px) scale(1)", // Ensure proper label positioning
                          "&.Mui-focused": {
                            color: theme.palette.primary.main,
                            transform: "translate(14px, -9px) scale(0.75)", // Proper focused position
                          },
                          "&.MuiFormLabel-filled": {
                            color: theme.palette.primary.main,
                            transform: "translate(14px, -9px) scale(0.75)", // Proper filled position
                          },
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.text.primary,
                        },
                        "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: theme.palette.text.primary,
                          },
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: theme.palette.text.primary,
                          },
                      }}
                    />

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: { xs: 0.5, sm: 1, md: 1.5 }, // Reduced gap between last field and button
                        mb: { xs: 2, sm: 3, md: 4 }, // Reduced bottom margin
                      }}
                    >
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={isSubmitting}
                        sx={{
                          fontFamily: FONT_FAMILIES.PRIMARY,
                          fontWeight: FONT_WEIGHTS.MEDIUM,
                          fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" },
                          // py: { xs: 1, sm: 1.2, md: 1.5 },
                          mx: "auto",
                          px: { xs: 2.5, sm: 3, md: 4 },
                          borderRadius: 2,
                          textTransform: "none",
                          border: "none",
                          // Use exact same gradient as Get Started Today button
                          background: `linear-gradient(135deg, 
                      ${theme.palette.primary.main} 0%, 
                      ${theme.palette.primary.light} 50%, 
                      ${theme.palette.primary.main} 100%) !important`,
                          color: "#FFFFFF !important",
                          transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
                          "&:hover": {
                            transform: "translateY(-2px) scale(1.015)",
                            backgroundPosition: "100% 100%",
                            boxShadow: `
                        0 6px 20px rgba(0, 0, 0, 0.08),
                        0 3px 12px ${theme.palette.primary.main}35,
                        inset 0 1px 0 rgba(255, 255, 255, 0.25)
                      `,
                          },
                          "&:disabled": {
                            opacity: 0.7,
                            transform: "none",
                          },
                        }}
                      >
                        {isSubmitting ? (
                          <>
                            <CircularProgress
                              size={20}
                              color="inherit"
                              sx={{ mr: 1}}
                            />
                            <FormattedMessage
                              id="contact.form.sending"
                              defaultMessage="Sending..."
                            />
                          </>
                        ) : (
                          <FormattedMessage
                            id="contact.form.send"
                            defaultMessage="Send Message"
                          />
                        )}
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </MainCard>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
