// Comprehensive guideline data for different categories
export interface GuidelineData {
  title: string;
  description: string;
  baseDuration: number; // in days
  deviation: number; // percentage
  price: number;
  category: string;
}

export interface CategoryData {
  [category: string]: {
    [guideline: string]: GuidelineData;
  };
}

// Base duration calculation function
export const calculateTotalDuration = (baseDuration: number, deviation: number): number => {
  const deviationDays = Math.round((baseDuration * deviation) / 100);
  return baseDuration + deviationDays;
};

// Format duration for display
export const formatDuration = (days: number): string => {
  if (days >= 365) {
    const years = Math.floor(days / 365);
    const remainingDays = days % 365;
    if (remainingDays === 0) {
      return `${years} year${years > 1 ? 's' : ''}`;
    }
    return `${years} year${years > 1 ? 's' : ''} ${remainingDays} days`;
  } else if (days >= 30) {
    const months = Math.floor(days / 30);
    const remainingDays = days % 30;
    if (remainingDays === 0) {
      return `${months} month${months > 1 ? 's' : ''}`;
    }
    return `${months} month${months > 1 ? 's' : ''} ${remainingDays} days`;
  } else if (days >= 7) {
    const weeks = Math.floor(days / 7);
    const remainingDays = days % 7;
    if (remainingDays === 0) {
      return `${weeks} week${weeks > 1 ? 's' : ''}`;
    }
    return `${weeks} week${weeks > 1 ? 's' : ''} ${remainingDays} days`;
  } else {
    return `${days} day${days > 1 ? 's' : ''}`;
  }
};

// Comprehensive data for all categories
export const guidelineData: CategoryData = {
  'Pharmaceuticals': {
    'OECD 423': {
      title: 'OECD 423',
      description: 'Describes the Acute Toxic Class Method for assessing oral toxicity using a stepwise approach with minimal animal use, focusing on mortality to determine toxicity classification. It provides a range-based estimate rather than a precise LD50, aligning with ethical standards and GHS classification.',
      baseDuration: 30,
      deviation: 5,
      price: 60000,
      category: 'Pharmaceuticals'
    },
    'OECD 407': {
      title: 'OECD 407',
      description: 'Describes a 28-day repeated dose oral toxicity study in rodents to evaluate potential health hazards from subacute exposure, including effects on the nervous, immune, and endocrine systems. It supports hazard identification and risk assessment, especially for chemicals not requiring longer-term studies.',
      baseDuration: 60,
      deviation: 5,
      price: 800000,
      category: 'Pharmaceuticals'
    },
    'OECD 408': {
      title: 'OECD 408',
      description: 'Describes a 90-day repeated dose oral toxicity study in rodents to evaluate sub-chronic effects of chemicals, including potential impacts on major organs and endocrine function. It helps identify a no-observed-adverse-effect level (NOAEL) and informs risk assessment for prolonged human exposure.',
      baseDuration: 175,
      deviation: 5,
      price: 1300000,
      category: 'Pharmaceuticals'
    },
    'OECD 452': {
      title: 'OECD 452',
      description: 'Describes chronic toxicity studies involving daily administration of a test substance to rodents over a 12-month period to evaluate long-term health effects. It helps identify target organs, dose-response relationships, and supports risk assessment.',
      baseDuration: 540,
      deviation: 5,
      price: 3200000,
      category: 'Pharmaceuticals'
    },
    'OECD 421': {
      title: 'OECD 421',
      description: 'Outlines a Reproduction/Developmental Toxicity Screening Test to evaluate the effects of a chemical on male and female reproductive performance, including mating behavior, fertility, and early embryonic development.',
      baseDuration: 75,
      deviation: 5,
      price: 1350000,
      category: 'Pharmaceuticals'
    },
    'OECD 414': {
      title: 'OECD 414',
      description: 'Describes a prenatal developmental toxicity study in pregnant rodents or rabbits to assess the effects of chemical exposure on both maternal health and fetal development.',
      baseDuration: 110,
      deviation: 5,
      price: 725000,
      category: 'Pharmaceuticals'
    },
    'OECD 405': {
      title: 'OECD 405',
      description: 'Describes an in vivo test for assessing acute eye irritation or corrosion caused by chemicals, typically using albino rabbits with a single-dose application.',
      baseDuration: 30,
      deviation: 5,
      price: 50000,
      category: 'Pharmaceuticals'
    },
    'OECD 404': {
      title: 'OECD 404',
      description: 'Describes an in vivo test for assessing acute dermal irritation and corrosion by applying a single dose of a chemical to the shaved skin of rabbits.',
      baseDuration: 30,
      deviation: 5,
      price: 75000,
      category: 'Pharmaceuticals'
    },
    'OECD 406': {
      title: 'OECD 406',
      description: 'Describes in vivo methods—primarily the Guinea Pig Maximisation Test (GPMT) and the Buehler Test—for evaluating a substance\'s potential to cause skin sensitization, such as allergic contact dermatitis.',
      baseDuration: 110,
      deviation: 5,
      price: 95000,
      category: 'Pharmaceuticals'
    },
    'OECD 410': {
      title: 'OECD 410',
      description: 'Describes a 21/28-day repeated dose dermal toxicity study in rodents or rabbits to evaluate health hazards from daily skin exposure to a chemical. It assesses systemic toxicity through clinical observations, hematology, biochemistry, and histopathology, helping determine dose-response relationships and inform risk.',
      baseDuration: 110,
      deviation: 5,
      price: 850000,
      category: 'Pharmaceuticals'
    },
    'OECD 471': {
      title: 'OECD 471',
      description: 'Describes the Bacterial Reverse Mutation Test (Ames test), which detects point mutations in Salmonella typhimurium and Escherichia coli strains caused by chemical substances. It is a widely used in vitro assay for identifying mutagenic potential, both with and without metabolic activation systems.',
      baseDuration: 65,
      deviation: 5,
      price: 90000,
      category: 'Pharmaceuticals'
    },
    'OECD 474': {
      title: 'OECD 474',
      description: 'Describes the Mammalian Erythrocyte Micronucleus Test, an in vivo assay used to detect chromosomal damage caused by chemicals through the formation of micronuclei in bone marrow or peripheral blood erythrocytes.',
      baseDuration: 65,
      deviation: 5,
      price: 400000,
      category: 'Pharmaceuticals'
    },
    'OECD 490': {
      title: 'OECD 490',
      description: 'Describes in vitro mammalian cell gene mutation tests using the thymidine kinase (TK) gene to detect forward mutations induced by chemical substances.',
      baseDuration: 65,
      deviation: 5,
      price: 650000,
      category: 'Pharmaceuticals'
    },
    'OECD 473': {
      title: 'OECD 473',
      description: 'Describes the In Vitro Mammalian Chromosomal Aberration Test, which detects structural chromosomal damage—such as breaks and exchanges—in cultured cells.',
      baseDuration: 65,
      deviation: 5,
      price: 275000,
      category: 'Pharmaceuticals'
    },
    'OECD 425': {
      title: 'OECD 425',
      description: 'Describes the Acute Oral Toxicity - Up-and-Down Procedure, a method for estimating the LD50 of a substance using sequential dosing in individual animals, typically rats',
      baseDuration: 30,
      deviation: 5,
      price: 70000,
      category: 'Pharmaceuticals'
    }
  },

  'Nutraceuticals': {
    'OECD 423': {
      title: 'OECD 423',
      description: 'Guideline 423 describes the Acute Toxic Class Method for assessing oral toxicity using a stepwise approach with minimal animal use, focusing on mortality to determine toxicity classification. It provides a range-based estimate rather than a precise LD50, aligning with ethical standards and GHS classification.',
      baseDuration: 30,
      deviation: 5,
      price: 60000,
      category: 'Nutraceuticals'
    },
    'OECD 407': {
      title: 'OECD 407',
      description: 'Guideline 407 describes a 28-day repeated dose oral toxicity study in rodents to evaluate potential health hazards from subacute exposure, including effects on the nervous, immune, and endocrine systems. It supports hazard identification and risk assessment, especially for chemicals not requiring longer-term studies.',
      baseDuration: 60,
      deviation: 5,
      price: 800000,
      category: 'Nutraceuticals'
    },
    'OECD 408': {
      title: 'OECD 408',
      description: 'Guideline 408 describes a 90-day repeated dose oral toxicity study in rodents to evaluate sub-chronic effects of chemicals, including potential impacts on major organs and endocrine function. It helps identify a no-observed-adverse-effect level (NOAEL) and informs risk assessment for prolonged human exposure.',
      baseDuration: 175,
      deviation: 5,
      price: 900000,
      category: 'Nutraceuticals'
    },
    'OECD 452': {
      title: 'OECD 452',
      description: 'Guideline 452 describes chronic toxicity studies involving daily administration of a test substance to rodents over a 12-month period to evaluate long-term health effects. It helps identify target organs, dose-response relationships, and supports risk assessment for prolonged chemical exposure.',
      baseDuration: 540,
      deviation: 5,
      price: 3200000,
      category: 'Nutraceuticals'
    },
    'OECD 421': {
      title: 'OECD 421',
      description: 'Guideline 421 outlines a Reproduction/Developmental Toxicity Screening Test to evaluate the effects of a chemical on male and female reproductive performance, including mating behavior, fertility, and early embryonic development.',
      baseDuration: 75,
      deviation: 5,
      price: 1350000,
      category: 'Nutraceuticals'
    },
    'OECD 414': {
      title: 'OECD 414',
      description: 'Guideline 414 describes a prenatal developmental toxicity study in pregnant rodents or rabbits to assess the effects of chemical exposure on both maternal health and fetal development.',
      baseDuration: 110,
      deviation: 5,
      price: 725000,
      category: 'Nutraceuticals'
    },
    'OECD 405': {
      title: 'OECD 405',
      description: 'Guideline 405 describes an in vivo test for assessing acute eye irritation or corrosion caused by chemicals, typically using albino rabbits with a single-dose application to the conjunctival sac.',
      baseDuration: 30,
      deviation: 5,
      price: 50000,
      category: 'Nutraceuticals'
    },
    'OECD 404': {
      title: 'OECD 404',
      description: 'Guideline 404 describes an in vivo test for assessing acute dermal irritation and corrosion by applying a single dose of a chemical to the shaved skin of rabbits.',
      baseDuration: 30,
      deviation: 5,
      price: 75000,
      category: 'Nutraceuticals'
    },
    'OECD 406': {
      title: 'OECD 406',
      description: 'Guideline 406 describes in vivo methods—primarily the Guinea Pig Maximisation Test (GPMT) and the Buehler Test—for evaluating a substance\'s potential to cause skin sensitization, such as allergic contact dermatitis.',
      baseDuration: 110,
      deviation: 5,
      price: 95000,
      category: 'Nutraceuticals'
    },
    'OECD 410': {
      title: 'OECD 410',
      description: 'Guideline 410 describes a 21/28-day repeated dose dermal toxicity study in rodents or rabbits to evaluate health hazards from daily skin exposure to a chemical. It assesses systemic toxicity through clinical observations, hematology, biochemistry, and histopathology, helping determine dose-response relationships and inform risk assessment.',
      baseDuration: 110,
      deviation: 5,
      price: 850000,
      category: 'Nutraceuticals'
    },
    'OECD 471': {
      title: 'OECD 471',
      description: 'Guideline 471 describes the Bacterial Reverse Mutation Test (Ames test), which detects point mutations in Salmonella typhimurium and Escherichia coli strains caused by chemical substances. It is a widely used in vitro assay for identifying mutagenic potential, both with and without metabolic activation systems.',
      baseDuration: 65,
      deviation: 5,
      price: 90000,
      category: 'Nutraceuticals'
    },
    'OECD 474': {
      title: 'OECD 474',
      description: 'Guideline 474 describes the Mammalian Erythrocyte Micronucleus Test, an in vivo assay used to detect chromosomal damage caused by chemicals through the formation of micronuclei in bone marrow or peripheral blood erythrocytes.',
      baseDuration: 65,
      deviation: 5,
      price: 400000,
      category: 'Nutraceuticals'
    },
    'OECD 490': {
      title: 'OECD 490',
      description: 'Guideline 490 describes in vitro mammalian cell gene mutation tests using the thymidine kinase (TK) gene to detect forward mutations induced by chemical substances.',
      baseDuration: 65,
      deviation: 5,
      price: 650000,
      category: 'Nutraceuticals'
    },
    'OECD 473': {
      title: 'OECD 473',
      description: 'Guideline 473 describes the In Vitro Mammalian Chromosomal Aberration Test, which detects structural chromosomal damage such as breaks and exchanges in cultured mammalian cells.',
      baseDuration: 65,
      deviation: 5,
      price: 275000,
      category: 'Nutraceuticals'
    },
    'OECD 425': {
      title: 'OECD 425',
      description: 'Guideline 425 describes the Acute Oral Toxicity—Up-and-Down Procedure, a method for estimating the LD50 of a substance using sequential dosing in individual animals, typically rats.',
      baseDuration: 30,
      deviation: 5,
      price: 70000,
      category: 'Nutraceuticals'
    }
  },
  'Cosmeceuticals': {
    'OECD 423': {
      title: 'OECD 423',
      description: 'Guideline 423 describes the Acute Toxic Class Method for assessing oral toxicity using a stepwise approach with minimal animal use, focusing on mortality to determine toxicity classification. It provides a range-based estimate rather than a precise LD50, aligning with ethical standards and GHS classification.',
      baseDuration: 30,
      deviation: 5,
      price: 60000,
      category: 'Cosmeceuticals'
    },
    'OECD 407': {
      title: 'OECD 407',
      description: 'Guideline 407 describes a 28-day repeated dose oral toxicity study in rodents to evaluate potential health hazards from subacute exposure, including effects on the nervous, immune, and endocrine systems. It supports hazard identification and risk assessment, especially for chemicals not requiring longer-term studies.',
      baseDuration: 60,
      deviation: 5,
      price: 800000,
      category: 'Cosmeceuticals'
    },
    'OECD 408': {
      title: 'OECD 408',
      description: 'Guideline 408 describes a 90-day repeated dose oral toxicity study in rodents to evaluate sub-chronic effects of chemicals, including potential impacts on major organs and endocrine function. It helps identify a no-observed-adverse-effect level (NOAEL) and informs risk assessment for prolonged human exposure.',
      baseDuration: 175,
      deviation: 5,
      price: 900000,
      category: 'Cosmeceuticals'
    },
    'OECD 452': {
      title: 'OECD 452',
      description: 'Guideline 452 describes chronic toxicity studies involving daily administration of a test substance to rodents over a 12-month period to evaluate long-term health effects. It helps identify target organs, dose-response relationships, and supports risk assessment for prolonged chemical exposure.',
      baseDuration: 540,
      deviation: 5,
      price: 3200000,
      category: 'Cosmeceuticals'
    },
    'OECD 421': {
      title: 'OECD 421',
      description: 'Guideline 421 outlines a Reproduction/Developmental Toxicity Screening Test to evaluate the effects of a chemical on male and female reproductive performance, including mating behavior, fertility, and early embryonic development.',
      baseDuration: 75,
      deviation: 5,
      price: 1350000,
      category: 'Cosmeceuticals'
    },
    'OECD 414': {
      title: 'OECD 414',
      description: 'Guideline 414 describes a prenatal developmental toxicity study in pregnant rodents or rabbits to assess the effects of chemical exposure on both maternal health and fetal development.',
      baseDuration: 110,
      deviation: 5,
      price: 725000,
      category: 'Cosmeceuticals'
    },
    'OECD 405': {
      title: 'OECD 405',
      description: 'Guideline 405 describes an in vivo test for assessing acute eye irritation or corrosion caused by chemicals, typically using albino rabbits with a single-dose application to the conjunctival sac.',
      baseDuration: 30,
      deviation: 5,
      price: 50000,
      category: 'Cosmeceuticals'
    },
    'OECD 404': {
      title: 'OECD 404',
      description: 'Guideline 404 describes an in vivo test for assessing acute dermal irritation and corrosion by applying a single dose of a chemical to the shaved skin of rabbits.',
      baseDuration: 30,
      deviation: 5,
      price: 75000,
      category: 'Cosmeceuticals'
    },
    'OECD 406': {
      title: 'OECD 406',
      description: 'Guideline 406 describes in vivo methods—primarily the Guinea Pig Maximisation Test (GPMT) and the Buehler Test—for evaluating a substance\'s potential to cause skin sensitization, such as allergic contact dermatitis.',
      baseDuration: 110,
      deviation: 5,
      price: 95000,
      category: 'Cosmeceuticals'
    },
    'OECD 410': {
      title: 'OECD 410',
      description: 'Guideline 410 describes a 21/28-day repeated dose dermal toxicity study in rodents or rabbits to evaluate health hazards from daily skin exposure to a chemical. It assesses systemic toxicity through clinical observations, hematology, biochemistry, and histopathology, helping determine dose-response relationships and inform risk assessment.',
      baseDuration: 110,
      deviation: 5,
      price: 850000,
      category: 'Cosmeceuticals'
    },
    'OECD 471': {
      title: 'OECD 471',
      description: 'Guideline 471 describes the Bacterial Reverse Mutation Test (Ames test), which detects point mutations in Salmonella typhimurium and Escherichia coli strains caused by chemical substances. It is a widely used in vitro assay for identifying mutagenic potential, both with and without metabolic activation systems.',
      baseDuration: 65,
      deviation: 5,
      price: 90000,
      category: 'Cosmeceuticals'
    },
    'OECD 474': {
      title: 'OECD 474',
      description: 'Guideline 474 describes the Mammalian Erythrocyte Micronucleus Test, an in vivo assay used to detect chromosomal damage caused by chemicals through the formation of micronuclei in bone marrow or peripheral blood erythrocytes.',
      baseDuration: 65,
      deviation: 5,
      price: 400000,
      category: 'Cosmeceuticals'
    },
    'OECD 490': {
      title: 'OECD 490',
      description: 'Guideline 490 describes in vitro mammalian cell gene mutation tests using the thymidine kinase (TK) gene to detect forward mutations induced by chemical substances.',
      baseDuration: 65,
      deviation: 5,
      price: 650000,
      category: 'Cosmeceuticals'
    },
    'OECD 473': {
      title: 'OECD 473',
      description: 'Guideline 473 describes the In Vitro Mammalian Chromosomal Aberration Test, which detects structural chromosomal damage—such as breaks and exchanges—in cultured mammalian cells.',
      baseDuration: 65,
      deviation: 5,
      price: 275000,
      category: 'Cosmeceuticals'
    },
    'OECD 425': {
      title: 'OECD 425',
      description: 'Guideline 425 describes the Acute Oral Toxicity - Up-and-Down Procedure, a method for estimating the LD50 of a substance using sequential dosing in individual animals, typically rats.',
      baseDuration: 30,
      deviation: 5,
      price: 70000,
      category: 'Cosmeceuticals'
    }
  },
  'Herbal/Ayush': {
    'OECD 423': {
      title: 'OECD 423',
      description: 'Acute Toxic Class Method for assessing oral toxicity, minimal animal use, focuses on mortality for toxicity classification, provides range-based estimate rather than precise LD50, aligns with ethical standards and GHS classification.',
      baseDuration: 30,
      deviation: 5,
      price: 60000,
      category: 'Herbal/Ayush'
    },
    'OECD 407': {
      title: 'OECD 407',
      description: '28-day repeated dose oral toxicity study in rodents to evaluate potential health hazards from subacute exposure (nervous, immune, endocrine systems), supports hazard identification and risk assessment, especially for chemicals not requiring longer-term studies.',
      baseDuration: 60,
      deviation: 5,
      price: 800000,
      category: 'Herbal/Ayush'
    },
    'OECD 408': {
      title: 'OECD 408',
      description: '90-day repeated dose oral toxicity study in rodents to evaluate sub-chronic effects of chemicals (major organs, endocrine function), helps identify NOAEL, informs risk assessment for prolonged human exposure.',
      baseDuration: 175,
      deviation: 5,
      price: 900000,
      category: 'Herbal/Ayush'
    },
    'OECD 452': {
      title: 'OECD 452',
      description: 'Chronic toxicity studies involving daily administration of a test substance to rodents over a 12-month period to evaluate long-term health effects, helps identify target organs, dose-response relationships, and supports risk assessment for prolonged chemical exposure.',
      baseDuration: 540,
      deviation: 5,
      price: 3200000,
      category: 'Herbal/Ayush'
    },
    'OECD 421': {
      title: 'OECD 421',
      description: 'Reproduction/Developmental Toxicity Screening Test to evaluate effects of a chemical on male and female reproductive performance (mating behavior, fertility, early embryonic development).',
      baseDuration: 75,
      deviation: 5,
      price: 1350000,
      category: 'Herbal/Ayush'
    },
    'OECD 414': {
      title: 'OECD 414',
      description: 'Prenatal developmental toxicity study in pregnant rodents or rabbits to assess effects of chemical exposure on maternal health and fetal development.',
      baseDuration: 110,
      deviation: 5,
      price: 725000,
      category: 'Herbal/Ayush'
    },
    'OECD 405': {
      title: 'OECD 405',
      description: 'In vivo test for assessing acute eye irritation or corrosion caused by chemicals, typically using albino rabbits with a single-dose application to the conjunctival sac.',
      baseDuration: 30,
      deviation: 5,
      price: 50000,
      category: 'Herbal/Ayush'
    },
    'OECD 404': {
      title: 'OECD 404',
      description: 'In vivo test for assessing acute dermal irritation and corrosion by applying a single dose of a chemical to the shaved skin of rabbits.',
      baseDuration: 30,
      deviation: 5,
      price: 75000,
      category: 'Herbal/Ayush'
    },
    'OECD 406': {
      title: 'OECD 406',
      description: 'In vivo methods (Guinea Pig Maximisation Test (GPMT) and Buehler Test) for evaluating a substance\'s potential to cause skin sensitization (allergic contact dermatitis).',
      baseDuration: 110,
      deviation: 5,
      price: 95000,
      category: 'Herbal/Ayush'
    },
    'OECD 410': {
      title: 'OECD 410',
      description: '21/28-day repeated dose dermal toxicity study in rodents or rabbits to evaluate health hazards from daily skin exposure to a chemical, assesses systemic toxicity through clinical observations, hematology, biochemistry, histopathology, helps determine dose-response relationships and informs risk assessment.',
      baseDuration: 110,
      deviation: 5,
      price: 850000,
      category: 'Herbal/Ayush'
    },
    'OECD 471': {
      title: 'OECD 471',
      description: 'Bacterial Reverse Mutation Test (Ames test) detects point mutations in Salmonella typhimurium and Escherichia coli strains caused by chemical substances, widely used in vitro assay for identifying mutagenic potential (with and without metabolic activation systems).',
      baseDuration: 65,
      deviation: 5,
      price: 90000,
      category: 'Herbal/Ayush'
    },
    'OECD 474': {
      title: 'OECD 474',
      description: 'Mammalian Erythrocyte Micronucleus Test, an in vivo assay to detect chromosomal damage caused by chemicals through formation of micronuclei in bone marrow or peripheral blood erythrocytes.',
      baseDuration: 65,
      deviation: 5,
      price: 400000,
      category: 'Herbal/Ayush'
    },
    'OECD 490': {
      title: 'OECD 490',
      description: 'In vitro mammalian cell gene mutation tests using the thymidine kinase (TK) gene to detect forward mutations induced by chemical substances.',
      baseDuration: 65,
      deviation: 5,
      price: 650000,
      category: 'Herbal/Ayush'
    },
    'OECD 473': {
      title: 'OECD 473',
      description: 'In Vitro Mammalian Chromosomal Aberration Test, detects structural chromosomal damage (breaks and exchanges) in cultured mammalian cells.',
      baseDuration: 65,
      deviation: 5,
      price: 275000,
      category: 'Herbal/Ayush'
    },
    'OECD 425': {
      title: 'OECD 425',
      description: 'Acute Oral Toxicity - Up-and-Down Procedure, a method for estimating the LD50 of a substance using sequential dosing in individual animals (typically rats).',
      baseDuration: 30,
      deviation: 5,
      price: 70000,
      category: 'Herbal/Ayush'
    }
  },

  'Medical Devices': {
    'ISO 10993-5': {
      title: 'ISO 10993-5',
      description: 'Biological evaluation of medical devices - Tests for in vitro cytotoxicity.',
      baseDuration: 30,
      deviation: 5,
      price: 50000,
      category: 'Medical Devices'
    },
    'ISO 10993-10': {
      title: 'ISO 10993-10',
      description: 'Biological evaluation of medical devices - Tests for irritation and skin sensitization.',
      baseDuration: 45,
      deviation: 5,
      price: 75000,
      category: 'Medical Devices'
    },
    'ISO 10993-11 Acute': {
      title: 'ISO 10993-11',
      description: 'Acute systemic toxicity evaluation for medical devices.',
      baseDuration: 60,
      deviation: 5,
      price: 250000,
      category: 'Medical Devices'
    },
    'ISO 10993-11 Sub-acute 14d': {
      title: 'ISO 10993-11',
      description: 'Sub-acute systemic toxicity evaluation for medical devices - 14 days study.',
      baseDuration: 80,
      deviation: 5,
      price: 550000,
      category: 'Medical Devices'
    },
    'ISO 10993-11 Sub-acute 28d': {
      title: 'ISO 10993-11',
      description: 'Sub-acute systemic toxicity evaluation for medical devices - 28 days study.',
      baseDuration: 90,
      deviation: 5,
      price: 870000,
      category: 'Medical Devices'
    },
    'ISO 10993-11 Pyrogenicity': {
      title: 'ISO 10993-11',
      description: 'Material-mediated pyrogenicity test for medical devices.',
      baseDuration: 50,
      deviation: 5,
      price: 75000,
      category: 'Medical Devices'
    }
  }
};

// Get guidelines for a specific category
export const getGuidelinesForCategory = (category: string): string[] => {
  return Object.keys(guidelineData[category] || {});
};

// Get guideline data for a specific guideline and category
export const getGuidelineData = (category: string, guideline: string): GuidelineData | null => {
  return guidelineData[category]?.[guideline] || null;
};

// Get all available categories
export const getAvailableCategories = (): string[] => {
  return Object.keys(guidelineData);
};
