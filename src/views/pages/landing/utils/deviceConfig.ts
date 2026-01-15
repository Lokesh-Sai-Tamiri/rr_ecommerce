/**
 * @fileoverview Device configuration utilities
 * Centralized device-specific configuration logic
 */

import { LINE_HEIGHTS } from './styleUtils';
import type { ScreenDetection } from './screenUtils';

export interface DeviceConfig {
  useContainer: boolean;
  containerWidth: string;
  layoutDirection: 'row' | 'column';
  width: string;
  useSplitLayout: boolean;
  heroVariant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  heroFontSize: string | Record<string, string>;
  subtitleFontSize: string | Record<string, string>;
  heroLineHeight: number;
  contentIndent: string;
  lineWidth: string;
  lineLeft: string;
  buttonGap: number;
  buttonDirection: 'row' | 'column';
  buttonSize: 'small' | 'medium' | 'large';
  useParallax: boolean;
  use3DEffects: boolean;
  useHoverEffects: boolean;
  // Add the missing property from LeftTextSection
  subtitleVariant: 'h6' | 'subtitle1' | 'subtitle2';
}

export function getDeviceConfig(screen: ScreenDetection | any): DeviceConfig {
  if (screen.isDesktop) {
    return {
      useContainer: false,
      containerWidth: '50%',
      layoutDirection: 'row',
      width: '100%',
      useSplitLayout: false,
      heroVariant: 'h1',
      heroFontSize: { md: '2.75rem', lg: '3.25rem', xl: '3.75rem' },
      subtitleFontSize: { md: '1.125rem', lg: '1.25rem' },
      heroLineHeight: LINE_HEIGHTS.TIGHT,
      contentIndent: '3rem',
      lineWidth: '60px',
      lineLeft: '-80px',
      buttonGap: 24, // 1.5rem * 16
      buttonDirection: 'row',
      buttonSize: 'large',
      useParallax: true,
      use3DEffects: true,
      useHoverEffects: true,
      subtitleVariant: 'h6'
    };
  }

  if (screen.isTablet) {
    return {
      useContainer: true,
      containerWidth: 'lg',
      layoutDirection: 'row',
      width: '100%',
      useSplitLayout: true,
      heroVariant: 'h2',
      heroFontSize: screen.isLandscape ? { xs: '1.4rem', sm: '1.6rem', md: '1.8rem' } : { xs: '1.75rem', sm: '2rem', md: '2.125rem' },
      subtitleFontSize: screen.isLandscape ? { xs: '0.8rem', sm: '0.9rem', md: '1rem' } : { xs: '1rem', sm: '1.125rem', md: '1.1875rem' },
      heroLineHeight: LINE_HEIGHTS.TIGHT,
      contentIndent: screen.isLandscape ? '1.5rem' : '2rem',
      lineWidth: screen.isLandscape ? '40px' : '50px',
      lineLeft: screen.isLandscape ? '-50px' : '-60px',
      buttonGap: 16, // 1rem * 16
      buttonDirection: 'column',
      buttonSize: 'medium',
      useParallax: false,
      use3DEffects: false,
      useHoverEffects: false,
      subtitleVariant: 'h6'
    };
  }

  // Mobile configuration
  return {
    useContainer: screen.isLandscape,
    containerWidth: 'md',
    layoutDirection: 'column',
    width: '100%',
    useSplitLayout: false,
    heroVariant: screen.isSmallMobile ? (screen.isLandscape ? 'h4' : 'h3') : 'h2',
    heroFontSize: screen.isSmallMobile
      ? screen.isLandscape
        ? { xs: '1.2rem' }
        : { xs: '1.75rem' }
      : screen.isLandscape
        ? { xs: '1.5rem', sm: '1.75rem' }
        : { xs: '2rem', sm: '2.5rem' },
    subtitleFontSize: screen.isSmallMobile
      ? screen.isLandscape
        ? { xs: '0.65rem' }
        : { xs: '0.875rem' }
      : screen.isLandscape
        ? { xs: '0.8rem', sm: '0.9rem' }
        : { xs: '1rem', sm: '1.125rem' },
    heroLineHeight: screen.isSmallMobile ? (screen.isLandscape ? LINE_HEIGHTS.TIGHT : LINE_HEIGHTS.NORMAL) : LINE_HEIGHTS.NORMAL,
    contentIndent: screen.isLandscape ? '0.5rem' : '1rem',
    lineWidth: screen.isLandscape ? '30px' : '40px',
    lineLeft: screen.isLandscape ? '-40px' : '-50px',
    buttonGap: 8, // 0.5rem * 16
    buttonDirection: 'column',
    buttonSize: screen.isSmallMobile ? (screen.isLandscape ? 'small' : 'medium') : 'large',
    useParallax: false,
    use3DEffects: false,
    useHoverEffects: false,
    subtitleVariant: 'subtitle1'
  };
}
