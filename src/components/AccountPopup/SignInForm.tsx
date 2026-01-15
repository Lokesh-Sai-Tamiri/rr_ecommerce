/**
 * @fileoverview Sign-in form component with email/password authentication
 * Features email, password input, and forgot password link
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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormattedMessage } from "react-intl";
import {
  getTitleStyles,
  getSubtitleStyles,
  getEmailInputStyles,
  getPrimaryButtonStyles,
} from "./sharedStyles";

interface SignInFormProps {
  onSignIn: (email: string, password: string) => Promise<void>;
  onForgotPassword: () => void;
  onSwitchToSignUp: () => void;
  isLoading: boolean;
  errorMessage: string;
}

export default function SignInForm({
  onSignIn,
  onForgotPassword,
  onSwitchToSignUp,
  isLoading,
  errorMessage,
}: SignInFormProps) {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // Add refs for input fields
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (email && password) {
      await onSignIn(email, password);
    }
  };

  // Handle keyboard events for email field
  const handleEmailKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow all default keyboard navigation
    // Don't prevent any key events to ensure arrow keys work
    
    // Optional: Handle Enter key to move to password field
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      passwordInputRef.current?.focus();
    }
  };

  // Handle keyboard events for password field
  const handlePasswordKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow all default keyboard navigation
    
    // Optional: Handle Enter key to submit form
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (email && password) {
        handleSubmit(event as any);
      }
    }
  };

  return (
    <>
      <Typography variant="h4" sx={getTitleStyles()}>
        <FormattedMessage id="signin.title" defaultMessage="Welcome Back!" />
      </Typography>

      <Typography variant="body1" sx={getSubtitleStyles()}>
        <FormattedMessage
          id="signin.subtitle"
          defaultMessage="Sign in to your account"
        />
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={1.5}>
          {errorMessage && (
            <Alert
              severity="info"
              sx={{
                mb: 1.5,
                backgroundColor: "#0288d1",
                color: "#FFFFFF",
                border: "1px solid rgba(17,82,147,0.16)",
                borderRadius: 1,
                alignItems: "center",
                "& .MuiAlert-icon": { color: "#f44336" },
              }}
            >
              {errorMessage}
            </Alert>
          )}

          {/* Email Input */}
          <TextField
            fullWidth
            type="email"
            label="Email Address"
            placeholder="Enter your email"
            variant="outlined"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleEmailKeyDown}
            disabled={isLoading}
            inputRef={emailInputRef}
            autoComplete="email"
            autoFocus
            sx={{
              ...getEmailInputStyles(theme),
              "& .MuiInputBase-input": {
                ...getEmailInputStyles(theme)["& .MuiInputBase-input"],
                cursor: "text",
                caretColor: theme.palette.primary.main,
                // Ensure proper text selection
                userSelect: "text",
                WebkitUserSelect: "text",
                MozUserSelect: "text",
                msUserSelect: "text",
              },
            }}
            InputProps={{
              // Ensure the input is properly interactive
              onMouseDown: (e) => {
                // Prevent any interference with normal input behavior
                e.stopPropagation();
              },
            }}
            // Enable text selection and cursor navigation
            inputProps={{
              style: {
                cursor: "text",
              },
              onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
                // Ensure arrow keys work for cursor navigation
                if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) {
                  e.stopPropagation();
                  // Let the default behavior handle cursor movement
                }
              },
            }}
          />

          {/* Password Input */}
          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            label="Password"
            placeholder="Enter your password"
            variant="outlined"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handlePasswordKeyDown}
            disabled={isLoading}
            inputRef={passwordInputRef}
            autoComplete="current-password"
            sx={{
              ...getEmailInputStyles(theme),
              "& .MuiInputBase-input": {
                ...getEmailInputStyles(theme)["& .MuiInputBase-input"],
                cursor: "text",
                caretColor: theme.palette.primary.main,
                // Ensure proper text selection
                userSelect: "text",
                WebkitUserSelect: "text",
                MozUserSelect: "text",
                msUserSelect: "text",
              },
            }}
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
              // Ensure the input is properly interactive
              onMouseDown: (e) => {
                // Prevent any interference with normal input behavior
                e.stopPropagation();
              },
            }}
            // Enable text selection and cursor navigation
            inputProps={{
              style: {
                cursor: "text",
              },
              onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
                // Ensure arrow keys work for cursor navigation
                if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) {
                  e.stopPropagation();
                  // Let the default behavior handle cursor movement
                }
              },
            }}
          />

          {/* Forgot Password Link */}
          <Box sx={{ textAlign: "right" }}>
            <Button
              onClick={onForgotPassword}
              tabIndex={isLoading ? -1 : 0}
              sx={{
                color: "#115293",
                textTransform: "none",
                fontSize: "0.9rem",
                fontWeight: 500,
                "&:hover": {
                  backgroundColor: "rgba(17, 82, 147, 0.08)",
                },
              }}
            >
              <FormattedMessage
                id="signin.forgot.password"
                defaultMessage="Forgot Password?"
              />
            </Button>
          </Box>

          {/* Clerk CAPTCHA Element - Required for bot protection */}
          <Box id="clerk-captcha" />

          {/* Sign In Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={isLoading || !email || !password}
            sx={getPrimaryButtonStyles(theme)}
            startIcon={
              isLoading ? <CircularProgress size={20} color="inherit" /> : null
            }
          >
            {isLoading ? (
              <FormattedMessage
                id="signin.loading"
                defaultMessage="Signing in..."
              />
            ) : (
              <FormattedMessage id="signin.submit" defaultMessage="Sign In" />
            )}
          </Button>

          {/* Switch to Sign Up */}
          <Box sx={{ textAlign: "center", mt: 1.5 }}>
            <Typography variant="body2" sx={{ color: "#115293" }}>
              <FormattedMessage
                id="signin.no.account"
                defaultMessage="Don't have an account?"
              />{" "}
              <Button
                onClick={onSwitchToSignUp}
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
                  id="signin.signup.link"
                  defaultMessage="Sign Up"
                />
              </Button>
            </Typography>
          </Box>
        </Stack>
      </Box>
    </>
  );
}