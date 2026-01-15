/**
 * @fileoverview Chatbot conversation flows and data
 */

import { ChatFlow } from "./types";

export const chatbotFlows: ChatFlow = {
  initial: {
    message: "chatbot.welcome",
    buttons: [
      {
        id: "about",
        label: "chatbot.actions.about",
        action: "about",
        translationKey: "chatbot.actions.about",
      },
      {
        id: "services",
        label: "chatbot.actions.services",
        action: "services",
        translationKey: "chatbot.actions.services",
      },
      {
        id: "infrastructure",
        label: "infrastructure.title",
        action: "infrastructure",
        translationKey: "infrastructure.title",
      },
      {
        id: "contact",
        label: "chatbot.actions.contact",
        action: "contact",
        translationKey: "chatbot.actions.contact",
      },
      {
        id: "pricing",
        label: "chatbot.actions.pricing",
        action: "pricing",
        translationKey: "chatbot.actions.pricing",
      },
    ],
  },
  about: {
    message: "aboutus.overview.experience",
    buttons: [
      {
        id: "services_about",
        label: "chatbot.actions.services",
        action: "services",
        translationKey: "chatbot.actions.services",
      },
      {
        id: "contact_about",
        label: "chatbot.actions.contact",
        action: "contact",
        translationKey: "chatbot.actions.contact",
      },
      {
        id: "back_about",
        label: "nav.home",
        action: "initial",
        translationKey: "nav.home",
      },
    ],
  },
  services: {
    message: "services.subtitle",
    buttons: [
      {
        id: "ayush",
        label: "services.ayush",
        action: "service_ayush",
        translationKey: "services.ayush",
      },
      {
        id: "nutraceuticals",
        label: "services.nutraceuticals",
        action: "service_nutraceuticals",
        translationKey: "services.nutraceuticals",
      },
      {
        id: "clinical",
        label: "services.clinical-research",
        action: "service_clinical",
        translationKey: "services.clinical-research",
      },
      {
        id: "pharmaceutical",
        label: "services.pharmaceutical",
        action: "service_pharmaceutical",
        translationKey: "services.pharmaceutical",
      },
      {
        id: "cosmetics",
        label: "services.cosmetics-personal-care",
        action: "service_cosmetics",
        translationKey: "services.cosmetics-personal-care",
      },
      {
        id: "herbal_naturals",
        label: "services.herbal-naturals",
        action: "service_herbal_naturals",
        translationKey: "services.herbal-naturals",
      },
      {
        id: "drug_testing",
        label: "services.drug-testing-lab",
        action: "service_drug_testing",
        translationKey: "services.drug-testing-lab",
      },
      {
        id: "in_vitro",
        label: "services.in-vitro-cell-based-research",
        action: "service_in_vitro",
        translationKey: "services.in-vitro-cell-based-research",
      },
      {
        id: "preclinical",
        label: "services.preclinical-research",
        action: "service_preclinical",
        translationKey: "services.preclinical-research",
      },
      {
        id: "back_services",
        label: "nav.home",
        action: "initial",
        translationKey: "nav.home",
      },
    ],
  },
  service_ayush: {
    message: "services.ayush.description",
    buttons: [
      {
        id: "contact_ayush",
        label: "chatbot.actions.pricing",
        action: "contact",
        translationKey: "chatbot.actions.pricing",
      },
      {
        id: "all_services_ayush",
        label: "chatbot.actions.other-services",
        action: "services",
        translationKey: "chatbot.actions.other-services",
      },
      {
        id: "back_ayush",
        label: "chatbot.actions.back",
        action: "initial",
        translationKey: "chatbot.actions.back",
      },
    ],
  },
  service_nutraceuticals: {
    message: "services.nutraceuticals.description",
    buttons: [
      {
        id: "contact_nutra",
        label: "chatbot.actions.pricing",
        action: "contact",
        translationKey: "chatbot.actions.pricing",
      },
      {
        id: "all_services_nutra",
        label: "chatbot.actions.other-services",
        action: "services",
        translationKey: "chatbot.actions.other-services",
      },
      {
        id: "back_nutra",
        label: "chatbot.actions.back",
        action: "initial",
        translationKey: "chatbot.actions.back",
      },
    ],
  },
  service_clinical: {
    message: "services.clinical-research.description",
    buttons: [
      {
        id: "contact_clinical",
        label: "chatbot.actions.pricing",
        action: "contact",
        translationKey: "chatbot.actions.pricing",
      },
      {
        id: "all_services_clinical",
        label: "chatbot.actions.other-services",
        action: "services",
        translationKey: "chatbot.actions.other-services",
      },
      {
        id: "back_clinical",
        label: "chatbot.actions.back",
        action: "initial",
        translationKey: "chatbot.actions.back",
      },
    ],
  },
  service_pharmaceutical: {
    message: "services.pharmaceutical.description",
    buttons: [
      {
        id: "contact_pharma",
        label: "chatbot.actions.pricing",
        action: "contact",
        translationKey: "chatbot.actions.pricing",
      },
      {
        id: "all_services_pharma",
        label: "chatbot.actions.other-services",
        action: "services",
        translationKey: "chatbot.actions.other-services",
      },
      {
        id: "back_pharma",
        label: "chatbot.actions.back",
        action: "initial",
        translationKey: "chatbot.actions.back",
      },
    ],
  },
  service_cosmetics: {
    message: "services.cosmetics-personal-care.description",
    buttons: [
      {
        id: "contact_cosmetics",
        label: "chatbot.actions.pricing",
        action: "contact",
        translationKey: "chatbot.actions.pricing",
      },
      {
        id: "all_services_cosmetics",
        label: "chatbot.actions.other-services",
        action: "services",
        translationKey: "chatbot.actions.other-services",
      },
      {
        id: "back_cosmetics",
        label: "chatbot.actions.back",
        action: "initial",
        translationKey: "chatbot.actions.back",
      },
    ],
  },
  service_herbal_naturals: {
    message: "services.herbal-naturals.description",
    buttons: [
      {
        id: "contact_herbal",
        label: "chatbot.actions.pricing",
        action: "contact",
        translationKey: "chatbot.actions.pricing",
      },
      {
        id: "all_services_herbal",
        label: "chatbot.actions.other-services",
        action: "services",
        translationKey: "chatbot.actions.other-services",
      },
      {
        id: "back_herbal",
        label: "chatbot.actions.back",
        action: "initial",
        translationKey: "chatbot.actions.back",
      },
    ],
  },
  service_drug_testing: {
    message: "services.drug-testing-lab.description",
    buttons: [
      {
        id: "contact_drug",
        label: "chatbot.actions.pricing",
        action: "contact",
        translationKey: "chatbot.actions.pricing",
      },
      {
        id: "all_services_drug",
        label: "chatbot.actions.other-services",
        action: "services",
        translationKey: "chatbot.actions.other-services",
      },
      {
        id: "back_drug",
        label: "chatbot.actions.back",
        action: "initial",
        translationKey: "chatbot.actions.back",
      },
    ],
  },
  service_in_vitro: {
    message: "services.in-vitro-cell-based-research.description",
    buttons: [
      {
        id: "contact_invitro",
        label: "chatbot.actions.pricing",
        action: "contact",
        translationKey: "chatbot.actions.pricing",
      },
      {
        id: "all_services_invitro",
        label: "chatbot.actions.other-services",
        action: "services",
        translationKey: "chatbot.actions.other-services",
      },
      {
        id: "back_invitro",
        label: "chatbot.actions.back",
        action: "initial",
        translationKey: "chatbot.actions.back",
      },
    ],
  },
  service_preclinical: {
    message: "services.preclinical-research.description",
    buttons: [
      {
        id: "contact_preclinical",
        label: "chatbot.actions.pricing",
        action: "contact",
        translationKey: "chatbot.actions.pricing",
      },
      {
        id: "all_services_preclinical",
        label: "chatbot.actions.other-services",
        action: "services",
        translationKey: "chatbot.actions.other-services",
      },
      {
        id: "back_preclinical",
        label: "chatbot.actions.back",
        action: "initial",
        translationKey: "chatbot.actions.back",
      },
    ],
  },
  infrastructure: {
    message: "infrastructure.description",
    buttons: [
      {
        id: "contact_infrastructure",
        label: "chatbot.actions.contact",
        action: "contact",
        translationKey: "chatbot.actions.contact",
      },
      {
        id: "back_infrastructure",
        label: "chatbot.actions.back",
        action: "initial",
        translationKey: "chatbot.actions.back",
      },
    ],
  },
  careers: {
    message: "careers.description",
    buttons: [
      {
        id: "contact_careers",
        label: "chatbot.actions.send-resume",
        action: "contact",
        translationKey: "chatbot.actions.send-resume",
      },
      {
        id: "about_careers",
        label: "chatbot.actions.about-company",
        action: "about",
        translationKey: "chatbot.actions.about-company",
      },
      {
        id: "back_careers",
        label: "chatbot.actions.back",
        action: "initial",
        translationKey: "chatbot.actions.back",
      },
    ],
  },
  contact: {
    message: "contact.subtitle",
    buttons: [
      {
        id: "services_contact",
        label: "chatbot.actions.services",
        action: "services",
        translationKey: "chatbot.actions.services",
      },
      {
        id: "about_contact",
        label: "chatbot.actions.about",
        action: "about",
        translationKey: "chatbot.actions.about",
      },
      {
        id: "back_contact",
        label: "chatbot.actions.back",
        action: "initial",
        translationKey: "chatbot.actions.back",
      },
    ],
    isEndpoint: true,
  },
  pricing: {
    message: "chatbot.pricing.description",
    buttons: [
      {
        id: "pricing_micro_virology",
        label: "chatbot.actions.microbiology-virology",
        action: "pricing_micro_virology",
        translationKey: "chatbot.actions.microbiology-virology",
      },
      {
        id: "pricing_toxicity_study",
        label: "chatbot.actions.toxicity-study",
        action: "pricing_toxicity_study",
        translationKey: "chatbot.actions.toxicity-study",
      },
      {
        id: "pricing_invitro_study",
        label: "chatbot.actions.invitro-study",
        action: "pricing_invitro_study",
        translationKey: "chatbot.actions.invitro-study",
      },
      {
        id: "pricing_home",
        label: "nav.home",
        action: "initial",
        translationKey: "nav.home",
      },
    ],
  },
  pricing_micro_virology: {
    message: "chatbot.pricing.microbiology-virology.description",
    buttons: [
      {
        id: "get_quotation_micro_virology",
        label: "chatbot.actions.get-quotation",
        action: "redirect_and_reset",
        translationKey: "chatbot.actions.get-quotation",
        data: { href: "/pricing/microbiology-virology", resetChatbot: true },
      },
      {
        id: "home_micro_virology",
        label: "nav.home",
        action: "initial",
        translationKey: "nav.home",
      },
    ],
  },
  pricing_toxicity_study: {
    message: "chatbot.pricing.toxicity-study.description",
    buttons: [
      {
        id: "get_quotation_toxicity_study",
        label: "chatbot.actions.get-quotation",
        action: "redirect_and_reset",
        translationKey: "chatbot.actions.get-quotation",
        data: { href: "/pricing/toxicity-study", resetChatbot: true },
      },
      {
        id: "home_toxicity_study",
        label: "nav.home",
        action: "initial",
        translationKey: "nav.home",
      },
    ],
  },
  pricing_invitro_study: {
    message: "chatbot.pricing.invitro-study.description",
    buttons: [
      {
        id: "get_quotation_invitro_study",
        label: "chatbot.actions.get-quotation",
        action: "redirect_and_reset",
        translationKey: "chatbot.actions.get-quotation",
        data: { href: "/pricing/invitro-study", resetChatbot: true },
      },
      {
        id: "home_invitro_study",
        label: "nav.home",
        action: "initial",
        translationKey: "nav.home",
      },
    ],
  },
};

export const generateMessageId = (): string => {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
