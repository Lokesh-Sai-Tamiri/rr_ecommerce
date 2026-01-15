export interface GuidelineData {
  category: string;
  description: string;
  price: number;
  duration: number;
  discount: string;
}

export interface InvitroStudyData {
  productType: string;
  productForm: string;
  productSolvent: string;
  therapeuticArea: string;
  studyName: string;
  price: number;
  duration: number;
  discount: string;
}

// Invitro Study Data - Nutraceuticals
export const nutraceuticalsData: InvitroStudyData[] = [
  // PCOD/PCOS/Fertility
  {
    productType: "Nutraceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "PCOD/PCOS/Fertility",
    studyName: "In vitro antioxidant activity against H2O2 induced stress in Human Ovarian Cells (SKOV3)",
    price: 27000,
    duration: 45,
    discount: "5%"
  },
  {
    productType: "Nutraceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "PCOD/PCOS/Fertility",
    studyName: "In vitro anti inflammatory activity in Human Ovarian Cells (SKOV3)",
    price: 30000,
    duration: 45,
    discount: "5%"
  },
  {
    productType: "Nutraceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "PCOD/PCOS/Fertility",
    studyName: "Anti-oxidant study by H2O2 induced against GSH, catalase and ROS bi",
    price: 45000,
    duration: 30,
    discount: "5%"
  },
  // Anti-diabetic
  {
    productType: "Nutraceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-diabetic",
    studyName: "In vitro Glucose Uptake assay by non-radio labelled assay in L6 cell line.",
    price: 28000,
    duration: 30,
    discount: "5%"
  },
  {
    productType: "Nutraceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-diabetic",
    studyName: "In Vitro Glucose uptake in isolated rat hemi diaphragm",
    price: 28000,
    duration: 30,
    discount: "5%"
  },
  {
    productType: "Nutraceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-diabetic",
    studyName: "Alpha- Amylase inhibitory activity",
    price: 10000,
    duration: 20,
    discount: "5%"
  },
  {
    productType: "Nutraceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-diabetic",
    studyName: "Alpha- glucosidase activity",
    price: 12000,
    duration: 20,
    discount: "5%"
  },
  // Cardio protective
  {
    productType: "Nutraceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Cardio protective",
    studyName: "In vitro Cardio-protective activity against doxorubicin induced cell damage",
    price: 28000,
    duration: 45,
    discount: "5%"
  },
  {
    productType: "Nutraceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Cardio protective",
    studyName: "Evaluation of the modulatory effect of the test substance for its Antioxidant level in H9C2 cell line",
    price: 25000,
    duration: 45,
    discount: "5%"
  },
  // Hepatoprotective
  {
    productType: "Nutraceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Hepatoprotective",
    studyName: "In vitro evaluation of the Hepatoprotective activity of the test substance against selected toxicant.",
    price: 30000,
    duration: 30,
    discount: "5%"
  },
  {
    productType: "Nutraceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Hepatoprotective",
    studyName: "Hepatoprotective study in isolated primary rat hepatocytes by gene expression method",
    price: 30000,
    duration: 30,
    discount: "5%"
  },
  // Weight Management
  {
    productType: "Nutraceuticals",
    productForm: "ets, Capsules, Syrup, Suspensions, Powders, Granules, Oral strips, Drop",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Weight Management",
    studyName: "Red-O-staining",
    price: 25000,
    duration: 30,
    discount: "5%"
  },
  {
    productType: "Nutraceuticals",
    productForm: "ets, Capsules, Syrup, Suspensions, Powders, Granules, Oral strips, Drop",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Weight Management",
    studyName: "In vitro anti adepogenesis activity in HepG2 cells through the modulation of PPAR gamma",
    price: 30000,
    duration: 30,
    discount: "5%"
  },
  {
    productType: "Nutraceuticals",
    productForm: "ets, Capsules, Syrup, Suspensions, Powders, Granules, Oral strips, Drop",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Weight Management",
    studyName: "In vitro anti adepogenesis activity in HepG2 cells through the modulation of SREBP gene expression",
    price: 30000,
    duration: 30,
    discount: "5%"
  },
  {
    productType: "Nutraceuticals",
    productForm: "ets, Capsules, Syrup, Suspensions, Powders, Granules, Oral strips, Drop",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Weight Management",
    studyName: "In vitro anti adepogenesis activity in 3T3L cell line through Cell triglyceride assay",
    price: 30000,
    duration: 30,
    discount: "5%"
  },
  // Digestive/Gut Health
  {
    productType: "Nutraceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Digestive/Gut Health",
    studyName: "Determination of modulatory role of test product on gut health by probiotic/antibiotic activitiy of test product.",
    price: 25000,
    duration: 40,
    discount: "5%"
  },
  // Energy
  {
    productType: "Nutraceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Energy",
    studyName: "In vitro evaluation of test substances potential on cellular respiration by measuring cellular ATP levels in Human Hepatocyte cell line",
    price: 62000,
    duration: 50,
    discount: "5%"
  },
  // Anti-stress/Sleep study
  {
    productType: "Nutraceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-stress/Sleep study",
    studyName: "Determination of anti-stress activity against H2O2 induced cytotoxicity in rat Glial cells.",
    price: 28000,
    duration: 30,
    discount: "5%"
  },
  // Neuroprotective
  {
    productType: "Nutraceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Neuroprotective",
    studyName: "Cytoprotective properties against H2O2 induced stress in rat Glial cells.",
    price: 28000,
    duration: 30,
    discount: "5%"
  },
  {
    productType: "Nutraceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Neuroprotective",
    studyName: "In vitro neuroprotective studies against LPS induced inflammation in neuroblasts",
    price: 28000,
    duration: 30,
    discount: "5%"
  },
  // Anti-Cancer
  {
    productType: "Nutraceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-Cancer",
    studyName: "Cytotoxicity assay by MTT",
    price: 5000,
    duration: 30,
    discount: "5%"
  },
  {
    productType: "Nutraceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-Cancer",
    studyName: "Apoptisis assay",
    price: 25000,
    duration: 35,
    discount: "5%"
  },
  {
    productType: "Nutraceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-Cancer",
    studyName: "DNA fragmentation",
    price: 30000,
    duration: 35,
    discount: "5%"
  },
  {
    productType: "Nutraceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-Cancer",
    studyName: "Cancer specific gene expression analysis",
    price: 25000,
    duration: 40,
    discount: "5%"
  },
  // Anti-oxidant
  {
    productType: "Nutraceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-oxidant",
    studyName: "Nitric oxide assay",
    price: 3500,
    duration: 15,
    discount: "5%"
  },
  {
    productType: "Nutraceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-oxidant",
    studyName: "ABTS radical scavenging assay",
    price: 4000,
    duration: 15,
    discount: "5%"
  },
  {
    productType: "Nutraceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-oxidant",
    studyName: "Hydroxyl radical scavenging assay",
    price: 3500,
    duration: 15,
    discount: "5%"
  },
  {
    productType: "Nutraceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-oxidant",
    studyName: "Hydrogen peroxide scavenging activity",
    price: 3000,
    duration: 15,
    discount: "5%"
  },
  {
    productType: "Nutraceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-oxidant",
    studyName: "Lipid peroxidation inhibitory activity",
    price: 4000,
    duration: 15,
    discount: "5%"
  },
  {
    productType: "Nutraceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-oxidant",
    studyName: "DPPH assay",
    price: 3000,
    duration: 15,
    discount: "5%"
  },
  {
    productType: "Nutraceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-oxidant",
    studyName: "Total Antioxidant capacity",
    price: 3000,
    duration: 15,
    discount: "5%"
  },
  {
    productType: "Nutraceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-oxidant",
    studyName: "Total Phenolic and Flavonoid content estimation",
    price: 3500,
    duration: 15,
    discount: "5%"
  },
  // Nephroprotective
  {
    productType: "Nutraceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Nephroprotective",
    studyName: "Nephroprotective activity in renal cell line against hydrogen peroxide induced cell damage",
    price: 30000,
    duration: 45,
    discount: "5%"
  },
  // Bone Health
  {
    productType: "Nutraceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Bone Health",
    studyName: "Cell proliferative assay on SH-SY5Y(Human Neuroblastoma)cell line",
    price: 25000,
    duration: 30,
    discount: "5%"
  },
  {
    productType: "Nutraceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Bone Health",
    studyName: "Anti-inflammatory study by LPS induced against TNF alpha biomarkers on Human chondrocyte cell line.",
    price: 25000,
    duration: 45,
    discount: "5%"
  },
  {
    productType: "Nutraceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Bone Health",
    studyName: "Anti-inflammatory study by LPS induced against IL-6 biomarkers on Human chondrocyte cell line.",
    price: 25000,
    duration: 45,
    discount: "5%"
  },
  {
    productType: "Nutraceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Bone Health",
    studyName: "Anti-inflammatory study by LPS induced against IL-1 beta biomarkers on Human chondrocyte cell line.",
    price: 25000,
    duration: 45,
    discount: "5%"
  }
];

// Cosmeceuticals Data
export const cosmeceuticalsData: InvitroStudyData[] = [
  // Anti-acne
  {
    productType: "Cosmeceuticals",
    productForm: "Gel, Foam, Cream, Lotion, Toner / Mist/Spray, Others",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-acne",
    studyName: "Determination of the modulatory effect of the test substance against P. acne",
    price: 12500,
    duration: 30,
    discount: "5%"
  },
  {
    productType: "Cosmeceuticals",
    productForm: "Gel, Foam, Cream, Lotion, Toner / Mist/Spray, Others",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-acne",
    studyName: "In vitro anti-inflammatory activity against LPS induced TNF-alpha production in macrophages",
    price: 28000,
    duration: 30,
    discount: "5%"
  },
  {
    productType: "Cosmeceuticals",
    productForm: "Gel, Foam, Cream, Lotion, Toner / Mist/Spray, Others",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-acne",
    studyName: "Evaluation of melanin inhibitory properties against Forskolin induced melanin synthesis in B16F10 cell line",
    price: 30000,
    duration: 30,
    discount: "5%"
  },
  // SPF Factor
  {
    productType: "Cosmeceuticals",
    productForm: "Gel, Foam, Cream, Lotion, Toner / Mist/Spray, Others",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "SPF Factor",
    studyName: "Determination of SPF of test product by UV spectrophotometry method.",
    price: 20000,
    duration: 15,
    discount: "5%"
  },
  {
    productType: "Cosmeceuticals",
    productForm: "Gel, Foam, Cream, Lotion, Toner / Mist/Spray, Others",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "SPF Factor",
    studyName: "Determination of Sun Protection Factor of test formulation as per ISO standard",
    price: 25000,
    duration: 15,
    discount: "5%"
  },
  // Pore minimazation
  {
    productType: "Cosmeceuticals",
    productForm: "Gel, Foam, Cream, Lotion, Toner / Mist/Spray, Others",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Pore minimazation",
    studyName: "Evaluation of modulatory effect on Fillagrin gene expression in keratinocytes",
    price: 25000,
    duration: 30,
    discount: "5%"
  },
  // Anti-aging & Anti-wrinkle
  {
    productType: "Cosmeceuticals",
    productForm: "Gel, Foam, Cream, Lotion, Toner / Mist/Spray, Others",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-aging & Anti-wrinkle",
    studyName: "In vitro antioxidant activity of test product in keratinocytes",
    price: 18000,
    duration: 30,
    discount: "5%"
  },
  {
    productType: "Cosmeceuticals",
    productForm: "Gel, Foam, Cream, Lotion, Toner / Mist/Spray, Others",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-aging & Anti-wrinkle",
    studyName: "Cytoprotective effect against UV induced cell damage",
    price: 30000,
    duration: 30,
    discount: "5%"
  },
  {
    productType: "Cosmeceuticals",
    productForm: "Gel, Foam, Cream, Lotion, Toner / Mist/Spray, Others",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-aging & Anti-wrinkle",
    studyName: "Evaluation of modulatory effect on Collagengene expression in dermal fibroblasts",
    price: 30000,
    duration: 40,
    discount: "5%"
  },
  {
    productType: "Cosmeceuticals",
    productForm: "Gel, Foam, Cream, Lotion, Toner / Mist/Spray, Others",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-aging & Anti-wrinkle",
    studyName: "Evaluation of modulatory effect on Elastingene expression in dermal fibroblasts",
    price: 30000,
    duration: 40,
    discount: "5%"
  },
  {
    productType: "Cosmeceuticals",
    productForm: "Gel, Foam, Cream, Lotion, Toner / Mist/Spray, Others",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-aging & Anti-wrinkle",
    studyName: "Evaluation of modulatory effect on MMP-9 gene expression in dermal fibroblasts",
    price: 30000,
    duration: 40,
    discount: "5%"
  },
  {
    productType: "Cosmeceuticals",
    productForm: "Gel, Foam, Cream, Lotion, Toner / Mist/Spray, Others",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-aging & Anti-wrinkle",
    studyName: "Modulatory effect on collagen biosynthesis in dermal fibroblasts",
    price: 25000,
    duration: 40,
    discount: "5%"
  },
  {
    productType: "Cosmeceuticals",
    productForm: "Gel, Foam, Cream, Lotion, Toner / Mist/Spray, Others",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-aging & Anti-wrinkle",
    studyName: "Determination of in vitro cytoprotective activity of test formulation against UV induced stress in human keratinocytes",
    price: 25000,
    duration: 40,
    discount: "5%"
  },
  // Skin glow/ Radiance Boost
  {
    productType: "Cosmeceuticals",
    productForm: "Gel, Foam, Cream, Lotion, Toner / Mist/Spray, Others",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Skin glow/ Radiance Boost",
    studyName: "Evaluation of melanin inhibitory properties against Forskolin induced melanin synthesis in B16F10 cell line",
    price: 30000,
    duration: 45,
    discount: "5%"
  },
  {
    productType: "Cosmeceuticals",
    productForm: "Gel, Foam, Cream, Lotion, Toner / Mist/Spray, Others",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Skin glow/ Radiance Boost",
    studyName: "Determination of Skin lightening activity by Mushroom Tyrosinase inhibitory assay",
    price: 25000,
    duration: 20,
    discount: "5%"
  },
  {
    productType: "Cosmeceuticals",
    productForm: "Gel, Foam, Cream, Lotion, Toner / Mist/Spray, Others",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Skin glow/ Radiance Boost",
    studyName: "In vitro melanin modulation activity of test substance in NHEM cells",
    price: 30000,
    duration: 35,
    discount: "5%"
  },
  {
    productType: "Cosmeceuticals",
    productForm: "Gel, Foam, Cream, Lotion, Toner / Mist/Spray, Others",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Skin glow/ Radiance Boost",
    studyName: "Evaluation of melanin inhibitory properties against UV induced melanin synthesis",
    price: 25000,
    duration: 30,
    discount: "5%"
  },
  {
    productType: "Cosmeceuticals",
    productForm: "Gel, Foam, Cream, Lotion, Toner / Mist/Spray, Others",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Skin glow/ Radiance Boost",
    studyName: "Evaluation of melanin inhibitory properties against urban pollution (ERM-CZ00) induced melanin synthesis",
    price: 28000,
    duration: 40,
    discount: "5%"
  },
  // Moisturizing effect
  {
    productType: "Cosmeceuticals",
    productForm: "Gel, Foam, Cream, Lotion, Toner / Mist/Spray, Others",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Moisturizing effect",
    studyName: "Evaluation of modulatory effect on AQP-3 gene expression in keratinocytes",
    price: 28000,
    duration: 30,
    discount: "5%"
  },
  // Antioxidant
  {
    productType: "Cosmeceuticals",
    productForm: "Gel, Foam, Cream, Lotion, Toner / Mist/Spray, Others",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Antioxidant",
    studyName: "Determination of antioxidant activity of the test product by GSH measurement in keratinocytes",
    price: 27500,
    duration: 40,
    discount: "5%"
  },
  // Preservative Efficacy Test
  {
    productType: "Cosmeceuticals",
    productForm: "Gel, Foam, Cream, Lotion, Toner / Mist/Spray, Others",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Preservative Efficacy Test",
    studyName: "Evaluation of Preservative Efficacy of the test product by Preservative Efficacy Test (PET) as per USP 51/ISO 11930",
    price: 35000,
    duration: 40,
    discount: "5%"
  }
];

// Pharmaceuticals Data
export const pharmaceuticalsData: InvitroStudyData[] = [
  // PCOD/PCOS/Fertility
  {
    productType: "Pharmaceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "PCOD/PCOS/Fertility",
    studyName: "In vitro antioxidant activity against H2O2 induced stress in Human Ovarian Cells (SKOV3)",
    price: 27000,
    duration: 45,
    discount: "5%"
  },
  {
    productType: "Pharmaceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "PCOD/PCOS/Fertility",
    studyName: "In vitro anti inflammatory activity in Human Ovarian Cells (SKOV3)",
    price: 30000,
    duration: 30,
    discount: "5%"
  },
  {
    productType: "Pharmaceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "PCOD/PCOS/Fertility",
    studyName: "Anti-oxidant study by H2O2 induced against GSH, catalase and ROS biomarkers on R2C cell line.",
    price: 45000,
    duration: 45,
    discount: "5%"
  },
  // Anti-diabetic
  {
    productType: "Pharmaceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-diabetic",
    studyName: "In vitro Glucose Uptake assay by non-radio labelled assay in L6 cell line.",
    price: 28000,
    duration: 30,
    discount: "5%"
  },
  {
    productType: "Pharmaceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-diabetic",
    studyName: "In Vitro Glucose uptake in isolated rat hemi diaphragm",
    price: 28000,
    duration: 30,
    discount: "5%"
  },
  {
    productType: "Pharmaceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-diabetic",
    studyName: "Alpha- Amylase inhibitory activity",
    price: 10000,
    duration: 20,
    discount: "5%"
  },
  {
    productType: "Pharmaceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-diabetic",
    studyName: "Alpha- glucosidase activity",
    price: 12000,
    duration: 20,
    discount: "5%"
  },
  // Cardio protective
  {
    productType: "Pharmaceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Cardio protective",
    studyName: "In vitro Cardio-protective activity against doxorubicin induced cell damage",
    price: 28000,
    duration: 45,
    discount: "5%"
  },
  {
    productType: "Pharmaceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Cardio protective",
    studyName: "Evaluation of the modulatory effect of the test substance for its Antioxidant level in H9C2 cell line",
    price: 25000,
    duration: 45,
    discount: "5%"
  },
  // Hepatoprotective
  {
    productType: "Pharmaceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Hepatoprotective",
    studyName: "In vitro evaluation of the Hepatoprotective activity of the test substance against selected toxicant.",
    price: 30000,
    duration: 30,
    discount: "5%"
  },
  {
    productType: "Pharmaceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Hepatoprotective",
    studyName: "Hepatoprotective study in isolated primary rat hepatocytes by gene expression method",
    price: 30000,
    duration: 30,
    discount: "5%"
  },
  // Weight Management
  {
    productType: "Pharmaceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Weight Management",
    studyName: "Anti adepogensis studies in 3T3 L1 pre adipocytes by Oil Red-O-staining",
    price: 30000,
    duration: 30,
    discount: "5%"
  },
  {
    productType: "Pharmaceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Weight Management",
    studyName: "In vitro anti adepogenesis activity in HepG2 cells through the modulation of SREBP gene expression",
    price: 30000,
    duration: 30,
    discount: "5%"
  },
  {
    productType: "Pharmaceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Weight Management",
    studyName: "In vitro anti adepogenesis activity in HepG2 cells through the modulation of PPAR gamma expression",
    price: 30000,
    duration: 30,
    discount: "5%"
  },
  {
    productType: "Pharmaceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Weight Management",
    studyName: "In vitro anti adepogenesis activity in 3T3L cell line through Cell triglyceride assay",
    price: 30000,
    duration: 30,
    discount: "5%"
  },
  // Digestive/Gut Health
  {
    productType: "Pharmaceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Digestive/Gut Health",
    studyName: "Determination of modulatory role of test product on gut health by probiotic/antibiotic activitiy of test product.",
    price: 25000,
    duration: 40,
    discount: "5%"
  },
  // Energy
  {
    productType: "Pharmaceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Energy",
    studyName: "In vitro evaluation of test substances potential on cellular respiration by measuring cellular ATP levels in Human Hepatocyte cell line",
    price: 62000,
    duration: 50,
    discount: "5%"
  },
  // Anti-stress/Sleep study
  {
    productType: "Pharmaceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-stress/Sleep study",
    studyName: "Determination of anti-stress activity against H2O2 induced cytotoxicity in rat Glial cells.",
    price: 28000,
    duration: 30,
    discount: "5%"
  },
  // Neuroprotective
  {
    productType: "Pharmaceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Neuroprotective",
    studyName: "Cytoprotective properties against H2O2 induced stress in rat Glial cells.",
    price: 28000,
    duration: 30,
    discount: "5%"
  },
  {
    productType: "Pharmaceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Neuroprotective",
    studyName: "In vitro neuroprotective studies against LPS induced inflammation in neuroblasts",
    price: 28000,
    duration: 30,
    discount: "5%"
  },
  // Anti-Cancer
  {
    productType: "Pharmaceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-Cancer",
    studyName: "Cytotoxicity assay by MTT",
    price: 5000,
    duration: 30,
    discount: "5%"
  },
  {
    productType: "Pharmaceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-Cancer",
    studyName: "Apoptisis assay",
    price: 25000,
    duration: 35,
    discount: "5%"
  },
  {
    productType: "Pharmaceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-Cancer",
    studyName: "DNA fragmentation",
    price: 30000,
    duration: 35,
    discount: "5%"
  },
  {
    productType: "Pharmaceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-Cancer",
    studyName: "Cancer specific gene expression analysis",
    price: 25000,
    duration: 40,
    discount: "5%"
  },
  // Anti-oxidant
  {
    productType: "Pharmaceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-oxidant",
    studyName: "Nitric oxide assay",
    price: 3500,
    duration: 15,
    discount: "5%"
  },
  {
    productType: "Pharmaceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-oxidant",
    studyName: "ABTS radical scavenging assay",
    price: 4000,
    duration: 15,
    discount: "5%"
  },
  {
    productType: "Pharmaceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-oxidant",
    studyName: "Hydroxyl radical scavenging assay",
    price: 3500,
    duration: 15,
    discount: "5%"
  },
  {
    productType: "Pharmaceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-oxidant",
    studyName: "Hydrogen peroxide scavenging activity",
    price: 3000,
    duration: 15,
    discount: "5%"
  },
  {
    productType: "Pharmaceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-oxidant",
    studyName: "Lipid peroxidation inhibitory activity",
    price: 4000,
    duration: 15,
    discount: "5%"
  },
  {
    productType: "Pharmaceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-oxidant",
    studyName: "DPPH assay",
    price: 3000,
    duration: 15,
    discount: "5%"
  },
  {
    productType: "Pharmaceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-oxidant",
    studyName: "Total Antioxidant capacity",
    price: 3000,
    duration: 15,
    discount: "5%"
  },
  {
    productType: "Pharmaceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-oxidant",
    studyName: "Total Phenolic and Flavonoid content estimation",
    price: 3500,
    duration: 15,
    discount: "5%"
  },
  // Nephroprotective
  {
    productType: "Pharmaceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Nephroprotective",
    studyName: "Nephroprotective activity in renal cell line against hydrogen peroxide induced cell damage",
    price: 30000,
    duration: 45,
    discount: "5%"
  },
  // Bone Health
  {
    productType: "Pharmaceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Bone Health",
    studyName: "Cell proliferative assay on SH-SY5Y(Human Neuroblastoma)cell line",
    price: 25000,
    duration: 30,
    discount: "5%"
  },
  {
    productType: "Pharmaceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Bone Health",
    studyName: "Anti-inflammatory study by LPS induced against TNF alpha biomarkers on Human chondrocyte cell line.",
    price: 25000,
    duration: 45,
    discount: "5%"
  },
  {
    productType: "Pharmaceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Bone Health",
    studyName: "Anti-inflammatory study by LPS induced against IL-6 biomarkers on Human chondrocyte cell line.",
    price: 25000,
    duration: 45,
    discount: "5%"
  },
  {
    productType: "Pharmaceuticals",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Bone Health",
    studyName: "Anti-inflammatory study by LPS induced against IL-1 beta biomarkers on Human chondrocyte cell line.",
    price: 25000,
    duration: 45,
    discount: "5%"
  }
];

// Herbal/Ayush Products Data
export const herbalAyushData: InvitroStudyData[] = [
  // PCOD/PCOS/Fertility
  {
    productType: "Herbal/Ayush product",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "PCOD/PCOS/Fertility",
    studyName: "In vitro antioxidant activity against H2O2 induced stress in Human Ovarian Cells (SKOV3)",
    price: 27000,
    duration: 45,
    discount: "5%"
  },
  {
    productType: "Herbal/Ayush product",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "PCOD/PCOS/Fertility",
    studyName: "In vitro anti inflammatory activity in Human Ovarian Cells (SKOV3)",
    price: 30000,
    duration: 30,
    discount: "5%"
  },
  {
    productType: "Herbal/Ayush product",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "PCOD/PCOS/Fertility",
    studyName: "Anti-oxidant study by H2O2 induced against GSH, catalase and ROS biomarkers on R2C cell line.",
    price: 45000,
    duration: 45,
    discount: "5%"
  },
  // Anti-diabetic
  {
    productType: "Herbal/Ayush product",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-diabetic",
    studyName: "In vitro Glucose Uptake assay by non-radio labelled assay in L6 cell line.",
    price: 28000,
    duration: 30,
    discount: "5%"
  },
  {
    productType: "Herbal/Ayush product",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-diabetic",
    studyName: "In Vitro Glucose uptake in isolated rat hemi diaphragm",
    price: 28000,
    duration: 30,
    discount: "5%"
  },
  {
    productType: "Herbal/Ayush product",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-diabetic",
    studyName: "Alpha- Amylase inhibitory activity",
    price: 10000,
    duration: 20,
    discount: "5%"
  },
  {
    productType: "Herbal/Ayush product",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-diabetic",
    studyName: "Alpha- glucosidase activity",
    price: 12000,
    duration: 20,
    discount: "5%"
  },
  // Cardio protective
  {
    productType: "Herbal/Ayush product",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Cardio protective",
    studyName: "In vitro Cardio-protective activity against doxorubicin induced cell damage",
    price: 28000,
    duration: 45,
    discount: "5%"
  },
  {
    productType: "Herbal/Ayush product",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Cardio protective",
    studyName: "Evaluation of the modulatory effect of the test substance for its Antioxidant level in H9C2 cell line",
    price: 25000,
    duration: 45,
    discount: "5%"
  },
  // Hepatoprotective
  {
    productType: "Herbal/Ayush product",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Hepatoprotective",
    studyName: "In vitro evaluation of the Hepatoprotective activity of the test substance against selected toxicant.",
    price: 30000,
    duration: 30,
    discount: "5%"
  },
  {
    productType: "Herbal/Ayush product",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Hepatoprotective",
    studyName: "Hepatoprotective study in isolated primary rat hepatocytes by gene expression method",
    price: 30000,
    duration: 30,
    discount: "5%"
  },
  // Weight Management
  {
    productType: "Herbal/Ayush product",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Weight Management",
    studyName: "Anti adepogensis studies in 3T3 L1 pre adipocytes by Oil Red-O-staining",
    price: 30000,
    duration: 30,
    discount: "5%"
  },
  {
    productType: "Herbal/Ayush product",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Weight Management",
    studyName: "In vitro anti adepogenesis activity in HepG2 cells through the modulation of SREBP gene expression",
    price: 30000,
    duration: 30,
    discount: "5%"
  },
  {
    productType: "Herbal/Ayush product",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Weight Management",
    studyName: "In vitro anti adepogenesis activity in HepG2 cells through the modulation of PPAR gamma expression",
    price: 30000,
    duration: 30,
    discount: "5%"
  },
  {
    productType: "Herbal/Ayush product",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Weight Management",
    studyName: "In vitro anti adepogenesis activity in 3T3L cell line through Cell triglyceride assay",
    price: 30000,
    duration: 30,
    discount: "5%"
  },
  // Digestive/Gut Health
  {
    productType: "Herbal/Ayush product",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Digestive/Gut Health",
    studyName: "Determination of modulatory role of test product on gut health by probiotic/antibiotic activitiy of test product.",
    price: 25000,
    duration: 40,
    discount: "5%"
  },
  // Energy
  {
    productType: "Herbal/Ayush product",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Energy",
    studyName: "In vitro evaluation of test substances potential on cellular respiration by measuring cellular ATP levels in Human Hepatocyte cell line",
    price: 62000,
    duration: 50,
    discount: "5%"
  },
  // Anti-stress/Sleep study
  {
    productType: "Herbal/Ayush product",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-stress/Sleep study",
    studyName: "Determination of anti-stress activity against H2O2 induced cytotoxicity in rat Glial cells.",
    price: 28000,
    duration: 30,
    discount: "5%"
  },
  // Neuroprotective
  {
    productType: "Herbal/Ayush product",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Neuroprotective",
    studyName: "Cytoprotective properties against H2O2 induced stress in rat Glial cells.",
    price: 28000,
    duration: 30,
    discount: "5%"
  },
  {
    productType: "Herbal/Ayush product",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Neuroprotective",
    studyName: "In vitro neuroprotective studies against LPS induced inflammation in neuroblasts",
    price: 28000,
    duration: 30,
    discount: "5%"
  },
  // Anti-Cancer
  {
    productType: "Herbal/Ayush product",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-Cancer",
    studyName: "Cytotoxicity assay by MTT",
    price: 5000,
    duration: 30,
    discount: "5%"
  },
  {
    productType: "Herbal/Ayush product",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-Cancer",
    studyName: "Apoptisis assay",
    price: 25000,
    duration: 35,
    discount: "5%"
  },
  {
    productType: "Herbal/Ayush product",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-Cancer",
    studyName: "DNA fragmentation",
    price: 30000,
    duration: 35,
    discount: "5%"
  },
  {
    productType: "Herbal/Ayush product",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-Cancer",
    studyName: "Cancer specific gene expression analysis",
    price: 25000,
    duration: 40,
    discount: "5%"
  },
  // Anti-oxidant
  {
    productType: "Herbal/Ayush product",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-oxidant",
    studyName: "Nitric oxide assay",
    price: 3500,
    duration: 15,
    discount: "5%"
  },
  {
    productType: "Herbal/Ayush product",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-oxidant",
    studyName: "ABTS radical scavenging assay",
    price: 4000,
    duration: 15,
    discount: "5%"
  },
  {
    productType: "Herbal/Ayush product",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-oxidant",
    studyName: "Hydroxyl radical scavenging assay",
    price: 3500,
    duration: 15,
    discount: "5%"
  },
  {
    productType: "Herbal/Ayush product",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-oxidant",
    studyName: "Hydrogen peroxide scavenging activity",
    price: 3000,
    duration: 15,
    discount: "5%"
  },
  {
    productType: "Herbal/Ayush product",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-oxidant",
    studyName: "Lipid peroxidation inhibitory activity",
    price: 4000,
    duration: 15,
    discount: "5%"
  },
  {
    productType: "Herbal/Ayush product",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-oxidant",
    studyName: "DPPH assay",
    price: 3000,
    duration: 15,
    discount: "5%"
  },
  {
    productType: "Herbal/Ayush product",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-oxidant",
    studyName: "Total Antioxidant capacity",
    price: 3000,
    duration: 15,
    discount: "5%"
  },
  {
    productType: "Herbal/Ayush product",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Anti-oxidant",
    studyName: "Total Phenolic and Flavonoid content estimation",
    price: 3500,
    duration: 15,
    discount: "5%"
  },
  // Nephroprotective
  {
    productType: "Herbal/Ayush product",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Nephroprotective",
    studyName: "Nephroprotective activity in renal cell line against hydrogen peroxide induced cell damage",
    price: 30000,
    duration: 45,
    discount: "5%"
  },
  // Bone Health
  {
    productType: "Herbal/Ayush product",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Bone Health",
    studyName: "Cell proliferative assay on SH-SY5Y(Human Neuroblastoma)cell line",
    price: 25000,
    duration: 30,
    discount: "5%"
  },
  {
    productType: "Herbal/Ayush product",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Bone Health",
    studyName: "Anti-inflammatory study by LPS induced against TNF alpha biomarkers on Human chondrocyte cell line.",
    price: 25000,
    duration: 45,
    discount: "5%"
  },
  {
    productType: "Herbal/Ayush product",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Bone Health",
    studyName: "Anti-inflammatory study by LPS induced against IL-6 biomarkers on Human chondrocyte cell line.",
    price: 25000,
    duration: 45,
    discount: "5%"
  },
  {
    productType: "Herbal/Ayush product",
    productForm: "Tablets, Capsules, Syrup, Suspensions, Powders, Granul",
    productSolvent: "Distilled Water, Buffered Aqueous Solutions, Ethanol",
    therapeuticArea: "Bone Health",
    studyName: "Anti-inflammatory study by LPS induced against IL-1 beta biomarkers on Human chondrocyte cell line.",
    price: 25000,
    duration: 45,
    discount: "5%"
  }
];

// Helper function to get guidelines for a specific category
export const getGuidelinesForCategory = (category: string): InvitroStudyData[] => {
  const allData = [...nutraceuticalsData, ...cosmeceuticalsData, ...pharmaceuticalsData, ...herbalAyushData];
  return allData.filter(item => item.therapeuticArea === category);
};

// Helper function to get guideline data
export const getGuidelineData = (category: string, guideline: string): GuidelineData | null => {
  const allData = [...nutraceuticalsData, ...cosmeceuticalsData, ...pharmaceuticalsData, ...herbalAyushData];
  const data = allData.find(item => 
    item.therapeuticArea === category && item.studyName === guideline
  );
  
  if (data) {
    return {
      category: data.therapeuticArea,
      description: data.studyName,
      price: data.price,
      duration: data.duration,
      discount: data.discount
    };
  }
  
  return null;
};

// Get all unique therapeutic areas
export const getAllTherapeuticAreas = () => {
  const allData = [...nutraceuticalsData, ...cosmeceuticalsData, ...pharmaceuticalsData, ...herbalAyushData];
  const areas = [...new Set(allData.map(item => item.therapeuticArea))];
  return areas.sort();
};

// Get therapeutic areas for specific product type
export const getTherapeuticAreasForProductType = (productType: string) => {
  let data: InvitroStudyData[] = [];
  
  switch (productType) {
    case 'nutraceuticals':
      data = nutraceuticalsData;
      break;
    case 'cosmeceuticals':
      data = cosmeceuticalsData;
      break;
    case 'pharmaceuticals':
      data = pharmaceuticalsData;
      break;
    case 'herbalAyush':
      data = herbalAyushData;
      break;
    default:
      data = nutraceuticalsData;
  }
  
  const areas = [...new Set(data.map(item => item.therapeuticArea))];
  return areas.sort();
};
