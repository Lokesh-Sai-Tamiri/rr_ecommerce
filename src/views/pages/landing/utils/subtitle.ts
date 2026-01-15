/**
 * @fileoverview Subtitle utilities for consistent subtitle styling
 * Consolidated subtitle configuration and styling functions
 */

import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/material/styles';
import { ScreenDetection, getMobileSizeWithFallback, getMobileScaling } from './screenUtils';

// ============================================================================
// INTERFACES & TYPES
// ============================================================================

/**
 * Subtitle configuration interface
 */
export interface SubtitleConfig {
  variant: string;
  fontSize: string;
  animation: string;
  contentIndent: string | number;
}

/**
 * Subtitle options interface
 */
export interface SubtitleOptions {
  customSpacing?: {
    marginBottom?: number;
    marginTop?: number;
    marginLeft?: number;
  };
  customAnimation?: {
    delay?: string;
    duration?: string;
  };
  textAlign?: 'left' | 'center' | 'right';
  contentIndent?: string | number;
  maxWidth?: string;
}

// ============================================================================
// CORE SUBTITLE UTILITIES
// ============================================================================

/**
 * Get subtitle configuration based on screen detection
 * Core configuration function used by all subtitle components
 */
export const getSubtitleConfig = (screen: ScreenDetection, theme: Theme): SubtitleConfig => {
  const mobileSize = getMobileSizeWithFallback(screen);
  const mobileScaling = getMobileScaling(mobileSize);

  // Get subtitle variant
  const variant = screen.isDesktop ? 'subtitleLarge' : 'subtitleMedium';

  // Get responsive font size
  const fontSize =
    screen.isDesktop || screen.isTablet
      ? 'inherit' // Use variant default
      : mobileScaling?.fontSize || '0.875rem';

  // Animation configuration
  const animationDuration = screen.isDesktop ? '0.8s' : '0.6s';
  const animationDelay = screen.isDesktop ? '0.5s' : '0.4s';
  const animation = `fadeInUp ${animationDuration} ease-out ${animationDelay} both`;

  // Content indent
  const contentIndent = theme.spacing(screen.isDesktop ? 10 : screen.isTablet ? 8 : 6);

  return {
    variant,
    fontSize,
    animation,
    contentIndent
  };
};

/**
 * Get responsive spacing based on mobile size
 */
export const getSubtitleSpacing = (
  screen: ScreenDetection,
  theme: Theme,
  customSpacing?: {
    marginBottom?: number;
    marginTop?: number;
    marginLeft?: number;
  }
) => {
  const mobileSize = getMobileSizeWithFallback(screen);

  // Get responsive margin bottom
  const getMarginBottom = () => {
    if (customSpacing?.marginBottom !== undefined) {
      return theme.spacing(customSpacing.marginBottom);
    }

    if (screen.isDesktop) {
      return theme.spacing(4);
    }

    if (screen.isTablet) {
      return theme.spacing(1);
    }

    // Mobile: scale based on mobile size
    if (mobileSize === 'small') {
      return theme.spacing(0); // iPhone SE - keep minimal
    } else if (mobileSize === 'medium') {
      return theme.spacing(0.5); // iPhone 12 Pro - slightly more
    } else if (mobileSize === 'large') {
      return theme.spacing(1); // Large phones - more spacing
    }

    return theme.spacing(0); // Default fallback
  };

  // Get responsive margin top
  const getMarginTop = () => {
    if (customSpacing?.marginTop !== undefined) {
      return theme.spacing(customSpacing.marginTop);
    }

    if (screen.isDesktop || screen.isTablet) {
      return theme.spacing(1);
    }

    // Mobile: scale based on mobile size
    if (mobileSize === 'small') {
      return theme.spacing(0); // iPhone SE - keep minimal
    } else if (mobileSize === 'medium') {
      return theme.spacing(0.5); // iPhone 12 Pro - slightly more
    } else if (mobileSize === 'large') {
      return theme.spacing(1); // Large phones - more spacing
    }

    return theme.spacing(0); // Default fallback
  };

  // Get responsive margin left
  const getMarginLeft = () => {
    if (customSpacing?.marginLeft !== undefined) {
      return theme.spacing(customSpacing.marginLeft);
    }
    // Use default content indent
    return undefined; // Will be handled by individual components
  };

  return {
    marginBottom: getMarginBottom(),
    marginTop: getMarginTop(),
    marginLeft: getMarginLeft()
  };
};

/**
 * Get shared subtitle styles for all subtitle components
 * Main subtitle styling function - use this for consistency
 */
export const getSharedSubtitleStyles = (screen: ScreenDetection, theme: Theme, options: SubtitleOptions = {}) => {
  const { customSpacing, customAnimation, textAlign = 'left', contentIndent, maxWidth } = options;
  const config = getSubtitleConfig(screen, theme);
  const spacing = getSubtitleSpacing(screen, theme, customSpacing);

  // Custom animation override
  const getAnimation = () => {
    if (customAnimation) {
      const delay = customAnimation.delay || (screen.isDesktop ? '0.5s' : '0.4s');
      const duration = customAnimation.duration || '0.8s';
      return `fadeInUp ${duration} ease-out ${delay} both`;
    }
    return config.animation;
  };

  // Calculate margin left
  const getMarginLeft = () => {
    if (spacing.marginLeft !== undefined) {
      return spacing.marginLeft;
    }
    if (contentIndent !== undefined) {
      return contentIndent;
    }
    if (textAlign === 'center') {
      return 'auto';
    }
    return config.contentIndent;
  };

  return {
    variant: config.variant,
    sx: {
      mb: spacing.marginBottom,
      mt: spacing.marginTop,
      marginLeft: getMarginLeft(),
      color: theme.palette.text.primary,
      lineHeight: 1.8,
      animation: getAnimation(),
      fontSize: config.fontSize,
      textAlign,
      fontFamily: theme.typography.fontFamily,
      fontWeight: theme.typography.fontWeightMedium || 500,
      ...(maxWidth && {
        maxWidth,
        mx: textAlign === 'center' ? 'auto' : undefined
      })
    } as SxProps<Theme>
  };
};

/**
 * Get text section subtitle styles (for Subtitle.tsx)
 */
export const getTextSectionSubtitleStyles = (
  screen: ScreenDetection,
  theme: Theme,
  customSpacing?: {
    marginBottom?: number;
    marginTop?: number;
    marginLeft?: number;
  },
  customAnimation?: {
    delay?: string;
    duration?: string;
  },
  contentIndent?: string | number
) => {
  return getSharedSubtitleStyles(screen, theme, {
    customSpacing,
    customAnimation,
    textAlign: 'left',
    contentIndent
  });
};

/**
 * Get company intro subtitle styles (for CompanyIntro.tsx)
 */
export const getCompanySubtitleStyles = (
  screen: ScreenDetection,
  theme: Theme,
  customAnimation?: {
    delay?: string;
    duration?: string;
  }
) => {
  return getSharedSubtitleStyles(screen, theme, {
    customSpacing: {
      marginLeft: 0, // Center align for company intro
      marginBottom: 0,
      marginTop: 0
    },
    customAnimation,
    textAlign: 'center',
    maxWidth: '850px'
  });
};

/**
 * Get subtitle styles with enhanced mobile scaling
 * Advanced version with better mobile device support
 */
export const getEnhancedSubtitleStyles = (
  screen: ScreenDetection,
  theme: Theme,
  options: SubtitleOptions & {
    enableMobileScaling?: boolean;
    mobileScaleFactor?: number;
  } = {}
) => {
  const { enableMobileScaling = true, mobileScaleFactor = 1, ...baseOptions } = options;
  const mobileSize = getMobileSizeWithFallback(screen);
  const mobileScaling = getMobileScaling(mobileSize);

  // Enhanced mobile font size calculation
  const getEnhancedFontSize = () => {
    if (screen.isDesktop || screen.isTablet) {
      return 'inherit';
    }

    if (!enableMobileScaling) {
      return '0.875rem'; // Default fallback
    }

    // Apply mobile scaling with custom factor
    const baseFontSize = parseFloat(mobileScaling?.fontSize || '0.875rem');
    const scaledSize = baseFontSize * mobileScaleFactor;
    return `${scaledSize}rem`;
  };

  // Get base styles
  const baseStyles = getSharedSubtitleStyles(screen, theme, baseOptions);

  // Override font size with enhanced calculation
  return {
    ...baseStyles,
    sx: {
      ...baseStyles.sx,
      fontSize: getEnhancedFontSize()
    }
  };
};

/**
 * Get subtitle styles for specific use cases
 */
export const getSubtitleStylesForUseCase = (
  useCase: 'hero' | 'about' | 'section' | 'card',
  screen: ScreenDetection,
  theme: Theme,
  options: SubtitleOptions = {}
) => {
  const useCaseConfigs = {
    hero: {
      textAlign: 'left' as const,
      customAnimation: { delay: '0.5s', duration: '0.8s' }
    },
    about: {
      textAlign: 'center' as const,
      maxWidth: '850px',
      customSpacing: { marginLeft: 0 }
    },
    section: {
      textAlign: 'left' as const,
      customSpacing: { marginBottom: 3 }
    },
    card: {
      textAlign: 'center' as const,
      customSpacing: { marginBottom: 2, marginTop: 1 }
    }
  };

  const useCaseConfig = useCaseConfigs[useCase] || {};
  const mergedOptions = { ...useCaseConfig, ...options };

  return getSharedSubtitleStyles(screen, theme, mergedOptions);
};

/**
 * Get responsive subtitle line height
 */
export const getSubtitleLineHeight = (screen: ScreenDetection): number => {
  const mobileSize = getMobileSizeWithFallback(screen);

  if (screen.isDesktop) return 1.8;
  if (screen.isTablet) return 1.7;

  // Mobile: scale based on mobile size
  if (mobileSize === 'small') return 1.6; // Tighter for small screens
  if (mobileSize === 'medium') return 1.65;
  if (mobileSize === 'large') return 1.7;

  return 1.6; // Default fallback
};

/**
 * Get responsive subtitle max width
 */
export const getSubtitleMaxWidth = (screen: ScreenDetection): string => {
  const mobileSize = getMobileSizeWithFallback(screen);

  if (screen.isDesktop) return '850px';
  if (screen.isTablet) return '700px';

  // Mobile: scale based on mobile size
  if (mobileSize === 'small') return '100%'; // Full width for small screens
  if (mobileSize === 'medium') return '90%';
  if (mobileSize === 'large') return '85%';

  return '100%'; // Default fallback
};

/**
 * Utility to check if subtitle should use center alignment
 */
export const shouldUseCenterAlignment = (screen: ScreenDetection, context: 'hero' | 'about' | 'section' = 'section'): boolean => {
  switch (context) {
    case 'hero':
      return false; // Hero subtitles are always left-aligned
    case 'about':
      return true; // About subtitles are always center-aligned
    case 'section':
      return screen.isMobile; // Section subtitles center on mobile
    default:
      return false;
  }
};

/**
 * Get subtitle animation delay based on context
 */
export const getSubtitleAnimationDelay = (
  screen: ScreenDetection,
  context: 'hero' | 'about' | 'section' = 'section',
  index: number = 0
): string => {
  const baseDelay = screen.isDesktop ? 0.5 : 0.4;

  switch (context) {
    case 'hero':
      return `${baseDelay}s`;
    case 'about':
      return `${baseDelay + 0.3}s`; // Slightly delayed after title
    case 'section':
      return `${baseDelay + index * 0.1}s`; // Staggered for multiple sections
    default:
      return `${baseDelay}s`;
  }
};
