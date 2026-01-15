/**
 * @fileoverview Centralized styling utilities for landing page components
 * Provides consistent styling functions and constants across all devices
 *
 * @author Radiant Research Team
 * @version 2.0.0
 */

import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/material';
import { ScreenDetection } from './screenUtils'; // Import the correct interface

// ============================================================================
// CONSTANTS
// ============================================================================

export const FONT_FAMILIES = {
  PRIMARY: '"Roboto", "Helvetica", "Arial", sans-serif',
  SECONDARY: '"Roboto Slab", serif',
  MONOSPACE: '"Roboto Mono", monospace'
};

export const FONT_WEIGHTS = {
  LIGHT: 300,
  REGULAR: 400,
  MEDIUM: 500,
  BOLD: 700,
  BLACK: 900
};

export const LINE_HEIGHTS = {
  TIGHT: 1.2,
  NORMAL: 1.5,
  RELAXED: 1.8
};

export const ANIMATIONS = {
  FADE_IN: 'fadeIn 0.6s ease-out',
  FADE_IN_UP: 'fadeInUp 0.8s ease-out',
  FADE_IN_UP_DELAYED: (delay: number) => `fadeInUp 0.8s ease-out ${delay}s both`,
  SLIDE_IN_LEFT: 'slideInLeft 0.6s ease-out',
  SLIDE_IN_RIGHT: 'slideInRight 0.6s ease-out',
  BOUNCE_IN: 'bounceIn 0.8s ease-out',
  TRANSITION_SMOOTH: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  TRANSITION_FAST: 'all 0.15s ease-out',
  HOVER_SCALE: 'transform 0.2s ease-in-out'
};

export const CSS_KEYFRAMES = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes bounceIn {
    0%, 20%, 40%, 60%, 80% {
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    0% {
      opacity: 0;
      transform: scale3d(0.3, 0.3, 0.3);
    }
    20% {
      transform: scale3d(1.1, 1.1, 1.1);
    }
    40% {
      transform: scale3d(0.9, 0.9, 0.9);
    }
    60% {
      opacity: 1;
      transform: scale3d(1.03, 1.03, 1.03);
    }
    80% {
      transform: scale3d(0.97, 0.97, 0.97);
    }
    100% {
      opacity: 1;
      transform: scale3d(1, 1, 1);
    }
  }
`;

export const SPACING_SCALE = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem'
};

// ============================================================================
// TYPES
// ============================================================================

export interface StyleOptions {
  use3DEffects?: boolean;
  textAlign?: 'left' | 'center' | 'right';
  customSpacing?: {
    marginLeft?: number;
    marginTop?: number;
    marginBottom?: number;
  };
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get responsive title styles based on screen size and theme
 */
export const getTitleStyles = (screen: ScreenDetection, theme: Theme, options: StyleOptions = {}): SxProps<Theme> => {
  const { use3DEffects = false, textAlign = 'center' } = options;

  const baseStyles: SxProps<Theme> = {
    fontFamily: FONT_FAMILIES.PRIMARY,
    fontWeight: FONT_WEIGHTS.BOLD,
    lineHeight: LINE_HEIGHTS.TIGHT,
    color: theme.palette.text.primary,
    textAlign,
    mb: 2,
    fontSize: {
      xs: screen.isMobile ? '1.75rem' : '2rem',
      sm: '2.25rem',
      md: '2.75rem',
      lg: '3rem'
    }
  };

  if (use3DEffects) {
    return {
      ...baseStyles,
      textShadow: theme.palette.mode === 'light' ? '2px 2px 4px rgba(0,0,0,0.1)' : '2px 2px 4px rgba(255,255,255,0.1)',
      background:
        theme.palette.mode === 'light'
          ? `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`
          : `linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      transition: ANIMATIONS.TRANSITION_SMOOTH
    };
  }

  return baseStyles;
};

/**
 * Get responsive subtitle styles based on screen size and theme
 */
export const getSubtitleStyles = (screen: ScreenDetection, theme: Theme, options: StyleOptions = {}): SxProps<Theme> => {
  const { textAlign = 'center', customSpacing } = options;

  return {
    fontFamily: FONT_FAMILIES.PRIMARY,
    fontWeight: FONT_WEIGHTS.REGULAR,
    lineHeight: LINE_HEIGHTS.NORMAL,
    color: theme.palette.text.secondary,
    textAlign,
    fontSize: {
      xs: screen.isMobile ? '0.9rem' : '1rem',
      sm: '1.125rem',
      md: '1.25rem'
    },
    transition: ANIMATIONS.TRANSITION_SMOOTH,
    ...(customSpacing && {
      ml: customSpacing.marginLeft || 0,
      mt: customSpacing.marginTop || 0,
      mb: customSpacing.marginBottom || 4
    })
  };
};

/**
 * Get card styles with hover effects
 */
export const getCardStyles = (
  screen: ScreenDetection,
  theme: Theme,
  options: { elevation?: number; hoverEffect?: boolean } = {}
): SxProps<Theme> => {
  const { elevation = 2, hoverEffect = true } = options;

  return {
    borderRadius: 2,
    boxShadow: theme.shadows[elevation],
    backgroundColor: theme.palette.background.paper,
    transition: ANIMATIONS.TRANSITION_SMOOTH,
    ...(hoverEffect && {
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.shadows[elevation + 2],
        '& .MuiCardContent-root': {
          '& .MuiTypography-h6': {
            color: theme.palette.primary.main
          }
        }
      }
    })
  };
};

/**
 * Get button styles with consistent theming
 */
export const getButtonStyles = (theme: Theme, variant: 'primary' | 'secondary' | 'outlined' = 'primary'): SxProps<Theme> => {
  const baseStyles = {
    fontFamily: FONT_FAMILIES.PRIMARY,
    fontWeight: FONT_WEIGHTS.MEDIUM,
    borderRadius: 2,
    textTransform: 'none' as const,
    transition: ANIMATIONS.TRANSITION_SMOOTH,
    px: 3,
    py: 1.5
  };

  switch (variant) {
    case 'primary':
      return {
        ...baseStyles,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
          transform: 'translateY(-2px)',
          boxShadow: theme.shadows[4]
        }
      };
    case 'secondary':
      return {
        ...baseStyles,
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        '&:hover': {
          backgroundColor: theme.palette.secondary.dark,
          transform: 'translateY(-2px)',
          boxShadow: theme.shadows[4]
        }
      };
    case 'outlined':
      return {
        ...baseStyles,
        backgroundColor: 'transparent',
        color: theme.palette.primary.main,
        border: `2px solid ${theme.palette.primary.main}`,
        '&:hover': {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          transform: 'translateY(-2px)',
          boxShadow: theme.shadows[4]
        }
      };
    default:
      return baseStyles;
  }
};

/**
 * Get section background styles
 */
export const getSectionBackgroundStyles = (theme: Theme, variant: 'default' | 'alternate' | 'gradient' = 'default'): SxProps<Theme> => {
  switch (variant) {
    case 'alternate':
      return {
        backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[50] : theme.palette.grey[900]
      };
    case 'gradient':
      return {
        background:
          theme.palette.mode === 'light'
            ? `linear-gradient(135deg, ${theme.palette.primary.light}10, ${theme.palette.secondary.light}10)`
            : `linear-gradient(135deg, ${theme.palette.primary.dark}20, ${theme.palette.secondary.dark}20)`
      };
    default:
      return {
        backgroundColor: theme.palette.background.default
      };
  }
};

/**
 * Get responsive spacing
 */
export const getResponsiveSpacing = (screen: ScreenDetection, baseSpacing: number = 4): number => {
  if (screen.isMobile) return baseSpacing * 0.75;
  if (screen.isTablet) return baseSpacing * 0.875;
  return baseSpacing;
};

/**
 * Get animation delay for staggered animations
 */
export const getAnimationDelay = (index: number, baseDelay: number = 0.1): string => {
  return `${baseDelay * index}s`;
};

/**
 * Apply CSS keyframes to document head
 */
export const applyCSSKeyframes = (): void => {
  if (typeof document !== 'undefined') {
    const styleElement = document.createElement('style');
    styleElement.textContent = CSS_KEYFRAMES;
    document.head.appendChild(styleElement);
  }
};

// ============================================================================
// RESPONSIVE UTILITIES
// ============================================================================

/**
 * Get responsive value based on screen detection
 */
export const getResponsiveValue = <T>(
  values: {
    mobile?: T;
    tablet?: T;
    desktop?: T;
    default: T;
  },
  screen: ScreenDetection
): T => {
  if (screen.isMobile && values.mobile !== undefined) return values.mobile;
  if (screen.isTablet && values.tablet !== undefined) return values.tablet;
  if (screen.isDesktop && values.desktop !== undefined) return values.desktop;
  return values.default;
};

/**
 * Get responsive font size
 */
export const getResponsiveFontSize = (
  screen: ScreenDetection,
  baseFontSize: string = '1rem'
): { xs: string; sm: string; md: string; lg: string } => {
  const base = parseFloat(baseFontSize);

  return {
    xs: `${base * 0.875}rem`,
    sm: `${base}rem`,
    md: `${base * 1.125}rem`,
    lg: `${base * 1.25}rem`
  };
};
