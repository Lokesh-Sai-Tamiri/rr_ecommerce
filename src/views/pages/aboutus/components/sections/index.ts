/**
 * @fileoverview Export all About Us components and utilities
 */

// Components
export { AboutUsIntro } from "./AboutUsIntro";

// Data and utilities
export {
  visionMissionData,
  valuesData,
  getAboutUsSections,
  getAboutUsTranslations,
  getVisionMissionData,
  getValuesData,
} from "./aboutUsData";

// Hooks and styles (from existing styles.ts file)
export {
  useAboutUsStyles,
  getAboutUsSpacing,
  getAboutUsFontSizes,
  getAboutUsAnimations,
} from "./styles";

// Types
export type {
  AboutSectionData,
  AboutCardProps,
  ValueSection,
  ValuesData,
} from "./types";
