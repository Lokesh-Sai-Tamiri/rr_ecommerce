/**
 * @fileoverview Data configuration for About Us sections with i18n support
 * Compatible with existing AboutCard component
 */

import {
  Visibility as VisionIcon,
  TrackChanges as MissionIcon,
} from "@mui/icons-material";
import { I18n } from "types/config";

import type { AboutSectionData, ValuesData } from "./types";

/**
 * Translation interface for About Us content
 */
interface AboutUsTranslations {
  VISION_MISSION: {
    VISION: {
      title: string;
      content: string;
    };
    MISSION: {
      title: string;
      content: string;
    };
  };
  VALUES: {
    sections: Array<{
      title: string;
      points: string[];
    }>;
  };
}

/**
 * English translations
 */
const EN_TRANSLATIONS: AboutUsTranslations = {
  VISION_MISSION: {
    VISION: {
      title: "VISION",
      content:
        "To emerge as one point contact for every need of the client by offering cost effective, time bound and value added customized services in the area of contract research and to become a leader in Indian CRO market.",
    },
    MISSION: {
      title: "MISSION",
      content:
        "To become the best contract research partner for the Pharma, cosmetic, Nutraceuticals, Ayurveda and herbal companies by supporting end to end solutions in their research by providing superior performance with quality outcome at right time and right budget.",
    },
  },
  VALUES: {
    sections: [
      {
        title: "Customer focus",
        points: [
          "Delivering customer satisfaction by listening to and exceeding customer expectations",
          "Adding value for our customers through our services",
          "Seeking innovative solutions to help our customers achieve their goals",
        ],
      },
      {
        title: "Quality",
        points: [
          "Delivering quality in all our work; providing accurate results on time",
          "Using the best appropriate technology and methods",
          "Seeking to improve or change our processes for the better",
        ],
      },
      {
        title: "Competence & Team Spirit",
        points: [
          "Employing a team of talented and competent staff",
          "Investing in training and creating good career opportunities",
          "Recognising and encouraging outstanding performance",
        ],
      },
      {
        title: "Integrity",
        points: [
          "Behaving ethically in all our business and financial activities",
          "Demonstrating respect towards our customers and our staff",
          "Operating responsible environmental policies",
        ],
      },
    ],
  },
};

/**
 * Korean translations
 */
const KO_TRANSLATIONS: AboutUsTranslations = {
  VISION_MISSION: {
    VISION: {
      title: "비전",
      content:
        "위탁연구 분야에서 비용 효율적이고 시간 제한적이며 부가가치가 있는 맞춤형 서비스를 제공하여 고객의 모든 요구에 대한 원스톱 연락처로 부상하고 인도 계약연구기관 시장의 리더가 되는 것입니다.",
    },
    MISSION: {
      title: "미션",
      content:
        "적절한 시간과 적절한 예산으로 품질 결과와 함께 우수한 성과를 제공하여 연구에서 처음부터 끝까지 솔루션을 지원함으로써 제약, 화장품, 건강기능식품, 아유르베다 및 허브 회사의 최고의 위탁연구 파트너가 되는 것입니다.",
    },
  },
  VALUES: {
    sections: [
      {
        title: "고객 중심",
        points: [
          "고객의 기대를 듣고 이를 초과하여 고객 만족을 제공합니다",
          "우리의 서비스를 통해 고객에게 가치를 추가합니다",
          "고객이 목표를 달성할 수 있도록 혁신적인 솔루션을 추구합니다",
        ],
      },
      {
        title: "품질",
        points: [
          "모든 업무에서 품질을 제공하고 정확한 결과를 제시간에 제공합니다",
          "최고의 적절한 기술과 방법을 사용합니다",
          "더 나은 방향으로 프로세스를 개선하거나 변경하려고 노력합니다",
        ],
      },
      {
        title: "역량 및 팀워크",
        points: [
          "재능 있고 유능한 직원 팀을 고용합니다",
          "교육에 투자하고 좋은 경력 기회를 창출합니다",
          "뛰어난 성과를 인정하고 격려합니다",
        ],
      },
      {
        title: "성실성",
        points: [
          "모든 비즈니스 및 재정 활동에서 윤리적으로 행동합니다",
          "고객과 직원에 대한 존중을 보여줍니다",
          "책임감 있는 환경 정책을 운영합니다",
        ],
      },
    ],
  },
};

/**
 * Translation map
 */
const TRANSLATIONS: Record<I18n, AboutUsTranslations> = {
  en: EN_TRANSLATIONS,
  ko: KO_TRANSLATIONS,
};

/**
 * Get translations based on locale
 */
export const getAboutUsTranslations = (locale: I18n): AboutUsTranslations => {
  return TRANSLATIONS[locale] || TRANSLATIONS.en;
};

/**
 * Get vision and mission data with locale support
 */
export const getVisionMissionData = (
  locale: I18n = "en"
): AboutSectionData[] => {
  const translations = getAboutUsTranslations(locale);

  return [
    {
      title: translations.VISION_MISSION.VISION.title,
      content: translations.VISION_MISSION.VISION.content,
      icon: VisionIcon,
      color: "primary.main",
    },
    {
      title: translations.VISION_MISSION.MISSION.title,
      content: translations.VISION_MISSION.MISSION.content,
      icon: MissionIcon,
      color: "secondary.main",
    },
  ];
};

/**
 * Get values data with locale support
 */
export const getValuesData = (locale: I18n = "en"): ValuesData => {
  const translations = getAboutUsTranslations(locale);
  return {
    sections: translations.VALUES.sections,
  };
};

/**
 * Legacy exports for backward compatibility
 */
export const visionMissionData: AboutSectionData[] = getVisionMissionData("en");
export const valuesData: ValuesData = getValuesData("en");

/**
 * Function to get about us sections with locale support
 */
export const getAboutUsSections = (locale: I18n = "en"): AboutSectionData[] => {
  return getVisionMissionData(locale);
};
