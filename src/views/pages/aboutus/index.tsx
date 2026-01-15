/**
 * @fileoverview About Us page with hero image and existing content
 */

'use client';

import React from 'react';
import { Box } from '@mui/material';

// Project imports
import AppBar from 'ui-component/extended/AppBar';
import FooterSection from '../landing/FooterSection';

// Import centralized utilities from landing/utils
import { useScreenDetection } from '../landing/utils/screenUtils';
import AboutUsWithHero from './AboutUsWithHero';

/**
 * Main About Us page component with hero image
 */
export default function AboutUs() {
  const screen = useScreenDetection();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Fixed Header */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          backdropFilter: 'blur(10px)'
        }}
      >
        <AppBar
          sx={{
            background: 'transparent',
            boxShadow: 'none',
            position: 'static'
          }}
          disableSticky={true}
          FooterComponent={FooterSection}
        />
      </Box>

      {/* Main Content Container */}
      <Box
        sx={{
          flex: 1,
          minHeight: 'calc(100vh - 120px)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* About Us Section with Background */}
        <Box
          sx={{
            flex: 1,
            minHeight: 'inherit',
            backgroundImage: `url('/assets/images/home-bg.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            paddingBottom: '60px'
          }}
        >
          <AboutUsWithHero />
        </Box>
      </Box>

      {/* Fixed Footer */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          backdropFilter: 'blur(10px)'
        }}
      >
        <FooterSection />
      </Box>
    </Box>
  );
}
