/**
 * @fileoverview Hero text component using shared theme utilities
 */

"use client";

import { Box, Typography, useTheme } from "@mui/material";
import {
  type DeviceConfig,
  useScreenDetection,
  getThemeSpacing,
  getTitleStyles,
  getThemeFontSizes,
} from "../../utils";

interface HeroTextProps {
  config: DeviceConfig;
  screen?: any; // Legacy prop
  primaryText?: string;
  secondaryTextSmall?: string;
  secondaryTextLarge?: string;
  showDecorativeLine?: boolean;
  customLineStyles?: Record<string, any>;
  customSpacing?: {
    marginBottom?: number;
    contentIndent?: number;
  };
  secondaryTextSmallScale?: number;
  customAnimation?: {
    delay?: string;
    duration?: string;
  };
}

export default function HeroText({
  config,
  primaryText = "Partnering",
  secondaryTextSmall = "Your",
  secondaryTextLarge = "Research",
  showDecorativeLine = true,
  customLineStyles,
  customSpacing,
  secondaryTextSmallScale = 0.8,
  customAnimation,
}: HeroTextProps) {
  const theme = useTheme();
  const screen = useScreenDetection();
  const heroTitleStyles = getTitleStyles(screen, theme, { customAnimation });
  const heroFontSizes = getThemeFontSizes("HERO", screen, theme);

  const contentIndent = customSpacing?.contentIndent
    ? theme.spacing(customSpacing.contentIndent)
    : getThemeSpacing("CONTENT_INDENT", screen, theme);

  // Get decorative line styles using theme utilities
  const getLineStyles = () => {
    const lineWidth = getThemeSpacing("LINE_WIDTH", screen, theme);

    const baseStyles = {
      width: lineWidth,
      height: screen.isDesktop ? "3px" : "2px",
      background: `linear-gradient(135deg,
                ${theme.palette.primary.main} 0%,
                ${theme.palette.primary.light} 50%,
                ${theme.palette.primary.main} 100%)`,
      borderRadius: theme.shape.borderRadius,
      mr: theme.spacing(0.5),
      alignSelf: "baseline",
      mt: theme.spacing(screen.isDesktop ? 5 : 3),
    };

    return customLineStyles
      ? { ...baseStyles, ...customLineStyles }
      : baseStyles;
  };

  return (
    <Typography
      component="div"
      className="main-text"
      sx={{
        ...heroTitleStyles,
        fontSize:
          typeof heroFontSizes === "object"
            ? Object.fromEntries(
                Object.entries(heroFontSizes).map(([key, value]) => [
                  key,
                  `${value} !important`,
                ])
              )
            : `${heroFontSizes} !important`,
        mb: theme.spacing(0),
      }}
    >
      {/* Primary text - "Partnering" */}
      <Box
        component="span"
        sx={{ display: "block", color: theme.palette.text.primary }}
      >
        {primaryText}
      </Box>

      {/* Secondary text container */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginLeft: contentIndent,
          position: "relative",
          mt: theme.spacing(window.innerWidth > 1600 ? 2.5 : 0),
        }}
      >
        {/* Text container */}
        <Box sx={{ display: "flex", alignItems: "baseline" }}>
          {/* Decorative line */}
          <Box
            component="span"
            sx={{
              pb: theme.spacing(1),
            }}
          >
            {showDecorativeLine && <Box sx={getLineStyles()} />}
          </Box>

          {/* Small secondary text */}
          <Box
            component="span"
            sx={{
              fontSize: `calc(1em * ${secondaryTextSmallScale})`,
              fontWeight: "inherit",
              mr: theme.spacing(0.5),
            }}
          >
            {secondaryTextSmall}
          </Box>

          {/* Large secondary text */}
          <Box component="span">{secondaryTextLarge}</Box>
        </Box>
      </Box>
    </Typography>
  );
}
