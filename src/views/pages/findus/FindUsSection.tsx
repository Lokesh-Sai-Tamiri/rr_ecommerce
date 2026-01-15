/**
 * @fileoverview Find Us section component using centralized utilities from landing/utils
 */

"use client";

import React from "react";
import { Box, Container, Grid, Stack } from "@mui/material";

// Import centralized utilities from landing/utils
import { CSS_KEYFRAMES } from "../landing/utils/styleUtils";

// Import location components (now using centralized utilities)
import {
  LocationCard,
  LocationIntro,
  getLocationSections,
  useLocationStyles,
} from "./components/locations";

/**
 * Find Us section component using centralized utilities and reusing AboutSection structure
 */
function FindUsSection() {
  // Get sections data
  const sections = getLocationSections();

  // Get styles using centralized utilities (handles screen detection internally)
  const {
    backgroundStyles,
    fontSizes,
    getCardStyles,
    containerStyles,
    gridStyles,
  } = useLocationStyles();

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      {/* Location Introduction - uses centralized title and subtitle utilities */}

      {/* Location Cards - uses Stack layout for vertical column display */}
      <Stack spacing={{ xs: 2, sm: 3, md: 4 }} sx={{ mb: { xs: 3, sm: 4, md: 6 } }}>
        {sections.map((section, index) => (
          <LocationCard
            key={section.id}
            location={section}
            index={index}
            fontSizes={fontSizes}
            getCardStyles={getCardStyles}
          />
        ))}
      </Stack>
    </Box>
  );
}

// Add default export
export default FindUsSection;
