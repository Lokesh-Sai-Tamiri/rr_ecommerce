/**
 * @fileoverview Microbiology & Virology Study Data
 */

export interface MicrobiologyStudyData {
  studyName: string;
  category: string;
  microorganismType: 'Bacteria' | 'Fungi' | 'Virus';
  microorganism: string;
  guideline: string;
  price: number;
  duration: number;
  deviation: number;
  sampleForm?: string; // For disinfectants - optional for backward compatibility
}

// Pharmaceuticals Data
export const pharmaceuticalsData: MicrobiologyStudyData[] = [
  // Bacteria - MIC, MBC, ZOI & TKA studies
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Staphylococcus aureus', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Staphylococcus aureus', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Staphylococcus aureus', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Staphylococcus aureus', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Escherichia coli', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Escherichia coli', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Escherichia coli', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Escherichia coli', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Pseudomonas aeruginosa', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Pseudomonas aeruginosa', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Pseudomonas aeruginosa', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Pseudomonas aeruginosa', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Cutibacterium acnes', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Cutibacterium acnes', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Cutibacterium acnes', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Cutibacterium acnes', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'E.faecalis', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'E.faecalis', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'E.faecalis', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'E.faecalis', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Klebsilla pneumonia', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Klebsilla pneumonia', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Klebsilla pneumonia', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Klebsilla pneumonia', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'E.faecium', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'E.faecium', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'E.faecium', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'E.faecium', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Lactobacillus acidophilus', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Lactobacillus acidophilus', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Lactobacillus acidophilus', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Lactobacillus acidophilus', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Bacillus subtilis', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Bacillus subtilis', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Bacillus subtilis', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Bacillus subtilis', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Streptococcus pyogenes', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Streptococcus pyogenes', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Streptococcus pyogenes', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Streptococcus pyogenes', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Streptococcus mutans', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Streptococcus mutans', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Streptococcus mutans', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Streptococcus mutans', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Ruminococcus torques', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Ruminococcus torques', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Ruminococcus torques', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Ruminococcus torques', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Dorea formicigenerans', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Dorea formicigenerans', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Dorea formicigenerans', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Dorea formicigenerans', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Streptococcus gordonii', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Streptococcus gordonii', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Streptococcus gordonii', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Streptococcus gordonii', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Lactobacillus murinus', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Lactobacillus murinus', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Lactobacillus murinus', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Lactobacillus murinus', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Streptococcus salivarius', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Streptococcus salivarius', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Streptococcus salivarius', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Streptococcus salivarius', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Porphyromonas gingivalis', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Porphyromonas gingivalis', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Porphyromonas gingivalis', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Porphyromonas gingivalis', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Any other', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Any other', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Any other', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Pharmaceuticals', microorganismType: 'Bacteria', microorganism: 'Any other', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },

  // Fungi - MIC, ZOI & TKA studies
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Pharmaceuticals', microorganismType: 'Fungi', microorganism: 'Aspergillus brasiliensis', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Pharmaceuticals', microorganismType: 'Fungi', microorganism: 'Aspergillus brasiliensis', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Pharmaceuticals', microorganismType: 'Fungi', microorganism: 'Aspergillus brasiliensis', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Pharmaceuticals', microorganismType: 'Fungi', microorganism: 'Candida albicans', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Pharmaceuticals', microorganismType: 'Fungi', microorganism: 'Candida albicans', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Pharmaceuticals', microorganismType: 'Fungi', microorganism: 'Candida albicans', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Pharmaceuticals', microorganismType: 'Fungi', microorganism: 'Trichyophyton rubrum', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Pharmaceuticals', microorganismType: 'Fungi', microorganism: 'Trichyophyton rubrum', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Pharmaceuticals', microorganismType: 'Fungi', microorganism: 'Trichyophyton rubrum', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Pharmaceuticals', microorganismType: 'Fungi', microorganism: 'Malassezia furfur', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Pharmaceuticals', microorganismType: 'Fungi', microorganism: 'Malassezia furfur', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Pharmaceuticals', microorganismType: 'Fungi', microorganism: 'Malassezia furfur', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Pharmaceuticals', microorganismType: 'Fungi', microorganism: 'Aspergillus flavus', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Pharmaceuticals', microorganismType: 'Fungi', microorganism: 'Aspergillus flavus', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Pharmaceuticals', microorganismType: 'Fungi', microorganism: 'Aspergillus flavus', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Pharmaceuticals', microorganismType: 'Fungi', microorganism: 'Any other', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Pharmaceuticals', microorganismType: 'Fungi', microorganism: 'Any other', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Pharmaceuticals', microorganismType: 'Fungi', microorganism: 'Any other', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },

  // Virus - Anti-viral study
  { studyName: 'Anti-viral study', category: 'Pharmaceuticals', microorganismType: 'Virus', microorganism: 'HSV 1', guideline: 'Anti-viral study', price: 45000, duration: 60, deviation: 5 },
  { studyName: 'Anti-viral study', category: 'Pharmaceuticals', microorganismType: 'Virus', microorganism: 'HSV 2', guideline: 'Anti-viral study', price: 45000, duration: 60, deviation: 5 },
  { studyName: 'Anti-viral study', category: 'Pharmaceuticals', microorganismType: 'Virus', microorganism: 'Adeno virus', guideline: 'Anti-viral study', price: 45000, duration: 60, deviation: 5 },
  { studyName: 'Anti-viral study', category: 'Pharmaceuticals', microorganismType: 'Virus', microorganism: 'MVA', guideline: 'Anti-viral study', price: 45000, duration: 60, deviation: 5 },
  { studyName: 'Anti-viral study', category: 'Pharmaceuticals', microorganismType: 'Virus', microorganism: 'Any other', guideline: 'Anti-viral study', price: 45000, duration: 60, deviation: 5 },
];

// Nutraceuticals Data
export const nutraceuticalsData: MicrobiologyStudyData[] = [
  // Bacteria - MIC, MBC, ZOI & TKA studies
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'Staphylococcus aureus', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'Staphylococcus aureus', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'Staphylococcus aureus', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'Staphylococcus aureus', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'Escherichia coli', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'Escherichia coli', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'Escherichia coli', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'Escherichia coli', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'Pseudomonas aeruginosa', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'Pseudomonas aeruginosa', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'Pseudomonas aeruginosa', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'Pseudomonas aeruginosa', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'Cutibacterium acnes', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'Cutibacterium acnes', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'Cutibacterium acnes', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'Cutibacterium acnes', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'E.faecalis', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'E.faecalis', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'E.faecalis', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'E.faecalis', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'Klebsilla pneumonia', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'Klebsilla pneumonia', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'Klebsilla pneumonia', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'Klebsilla pneumonia', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'E.faecium', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'E.faecium', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'E.faecium', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'E.faecium', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'Lactobacillus acidophilus', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'Lactobacillus acidophilus', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'Lactobacillus acidophilus', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'Lactobacillus acidophilus', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'Bacillus subtilis', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'Bacillus subtilis', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'Bacillus subtilis', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'Bacillus subtilis', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'Streptococcus pyogenes', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'Streptococcus pyogenes', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'Streptococcus pyogenes', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'Streptococcus pyogenes', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'Streptococcus mutans', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'Streptococcus mutans', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'Streptococcus mutans', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'Streptococcus mutans', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'Ruminococcus torques', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'Ruminococcus torques', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'Ruminococcus torques', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'Ruminococcus torques', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'Dorea formicigenerans', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'Dorea formicigenerans', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'Dorea formicigenerans', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'Dorea formicigenerans', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'Any other', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'Any other', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'Any other', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Nutraceuticals', microorganismType: 'Bacteria', microorganism: 'Any other', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
 
  // Fungi - MIC, ZOI & TKA studies
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Nutraceuticals', microorganismType: 'Fungi', microorganism: 'Aspergillus brasiliensis', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Nutraceuticals', microorganismType: 'Fungi', microorganism: 'Aspergillus brasiliensis', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Nutraceuticals', microorganismType: 'Fungi', microorganism: 'Aspergillus brasiliensis', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Nutraceuticals', microorganismType: 'Fungi', microorganism: 'Candida albicans', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Nutraceuticals', microorganismType: 'Fungi', microorganism: 'Candida albicans', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Nutraceuticals', microorganismType: 'Fungi', microorganism: 'Candida albicans', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Nutraceuticals', microorganismType: 'Fungi', microorganism: 'Trichyophyton rubrum', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Nutraceuticals', microorganismType: 'Fungi', microorganism: 'Trichyophyton rubrum', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Nutraceuticals', microorganismType: 'Fungi', microorganism: 'Trichyophyton rubrum', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Nutraceuticals', microorganismType: 'Fungi', microorganism: 'Malassezia furfur', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Nutraceuticals', microorganismType: 'Fungi', microorganism: 'Malassezia furfur', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Nutraceuticals', microorganismType: 'Fungi', microorganism: 'Malassezia furfur', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Nutraceuticals', microorganismType: 'Fungi', microorganism: 'Aspergillus flavus', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Nutraceuticals', microorganismType: 'Fungi', microorganism: 'Aspergillus flavus', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Nutraceuticals', microorganismType: 'Fungi', microorganism: 'Aspergillus flavus', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Nutraceuticals', microorganismType: 'Fungi', microorganism: 'Any other', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Nutraceuticals', microorganismType: 'Fungi', microorganism: 'Any other', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Nutraceuticals', microorganismType: 'Fungi', microorganism: 'Any other', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },

  // Virus - Anti-viral study
  { studyName: 'Anti-viral study', category: 'Nutraceuticals', microorganismType: 'Virus', microorganism: 'HSV 1', guideline: 'Anti-viral study', price: 45000, duration: 60, deviation: 5 },
  { studyName: 'Anti-viral study', category: 'Nutraceuticals', microorganismType: 'Virus', microorganism: 'HSV 2', guideline: 'Anti-viral study', price: 45000, duration: 60, deviation: 5 },
  { studyName: 'Anti-viral study', category: 'Nutraceuticals', microorganismType: 'Virus', microorganism: 'Adeno virus', guideline: 'Anti-viral study', price: 45000, duration: 60, deviation: 5 },
  { studyName: 'Anti-viral study', category: 'Nutraceuticals', microorganismType: 'Virus', microorganism: 'MVA', guideline: 'Anti-viral study', price: 45000, duration: 60, deviation: 5 },
  { studyName: 'Anti-viral study', category: 'Nutraceuticals', microorganismType: 'Virus', microorganism: 'Any other', guideline: 'Anti-viral study', price: 45000, duration: 60, deviation: 5 },
];

// Cosmeceuticals Data
export const cosmeceuticalsData: MicrobiologyStudyData[] = [
  // Bacteria - MIC, MBC, ZOI & TKA studies
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Staphylococcus aureus', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Staphylococcus aureus', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Staphylococcus aureus', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Staphylococcus aureus', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Escherichia coli', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Escherichia coli', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Escherichia coli', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Escherichia coli', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Pseudomonas aeruginosa', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Pseudomonas aeruginosa', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Pseudomonas aeruginosa', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Pseudomonas aeruginosa', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Cutibacterium acnes', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Cutibacterium acnes', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Cutibacterium acnes', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Cutibacterium acnes', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'E.faecalis', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'E.faecalis', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'E.faecalis', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'E.faecalis', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Klebsilla pneumonia', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Klebsilla pneumonia', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Klebsilla pneumonia', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Klebsilla pneumonia', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'E.faecium', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'E.faecium', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'E.faecium', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'E.faecium', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Lactobacillus acidophilus', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Lactobacillus acidophilus', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Lactobacillus acidophilus', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Lactobacillus acidophilus', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Bacillus subtilis', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Bacillus subtilis', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Bacillus subtilis', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Bacillus subtilis', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Streptococcus pyogenes', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Streptococcus pyogenes', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Streptococcus pyogenes', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Streptococcus pyogenes', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Streptococcus mutans', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Streptococcus mutans', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Streptococcus mutans', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Streptococcus mutans', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Ruminococcus torques', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Ruminococcus torques', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Ruminococcus torques', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Ruminococcus torques', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Dorea formicigenerans', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Dorea formicigenerans', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Dorea formicigenerans', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Dorea formicigenerans', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Streptococcus gordonii', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Streptococcus gordonii', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Streptococcus gordonii', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Streptococcus gordonii', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Lactobacillus murinus', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Lactobacillus murinus', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Lactobacillus murinus', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Lactobacillus murinus', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Streptococcus salivarius', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Streptococcus salivarius', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Streptococcus salivarius', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Streptococcus salivarius', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Porphyromonas gingivalis', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Porphyromonas gingivalis', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Porphyromonas gingivalis', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Porphyromonas gingivalis', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Any other', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Any other', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Any other', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Cosmeceuticals', microorganismType: 'Bacteria', microorganism: 'Any other', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },

  // Fungi - MIC, ZOI & TKA studies
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Cosmeceuticals', microorganismType: 'Fungi', microorganism: 'Aspergillus brasiliensis', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Cosmeceuticals', microorganismType: 'Fungi', microorganism: 'Aspergillus brasiliensis', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Cosmeceuticals', microorganismType: 'Fungi', microorganism: 'Aspergillus brasiliensis', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Cosmeceuticals', microorganismType: 'Fungi', microorganism: 'Candida albicans', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Cosmeceuticals', microorganismType: 'Fungi', microorganism: 'Candida albicans', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Cosmeceuticals', microorganismType: 'Fungi', microorganism: 'Candida albicans', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Cosmeceuticals', microorganismType: 'Fungi', microorganism: 'Trichyophyton rubrum', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Cosmeceuticals', microorganismType: 'Fungi', microorganism: 'Trichyophyton rubrum', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Cosmeceuticals', microorganismType: 'Fungi', microorganism: 'Trichyophyton rubrum', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Cosmeceuticals', microorganismType: 'Fungi', microorganism: 'Malassezia furfur', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Cosmeceuticals', microorganismType: 'Fungi', microorganism: 'Malassezia furfur', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Cosmeceuticals', microorganismType: 'Fungi', microorganism: 'Malassezia furfur', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Cosmeceuticals', microorganismType: 'Fungi', microorganism: 'Aspergillus flavus', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Cosmeceuticals', microorganismType: 'Fungi', microorganism: 'Aspergillus flavus', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Cosmeceuticals', microorganismType: 'Fungi', microorganism: 'Aspergillus flavus', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Cosmeceuticals', microorganismType: 'Fungi', microorganism: 'Any other', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Cosmeceuticals', microorganismType: 'Fungi', microorganism: 'Any other', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Cosmeceuticals', microorganismType: 'Fungi', microorganism: 'Any other', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },

  // Virus - Anti-viral study
  { studyName: 'Anti-viral study', category: 'Cosmeceuticals', microorganismType: 'Virus', microorganism: 'HSV 1', guideline: 'Anti-viral study', price: 45000, duration: 60, deviation: 5 },
  { studyName: 'Anti-viral study', category: 'Cosmeceuticals', microorganismType: 'Virus', microorganism: 'HSV 2', guideline: 'Anti-viral study', price: 45000, duration: 60, deviation: 5 },
  { studyName: 'Anti-viral study', category: 'Cosmeceuticals', microorganismType: 'Virus', microorganism: 'Adeno virus', guideline: 'Anti-viral study', price: 45000, duration: 60, deviation: 5 },
  { studyName: 'Anti-viral study', category: 'Cosmeceuticals', microorganismType: 'Virus', microorganism: 'MVA', guideline: 'Anti-viral study', price: 45000, duration: 60, deviation: 5 },
  { studyName: 'Anti-viral study', category: 'Cosmeceuticals', microorganismType: 'Virus', microorganism: 'Any other', guideline: 'Anti-viral study', price: 45000, duration: 60, deviation: 5 },
];

// Herbal/Ayush Data
export const herbalAyushData: MicrobiologyStudyData[] = [
  // Bacteria - MIC, MBC, ZOI & TKA studies
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Staphylococcus aureus', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Staphylococcus aureus', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Staphylococcus aureus', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Staphylococcus aureus', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Escherichia coli', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Escherichia coli', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Escherichia coli', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Escherichia coli', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Pseudomonas aeruginosa', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Pseudomonas aeruginosa', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Pseudomonas aeruginosa', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Pseudomonas aeruginosa', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Cutibacterium acnes', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Cutibacterium acnes', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Cutibacterium acnes', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Cutibacterium acnes', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'E.faecalis', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'E.faecalis', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'E.faecalis', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'E.faecalis', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Klebsilla pneumonia', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Klebsilla pneumonia', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Klebsilla pneumonia', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Klebsilla pneumonia', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'E.faecium', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'E.faecium', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'E.faecium', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'E.faecium', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Lactobacillus acidophilus', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Lactobacillus acidophilus', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Lactobacillus acidophilus', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Lactobacillus acidophilus', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Bacillus subtilis', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Bacillus subtilis', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Bacillus subtilis', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Bacillus subtilis', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Streptococcus pyogenes', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Streptococcus pyogenes', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Streptococcus pyogenes', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Streptococcus pyogenes', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Streptococcus mutans', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Streptococcus mutans', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Streptococcus mutans', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Streptococcus mutans', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Ruminococcus torques', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Ruminococcus torques', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Ruminococcus torques', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Ruminococcus torques', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Dorea formicigenerans', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Dorea formicigenerans', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Dorea formicigenerans', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Dorea formicigenerans', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Streptococcus gordonii', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Streptococcus gordonii', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Streptococcus gordonii', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Streptococcus gordonii', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Lactobacillus murinus', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Lactobacillus murinus', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Lactobacillus murinus', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Lactobacillus murinus', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Streptococcus salivarius', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Streptococcus salivarius', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Streptococcus salivarius', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Streptococcus salivarius', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Porphyromonas gingivalis', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Porphyromonas gingivalis', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Porphyromonas gingivalis', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Porphyromonas gingivalis', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Any other', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Minimum Bactericidal Concentration (MBC)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Any other', guideline: 'Minimum Bactericidal Concentration (MBC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Any other', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Herbal/Ayush', microorganismType: 'Bacteria', microorganism: 'Any other', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },

  // Fungi - MIC, ZOI & TKA studies
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Herbal/Ayush', microorganismType: 'Fungi', microorganism: 'Aspergillus brasiliensis', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Herbal/Ayush', microorganismType: 'Fungi', microorganism: 'Aspergillus brasiliensis', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Herbal/Ayush', microorganismType: 'Fungi', microorganism: 'Aspergillus brasiliensis', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Herbal/Ayush', microorganismType: 'Fungi', microorganism: 'Candida albicans', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Herbal/Ayush', microorganismType: 'Fungi', microorganism: 'Candida albicans', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Herbal/Ayush', microorganismType: 'Fungi', microorganism: 'Candida albicans', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Herbal/Ayush', microorganismType: 'Fungi', microorganism: 'Trichyophyton rubrum', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Herbal/Ayush', microorganismType: 'Fungi', microorganism: 'Trichyophyton rubrum', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Herbal/Ayush', microorganismType: 'Fungi', microorganism: 'Trichyophyton rubrum', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Herbal/Ayush', microorganismType: 'Fungi', microorganism: 'Malassezia furfur', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Herbal/Ayush', microorganismType: 'Fungi', microorganism: 'Malassezia furfur', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Herbal/Ayush', microorganismType: 'Fungi', microorganism: 'Malassezia furfur', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Herbal/Ayush', microorganismType: 'Fungi', microorganism: 'Aspergillus flavus', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Herbal/Ayush', microorganismType: 'Fungi', microorganism: 'Aspergillus flavus', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Herbal/Ayush', microorganismType: 'Fungi', microorganism: 'Aspergillus flavus', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },
  
  { studyName: 'Minimum Inhibitory Concentration (MIC)', category: 'Herbal/Ayush', microorganismType: 'Fungi', microorganism: 'Any other', guideline: 'Minimum Inhibitory Concentration (MIC)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Zone of Inhibition (ZOI)', category: 'Herbal/Ayush', microorganismType: 'Fungi', microorganism: 'Any other', guideline: 'Zone of Inhibition (ZOI)', price: 7500, duration: 15, deviation: 5 },
  { studyName: 'Time Kill Assay (TKA)', category: 'Herbal/Ayush', microorganismType: 'Fungi', microorganism: 'Any other', guideline: 'Time Kill Assay (TKA)', price: 7500, duration: 15, deviation: 5 },

  // Virus - Anti-viral study
  { studyName: 'Anti-viral study', category: 'Herbal/Ayush', microorganismType: 'Virus', microorganism: 'HSV 1', guideline: 'Anti-viral study', price: 45000, duration: 60, deviation: 5 },
  { studyName: 'Anti-viral study', category: 'Herbal/Ayush', microorganismType: 'Virus', microorganism: 'HSV 2', guideline: 'Anti-viral study', price: 45000, duration: 60, deviation: 5 },
  { studyName: 'Anti-viral study', category: 'Herbal/Ayush', microorganismType: 'Virus', microorganism: 'Adeno virus', guideline: 'Anti-viral study', price: 45000, duration: 60, deviation: 5 },
  { studyName: 'Anti-viral study', category: 'Herbal/Ayush', microorganismType: 'Virus', microorganism: 'MVA', guideline: 'Anti-viral study', price: 45000, duration: 60, deviation: 5 },
  { studyName: 'Anti-viral study', category: 'Herbal/Ayush', microorganismType: 'Virus', microorganism: 'Any other', guideline: 'Anti-viral study', price: 45000, duration: 60, deviation: 5 },
];

// Disinfectants Data - Generated programmatically for efficiency
const bacteriaList = [
  'Staphylococcus aureus', 'Escherichia coli', 'Pseudomonas aeruginosa', 'Cutibacterium acnes',
  'E.faecalis', 'Klebsilla pneumonia', 'E.faecium', 'Lactobacillus acidophilus', 'Bacillus subtilis',
  'Streptococcus pyogenes', 'Streptococcus mutans', 'Ruminococcus torques', 'Dorea formicigenerans',
  'Streptococcus gordonii', 'Lactobacillus murinus', 'Streptococcus salivarius', 'Porphyromonas gingivalis',
  'Any other'
];

const fungiList = [
  'Aspergillus brasiliensis', 'Candida albicans', 'Trichophyton rubrum', 'Malassezia furfur',
  'Aspergillus flavus', 'Any other'
];

const virusList = [
  'HSV 1', 'HSV 2', 'Adeno virus', 'MVA', 'Any other'
];

const generateDisinfectantsData = (): MicrobiologyStudyData[] => {
  const data: MicrobiologyStudyData[] = [];

  // Hand wash entries
  bacteriaList.forEach(bacteria => {
    ['ASTM E1174-13', 'EN 1500', 'ASTM E1174', 'ASTM E2315'].forEach(study => {
      data.push({
        studyName: study,
        category: 'Disinfectants',
        microorganismType: 'Bacteria',
        microorganism: bacteria,
        guideline: study,
        price: 7500,
        duration: 15,
        deviation: 5,
        sampleForm: 'Hand wash'
      });
    });
  });

  fungiList.forEach(fungi => {
    ['ASTM E2613', 'ASTM E2315'].forEach(study => {
      data.push({
        studyName: study,
        category: 'Disinfectants',
        microorganismType: 'Fungi',
        microorganism: fungi,
        guideline: study,
        price: 7500,
        duration: 15,
        deviation: 5,
        sampleForm: 'Hand wash'
      });
    });
  });

  virusList.forEach(virus => {
    data.push({
      studyName: 'ASTM E2011-99',
      category: 'Disinfectants',
      microorganismType: 'Virus',
      microorganism: virus,
      guideline: 'ASTM E2011-99',
      price: 15000,
      duration: 45,
      deviation: 5,
      sampleForm: 'Hand wash'
    });
  });

  // Alcohol based wipes entries
  bacteriaList.forEach(bacteria => {
    ['E16615', 'EN 1656'].forEach(study => {
      data.push({
        studyName: study,
        category: 'Disinfectants',
        microorganismType: 'Bacteria',
        microorganism: bacteria,
        guideline: study,
        price: 7500,
        duration: 15,
        deviation: 5,
        sampleForm: 'Alcohol based wipes'
      });
    });
  });

  fungiList.forEach(fungi => {
    data.push({
      studyName: 'EN 1657',
      category: 'Disinfectants',
      microorganismType: 'Fungi',
      microorganism: fungi,
      guideline: 'EN 1657',
      price: 7500,
      duration: 15,
      deviation: 5,
      sampleForm: 'Alcohol based wipes'
    });
  });

  // Chemical disinfectants & antiseptics entries
  bacteriaList.forEach(bacteria => {
    ['1040', 'EN 1276', 'EN 1040', 'EN 13697 non-porous'].forEach(study => {
      data.push({
        studyName: study,
        category: 'Disinfectants',
        microorganismType: 'Bacteria',
        microorganism: bacteria,
        guideline: study,
        price: study === 'EN 13697 non-porous' ? 15000 : 7500,
        duration: 15,
        deviation: 5,
        sampleForm: 'Chemical disinfectants & antiseptics'
      });
    });
  });

  fungiList.forEach(fungi => {
    ['EN 1650', 'EN 1275', 'EN 13697 non-porous'].forEach(study => {
      data.push({
        studyName: study,
        category: 'Disinfectants',
        microorganismType: 'Fungi',
        microorganism: fungi,
        guideline: study,
        price: study === 'EN 13697 non-porous' ? 15000 : 7500,
        duration: 15,
        deviation: 5,
        sampleForm: 'Chemical disinfectants & antiseptics'
      });
    });
  });

  virusList.forEach(virus => {
    data.push({
      studyName: 'EN 14476',
      category: 'Disinfectants',
      microorganismType: 'Virus',
      microorganism: virus,
      guideline: 'EN 14476',
      price: 15000,
      duration: 45,
      deviation: 5,
      sampleForm: 'Chemical disinfectants & antiseptics'
    });
  });

  // Disinfectant treated plastic entries
  bacteriaList.forEach(bacteria => {
    ['JIS Z 2801', 'ISO 22196'].forEach(study => {
      data.push({
        studyName: study,
        category: 'Disinfectants',
        microorganismType: 'Bacteria',
        microorganism: bacteria,
        guideline: study,
        price: 7500,
        duration: 15,
        deviation: 5,
        sampleForm: 'Disinfectant treated plastic'
      });
    });
  });

  fungiList.forEach(fungi => {
    data.push({
      studyName: 'JIS Z 2911',
      category: 'Disinfectants',
      microorganismType: 'Fungi',
      microorganism: fungi,
      guideline: 'JIS Z 2911',
      price: 7500,
      duration: 15,
      deviation: 5,
      sampleForm: 'Disinfectant treated plastic'
    });
  });

  virusList.forEach(virus => {
    data.push({
      studyName: 'ISO 21702',
      category: 'Disinfectants',
      microorganismType: 'Virus',
      microorganism: virus,
      guideline: 'ISO 21702',
      price: 15000,
      duration: 45,
      deviation: 5,
      sampleForm: 'Disinfectant treated plastic'
    });
  });

  // Fabric/Textile entries
  bacteriaList.forEach(bacteria => {
    ['AATCC 100', 'ISO 20743'].forEach(study => {
      data.push({
        studyName: study,
        category: 'Disinfectants',
        microorganismType: 'Bacteria',
        microorganism: bacteria,
        guideline: study,
        price: 7500,
        duration: 15,
        deviation: 5,
        sampleForm: 'Fabric/Textile'
      });
    });
  });

  fungiList.forEach(fungi => {
    data.push({
      studyName: 'AATCC 30',
      category: 'Disinfectants',
      microorganismType: 'Fungi',
      microorganism: fungi,
      guideline: 'AATCC 30',
      price: 7500,
      duration: 15,
      deviation: 5,
      sampleForm: 'Fabric/Textile'
    });
  });

  virusList.forEach(virus => {
    data.push({
      studyName: 'ISO 18184',
      category: 'Disinfectants',
      microorganismType: 'Virus',
      microorganism: virus,
      guideline: 'ISO 18184',
      price: 15000,
      duration: 45,
      deviation: 5,
      sampleForm: 'Fabric/Textile'
    });
  });

  return data;
};

export const disinfectantsData: MicrobiologyStudyData[] = generateDisinfectantsData();

// Helper function to get data based on category
export const getDataForCategory = (category: string): MicrobiologyStudyData[] => {
  switch (category.toLowerCase()) {
    case 'pharmaceuticals':
      return pharmaceuticalsData;
    case 'nutraceuticals':
      return nutraceuticalsData;
    case 'cosmeceuticals':
      return cosmeceuticalsData;
    case 'herbal/ayush':
    case 'herbalayush':
      return herbalAyushData;
    case 'disinfectants':
      return disinfectantsData;
    default:
      return nutraceuticalsData;
  }
};

// Helper function to get unique microorganism types for a category
export const getMicroorganismTypesForCategory = (category: string): string[] => {
  const data = getDataForCategory(category);
  return [...new Set(data.map(item => item.microorganismType))];
};

// Helper function to get microorganisms for a specific type and category
export const getMicroorganismsForType = (category: string, microorganismType: string): string[] => {
  const data = getDataForCategory(category);
  return [...new Set(data.filter(item => item.microorganismType === microorganismType).map(item => item.microorganism))];
};

// Helper function to get all unique microorganisms across all types for a category
export const getAllMicroorganismsForCategory = (category: string): string[] => {
  const data = getDataForCategory(category);
  return [...new Set(data.map(item => item.microorganism))];
};

// Helper function to get studies for a specific microorganism type
export const getStudiesForMicroorganismType = (category: string, microorganismType: string): MicrobiologyStudyData[] => {
  const data = getDataForCategory(category);
  return data.filter(item => item.microorganismType === microorganismType);
};

// Helper function to get studies for a specific microorganism
export const getStudiesForMicroorganism = (category: string, microorganism: string): MicrobiologyStudyData[] => {
  const data = getDataForCategory(category);
  return data.filter(item => item.microorganism === microorganism);
};

// Helper function to get study data by name
export const getStudyData = (category: string, studyName: string): MicrobiologyStudyData | null => {
  const data = getDataForCategory(category);
  return data.find(item => item.studyName === studyName) || null;
};

// Helper function to get unique sample forms for disinfectants category
export const getSampleFormsForCategory = (category: string): string[] => {
  if (category.toLowerCase() !== 'disinfectants') {
    return [];
  }
  const data = getDataForCategory(category);
  return [...new Set(data.map(item => item.sampleForm).filter(Boolean))] as string[];
};

// Helper function to get studies for a specific sample form and microorganism type (for disinfectants)
export const getStudiesForSampleFormAndType = (category: string, sampleForm: string, microorganismType: string): MicrobiologyStudyData[] => {
  if (category.toLowerCase() !== 'disinfectants') {
    return [];
  }
  const data = getDataForCategory(category);
  return data.filter(item => item.sampleForm === sampleForm && item.microorganismType === microorganismType);
};
