/**
 * @fileoverview Nutraceuticals service component
 */

"use client";

import React from "react";
import ServiceComponent from "./shared/ServiceComponent";

const serviceData = {
  title: "Nutraceuticals",
  titleKey: "services.nutraceuticals.title",
  image: "/assets/images/landing/service/neutraceuticals.png",
  imageMobile: "/assets/images/landing/services/neutraceuticals-mobile.png",
  description:
    "With thorough knowledge on recent regulations on nutraceuticals in the domestic and international market, at Radiant Research we understand our client's requirement with respect to product's efficacy and safety. Radiant Research offers End-to-End customized services based on the claims to support the product to pass through regulatory guidelines and as well as to support in product marketing.",
  descriptionKey: "services.nutraceuticals.description",
  subtitle: "End-to-End Nutraceutical Research & Development",
  subtitleKey: "services.nutraceuticals.subtitle",
  companyInfo:
    "At Radiant Research, we optimized the standard protocols to evaluate the Nutraceutical products through the preclinical and clinical research services to confirm the efficacy, safety and quality of raw materials and formulations.",
  companyInfoKey: "services.nutraceuticals.companyInfo",
  highlights: [
    "End-to-End Customized Services",
    "Regulatory Guidelines Compliance",
    "Product Marketing Support",
    "Optimized Standard Protocols",
    "Domestic & International Market Knowledge",
  ],
  highlightKeys: [
    "services.nutraceuticals.highlights.formulation",
    "services.nutraceuticals.highlights.stability",
    "services.nutraceuticals.highlights.bioavailability",
    "services.nutraceuticals.highlights.clinical-efficacy",
    "services.nutraceuticals.highlights.regulatory",
  ],
  preclinicalServices: [
    {
      title: "Efficacy Studies",
      titleKey: "services.nutraceuticals.services.efficacy-studies.title",
      description:
        "Comprehensive in vitro and in vivo efficacy evaluation using validated research protocols and methodologies",
      descriptionKey: "services.nutraceuticals.services.efficacy-studies.description",
    },
    {
      title: "Antioxidant Research",
      titleKey: "services.nutraceuticals.services.antioxidant.title",
      description:
        "Advanced antioxidant capacity evaluation and free radical scavenging activity assessment studies",
      descriptionKey: "services.nutraceuticals.services.antioxidant.description",
    },
    {
      title: "Diabetes Management",
      titleKey: "services.nutraceuticals.services.diabetes.title",
      description:
        "Glucose regulation, insulin sensitivity, and diabetic complications management efficacy studies",
      descriptionKey: "services.nutraceuticals.services.diabetes.description",
    },
    {
      title: "Eye Health Studies",
      titleKey: "services.nutraceuticals.services.eye-health.title",
      description:
        "Vision protection, retinal health, and ocular function improvement research protocols",
      descriptionKey: "services.nutraceuticals.services.eye-health.description",
    },
    {
      title: "Immunomodulatory & Inflammation",
      titleKey: "services.nutraceuticals.services.immunomodulatory.title",
      description:
        "Immune system enhancement and comprehensive anti-inflammatory activity research studies",
      descriptionKey: "services.nutraceuticals.services.immunomodulatory.description",
    },
    {
      title: "Hepatoprotective Research",
      titleKey: "services.nutraceuticals.services.hepatoprotective.title",
      description:
        "Liver protection, detoxification, and hepatic function improvement with biomarker analysis",
      descriptionKey: "services.nutraceuticals.services.hepatoprotective.description",
    },
    {
      title: "Obesity/Weight Management",
      titleKey: "services.nutraceuticals.services.obesity.title",
      description:
        "Weight reduction, metabolism enhancement, and body composition improvement studies",
      descriptionKey: "services.nutraceuticals.services.obesity.description",
    },
    {
      title: "Digestive & Probiotics",
      titleKey: "services.nutraceuticals.services.digestive.title",
      description:
        "Digestive health improvement and probiotic efficacy evaluation research studies",
      descriptionKey: "services.nutraceuticals.services.digestive.description",
    },
    {
      title: "Cardio/Heart Protective",
      titleKey: "services.nutraceuticals.services.cardio.title",
      description:
        "Cardiovascular health protection and heart function improvement efficacy studies",
      descriptionKey: "services.nutraceuticals.services.cardio.description",
    },
    {
      title: "Women Health",
      titleKey: "services.nutraceuticals.services.women-health.title",
      description:
        "Women-specific health concerns and hormonal balance improvement research protocols",
      descriptionKey: "services.nutraceuticals.services.women-health.description",
    },
    {
      title: "Joint & Muscle Health",
      titleKey: "services.nutraceuticals.services.joint-muscle.title",
      description:
        "Joint mobility, muscle strength, and musculoskeletal health improvement studies",
      descriptionKey: "services.nutraceuticals.services.joint-muscle.description",
    },
    {
      title: "Gut Health",
      titleKey: "services.nutraceuticals.services.gut-health.title",
      description:
        "Intestinal health, microbiome balance, and gastrointestinal function improvement research",
      descriptionKey: "services.nutraceuticals.services.gut-health.description",
    },
    {
      title: "Osteoporosis Research",
      titleKey: "services.nutraceuticals.services.osteoporosis.title",
      description:
        "Bone density improvement and osteoporosis prevention efficacy evaluation studies",
      descriptionKey: "services.nutraceuticals.services.osteoporosis.description",
    },
  ],
  toxicologyServices: [
    {
      title: "Acute Oral Toxicity",
      titleKey: "services.nutraceuticals.services.toxicology.acute-oral.title",
      description:
        "Single-dose oral toxicity assessment following OECD guidelines for comprehensive safety profiling",
      descriptionKey: "services.nutraceuticals.services.toxicology.acute-oral.description",
    },
    {
      title: "Acute Dermal Toxicity",
      titleKey: "services.nutraceuticals.services.toxicology.acute-dermal.title",
      description:
        "Dermal exposure toxicity evaluation for topical application safety assessment protocols",
      descriptionKey: "services.nutraceuticals.services.toxicology.acute-dermal.description",
    },
    {
      title: "Acute Ocular Toxicity",
      titleKey: "services.nutraceuticals.services.toxicology.acute-ocular.title",
      description:
        "Eye irritation potential and ocular safety assessment studies using validated test methods",
      descriptionKey: "services.nutraceuticals.services.toxicology.acute-ocular.description",
    },
    {
      title: "Acute Inhalation Toxicity",
      titleKey: "services.nutraceuticals.services.toxicology.acute-inhalation.title",
      description:
        "Respiratory safety evaluation for inhalation exposure routes using appropriate animal models",
      descriptionKey: "services.nutraceuticals.services.toxicology.acute-inhalation.description",
    },
    {
      title: "Repeat-Dose Toxicity Studies",
      titleKey: "services.nutraceuticals.services.toxicology.repeat-dose.title",
      description:
        "Sub-acute, Subchronic, and Chronic toxicity studies for comprehensive long-term safety assessment",
      descriptionKey: "services.nutraceuticals.services.toxicology.repeat-dose.description",
    },
    {
      title: "Skin Sensitization",
      titleKey: "services.nutraceuticals.services.toxicology.skin-sensitization.title",
      description:
        "Allergic potential evaluation and skin sensitivity testing protocols using validated methods",
      descriptionKey: "services.nutraceuticals.services.toxicology.skin-sensitization.description",
    },
    {
      title: "Genotoxicity Assessment",
      titleKey: "services.nutraceuticals.services.toxicology.genotoxicity.title",
      description:
        "Comprehensive genetic toxicity evaluation using multiple validated test systems and protocols",
      descriptionKey: "services.nutraceuticals.services.toxicology.genotoxicity.description",
    },
    {
      title: "AMES Test (BRMT)",
      titleKey: "services.nutraceuticals.services.toxicology.ames-test.title",
      description:
        "Bacterial reverse mutation test for mutagenicity assessment using validated protocols and strains",
      descriptionKey: "services.nutraceuticals.services.toxicology.ames-test.description",
    },
    {
      title: "Chromosomal Aberration in Vitro",
      titleKey: "services.nutraceuticals.services.toxicology.chromosomal.title",
      description:
        "In vitro chromosomal aberration study for genotoxicity evaluation using cell culture systems",
      descriptionKey: "services.nutraceuticals.services.toxicology.chromosomal.description",
    },
    {
      title: "Micronucleus Assay",
      titleKey: "services.nutraceuticals.services.toxicology.micronucleus.title",
      description:
        "In vivo and in vitro micronucleus test for comprehensive genotoxicity screening and assessment",
      descriptionKey: "services.nutraceuticals.services.toxicology.micronucleus.description",
    },
  ],
  clinicalServices: [
    {
      title: "Feasibility & Regulatory Approvals",
      titleKey: "services.nutraceuticals.services.clinical.feasibility.title",
      description:
        "Comprehensive clinical trial feasibility assessment and regulatory approval support for nutraceuticals",
      descriptionKey: "services.nutraceuticals.services.clinical.feasibility.description",
    },
    {
      title: "Medical Writing",
      titleKey: "services.nutraceuticals.services.clinical.medical-writing.title",
      description:
        "Professional protocol development, regulatory documentation, and clinical study report preparation services",
      descriptionKey: "services.nutraceuticals.services.clinical.medical-writing.description",
    },
    {
      title: "Project Management",
      titleKey: "services.nutraceuticals.services.clinical.project-management.title",
      description:
        "End-to-end clinical trial project management with timeline adherence and comprehensive quality oversight",
      descriptionKey: "services.nutraceuticals.services.clinical.project-management.description",
    },
    {
      title: "Clinical Trial and Site Management",
      titleKey: "services.nutraceuticals.services.clinical.trial-site.title",
      description:
        "Complete clinical trial coordination and professional site management services with quality assurance",
      descriptionKey: "services.nutraceuticals.services.clinical.trial-site.description",
    },
    {
      title: "Clinical Trial Monitoring",
      titleKey: "services.nutraceuticals.services.clinical.monitoring.title",
      description:
        "Professional on-site and remote monitoring with comprehensive quality oversight and regulatory compliance",
      descriptionKey: "services.nutraceuticals.services.clinical.monitoring.description",
    },
    {
      title: "Clinical Data Management",
      titleKey: "services.nutraceuticals.services.clinical.data-management.title",
      description:
        "Advanced data collection, processing, validation, and management systems with regulatory compliance standards",
      descriptionKey: "services.nutraceuticals.services.clinical.data-management.description",
    },
    {
      title: "Biostatistics",
      titleKey: "services.nutraceuticals.services.clinical.biostatistics.title",
      description:
        "Advanced statistical analysis, data interpretation, and comprehensive reporting services for clinical outcomes",
      descriptionKey: "services.nutraceuticals.services.clinical.biostatistics.description",
    },
  ],
  qualityControlServices: [
    {
      title: "Physico Chemical Analysis",
      titleKey: "services.nutraceuticals.services.quality.physicochemical.title",
      description:
        "Comprehensive physicochemical characterization and quality assessment of nutraceutical products",
      descriptionKey: "services.nutraceuticals.services.quality.physicochemical.description",
    },
    {
      title: "pH Determination",
      titleKey: "services.nutraceuticals.services.quality.ph-determination.title",
      description:
        "Accurate pH measurement and analysis for product stability and quality control assessment",
      descriptionKey: "services.nutraceuticals.services.quality.ph-determination.description",
    },
    {
      title: "Moisture Content Analysis (LOD)",
      titleKey: "services.nutraceuticals.services.quality.moisture-content.title",
      description:
        "Loss on drying analysis for moisture content determination and stability evaluation",
      descriptionKey: "services.nutraceuticals.services.quality.moisture-content.description",
    },
    {
      title: "Disintegration Testing",
      titleKey: "services.nutraceuticals.services.quality.disintegration.title",
      description:
        "Tablet and capsule disintegration time analysis for bioavailability assessment",
      descriptionKey: "services.nutraceuticals.services.quality.disintegration.description",
    },
    {
      title: "Dissolution Studies",
      titleKey: "services.nutraceuticals.services.quality.dissolution.title",
      description:
        "Drug release profile analysis and dissolution testing for formulation optimization",
      descriptionKey: "services.nutraceuticals.services.quality.dissolution.description",
    },
    {
      title: "Melting Point Determination",
      titleKey: "services.nutraceuticals.services.quality.melting-point.title",
      description:
        "Accurate melting point analysis for compound identification and purity assessment",
      descriptionKey: "services.nutraceuticals.services.quality.melting-point.description",
    },
    {
      title: "Marker Analysis by HPLC",
      titleKey: "services.nutraceuticals.services.quality.marker-analysis.title",
      description:
        "High-performance liquid chromatography for active compound quantification and analysis",
      descriptionKey: "services.nutraceuticals.services.quality.marker-analysis.description",
    },
    {
      title: "Friability Testing",
      titleKey: "services.nutraceuticals.services.quality.friability.title",
      description:
        "Tablet friability assessment for mechanical strength and handling durability evaluation",
      descriptionKey: "services.nutraceuticals.services.quality.friability.description",
    },
    {
      title: "Hardness Testing",
      titleKey: "services.nutraceuticals.services.quality.hardness.title",
      description:
        "Tablet hardness measurement for mechanical integrity and quality control assessment",
      descriptionKey: "services.nutraceuticals.services.quality.hardness.description",
    },
    {
      title: "Stability Studies",
      titleKey: "services.nutraceuticals.services.quality.stability-studies.title",
      description:
        "Real time and accelerated stability testing protocols for shelf-life determination",
      descriptionKey: "services.nutraceuticals.services.quality.stability-studies.description",
    },
    {
      title: "Bulk Density & Tap Density",
      titleKey: "services.nutraceuticals.services.quality.bulk-density.title",
      description:
        "Powder flow properties and density measurements for formulation characterization",
      descriptionKey: "services.nutraceuticals.services.quality.bulk-density.description",
    },
    {
      title: "Ash Value Determination",
      titleKey: "services.nutraceuticals.services.quality.ash-value.title",
      description:
        "Total ash content analysis for inorganic material quantification and quality assessment",
      descriptionKey: "services.nutraceuticals.services.quality.ash-value.description",
    },
    {
      title: "Weight Variation Analysis",
      titleKey: "services.nutraceuticals.services.quality.weight-variation.title",
      description:
        "Dosage form weight uniformity testing for manufacturing quality control",
      descriptionKey: "services.nutraceuticals.services.quality.weight-variation.description",
    },
    {
      title: "Sieve Analysis",
      titleKey: "services.nutraceuticals.services.quality.sieve-analysis.title",
      description:
        "Particle size distribution analysis using sieve methods for powder characterization",
      descriptionKey: "services.nutraceuticals.services.quality.sieve-analysis.description",
    },
    {
      title: "Limit Tests",
      titleKey: "services.nutraceuticals.services.quality.limit-tests.title",
      description:
        "Heavy metals, residual solvents, and impurity limit testing for safety compliance",
      descriptionKey: "services.nutraceuticals.services.quality.limit-tests.description",
    },
    {
      title: "Titrations",
      titleKey: "services.nutraceuticals.services.quality.titrations.title",
      description:
        "Volumetric analysis and titration methods for content determination and purity assessment",
      descriptionKey: "services.nutraceuticals.services.quality.titrations.description",
    },
  ],
  microbialServices: [
    {
      title: "Total Aerobic Count",
      titleKey: "services.nutraceuticals.services.microbial.aerobic-count.title",
      description:
        "Total viable aerobic microbial count determination for product safety and quality assessment",
      descriptionKey: "services.nutraceuticals.services.microbial.aerobic-count.description",
    },
    {
      title: "Specific Pathogen Detection",
      titleKey: "services.nutraceuticals.services.microbial.pathogen-detection.title",
      description:
        "Detection and identification of specific pathogenic microorganisms using validated methods",
      descriptionKey: "services.nutraceuticals.services.microbial.pathogen-detection.description",
    },
    {
      title: "Preservative Efficacy Testing (PET)",
      titleKey: "services.nutraceuticals.services.microbial.preservative-efficacy.title",
      description:
        "Antimicrobial preservative effectiveness evaluation for product stability and safety",
      descriptionKey: "services.nutraceuticals.services.microbial.preservative-efficacy.description",
    },
    {
      title: "Sterility Testing",
      titleKey: "services.nutraceuticals.services.microbial.sterility.title",
      description:
        "Comprehensive sterility testing protocols for ensuring product microbial safety",
      descriptionKey: "services.nutraceuticals.services.microbial.sterility.description",
    },
    {
      title: "Bacterial Endotoxin Test (BET)",
      titleKey: "services.nutraceuticals.services.microbial.bacterial-endotoxin.title",
      description:
        "Pyrogen testing using LAL method for bacterial endotoxin detection and quantification",
      descriptionKey: "services.nutraceuticals.services.microbial.bacterial-endotoxin.description",
    },
    {
      title: "Water Analysis",
      titleKey: "services.nutraceuticals.services.microbial.water-analysis.title",
      description:
        "Complete water quality analysis including microbial, chemical, and physical parameters",
      descriptionKey: "services.nutraceuticals.services.microbial.water-analysis.description",
    },
  ],
};

export default function NutraceuticalsService() {
  return <ServiceComponent serviceData={serviceData} />;
}
