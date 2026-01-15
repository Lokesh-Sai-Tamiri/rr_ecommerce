/**
 * @fileoverview About section component displaying Vision, Mission and Values
 * Uses centralized utilities for consistent styling and device detection
 */

'use client';

import React from 'react';
import { Box, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useConfig from 'hooks/useConfig';

// centralized utilities
import { CSS_KEYFRAMES } from './utils';

// About components
import { AboutCard, CompanyIntro, getAboutSections, useAboutStyles } from './components/about';

/**
 * About section component with Vision, Mission, and Values
 */
export default function AboutSection() {
  const theme = useTheme();
  const { i18n } = useConfig();

  // Get sections data with current locale
  const sections = getAboutSections(theme.palette.text.primary, i18n);

  // Get all styles from custom hook
  const { fontSizes, backgroundStyles, getCardStyles } = useAboutStyles();

  return (
    <Box sx={backgroundStyles}>
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 2,
          mb: { xs: 7, sm: 8, md: 9 },
          px: theme.spacing(2)
        }}
      >
        {/* Company Introduction */}
        <CompanyIntro />

        {/* Vision, Mission, Values Cards */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 3, sm: 4, md: 4 },
            alignItems: 'center',
            mx: 'auto'
          }}
        >
          {sections.map((section, index) => (
            <AboutCard key={section.title} section={section} index={index} fontSizes={fontSizes} getCardStyles={getCardStyles} />
          ))}
        </Box>
      </Container>

      {/* CSS Animations */}
      <style jsx global>
        {CSS_KEYFRAMES}
      </style>
    </Box>
  );
}
