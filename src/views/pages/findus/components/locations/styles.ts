/**
 * @fileoverview Centralized styles for Find Us location components using landing/utils
 */

import { useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';

// Import centralized utilities from landing/utils
import { useScreenDetection } from '../../../landing/utils/screenUtils';
import { getAboutBackgroundStyles, getAboutCardStyles } from '../../../landing/utils/themeUtils';
import { getMobileSizeWithFallback, getMobileScaling } from '../../../landing/utils/screenUtils';

/**
 * Custom hook for location component styles using centralized utilities
 */
export const useLocationStyles = () => {
  const theme = useTheme();
  const screen = useScreenDetection();
  const mobileSize = getMobileSizeWithFallback(screen);
  const mobileScaling = getMobileScaling(mobileSize);

  // Memoized styles using centralized utilities
  const styles = useMemo(() => {
    // Background styles - reuse from AboutSection
    const backgroundStyles = getAboutBackgroundStyles(screen);

    // Font sizes using centralized responsive logic
    const fontSizes = {
      title: {
        xs: screen.isMobile ? '1.5rem' : '1.75rem',
        sm: '1.75rem',
        md: screen.isDesktop ? '2.75rem' : '2.25rem'
      },
      subtitle: {
        xs: mobileScaling?.fontSize || '0.875rem',
        sm: '1rem',
        md: screen.isDesktop ? '1.25rem' : '1.125rem'
      },
      content: {
        xs: mobileScaling?.fontSize || '0.9rem',
        sm: '0.95rem',
        md: '1rem'
      },
      button: {
        xs: mobileScaling?.fontSize || '0.875rem',
        sm: '0.9rem',
        md: '1rem'
      }
    };

    // Card styles function using centralized AboutSection card styles
    const getCardStyles = (index: number): SxProps<Theme> => {
      const baseCardStyles = getAboutCardStyles(screen, theme)(index);

      return {
        ...baseCardStyles,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: screen.isDesktop ? '700px' : '100%',
        margin: '0 auto',
        backgroundColor: `${theme.palette.text.primary}15 !important`,
        '&:hover': {
          backgroundColor: `${theme.palette.text.primary}20 !important`,
          transform: screen.isDesktop ? 'translateY(-8px) scale(1.01)' : 'translateY(-4px)'
        }
      } as SxProps<Theme>;
    };

    // Container styles using centralized spacing
    const containerStyles: SxProps<Theme> = {
      position: 'relative',
      zIndex: 2,
      mb: { xs: 7, sm: 8, md: 9 },
      px: theme.spacing(2)
    };

    // Grid styles using centralized responsive logic
    const gridStyles: SxProps<Theme> = {
      display: 'flex',
      flexDirection: 'column',
      gap: { xs: 3, sm: 4, md: 4 },
      alignItems: 'center',
      mx: 'auto'
    };

    // Icon styles using centralized responsive values
    const getIconStyles = (fontSize: string): SxProps<Theme> => ({
      fontSize,
      color: theme.palette.text.primary,
      transition: theme.transitions.create(['color', 'filter'], {
        duration: theme.transitions.duration.short
      }),
      filter: `drop-shadow(0 2px 4px ${theme.palette.text.primary}30)`,
      '&:hover': {
        color: theme.palette.primary.main
      }
    });

    // Action button styles using centralized theme system
    const getActionButtonStyles = (): SxProps<Theme> => ({
      padding: screen.isMobile ? '6px' : '8px',
      color: theme.palette.primary.main,
      backgroundColor: 'transparent',
      borderRadius: 2,
      transition: theme.transitions.create(['all'], {
        duration: theme.transitions.duration.short
      }),
      '& svg': {
        fontSize: screen.isDesktop ? '20px' : screen.isTablet ? '18px' : '16px'
      },
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        transform: 'translateY(-2px)',
        boxShadow: `0 4px 8px ${theme.palette.primary.main}30`
      }
    });

    // Content text styles using centralized mobile scaling
    const getContentTextStyles = (): SxProps<Theme> => ({
      color: theme.palette.text.primary,
      textAlign: 'left',
      fontFamily: theme.typography.fontFamily,
      fontWeight: theme.typography.fontWeightRegular || 400,
      lineHeight: 1.8,
      fontSize: screen.isMobile && mobileScaling ? mobileScaling.fontSize : '1rem'
    });

    // Title styles using centralized responsive logic
    const getTitleStyles = (): SxProps<Theme> => ({
      fontWeight: theme.typography.fontWeightBold || 700,
      fontFamily: theme.typography.fontFamily,
      fontSize: screen.isDesktop ? '1.5rem' : screen.isTablet ? '1.4rem' : '1.2rem',
      color: theme.palette.text.primary,
      transition: theme.transitions.create('color'),
      marginTop: theme.spacing(1),
      textAlign: 'center'
    });

    return {
      backgroundStyles,
      fontSizes,
      getCardStyles,
      containerStyles,
      gridStyles,
      getIconStyles,
      getActionButtonStyles,
      getContentTextStyles,
      getTitleStyles
    };
  }, [theme, screen, mobileScaling]);

  return styles;
};

/**
 * Utility function to get responsive spacing values
 */
export const getLocationSpacing = (screen: ReturnType<typeof useScreenDetection>, theme: Theme) => {
  return {
    cardGap: screen.isDesktop ? theme.spacing(4) : screen.isTablet ? theme.spacing(3) : theme.spacing(2),
    sectionPadding: {
      py: screen.isDesktop ? theme.spacing(8) : screen.isTablet ? theme.spacing(6) : theme.spacing(4),
      px: screen.isDesktop ? theme.spacing(4) : theme.spacing(2)
    },
    iconSize: screen.isDesktop ? '2rem' : screen.isTablet ? '1.8rem' : '1.6rem',
    buttonPadding: screen.isMobile ? '6px' : '8px'
  };
};

/**
 * Utility function to get responsive font sizes
 */
export const getLocationFontSizes = (screen: ReturnType<typeof useScreenDetection>) => {
  const mobileSize = getMobileSizeWithFallback(screen);
  const mobileScaling = getMobileScaling(mobileSize);

  return {
    heroTitle: screen.isDesktop ? '3rem' : screen.isTablet ? '2.5rem' : '2rem',
    sectionTitle: screen.isDesktop ? '2.5rem' : screen.isTablet ? '2rem' : '1.75rem',
    cardTitle: screen.isDesktop ? '1.5rem' : screen.isTablet ? '1.4rem' : '1.2rem',
    bodyText: screen.isMobile && mobileScaling ? mobileScaling.fontSize : '1rem',
    buttonText: screen.isMobile && mobileScaling ? mobileScaling.fontSize : '0.875rem'
  };
};

/**
 * Utility function to get animation configurations
 */
export const getLocationAnimations = (screen: ReturnType<typeof useScreenDetection>) => {
  return {
    cardAnimation: (index: number) => `fadeInUp 0.8s ease-out ${0.6 + index * 0.2}s both`,
    titleAnimation: screen.isDesktop ? 'fadeInUp 0.8s ease-out 0.2s both' : 'fadeInUp 0.6s ease-out 0.2s both',
    subtitleAnimation: screen.isDesktop ? 'fadeInUp 0.8s ease-out 0.4s both' : 'fadeInUp 0.6s ease-out 0.3s both',
    hoverTransform: screen.isDesktop ? 'translateY(-8px) scale(1.01)' : 'translateY(-4px)'
  };
};

/**
 * Default export for backward compatibility
 */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  useLocationStyles,
  getLocationSpacing,
  getLocationFontSizes,
  getLocationAnimations
};
