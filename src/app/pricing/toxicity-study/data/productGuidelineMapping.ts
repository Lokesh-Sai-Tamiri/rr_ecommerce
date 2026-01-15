// Product Detail to Guideline Mapping
// This file maps specific product details to applicable guidelines

export interface ProductGuidelineMapping {
  sampleForm: {
    [form: string]: string[];
  };
  sampleSolvent: {
    [solvent: string]: string[];
  };
  application: {
    [app: string]: string[];
  };
}

// Mapping for Pharmaceuticals category
export const pharmaceuticalsMapping: ProductGuidelineMapping = {
  sampleForm: {
    'Tablets': ['OECD 423', 'OECD 407', 'OECD 408', 'OECD 405', 'OECD 414'],
    'Capsules': ['OECD 423', 'OECD 407', 'OECD 408', 'OECD 405', 'OECD 414'],
    'Syrup': ['OECD 423', 'OECD 407', 'OECD 408', 'OECD 405', 'OECD 414'],
    'Suspensions': ['OECD 423', 'OECD 407', 'OECD 408', 'OECD 405', 'OECD 414'],
    'Powders': ['OECD 423', 'OECD 407', 'OECD 408', 'OECD 405', 'OECD 414'],
    'Granules': ['OECD 423', 'OECD 407', 'OECD 408', 'OECD 405', 'OECD 414'],
    'Oral Strips': ['OECD 423', 'OECD 407', 'OECD 408', 'OECD 405', 'OECD 414'],
    'Drops': ['OECD 423', 'OECD 407', 'OECD 408', 'OECD 405', 'OECD 414'],
    'Cream': ['OECD 405', 'OECD 404', 'OECD 406'],
    'gel': ['OECD 405', 'OECD 404', 'OECD 406'],
    'Others': ['OECD 423', 'OECD 407', 'OECD 408', 'OECD 405', 'OECD 414']
  },
  sampleSolvent: {
    'Distilled Water': ['OECD 452', 'OECD 421', 'OECD 405', 'OECD 414'],
    'Buffered Aqueous Solution': ['OECD 452', 'OECD 421', 'OECD 405', 'OECD 414'],
    'Ethanol': ['OECD 407', 'OECD 405', 'OECD 414'],
    'Methanol': ['OECD 407', 'OECD 405', 'OECD 414'],
    'Acetone': ['OECD 407', 'OECD 405', 'OECD 414'],
    'Chloroform': ['OECD 407', 'OECD 405', 'OECD 414'],
    'Dimethyl Sulfoxide': ['OECD 407', 'OECD 405', 'OECD 414'],
    'Others': ['OECD 452', 'OECD 421', 'OECD 405', 'OECD 414']
  },
  application: {
    'Topical': ['OECD 423', 'OECD 452'],
    'Oral': ['OECD 423', 'OECD 407', 'OECD 408'],
    'Injectable': ['OECD 423', 'OECD 407'],
    'Ophthalmic': ['OECD 423', 'OECD 452'],
    'Nasal': ['OECD 423', 'OECD 407'],
    'Rectal/Vaginal': ['OECD 423', 'OECD 452'],
    'Any other': ['OECD 423', 'OECD 407', 'OECD 408', 'OECD 452', 'OECD 421']
  }
};

// Mapping for other categories (can be expanded)
export const nutraceuticalsMapping: ProductGuidelineMapping = {
  sampleForm: {
    'Tablets': ['OECD 423', 'OECD 407', 'OECD 408'],
    'Capsules': ['OECD 423', 'OECD 407', 'OECD 408'],
    'Syrup': ['OECD 423', 'OECD 407', 'OECD 408'],
    'Suspensions': ['OECD 423', 'OECD 407', 'OECD 408'],
    'Powders': ['OECD 423', 'OECD 407', 'OECD 408'],
    'Granules': ['OECD 423', 'OECD 407', 'OECD 408'],
    'Oral Strips': ['OECD 423', 'OECD 407', 'OECD 408'],
    'Drops': ['OECD 423', 'OECD 407', 'OECD 408'],
    'Cream': ['OECD 405', 'OECD 404', 'OECD 406'],
    'gel': ['OECD 405', 'OECD 404', 'OECD 406'],
    'Others': ['OECD 423', 'OECD 407', 'OECD 408']
  },
  sampleSolvent: {
    'Distilled Water': ['OECD 452', 'OECD 421'],
    'Buffered Aqueous Solution': ['OECD 452', 'OECD 421'],
    'Ethanol': ['OECD 407', 'OECD 405'],
    'Methanol': ['OECD 407'],
    'Acetone': ['OECD 407', 'OECD 405', 'OECD 406'],
    'Chloroform': ['OECD 407'],
    'Dimethyl Sulfoxide': ['OECD 407'],
    'Others': ['OECD 452', 'OECD 421']
  },
  application: {
    'Topical': ['OECD 423', 'OECD 452'],
    'Oral': ['OECD 423', 'OECD 407', 'OECD 408'],
    'Injectable': ['OECD 423', 'OECD 407'],
    'Ophthalmic': ['OECD 423', 'OECD 452'],
    'Nasal': ['OECD 423', 'OECD 407'],
    'Rectal/Vaginal': ['OECD 423', 'OECD 452'],
    'Any other': ['OECD 423', 'OECD 407', 'OECD 408', 'OECD 452', 'OECD 421']
  }
};

// Mapping for Medical Devices category
export const medicalDevicesMapping: ProductGuidelineMapping = {
  sampleForm: {
    'Vascular Access & Infusion Devices': ['ISO 10993-5', 'ISO 10993-10', 'ISO 10993-11 Acute'],
    'Wound Care & Closure Products': ['ISO 10993-5', 'ISO 10993-10', 'ISO 10993-11 Acute'],
    'Dialysis & Fluid Exchange Systems': ['ISO 10993-5', 'ISO 10993-10', 'ISO 10993-11 Sub-acute 14d'],
    'Ophthalmic Devices': ['ISO 10993-5', 'ISO 10993-10', 'ISO 10993-11 Acute'],
    'Intraocular Lenses': ['ISO 10993-5', 'ISO 10993-10', 'ISO 10993-11 Acute'],
    'Barrier & Protective Devices': ['ISO 10993-5', 'ISO 10993-10'],
    'Gloves': ['ISO 10993-5', 'ISO 10993-10'],
    'Gynecological & Gastrointestinal Devices': ['ISO 10993-5', 'ISO 10993-10', 'ISO 10993-11 Sub-acute 28d'],
    'Dental & Orthodontic Devices': ['ISO 10993-5', 'ISO 10993-10', 'ISO 10993-11 Acute'],
    'Others': ['ISO 10993-5', 'ISO 10993-10', 'ISO 10993-11 Acute']
  },
  sampleSolvent: {
    'Distilled Water': ['ISO 10993-5', 'ISO 10993-10'],
    'Buffered Aqueous Solution': ['ISO 10993-5', 'ISO 10993-10'],
    'Ethanol': ['ISO 10993-5', 'ISO 10993-10'],
    'Methanol': ['ISO 10993-5'],
    'Acetone': ['ISO 10993-5'],
    'Chloroform': ['ISO 10993-5'],
    'Dimethyl Sulfoxide': ['ISO 10993-5'],
    'Others': ['ISO 10993-5', 'ISO 10993-10']
  },
  application: {
    'Topical': ['ISO 10993-5', 'ISO 10993-10', 'ISO 10993-11 Pyrogenicity'],
    'Oral': ['ISO 10993-5', 'ISO 10993-11 Acute'],
    'Injectable': ['ISO 10993-5', 'ISO 10993-10', 'ISO 10993-11 Sub-acute 14d', 'ISO 10993-11 Pyrogenicity'],
    'Ophthalmic': ['ISO 10993-5', 'ISO 10993-10', 'ISO 10993-11 Acute'],
    'Nasal': ['ISO 10993-5', 'ISO 10993-11 Acute'],
    'Rectal/Vaginal': ['ISO 10993-5', 'ISO 10993-10', 'ISO 10993-11 Sub-acute 28d'],
    'Any other': ['ISO 10993-5', 'ISO 10993-10', 'ISO 10993-11 Acute', 'ISO 10993-11 Sub-acute 14d', 'ISO 10993-11 Sub-acute 28d', 'ISO 10993-11 Pyrogenicity']
  }
};

// Specific combination mappings based on OECD table from the image
export const getCombinedApplicableGuidelines = (
  category: string,
  sampleForm?: string,
  sampleSolvent?: string,
  application?: string
): string[] => {
  let guidelines: string[] = [];

  console.log('🔍 getCombinedApplicableGuidelines called with:', {
    category,
    sampleForm,
    sampleSolvent,
    application
  });

  // Medical Devices category
  if (category === 'Medical Devices') {
    // Show all ISO guidelines for medical devices
    guidelines = ['ISO 10993-5', 'ISO 10993-10', 'ISO 10993-11 Acute', 'ISO 10993-11 Sub-acute 14d', 'ISO 10993-11 Sub-acute 28d', 'ISO 10993-11 Pyrogenicity'];
    console.log('🔍 Medical Devices guidelines:', guidelines);
  }
  // Pharmaceuticals and other categories (OECD guidelines)
  else {
    // Require ALL THREE fields: Sample Form + Sample Solvent + Application
    if (!sampleForm || !sampleSolvent || !application) {
      console.log('🔍 Missing required fields, returning empty array');
      return [];
    }

    // Row 1: Cream, gel + Topical → OECD 405, 404, 406, 410
    if ((sampleForm === 'Cream' || sampleForm === 'gel') && application === 'Topical') {
      guidelines = ['OECD 405', 'OECD 404', 'OECD 406', 'OECD 410'];
      console.log('🔍 Cream/Gel + Topical guidelines:', guidelines);
    }
    
    // Row 1.1: Others + Topical → Same topical guidelines as Cream/gel
    else if (sampleForm === 'Others' && application === 'Topical') {
      guidelines = ['OECD 405', 'OECD 404', 'OECD 406', 'OECD 410'];
      console.log('🔍 Others + Topical guidelines:', guidelines);
    }
    
    // Row 2: Tablets, Capsules, Syrup, Suspensions, Powders, Granules, Oral Strips, Drops, Others 
    // + Oral, Injectable, Ophthalmic, Nasal, Rectal/Vaginal, Any other
    // → OECD 423, 407, 408, 452, 421, 414, 471, 474, 490, 473, 425
    else if (sampleForm && ['Tablets', 'Capsules', 'Syrup', 'Suspensions', 'Powders', 'Granules', 'Oral Strips', 'Drops', 'Others'].includes(sampleForm)) {
      if (['Oral', 'Injectable', 'Ophthalmic', 'Nasal', 'Rectal/Vaginal', 'Any other'].includes(application)) {
        guidelines = ['OECD 423', 'OECD 407', 'OECD 408', 'OECD 452', 'OECD 421', 'OECD 414', 'OECD 471', 'OECD 474', 'OECD 490', 'OECD 473', 'OECD 425'];
        console.log('🔍 Others + Non-topical guidelines:', guidelines);
      } else {
        console.log('🔍 Sample form matches but application does not match non-topical list');
      }
    } else {
      console.log('🔍 No matching combination found');
    }
  }
  
  console.log('🔍 Final guidelines returned:', guidelines);
  return guidelines;
};

// Helper function to get all guidelines for a category
const getAllGuidelinesForCategory = (category: string): string[] => {
  const mapping = category === 'Pharmaceuticals' ? pharmaceuticalsMapping : nutraceuticalsMapping;
  const allGuidelines = new Set<string>();
  
  Object.values(mapping.sampleForm).flat().forEach(guideline => allGuidelines.add(guideline));
  Object.values(mapping.sampleSolvent).flat().forEach(guideline => allGuidelines.add(guideline));
  Object.values(mapping.application).flat().forEach(guideline => allGuidelines.add(guideline));

  return Array.from(allGuidelines).sort();
};

// Legacy function for backward compatibility - now uses the new combination logic
export const getApplicableGuidelines = (
  category: string,
  sampleForm?: string,
  sampleSolvent?: string,
  application?: string
): string[] => {
  return getCombinedApplicableGuidelines(category, sampleForm, sampleSolvent, application);
};

// Function to get guidelines for a specific product detail type
export const getGuidelinesForProductDetail = (
  category: string,
  detailType: 'sampleForm' | 'sampleSolvent' | 'application',
  detailValue: string
): string[] => {
  let mapping: ProductGuidelineMapping;
  
  switch (category) {
    case 'Pharmaceuticals':
      mapping = pharmaceuticalsMapping;
      break;
    case 'Nutraceuticals':
      mapping = nutraceuticalsMapping;
      break;
    default:
      mapping = pharmaceuticalsMapping;
  }

  // Return the same guidelines for all sections - combine all possible guidelines
  const allGuidelines = new Set<string>();
  
  // Add guidelines from all sections
  Object.values(mapping.sampleForm).flat().forEach(guideline => allGuidelines.add(guideline));
  Object.values(mapping.sampleSolvent).flat().forEach(guideline => allGuidelines.add(guideline));
  Object.values(mapping.application).flat().forEach(guideline => allGuidelines.add(guideline));

  return Array.from(allGuidelines);
};
