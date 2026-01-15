/**
 * @fileoverview Sign-up form component with comprehensive user information collection
 * Features first name, last name, email, password, country, and contact number inputs
 */

"use client";

import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  useTheme,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  MenuItem,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormattedMessage } from "react-intl";
import {
  getTitleStyles,
  getSubtitleStyles,
  getEmailInputStyles,
  getPrimaryButtonStyles,
} from "./sharedStyles";

interface SignUpFormProps {
  onSignUp: (data: SignUpData) => Promise<void>;
  onSwitchToSignIn: () => void;
  isLoading: boolean;
  errorMessage: string;
  errorIsInfo?: boolean;
}

export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  country?: string;
  contactNumber?: string;
}

export default function SignUpForm({
  onSignUp,
  onSwitchToSignIn,
  isLoading,
  errorMessage,
  errorIsInfo = false,
}: SignUpFormProps) {
  const theme = useTheme();
  const [formData, setFormData] = useState<SignUpData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    country: "",
    contactNumber: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  // Add refs for input fields
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const contactNumberRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: keyof SignUpData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.password
    ) {
      await onSignUp(formData);
    }
  };

  const isFormValid =
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.password &&
    formData.password.length >= 8;

  // Handle keyboard navigation between fields
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    nextFieldRef?: React.RefObject<HTMLInputElement>
  ) => {
    // Allow all default keyboard navigation for arrow keys
    if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
      event.stopPropagation();
      // Let the default behavior handle cursor movement
      return;
    }

    // Handle Enter key to move to next field
    if (event.key === 'Enter' && !event.shiftKey && nextFieldRef) {
      event.preventDefault();
      nextFieldRef.current?.focus();
    }
  };

  // Enhanced input styles with proper cursor support
  const getEnhancedInputStyles = (baseStyles: any) => ({
    ...baseStyles,
    "& .MuiInputBase-input": {
      ...baseStyles["& .MuiInputBase-input"],
      cursor: "text",
      caretColor: theme.palette.primary.main,
      // Ensure proper text selection
      userSelect: "text",
      WebkitUserSelect: "text",
      MozUserSelect: "text",
      msUserSelect: "text",
    },
  });

  return (
    <>
      <Typography variant="h4" sx={getTitleStyles()}>
        <FormattedMessage
          id="signup.title"
          defaultMessage="Create Your Account"
        />
      </Typography>

      <Typography variant="body1" sx={getSubtitleStyles()}>
        <FormattedMessage
          id="signup.subtitle"
          defaultMessage="Sign up to get started"
        />
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          {errorMessage && (
            <Alert
              severity={errorIsInfo ? "info" : "error"}
              sx={{
                mb: 2,
                backgroundColor: "#0288d1",
                color: "#FFFFFF",
                border: "1px solid rgba(17,82,147,0.16)",
                borderRadius: 3,
                alignItems: "center",
                "& .MuiAlert-icon": { color: "#f44336" },
              }}
            >
              {errorMessage}
            </Alert>
          )}

          {/* First Name and Last Name Row */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
            }}
          >
            <TextField
              fullWidth
              label="First Name"
              placeholder="Enter first name"
              variant="outlined"
              required
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, lastNameRef)}
              disabled={isLoading}
              inputRef={firstNameRef}
              autoComplete="given-name"
              autoFocus
              sx={getEnhancedInputStyles(getEmailInputStyles(theme))}
              InputProps={{
                onMouseDown: (e) => {
                  e.stopPropagation();
                },
              }}
              inputProps={{
                style: {
                  cursor: "text",
                },
                onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) {
                    e.stopPropagation();
                  }
                },
              }}
            />
            <TextField
              fullWidth
              label="Last Name"
              placeholder="Enter last name"
              variant="outlined"
              required
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, emailRef)}
              disabled={isLoading}
              inputRef={lastNameRef}
              autoComplete="family-name"
              sx={getEnhancedInputStyles(getEmailInputStyles(theme))}
              InputProps={{
                onMouseDown: (e) => {
                  e.stopPropagation();
                },
              }}
              inputProps={{
                style: {
                  cursor: "text",
                },
                onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) {
                    e.stopPropagation();
                  }
                },
              }}
            />
          </Box>

          {/* Email Input */}
          <TextField
            fullWidth
            type="email"
            label="Email Address"
            placeholder="Enter your email"
            variant="outlined"
            required
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, passwordRef)}
            disabled={isLoading}
            inputRef={emailRef}
            autoComplete="email"
            sx={getEnhancedInputStyles(getEmailInputStyles(theme))}
            InputProps={{
              onMouseDown: (e) => {
                e.stopPropagation();
              },
            }}
            inputProps={{
              style: {
                cursor: "text",
              },
              onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
                if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) {
                  e.stopPropagation();
                }
              },
            }}
          />

          {/* Password Input */}
          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            label="Password"
            placeholder="Enter password (min. 8 characters)"
            variant="outlined"
            required
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, countryRef)}
            disabled={isLoading}
            inputRef={passwordRef}
            autoComplete="new-password"
            sx={getEnhancedInputStyles(getEmailInputStyles(theme))}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(e) => e.preventDefault()} // Prevent focus loss
                    edge="end"
                    sx={{ color: "#115293" }}
                    tabIndex={-1} // Prevent tab focus on icon button
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
              onMouseDown: (e) => {
                e.stopPropagation();
              },
            }}
            inputProps={{
              style: {
                cursor: "text",
              },
              onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
                if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) {
                  e.stopPropagation();
                }
              },
            }}
            helperText={
              formData.password && formData.password.length < 8
                ? "Password must be at least 8 characters"
                : ""
            }
          />

          {/* Contact Number and Country Row */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
            }}
          >
            <TextField
              fullWidth
              select
              label="Country"
              variant="outlined"
              value={formData.country}
              onChange={(e) => handleInputChange("country", e.target.value)}
              onKeyDown={(e: any) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  contactNumberRef.current?.focus();
                }
              }}
              disabled={isLoading}
              inputRef={countryRef}
              autoComplete="country"
              sx={{
                ...getEnhancedInputStyles(getEmailInputStyles(theme)),
                "& .MuiSelect-select": {
                  backgroundColor: "#E9F3FD !important",
                  color: theme.palette.text.primary,
                  cursor: "pointer",
                },
                "& .MuiSvgIcon-root": {
                  color: "#1976D2 !important",
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
              <MenuItem value="">Select your country</MenuItem>
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
            <TextField
              fullWidth
              label="Contact Number"
              placeholder="Enter contact number"
              variant="outlined"
              value={formData.contactNumber}
              onChange={(e) =>
                handleInputChange("contactNumber", e.target.value)
              }
              onKeyDown={(e) => {
                if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) {
                  e.stopPropagation();
                  return;
                }
                if (e.key === 'Enter' && !e.shiftKey && isFormValid) {
                  e.preventDefault();
                  handleSubmit(e as any);
                }
              }}
              disabled={isLoading}
              inputRef={contactNumberRef}
              autoComplete="tel"
              sx={getEnhancedInputStyles(getEmailInputStyles(theme))}
              InputProps={{
                onMouseDown: (e) => {
                  e.stopPropagation();
                },
              }}
              inputProps={{
                style: {
                  cursor: "text",
                },
                onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) {
                    e.stopPropagation();
                  }
                },
              }}
            />
          </Box>

          {/* Clerk CAPTCHA Element - Required for bot protection */}
          <Box id="clerk-captcha" />

          {/* Sign Up Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={isLoading || !isFormValid}
            sx={getPrimaryButtonStyles(theme)}
            startIcon={
              isLoading ? <CircularProgress size={20} color="inherit" /> : null
            }
          >
            {isLoading ? (
              <FormattedMessage
                id="signup.loading"
                defaultMessage="Creating account..."
              />
            ) : (
              <FormattedMessage id="signup.submit" defaultMessage="Sign Up" />
            )}
          </Button>

          {/* Switch to Sign In */}
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Typography variant="body2" sx={{ color: "#115293" }}>
              <FormattedMessage
                id="signup.have.account"
                defaultMessage="Already have an account?"
              />{" "}
              <Button
                onClick={onSwitchToSignIn}
                tabIndex={isLoading ? -1 : 0}
                sx={{
                  color: "#115293",
                  textTransform: "none",
                  fontWeight: 600,
                  p: 0,
                  minWidth: "auto",
                  "&:hover": {
                    backgroundColor: "transparent",
                    textDecoration: "underline",
                  },
                }}
              >
                <FormattedMessage
                  id="signup.signin.link"
                  defaultMessage="Sign In"
                />
              </Button>
            </Typography>
          </Box>
        </Stack>
      </Box>
    </>
  );
}