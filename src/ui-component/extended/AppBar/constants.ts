/**
 * @fileoverview Constants and configuration for AppBar components
 */

import { NavigationItem } from "./types";

export const SERVICES_DROPDOWN_ITEMS = [
  {
    label: "Ayush",
    labelKey: "navigation.services.ayush",
    href: "/services/ayush",
  },
  {
    label: "Nutraceuticals",
    labelKey: "navigation.services.nutraceuticals",
    href: "/services/nutraceuticals",
  },
  {
    label: "Cosmetics/Personal Care",
    labelKey: "navigation.services.cosmetics-personal-care",
    href: "/services/cosmetics-personal-care",
  },
  {
    label: "Pharmaceutical",
    labelKey: "navigation.services.pharmaceutical",
    href: "/services/pharmaceutical",
  },
  {
    label: "Herbal/Naturals",
    labelKey: "navigation.services.herbal-naturals",
    href: "/services/herbal-naturals",
  },
  {
    label: "Drug Testing Lab",
    labelKey: "navigation.services.drug-testing-lab",
    href: "/services/drug-testing-lab",
  },
  {
    label: "In Vitro Services",
    labelKey: "navigation.services.in-vitro-services",
    href: "/services/in-vitro-cell-based-research",
  },
  {
    label: "Preclinical Research",
    labelKey: "navigation.services.preclinical-research",
    href: "/services/preclinical-research",
  },
  {
    label: "Clinical Research",
    labelKey: "navigation.services.clinical-research",
    href: "/services/clinical-research",
  },
];

export const PRICING_DROPDOWN_ITEMS = [
  { label: "Toxicity Study", labelKey: "navigation.pricing.toxicity-study", href: "/pricing/toxicity-study" },
  { label: "Microbiology & Virology Study", labelKey: "navigation.pricing.microbiology-virology", href: "/pricing/microbiology-virology" },
  { label: "Invitro Study", labelKey: "navigation.pricing.invitro-study", href: "/pricing/invitro-study" },
];



export const NAVIGATION_ITEMS: NavigationItem[] = [
  { label: "Home", labelKey: "navigation.home", href: "/" },
  { label: "About Us", labelKey: "navigation.about-us", href: "/about-us" },
  {
    label: "Services",
    labelKey: "navigation.services",
    href: "/services",
    dropdownItems: SERVICES_DROPDOWN_ITEMS,
  },
  {
    label: "Pricing",
    labelKey: "navigation.pricing",
    href: "/pricing",
    dropdownItems: PRICING_DROPDOWN_ITEMS,
  },
  {
    label: "Infrastructure",
    labelKey: "navigation.infrastructure",
    href: "/infrastructure",
  },
  { label: "Careers", labelKey: "navigation.careers", href: "/careers" },
  {
    label: "Gallery",
    labelKey: "navigation.gallery",
    href: "/gallery",
    dropdownItems: [
      {
        label: "Radiant Team",
        labelKey: "gallery.categories.radiant-team",
        href: "/gallery/radiant-team",
      },
      {
        label: "Radiant Lab",
        labelKey: "gallery.categories.radiant-lab",
        href: "/gallery/radiant-lab",
      },
      {
        label: "15 Years Celebration",
        labelKey: "gallery.categories.15-years-celebrations",
        href: "/gallery/15-years-celebrations",
      },
      {
        label: "Area 83 Outing",
        labelKey: "gallery.categories.area-83-team-outing",
        href: "/gallery/area-83-team-outing",
      },
      {
        label: "Team Celebrations",
        labelKey: "gallery.categories.radiant-team-celebrations",
        href: "/gallery/radiant-team-celebrations",
      },
      {
        label: "Korea Expo 2025",
        labelKey: "gallery.categories.korea-expo-2025",
        href: "/gallery/korea-expo-2025",
      },
    ],
  },
  // { label: "Find Us", href: "/find-us" },
  {
    label: "Contact Us",
    labelKey: "navigation.contact-us",
    href: "/contact-us",
  },
];

export const THEME_COLORS = {
  primary: "#1976d2",
  secondary: "#115293",
  white: "#ffffff",
} as const;

export const MOBILE_BREAKPOINT = "(max-width: 1024px)";
