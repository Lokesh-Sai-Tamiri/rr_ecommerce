/**
 * @fileoverview Logo section component with responsive scaling
 */

'use client';

import RouterLink from 'next/link';
import { Box, Typography, Tooltip, useMediaQuery } from '@mui/material';
import { usePathname } from 'next/navigation';
import useConfig from 'hooks/useConfig';
import Logo from 'ui-component/Logo';
import { logoScaleStyles } from '../styles';
import { JSX } from 'react';

/**
 * Logo section with responsive scaling for all device sizes
 * Includes tooltip and navigation to homepage
 *
 * @returns {JSX.Element} Logo section component
 */
export default function LogoSection(): JSX.Element {
  // Device detection
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1024px)'); // NEW: Tablet detection
  const isLandscape = useMediaQuery('(orientation: landscape)');
  
  // Get current pathname to check if on homepage
  const pathname = usePathname();
  const isOnHomepage = pathname === '/';
  
  // Get current language for dynamic tooltip
  const { i18n } = useConfig();

  // Specific device combinations
  const isMobileLandscape = isMobile && isLandscape;
  const isTabletLandscape = isTablet && isLandscape; // NEW: Tablet landscape

  // Mobile size calculation (existing)
  const getMobileSize = () => {
    return isMobileLandscape ? '51px' : '60px';
  };

  // NEW: Tablet size calculation
  const getTabletSize = () => {
    return isTabletLandscape ? '56px' : '55px';
  };

  // Desktop size calculation (existing)
  const getDesktopSize = () => {
    return isLandscape ? '64px' : '60px';
  };

  // Enhanced logo styles with tablet support
  const consistentLogoStyles = {
    ...logoScaleStyles,
    '& img, & svg, & *': {
      height: isMobile
        ? `${getMobileSize()} !important`
        : isTablet
          ? `${getTabletSize()} !important` // NEW: Tablet sizing
          : `${getDesktopSize()} !important`, // Desktop sizing
      width: 'auto !important',
      maxHeight: isMobile
        ? `${getMobileSize()} !important`
        : isTablet
          ? `${getTabletSize()} !important` // NEW: Tablet max-height
          : `${getDesktopSize()} !important` // Desktop max-height
    }
  };

  // Homepage-specific styles - no pointer cursor
  const homepageLogoStyles = {
    ...consistentLogoStyles,
    cursor: 'default',
    '&:hover': {
      cursor: 'default'
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        marginLeft: 0,
        paddingLeft: 0,
        position: 'relative',
        left: 0
      }}
    >
      {isOnHomepage ? (
        // When on homepage, show logo without tooltip and no pointer cursor
        <Typography component={RouterLink} href="/" variant="h6" sx={homepageLogoStyles}>
          <Logo />
        </Typography>
      ) : (
        // When not on homepage, show logo with tooltip
        <Tooltip 
          title={
            i18n === 'ko' ? '홈페이지로 이동' : 'Go to Homepage'
          } 
          arrow
        >
          <Typography component={RouterLink} href="/" variant="h6" sx={consistentLogoStyles}>
            <Logo />
          </Typography>
        </Tooltip>
      )}
    </Box>
  );
}
