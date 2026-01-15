/**
 * @fileoverview Infrastructure page using ServiceComponent
 */

'use client';

import React from 'react';
import { Box } from '@mui/material';

// Project imports
import AppBar from 'ui-component/extended/AppBar';
import FooterSection from '../landing/FooterSection';
// import ServiceComponent from '../../app/services/[slug]/shared/ServiceComponent';

// Import centralized utilities from landing/utils
import { useScreenDetection } from '../landing/utils/screenUtils';
import ServiceComponent from 'app/services/[slug]/shared/ServiceComponent';

// Import infrastructure data
import { infrastructureData } from './infrastructureData';

/**
 * Main Infrastructure page component using ServiceComponent
 */
export default function Infrastructure() {
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
        {/* Infrastructure Section with Background */}
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
          <ServiceComponent serviceData={infrastructureData} />
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