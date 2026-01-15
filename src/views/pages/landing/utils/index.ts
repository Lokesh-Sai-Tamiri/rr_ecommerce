/**
 * @fileoverview Centralized utilities export for landing page components
 * Provides a single import point for all utility functions and constants
 */

// Screen detection utilities
export {
  useScreenDetection,
  getMobileSize,
  getMobileSizeWithFallback,
  getMobileScaling,
  getResponsiveValue,
  getResponsiveValueByMobileSize,
  useThemeBasedDetection,
  type ScreenDetection,
  type DeviceType,
  type Orientation,
  type MobileSize,
  SCREEN_BREAKPOINTS,
  MEDIA_QUERIES
} from './screenUtils';

// Styling utilities - UPDATED with CSS_KEYFRAMES
export {
  FONT_FAMILIES,
  FONT_WEIGHTS,
  LINE_HEIGHTS,
  SPACING_SCALE,
  ANIMATIONS,
  CSS_KEYFRAMES // ← This fixes the import error
} from './styleUtils';

// Theme-aware utilities - UPDATED with new functions
export {
  getThemeFontSizes,
  getThemeSpacing,
  getThemeButtonStyles,
  getButtonStyles, // ← Fixes buttonStyles.ts import
  getTitleStyles,
  getSubtitleStyles,
  getAboutConfig,
  getAboutBackgroundStyles,
  getAboutCardStyles,
  getEnhancedAboutCardStyles,
  getOptimizedStyles,
  type AboutConfig
} from './themeUtils';

// Device configuration
export { getDeviceConfig, type DeviceConfig } from './deviceConfig';

// Layout utilities
export { getDecorativeLineStyles, getContainerStyles, getDesktopLayoutStyles } from './layoutUtils';

// Legacy compatibility (for existing components)
export { getButtonStyles as getLegacyButtonStyles, useDeviceDetection as useLegacyDeviceDetection } from '../components/utils/buttonStyles';

// About section components
export { AboutCard, CompanyIntro } from '../components/about';
