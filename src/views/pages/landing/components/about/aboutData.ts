/**
 * @fileoverview About section data and content configuration
 * Centralized data management for About section with i18n support
 */

import { ComponentType } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { I18n } from "types/config";

/**
 * Section data interface - reusing from types
 */
export interface AboutSectionData {
  title: string;
  content: string;
  color: string;
  icon: ComponentType<any>;
}

/**
 * Translation interface for about content
 */
interface AboutTranslations {
  COMPANY_NAME: string;
  COMPANY_DESCRIPTION: string;
  SECTIONS: {
    VISION: {
      title: string;
      content: string;
    };
    MISSION: {
      title: string;
      content: string;
    };
    VALUES: {
      title: string;
      content: string;
    };
  };
}

/**
 * English translations
 */
const EN_TRANSLATIONS: AboutTranslations = {
  COMPANY_NAME: "Radiant Research Services Pvt Ltd",
  COMPANY_DESCRIPTION:
    "Radiant Research Services Pvt Ltd (RRS Pvt Ltd), founded in 2009 and located in Bangalore, India, is a premier Contract Research Organization (CRO) specializing in Drug Discovery, Pre-Clinical, and Clinical research. Our extensive facilities, including an 8000 sq. ft. laboratory and a 9000 sq. ft. corporate office, house state-of-the-art technology platforms and a team of more than 70 dedicated professionals, including over 15 PhD-qualified experts. In pursuit of excellence, we have standardized over 70+ in vitro (cell-based) pre-clinical protocols to establish the efficacy and safety of various cosmetics and personal care products along with finished formulations. Our clinical research services span from Phase II to Phase IV trials, ensuring the highest standards of quality and confidentiality.",
  SECTIONS: {
    VISION: {
      title: "VISION",
      content:
        "To emerge as one point contact for every need of the client by offering cost effective, time bound and value added customized services in the area of contract research and to become a leader in Indian CRO market.",
    },
    MISSION: {
      title: "MISSION",
      content:
        "To become the best contract research partner for the Pharma, cosmetic, Nutraceuticals, Ayurveda and herbal companies by supporting end to end solutions in their research by providing superior performance.",
    },
    VALUES: {
      title: "VALUES",
      content:
        "Delivering customer satisfaction by listening to and exceeding customer expectations. Adding value for our customers through our services. Seeking innovative solutions to help our customers achieve their goals.",
    },
  },
};

/**
 * Korean translations
 */
const KO_TRANSLATIONS: AboutTranslations = {
  COMPANY_NAME: "래디언트 리서치 서비스 주식회사",
  COMPANY_DESCRIPTION:
    "이천구년에 설립되어 인도 방갈로르에 위치한 래디언트 리서치 서비스 주식회사 (알알에스 주식회사)는 신약 개발, 전임상 및 임상 연구를 전문으로 하는 최고의 위탁연구기관(계약연구기관)입니다. 팔천평방피트의 실험실과 구천평방피트의 본사를 포함한 광범위한 시설에는 최첨단 기술 플랫폼과 십오명 이상의 박사 학위 전문가를 포함하여 칠십명 이상의 전문가 팀이 있습니다. 우수성을 추구하기 위해 다양한 화장품 및 개인 관리 제품과 완제품의 효능과 안전성을 확립하기 위해 칠십개 이상의 시험관 내(세포 기반) 전임상 프로토콜을 표준화했습니다. 우리의 임상 연구 서비스는 이상부터 사상 시험까지 걸쳐 있으며, 최고 수준의 품질과 기밀성을 보장합니다.",
  SECTIONS: {
    VISION: {
      title: "비전",
      content:
        "위탁연구 분야에서 비용 효율적이고 시간 제한적이며 부가가치가 있는 맞춤형 서비스를 제공하여 고객의 모든 요구에 대한 원스톱 연락처로 부상하고 인도 계약연구기관 시장의 리더가 되는 것입니다.",
    },
    MISSION: {
      title: "미션",
      content:
        "우수한 성과를 제공하여 연구에서 처음부터 끝까지 솔루션을 지원함으로써 제약, 화장품, 건강기능식품, 아유르베다 및 허브 회사의 최고의 위탁연구 파트너가 되는 것입니다.",
    },
    VALUES: {
      title: "가치",
      content:
        "고객의 기대를 듣고 이를 초과하여 고객 만족을 제공합니다. 우리의 서비스를 통해 고객에게 가치를 추가합니다. 고객이 목표를 달성할 수 있도록 혁신적인 솔루션을 추구합니다.",
    },
  },
};

/**
 * Translation map
 */
const TRANSLATIONS: Record<I18n, AboutTranslations> = {
  en: EN_TRANSLATIONS,
  ko: KO_TRANSLATIONS,
};

/**
 * Get translations based on locale
 */
export const getAboutTranslations = (locale: I18n): AboutTranslations => {
  return TRANSLATIONS[locale] || TRANSLATIONS.en;
};

/**
 * About section content configuration (legacy - for backward compatibility)
 */
export const ABOUT_CONTENT = EN_TRANSLATIONS;

/**
 * Get about sections with theme color and locale
 */
export const getAboutSections = (
  textColor: string,
  locale: I18n = "en"
): AboutSectionData[] => {
  const translations = getAboutTranslations(locale);

  return [
    {
      title: translations.SECTIONS.VISION.title,
      content: translations.SECTIONS.VISION.content,
      color: textColor,
      icon: VisibilityIcon,
    },
    {
      title: translations.SECTIONS.MISSION.title,
      content: translations.SECTIONS.MISSION.content,
      color: textColor,
      icon: RocketLaunchIcon,
    },
    {
      title: translations.SECTIONS.VALUES.title,
      content: translations.SECTIONS.VALUES.content,
      color: textColor,
      icon: FavoriteIcon,
    },
  ];
};
