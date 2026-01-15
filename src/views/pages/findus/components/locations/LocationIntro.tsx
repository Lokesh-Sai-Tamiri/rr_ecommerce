/**
 * @fileoverview Location introduction component
 * Reusing existing text components from landing page with same styling as CompanyIntro
 */

"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FormattedMessage } from "react-intl";

// Reuse existing utilities from landing page
import { useScreenDetection, getTitleStyles } from "../../../landing/utils";

/**
 * Introduction section for Find Us page matching CompanyIntro styling exactly
 */
export function LocationIntro() {
  const screen = useScreenDetection();
  const theme = useTheme();

  // Use the same title styles as CompanyIntro
  const titleStyles = getTitleStyles(screen, theme, {
    use3DEffects: true,
  });

  // Custom subtitle styles using p tag
  const subtitleStyles = {
    margin: "-24px 0 0 0", // Negative top margin to move text upward
    padding: 0,
    color: theme.palette.text.primary,
    textAlign: "center" as const,
    lineHeight: 1.8,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightMedium || 500,
    fontSize: screen.isDesktop
      ? "1.25rem"
      : screen.isTablet
        ? "1.125rem"
        : "1rem",
    animation: "fadeInUp 0.8s ease-out 0.4s both",
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        // Add top padding to account for fixed header
        mb: 0,
        pb: 0,
        px: { xs: 2, sm: 4 },
        position: "relative",
        zIndex: 2,
        width: "100%",
      }}
    >
      {/* Title Section - 32px margin top only (in addition to container padding) */}

      {/* Subtitle using p tag with 32px top and bottom margins */}
      <p style={subtitleStyles}>
        <FormattedMessage 
          id="contact.subtitle" 
          defaultMessage="Visit us at any of our office locations across India anytime. We're here to serve you with excellence and innovation. Our locations are designed to provide you with the best experience." 
        />
      </p>
    </Box>
  );
}
