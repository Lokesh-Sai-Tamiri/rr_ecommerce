/**
 * @fileoverview About components barrel export
 * Updated with consolidated utilities
 */

export { default as AboutCard } from "./AboutCard";
export { default as CompanyIntro } from "./CompanyIntro";

// Export types
export type { AboutCardProps } from "./AboutCard";
export type { CompanyIntroProps } from "./CompanyIntro";

// Export the styling hooks
export {
  useAboutStyles,
  useAboutStylesSimple,
  type UseAboutStylesReturn,
  type UseAboutStylesSimpleReturn,
} from "./useAboutStyles";

// Export data and types
export {
  getAboutSections,
  getAboutTranslations,
  ABOUT_CONTENT,
} from "./aboutData";
export type { AboutSectionData } from "./aboutData";
