/**
 * @fileoverview Clinical Research service component
 */

"use client";

import React from "react";
import ServiceComponent from "./shared/ServiceComponent";

const serviceData = {
  title: "Clinical Research",
  titleKey: "services.clinical-research.title",
  image: "/assets/images/landing/service/clinical.png",
  imageMobile: "/assets/images/landing/services/clinical-mobile.png",
  description:
    "Radiant Research conducts Phases 1 to 4 clinical trials for Pharmaceutical, Nutraceutical, Herbal and Ayurvedic companies, whilst maintaining the highest standards of ethics, quality and confidentiality. We have successfully conducted clinical trials on products from natural origin, nutraceuticals etc to our domestic and foreign clients.",
  descriptionKey: "services.clinical-research.description",
  subtitle: "Complete Clinical Trial Management Services",
  subtitleKey: "services.clinical-research.subtitle",
  highlights: [
    "Phases 1 to 4 Clinical Trials",
    "Wide Network of Hospitals & Doctors",
    "Large Patient Pool Access",
    "Highest Ethical Standards",
    "Bench to Bedside Development",
  ],
  highlightKeys: [
    "services.clinical-research.highlights.phases",
    "services.clinical-research.highlights.network",
    "services.clinical-research.highlights.patient-pool",
    "services.clinical-research.highlights.ethical-standards",
    "services.clinical-research.highlights.bench-to-bedside",
  ],
  preclinicalServices: [
    {
      title: "Phase I Studies",
      titleKey: "services.clinical-research.services.phase1.title",
      description:
        "First-in-human studies for safety and dosage determination.",
      descriptionKey: "services.clinical-research.services.phase1.description",
    },
    {
      title: "Phase II Studies",
      titleKey: "services.clinical-research.services.phase2.title",
      description: "Efficacy evaluation in targeted patient populations.",
      descriptionKey: "services.clinical-research.services.phase2.description",
    },
    {
      title: "Phase III Studies",
      titleKey: "services.clinical-research.services.phase3.title",
      description: "Large-scale comparative effectiveness studies.",
      descriptionKey: "services.clinical-research.services.phase3.description",
    },
    {
      title: "Phase IV Studies",
      titleKey: "services.clinical-research.services.phase4.title",
      description: "Post-market surveillance and long-term safety monitoring.",
      descriptionKey: "services.clinical-research.services.phase4.description",
    },
  ],
  toxicologyServices: [
    {
      title: "Safety Monitoring",
      titleKey: "services.clinical-research.services.safety-monitoring.title",
      description: "Continuous safety assessment throughout clinical trials.",
      descriptionKey: "services.clinical-research.services.safety-monitoring.description",
    },
    {
      title: "Adverse Event Management",
      titleKey: "services.clinical-research.services.adverse-event.title",
      description: "Comprehensive AE reporting and management.",
      descriptionKey: "services.clinical-research.services.adverse-event.description",
    },
    {
      title: "Risk Assessment",
      titleKey: "services.clinical-research.services.risk-assessment.title",
      description: "Clinical risk evaluation and mitigation strategies.",
      descriptionKey: "services.clinical-research.services.risk-assessment.description",
    },
    {
      title: "Pharmacovigilance",
      titleKey: "services.clinical-research.services.pharmacovigilance.title",
      description: "Post-market safety surveillance and reporting.",
      descriptionKey: "services.clinical-research.services.pharmacovigilance.description",
    },
  ],
  qualityControl: [
    {
      title: "Quality Assurance",
      titleKey: "services.clinical-research.services.quality-assurance.title",
      description: "GCP compliance and quality management systems.",
      descriptionKey: "services.clinical-research.services.quality-assurance.description",
    },
    {
      title: "Data Integrity",
      titleKey: "services.clinical-research.services.data-integrity.title",
      description: "Robust data collection and verification processes.",
      descriptionKey: "services.clinical-research.services.data-integrity.description",
    },
    {
      title: "Site Management",
      titleKey: "services.clinical-research.services.site-management.title",
      description: "Professional clinical site selection and management.",
      descriptionKey: "services.clinical-research.services.site-management.description",
    },
    {
      title: "Monitoring",
      titleKey: "services.clinical-research.services.monitoring.title",
      description: "Clinical trial monitoring and oversight services.",
      descriptionKey: "services.clinical-research.services.monitoring.description",
    },
  ],
  clinicalServices: [
    {
      title: "Feasibility & Regulatory",
      titleKey: "services.clinical-research.services.feasibility.title",
      description: "Clinical trial feasibility and regulatory approvals.",
      descriptionKey: "services.clinical-research.services.feasibility.description",
    },
    {
      title: "Medical Writing",
      titleKey: "services.clinical-research.services.medical-writing.title",
      description: "Protocol development and regulatory documentation.",
      descriptionKey: "services.clinical-research.services.medical-writing.description",
    },
    {
      title: "Project Management",
      titleKey: "services.clinical-research.services.project-management.title",
      description: "End-to-end clinical trial project management.",
      descriptionKey: "services.clinical-research.services.project-management.description",
    },
    {
      title: "Data Management",
      titleKey: "services.clinical-research.services.data-management.title",
      description: "Clinical data management and biostatistics analysis.",
      descriptionKey: "services.clinical-research.services.data-management.description",
    },
  ],
};

export default function ClinicalResearchService() {
  return <ServiceComponent serviceData={serviceData} />;
}
