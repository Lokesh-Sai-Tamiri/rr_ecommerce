/**
 * @fileoverview Custom hook for About Us section translations
 * Provides easy access to localized About Us content
 */

import { useContext } from "react";
import { ConfigContext } from "contexts/ConfigContext";
import {
  getAboutUsTranslations,
  getVisionMissionData,
  getValuesData,
  getAboutUsSections,
} from "views/pages/aboutus/components/sections/aboutUsData";
import type {
  AboutSectionData,
  ValuesData,
} from "views/pages/aboutus/components/sections/types";

/**
 * Custom hook for About Us section translations
 * @returns Object containing translated content and helper functions
 */
export const useAboutUsTranslations = () => {
  const { i18n } = useContext(ConfigContext);

  const translations = getAboutUsTranslations(i18n);

  /**
   * Get vision and mission sections with current locale
   * @returns Array of AboutSectionData with localized content
   */
  const getVisionMission = (): AboutSectionData[] => {
    return getVisionMissionData(i18n);
  };

  /**
   * Get values data with current locale
   * @returns ValuesData with localized content
   */
  const getValues = (): ValuesData => {
    return getValuesData(i18n);
  };

  /**
   * Get all about us sections with current locale
   * @returns Array of AboutSectionData with localized content
   */
  const getSections = (): AboutSectionData[] => {
    return getAboutUsSections(i18n);
  };

  return {
    // Direct access to translations
    visionTitle: translations.VISION_MISSION.VISION.title,
    visionContent: translations.VISION_MISSION.VISION.content,
    missionTitle: translations.VISION_MISSION.MISSION.title,
    missionContent: translations.VISION_MISSION.MISSION.content,
    valuesData: translations.VALUES,

    // Helper functions
    getVisionMission,
    getValues,
    getSections,

    // Current locale
    currentLocale: i18n,

    // Full translations object
    translations,
  };
};

export default useAboutUsTranslations;
