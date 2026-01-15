/**
 * @fileoverview Type definitions for About Us components
 * Compatible with existing landing page AboutCard types
 */

import type { SxProps, Theme } from '@mui/material/styles';

// Import the existing AboutSectionData type from landing page to ensure compatibility
import type { AboutSectionData as LandingAboutSectionData } from '../../../landing/components/about/aboutData';

// Use the existing type from landing page to ensure compatibility
export type AboutSectionData = LandingAboutSectionData;

// Additional types specific to AboutUs page
export interface AboutCardProps {
  section: AboutSectionData;
  index: number;
  fontSizes: {
    title: Record<string, string>;
    icon: string;
  };
  getCardStyles: (index: number) => SxProps<Theme>;
}

export interface ValueSection {
  title: string;
  points: string[];
}

export interface ValuesData {
  sections: ValueSection[];
}
