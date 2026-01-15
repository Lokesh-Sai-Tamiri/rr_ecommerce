/**
 * @fileoverview Contact Us page using centralized utilities from landing/utils
 */

'use client';

import React from 'react';
import { Box } from '@mui/material';

// Project imports
import AppBar from 'ui-component/extended/AppBar';
import FooterSection from '../landing/FooterSection';
import ContactUsSection from './ContactUsSection';

// Import centralized utilities from landing/utils
import { useScreenDetection } from '../landing/utils/screenUtils';

/**
 * Main Contact Us page component using centralized utilities for consistent styling
 */
export default function ContactUs() {
  const screen = useScreenDetection();

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
        <ContactUsSection />
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