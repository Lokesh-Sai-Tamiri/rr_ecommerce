/**
 * @fileoverview Herbal/Naturals service component
 */

"use client";

import React from "react";
import ServiceComponent from "./shared/ServiceComponent";

const serviceData = {
  title: "Herbal/Naturals",
  titleKey: "services.herbal-naturals.title",
  image: "/assets/images/landing/service/herbals.png",
  imageMobile: "/assets/images/landing/services/herbal-mobile.png",
  description:
    "We at Radiant Research with an overall experience of over 25 years in Herbal and Ayurvedic research equipped with state of the art research facility offer a wide range of cost effective and customized preclinical and clinical research services to validate the efficacy and safety of raw materials and formulations to fulfil the regulatory requirements. Radiant Research has an experience of working with different research teams to develop and evaluate the herbal and Ayurvedic products for the regulatory submissions with in specific time lines. Radiant Research, an ISO 9001:2008 certified and Department of AYUSH approved facility offers time bound quality testing services for the raw material and finished products.",
  descriptionKey: "services.herbal-naturals.description",
  subtitle: "Traditional Herbal Medicine Research & Development",
  subtitleKey: "services.herbal-naturals.subtitle",
  highlights: [
    "25+ Years Herbal & Ayurvedic Research Experience",
    "ISO 9001:2008 Certified",
    "Department of AYUSH Approved",
    "State of Art Research Facility",
    "Complete Regulatory Compliance",
    "Time Bound Quality Testing Services",
  ],
  highlightKeys: [
    "services.herbal-naturals.highlights.experience",
    "services.herbal-naturals.highlights.iso-certified",
    "services.herbal-naturals.highlights.ayush-approved",
    "services.herbal-naturals.highlights.facility",
    "services.herbal-naturals.highlights.regulatory",
    "services.herbal-naturals.highlights.quality-testing",
  ],
  pharmacognosticServices: [
    {
      title: "Physicochemical analysis",
      titleKey: "services.herbal-naturals.services.physicochemical.title",
      description:
        "Ash values, moisture content, minerals content, extractive values analysis.",
      descriptionKey: "services.herbal-naturals.services.physicochemical.description",
    },
    {
      title: "Fluorescence analysis",
      titleKey: "services.herbal-naturals.services.fluorescence.title",
      description:
        "Fluorescence characterization for botanical identification.",
      descriptionKey: "services.herbal-naturals.services.fluorescence.description",
    },
    {
      title: "Microscopic study",
      titleKey: "services.herbal-naturals.services.microscopic.title",
      description:
        "TS, powder study, vein lets, vein termination, stomatal index analysis.",
      descriptionKey: "services.herbal-naturals.services.microscopic.description",
    },
    {
      title: "HPTLC and HPLC fingerprinting",
      titleKey: "services.herbal-naturals.services.hptlc-hplc.title",
      description:
        "Advanced chromatographic identification and standardization.",
      descriptionKey: "services.herbal-naturals.services.hptlc-hplc.description",
    },
    {
      title: "GCMS library Data",
      titleKey: "services.herbal-naturals.services.gcms.title",
      description:
        "Gas chromatography mass spectrometry compound identification.",
      descriptionKey: "services.herbal-naturals.services.gcms.description",
    },
  ],
  phytochemistryServices: [
    {
      title: "Extraction of raw materials",
      titleKey: "services.herbal-naturals.services.extraction.title",
      description: "Various extraction methods for optimal compound recovery.",
      descriptionKey: "services.herbal-naturals.services.extraction.description",
    },
    {
      title: "Phytochemical analysis",
      titleKey: "services.herbal-naturals.services.phytochemical.title",
      description: "Comprehensive chemical profiling of plant constituents.",
      descriptionKey: "services.herbal-naturals.services.phytochemical.description",
    },
    {
      title: "Isolation and characterization of phytoconstituents",
      titleKey: "services.herbal-naturals.services.isolation.title",
      description:
        "Purification and structural elucidation of active compounds.",
      descriptionKey: "services.herbal-naturals.services.isolation.description",
    },
    {
      title: "Bioassay guided isolation",
      titleKey: "services.herbal-naturals.services.bioassay.title",
      description:
        "Activity-guided isolation for diabetes, antioxidants, antimicrobial applications.",
      descriptionKey: "services.herbal-naturals.services.bioassay.description",
    },
  ],
  preclinicalServices: [
    {
      title: "Cancer",
      titleKey: "services.herbal-naturals.services.cancer.title",
      description:
        "Anti-cancer efficacy studies using advanced in vitro and in vivo models.",
      descriptionKey: "services.herbal-naturals.services.cancer.description",
    },
    {
      title: "Antioxidant",
      titleKey: "services.herbal-naturals.services.antioxidant.title",
      description:
        "Comprehensive antioxidant capacity evaluation using multiple assays.",
      descriptionKey: "services.herbal-naturals.services.antioxidant.description",
    },
    {
      title: "Diabetes",
      titleKey: "services.herbal-naturals.services.diabetes.title",
      description:
        "Anti-diabetic efficacy assessment and glucose metabolism studies.",
      descriptionKey: "services.herbal-naturals.services.diabetes.description",
    },
    {
      title: "Immunomodulatory & Inflammation",
      titleKey: "services.herbal-naturals.services.immunomodulatory.title",
      description: "Immune system modulation and anti-inflammatory studies.",
      descriptionKey: "services.herbal-naturals.services.immunomodulatory.description",
    },
    {
      title: "Hepatoprotective",
      titleKey: "services.herbal-naturals.services.hepatoprotective.title",
      description: "Liver protection and hepatotoxicity prevention studies.",
      descriptionKey: "services.herbal-naturals.services.hepatoprotective.description",
    },
    {
      title: "Obesity",
      titleKey: "services.herbal-naturals.services.obesity.title",
      description: "Anti-obesity efficacy and weight management studies.",
      descriptionKey: "services.herbal-naturals.services.obesity.description",
    },
    {
      title: "Anti-infectives",
      titleKey: "services.herbal-naturals.services.anti-infective.title",
      description:
        "Antimicrobial, antiviral, and antifungal efficacy evaluation.",
      descriptionKey: "services.herbal-naturals.services.anti-infective.description",
    },
    {
      title: "Anti-oxidants",
      titleKey: "services.herbal-naturals.services.antioxidant.title",
      description:
        "Advanced antioxidant capacity and protective effect studies.",
      descriptionKey: "services.herbal-naturals.services.antioxidant.description",
    },
    {
      title: "Anti infective",
      titleKey: "services.herbal-naturals.services.anti-infective.title",
      description: "Broad spectrum anti-infective activity evaluation.",
      descriptionKey: "services.herbal-naturals.services.anti-infective.description",
    },
  ],
  toxicologyServices: [
    {
      title: "Acute oral Toxicity",
      titleKey: "services.herbal-naturals.services.acute-oral.title",
      description:
        "Single dose oral toxicity assessment and safety evaluation.",
      descriptionKey: "services.herbal-naturals.services.acute-oral.description",
    },
    {
      title: "Acute Dermal toxicity",
      titleKey: "services.herbal-naturals.services.acute-dermal.title",
      description: "Dermal exposure toxicity evaluation and safety assessment.",
      descriptionKey: "services.herbal-naturals.services.acute-dermal.description",
    },
    {
      title: "Acute ocular toxicity",
      titleKey: "services.herbal-naturals.services.acute-ocular.title",
      description: "Eye irritation and ocular toxicity studies.",
      descriptionKey: "services.herbal-naturals.services.acute-ocular.description",
    },
    {
      title: "Acute inhalation toxicity",
      titleKey: "services.herbal-naturals.services.acute-inhalation.title",
      description:
        "Respiratory toxicity assessment through inhalation exposure.",
      descriptionKey: "services.herbal-naturals.services.acute-inhalation.description",
    },
    {
      title: "Repeat-Dose Toxicity Studies (Sub-acute/Subchronic/Chronic)",
      titleKey: "services.herbal-naturals.services.repeat-dose.title",
      description: "Long-term toxicity evaluation with repeated dosing.",
      descriptionKey: "services.herbal-naturals.services.repeat-dose.description",
    },
    {
      title: "Skin sensitization",
      titleKey: "services.herbal-naturals.services.skin-sensitization.title",
      description: "Allergic sensitization potential assessment.",
      descriptionKey: "services.herbal-naturals.services.skin-sensitization.description",
    },
    {
      title: "Genotoxicity",
      titleKey: "services.herbal-naturals.services.genotoxicity.title",
      description: "DNA damage and mutagenic potential assessment.",
      descriptionKey: "services.herbal-naturals.services.genotoxicity.description",
    },
    {
      title: "AMES test (BRMT)",
      titleKey: "services.herbal-naturals.services.ames-test.title",
      description: "Bacterial reverse mutation test for mutagenicity.",
      descriptionKey: "services.herbal-naturals.services.ames-test.description",
    },
    {
      title: "Chromosomal aberration in CHO-K1 cells",
      titleKey: "services.herbal-naturals.services.chromosomal-aberration.title",
      description: "Chromosomal damage evaluation in mammalian cells.",
      descriptionKey: "services.herbal-naturals.services.chromosomal-aberration.description",
    },
    {
      title: "Micronucleus assay",
      titleKey: "services.herbal-naturals.services.micronucleus.title",
      description: "Genotoxicity assessment using micronucleus formation.",
      descriptionKey: "services.herbal-naturals.services.micronucleus.description",
    },
  ],
  clinicalServices: [
    {
      title: "Feasibility & Regulatory approvals",
      titleKey: "services.herbal-naturals.services.feasibility.title",
      description:
        "Clinical trial feasibility assessment and regulatory compliance support.",
      descriptionKey: "services.herbal-naturals.services.feasibility.description",
    },
    {
      title: "Medical Writing",
      titleKey: "services.herbal-naturals.services.medical-writing.title",
      description:
        "Clinical documentation and regulatory submission preparation.",
      descriptionKey: "services.herbal-naturals.services.medical-writing.description",
    },
    {
      title: "Project Management",
      titleKey: "services.herbal-naturals.services.project-management.title",
      description:
        "End-to-end clinical trial project management and coordination.",
      descriptionKey: "services.herbal-naturals.services.project-management.description",
    },
    {
      title: "Clinical trial and Site management",
      titleKey: "services.herbal-naturals.services.trial-management.title",
      description:
        "Clinical trial execution and investigational site management.",
      descriptionKey: "services.herbal-naturals.services.trial-management.description",
    },
    {
      title: "Clinical Trial Monitoring",
      titleKey: "services.herbal-naturals.services.monitoring.title",
      description:
        "Quality assurance and monitoring throughout clinical studies.",
      descriptionKey: "services.herbal-naturals.services.monitoring.description",
    },
    {
      title: "Clinical Data Management",
      titleKey: "services.herbal-naturals.services.data-management.title",
      description:
        "Clinical data collection, processing, and management systems.",
      descriptionKey: "services.herbal-naturals.services.data-management.description",
    },
    {
      title: "Biostatistics",
      titleKey: "services.herbal-naturals.services.biostatistics.title",
      description:
        "Statistical analysis and interpretation of clinical trial data.",
      descriptionKey: "services.herbal-naturals.services.biostatistics.description",
    },
  ],
};

export default function HerbalNaturalsService() {
  return <ServiceComponent serviceData={serviceData} />;
}
