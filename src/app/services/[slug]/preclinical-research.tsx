/**
 * @fileoverview Preclinical Research service component
 */

"use client";

import React from "react";
import ServiceComponent from "./shared/ServiceComponent";

const serviceData = {
  title: "Preclinical Research",
  titleKey: "services.preclinical-research.title",
  image: "/assets/images/landing/service/preclinical.png",
  imageMobile: "/assets/images/landing/services/preclinical-mobile.png",
  description:
    "Radiant Research with its strong background of Preclinical studies offers both in vitro (cell/microbe based) and In vivo (animal based) customised research services to evaluate the efficacy and safety of lead drugs/formulations before proceeding for clinical trials. At Radiant Research, we offer customized preclinical efficacy and toxicology services to Pharma, Herbal, Ayurvedic, nutraceutical and cosmetic industry and have become favorite one stop destination for all drug discovery requirements.",
  descriptionKey: "services.preclinical-research.description",
  subtitle: "Comprehensive Pre-Clinical Drug Development",
  subtitleKey: "services.preclinical-research.subtitle",
  highlights: [
    "Both In Vitro & In Vivo Studies",
    "Customized Research Services",
    "Complete Efficacy & Safety Evaluation",
    "One-Stop Drug Discovery Destination",
    "Cancer to Cosmetic Research",
    "Product Development (F&D) Services",
  ],
  highlightKeys: [
    "services.preclinical-research.highlights.safety",
    "services.preclinical-research.highlights.toxicology",
    "services.preclinical-research.highlights.pharmacokinetics",
    "services.preclinical-research.highlights.efficacy",
    "services.preclinical-research.highlights.regulatory",
    "services.preclinical-research.highlights.clinical",
  ],
  cancerServices: [
    {
      title: "Cytotoxicity assay by MTT/SRB/Trypan blue",
      titleKey: "services.preclinical-research.services.cancer-cytotoxicity.title",
      description:
        "Cell viability assessment using multiple validated methods.",
      descriptionKey: "services.preclinical-research.services.cancer-cytotoxicity.description",
    },
    {
      title: "Clonogenic assay",
      titleKey: "services.preclinical-research.services.clonogenic.title",
      description: "Colony forming ability and cell survival assessment.",
      descriptionKey: "services.preclinical-research.services.clonogenic.description",
    },
    {
      title: "Apoptosis – Nuclear staining with DAPI",
      titleKey: "services.preclinical-research.services.apoptosis.title",
      description: "Apoptotic cell detection and quantification.",
      descriptionKey: "services.preclinical-research.services.apoptosis.description",
    },
    {
      title: "Alkylating activity assay",
      titleKey: "services.preclinical-research.services.alkylating.title",
      description: "DNA alkylation activity evaluation.",
      descriptionKey: "services.preclinical-research.services.alkylating.description",
    },
    {
      title: "TUNEL assay",
      titleKey: "services.preclinical-research.services.tunel.title",
      description: "DNA fragmentation detection for apoptosis assessment.",
      descriptionKey: "services.preclinical-research.services.tunel.description",
    },
    {
      title: "Endonuclease assay",
      titleKey: "services.preclinical-research.services.endonuclease.title",
      description: "Endonuclease activity measurement.",
      descriptionKey: "services.preclinical-research.services.endonuclease.description",
    },
    {
      title: "DNA fragmentation analysis / DNA ladder assay",
      titleKey: "services.preclinical-research.services.dna-fragmentation.title",
      description: "DNA integrity and fragmentation analysis.",
      descriptionKey: "services.preclinical-research.services.dna-fragmentation.description",
    },
    {
      title: "Cancer specific gene expression analysis",
      titleKey: "services.preclinical-research.services.cancer-gene-expression.title",
      description:
        "P53, BCl2, Caspase 3, VEGF, cyclin D1, cyclin B1, STAT3 analysis.",
      descriptionKey: "services.preclinical-research.services.cancer-gene-expression.description",
    },
    {
      title: "DLA/EAC induced ascetic tumor model in mice",
      titleKey: "services.preclinical-research.services.dla-ascetic.title",
      description: "In vivo ascites tumor model for anti-cancer studies.",
      descriptionKey: "services.preclinical-research.services.dla-ascetic.description",
    },
    {
      title: "DLA induced solid tumor model in mice",
      titleKey: "services.preclinical-research.services.dla-solid.title",
      description: "Solid tumor model for efficacy evaluation.",
      descriptionKey: "services.preclinical-research.services.dla-solid.description",
    },
  ],
  antioxidantServices: [
    {
      title: "DPPH scavenging assay",
      titleKey: "services.preclinical-research.services.dpph-scavenging.title",
      description: "Free radical scavenging capacity assessment.",
      descriptionKey: "services.preclinical-research.services.dpph-scavenging.description",
    },
    {
      title: "Scavenging of Nitric Oxide radical",
      titleKey: "services.preclinical-research.services.nitric-oxide.title",
      description: "Nitric oxide radical neutralization studies.",
      descriptionKey: "services.preclinical-research.services.nitric-oxide.description",
    },
    {
      title: "Lipid peroxidation inhibitory activity",
      titleKey: "services.preclinical-research.services.lipid-peroxidation.title",
      description: "Lipid oxidation prevention assessment.",
      descriptionKey: "services.preclinical-research.services.lipid-peroxidation.description",
    },
    {
      title: "Evaluation of Total Antioxidant capacity",
      titleKey: "services.preclinical-research.services.total-antioxidant.title",
      description: "Comprehensive antioxidant capacity evaluation.",
      descriptionKey: "services.preclinical-research.services.total-antioxidant.description",
    },
    {
      title: "Ferric ion reducing power assay",
      titleKey: "services.preclinical-research.services.ferric-reducing.title",
      description: "Metal ion reduction capacity measurement.",
      descriptionKey: "services.preclinical-research.services.ferric-reducing.description",
    },
    {
      title: "Scavenging of Hydroxyl Radical by p-NDA Method",
      titleKey: "services.preclinical-research.services.hydroxyl-radical.title",
      description: "Hydroxyl radical scavenging assessment.",
      descriptionKey: "services.preclinical-research.services.hydroxyl-radical.description",
    },
    {
      title: "Scavenging of Hydrogen Peroxide",
      titleKey: "services.preclinical-research.services.hydrogen-peroxide.title",
      description: "H2O2 neutralization capacity evaluation.",
      descriptionKey: "services.preclinical-research.services.hydrogen-peroxide.description",
    },
    {
      title: "Scavenging of ABTS radical cation Assay",
      titleKey: "services.preclinical-research.services.abts-scavenging.title",
      description: "ABTS radical scavenging activity assessment.",
      descriptionKey: "services.preclinical-research.services.abts-scavenging.description",
    },
    {
      title: "Total Phenolic and Flavonoid content estimation",
      titleKey: "services.preclinical-research.services.phenolic-flavonoid.title",
      description: "Phenolic and flavonoid quantification.",
      descriptionKey: "services.preclinical-research.services.phenolic-flavonoid.description",
    },
    {
      title: "Antioxidant status in rats by hepatic injury model",
      titleKey: "services.preclinical-research.services.hepatic-injury.title",
      description: "In vivo liver injury protection studies.",
      descriptionKey: "services.preclinical-research.services.hepatic-injury.description",
    },
    {
      title: "Antioxidant status in tumor bearing mice model",
      titleKey: "services.preclinical-research.services.tumor-bearing.title",
      description: "Antioxidant evaluation in cancer models.",
      descriptionKey: "services.preclinical-research.services.tumor-bearing.description",
    },
  ],
  diabetesServices: [
    {
      title: "Glucose uptake studies in skeletal muscle cell lines",
      titleKey: "services.preclinical-research.services.glucose-uptake-skeletal.title",
      description: "Non-radio labeled glucose uptake assessment.",
      descriptionKey: "services.preclinical-research.services.glucose-uptake-skeletal.description",
    },
    {
      title: "Glucose uptake in isolated rat hemi diaphragm",
      titleKey: "services.preclinical-research.services.glucose-uptake-diaphragm.title",
      description: "Ex vivo glucose uptake measurement.",
      descriptionKey: "services.preclinical-research.services.glucose-uptake-diaphragm.description",
    },
    {
      title: "Gene expression studies (PPARγ, GLUT-4)",
      titleKey: "services.preclinical-research.services.gene-expression-diabetes.title",
      description: "Diabetes-related gene expression analysis.",
      descriptionKey: "services.preclinical-research.services.gene-expression-diabetes.description",
    },
    {
      title: "Alpha-Amylase inhibitory activity",
      titleKey: "services.preclinical-research.services.alpha-amylase.title",
      description: "Starch digestion enzyme inhibition studies.",
      descriptionKey: "services.preclinical-research.services.alpha-amylase.description",
    },
    // {
    //   title: "Alpha-galactosidase inhibitory activity",
    //   titleKey: "services.preclinical-research.services.alpha-galactosidase.title",
    //   description: "Carbohydrate enzyme inhibition assessment.",
    //   descriptionKey: "services.preclinical-research.services.alpha-galactosidase.description",
    // },
    {
      title: "Alpha-glucosidase activity",
      titleKey: "services.preclinical-research.services.alpha-glucosidase.title",
      description: "Glucose metabolism enzyme evaluation.",
      descriptionKey: "services.preclinical-research.services.alpha-glucosidase.description",
    },
    {
      title: "Alloxan induced diabetic rat model",
      titleKey: "services.preclinical-research.services.alloxan-diabetic.title",
      description: "Chemical diabetes induction model.",
      descriptionKey: "services.preclinical-research.services.alloxan-diabetic.description",
    },
    {
      title: "Streptozotocin induced diabetic rat model",
      titleKey: "services.preclinical-research.services.stz-diabetic.title",
      description: "STZ-induced diabetes model for efficacy studies.",
      descriptionKey: "services.preclinical-research.services.stz-diabetic.description",
    },
  ],
  immunologyServices: [
    {
      title: "Phagocytic assay on cellular lysosomal enzyme activity",
      titleKey: "services.preclinical-research.services.phagocytic.title",
      description: "Immune cell function assessment.",
      descriptionKey: "services.preclinical-research.services.phagocytic.description",
    },
    {
      title: "Proliferation assay",
      titleKey: "services.preclinical-research.services.proliferation.title",
      description: "Cell proliferation and immune response evaluation.",
      descriptionKey: "services.preclinical-research.services.proliferation.description",
    },
    {
      title: "NO and TNF inhibitory studies",
      titleKey: "services.preclinical-research.services.no-tnf.title",
      description: "Inflammatory mediator inhibition assessment.",
      descriptionKey: "services.preclinical-research.services.no-tnf.description",
    },
    {
      title: "HRBC membrane stabilization",
      titleKey: "services.preclinical-research.services.hrbc-membrane.title",
      description: "Anti-inflammatory membrane protection studies.",
      descriptionKey: "services.preclinical-research.services.hrbc-membrane.description",
    },
    {
      title: "Inhibition of protein denaturation",
      titleKey: "services.preclinical-research.services.protein-denaturation.title",
      description: "Protein protection and anti-inflammatory assessment.",
      descriptionKey: "services.preclinical-research.services.protein-denaturation.description",
    },
    {
      title: "Proteinase inhibitory action",
      titleKey: "services.preclinical-research.services.proteinase.title",
      description: "Enzyme inhibition and tissue protection studies.",
      descriptionKey: "services.preclinical-research.services.proteinase.description",
    },
    {
      title: "Inflammatory markers analysis",
      titleKey: "services.preclinical-research.services.inflammatory-markers.title",
      description:
        "COX-1, COX-2, PGE-2, iNOS, IFN, TNF-alpha, Interleukins analysis.",
      descriptionKey: "services.preclinical-research.services.inflammatory-markers.description",
    },
    {
      title: "Carbon clearance assay model",
      titleKey: "services.preclinical-research.services.carbon-clearance.title",
      description: "Reticuloendothelial system function assessment.",
      descriptionKey: "services.preclinical-research.services.carbon-clearance.description",
    },
    {
      title: "Cellular Immune Response Model",
      titleKey: "services.preclinical-research.services.cellular-immune.title",
      description: "Cell-mediated immunity evaluation.",
      descriptionKey: "services.preclinical-research.services.cellular-immune.description",
    },
    {
      title: "Humoral Immune Response Model",
      titleKey: "services.preclinical-research.services.humoral-immune.title",
      description: "Antibody-mediated immunity assessment.",
      descriptionKey: "services.preclinical-research.services.humoral-immune.description",
    },
    {
      title: "Neutrophil Adhesion Test Model",
      titleKey: "services.preclinical-research.services.neutrophil-adhesion.title",
      description: "Neutrophil function and adhesion studies.",
      descriptionKey: "services.preclinical-research.services.neutrophil-adhesion.description",
    },
  ],
  hepatoprotectiveServices: [
    {
      title: "Hepatoprotective study against selected toxicant",
      titleKey: "services.preclinical-research.services.hepatoprotective-toxicant.title",
      description: "In vitro liver protection assessment.",
      descriptionKey: "services.preclinical-research.services.hepatoprotective-toxicant.description",
    },
    {
      title: "Hepatoprotective study in isolated primary rat hepatocytes",
      titleKey: "services.preclinical-research.services.hepatoprotective-hepatocytes.title",
      description: "Primary cell hepatoprotection studies.",
      descriptionKey: "services.preclinical-research.services.hepatoprotective-hepatocytes.description",
    },
    {
      title: "Gene expression studies",
      titleKey: "services.preclinical-research.services.gene-expression-liver.title",
      description: "Liver-specific gene expression analysis.",
      descriptionKey: "services.preclinical-research.services.gene-expression-liver.description",
    },
    {
      title: "Hepatoprotective study against selected toxicant in rats/mice",
      titleKey: "services.preclinical-research.services.hepatoprotective-vivo.title",
      description: "In vivo liver protection evaluation.",
      descriptionKey: "services.preclinical-research.services.hepatoprotective-vivo.description",
    },
  ],
  antiInfectiveServices: [
    {
      title: "Anti microbial activity by Zone of inhibition",
      titleKey: "services.preclinical-research.services.anti-microbial-zone.title",
      description: "Antimicrobial activity screening.",
      descriptionKey: "services.preclinical-research.services.anti-microbial-zone.description",
    },
    {
      title: "Anti microbial activity by MIC determination",
      titleKey: "services.preclinical-research.services.anti-microbial-mic.title",
      description: "Minimum inhibitory concentration assessment.",
      descriptionKey: "services.preclinical-research.services.anti-microbial-mic.description",
    },
    {
      title: "Antibiotic sensitivity testing",
      titleKey: "services.preclinical-research.services.antibiotic-sensitivity.title",
      description: "Antimicrobial resistance profiling.",
      descriptionKey: "services.preclinical-research.services.antibiotic-sensitivity.description",
    },
    {
      title: "TLC bioautography",
      titleKey: "services.preclinical-research.services.tlc-bioautography.title",
      description: "Bioactive compound identification on TLC plates.",
      descriptionKey: "services.preclinical-research.services.tlc-bioautography.description",
    },
    {
      title: "In vitro anti viral studies",
      titleKey: "services.preclinical-research.services.anti-viral.title",
      description: "Antiviral activity assessment.",
      descriptionKey: "services.preclinical-research.services.anti-viral.description",
    },
    {
      title: "Different wound healing models in mice/rats",
      titleKey: "services.preclinical-research.services.wound-healing.title",
      description: "In vivo wound healing efficacy studies.",
      descriptionKey: "services.preclinical-research.services.wound-healing.description",
    },
  ],
  obesityServices: [
    {
      title: "Anti adipogenesis studies in 3T3L-1 pre adipocytes",
      titleKey: "services.preclinical-research.services.anti-adipogenesis.title",
      description: "Fat cell differentiation inhibition studies.",
      descriptionKey: "services.preclinical-research.services.anti-adipogenesis.description",
    },
    {
      title: "Oil Red-O staining Cell triglyceride assay",
      titleKey: "services.preclinical-research.services.oil-red-staining.title",
      description: "Lipid accumulation quantification.",
      descriptionKey: "services.preclinical-research.services.oil-red-staining.description",
    },
    {
      title: "Gene expression studies (PPAR-gamma, SREBF)",
      titleKey: "services.preclinical-research.services.gene-expression-obesity.title",
      description: "Obesity-related gene expression analysis.",
      descriptionKey: "services.preclinical-research.services.gene-expression-obesity.description",
    },
    {
      title: "Triton induced hyperlipidemia model in mice/rats",
      titleKey: "services.preclinical-research.services.triton-hyperlipidemia.title",
      description: "Lipid metabolism disorder model.",
      descriptionKey: "services.preclinical-research.services.triton-hyperlipidemia.description",
    },
    {
      title: "Cocktail induced hypercholesterolemia model",
      titleKey: "services.preclinical-research.services.cocktail-hypercholesterolemia.title",
      description: "Cholesterol elevation model studies.",
      descriptionKey: "services.preclinical-research.services.cocktail-hypercholesterolemia.description",
    },
  ],
  cosmeticServices: [
    {
      title: "Skin Lightening",
      titleKey: "services.preclinical-research.services.skin-lightening.title",
      description: "Melanin reduction and skin brightening studies.",
      descriptionKey: "services.preclinical-research.services.skin-lightening.description",
    },
    {
      title: "Sun Protection Factor (SPF)",
      titleKey: "services.preclinical-research.services.spf.title",
      description: "UV protection assessment and SPF determination.",
      descriptionKey: "services.preclinical-research.services.spf.description",
    },
    {
      title: "Anti-aging",
      titleKey: "services.preclinical-research.services.anti-aging.title",
      description: "Anti-aging efficacy evaluation using advanced models.",
      descriptionKey: "services.preclinical-research.services.anti-aging.description",
    },
    {
      title: "Skin tightening",
      titleKey: "services.preclinical-research.services.skin-tightening.title",
      description: "Skin firmness and elasticity improvement studies.",
      descriptionKey: "services.preclinical-research.services.skin-tightening.description",
    },
    { 
      title: "Psoriasis", 
      titleKey: "services.preclinical-research.services.psoriasis.title",
      description: "Anti-psoriatic efficacy evaluation.",
      descriptionKey: "services.preclinical-research.services.psoriasis.description",
    },
    {
      title: "Scar/wound healing",
      titleKey: "services.preclinical-research.services.scar-wound-healing.title",
      description: "Wound healing and tissue regeneration studies.",
      descriptionKey: "services.preclinical-research.services.scar-wound-healing.description",
    },
    {
      title: "Anti-acne",
      titleKey: "services.preclinical-research.services.anti-acne.title",
      description: "Anti-acne efficacy and sebum control studies.",
      descriptionKey: "services.preclinical-research.services.anti-acne.description",
    },
    {
      title: "Anti-Dandruff",
      titleKey: "services.preclinical-research.services.anti-dandruff.title",
      description: "Anti-dandruff efficacy evaluation.",
      descriptionKey: "services.preclinical-research.services.anti-dandruff.description",
    },
    {
      title: "Deodorant",
      titleKey: "services.preclinical-research.services.deodorant.title",
      description: "Deodorant efficacy and antimicrobial studies.",
      descriptionKey: "services.preclinical-research.services.deodorant.description",
    },
    {
      title: "Skin Moisturizing",
      titleKey: "services.preclinical-research.services.skin-moisturizing.title",
      description: "Skin hydration and moisturizing effect studies.",
      descriptionKey: "services.preclinical-research.services.skin-moisturizing.description",
    },
    {
      title: "Skin pigmentation",
      titleKey: "services.preclinical-research.services.skin-pigmentation.title",
      description: "Skin pigmentation modulation studies.",
      descriptionKey: "services.preclinical-research.services.skin-pigmentation.description",
    },
    {
      title: "Hair growth/anti-hair fall",
      titleKey: "services.preclinical-research.services.hair-growth.title",
      description: "Hair growth stimulation and anti-hair fall studies.",
      descriptionKey: "services.preclinical-research.services.hair-growth.description",
    },
    {
      title: "Dermal permeation/absorption",
      titleKey: "services.preclinical-research.services.dermal-permeation.title",
      description: "Using EpiSkin™/EpiDerm™/Porcine skin/Start-M models.",
      descriptionKey: "services.preclinical-research.services.dermal-permeation.description",
    },
  ],
  toxicologyServices: [
    {
      title: "3T3 NRU phototoxicity (Skin irritation)",
      titleKey: "services.preclinical-research.services.phototoxicity.title",
      description: "Phototoxicity and skin irritation assessment.",
      descriptionKey: "services.preclinical-research.services.phototoxicity.description",
    },
    {
      title: "Acute Dermal toxicity",
      titleKey: "services.preclinical-research.services.acute-dermal.title",
      description: "Dermal exposure safety evaluation.",
      descriptionKey: "services.preclinical-research.services.acute-dermal.description",
    },
    {
      title: "Acute ocular toxicity",
      titleKey: "services.preclinical-research.services.acute-ocular.title",
      description: "Eye irritation and safety assessment.",
      descriptionKey: "services.preclinical-research.services.acute-ocular.description",
    },
    {
      title: "Acute inhalation toxicity",
      titleKey: "services.preclinical-research.services.acute-inhalation.title",
      description: "Respiratory safety evaluation.",
      descriptionKey: "services.preclinical-research.services.acute-inhalation.description",
    },
    {
      title: "Skin sensitization",
      titleKey: "services.preclinical-research.services.skin-sensitization.title",
      description: "Allergic sensitization potential assessment.",
      descriptionKey: "services.preclinical-research.services.skin-sensitization.description",
    },
    {
      title: "Genotoxicity",
      titleKey: "services.preclinical-research.services.genotoxicity.title",
      description: "DNA damage and mutagenic potential evaluation.",
      descriptionKey: "services.preclinical-research.services.genotoxicity.description",
    },
    {
      title: "AMES test (BRMT)",
      titleKey: "services.preclinical-research.services.ames-test.title",
      description: "Bacterial reverse mutation test.",
      descriptionKey: "services.preclinical-research.services.ames-test.description",
    },
    {
      title: "Chromosomal aberration in CHO-K1 cells",
      titleKey: "services.preclinical-research.services.chromosomal-aberration.title",
      description: "Chromosomal damage assessment.",
      descriptionKey: "services.preclinical-research.services.chromosomal-aberration.description",
    },
  ],
  otherServices: [
    {
      title: "Hypercholesterolemia",
      titleKey: "services.preclinical-research.services.hypercholesterolemia.title",
      description: "Cholesterol metabolism and lipid disorder studies.",
      descriptionKey: "services.preclinical-research.services.hypercholesterolemia.description",
    },
    {
      title: "Arthritis",
      titleKey: "services.preclinical-research.services.arthritis.title",
      description: "Anti-arthritic and joint health evaluation.",
      descriptionKey: "services.preclinical-research.services.arthritis.description",
    },
    { 
      title: "Osteoporosis", 
      titleKey: "services.preclinical-research.services.osteoporosis.title",
      description: "Bone health and density studies.",
      descriptionKey: "services.preclinical-research.services.osteoporosis.description",
    },
    {
      title: "Benign prostatic Hyperplasia",
      titleKey: "services.preclinical-research.services.bph.title",
      description: "Prostate health and BPH studies.",
      descriptionKey: "services.preclinical-research.services.bph.description",
    },
    {
      title: "Spermatogenesis",
      titleKey: "services.preclinical-research.services.spermatogenesis.title",
      description: "Male fertility and reproductive health studies.",
      descriptionKey: "services.preclinical-research.services.spermatogenesis.description",
    },
    {
      title: "Allergy",
      titleKey: "services.preclinical-research.services.allergy.title",
      description: "Anti-allergic and hypersensitivity studies.",
      descriptionKey: "services.preclinical-research.services.allergy.description",
    },
    {
      title: "Antitussive",
      titleKey: "services.preclinical-research.services.antitussive.title",
      description: "Cough suppression and respiratory studies.",
      descriptionKey: "services.preclinical-research.services.antitussive.description",
    },
  ],
  productDevelopmentServices: [
    {
      title: "Formulation development for NCE and polyherbal combinations",
      titleKey: "services.preclinical-research.services.formulation-development.title",
      description: "New chemical entity and herbal formulation development.",
      descriptionKey: "services.preclinical-research.services.formulation-development.description",
    },
    {
      title: "Optimization of existing formulations",
      titleKey: "services.preclinical-research.services.optimization.title",
      description: "Formulation improvement and optimization.",
      descriptionKey: "services.preclinical-research.services.optimization.description",
    },
    {
      title: "Novel formulations for improved delivery",
      titleKey: "services.preclinical-research.services.novel-formulations.title",
      description: "Advanced drug delivery system development.",
      descriptionKey: "services.preclinical-research.services.novel-formulations.description",
    },
    {
      title: "Controlled release and sustained release formulations",
      titleKey: "services.preclinical-research.services.controlled-release.title",
      description: "Extended release formulation development.",
      descriptionKey: "services.preclinical-research.services.controlled-release.description",
    },
    {
      title: "Evaluation of pre-formulation parameters",
      titleKey: "services.preclinical-research.services.pre-formulation.title",
      description: "Physicochemical characterization studies.",
      descriptionKey: "services.preclinical-research.services.pre-formulation.description",
    },
    {
      title: "Evaluation of post-formulation parameters",
      titleKey: "services.preclinical-research.services.post-formulation.title",
      description: "Formulation quality assessment.",
      descriptionKey: "services.preclinical-research.services.post-formulation.description",
    },
    {
      title: "Formulation stability analysis",
      titleKey: "services.preclinical-research.services.stability-analysis.title",
      description: "Stability testing and shelf-life determination.",
      descriptionKey: "services.preclinical-research.services.stability-analysis.description",
    },
  ],
};

export default function PreclinicalResearchService() {
  return <ServiceComponent serviceData={serviceData} />;
}
