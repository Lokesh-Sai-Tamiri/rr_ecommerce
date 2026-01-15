/**
 * @fileoverview Pharmaceutical service component
 */

"use client";

import React from "react";
import ServiceComponent from "./shared/ServiceComponent";

const serviceData = {
  title: "Pharmaceutical",
  titleKey: "services.pharmaceutical.title",
  image: "/assets/images/landing/service/pharmaciticals.png",
  imageMobile: "/assets/images/landing/services/pharmaciticals-mobile.png",
  description:
    "Radiant Research with a combination of young and experienced research team offering full range customized and cost effective preclinical, clinical and quality testing services has turned out to be client's one stop destination in developing their products from bench to bedside. Radiant Research has successfully partnered with many clients in their research and development programmes starting from lead identification, optimization of leads to increase the affinity, selectivity, efficacy/potency, metabolic stability, oral bioavailability using various research platforms, followed by developing a suitable formulation for clinical trials to evaluate its safety and efficacy in humans.",
  descriptionKey: "services.pharmaceutical.description",
  subtitle: "Complete Pharmaceutical Development from Bench to Bedside",
  subtitleKey: "services.pharmaceutical.subtitle",
  highlights: [
    "Lead Identification & Optimization",
    "Customized & Cost-Effective Services",
    "Young & Experienced Research Team",
    "Bench to Bedside Development",
    "Full Range Preclinical to Clinical Services",
    "Formulation Development for Clinical Trials",
  ],
  highlightKeys: [
    "services.pharmaceutical.highlights.drug-discovery",
    "services.pharmaceutical.highlights.preclinical",
    "services.pharmaceutical.highlights.formulation",
    "services.pharmaceutical.highlights.regulatory",
    "services.pharmaceutical.highlights.quality",
    "services.pharmaceutical.highlights.clinical",
  ],
  preclinicalServices: [
    {
      title: "Cancer",
      titleKey: "services.pharmaceutical.services.drug-discovery.title",
      description:
        "Anti-cancer efficacy studies using advanced in vitro and in vivo models.",
      descriptionKey: "services.pharmaceutical.services.drug-discovery.description",
    },
    {
      title: "Antioxidant",
      titleKey: "services.pharmaceutical.services.preclinical.title",
      description:
        "Antioxidant activity evaluation and free radical scavenging studies.",
      descriptionKey: "services.pharmaceutical.services.preclinical.description",
    },
    {
      title: "Diabetes",
      titleKey: "services.pharmaceutical.services.formulation.title",
      description:
        "Anti-diabetic efficacy assessment and glucose metabolism studies.",
      descriptionKey: "services.pharmaceutical.services.formulation.description",
    },
    {
      title: "Immunomodulatory & Inflammation",
      titleKey: "services.pharmaceutical.services.regulatory.title",
      description: "Immune system modulation and anti-inflammatory studies.",
      descriptionKey: "services.pharmaceutical.services.regulatory.description",
    },
    {
      title: "Hepatoprotective",
      titleKey: "services.pharmaceutical.services.quality-assurance.title",
      description: "Liver protection and hepatotoxicity prevention studies.",
      descriptionKey: "services.pharmaceutical.services.quality-assurance.description",
    },
    {
      title: "Obesity",
      titleKey: "services.pharmaceutical.services.clinical-trials.title",
      description: "Anti-obesity efficacy and weight management studies.",
      descriptionKey: "services.pharmaceutical.services.clinical-trials.description",
    },
    {
      title: "Anti-infectives",
      titleKey: "services.pharmaceutical.services.drug-discovery.title",
      description:
        "Antimicrobial, antiviral, and antifungal efficacy evaluation.",
      descriptionKey: "services.pharmaceutical.services.drug-discovery.description",
    },
    {
      title: "Anti-oxidants",
      titleKey: "services.pharmaceutical.services.preclinical.title",
      description:
        "Comprehensive antioxidant capacity and protective effect studies.",
      descriptionKey: "services.pharmaceutical.services.preclinical.description",
    },
  ],
  toxicologyServices: [
    {
      title: "Acute oral Toxicity",
      titleKey: "services.pharmaceutical.services.toxicology.acute-oral.title",
      description:
        "Single dose oral toxicity assessment and LD50 determination.",
      descriptionKey: "services.pharmaceutical.services.toxicology.acute-oral.description",
    },
    {
      title: "Acute Dermal toxicity",
      titleKey: "services.pharmaceutical.services.toxicology.acute-dermal.title",
      description: "Dermal exposure toxicity evaluation and safety assessment.",
      descriptionKey: "services.pharmaceutical.services.toxicology.acute-dermal.description",
    },
    {
      title: "Acute ocular toxicity",
      titleKey: "services.pharmaceutical.services.toxicology.acute-ocular.title",
      description: "Eye irritation and ocular toxicity studies.",
      descriptionKey: "services.pharmaceutical.services.toxicology.acute-ocular.description",
    },
    {
      title: "Acute inhalation toxicity",
      titleKey: "services.pharmaceutical.services.toxicology.acute-inhalation.title",
      description:
        "Respiratory toxicity assessment through inhalation exposure.",
      descriptionKey: "services.pharmaceutical.services.toxicology.acute-inhalation.description",
    },
    {
      title: "Repeat-Dose Toxicity Studies (Sub-acute/Subchronic/Chronic)",
      titleKey: "services.pharmaceutical.services.toxicology.repeat-dose.title",
      description: "Long-term toxicity evaluation with repeated dosing.",
      descriptionKey: "services.pharmaceutical.services.toxicology.repeat-dose.description",
    },
    {
      title: "Skin sensitization",
      titleKey: "services.pharmaceutical.services.toxicology.skin-sensitization.title",
      description: "Allergic sensitization potential assessment.",
      descriptionKey: "services.pharmaceutical.services.toxicology.skin-sensitization.description",
    },
    {
      title: "Skin Irritation study",
      titleKey: "services.pharmaceutical.services.toxicology.skin-irritation.title",
      description: "Dermal irritation and skin compatibility evaluation.",
      descriptionKey: "services.pharmaceutical.services.toxicology.skin-irritation.description",
    },
    {
      title: "Genotoxicity",
      titleKey: "services.pharmaceutical.services.toxicology.genotoxicity.title",
      description: "DNA damage and mutagenic potential assessment.",
      descriptionKey: "services.pharmaceutical.services.toxicology.genotoxicity.description",
    },
    {
      title: "AMES test (BRMT)",
      titleKey: "services.pharmaceutical.services.toxicology.ames-test.title",
      description: "Bacterial reverse mutation test for mutagenicity.",
      descriptionKey: "services.pharmaceutical.services.toxicology.ames-test.description",
    },
    {
      title: "Chromosomal aberration in CHO-K1 cells",
      titleKey: "services.pharmaceutical.services.toxicology.chromosomal.title",
      description: "Chromosomal damage evaluation in mammalian cells.",
      descriptionKey: "services.pharmaceutical.services.toxicology.chromosomal.description",
    },
  ],
  qualityControlServices: [
    {
      title: "Physico chemical analysis",
      titleKey: "services.pharmaceutical.services.quality.physicochemical.title",
      description: "Comprehensive physical and chemical characterization.",
      descriptionKey: "services.pharmaceutical.services.quality.physicochemical.description",
    },
    {
      title: "Determination of pH",
      titleKey: "services.pharmaceutical.services.quality.ph-determination.title",
      description: "pH measurement and stability assessment.",
      descriptionKey: "services.pharmaceutical.services.quality.ph-determination.description",
    },
    {
      title: "Moisture Content Analysis (LOD)",
      titleKey: "services.pharmaceutical.services.quality.moisture-content.title",
      description: "Loss on drying and moisture content determination.",
      descriptionKey: "services.pharmaceutical.services.quality.moisture-content.description",
    },
    {
      title: "Disintegration",
      titleKey: "services.pharmaceutical.services.quality.disintegration.title",
      description: "Tablet and capsule disintegration time testing.",
      descriptionKey: "services.pharmaceutical.services.quality.disintegration.description",
    },
    {
      title: "Dissolution",
      titleKey: "services.pharmaceutical.services.quality.dissolution.title",
      description: "Drug release profile and dissolution rate studies.",
      descriptionKey: "services.pharmaceutical.services.quality.dissolution.description",
    },
    {
      title: "Melting point",
      titleKey: "services.pharmaceutical.services.quality.melting-point.title",
      description: "Thermal characterization and purity assessment.",
      descriptionKey: "services.pharmaceutical.services.quality.melting-point.description",
    },
    {
      title: "Marker analysis by HPLC",
      titleKey: "services.pharmaceutical.services.quality.marker-analysis.title",
      description:
        "Active ingredient quantification by high-performance liquid chromatography.",
      descriptionKey: "services.pharmaceutical.services.quality.marker-analysis.description",
    },
    {
      title: "Friability",
      titleKey: "services.pharmaceutical.services.quality.friability.title",
      description: "Tablet mechanical strength and durability testing.",
      descriptionKey: "services.pharmaceutical.services.quality.friability.description",
    },
    {
      title: "Hardness",
      titleKey: "services.pharmaceutical.services.quality.hardness.title",
      description: "Tablet hardness and mechanical integrity assessment.",
      descriptionKey: "services.pharmaceutical.services.quality.hardness.description",
    },
    {
      title: "Stability Studies (Real time & Accelerated Stability Studies)",
      titleKey: "services.pharmaceutical.services.quality.stability-studies.title",
      description:
        "Long-term and accelerated stability testing for shelf-life determination.",
      descriptionKey: "services.pharmaceutical.services.quality.stability-studies.description",
    },
    {
      title: "Bulk density & Tap Density",
      titleKey: "services.pharmaceutical.services.quality.bulk-density.title",
      description: "Powder flow properties and compaction characteristics.",
      descriptionKey: "services.pharmaceutical.services.quality.bulk-density.description",
    },
    {
      title: "Viscosity Measurements",
      titleKey: "services.pharmaceutical.services.quality.viscosity.title",
      description: "Rheological properties assessment for liquid formulations.",
      descriptionKey: "services.pharmaceutical.services.quality.viscosity.description",
    },
    {
      title: "Determination Ash Value",
      titleKey: "services.pharmaceutical.services.quality.ash-value.title",
      description: "Inorganic residue content analysis.",
      descriptionKey: "services.pharmaceutical.services.quality.ash-value.description",
    },
    {
      title: "Weight Variation",
      titleKey: "services.pharmaceutical.services.quality.weight-variation.title",
      description: "Dosage form weight uniformity testing.",
      descriptionKey: "services.pharmaceutical.services.quality.weight-variation.description",
    },
    {
      title: "Sieve Analysis",
      titleKey: "services.pharmaceutical.services.quality.sieve-analysis.title",
      description: "Particle size distribution analysis.",
      descriptionKey: "services.pharmaceutical.services.quality.sieve-analysis.description",
    },
    {
      title: "Refractive Index",
      titleKey: "services.pharmaceutical.services.quality.refractive-index.title",
      description: "Optical property measurement for identification.",
      descriptionKey: "services.pharmaceutical.services.quality.refractive-index.description",
    },
    {
      title: "Thickness",
      titleKey: "services.pharmaceutical.services.quality.thickness.title",
      description: "Tablet thickness uniformity assessment.",
      descriptionKey: "services.pharmaceutical.services.quality.thickness.description",
    },
    {
      title: "Limit Tests",
      titleKey: "services.pharmaceutical.services.quality.limit-tests.title",
      description: "Impurity and contaminant limit testing.",
      descriptionKey: "services.pharmaceutical.services.quality.limit-tests.description",
    },
    {
      title: "Titrations",
      titleKey: "services.pharmaceutical.services.quality.titrations.title",
      description: "Quantitative analysis through various titration methods.",
      descriptionKey: "services.pharmaceutical.services.quality.titrations.description",
    },
    {
      title: "Microbial analysis",
      titleKey: "services.pharmaceutical.services.quality.microbial-analysis.title",
      description: "Microbiological safety and contamination assessment.",
      descriptionKey: "services.pharmaceutical.services.quality.microbial-analysis.description",
    },
    {
      title: "Total aerobic count",
      titleKey: "services.pharmaceutical.services.quality.aerobic-count.title",
      description: "Total viable microbial count determination.",
      descriptionKey: "services.pharmaceutical.services.quality.aerobic-count.description",
    },
    {
      title: "Specific Pathogen detection",
      titleKey: "services.pharmaceutical.services.quality.pathogen-detection.title",
      description: "Detection of specific harmful microorganisms.",
      descriptionKey: "services.pharmaceutical.services.quality.pathogen-detection.description",
    },
    {
      title: "Preservative efficacy testing (PET)",
      titleKey: "services.pharmaceutical.services.quality.preservative-efficacy.title",
      description: "Antimicrobial preservative system effectiveness.",
      descriptionKey: "services.pharmaceutical.services.quality.preservative-efficacy.description",
    },
    {
      title: "Sterility testing",
      titleKey: "services.pharmaceutical.services.quality.sterility.title",
      description: "Sterility assurance for injectable and sterile products.",
      descriptionKey: "services.pharmaceutical.services.quality.sterility.description",
    },
    {
      title: "Bacterial Endotoxin Test (BET)",
      titleKey: "services.pharmaceutical.services.quality.bacterial-endotoxin.title",
      description: "Pyrogen testing for injectable pharmaceutical products.",
      descriptionKey: "services.pharmaceutical.services.quality.bacterial-endotoxin.description",
    },
    {
      title: "Water analysis",
      titleKey: "services.pharmaceutical.services.quality.water-analysis.title",
      description: "Pharmaceutical water quality testing and validation.",
      descriptionKey: "services.pharmaceutical.services.quality.water-analysis.description",
    },
  ],
  clinicalServices: [
    {
      title: "Feasibility & Regulatory approvals",
      titleKey: "services.pharmaceutical.services.clinical.feasibility.title",
      description:
        "Clinical trial feasibility assessment and regulatory compliance support.",
      descriptionKey: "services.pharmaceutical.services.clinical.feasibility.description",
    },
    {
      title: "Medical Writing",
      titleKey: "services.pharmaceutical.services.clinical.medical-writing.title",
      description:
        "Clinical documentation and regulatory submission preparation.",
      descriptionKey: "services.pharmaceutical.services.clinical.medical-writing.description",
    },
    {
      title: "Project Management",
      titleKey: "services.pharmaceutical.services.clinical.project-management.title",
      description:
        "End-to-end clinical trial project management and coordination.",
      descriptionKey: "services.pharmaceutical.services.clinical.project-management.description",
    },
    {
      title: "Clinical trial and Site management",
      titleKey: "services.pharmaceutical.services.clinical.trial-site.title",
      description:
        "Clinical trial execution and investigational site management.",
      descriptionKey: "services.pharmaceutical.services.clinical.trial-site.description",
    },
    {
      title: "Clinical Trial Monitoring",
      titleKey: "services.pharmaceutical.services.clinical.monitoring.title",
      description:
        "Quality assurance and monitoring throughout clinical studies.",
      descriptionKey: "services.pharmaceutical.services.clinical.monitoring.description",
    },
    {
      title: "Clinical Data Management",
      titleKey: "services.pharmaceutical.services.clinical.data-management.title",
      description:
        "Clinical data collection, processing, and management systems.",
      descriptionKey: "services.pharmaceutical.services.clinical.data-management.description",
    },
    {
      title: "Biostatistics",
      titleKey: "services.pharmaceutical.services.clinical.biostatistics.title",
      description:
        "Statistical analysis and interpretation of clinical trial data.",
      descriptionKey: "services.pharmaceutical.services.clinical.biostatistics.description",
    },
  ],
};

export default function PharmaceuticalService() {
  return <ServiceComponent serviceData={serviceData} />;
}
