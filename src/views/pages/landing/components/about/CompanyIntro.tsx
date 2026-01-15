/**
 * @fileoverview Company Introduction Component
 * Using consolidated shared utilities
 */

"use client";

import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import {
  useScreenDetection,
  getTitleStyles,
  getSubtitleStyles,
} from "../../utils";
import useAboutTranslations from "hooks/useAboutTranslations";

interface CompanyIntroProps {
  customContent?: {
    companyName?: string;
    description?: string;
  };
}

const CompanyIntro = React.memo(({ customContent }: CompanyIntroProps) => {
  const theme = useTheme();
  const screen = useScreenDetection();
  const { companyName: translatedCompanyName, companyDescription } =
    useAboutTranslations();

  const companyName = customContent?.companyName || translatedCompanyName;
  const description = customContent?.description || companyDescription;

  // Use consolidated shared utilities
  const titleStyles = getTitleStyles(screen, theme, {
    use3DEffects: true,
  });

  const subtitleStyles = getSubtitleStyles(screen, theme, {
    textAlign: "center",
    customSpacing: {
      marginLeft: 0,
      marginTop: 4,
      marginBottom: 4,
    },
  });

  return (
    <Box sx={{ textAlign: "center", mb: 4 }}>
      <Typography
        variant={screen.isIPhoneSE ? "h3" : "heroLarge"}
        sx={titleStyles}
      >
        {companyName}
      </Typography>

      <Typography
        variant={subtitleStyles.variant as any}
        component="p"
        sx={subtitleStyles.sx}
      >
        {description}
      </Typography>
    </Box>
  );
});
CompanyIntro.displayName = "CompanyIntro";

export default CompanyIntro;
export type { CompanyIntroProps };
