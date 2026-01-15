/**
 * @fileoverview About Us page with hero image and existing content
 */

"use client";

import React from "react";
import {
  Box,
  Container,
  Paper,
  useTheme,
} from "@mui/material";
import {
  getServiceContainerStyles,
  getMainBoxStyles,
  getHeroImageStyles,
  getImageStyles,
  getFloatingParticlesStyles,
} from "../../../app/services/[slug]/shared/service-styles";
import { useScreenDetection } from "../landing/utils/screenUtils";
import { getDeviceConfig } from "../landing/utils/deviceConfig";

// Import existing AboutUsIntro component
import { AboutUsIntro } from "./components/sections/AboutUsIntro";

// About Us data for hero section
const aboutUsHeroData = {
  title: "About Us",
  image: "/assets/images/about-us.png",
  imageMobile: "/assets/images/about-us.png",
};

export default function AboutUsWithHero() {
  const theme = useTheme();
  const screen = useScreenDetection();
  const deviceConfig = getDeviceConfig(screen);
  const containerStyles = getServiceContainerStyles(theme);

  return (
    <Box sx={getMainBoxStyles(theme)}>
      <Container {...containerStyles}>
        {/* Hero Section with about.png image */}
        <Paper
          elevation={0}
          sx={{
            position: "relative",
            borderRadius: 8,
            overflow: "hidden",
            mb: 4,
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
            background: "linear-gradient(135deg, #ffffff, #1976d215)",
            animation: "fadeInUp 0.8s ease-out",
            "@keyframes fadeInUp": {
              "0%": {
                opacity: 0,
                transform: "translateY(40px)",
              },
              "100%": {
                opacity: 1,
                transform: "translateY(0)",
              },
            },
          }}
        >
          <Box sx={getHeroImageStyles()}>
            <Box
              component="img"
              src={aboutUsHeroData.imageMobile}
              alt={aboutUsHeroData.title}
              sx={getImageStyles(true)}
            />

            <Box
              component="img"
              src={aboutUsHeroData.image}
              alt={aboutUsHeroData.title}
              sx={getImageStyles(false)}
            />

            <Box sx={getFloatingParticlesStyles()} />
          </Box>
        </Paper>

        {/* Existing AboutUsIntro Content */}
        <AboutUsIntro />
      </Container>
    </Box>
  );
}
