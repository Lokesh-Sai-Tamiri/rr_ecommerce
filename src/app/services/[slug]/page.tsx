/**
 * @fileoverview Dynamic service page component
 * Displays individual service information with consistent layout
 */

import { Metadata } from "next";
import { notFound } from "next/navigation";
import AppBar from "ui-component/extended/AppBar";
import { Box } from "@mui/material";
import FooterSection from "../../../views/pages/landing/FooterSection";
// Direct imports for service components (better for SEO and performance)
import AyushService from "./ayush";
import NutraceuticalsService from "./nutraceuticals";
import HerbalNaturalsService from "./herbal-naturals";
import DrugTestingLabService from "./drug-testing-lab";
import InVitroService from "./in-vitro-cell-based-research";
import PreclinicalResearchService from "./preclinical-research";
import ClinicalResearchService from "./clinical-research";
import CosmeticsPersonalCareService from "./cosmetics-personal-care";
import PharmaceuticalService from "./pharmaceutical";

// Service component mappings
const serviceComponents = {
  ayush: AyushService,
  nutraceuticals: NutraceuticalsService,
  "herbal-naturals": HerbalNaturalsService,
  "drug-testing-lab": DrugTestingLabService,
  "in-vitro-cell-based-research": InVitroService,
  "invitro-services": InVitroService, // Keep old URL working
  "preclinical-research": PreclinicalResearchService,
  "clinical-research": ClinicalResearchService,
  "cosmetics-personal-care": CosmeticsPersonalCareService,
  pharmaceutical: PharmaceuticalService,
};

// Service data configuration for metadata
const SERVICES_DATA = {
  ayush: {
    title: "AYUSH",
    subtitle: "Ayurveda, Yoga & Naturopathy, Unani, Siddha and Homoeopathy",
    description:
      "We at Radiant Research with an overall experience of over 25 years in Herbal and Ayurvedic research equipped with state of the art research facility offer a wide range of cost effective and customized preclinical and clinical research services to validate the efficacy and safety of raw materials and formulations to fulfil the regulatory requirements.",
    image: "/assets/images/landing/services/ayush.jpg",
  },
  nutraceuticals: {
    title: "Nutraceuticals",
    description:
      "With thorough knowledge on recent regulations on nutraceuticals in the domestic and international market, at Radiant Research we understand our client's requirements and wishes to produce efficacious, safe and quality. Radiant Research offers End-to-End customized services based on the claims to support the product to pass through regulatory guidelines and as well as to support in product enhancement.",
    image: "/assets/images/landing/services/nutraceuticals.jpg",
  },
  "cosmetics-personal-care": {
    title: "Cosmetics/Personal Care",
    description:
      "Radiant Research is committed towards cruelty free testing for cosmetics and we have established in vitro cell based testing facility to provide non animal testing approaches. At Radiant Research, we maintain large cell repository with more than 50 different cell lines and optimized range of screening tests to offer End to End research services for various cosmetic and personal care ingredients and finished products.",
    image: "/assets/images/landing/services/cosmetics.jpg",
  },
  pharmaceutical: {
    title: "Pharmaceutical",
    description:
      "Radiant Research is fully equipped and coordinated pharmaceutical Research team offering full range customized and cost effective preclinical, clinical and quality testing services that turned out to be client's one stop destination in developing new products from Bench to Bedside.",
    image: "/assets/images/landing/services/pharmaceutical.jpg",
  },
  "herbal-naturals": {
    title: "Herbal/Naturals",
    description:
      "We at Radiant Research with an overall experience of over 25 years in Herbal and Ayurvedic research equipped with state of the art research facility offer a wide range of cost effective and customized preclinical and clinical research services to validate the efficacy and safety of raw materials and formulations to fulfil the regulatory requirements.",
    image: "/assets/images/landing/services/herbal.jpg",
  },
  "drug-testing-lab": {
    title: "Drug Testing Lab",
    description:
      "Radiant Research is part of Hyderabad Drug Testing and Research Management System and one of the very few approved Drug Testing Lab for Ministry of AYUSH, New Delhi. Our Drug Testing Lab is one of the best in its class offering complete analytical testing and service for traditional, customized, domestic formulation, medicine under pharmacopoeia.",
    image: "/assets/images/landing/services/drug-testing.jpg",
  },

  "in-vitro-cell-based-research": {
    title: "In Vitro Cell Based Research",
    description:
      "Radiant Research with as close of the art Cell biology, Molecular biology and Microbiology facilities is offering exclusive in vitro services required to analyze in potential research to predict Research on both animals and humans.",
    image: "/assets/images/landing/services/invitro.jpg",
  },
  "preclinical-research": {
    title: "Preclinical Research",
    description:
      "Radiant Research with an strong commitment at each step lets individuals commit both in developing and marketing success to Clients needs. Radiant Research specializes conducting preclinical efficacy and toxicity studies to Clients needs, Ayurvedic, Nutraceutical and Pharmaceuticals Research and Drug development from discovery to clinical trials by processing various leads.",
    image: "/assets/images/landing/services/preclinical.jpg",
  },
  "clinical-research": {
    title: "Clinical Research",
    description:
      "Radiant Research conducts Phases 1 to 4 clinical trials for Pharmaceutical, Nutraceutical, Herbal and Ayurvedic companies, whilst maintaining the highest standards of data quality, safety and on-time study completion. We successfully conducted clinical trials on products from natural origin, nutraceuticals etc to our domestic and foreign clients.",
    image: "/assets/images/landing/services/clinical.jpg",
  },
};

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const serviceData = SERVICES_DATA[slug as keyof typeof SERVICES_DATA];

  if (!serviceData) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${serviceData.title} Services | R&R Research`,
    description: serviceData.description,
    keywords: [
      serviceData.title.toLowerCase(),
      "research services",
      "laboratory testing",
      "R&R Research",
      "pharmaceutical research",
      "clinical trials",
      "preclinical studies",
    ].join(", "),
  };
}

export async function generateStaticParams() {
  return Object.keys(SERVICES_DATA).map((slug) => ({
    slug,
  }));
}

export default async function ServicePage({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
  params: Promise<{ slug: string }>;
}>) {
  const { slug } = await params;
  const ServiceComponent =
    serviceComponents[slug as keyof typeof serviceComponents];

  if (!ServiceComponent) {
    notFound();
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Fixed Header */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          backdropFilter: "blur(10px)",
        }}
      >
        <AppBar
          sx={{
            background: "transparent",
            boxShadow: "none",
            position: "static",
          }}
          disableSticky={true}
          FooterComponent={FooterSection}
        />
      </Box>

      {/* Main Content Container */}
      <Box
        sx={{
          flex: 1,
          minHeight: "calc(100vh - 120px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Service Content with Background */}
        <Box
          sx={{
            flex: 1,
            minHeight: "inherit",
            backgroundImage: `url('/assets/images/home-bg.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed", // Fixed background that doesn't scroll
            paddingBottom: "60px", // Space for fixed footer
          }}
        >
          <ServiceComponent />
        </Box>
      </Box>

      {/* Fixed Footer */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          backdropFilter: "blur(10px)",
        }}
      >
        <FooterSection />
      </Box>
    </Box>
  );
}
