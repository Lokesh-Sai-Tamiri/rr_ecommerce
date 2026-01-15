/**
 * @fileoverview Export all location components and utilities using centralized landing/utils
 */

// Components
export { LocationIntro } from './LocationIntro';
export { default as LocationCard } from './LocationCard';

// Styles and utilities
export { useLocationStyles, getLocationSpacing, getLocationFontSizes, getLocationAnimations } from './styles';

// Data and utilities
export { getLocationSections, locationActions, LocationIcons, LOCATION_SECTIONS } from './locationData';

// Types
export type { LocationSectionData, LocationData } from './locationData';

// Re-export centralized utilities for convenience
export { useScreenDetection, getMobileSizeWithFallback, getMobileScaling } from '../../../landing/utils/screenUtils';

export { getTitleStyles, getSubtitleStyles, getAboutBackgroundStyles, getAboutCardStyles } from '../../../landing/utils/themeUtils';
