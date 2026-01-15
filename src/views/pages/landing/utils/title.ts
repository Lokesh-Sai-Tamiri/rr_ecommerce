/**
 * @fileoverview Shared title styling utilities
 * Used by HeroText.tsx, CompanyIntro.tsx, and other title components
 * Consolidated version with all title-related utilities
 */

import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/material/styles';
import { ScreenDetection, getMobileSizeWithFallback } from './screenUtils';

/**
 * Title configuration interface
 */
export interface TitleConfig {
  fontSizes: Record<string, string>;
  use3DEffects?: boolean;
  customAnimation?: {
    delay?: string;
    duration?: string;
  };
}

/**
 * Title style options interface
 */
interface TitleStyleOptions {
  heroLineHeight?: number;
  use3DEffects?: boolean;
  customAnimation?: {
    delay?: string;
    duration?: string;
  };
}

/**
 * Get shared title configuration based on screen detection
 */
export const getTitleConfig = (screen: ScreenDetection, theme: Theme): TitleConfig => {
  const mobileSize = getMobileSizeWithFallback(screen);

  // Create responsive font sizes
  let fontSizes: Record<string, string>;

  if (screen.isMobileLandscape) {
    fontSizes = {
      xs: (theme.typography.h4.fontSize as string) || '1.5rem',
      sm: (theme.typography.h3.fontSize as string) || '1.75rem'
    };
  } else if (screen.isDesktop) {
    fontSizes = {
      lg: (theme.typography.h1.fontSize as string) || '3rem',
      xl: '3.25rem'
    };
  } else {
    // Mobile scaling based on device size
    if (mobileSize === 'small') {
      fontSizes = {
        xs: '1.5rem',
        sm: '1.75rem'
      };
    } else if (mobileSize === 'medium') {
      fontSizes = {
        xs: '1.6rem',
        sm: '1.85rem'
      };
    } else if (mobileSize === 'large') {
      fontSizes = {
        xs: '1.75rem',
        sm: '2rem'
      };
    } else {
      fontSizes = {
        xs: '1.5rem',
        sm: '1.75rem'
      };
    }
  }

  return {
    fontSizes,
    use3DEffects: screen.isDesktop, // Enable 3D effects only on desktop
    customAnimation: {
      delay: screen.isDesktop ? '0.5s' : '0.4s',
      duration: '0.8s'
    }
  };
};

/**
 * Get shared title styles for both HeroText and CompanyIntro
 */
export const getSharedTitleStyles = (
  screen: ScreenDetection,
  theme: Theme,
  config?: {
    use3DEffects?: boolean;
    customAnimation?: {
      delay?: string;
      duration?: string;
    };
    lineHeight?: string | number;
    marginBottom?: number;
    textAlign?: 'left' | 'center' | 'right';
  }
): SxProps<Theme> => {
  const titleConfig = getTitleConfig(screen, theme);

  // Animation configuration
  const getAnimation = () => {
    const delay = config?.customAnimation?.delay || titleConfig.customAnimation?.delay || (screen.isDesktop ? '0.5s' : '0.4s');
    const duration = config?.customAnimation?.duration || titleConfig.customAnimation?.duration || '0.8s';
    return `fadeInUp ${duration} ease-out ${delay} both`;
  };

  return {
    fontSize: titleConfig.fontSizes,
    fontWeight: theme.typography.fontWeightBold || 700,
    fontFamily: theme.typography.fontFamily,
    lineHeight: config?.lineHeight || theme.typography.h1.lineHeight || 1.2,
    marginBottom: theme.spacing(config?.marginBottom || 2),
    color: theme.palette.text.primary,
    animation: getAnimation(),
    textAlign: config?.textAlign || 'left',
    position: 'relative',

    // 3D Effects (optional)
    ...(config?.use3DEffects &&
      titleConfig.use3DEffects && {
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
 * Get hero-specific title styles (for HeroText.tsx)
 */
export const getHeroTitleStyles = (screen: ScreenDetection, theme: Theme, options: TitleStyleOptions = {}): SxProps<Theme> => {
  const { heroLineHeight, use3DEffects, customAnimation } = options;

  return getSharedTitleStyles(screen, theme, {
    use3DEffects: use3DEffects,
    customAnimation: customAnimation,
    lineHeight: heroLineHeight,
    marginBottom: 0, // Hero text has custom margin handling
    textAlign: 'left'
  });
};

/**
 * Get company intro title styles (for CompanyIntro.tsx)
 */
export const getCompanyTitleStyles = (screen: ScreenDetection, theme: Theme, options: TitleStyleOptions = {}): SxProps<Theme> => {
  const { use3DEffects, customAnimation } = options;

  return getSharedTitleStyles(screen, theme, {
    use3DEffects: use3DEffects !== false, // Default to true for company intro
    customAnimation: customAnimation,
    marginBottom: 2,
    textAlign: 'center'
  });
};

/**
 * Get company subtitle styles - used by CompanyIntro and other subtitle components
 */
export const getCompanySubtitleStyles = (
  screen: ScreenDetection,
  theme: Theme,
  options: { contentIndent?: string | number } = {}
): { variant: string; sx: SxProps<Theme> } => {
  // Get mobile size and scaling configuration
  const mobileSize = getMobileSizeWithFallback(screen);

  // Get subtitle variant (same logic as Subtitle.tsx)
  const getSubtitleVariant = () => {
    if (screen.isDesktop) return 'subtitleLarge';
    return 'subtitleMedium';
  };

  // Get responsive font size based on mobile size
  const getFontSize = () => {
    if (screen.isDesktop || screen.isTablet) {
      return 'inherit'; // Use variant default
    }

    // Mobile: scale based on mobile size
    if (mobileSize === 'small') {
      return '0.875rem'; // iPhone SE
    } else if (mobileSize === 'medium') {
      return '0.9rem'; // iPhone 12 Pro
    } else if (mobileSize === 'large') {
      return '1rem'; // Large phones
    }

    return '0.875rem'; // Default fallback
  };

  // Calculate responsive spacing
  const getMarginLeft = () => {
    if (options.contentIndent) {
      return options.contentIndent;
    }
    return theme.spacing(screen.isDesktop ? 10 : screen.isTablet ? 8 : 6);
  };

  // Get responsive margin bottom based on mobile size
  const getMarginBottom = () => {
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

  // Get responsive margin top based on mobile size
  const getMarginTop = () => {
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
      lineHeight: 1.8,
      animation: getAnimation(),
      marginLeft: getMarginLeft(),
      fontSize: getFontSize()
    }
  };
};
