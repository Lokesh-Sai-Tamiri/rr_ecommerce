/**
 * @fileoverview In Vitro Cell Based Research service component
 */

"use client";

import React from "react";
import ServiceComponent from "./shared/ServiceComponent";

const serviceData = {
  title: "  In Vitro Cell Based Research",
  titleKey: "services.in-vitro-cell-based-research.title",
  image: "/assets/images/landing/service/in-vitro.png",
  imageMobile: "/assets/images/landing/services/in-vitro-mobile.png",
  description:
    "Radiant Research with its state of the art Cell biology, Molecular biology and Microbiology facilities is offering exclusive range of cruelty free in vitro research services as an alternative to animal models to fasten the drug discovery process in a cost effective manner. At Radiant Research, our cell repository is equipped with more than 60 cell lines and 50 microbial cultures to give an better choice to our clients in designing their research activities in customized manner. Our technical expertise and understanding about the regulatory guidelines made us the favourite destination especially for the clients from Ayurvedic, Herbal and Cosmetic business. At Radiant Research, with an special focus towards cosmetics and personal care products we upgrade ourselves to the recent advancements like reconstructed human skin models (EpiSkin, SkinEthic and EpiDerm) to evaluate the safety and efficacy.",
  descriptionKey: "services.in-vitro-cell-based-research.description",
  subtitle: "Cruelty-Free Alternative to Animal Testing",
  subtitleKey: "services.in-vitro-cell-based-research.subtitle",
  highlights: [
    "60+ Cell Lines Repository",
    "50+ Microbial Cultures",
    "Reconstructed Human Skin Models (EpiSkin, SkinEthic, EpiDerm)",
    "Cruelty-Free Research Services",
    "Cost-Effective Drug Discovery",
    "Regulatory Guidelines Expertise",
  ],
  highlightKeys: [
    "services.in-vitro-cell-based-research.highlights.cell-culture",
    "services.in-vitro-cell-based-research.highlights.molecular-biology",
    "services.in-vitro-cell-based-research.highlights.custom-assays",
    "services.in-vitro-cell-based-research.highlights.cytotoxicity",
    "services.in-vitro-cell-based-research.highlights.gene-expression",
    "services.in-vitro-cell-based-research.highlights.protein-analysis",
  ],
  efficacyServices: [
    {
      title: "Anti microbial",
      titleKey: "services.in-vitro-cell-based-research.services.cell-maintenance.title",
      description:
        "Antimicrobial efficacy testing against bacteria, fungi, and other pathogens.",
      descriptionKey: "services.in-vitro-cell-based-research.services.cell-maintenance.description",
    },
    {
      title: "Anti viral",
      titleKey: "services.in-vitro-cell-based-research.services.cytotoxicity.title",
      description:
        "Antiviral activity assessment using appropriate cell culture models.",
      descriptionKey: "services.in-vitro-cell-based-research.services.cytotoxicity.description",
    },
    {
      title: "Cytotoxicity",
      titleKey: "services.in-vitro-cell-based-research.services.gene-expression.title",
      description: "Cell viability and cytotoxic effect evaluation.",
      descriptionKey: "services.in-vitro-cell-based-research.services.gene-expression.description",
    },
    {
      title: "Cell proliferation",
      titleKey: "services.in-vitro-cell-based-research.services.protein-analysis.title",
      description: "Cell growth and proliferation studies.",
      descriptionKey: "services.in-vitro-cell-based-research.services.protein-analysis.description",
    },
    {
      title: "Cancer",
      titleKey: "services.in-vitro-cell-based-research.services.custom-assays.title",
      description: "Anti-cancer efficacy studies using cancer cell lines.",
      descriptionKey: "services.in-vitro-cell-based-research.services.custom-assays.description",
    },
    {
      title: "Diabetes",
      titleKey: "services.in-vitro-cell-based-research.services.cell-maintenance.title",
      description:
        "Anti-diabetic efficacy assessment and glucose metabolism studies.",
      descriptionKey: "services.in-vitro-cell-based-research.services.cell-maintenance.description",
    },
    {
      title: "Hepatoprotection",
      titleKey: "services.in-vitro-cell-based-research.services.cytotoxicity.title",
      description: "Liver protection and hepatotoxicity prevention studies.",
      descriptionKey: "services.in-vitro-cell-based-research.services.cytotoxicity.description",
    },
    {
      title: "Obesity",
      titleKey: "services.in-vitro-cell-based-research.services.gene-expression.title",
      description: "Anti-obesity efficacy and weight management studies.",
      descriptionKey: "services.in-vitro-cell-based-research.services.gene-expression.description",
    },
    {
      title: "Immunomodulatory",
      titleKey: "services.in-vitro-cell-based-research.services.protein-analysis.title",
      description: "Immune system modulation and enhancement studies.",
      descriptionKey: "services.in-vitro-cell-based-research.services.protein-analysis.description",
    },
    {
      title: "Inflammation",
      titleKey: "services.in-vitro-cell-based-research.services.custom-assays.title",
      description: "Anti-inflammatory activity evaluation.",
      descriptionKey: "services.in-vitro-cell-based-research.services.custom-assays.description",
    },
    {
      title: "Drug permeability (CaCo-2 cell model)",
      titleKey: "services.in-vitro-cell-based-research.services.cell-maintenance.title",
      description: "Intestinal absorption and permeability studies.",
      descriptionKey: "services.in-vitro-cell-based-research.services.cell-maintenance.description",
    },
    {
      title: "Gene expression analysis",
      titleKey: "services.in-vitro-cell-based-research.services.cytotoxicity.title",
      description: "Molecular analysis and gene expression profiling.",
      descriptionKey: "services.in-vitro-cell-based-research.services.cytotoxicity.description",
    },
    {
      title: "Enzyme and Immunoassays (ELISA)",
      titleKey: "services.in-vitro-cell-based-research.services.gene-expression.title",
      description: "Biochemical analysis and immunoassay techniques.",
      descriptionKey: "services.in-vitro-cell-based-research.services.gene-expression.description",
    },
    {
      title: "Skin Lightening",
      titleKey: "services.in-vitro-cell-based-research.services.protein-analysis.title",
      description: "Melanin reduction and skin brightening efficacy studies.",
      descriptionKey: "services.in-vitro-cell-based-research.services.protein-analysis.description",
    },
    {
      title: "Sun Protection Factor (SPF)",
      titleKey: "services.in-vitro-cell-based-research.services.custom-assays.title",
      description: "UV protection and SPF determination studies.",
      descriptionKey: "services.in-vitro-cell-based-research.services.custom-assays.description",
    },
    {
      title: "Anti-aging",
      titleKey: "services.in-vitro-cell-based-research.services.cell-maintenance.title",
      description: "Anti-aging efficacy evaluation using skin models.",
      descriptionKey: "services.in-vitro-cell-based-research.services.cell-maintenance.description",
    },
    {
      title: "Skin tightening",
      titleKey: "services.in-vitro-cell-based-research.services.cytotoxicity.title",
      description: "Skin firmness and tightening effect assessment.",
      descriptionKey: "services.in-vitro-cell-based-research.services.cytotoxicity.description",
    },
    {
      title: "Psoriasis",
      titleKey: "services.in-vitro-cell-based-research.services.gene-expression.title",
      description: "Anti-psoriatic efficacy evaluation studies.",
      descriptionKey: "services.in-vitro-cell-based-research.services.gene-expression.description",
    },
    {
      title: "Scar/wound healing",
      titleKey: "services.in-vitro-cell-based-research.services.scar-wound-healing.title",
      description: "Wound healing and tissue regeneration studies.",
      descriptionKey: "services.in-vitro-cell-based-research.services.scar-wound-healing.description",
    },
    {
      title: "Anti-acne",
      titleKey: "services.in-vitro-cell-based-research.services.anti-acne.title",
      description: "Anti-acne efficacy and sebum control studies.",
      descriptionKey: "services.in-vitro-cell-based-research.services.anti-acne.description",
    },
    {
      title: "Anti-Dandruff",
      titleKey: "services.in-vitro-cell-based-research.services.anti-dandruff.title",
      description: "Anti-dandruff efficacy evaluation.",
      descriptionKey: "services.in-vitro-cell-based-research.services.anti-dandruff.description",
    },
    {
      title: "Deodorant",
      titleKey: "services.in-vitro-cell-based-research.services.deodorant.title",
      description: "Deodorant efficacy and antimicrobial studies.",
      descriptionKey: "services.in-vitro-cell-based-research.services.deodorant.description",
    },
    {
      title: "Skin Moisturizing",
      titleKey: "services.in-vitro-cell-based-research.services.skin-moisturizing.title",
      description: "Skin hydration and moisturizing effect studies.",
      descriptionKey: "services.in-vitro-cell-based-research.services.skin-moisturizing.description",
    },
    {
      title: "Skin pigmentation",
      titleKey: "services.in-vitro-cell-based-research.services.skin-pigmentation.title",
      description: "Skin pigmentation modulation studies.",
      descriptionKey: "services.in-vitro-cell-based-research.services.skin-pigmentation.description",
    },
    {
      title: "Hair growth/anti-hair fall",
      titleKey: "services.in-vitro-cell-based-research.services.hair-growth.title",
      description: "Hair growth stimulation and anti-hair fall studies.",
      descriptionKey: "services.in-vitro-cell-based-research.services.hair-growth.description",
    },
    {
      title:
        "Dermal permeation/absorption using EpiskinTM / EpidermTM/Porcine skin",
      titleKey: "services.in-vitro-cell-based-research.services.dermal-permeation.title",
      description:
        "Skin penetration and absorption studies using validated models.",
      descriptionKey: "services.in-vitro-cell-based-research.services.dermal-permeation.description",
    },
  ],
  toxicologyServices: [
    {
      title: "3T3 NRU phototoxicity (Skin irritation)",
      titleKey: "services.in-vitro-cell-based-research.services.phototoxicity.title",
      description:
        "Phototoxicity and skin irritation assessment using validated protocols.",
      descriptionKey: "services.in-vitro-cell-based-research.services.phototoxicity.description",
    },
    {
      title: "Skin Irritation studies in human reconstructed skin models",
      titleKey: "services.in-vitro-cell-based-research.services.skin-irritation.title",
      description:
        "Safety evaluation using EpiSkin, SkinEthic and other reconstructed models.",
      descriptionKey: "services.in-vitro-cell-based-research.services.skin-irritation.description",
    },
    {
      title: "Genotoxicity",
      titleKey: "services.in-vitro-cell-based-research.services.genotoxicity.title",
      description: "DNA damage and mutagenic potential assessment.",
      descriptionKey: "services.in-vitro-cell-based-research.services.genotoxicity.description",
    },
    {
      title: "AMES test (BRMT)",
      titleKey: "services.in-vitro-cell-based-research.services.ames-test.title",
      description: "Bacterial reverse mutation test for mutagenicity.",
      descriptionKey: "services.in-vitro-cell-based-research.services.ames-test.description",
    },
    {
      title: "Chromosomal aberration in CHO-K1 cells",
      titleKey: "services.in-vitro-cell-based-research.services.chromosomal-aberration.title",
      description: "Chromosomal damage evaluation in mammalian cells.",
      descriptionKey: "services.in-vitro-cell-based-research.services.chromosomal-aberration.description",
    },
  ],
  qualityControlServices: [
    {
      title: "Cell Line Maintenance",
      titleKey: "services.in-vitro-cell-based-research.services.cell-maintenance.title",
      description: "Professional cell culture and cryopreservation services.",
      descriptionKey: "services.in-vitro-cell-based-research.services.cell-maintenance.description",
    },
    {
      title: "Quality Control",
      titleKey: "services.in-vitro-cell-based-research.services.quality-control.title",
      description: "Cell line authentication and contamination testing.",
      descriptionKey: "services.in-vitro-cell-based-research.services.quality-control.description",
    },
    {
      title: "Assay Validation",
      titleKey: "services.in-vitro-cell-based-research.services.assay-validation.title",
      description: "Method development and validation for in vitro studies.",
      descriptionKey: "services.in-vitro-cell-based-research.services.assay-validation.description",
    },
    {
      title: "Data Analysis",
      titleKey: "services.in-vitro-cell-based-research.services.data-analysis.title",
      description: "Statistical analysis and comprehensive reporting.",
      descriptionKey: "services.in-vitro-cell-based-research.services.data-analysis.description",
    },
  ],
  clinicalServices: [
    {
      title: "Regulatory Support",
      titleKey: "services.in-vitro-cell-based-research.services.regulatory-support.title",
      description: "Alternative method regulatory submission support.",
      descriptionKey: "services.in-vitro-cell-based-research.services.regulatory-support.description",
    },
    {
      title: "Method Transfer",
      titleKey: "services.in-vitro-cell-based-research.services.method-transfer.title",
      description: "Technology transfer and training services.",
      descriptionKey: "services.in-vitro-cell-based-research.services.method-transfer.description",
    },
    {
      title: "Custom Research",
      titleKey: "services.in-vitro-cell-based-research.services.custom-research.title",
      description: "Tailored research solutions for specific requirements.",
      descriptionKey: "services.in-vitro-cell-based-research.services.custom-research.description",
    },
    {
      title: "Consultation",
      titleKey: "services.in-vitro-cell-based-research.services.consultation.title",
      description: "Expert guidance on in vitro alternative methods.",
      descriptionKey: "services.in-vitro-cell-based-research.services.consultation.description",
    },
  ],
};

export default function InVitroService() {
  return <ServiceComponent serviceData={serviceData} />;
}
