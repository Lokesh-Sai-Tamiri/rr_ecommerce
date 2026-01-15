/**
 * @fileoverview Custom hook for About section styles
 * Updated to use consolidated utilities from shared theme system
 */

import { useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  useScreenDetection,
  getAboutConfig,
  getAboutBackgroundStyles,
  getAboutCardStyles,
  getEnhancedAboutCardStyles,
  getTitleStyles,
  getSubtitleStyles
} from '../../utils';

/**
 * Enhanced About styles hook using consolidated utilities
 * Provides all necessary styles for About section components
 */
export const useAboutStyles = () => {
  const theme = useTheme();
  const screen = useScreenDetection();

  // Get consolidated configuration
  const config = useMemo(() => getAboutConfig(screen, theme), [screen, theme]);

  // Get background styles using consolidated utility
  const backgroundStyles = useMemo(() => getAboutBackgroundStyles(screen), [screen]);

  // Get company intro styles using consolidated utilities
  const companyIntroStyles = useMemo(
    () => ({
      title: getTitleStyles(screen, theme, { use3DEffects: true }),
      subtitle: getSubtitleStyles(screen, theme).sx
    }),
    [screen, theme]
  );

  // Get card styles using consolidated utility
  const getCardStyles = useMemo(() => getAboutCardStyles(screen, theme), [screen, theme]);

  // Get enhanced card styles (alternative with better visibility)
  const getEnhancedCardStyles = useMemo(() => getEnhancedAboutCardStyles(screen, theme), [screen, theme]);

  // Get shared subtitle styles (for consistency with other components)
  const sharedSubtitleStyles = useMemo(() => getSubtitleStyles(screen, theme, config), [screen, theme, config]);

  // Container and section styles
  const containerStyles = useMemo(
    () => ({
      py: theme.spacing(screen.isDesktop ? 8 : screen.isTablet ? 6 : 4),
      px: theme.spacing(screen.isDesktop ? 4 : screen.isTablet ? 3 : 2),
      minHeight: 'auto',
      position: 'relative' as const
    }),
    [screen, theme]
  );

  // Grid spacing for card layout
  const gridSpacing = useMemo(() => {
    if (screen.isDesktop) return 4;
    if (screen.isTablet) return 3;
    return 2;
  }, [screen]);

  return {
    // Configuration
    config,

    // Styles
    backgroundStyles,
    companyIntroStyles,
    containerStyles,
    sharedSubtitleStyles,

    // Card styles (choose one based on your preference)
    getCardStyles, // Standard card styles
    getEnhancedCardStyles, // Enhanced visibility card styles

    // Layout
    gridSpacing,

    // Utilities for convenience
    screen,
    theme,

    // Legacy compatibility
    fontSizes: config.fontSizes,
    getSubtitleVariant: () => sharedSubtitleStyles.variant
  };
};

/**
 * Simplified hook that returns only the essential styles
 * Recommended for new components that don't need legacy compatibility
 */
export const useAboutStylesSimple = () => {
  const theme = useTheme();
  const screen = useScreenDetection();

  return {
    config: getAboutConfig(screen, theme),
    backgroundStyles: getAboutBackgroundStyles(screen),
    getCardStyles: getAboutCardStyles(screen, theme),
    titleStyles: getTitleStyles(screen, theme, { use3DEffects: true }),
    subtitleStyles: getSubtitleStyles(screen, theme),
    screen,
    theme
  };
};

/**
 * Performance-optimized hook for card-specific styles
 * Use this when you only need card styles to avoid unnecessary re-renders
 */
export const useAboutCardStyles = () => {
  const theme = useTheme();
  const screen = useScreenDetection();

  return useMemo(
    () => ({
      getCardStyles: getAboutCardStyles(screen, theme),
      getEnhancedCardStyles: getEnhancedAboutCardStyles(screen, theme),
      fontSizes: getAboutConfig(screen, theme).fontSizes
    }),
    [screen, theme]
  );
};

// Export types
export type UseAboutStylesReturn = ReturnType<typeof useAboutStyles>;
export type UseAboutStylesSimpleReturn = ReturnType<typeof useAboutStylesSimple>;
export type UseAboutCardStylesReturn = ReturnType<typeof useAboutCardStyles>;
