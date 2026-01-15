/**
 * @fileoverview About Us section component using centralized utilities from landing/utils
 */

'use client';

import React from 'react';
import { Box, Container } from '@mui/material';

// Import centralized utilities from landing/utils
import { CSS_KEYFRAMES } from '../landing/utils/styleUtils';

// Import about us components (now using centralized utilities)
import { AboutUsIntro, useAboutUsStyles } from './components/sections';

/**
 * About Us section component using centralized utilities and reusing AboutSection structure
 */
function AboutUsSection() {
  // Get styles using centralized utilities (handles screen detection internally)
  const { backgroundStyles, containerStyles } = useAboutUsStyles();

  return (
    <Box sx={backgroundStyles}>
      <Container maxWidth="lg" sx={containerStyles}>
        {/* About Us Introduction - uses centralized title and subtitle utilities */}
        <AboutUsIntro />
      </Container>

      {/* CSS animations from centralized utilities */}
      <style jsx global>
        {CSS_KEYFRAMES}
      </style>
    </Box>
  );
}

// Add default export
export default AboutUsSection;
