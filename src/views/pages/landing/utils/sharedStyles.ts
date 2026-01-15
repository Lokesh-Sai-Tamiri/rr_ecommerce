/**
 * @fileoverview Shared styling utilities for consistent component styling
 * Common patterns used across HeroText, CompanyIntro, and other components
 */

import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/material/styles';
import { ScreenDetection, getMobileSizeWithFallback, getMobileScaling } from './screenUtils';
import { FONT_WEIGHTS, LINE_HEIGHTS, ANIMATIONS } from './styleUtils';

/**
 * Shared hero title styles - used by HeroText and CompanyIntro
 */
export const getHeroTitleStyles = (
  screen: ScreenDetection,
  theme: Theme,
  options?: {
    heroLineHeight?: number;
    use3DEffects?: boolean;
    customAnimation?: {
      delay?: string;
      duration?: string;
    };
  }
): SxProps<Theme> => {
  const { heroLineHeight, use3DEffects, customAnimation } = options || {};

  // Animation configuration
  const getAnimation = () => {
    const delay = customAnimation?.delay || (screen.isDesktop ? '0.5s' : '0.4s');
    const duration = customAnimation?.duration || '0.8s';
    return `fadeInUp ${duration} ease-out ${delay} both`;
  };

  return {
    lineHeight: heroLineHeight || LINE_HEIGHTS.TIGHT,
    position: 'relative',
    color: theme.palette.text.primary,
    animation: getAnimation(),
    fontWeight: FONT_WEIGHTS.BOLD,
    fontFamily: theme.typography.fontFamily,
    ...(use3DEffects &&
      screen.isDesktop && {
        transform: 'perspective(1000px) rotateX(5deg)',
        transformOrigin: 'center bottom',
        transition: theme.transitions.create(['transform'], {
          duration: theme.transitions.duration.standard,
          easing: theme.transitions.easing.easeInOut
        }),
        cursor: 'default',
        '&:hover': {
          transform: 'perspective(1000px) rotateX(0deg) scale(1.02)',
          textShadow: `0 4px 8px ${theme.palette.text.primary}40`
        }
      })
  };
};

/**
 * Shared company title styles - used by CompanyIntro
 */
export const getCompanyTitleStyles = (
  screen: ScreenDetection,
  theme: Theme,
  options?: {
    use3DEffects?: boolean;
  }
): SxProps<Theme> => {
  const { use3DEffects } = options || {};

  return {
    fontWeight: FONT_WEIGHTS.BOLD,
    fontFamily: theme.typography.fontFamily,
    lineHeight: LINE_HEIGHTS.TIGHT,
    marginBottom: theme.spacing(2),
    color: theme.palette.text.primary,
    animation: ANIMATIONS.FADE_IN_UP,
    ...(use3DEffects &&
      screen.isDesktop && {
        transform: 'perspective(1000px) rotateX(5deg)',
        transformOrigin: 'center bottom',
        transition: theme.transitions.create(['transform', 'text-shadow'], {
          duration: theme.transitions.duration.standard,
          easing: theme.transitions.easing.easeInOut
        }),
        cursor: 'default',
        '&:hover': {
          transform: 'perspective(1000px) rotateX(0deg) scale(1.02)',
          textShadow: `0 4px 8px ${theme.palette.text.primary}40`
        }
      })
  };
};

/**
 * Shared subtitle styles - used by Subtitle and CompanyIntro
 */
export const getCompanySubtitleStyles = (screen: ScreenDetection, theme: Theme): { variant: string; sx: SxProps<Theme> } => {
  const mobileSize = getMobileSizeWithFallback(screen);
  const mobileScaling = getMobileScaling(mobileSize);

  // Get subtitle variant
  const getSubtitleVariant = () => {
    if (screen.isDesktop) return 'subtitleLarge';
    return 'subtitleMedium';
  };

  // Get responsive font size
  const getFontSize = () => {
    if (screen.isDesktop || screen.isTablet) {
      return 'inherit';
    }
    return mobileScaling?.fontSize || '0.875rem';
  };

  // Calculate responsive spacing
  const getMarginLeft = () => {
    if (screen.isDesktop) return theme.spacing(10);
    if (screen.isTablet) return theme.spacing(8);

    // Mobile: scale based on mobile size
    if (mobileSize === 'small') return theme.spacing(6);
    if (mobileSize === 'medium') return theme.spacing(7);
    if (mobileSize === 'large') return theme.spacing(8);

    return theme.spacing(6);
  };

  const getMarginBottom = () => {
    if (screen.isDesktop) return theme.spacing(4);
    if (screen.isTablet) return theme.spacing(1);

    // Mobile: scale based on mobile size
    if (mobileSize === 'small') return theme.spacing(0);
    if (mobileSize === 'medium') return theme.spacing(0.5);
    if (mobileSize === 'large') return theme.spacing(1);

    return theme.spacing(0);
  };

  const getMarginTop = () => {
    if (screen.isDesktop || screen.isTablet) return theme.spacing(1);

    // Mobile: scale based on mobile size
    if (mobileSize === 'small') return theme.spacing(0);
    if (mobileSize === 'medium') return theme.spacing(0.5);
    if (mobileSize === 'large') return theme.spacing(1);

    return theme.spacing(0);
  };

  // Animation configuration
  const getAnimation = () => {
    const delay = screen.isDesktop ? '0.5s' : '0.4s';
    const duration = '0.8s';
    return `fadeInUp ${duration} ease-out ${delay} both`;
  };

  return {
    variant: getSubtitleVariant(),
    sx: {
      mb: getMarginBottom(),
      mt: getMarginTop(),
      color: theme.palette.text.primary,
      lineHeight: LINE_HEIGHTS.RELAXED,
      animation: getAnimation(),
      marginLeft: getMarginLeft(),
      fontSize: getFontSize(),
      fontWeight: FONT_WEIGHTS.MEDIUM,
      fontFamily: theme.typography.fontFamily
    }
  };
};

/**
 * Shared button styles - used by ActionButtons
 */
export const getSharedButtonStyles = (
  screen: ScreenDetection,
  theme: Theme,
  variant: 'primary' | 'secondary' = 'primary'
): SxProps<Theme> => {
  const mobileSize = getMobileSizeWithFallback(screen);
  const mobileScaling = getMobileScaling(mobileSize);

  // Get mobile-specific padding
  const getMobilePadding = () => {
    if (screen.isDesktop) return '8px 16px';
    if (screen.isTablet) return '12px 24px';
    return mobileScaling?.padding || '2px 0px';
  };

  // Get mobile-specific font size
  const getMobileFontSize = () => {
    if (screen.isDesktop) return 'inherit';
    if (screen.isTablet) return '1rem';
    return mobileScaling?.fontSize || '0.875rem';
  };

  const baseStyles: SxProps<Theme> = {
    transition: theme.transitions.create(['all'], {
      duration: theme.transitions.duration.short
    }),
    fontWeight: FONT_WEIGHTS.MEDIUM,
    fontFamily: theme.typography.fontFamily
  };

  if (screen.isDesktop) {
    return {
      ...baseStyles,
      pr: '8px'
    };
  }

  if (screen.isTablet) {
    return {
      ...baseStyles,
      width: '100%',
      height: '56px',
      minHeight: '56px',
      maxHeight: '56px',
      '& > *': {
        width: '100% !important',
        height: '56px !important',
        minHeight: '56px !important',
        maxHeight: '56px !important',
        display: 'flex !important',
        justifyContent: 'center !important',
        alignItems: 'center !important',
        fontSize: '1rem !important',
        fontWeight: '500 !important',
        boxSizing: 'border-box !important'
      }
    };
  }

  // Mobile styling
  return {
    ...baseStyles,
    width: '100%',
    '& > *': {
      width: '100% !important',
      display: 'flex !important',
      justifyContent: 'center !important',
      padding: `${getMobilePadding()} !important`,
      minWidth: 'unset !important',
      fontSize: `${getMobileFontSize()} !important`
    }
  };
};

/**
 * Shared card styles - used by AboutCard and other card components
 */
export const getSharedCardStyles = (screen: ScreenDetection, theme: Theme, index: number = 0): SxProps<Theme> => {
  const mobileSize = getMobileSizeWithFallback(screen);

  // Responsive border radius
  const getBorderRadius = () => {
    if (screen.isDesktop) return theme.shape.borderRadius;
    if (screen.isTablet) return theme.shape.borderRadius;

    // Mobile: scale based on mobile size
    if (mobileSize === 'small') return 12;
    if (mobileSize === 'medium') return 14;
    if (mobileSize === 'large') return 16;

    return 12;
  };

  // Responsive hover transform
  const getHoverTransform = () => {
    if (screen.isDesktop) return 'translateY(-8px) scale(1.01)';
    return 'translateY(-4px)';
  };

  return {
    borderRadius: getBorderRadius(),
    transition: theme.transitions.create(['transform', 'box-shadow', 'border-color'], {
      duration: theme.transitions.duration.standard,
      easing: theme.transitions.easing.easeInOut
    }),
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[2],
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    animation: `fadeInUp 0.8s ease-out ${0.6 + index * 0.2}s both`,
    '&:hover': screen.isDesktop
      ? {
          transform: getHoverTransform(),
          boxShadow: theme.shadows[8],
          borderColor: theme.palette.primary.light
        }
      : {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[4]
        }
  };
};
