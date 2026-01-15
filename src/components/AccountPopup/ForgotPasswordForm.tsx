/**
 * @fileoverview Forgot password form component
 * Features email input for password reset code and new password setup
 */

"use client";

import React, { useState } from "react";
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
import { Visibility, VisibilityOff, ArrowBack } from "@mui/icons-material";
import { FormattedMessage } from "react-intl";
import {
  getTitleStyles,
  getSubtitleStyles,
  getEmailInputStyles,
  getPrimaryButtonStyles,
} from "./sharedStyles";

interface ForgotPasswordFormProps {
  onSendResetCode: (email: string) => Promise<void>;
  onResetPassword: (code: string, newPassword: string) => Promise<void>;
  onBack: () => void;
  isLoading: boolean;
  errorMessage: string;
  codeSent: boolean;
}

export default function ForgotPasswordForm({
  onSendResetCode,
  onResetPassword,
  onBack,
  isLoading,
  errorMessage,
  codeSent,
}: ForgotPasswordFormProps) {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSendCode = async (event: React.FormEvent) => {
    event.preventDefault();
    if (email) {
      await onSendResetCode(email);
    }
  };

  const handleResetPassword = async (event: React.FormEvent) => {
    event.preventDefault();
    if (code && newPassword && newPassword === confirmPassword) {
      await onResetPassword(code, newPassword);
    }
  };

  const passwordsMatch =
    newPassword === confirmPassword && newPassword.length >= 8;

  return (
    <>
      {/* Back Button */}
      <Box sx={{ mb: 2 }}>
        <Button
          onClick={onBack}
          startIcon={<ArrowBack />}
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
            id="forgot.password.back"
            defaultMessage="Back to Sign In"
          />
        </Button>
      </Box>

      <Typography variant="h4" sx={getTitleStyles()}>
        <FormattedMessage
          id="forgot.password.title"
          defaultMessage="Reset Password"
        />
      </Typography>

      <Typography variant="body1" sx={getSubtitleStyles()}>
        {!codeSent ? (
          <FormattedMessage
            id="forgot.password.subtitle"
            defaultMessage="Enter your email to receive a reset code"
          />
        ) : (
          <FormattedMessage
            id="forgot.password.code.sent"
            defaultMessage="Check your email for the reset code"
          />
        )}
      </Typography>

      {!codeSent ? (
        // Step 1: Send Reset Code
        <Box component="form" onSubmit={handleSendCode}>
          <Stack spacing={2}>
            {errorMessage && (
              <Alert
                severity="info"
                sx={{
                  mb: 2,
                  backgroundColor: "#0288d1",
                  color: "#FFFFFF",
                  border: "1px solid rgba(17,82,147,0.16)",
                  borderRadius: 2,
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
              disabled={isLoading}
              sx={getEmailInputStyles(theme)}
            />

            {/* Clerk CAPTCHA Element - Required for bot protection */}
            <Box id="clerk-captcha" />

            {/* Send Code Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading || !email}
              sx={getPrimaryButtonStyles(theme)}
              startIcon={
                isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : null
              }
            >
              {isLoading ? (
                <FormattedMessage
                  id="forgot.password.sending"
                  defaultMessage="Sending code..."
                />
              ) : (
                <FormattedMessage
                  id="forgot.password.send.code"
                  defaultMessage="Send Reset Code"
                />
              )}
            </Button>
          </Stack>
        </Box>
      ) : (
        // Step 2: Reset Password
        <Box component="form" onSubmit={handleResetPassword}>
          <Stack spacing={2}>
            {errorMessage && (
              <Alert
                severity="info"
                sx={{
                  mb: 2,
                  backgroundColor: "#0288d1",
                  color: "#FFFFFF",
                  border: "2px solid rgba(17,82,147,0.12)",
                }}
              >
                {errorMessage}
              </Alert>
            )}

            {/* Reset Code Input */}
            <TextField
              fullWidth
              label="Reset Code"
              placeholder="Enter the code from your email"
              variant="outlined"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={isLoading}
              sx={getEmailInputStyles(theme)}
            />

            {/* New Password Input */}
            <TextField
              fullWidth
              type={showPassword ? "text" : "password"}
              label="New Password"
              placeholder="Enter new password (min. 8 characters)"
              variant="outlined"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={isLoading}
              sx={getEmailInputStyles(theme)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: "#115293" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Confirm Password Input */}
            <TextField
              fullWidth
              type={showConfirmPassword ? "text" : "password"}
              label="Confirm Password"
              placeholder="Confirm new password"
              variant="outlined"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
              sx={getEmailInputStyles(theme)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                      sx={{ color: "#115293" }}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={
                confirmPassword.length > 0 && newPassword !== confirmPassword
              }
              helperText={
                confirmPassword.length > 0 && newPassword !== confirmPassword
                  ? "Passwords do not match"
                  : ""
              }
            />

            {/* Reset Password Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading || !code || !passwordsMatch}
              sx={getPrimaryButtonStyles(theme)}
              startIcon={
                isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : null
              }
            >
              {isLoading ? (
                <FormattedMessage
                  id="forgot.password.resetting"
                  defaultMessage="Resetting password..."
                />
              ) : (
                <FormattedMessage
                  id="forgot.password.reset"
                  defaultMessage="Reset Password"
                />
              )}
            </Button>
          </Stack>
        </Box>
      )}
    </>
  );
}
