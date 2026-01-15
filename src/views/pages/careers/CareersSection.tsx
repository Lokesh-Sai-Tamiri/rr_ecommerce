/**
 * @fileoverview Careers Section component displaying career development content
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
  CircularProgress,
} from "@mui/material";
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { FormattedMessage } from "react-intl";

// Project imports
import AppBar from "ui-component/extended/AppBar";
import FooterSection from "../landing/FooterSection";
import MainCard from "ui-component/cards/MainCard";

// Import centralized utilities from landing/utils
import { useScreenDetection } from "../landing/utils/screenUtils";
import {
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
import { getPortalApiUrl, API_ENDPOINTS } from "../../../utils/apiConfig";

export default function CareersSection() {
  const theme = useTheme();
  const screen = useScreenDetection();

  // Form state management
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    cvFile: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Global styles to override any white backgrounds
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

  // Validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }

      // Check file type
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (!allowedTypes.includes(file.type)) {
        alert("Please upload only PDF, DOC, or DOCX files");
        return;
      }

      setSelectedFile(file);

      // Clear file error when file is selected
      if (errors.cvFile) {
        setErrors((prev) => ({
          ...prev,
          cvFile: "",
        }));
      }
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    // Reset the input value
    const fileInput = document.getElementById("cv-upload") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const validateForm = () => {
    const newErrors = {
      fullName: "",
      email: "",
      cvFile: "",
    };

    // Validate Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }

    // Validate Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Validate CV File
    if (!selectedFile) {
      newErrors.cvFile = "Please upload your CV/Resume";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        // Create FormData for file upload
        const submitFormData = new FormData();
        submitFormData.append("fullName", formData.fullName);
        submitFormData.append("email", formData.email);

        if (selectedFile) {
          submitFormData.append("cvFile", selectedFile);
        }

        const response = await fetch(getPortalApiUrl(API_ENDPOINTS.careers), {
          method: "POST",
          body: submitFormData, // Send FormData instead of JSON
        });

        const result = await response.json();

        if (result.success) {
          // Success message
          alert(
            "Thank you for your application! We have received your CV and will review it shortly. A confirmation email has been sent to your email address."
          );

          // Reset form
          setFormData({
            fullName: "",
            email: "",
          });
          setErrors({
            fullName: "",
            email: "",
            cvFile: "",
          });
          setSelectedFile(null);

          // Reset file input
          const fileInput = document.getElementById(
            "cv-upload"
          ) as HTMLInputElement;
          if (fileInput) {
            fileInput.value = "";
          }
        } else {
          alert(
            result.message || "Failed to submit application. Please try again."
          );
        }
      } catch (error) {
        console.error("Error submitting application:", error);
        alert(
          "An error occurred while submitting your application. Please try again later."
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Subheading styles for "Do You Have Passion For Performance?"
  const subheadingStyles = {
    color: theme.palette.text.primary,
    textAlign: "center" as const,
    fontFamily: config.fontFamily,
    fontWeight: FONT_WEIGHTS.MEDIUM,
    fontSize: screen.isDesktop ? "1.2rem" : screen.isTablet ? "1.1rem" : "1rem",
    lineHeight: 1.4,
    mb: 3,
    textTransform: "none" as const,
  };
  const containerStyles = getServiceContainerStyles(theme);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Fixed Header */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          backdropFilter: "blur(10px)",
        }}
      >
        <AppBar
          sx={{
            background: "transparent",
            boxShadow: "none",
            position: "static",
          }}
          disableSticky={true}
          FooterComponent={FooterSection}
        />
      </Box>

      {/* Main Content Container */}
      <Box
        sx={{
          flex: 1,
          minHeight: "calc(100vh - 120px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Careers Section with Full Background */}
        <Box
          sx={{
            flex: 1,
            minHeight: "inherit",
            backgroundImage: `url('/assets/images/home-bg.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment:
              screen.isMobile || screen.isTablet ? "scroll" : "fixed",
            ...(screen.isTablet && {
              minHeight: "calc(100vh - 120px)",
              backgroundAttachment: "scroll",
            }),
            paddingBottom: { xs: 8, sm: 10, md: 10 },
          }}
        >
          <Container {...containerStyles}>
            {/* Hero Section with careers.png Background Image */}
            <Box
              sx={{
                height: { xs: 180, md: 250 },
                width: { xs: "89.2%", sm: "85%", md: "80%", lg: "93%" },
                margin: "0 auto",
                backgroundImage: "url(/assets/images/icons/careers-hero.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: { xs: 10, sm: 7, md: 7, lg: 7 },
                pt: { xs: 2, sm: 3, md: 4 },
                borderRadius: 8,
                mb: 3,
                overflow: "hidden",
              }}
            >
              {/* Floating Particles Overlay */}
              <Box sx={getFloatingParticlesStyles()} />
              {/* Overlay with text */}
              {/* <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
              }}
            > */}

              {/* </Box> */}
            </Box>

            {/* Content Section */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 4,
                mt: { xs: 2, md: 6 },
                width: { xs: "90%", sm: "85%", md: "80%", lg: "93%" },
                margin: "0 auto",
              }}
            >
              {/* Main Content - Left Side */}
              <Box sx={{ flex: { xs: 1, md: "0 0 55%" } }}>
                <MainCard
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    border: "none",
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
                      p: theme.spacing(gridSpacing),
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      "&:last-child": {
                        paddingBottom: theme.spacing(gridSpacing),
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
                          : { xs: "1.2rem", sm: "1.3rem" },
                        color: theme.palette.text.primary,
                        transition: theme.transitions.create("color"),
                        marginTop: theme.spacing(1),
                        textAlign: "center",
                        mb: 3,
                      }}
                    >
                      <FormattedMessage
                        id="careers.title"
                        defaultMessage="Careers"
                      />
                    </Typography>
                    <Typography
                      variant="h6"
                      component="h4"
                      sx={subheadingStyles}
                    >
                      <FormattedMessage
                        id="careers.subtitle"
                        defaultMessage="Do You Have Passion For Performance?"
                      />
                    </Typography>

                    <Typography variant="body1" paragraph sx={contentStyles}>
                      <FormattedMessage
                        id="careers.description"
                        defaultMessage="We are on a path to build the customer focused CRO. We are determined to meet our goals and we will have fun along the way. Looking to be part of Radiant Research family? We provide opportunities for personal growth, a collaborative and inclusive work environment and exceptional employee benefits. Be a part of the team where amazing things happen every day! Join us if you are looking for a career, not just a job."
                      />
                    </Typography>

                    <Typography variant="body1" paragraph sx={contentStyles}>
                      <FormattedMessage
                        id="careers.hiring"
                        defaultMessage="Radiant research is constantly hiring for all positions. If you would like to explore career opportunities with us, please send your resume to bd"
                      />
                    </Typography>
                  </CardContent>
                </MainCard>
              </Box>

              {/* CV Upload Form - Right Side */}
              <Box sx={{ flex: { xs: 1, md: "0 0 42%" } }}>
                <MainCard
                  sx={{
                    height: "fit-content",
                    display: "flex",
                    flexDirection: "column",
                    border: "none",
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
                      p: theme.spacing(gridSpacing),
                      display: "flex",
                      flexDirection: "column",
                      "&:last-child": {
                        paddingBottom: theme.spacing(gridSpacing),
                      },
                    }}
                  >
                    <Typography
                      variant={screen.isDesktop ? "h5" : "h6"}
                      component="h3"
                      gutterBottom
                      sx={{
                        fontWeight: FONT_WEIGHTS.BOLD,
                        fontFamily: config.fontFamily,
                        fontSize: screen.isDesktop
                          ? { md: "1.5rem" }
                          : { xs: "1.2rem", sm: "1.3rem" },
                        color: theme.palette.text.primary,
                        transition: theme.transitions.create("color"),
                        marginTop: theme.spacing(1),
                        textAlign: "center",
                        mb: 3,
                      }}
                    >
                      <FormattedMessage
                        id="careers.cv.title"
                        defaultMessage="Drop your CV here"
                      />
                    </Typography>

                    <Box component="form" sx={{ mt: 2 }}>
                      <TextField
                        fullWidth
                        label={
                          <FormattedMessage
                            id="careers.cv.full-name"
                            defaultMessage="Full Name*"
                          />
                        }
                        variant="outlined"
                        required
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        error={!!errors.fullName}
                        helperText={errors.fullName}
                        sx={{
                          mb: 3,
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
                            "&::placeholder": {
                              color: theme.palette.text.primary,
                              opacity: 0.7,
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
                            "&.Mui-focused": {
                              color: theme.palette.primary.main,
                            },
                            "&.MuiFormLabel-filled": {
                              color: theme.palette.primary.main,
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
                          "& .MuiFormHelperText-root": {
                            color: theme.palette.error.main,
                            fontFamily: config.fontFamily,
                          },
                        }}
                      />

                      <TextField
                        fullWidth
                        label={
                          <FormattedMessage
                            id="careers.cv.email"
                            defaultMessage="Email *"
                          />
                        }
                        type="email"
                        variant="outlined"
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        sx={{
                          mb: 3,
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
                            "&::placeholder": {
                              color: theme.palette.text.primary,
                              opacity: 0.7,
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
                            "&.Mui-focused": {
                              color: theme.palette.primary.main,
                            },
                            "&.MuiFormLabel-filled": {
                              color: theme.palette.primary.main,
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
                          "& .MuiFormHelperText-root": {
                            color: theme.palette.error.main,
                            fontFamily: config.fontFamily,
                          },
                        }}
                      />

                      {/* <TextField
                        fullWidth
                        label={
                          <FormattedMessage
                            id="careers.cv.file-upload"
                            defaultMessage="Upload CV/Resume (PDF only) *"
                          />
                        }
                        variant="outlined"
                        disabled
                        value={selectedFile ? selectedFile.name : ""}
                        sx={{
                          mb: 3,
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
                            "&::placeholder": {
                              color: theme.palette.text.primary,
                              opacity: 0.7,
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
                            "&.Mui-focused": {
                              color: theme.palette.primary.main,
                            },
                            "&.MuiFormLabel-filled": {
                              color: theme.palette.primary.main,
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
                          "& .MuiFormHelperText-root": {
                            color: theme.palette.error.main,
                            fontFamily: config.fontFamily,
                          },
                        }}
                      /> */}

                      <Box
                        sx={{
                          border: `2px dashed ${errors.cvFile ? theme.palette.error.main : theme.palette.text.primary}`,
                          borderRadius: 2,
                          p: 3,
                          textAlign: "center",
                          mb: 1,
                          backgroundColor: "transparent",
                          cursor: selectedFile ? "default" : "pointer",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: "transparent",
                            borderColor: errors.cvFile
                              ? theme.palette.error.main
                              : theme.palette.text.primary,
                          },
                        }}
                      >
                        <input
                          type="file"
                          accept=".doc,.docx,.pdf"
                          style={{ display: "none" }}
                          id="cv-upload"
                          onChange={handleFileChange}
                        />

                        {selectedFile ? (
                          // Show selected file
                          <Box>
                            <CloudUploadIcon
                              sx={{
                                fontSize: 48,
                                color: theme.palette.primary.main,
                                mb: 1,
                              }}
                            />
                            <Typography
                              variant="body2"
                              sx={{
                                color: theme.palette.text.primary,
                                fontFamily: config.fontFamily,
                                fontWeight: FONT_WEIGHTS.MEDIUM,
                                fontSize: screen.isDesktop
                                  ? "1rem"
                                  : screen.isTablet
                                    ? "0.95rem"
                                    : "0.9rem",
                                mb: 1,
                              }}
                            >
                              <FormattedMessage
                                id="careers.cv.file-selected"
                                defaultMessage="File Selected:"
                              />
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: theme.palette.primary.main,
                                fontFamily: config.fontFamily,
                                fontWeight: FONT_WEIGHTS.MEDIUM,
                                fontSize: screen.isDesktop
                                  ? "0.95rem"
                                  : screen.isTablet
                                    ? "0.9rem"
                                    : "0.85rem",
                                mb: 2,
                              }}
                            >
                              {selectedFile.name}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                gap: 2,
                                justifyContent: "center",
                              }}
                            >
                              <Button
                                variant="outlined"
                                size="small"
                                onClick={() =>
                                  document.getElementById("cv-upload")?.click()
                                }
                                sx={{
                                  color: theme.palette.text.primary,
                                  borderColor: theme.palette.text.primary,
                                  fontFamily: config.fontFamily,
                                  fontWeight: FONT_WEIGHTS.REGULAR,
                                  "&:hover": {
                                    borderColor: theme.palette.primary.main,
                                    backgroundColor: "transparent",
                                  },
                                }}
                              >
                                <FormattedMessage
                                  id="careers.cv.change-file"
                                  defaultMessage="Change File"
                                />
                              </Button>
                              <Button
                                variant="outlined"
                                size="small"
                                color="error"
                                onClick={handleRemoveFile}
                                sx={{
                                  fontFamily: config.fontFamily,
                                  fontWeight: FONT_WEIGHTS.REGULAR,
                                }}
                              >
                                <FormattedMessage
                                  id="careers.cv.remove-file"
                                  defaultMessage="Remove"
                                />
                              </Button>
                            </Box>
                          </Box>
                        ) : (
                          // Show upload area
                          <label
                            htmlFor="cv-upload"
                            style={{ cursor: "pointer" }}
                          >
                            <CloudUploadIcon
                              sx={{
                                fontSize: 48,
                                color: errors.cvFile
                                  ? theme.palette.error.main
                                  : theme.palette.text.primary,
                                mb: 1,
                              }}
                            />
                            <Typography
                              variant="body2"
                              sx={{
                                color: errors.cvFile
                                  ? theme.palette.error.main
                                  : theme.palette.text.primary,
                                fontFamily: config.fontFamily,
                                fontWeight: FONT_WEIGHTS.REGULAR,
                                fontSize: screen.isDesktop
                                  ? "1rem"
                                  : screen.isTablet
                                    ? "0.95rem"
                                    : "0.9rem",
                                mb: 1,
                              }}
                            >
                              <FormattedMessage
                                id="careers.cv.upload"
                                defaultMessage="Upload your CV here"
                              />
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                color: errors.cvFile
                                  ? theme.palette.error.main
                                  : theme.palette.text.primary,
                                fontFamily: config.fontFamily,
                                fontWeight: FONT_WEIGHTS.REGULAR,
                                fontSize: screen.isDesktop
                                  ? "0.85rem"
                                  : screen.isTablet
                                    ? "0.8rem"
                                    : "0.75rem",
                              }}
                            >
                              <FormattedMessage
                                id="careers.cv.formats"
                                defaultMessage="(.DOC, .DOCX AND .PDF FORMATS ONLY)"
                              />
                            </Typography>
                          </label>
                        )}
                      </Box>

                      {errors.cvFile && (
                        <Typography
                          variant="caption"
                          sx={{
                            color: theme.palette.error.main,
                            fontFamily: config.fontFamily,
                            ml: 1.5,
                            mb: 2,
                            display: "block",
                          }}
                        >
                          {errors.cvFile}
                        </Typography>
                      )}

                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        disabled={isSubmitting}
                        onClick={handleSubmit}
                        sx={{
                          fontFamily: FONT_FAMILIES.PRIMARY,
                          fontWeight: FONT_WEIGHTS.MEDIUM,
                          fontSize: screen.isDesktop ? "1.1rem" : "1rem",
                          py: screen.isDesktop ? 1.5 : 1.2,
                          px: 3,
                          borderRadius: 2,
                          textTransform: "none",
                          border: "none",
                          mt: 2,
                          // Use exact same gradient as Get Started Today button
                          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 50%, ${theme.palette.primary.main} 100%) !important`,
                          color: "#FFFFFF !important",
                          transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
                          "&:hover": {
                            transform: isSubmitting
                              ? "none"
                              : "translateY(-2px) scale(1.015)",
                            backgroundPosition: "100% 100%",
                            boxShadow: `0 6px 20px rgba(0, 0, 0, 0.08), 0 3px 12px ${theme.palette.primary.main}35, inset 0 1px 0 rgba(255, 255, 255, 0.25)`,
                          },
                          "&:focus": {
                            outline: "none",
                            boxShadow: `0 2px 8px rgba(0, 0, 0, 0.06), 0 1px 4px ${theme.palette.primary.main}25, 0 0 0 2px ${theme.palette.primary.main}25`,
                          },
                          "&:active": {
                            transform: isSubmitting
                              ? "none"
                              : "translateY(-1px) scale(1.005)",
                            transition: "all 0.15s ease-out",
                            boxShadow: `0 3px 10px rgba(0, 0, 0, 0.12), 0 2px 6px ${theme.palette.primary.main}40, inset 0 1px 2px rgba(0, 0, 0, 0.05)`,
                          },
                          "&:disabled": {
                            opacity: 0.7,
                            transform: "none",
                          },
                        }}
                      >
                        {isSubmitting ? (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <CircularProgress
                              size={20}
                              sx={{ color: "#FFFFFF" }}
                            />
                            <FormattedMessage
                              id="careers.cv.sending"
                              defaultMessage="Sending..."
                            />
                          </Box>
                        ) : (
                          <FormattedMessage
                            id="careers.cv.send"
                            defaultMessage="Send"
                          />
                        )}
                      </Button>
                    </Box>
                  </CardContent>
                </MainCard>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>

      {/* Fixed Footer */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          backdropFilter: "blur(10px)",
        }}
      >
        <FooterSection />
      </Box>
    </Box>
  );
}
