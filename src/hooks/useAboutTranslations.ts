/**
 * @fileoverview Custom hook for About section translations
 * Provides easy access to localized about content
 */

import { useContext } from "react";
import { ConfigContext } from "contexts/ConfigContext";
import {
  getAboutTranslations,
  getAboutSections,
  AboutSectionData,
} from "views/pages/landing/components/about/aboutData";

/**
 * Custom hook for About section translations
 * @returns Object containing translated content and helper functions
 */
export const useAboutTranslations = () => {
  const { i18n } = useContext(ConfigContext);

  const translations = getAboutTranslations(i18n);

  /**
   * Get about sections with current locale and theme color
   * @param textColor - Theme color for sections
   * @returns Array of AboutSectionData with localized content
   */
  const getSections = (textColor: string): AboutSectionData[] => {
    return getAboutSections(textColor, i18n);
  };

  return {
    // Direct access to translations
    companyName: translations.COMPANY_NAME,
    companyDescription: translations.COMPANY_DESCRIPTION,
    visionTitle: translations.SECTIONS.VISION.title,
    visionContent: translations.SECTIONS.VISION.content,
    missionTitle: translations.SECTIONS.MISSION.title,
    missionContent: translations.SECTIONS.MISSION.content,
    valuesTitle: translations.SECTIONS.VALUES.title,
    valuesContent: translations.SECTIONS.VALUES.content,

    // Helper functions
    getSections,

    // Current locale
    currentLocale: i18n,

    // Full translations object
    translations,
  };
};

export default useAboutTranslations;
