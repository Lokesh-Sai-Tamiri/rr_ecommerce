/**
 * @fileoverview Centralized screen detection utilities
 * Single source of truth for all device detection across the application
 */

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useMemo } from 'react';

/**
 * Device type enumeration
 */
export enum DeviceType {
  DESKTOP = 'desktop',
  TABLET = 'tablet',
  MOBILE = 'mobile',
  SMALL_MOBILE = 'small_mobile'
}

/**
 * Orientation enumeration
 */
export enum Orientation {
  PORTRAIT = 'portrait',
  LANDSCAPE = 'landscape'
}

/**
 * Mobile size enumeration
 */
export type MobileSize = 'small' | 'medium' | 'large';

/**
 * Screen breakpoints - single source of truth
 */
export const SCREEN_BREAKPOINTS = {
  // Width breakpoints
  SMALL_MOBILE_MAX: 375,
  MOBILE_MAX: 767,
  TABLET_MIN: 768,
  TABLET_MAX: 1024,
  DESKTOP_MIN: 1025,

  // Height breakpoints
  SMALL_HEIGHT_MAX: 740,
  MEDIUM_HEIGHT_MAX: 1000,

  // Specific devices
  IPHONE_SE_WIDTH: 375,
  IPHONE_SE_HEIGHT: 667,
  IPAD_MIN: 768,
  IPAD_MAX: 1024,
  IPAD_PRO_MIN: 1024, // iPad Pro starts at 1024px
  IPAD_PRO_MAX: 1366, // iPad Pro max width

  // Mobile size breakpoints
  MOBILE_SMALL_MAX: 375, // iPhone SE and similar
  MOBILE_MEDIUM_MAX: 414, // iPhone 12/13 Pro and similar
  MOBILE_LARGE_MAX: 480 // Large phones
} as const;

/**
 * Media query strings - centralized definitions
 */
export const MEDIA_QUERIES = {
  // Width-based
  SMALL_MOBILE: `(max-width: ${SCREEN_BREAKPOINTS.SMALL_MOBILE_MAX}px)`,
  MOBILE: `(max-width: ${SCREEN_BREAKPOINTS.MOBILE_MAX}px)`,
  TABLET: `(min-width: ${SCREEN_BREAKPOINTS.TABLET_MIN}px) and (max-width: ${SCREEN_BREAKPOINTS.TABLET_MAX}px)`,
  DESKTOP: `(min-width: ${SCREEN_BREAKPOINTS.DESKTOP_MIN}px)`,

  // Orientation
  LANDSCAPE: '(orientation: landscape)',
  PORTRAIT: '(orientation: portrait)',

  // Height-based
  SMALL_HEIGHT: `(max-height: ${SCREEN_BREAKPOINTS.SMALL_HEIGHT_MAX}px)`,
  MEDIUM_HEIGHT: `(min-height: ${SCREEN_BREAKPOINTS.SMALL_HEIGHT_MAX + 1}px) and (max-height: ${SCREEN_BREAKPOINTS.MEDIUM_HEIGHT_MAX}px)`,

  // Specific devices
  IPHONE_SE: `(max-width: ${SCREEN_BREAKPOINTS.IPHONE_SE_WIDTH}px) and (max-height: ${SCREEN_BREAKPOINTS.IPHONE_SE_HEIGHT}px)`,
  IPAD: `(min-device-width: ${SCREEN_BREAKPOINTS.IPAD_MIN}px) and (max-device-width: ${SCREEN_BREAKPOINTS.IPAD_MAX}px)`,
  IPAD_PRO: `(min-device-width: ${SCREEN_BREAKPOINTS.IPAD_PRO_MIN}px) and (max-device-width: ${SCREEN_BREAKPOINTS.IPAD_PRO_MAX}px) and (-webkit-min-device-pixel-ratio: 1.5)`,

  // Combined queries
  MOBILE_LANDSCAPE: `(max-width: ${SCREEN_BREAKPOINTS.TABLET_MIN - 1}px) and (orientation: landscape)`,
  TABLET_LANDSCAPE: `(min-width: ${SCREEN_BREAKPOINTS.TABLET_MIN}px) and (max-width: ${SCREEN_BREAKPOINTS.TABLET_MAX}px) and (orientation: landscape)`,
  TABLET_PORTRAIT: `(min-width: ${SCREEN_BREAKPOINTS.TABLET_MIN}px) and (max-width: ${SCREEN_BREAKPOINTS.TABLET_MAX}px) and (orientation: portrait)`,

  // Mobile size queries
  MOBILE_SMALL: `(max-width: ${SCREEN_BREAKPOINTS.MOBILE_SMALL_MAX}px)`,
  MOBILE_MEDIUM: `(min-width: ${SCREEN_BREAKPOINTS.MOBILE_SMALL_MAX + 1}px) and (max-width: ${SCREEN_BREAKPOINTS.MOBILE_MEDIUM_MAX}px)`,
  MOBILE_LARGE: `(min-width: ${SCREEN_BREAKPOINTS.MOBILE_MEDIUM_MAX + 1}px) and (max-width: ${SCREEN_BREAKPOINTS.MOBILE_LARGE_MAX}px)`
} as const;

/**
 * Complete screen detection interface
 */
export interface ScreenDetection {
  // Device types
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
  isSmallMobile: boolean;

  // Orientations
  isLandscape: boolean;
  isPortrait: boolean;

  // Combined detections - MODIFIED: Mobile landscape treated as portrait
  isMobileLandscape: boolean; // This will be false for mobile devices
  isMobilePortrait: boolean; // This will be true for all mobile devices
  isTabletLandscape: boolean;
  isTabletPortrait: boolean;

  // Specific devices
  isIPhoneSE: boolean;
  isIPad: boolean;
  isIpadPro: boolean;

  // Height-based
  isSmallHeight: boolean;
  isMediumHeight: boolean;

  // Enums
  deviceType: DeviceType;
  orientation: Orientation; // MODIFIED: Always portrait for mobile

  // Legacy compatibility
  isMobileDevice: boolean;
  isTabletDevice: boolean;
}

/**
 * Get mobile size category based on screen detection and viewport width
 * This is the main function - use this one
 */
export const getMobileSize = (screen: ScreenDetection): MobileSize | 'desktop' => {
  if (screen.isDesktop || screen.isTablet) return 'desktop';
  if (!screen.isMobile) return 'desktop';

  // For mobile devices, use viewport width to differentiate sizes
  if (typeof window !== 'undefined') {
    const width = window.innerWidth;
    // Fix the logic - check from largest to smallest
    if (width > SCREEN_BREAKPOINTS.MOBILE_MEDIUM_MAX && width <= SCREEN_BREAKPOINTS.MOBILE_LARGE_MAX) return 'large'; // 415-480px
    if (width > SCREEN_BREAKPOINTS.MOBILE_SMALL_MAX && width <= SCREEN_BREAKPOINTS.MOBILE_MEDIUM_MAX) return 'medium'; // 376-414px
    if (width <= SCREEN_BREAKPOINTS.MOBILE_SMALL_MAX) return 'small'; // ≤375px
  }

  // Fallback to existing screen detection
  if (screen.isSmallMobile) return 'small';
  return 'medium'; // Default for other mobile devices
};

/**
 * Get mobile size with enhanced fallback detection
 * Use this when you need extra robust mobile detection
 */
export const getMobileSizeWithFallback = (screen: any): MobileSize | 'desktop' => {
  // First try the main utility function
  const utilityResult = getMobileSize(screen);
  if (utilityResult !== 'desktop') return utilityResult;

  // Fallback: check if we're actually on mobile but utility didn't detect it
  if (typeof window !== 'undefined') {
    const width = window.innerWidth;
    if (width <= 767) {
      // Mobile breakpoint
      // Fix the logic - check from largest to smallest
      if (width > 414 && width <= 480) return 'large'; // 415-480px
      if (width > 375 && width <= 414) return 'medium'; // 376-414px
      if (width <= 375) return 'small'; // ≤375px
      return 'medium'; // Default fallback
    }
  }
  return 'desktop';
};

/**
 * Mobile scaling configuration
 */
export const getMobileScaling = (mobileSize: MobileSize | 'desktop') => {
  if (mobileSize === 'desktop') return null;

  const scalingMap = {
    small: {
      padding: '2px 0px',
      fontSize: '0.875rem',
      iconMargin: 0.5,
      buttonSize: 'compact' as const,
      iconSize: '0.875rem'
    },
    medium: {
      padding: '2px 0px',
      fontSize: '1rem',
      iconMargin: 0.75,
      buttonSize: 'small' as const,
      iconSize: '1rem'
    },
    large: {
      padding: '2px 0px',
      fontSize: '1.125rem',
      iconMargin: 1,
      buttonSize: 'medium' as const,
      iconSize: '1.125rem'
    }
  };

  return scalingMap[mobileSize];
};

/**
 * Main screen detection hook - USE THIS EVERYWHERE
 * MODIFIED: Mobile landscape is treated as portrait for consistent styling
 */
export const useScreenDetection = (): ScreenDetection => {
  // Basic detection
  const isDesktop = useMediaQuery(MEDIA_QUERIES.DESKTOP);
  const isTabletByWidth = useMediaQuery(MEDIA_QUERIES.TABLET);
  const isSmallMobile = useMediaQuery(MEDIA_QUERIES.SMALL_MOBILE);
  const isLandscape = useMediaQuery(MEDIA_QUERIES.LANDSCAPE);
  const isPortrait = useMediaQuery(MEDIA_QUERIES.PORTRAIT);

  // Specific devices
  const isIPhoneSE = useMediaQuery(MEDIA_QUERIES.IPHONE_SE);
  const isIPadByScreen = useMediaQuery(MEDIA_QUERIES.IPAD);
  const isIPadProByScreen = useMediaQuery(MEDIA_QUERIES.IPAD_PRO);

  // Height-based
  const isSmallHeight = useMediaQuery(MEDIA_QUERIES.SMALL_HEIGHT);
  const isMediumHeight = useMediaQuery(MEDIA_QUERIES.MEDIUM_HEIGHT);

  // Combined detection
  // Enhanced mobile detection - include landscape phones with small height
  const isMobileLandscapePhone = !isDesktop && isLandscape && typeof window !== 'undefined' && window.innerHeight <= 450;

  // Combined detection with mobile landscape fix
  const isTablet = !isDesktop && !isMobileLandscapePhone && (isTabletByWidth || isIPadByScreen || isIPadProByScreen);
  const isMobile = !isDesktop && !isTablet;

  return useMemo(() => {
    // Determine device type
    let deviceType: DeviceType;
    if (isDesktop) {
      deviceType = DeviceType.DESKTOP;
    } else if (isTablet) {
      deviceType = DeviceType.TABLET;
    } else if (isSmallMobile) {
      deviceType = DeviceType.SMALL_MOBILE;
    } else {
      deviceType = DeviceType.MOBILE;
    }

    // MODIFIED: Force mobile orientation to always be portrait for styling consistency
    const orientation = isMobile ? Orientation.PORTRAIT : isLandscape ? Orientation.LANDSCAPE : Orientation.PORTRAIT;

    return {
      // Device types
      isDesktop,
      isTablet,
      isMobile,
      isSmallMobile,

      // Orientations - MODIFIED: Mobile always reports portrait
      isLandscape: isMobile ? false : isLandscape, // Mobile always false
      isPortrait: isMobile ? true : isPortrait, // Mobile always true

      // Combined - MODIFIED: Mobile landscape treated as portrait
      isMobileLandscape: false, // Always false - no mobile landscape styling
      isMobilePortrait: isMobile, // All mobile devices use portrait styling
      isTabletLandscape: isTablet && isLandscape,
      isTabletPortrait: isTablet && isPortrait,

      // Specific devices
      isIPhoneSE,
      isIPad: isIPadByScreen,
      isIpadPro: isIPadProByScreen,

      // Height-based
      isSmallHeight,
      isMediumHeight,

      // Enums
      deviceType,
      orientation,

      // Legacy
      isMobileDevice: isMobile,
      isTabletDevice: isTablet
    };
  }, [
    isDesktop,
    isTablet,
    isMobile,
    isSmallMobile,
    isLandscape,
    isPortrait,
    isIPhoneSE,
    isIPadByScreen,
    isIPadProByScreen,
    isSmallHeight,
    isMediumHeight
  ]);
};

/**
 * Theme-based detection hook (for MUI theme integration)
 */
export const useThemeBasedDetection = () => {
  const theme = useTheme();
  const isMobileByTheme = useMediaQuery(theme.breakpoints.down('sm'));
  const isTabletByTheme = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktopByTheme = useMediaQuery(theme.breakpoints.up('md'));

  return useMemo(
    () => ({
      isMobileByTheme,
      isTabletByTheme,
      isDesktopByTheme
    }),
    [isMobileByTheme, isTabletByTheme, isDesktopByTheme]
  );
};

/**
 * Get responsive value based on device type
 */
export const getResponsiveValue = <T>(
  values: {
    desktop?: T;
    tablet?: T;
    mobile?: T;
    smallMobile?: T;
    default: T;
  },
  screen: ScreenDetection
): T => {
  if (screen.isDesktop && values.desktop !== undefined) return values.desktop;
  if (screen.isTablet && values.tablet !== undefined) return values.tablet;
  if (screen.isSmallMobile && values.smallMobile !== undefined) return values.smallMobile;
  if (screen.isMobile && values.mobile !== undefined) return values.mobile;
  return values.default;
};

/**
 * Get responsive value based on mobile size
 */
export const getResponsiveValueByMobileSize = <T>(
  values: {
    desktop?: T;
    tablet?: T;
    mobileSmall?: T;
    mobileMedium?: T;
    mobileLarge?: T;
    default: T;
  },
  screen: ScreenDetection
): T => {
  if (screen.isDesktop && values.desktop !== undefined) return values.desktop;
  if (screen.isTablet && values.tablet !== undefined) return values.tablet;

  const mobileSize = getMobileSize(screen);
  if (mobileSize === 'small' && values.mobileSmall !== undefined) return values.mobileSmall;
  if (mobileSize === 'medium' && values.mobileMedium !== undefined) return values.mobileMedium;
  if (mobileSize === 'large' && values.mobileLarge !== undefined) return values.mobileLarge;

  return values.default;
};

/**
 * UTILITY: Check if device is actually in landscape (for internal use)
 * Use this only when you need the actual orientation, not for styling
 */
export const getActualOrientation = (): 'landscape' | 'portrait' => {
  if (typeof window !== 'undefined') {
    return window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
  }
  return 'portrait';
};

/**
 * UTILITY: Get actual device orientation without mobile override
 * Use this for debugging or when you need real orientation data
 */
export const getActualScreenDetection = (): Partial<ScreenDetection> => {
  const actualIsLandscape = getActualOrientation() === 'landscape';
  const actualIsPortrait = !actualIsLandscape;

  return {
    isLandscape: actualIsLandscape,
    isPortrait: actualIsPortrait,
    orientation: actualIsLandscape ? Orientation.LANDSCAPE : Orientation.PORTRAIT
  };
};

/**
 * UTILITY: Force mobile to use portrait styles regardless of orientation
 * This is the main function that enforces mobile landscape = mobile portrait
 */
export const getNormalizedScreenForMobile = (screen: ScreenDetection): ScreenDetection => {
  if (!screen.isMobile) {
    return screen; // Don't modify tablet/desktop behavior
  }

  // For mobile devices, force portrait-like behavior
  return {
    ...screen,
    isLandscape: false, // Always false for mobile
    isPortrait: true, // Always true for mobile
    isMobileLandscape: false, // Never true
    isMobilePortrait: true, // Always true for mobile
    orientation: Orientation.PORTRAIT // Always portrait for mobile
  };
};

/**
 * UTILITY: Get mobile-optimized breakpoints
 * Returns breakpoints that treat mobile landscape same as portrait
 */
export const getMobileOptimizedBreakpoints = () => ({
  // These breakpoints ignore orientation for mobile
  isMobileAny: `(max-width: ${SCREEN_BREAKPOINTS.MOBILE_MAX}px)`, // Any mobile, any orientation
  isTabletAny: `(min-width: ${SCREEN_BREAKPOINTS.TABLET_MIN}px) and (max-width: ${SCREEN_BREAKPOINTS.TABLET_MAX}px)`, // Any tablet, any orientation
  isDesktopAny: `(min-width: ${SCREEN_BREAKPOINTS.DESKTOP_MIN}px)`, // Desktop

  // Orientation-specific for tablets and desktop only
  isTabletLandscapeOnly: `(min-width: ${SCREEN_BREAKPOINTS.TABLET_MIN}px) and (max-width: ${SCREEN_BREAKPOINTS.TABLET_MAX}px) and (orientation: landscape)`,
  isTabletPortraitOnly: `(min-width: ${SCREEN_BREAKPOINTS.TABLET_MIN}px) and (max-width: ${SCREEN_BREAKPOINTS.TABLET_MAX}px) and (orientation: portrait)`
});

/**
 * HOOK: Enhanced screen detection with mobile normalization
 * Use this when you want to ensure mobile landscape = mobile portrait
 */
export const useNormalizedScreenDetection = (): ScreenDetection => {
  const screen = useScreenDetection();
  return useMemo(() => getNormalizedScreenForMobile(screen), [screen]);
};

/**
 * UTILITY: Debug function to see actual vs normalized screen detection
 * Use this for troubleshooting orientation issues
 */
export const debugScreenDetection = (screen: ScreenDetection) => {
  const actual = getActualScreenDetection();
  const normalized = getNormalizedScreenForMobile(screen);

  console.group('Screen Detection Debug');
  console.log('Actual Orientation:', actual.orientation);
  console.log('Reported Orientation:', screen.orientation);
  console.log('Normalized Orientation:', normalized.orientation);
  console.log('Is Mobile:', screen.isMobile);
  console.log('Actual isLandscape:', actual.isLandscape);
  console.log('Reported isLandscape:', screen.isLandscape);
  console.log('Normalized isLandscape:', normalized.isLandscape);
  console.groupEnd();

  return { actual, reported: screen, normalized };
};

/**
 * UTILITY: Get viewport dimensions
 * Useful for debugging and custom responsive logic
 */
export const getViewportDimensions = () => {
  if (typeof window === 'undefined') {
    return { width: 0, height: 0, ratio: 1 };
  }

  const width = window.innerWidth;
  const height = window.innerHeight;
  const ratio = width / height;

  return { width, height, ratio };
};

/**
 * UTILITY: Determine if current viewport should use mobile styles
 * This is the definitive function for "should I use mobile styles?"
 */
export const shouldUseMobileStyles = (screen: ScreenDetection): boolean => {
  return screen.isMobile; // Simple - if it's mobile, use mobile styles regardless of orientation
};

/**
 * UTILITY: Determine if current viewport should use tablet styles
 * Tablets can have different styles for landscape vs portrait
 */
export const shouldUseTabletStyles = (screen: ScreenDetection): 'landscape' | 'portrait' | false => {
  if (!screen.isTablet) return false;
  return screen.isLandscape ? 'landscape' : 'portrait';
};

/**
 * UTILITY: Get consistent mobile size regardless of orientation
 * This ensures mobile landscape and portrait use the same size classification
 */
export const getMobileSizeNormalized = (screen: ScreenDetection): MobileSize | 'desktop' => {
  const normalizedScreen = getNormalizedScreenForMobile(screen);
  return getMobileSize(normalizedScreen);
};

/**
 * UTILITY: Get responsive font size that treats mobile landscape as portrait
 * Use this in your theme utilities
 */
export const getResponsiveFontSize = (
  screen: ScreenDetection,
  sizes: {
    desktop: string;
    tablet: string;
    mobile: string;
  }
): string => {
  if (screen.isDesktop) return sizes.desktop;
  if (screen.isTablet) return sizes.tablet;
  if (screen.isMobile) return sizes.mobile; // Same for both orientations
  return sizes.mobile; // Fallback
};

/**
 * UTILITY: Get responsive spacing that treats mobile landscape as portrait
 * Use this in your theme utilities
 */
export const getResponsiveSpacing = (
  screen: ScreenDetection,
  spacing: {
    desktop: number;
    tablet: number;
    mobile: number;
  }
): number => {
  if (screen.isDesktop) return spacing.desktop;
  if (screen.isTablet) return spacing.tablet;
  if (screen.isMobile) return spacing.mobile; // Same for both orientations
  return spacing.mobile; // Fallback
};
