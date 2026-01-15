/**
 * @fileoverview AYUSH service component
 */

"use client";

import React from "react";
import ServiceComponent from "./shared/ServiceComponent";

const serviceData = {
  title: "Ayush",
  titleKey: "services.ayush.title",
  image: "/assets/images/landing/service/ayush.png",
  imageMobile: "/assets/images/landing/services/ayush-mobile.png",
  description:
    "We at Radiant Research with an overall experience of over 25 years in Herbal and Ayurvedic research equipped with state of the art research facility offer a wide range of cost effective and customized preclinical and clinical research services to validate the efficacy and safety of raw materials and formulations to fulfil the regulatory requirements.",
  descriptionKey: "services.ayush.description",
  subtitle: "Traditional Medicine Research & Development",
  subtitleKey: "services.ayush.subtitle",
  companyInfo:
    "Radiant Research has an experience of working with different research teams to develop and evaluate the herbal and Ayurvedic products for the regulatory submissions with in specific time lines. Radiant Research, an ISO 9001:2008 certified and Department of AYUSH approved facility offers time bound quality testing services for the raw material and finished products.",
  companyInfoKey: "services.ayush.companyInfo",
  highlights: [
    "Ayush Ministry Approved",
    "25+ Years Experience",
    "ISO 9001:2008 Certified",
    "Time Bound Quality Testing",
    "Regulatory Submissions",
  ],
  highlightKeys: [
    "services.ayush.highlights.ayush-ministry",
    "services.ayush.highlights.experience",
    "services.ayush.highlights.iso-certified",
    "services.ayush.highlights.quality-testing",
    "services.ayush.highlights.regulatory",
  ],
  phytochemistryServices: [
    {
      title: "Physicochemical  Services",
      titleKey: "services.ayush.services.physicochemical.title",
      description:
        "Physicochemical analysis (ash values, moisture content, minerals content, extractive values etc)",
      descriptionKey: "services.ayush.services.physicochemical.description",
    },
    {
      title: "Fluorescence Analysis",
      titleKey: "services.ayush.services.fluorescence.title",
      description:
        "Advanced fluorescence analysis for comprehensive plant material characterization and identification",
      descriptionKey: "services.ayush.services.fluorescence.description",
    },
    {
      title: "Microscopic Study",
      titleKey: "services.ayush.services.microscopic.title",
      description:
        "TS, powder study, vein lets, vein termination, stomatal index analysis for botanical identification",
      descriptionKey: "services.ayush.services.microscopic.description",
    },
    {
      title: "HPTLC and HPLC Fingerprinting",
      titleKey: "services.ayush.services.hptlc-hplc.title",
      description:
        "Advanced chromatographic identification and quantification of bioactive compounds",
      descriptionKey: "services.ayush.services.hptlc-hplc.description",
    },
    {
      title: "GCMS Library Data",
      titleKey: "services.ayush.services.gcms.title",
      description:
        "Gas chromatography-mass spectrometry analysis with comprehensive library matching",
      descriptionKey: "services.ayush.services.gcms.description",
    },
  ],
  preclinicalServices: [
    {
      title: "Efficacy Studies",
      titleKey: "services.ayush.services.efficacy.title",
      description:
        "Comprehensive in vitro and in vivo efficacy evaluation using validated research protocols",
      descriptionKey: "services.ayush.services.efficacy.description",
    },
    {
      title: "Cancer Research",
      titleKey: "services.ayush.services.cancer.title",
      description:
        "Advanced anti-cancer activity evaluation with mechanism studies and cytotoxicity assessment",
      descriptionKey: "services.ayush.services.cancer.description",
    },
    {
      title: "Antioxidant Studies",
      titleKey: "services.ayush.services.antioxidant.title",
      description:
        "Multi-parameter antioxidant capacity evaluation using validated assay methods",
      descriptionKey: "services.ayush.services.antioxidant.description",
    },
    {
      title: "Diabetes Research",
      titleKey: "services.ayush.services.diabetes.title",
      description:
        "Complete diabetic animal models and glucose regulation efficacy studies",
      descriptionKey: "services.ayush.services.diabetes.description",
    },
    {
      title: "Immunomodulatory & Inflammation",
      titleKey: "services.ayush.services.immunomodulatory.title",
      description:
        "Immune system enhancement and comprehensive anti-inflammatory activity research",
      descriptionKey: "services.ayush.services.immunomodulatory.description",
    },
    {
      title: "Hepatoprotective Studies",
      titleKey: "services.ayush.services.hepatoprotective.title",
      description:
        "Liver protection, detoxification, and hepatic function improvement studies",
      descriptionKey: "services.ayush.services.hepatoprotective.description",
    },
    {
      title: "Obesity Research",
      titleKey: "services.ayush.services.obesity.title",
      description:
        "Anti-obesity, weight management, and metabolic enhancement studies",
      descriptionKey: "services.ayush.services.obesity.description",
    },
    {
      title: "Anti-infectives",
      titleKey: "services.ayush.services.anti-infectives.title",
      description:
        "Comprehensive antimicrobial, antiviral, and anti-infective activity evaluation",
      descriptionKey: "services.ayush.services.anti-infectives.description",
    },
  ],
  phytochemistryAdvancedServices: [
    {
      title: "Extraction of Raw Materials",
      titleKey: "services.ayush.services.extraction.title",
      description:
        "Extraction of raw materials with different methods including aqueous, alcoholic, and specialized techniques",
      descriptionKey: "services.ayush.services.extraction.description",
    },
    {
      title: "Phytochemical Analysis",
      titleKey: "services.ayush.services.phytochemical.title",
      description:
        "Comprehensive qualitative and quantitative phytochemical characterization of bioactive compounds",
      descriptionKey: "services.ayush.services.phytochemical.description",
    },
    {
      title: "Isolation & Characterization",
      titleKey: "services.ayush.services.isolation.title",
      description:
        "Isolation and structural characterization of bioactive phytoconstituents using advanced techniques",
      descriptionKey: "services.ayush.services.isolation.description",
    },
    {
      title: "Bioassay Guided Isolation",
      titleKey: "services.ayush.services.bioassay.title",
      description:
        "Bioassay guided isolation and characterization for specific activity (diabetes, antioxidants, antimicrobial etc)",
      descriptionKey: "services.ayush.services.bioassay.description",
    },
  ],
  clinicalServices: [
    {
      title: "Feasibility & Regulatory Approvals",
      titleKey: "services.ayush.services.feasibility.title",
      description:
        "Comprehensive clinical trial feasibility assessment and regulatory approval support",
      descriptionKey: "services.ayush.services.feasibility.description",
    },
    {
      title: "Medical Writing",
      titleKey: "services.ayush.services.medical-writing.title",
      description:
        "Professional protocol development, regulatory documentation, and clinical study report preparation",
      descriptionKey: "services.ayush.services.medical-writing.description",
    },
    {
      title: "Project Management",
      titleKey: "services.ayush.services.project-management.title",
      description:
        "End-to-end clinical trial project management with timeline adherence and quality oversight",
      descriptionKey: "services.ayush.services.project-management.description",
    },
    {
      title: "Clinical Trial and Site Management",
      titleKey: "services.ayush.services.clinical-trial-management.title",
      description:
        "Complete clinical trial coordination and professional site management services",
      descriptionKey: "services.ayush.services.clinical-trial-management.description",
    },
    {
      title: "Clinical Trial Monitoring",
      titleKey: "services.ayush.services.clinical-monitoring.title",
      description:
        "Professional on-site and remote monitoring with comprehensive quality oversight",
      descriptionKey: "services.ayush.services.clinical-monitoring.description",
    },
    {
      title: "Clinical Data Management",
      titleKey: "services.ayush.services.data-management.title",
      description:
        "Advanced data collection, processing, validation, and management systems",
      descriptionKey: "services.ayush.services.data-management.description",
    },
    {
      title: "Biostatistics",
      titleKey: "services.ayush.services.biostatistics.title",
      description:
        "Advanced statistical analysis, data interpretation, and comprehensive reporting services",
      descriptionKey: "services.ayush.services.biostatistics.description",
    },
  ],
  toxicologyServices: [
    {
      title: "Acute Oral Toxicity",
      titleKey: "services.ayush.services.acute-oral.title",
      description:
        "Single-dose oral toxicity assessment following OECD guidelines for safety profiling",
      descriptionKey: "services.ayush.services.acute-oral.description",
    },
    {
      title: "Acute Dermal Toxicity",
      titleKey: "services.ayush.services.acute-dermal.title",
      description:
        "Dermal exposure toxicity evaluation for topical application safety assessment",
      descriptionKey: "services.ayush.services.acute-dermal.description",
    },
    {
      title: "Acute Ocular Toxicity",
      titleKey: "services.ayush.services.acute-ocular.title",
      description:
        "Eye irritation potential and ocular safety assessment studies using validated methods",
      descriptionKey: "services.ayush.services.acute-ocular.description",
    },
    {
      title: "Acute Inhalation Toxicity",
      titleKey: "services.ayush.services.acute-inhalation.title",
      description:
        "Respiratory safety evaluation for inhalation exposure routes using appropriate models",
      descriptionKey: "services.ayush.services.acute-inhalation.description",
    },
    {
      title: "Repeat-Dose Toxicity Studies",
      titleKey: "services.ayush.services.repeat-dose.title",
      description:
        "Sub-acute, Subchronic, and Chronic toxicity studies for long-term safety assessment",
      descriptionKey: "services.ayush.services.repeat-dose.description",
    },
    {
      title: "Skin Sensitization",
      titleKey: "services.ayush.services.skin-sensitization.title",
      description:
        "Allergic potential evaluation and skin sensitivity testing protocols using validated methods",
      descriptionKey: "services.ayush.services.skin-sensitization.description",
    },
    {
      title: "Genotoxicity Assessment",
      titleKey: "services.ayush.services.genotoxicity.title",
      description:
        "Comprehensive genetic toxicity evaluation using multiple validated test systems",
      descriptionKey: "services.ayush.services.genotoxicity.description",
    },
    {
      title: "AMES Test (BRMT)",
      titleKey: "services.ayush.services.ames-test.title",
      description:
        "Bacterial reverse mutation test for mutagenicity assessment using validated protocols",
      descriptionKey: "services.ayush.services.ames-test.description",
    },
    {
      title: "Chromosomal Aberration in CHO-K1 Cells",
      titleKey: "services.ayush.services.chromosomal-aberration.title",
      description:
        "In vitro chromosomal aberration study for genotoxicity evaluation",
      descriptionKey: "services.ayush.services.chromosomal-aberration.description",
    },
    {
      title: "Micronucleus Assay",
      titleKey: "services.ayush.services.micronucleus.title",
      description:
        "In vivo and in vitro micronucleus test for comprehensive genotoxicity screening",
      descriptionKey: "services.ayush.services.micronucleus.description",
    },
  ],
};

export default function AyushService() {
  return <ServiceComponent serviceData={serviceData} />;
}
