/**
 * @fileoverview Legacy compatibility layer for button styles
 * Provides backward compatibility while using centralized utilities
 *
 * @author Radiant Research Team
 * @version 2.0.0
 */

import { useScreenDetection, getButtonStyles as getCentralizedButtonStyles, type ScreenDetection } from '../../utils';

/**
 * Legacy device options interface (for backward compatibility)
 */
interface DeviceOptions {
  isSmallMobile?: boolean;
  isMediumMobile?: boolean;
  isTablet?: boolean;
  isLandscape?: boolean;
}

/**
 * Legacy button styles function (for backward compatibility)
 * Now uses centralized styling utilities
 */
export const getButtonStyles = (variant: 'contained' | 'outlined', options: DeviceOptions = {}) => {
  // Convert legacy options to screen detection format
  const mockScreen: ScreenDetection = {
    isDesktop: false,
    isTablet: options.isTablet || false,
    isMobile: !options.isTablet,
    isSmallMobile: options.isSmallMobile || false,
    isLandscape: options.isLandscape || false,
    isPortrait: !options.isLandscape,
    isMobileLandscape: (!options.isTablet && options.isLandscape) || false,
    isMobilePortrait: (!options.isTablet && !options.isLandscape) || false,
    isTabletLandscape: (options.isTablet && options.isLandscape) || false,
    isTabletPortrait: (options.isTablet && !options.isLandscape) || false,
    isIPhoneSE: false,
    isIPad: false,
    isIpadPro: false,
    isSmallHeight: options.isSmallMobile || false,
    isMediumHeight: options.isMediumMobile || false,
    deviceType: options.isTablet ? ('tablet' as any) : options.isSmallMobile ? ('small_mobile' as any) : ('mobile' as any),
    orientation: options.isLandscape ? ('landscape' as any) : ('portrait' as any),
    isMobileDevice: !options.isTablet,
    isTabletDevice: options.isTablet || false
  };

  // Map legacy variant names to new centralized variant names
  const variantMapping: Record<'contained' | 'outlined', 'filled' | 'transparent' | 'outlined'> = {
    contained: 'filled', // Legacy 'contained' maps to new 'filled'
    outlined: 'outlined' // Legacy 'outlined' stays 'outlined'
  };

  const mappedVariant = variantMapping[variant];

  return getCentralizedButtonStyles(mappedVariant, mockScreen);
};

/**
 * Legacy device detection hook (for backward compatibility)
 * Now uses centralized screen detection
 */
export const useDeviceDetection = () => {
  const screen = useScreenDetection();

  return {
    isLandscape: screen.isLandscape,
    isMobile: screen.isMobile,
    isTablet: screen.isTablet,
    isSmallMobile: screen.isSmallMobile,
    isMediumMobile: screen.isMediumHeight,
    isMobileDevice: screen.isMobileDevice,
    isMobilePortrait: screen.isMobilePortrait,
    isMobileLandscape: screen.isMobileLandscape,
    isTabletPortrait: screen.isTabletPortrait,
    isTabletLandscape: screen.isTabletLandscape
  };
};
