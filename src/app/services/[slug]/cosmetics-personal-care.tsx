/**
 * @fileoverview Cosmetics/Personal Care service component
 */

"use client";

import React from "react";
import ServiceComponent from "./shared/ServiceComponent";

const serviceData = {
  title: "Cosmetics/Personal Care",
  titleKey: "services.cosmetics-personal-care.title",
  image: "/assets/images/landing/service/cosmotics.png",
  imageMobile: "/assets/images/landing/services/cosmotics-mobile.png",
  description:
    "Radiant Research is committed towards cruelty free testing for cosmetics and we have established in vitro cell based testing facility to provide non animal testing services. At Radiant Research, we maintain large cell repository with more than 60 different cell lines and optimized range of screening tests to offer End to End research services for various cosmetic and personal care products. At Radiant Research, we have established three dimensional human skin equivalent models such as EpiDerm, EpiSkin, SkinEthic and Start-M to evaluate the efficacy, safety and permeation/absorption of cosmetic ingredients and cosmetics.",
  descriptionKey: "services.cosmetics-personal-care.description",
  subtitle:
    "Cruelty-Free Cosmetic Testing & Development with 3D Human Skin Models",
  subtitleKey: "services.cosmetics-personal-care.subtitle",
  highlights: [
    "Cruelty-Free Testing",
    "60+ Cell Lines Repository",
    "3D Human Skin Equivalent Models (EpiDerm, EpiSkin, SkinEthic, Start-M)",
    "In Vitro Methods",
    "End-to-End Research Services",
    "Efficacy, Safety and Permeation Studies",
  ],
  highlightKeys: [
    "services.cosmetics-personal-care.highlights.cruelty-free",
    "services.cosmetics-personal-care.highlights.cell-lines",
    "services.cosmetics-personal-care.highlights.skin-models",
    "services.cosmetics-personal-care.highlights.in-vitro",
    "services.cosmetics-personal-care.highlights.end-to-end",
    "services.cosmetics-personal-care.highlights.efficacy-safety",
  ],
  preclinicalServices: [
    {
      title: "Skin Lightening",
      titleKey: "services.cosmetics-personal-care.services.skin-lightening.title",
      description:
        "In vitro efficacy studies for skin lightening formulations.",
      descriptionKey: "services.cosmetics-personal-care.services.skin-lightening.description",
    },
    {
      title: "Sun Protection Factor (SPF)",
      titleKey: "services.cosmetics-personal-care.services.spf.title",
      description: "SPF determination and UV protection assessment.",
      descriptionKey: "services.cosmetics-personal-care.services.spf.description",
    },
    {
      title: "Anti-aging",
      titleKey: "services.cosmetics-personal-care.services.anti-aging.title",
      description: "Anti-aging efficacy evaluation using advanced models.",
      descriptionKey: "services.cosmetics-personal-care.services.anti-aging.description",
    },
    {
      title: "Skin tightening",
      titleKey: "services.cosmetics-personal-care.services.skin-tightening.title",
      description: "Skin firmness and tightening effect assessment.",
      descriptionKey: "services.cosmetics-personal-care.services.skin-tightening.description",
    },
    {
      title: "Psoriasis",
      titleKey: "services.cosmetics-personal-care.services.psoriasis.title",
      description: "Anti-psoriatic efficacy evaluation studies.",
      descriptionKey: "services.cosmetics-personal-care.services.psoriasis.description",
    },
    {
      title: "Scar/wound healing",
      titleKey: "services.cosmetics-personal-care.services.scar-healing.title",
      description: "Wound healing and scar reduction studies.",
      descriptionKey: "services.cosmetics-personal-care.services.scar-healing.description",
    },
    {
      title: "Anti-acne",
      titleKey: "services.cosmetics-personal-care.services.anti-acne.title",
      description: "Anti-acne efficacy and sebum control studies.",
      descriptionKey: "services.cosmetics-personal-care.services.anti-acne.description",
    },
    {
      title: "Anti-Dandruff",
      titleKey: "services.cosmetics-personal-care.services.anti-dandruff.title",
      description: "Anti-dandruff efficacy evaluation.",
      descriptionKey: "services.cosmetics-personal-care.services.anti-dandruff.description",
    },
    {
      title: "Deodorant",
      titleKey: "services.cosmetics-personal-care.services.deodorant.title",
      description: "Deodorant efficacy and antimicrobial studies.",
      descriptionKey: "services.cosmetics-personal-care.services.deodorant.description",
    },
    {
      title: "Skin Moisturizing",
      titleKey: "services.cosmetics-personal-care.services.moisturizing.title",
      description: "Skin hydration and moisturizing effect studies.",
      descriptionKey: "services.cosmetics-personal-care.services.moisturizing.description",
    },
    {
      title: "Skin pigmentation",
      titleKey: "services.cosmetics-personal-care.services.pigmentation.title",
      description: "Skin pigmentation modulation studies.",
      descriptionKey: "services.cosmetics-personal-care.services.pigmentation.description",
    },
    {
      title: "Hair growth/anti-hair fall",
      titleKey: "services.cosmetics-personal-care.services.hair-growth.title",
      description: "Hair growth stimulation and anti-hair fall studies.",
      descriptionKey: "services.cosmetics-personal-care.services.hair-growth.description",
    },
    {
      title:
        "Dermal permeation/absorption using EpiskinTM / EpidermTM/ Porcine skin/Start-M",
      titleKey: "services.cosmetics-personal-care.services.dermal-permeation.title",
      description:
        "Skin penetration and absorption studies using validated models.",
      descriptionKey: "services.cosmetics-personal-care.services.dermal-permeation.description",
    },
  ],
  toxicologyServices: [
    {
      title: "3T3 NRU phototoxicity (Skin irritation)",
      titleKey: "services.cosmetics-personal-care.services.phototoxicity.title",
      description: "Phototoxicity and skin irritation assessment.",
      descriptionKey: "services.cosmetics-personal-care.services.phototoxicity.description",
    },
    {
      title: "Acute Dermal toxicity",
      titleKey: "services.cosmetics-personal-care.services.acute-dermal.title",
      description: "Acute dermal toxicity evaluation.",
      descriptionKey: "services.cosmetics-personal-care.services.acute-dermal.description",
    },
    {
      title: "Acute ocular toxicity",
      titleKey: "services.cosmetics-personal-care.services.acute-ocular.title",
      description: "Eye irritation and toxicity assessment.",
      descriptionKey: "services.cosmetics-personal-care.services.acute-ocular.description",
    },
    {
      title: "Acute inhalation toxicity",
      titleKey: "services.cosmetics-personal-care.services.acute-inhalation.title",
      description: "Inhalation toxicity studies.",
      descriptionKey: "services.cosmetics-personal-care.services.acute-inhalation.description",
    },
    {
      title: "Skin sensitization",
      titleKey: "services.cosmetics-personal-care.services.skin-irritation.title",
      description: "Allergic sensitization potential assessment.",
      descriptionKey: "services.cosmetics-personal-care.services.skin-irritation.description",
    },
    {
      title: "Genotoxicity",
      titleKey: "services.cosmetics-personal-care.services.genotoxicity.title",
      description: "Genetic toxicity evaluation studies.",
      descriptionKey: "services.cosmetics-personal-care.services.genotoxicity.description",
    },
    {
      title: "AMES test (BRMT)",
      titleKey: "services.cosmetics-personal-care.services.ames-test.title",
      description: "Bacterial reverse mutation test.",
      descriptionKey: "services.cosmetics-personal-care.services.ames-test.description",
    },
    {
      title: "Chromosomal aberration in CHO-K1 cells",
      titleKey: "services.cosmetics-personal-care.services.chromosomal.title",
      description: "Chromosomal damage assessment in CHO-K1 cells.",
      descriptionKey: "services.cosmetics-personal-care.services.chromosomal.description",
    },
  ],
  phytochemistryServices: [
    {
      title: "Phytochemical Analysis",
      titleKey: "services.cosmetics-personal-care.services.phytochemical-analysis.title",
      description: "Natural ingredient characterization and analysis.",
      descriptionKey: "services.cosmetics-personal-care.services.phytochemical-analysis.description",
    },
    {
      title: "Botanical Extract Studies",
      titleKey: "services.cosmetics-personal-care.services.botanical-extract.title",
      description: "Plant extract efficacy and safety evaluation.",
      descriptionKey: "services.cosmetics-personal-care.services.botanical-extract.description",
    },
    {
      title: "Natural Product Development",
      titleKey: "services.cosmetics-personal-care.services.natural-product-dev.title",
      description:
        "Development and standardization of natural cosmetic ingredients.",
      descriptionKey: "services.cosmetics-personal-care.services.natural-product-dev.description",
    },
  ],
  clinicalServices: [
    {
      title: "Feasibility & Regulatory approvals",
      titleKey: "services.cosmetics-personal-care.services.feasibility-regulatory.title",
      description: "Clinical trial feasibility and regulatory support.",
      descriptionKey: "services.cosmetics-personal-care.services.feasibility-regulatory.description",
    },
    {
      title: "Medical Writing",
      titleKey: "services.cosmetics-personal-care.services.medical-writing-cosmetics.title",
      description: "Clinical documentation and medical writing services.",
      descriptionKey: "services.cosmetics-personal-care.services.medical-writing-cosmetics.description",
    },
    {
      title: "Project Management",
      titleKey: "services.cosmetics-personal-care.services.project-management-cosmetics.title",
      description: "Clinical trial project management and coordination.",
      descriptionKey: "services.cosmetics-personal-care.services.project-management-cosmetics.description",
    },
    {
      title: "Clinical trial and Site management",
      titleKey: "services.cosmetics-personal-care.services.clinical-trial-site.title",
      description: "Clinical trial execution and site management.",
      descriptionKey: "services.cosmetics-personal-care.services.clinical-trial-site.description",
    },
    {
      title: "Clinical Trial Monitoring",
      titleKey: "services.cosmetics-personal-care.services.clinical-monitoring-cosmetics.title",
      description: "Clinical trial monitoring and quality assurance.",
      descriptionKey: "services.cosmetics-personal-care.services.clinical-monitoring-cosmetics.description",
    },
    {
      title: "Clinical Data Management",
      titleKey: "services.cosmetics-personal-care.services.clinical-data-cosmetics.title",
      description: "Clinical data collection and management systems.",
      descriptionKey: "services.cosmetics-personal-care.services.clinical-data-cosmetics.description",
    },
    {
      title: "Biostatistics",
      titleKey: "services.cosmetics-personal-care.services.biostatistics-cosmetics.title",
      description: "Statistical analysis and data interpretation.",
      descriptionKey: "services.cosmetics-personal-care.services.biostatistics-cosmetics.description",
    },
  ],
  qualityControlServices: [
    {
      title: "Physico chemical analysis",
      titleKey: "services.cosmetics-personal-care.services.physicochemical.title",
      description: "Physical and chemical characterization of products.",
      descriptionKey: "services.cosmetics-personal-care.services.physicochemical.description",
    },
    {
      title: "Determination of pH",
      titleKey: "services.cosmetics-personal-care.services.ph-determination.title",
      description: "pH measurement and optimization for skin compatibility.",
      descriptionKey: "services.cosmetics-personal-care.services.ph-determination.description",
    },
    {
      title: "Melting point",
      titleKey: "services.cosmetics-personal-care.services.melting-point.title",
      description: "Melting point determination for product characterization.",
      descriptionKey: "services.cosmetics-personal-care.services.melting-point.description",
    },
    {
      title: "Marker analysis by HPLC",
      titleKey: "services.cosmetics-personal-care.services.marker-analysis.title",
      description: "HPLC analysis for active ingredient quantification.",
      descriptionKey: "services.cosmetics-personal-care.services.marker-analysis.description",
    },
    {
      title: "Stability Studies (Real time & Accelerated Stability Studies)",
      titleKey: "services.cosmetics-personal-care.services.stability-studies.title",
      description: "Comprehensive stability testing under various conditions.",
      descriptionKey: "services.cosmetics-personal-care.services.stability-studies.description",
    },
    {
      title: "Viscosity Measurements",
      titleKey: "services.cosmetics-personal-care.services.viscosity.title",
      description: "Rheological properties and viscosity assessment.",
      descriptionKey: "services.cosmetics-personal-care.services.viscosity.description",
    },
    {
      title: "Determination Ash Value",
      titleKey: "services.cosmetics-personal-care.services.ash-value.title",
      description: "Ash content determination for quality control.",
      descriptionKey: "services.cosmetics-personal-care.services.ash-value.description",
    },
    {
      title: "Refractive Index",
      titleKey: "services.cosmetics-personal-care.services.refractive-index.title",
      description: "Refractive index measurement for product identification.",
      descriptionKey: "services.cosmetics-personal-care.services.refractive-index.description",
    },
    {
      title: "Titrations",
      titleKey: "services.cosmetics-personal-care.services.titrations.title",
      description: "Quantitative chemical analysis through titration methods.",
      descriptionKey: "services.cosmetics-personal-care.services.titrations.description",
    },
    {
      title: "Microbial analysis",
      titleKey: "services.cosmetics-personal-care.services.microbial-analysis-cosmetics.title",
      description: "Microbiological safety and contamination assessment.",
      descriptionKey: "services.cosmetics-personal-care.services.microbial-analysis-cosmetics.description",
    },
    {
      title: "Total aerobic count",
      titleKey: "services.cosmetics-personal-care.services.aerobic-count.title",
      description: "Total viable count determination.",
      descriptionKey: "services.cosmetics-personal-care.services.aerobic-count.description",
    },
    {
      title: "Specific Pathogen detection",
      titleKey: "services.cosmetics-personal-care.services.pathogen-detection.title",
      description: "Detection and identification of specific pathogens.",
      descriptionKey: "services.cosmetics-personal-care.services.pathogen-detection.description",
    },
    {
      title: "Preservative efficacy testing (PET)",
      titleKey: "services.cosmetics-personal-care.services.preservative-efficacy.title",
      description: "Preservative system effectiveness evaluation.",
      descriptionKey: "services.cosmetics-personal-care.services.preservative-efficacy.description",
    },
    {
      title: "Water analysis",
      titleKey: "services.cosmetics-personal-care.services.water-analysis.title",
      description: "Water quality testing for cosmetic manufacturing.",
      descriptionKey: "services.cosmetics-personal-care.services.water-analysis.description",
    },
    {
      title: "Time Kill Assay",
      titleKey: "services.cosmetics-personal-care.services.time-kill.title",
      description: "Antimicrobial efficacy kinetics evaluation.",
      descriptionKey: "services.cosmetics-personal-care.services.time-kill.description",
    },
  ],
};

export default function CosmeticsPersonalCareService() {
  return <ServiceComponent serviceData={serviceData} />;
}
