/**
 * @fileoverview Drug Testing Lab service component
 */

"use client";

import React from "react";
import ServiceComponent from "./shared/ServiceComponent";

const serviceData = {
  title: "Drug Testing Lab",
  titleKey: "services.drug-testing-lab.title",
  image: "/assets/images/landing/service/drug-test-lab.png",
  imageMobile: "/assets/images/landing/services/drug-test-lab-mobile.png",
  description:
    "Radiant Research, a ISO 9001:2008 certified facility for Quality Management System and one of the very few approved Drug Testing Lab by Ministry of AYUSH, New Delhi. Our Drug Testing Lab is one of the best in its class offering complete range of quality control services to Herbal, Ayurvedic, Cosmetic, Nutraceutical and Pharmaceutical raw materials and finished products as per various pharmacopeial and formulary standards. Radiant Research is committed towards continuous improvement of quality of service and customer satisfaction to provide quality products and to be an integral part in improving the standards of human health. At Radiant Research, we offer quality and time bound testing services ranging from physicochemical to biological safety profiling as per national and international regulations.",
  descriptionKey: "services.drug-testing-lab.description",
  subtitle: "Ministry of AYUSH Approved Drug Testing Laboratory",
  subtitleKey: "services.drug-testing-lab.subtitle",
  highlights: [
    "Ministry of AYUSH Approved",
    "ISO 9001:2008 Certified",
    "Complete Quality Control Services",
    "Pharmacopeial Standards Compliance",
    "National & International Regulations",
    "Time Bound Testing Services",
  ],
  highlightKeys: [
    "services.drug-testing-lab.highlights.ayush-approved",
    "services.drug-testing-lab.highlights.iso-certified",
    "services.drug-testing-lab.highlights.quality-control",
    "services.drug-testing-lab.highlights.pharmacopeial",
    "services.drug-testing-lab.highlights.regulations",
    "services.drug-testing-lab.highlights.time-bound",
  ],
  physicochemicalServices: [
    {
      title: "Determination of pH",
      titleKey: "services.drug-testing-lab.services.ph-determination.title",
      description: "pH measurement and analysis for product characterization.",
      descriptionKey: "services.drug-testing-lab.services.ph-determination.description",
    },
    {
      title: "Moisture Content Analysis (LOD)",
      titleKey: "services.drug-testing-lab.services.moisture-content.title",
      description: "Loss on drying and moisture content determination.",
      descriptionKey: "services.drug-testing-lab.services.moisture-content.description",
    },
    {
      title: "Disintegration",
      titleKey: "services.drug-testing-lab.services.disintegration.title",
      description: "Tablet and capsule disintegration time testing.",
      descriptionKey: "services.drug-testing-lab.services.disintegration.description",
    },
    {
      title: "Dissolution",
      titleKey: "services.drug-testing-lab.services.dissolution.title",
      description: "Drug release profile and dissolution rate studies.",
      descriptionKey: "services.drug-testing-lab.services.dissolution.description",
    },
    {
      title: "Melting point",
      titleKey: "services.drug-testing-lab.services.melting-point.title",
      description: "Thermal characterization and purity assessment.",
      descriptionKey: "services.drug-testing-lab.services.melting-point.description",
    },
    {
      title: "Marker analysis by HPLC",
      titleKey: "services.drug-testing-lab.services.marker-analysis.title",
      description:
        "Active ingredient quantification by high-performance liquid chromatography.",
      descriptionKey: "services.drug-testing-lab.services.marker-analysis.description",
    },
    {
      title: "Friability",
      titleKey: "services.drug-testing-lab.services.friability.title",
      description: "Tablet mechanical strength and durability testing.",
      descriptionKey: "services.drug-testing-lab.services.friability.description",
    },
    {
      title: "Hardness",
      titleKey: "services.drug-testing-lab.services.hardness.title",
      description: "Tablet hardness and mechanical integrity assessment.",
      descriptionKey: "services.drug-testing-lab.services.hardness.description",
    },
    {
      title: "Stability Studies (Real time & Accelerated)",
      titleKey: "services.drug-testing-lab.services.stability-studies.title",
      description: "Long-term and accelerated stability testing protocols.",
      descriptionKey: "services.drug-testing-lab.services.stability-studies.description",
    },
    {
      title: "Bulk density & Tap Density",
      titleKey: "services.drug-testing-lab.services.bulk-density.title",
      description: "Powder flow properties and compaction characteristics.",
      descriptionKey: "services.drug-testing-lab.services.bulk-density.description",
    },
    {
      title: "Viscosity Measurements",
      titleKey: "services.drug-testing-lab.services.viscosity.title",
      description: "Rheological properties assessment for liquid formulations.",
      descriptionKey: "services.drug-testing-lab.services.viscosity.description",
    },
    {
      title: "Determination Ash Value",
      titleKey: "services.drug-testing-lab.services.ash-value.title",
      description: "Inorganic residue content analysis.",
      descriptionKey: "services.drug-testing-lab.services.ash-value.description",
    },
    {
      title: "Weight Variation",
      titleKey: "services.drug-testing-lab.services.weight-variation.title",
      description: "Dosage form weight uniformity testing.",
      descriptionKey: "services.drug-testing-lab.services.weight-variation.description",
    },
    {
      title: "Sieve Analysis",
      titleKey: "services.drug-testing-lab.services.sieve-analysis.title",
      description: "Particle size distribution analysis.",
      descriptionKey: "services.drug-testing-lab.services.sieve-analysis.description",
    },
    {
      title: "Refractive Index",
      titleKey: "services.drug-testing-lab.services.refractive-index.title",
      description: "Optical property measurement for identification.",
      descriptionKey: "services.drug-testing-lab.services.refractive-index.description",
    },
    {
      title: "Thickness",
      titleKey: "services.drug-testing-lab.services.thickness.title",
      description: "Tablet thickness uniformity assessment.",
      descriptionKey: "services.drug-testing-lab.services.thickness.description",
    },
    {
      title: "Limit Tests",
      titleKey: "services.drug-testing-lab.services.limit-tests.title",
      description: "Impurity and contaminant limit testing.",
      descriptionKey: "services.drug-testing-lab.services.limit-tests.description",
    },
    {
      title: "Titrations",
      titleKey: "services.drug-testing-lab.services.titrations.title",
      description: "Quantitative analysis through various titration methods.",
      descriptionKey: "services.drug-testing-lab.services.titrations.description",
    },
  ],
  microbialServices: [
    {
      title: "Microbial Analysis (TMC & TFC)",
      titleKey: "services.drug-testing-lab.services.microbial-analysis.title",
      description:
        "Total microbial count and total fungal count determination.",
      descriptionKey: "services.drug-testing-lab.services.microbial-analysis.description",
    },
    {
      title: "Most Probable Number (MPN)",
      titleKey: "services.drug-testing-lab.services.mpn.title",
      description: "Statistical microbial enumeration methods.",
      descriptionKey: "services.drug-testing-lab.services.mpn.description",
    },
    {
      title: "Specific pathogen detection",
      titleKey: "services.drug-testing-lab.services.pathogen-detection.title",
      description: "Detection of specific harmful microorganisms.",
      descriptionKey: "services.drug-testing-lab.services.pathogen-detection.description",
    },
    {
      title: "Preservative efficacy testing (PET)",
      titleKey: "services.drug-testing-lab.services.pet.title",
      description: "Antimicrobial preservative system effectiveness.",
      descriptionKey: "services.drug-testing-lab.services.pet.description",
    },
    {
      title: "Microbiological assay of antibiotics",
      titleKey: "services.drug-testing-lab.services.antibiotic-assay.title",
      description: "Antibiotic potency and efficacy assessment.",
      descriptionKey: "services.drug-testing-lab.services.antibiotic-assay.description",
    },
    {
      title: "Sterility testing",
      titleKey: "services.drug-testing-lab.services.sterility.title",
      description: "Sterility assurance for injectable and sterile products.",
      descriptionKey: "services.drug-testing-lab.services.sterility.description",
    },
    {
      title: "Bacterial Endotoxin Test (BET)",
      titleKey: "services.drug-testing-lab.services.bet.title",
      description: "Pyrogen testing for injectable pharmaceutical products.",
      descriptionKey: "services.drug-testing-lab.services.bet.description",
    },
    {
      title: "Water analysis",
      titleKey: "services.drug-testing-lab.services.water-analysis.title",
      description: "Comprehensive water quality testing and validation.",
      descriptionKey: "services.drug-testing-lab.services.water-analysis.description",
    },
  ],
  specializedServices: [
    {
      title: "Glucose oxidase & Lactoperoxidase determination",
      titleKey: "services.drug-testing-lab.services.glucose-oxidase.title",
      description: "Enzyme activity analysis and quantification.",
      descriptionKey: "services.drug-testing-lab.services.glucose-oxidase.description",
    },
    {
      title: "Analysis of products for Gliadin, Aflatoxins, mycotoxins",
      titleKey: "services.drug-testing-lab.services.gliadin-analysis.title",
      description: "Food safety and allergen testing.",
      descriptionKey: "services.drug-testing-lab.services.gliadin-analysis.description",
    },
    {
      title: "Marker analysis of herbal products",
      titleKey: "services.drug-testing-lab.services.herbal-marker.title",
      description: "Herbal product standardization and quality assessment.",
      descriptionKey: "services.drug-testing-lab.services.herbal-marker.description",
    },
    {
      title: "Pyrogen testing",
      titleKey: "services.drug-testing-lab.services.pyrogen.title",
      description: "Comprehensive pyrogen safety evaluation.",
      descriptionKey: "services.drug-testing-lab.services.pyrogen.description",
    },
  ],
  toxicologyServices: [
    {
      title: "Acute oral Toxicity",
      titleKey: "services.drug-testing-lab.services.acute-oral.title",
      description:
        "Single dose oral toxicity assessment and safety evaluation.",
      descriptionKey: "services.drug-testing-lab.services.acute-oral.description",
    },
    {
      title: "Acute Dermal toxicity",
      titleKey: "services.drug-testing-lab.services.acute-dermal.title",
      description: "Dermal exposure toxicity evaluation and safety assessment.",
      descriptionKey: "services.drug-testing-lab.services.acute-dermal.description",
    },
    {
      title: "Acute ocular toxicity",
      titleKey: "services.drug-testing-lab.services.acute-ocular.title",
      description: "Eye irritation and ocular toxicity studies.",
      descriptionKey: "services.drug-testing-lab.services.acute-ocular.description",
    },
    {
      title: "Acute inhalation toxicity",
      titleKey: "services.drug-testing-lab.services.acute-inhalation.title",
      description:
        "Respiratory toxicity assessment through inhalation exposure.",
      descriptionKey: "services.drug-testing-lab.services.acute-inhalation.description",
    },
    {
      title: "Repeat-Dose Toxicity Studies (Sub-acute/Subchronic/Chronic)",
      titleKey: "services.drug-testing-lab.services.repeat-dose.title",
      description: "Long-term toxicity evaluation with repeated dosing.",
      descriptionKey: "services.drug-testing-lab.services.repeat-dose.description",
    },
    {
      title: "Skin sensitization",
      titleKey: "services.drug-testing-lab.services.skin-sensitization.title",
      description: "Allergic sensitization potential assessment.",
      descriptionKey: "services.drug-testing-lab.services.skin-sensitization.description",
    },
    {
      title: "Skin Irritation study",
      titleKey: "services.drug-testing-lab.services.skin-irritation.title",
      description: "Dermal irritation and skin compatibility evaluation.",
      descriptionKey: "services.drug-testing-lab.services.skin-irritation.description",
    },
  ],
};

export default function DrugTestingLabService() {
  return <ServiceComponent serviceData={serviceData} />;
}
