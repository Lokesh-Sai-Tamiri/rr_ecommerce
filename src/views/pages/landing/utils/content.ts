/**
 * @fileoverview Shared content styling utilities
 * Used by AboutCard.tsx and other content components
 */

import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/material/styles';
import { ScreenDetection, getMobileSizeWithFallback } from './screenUtils';
import { FONT_WEIGHTS, LINE_HEIGHTS } from './styleUtils';
import config from 'config';

/**
 * Content configuration interface
 */
export interface ContentConfig {
  fontSize: string;
  fontWeight: number;
  lineHeight: number;
  textAlign: 'left' | 'center' | 'right' | 'justify';
}

/**
 * Get content configuration based on screen detection
 */
export const getContentConfig = (screen: ScreenDetection): ContentConfig => {
  const mobileSize = getMobileSizeWithFallback(screen);

  // Responsive font sizing with mobile scaling
  let fontSize: string;
  if (screen.isDesktop) {
    fontSize = '1rem';
  } else if (screen.isTablet) {
    fontSize = '1rem';
  } else {
    // Mobile: scale based on mobile size
    if (mobileSize === 'small') {
      fontSize = '0.875rem'; // iPhone SE - smaller
    } else if (mobileSize === 'medium') {
      fontSize = '0.9rem'; // iPhone 12 Pro - standard
    } else if (mobileSize === 'large') {
      fontSize = '0.95rem'; // Large phones - closer to tablet
    } else {
      fontSize = '0.9rem'; // Default fallback
    }
  }

  // Responsive text alignment
  const textAlign: 'left' | 'center' | 'right' | 'justify' = screen.isMobile ? 'center' : 'justify';

  return {
    fontSize,
    fontWeight: FONT_WEIGHTS.REGULAR,
    lineHeight: LINE_HEIGHTS.RELAXED,
    textAlign
  };
};

/**
 * Get shared content styles for text content
 */
export const getSharedContentStyles = (
  screen: ScreenDetection,
  theme: Theme,
  options?: {
    fontSize?: string;
    fontWeight?: number;
    lineHeight?: number;
    textAlign?: 'left' | 'center' | 'right' | 'justify';
    color?: string;
    opacity?: number;
    flex?: number | string;
    customSpacing?: {
      margin?: number;
      padding?: number;
    };
  }
): SxProps<Theme> => {
  const contentConfig = getContentConfig(screen);

  return {
    color: options?.color || theme.palette.text.primary,
    fontSize: options?.fontSize || contentConfig.fontSize,
    fontWeight: options?.fontWeight || contentConfig.fontWeight,
    lineHeight: options?.lineHeight || contentConfig.lineHeight,
    fontFamily: config.fontFamily,
    textAlign: options?.textAlign || contentConfig.textAlign,
    opacity: options?.opacity || 0.9,
    flex: options?.flex || 1,
    ...(options?.customSpacing && {
      margin: options.customSpacing.margin ? theme.spacing(options.customSpacing.margin) : undefined,
      padding: options.customSpacing.padding ? theme.spacing(options.customSpacing.padding) : undefined
    })
  };
};

/**
 * Get AboutCard content styles (for AboutCard.tsx)
 */
export const getAboutCardContentStyles = (screen: ScreenDetection, theme: Theme): SxProps<Theme> => {
  return getSharedContentStyles(screen, theme, {
    textAlign: { xs: 'center', sm: 'justify' } as any,
    flex: 1
  });
};

/**
 * Get general card content styles
 */
export const getCardContentStyles = (
  screen: ScreenDetection,
  theme: Theme,
  options?: {
    centerOnMobile?: boolean;
    opacity?: number;
  }
): SxProps<Theme> => {
  const textAlign = options?.centerOnMobile !== false ? ({ xs: 'center', sm: 'justify' } as any) : 'justify';

  return getSharedContentStyles(screen, theme, {
    textAlign,
    opacity: options?.opacity || 0.9
  });
};

/**
 * Get description content styles (for general descriptions)
 */
export const getDescriptionStyles = (
  screen: ScreenDetection,
  theme: Theme,
  options?: {
    maxWidth?: string;
    textAlign?: 'left' | 'center' | 'right' | 'justify';
    fontSize?: string;
  }
): SxProps<Theme> => {
  const baseStyles = getSharedContentStyles(screen, theme, {
    textAlign: options?.textAlign,
    fontSize: options?.fontSize
  });

  return {
    ...baseStyles,
    ...(options?.maxWidth && {
      maxWidth: options.maxWidth,
      mx: options.textAlign === 'center' ? 'auto' : undefined
    })
  };
};

/**
 * Get body text styles (for general body content)
 */
export const getBodyTextStyles = (
  screen: ScreenDetection,
  theme: Theme,
  options?: {
    variant?: 'primary' | 'secondary';
    size?: 'small' | 'medium' | 'large';
  }
): SxProps<Theme> => {
  const config = getContentConfig(screen);

  // Size variations
  let fontSize = config.fontSize;
  if (options?.size === 'small') {
    fontSize = screen.isDesktop ? '0.875rem' : screen.isTablet ? '0.825rem' : '0.8rem';
  } else if (options?.size === 'large') {
    fontSize = screen.isDesktop ? '1.125rem' : screen.isTablet ? '1.075rem' : '1rem';
  }

  // Color variations
  const color = options?.variant === 'secondary' ? theme.palette.text.secondary : theme.palette.text.primary;

  return getSharedContentStyles(screen, theme, {
    fontSize,
    color
  });
};
