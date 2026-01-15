/**
 * @fileoverview About Us introduction component
 * Reusing existing text components from landing page with AboutCard for Vision & Mission
 */
 
"use client";
 
import React from "react";
import { Box, Typography, CardContent } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FormattedMessage } from "react-intl";
import MainCard from "ui-component/cards/MainCard";
import { gridSpacing } from "store/constant";
import ScienceIcon from "@mui/icons-material/Science";
import BiotechIcon from "@mui/icons-material/Biotech";
import BugReportIcon from "@mui/icons-material/BugReport";
import TestTubeIcon from "@mui/icons-material/Science";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import ClinicalStudiesIcon from "@mui/icons-material/MedicalServices";
 
// Reuse existing utilities from landing page
import {
  useScreenDetection,
  getTitleStyles,
  FONT_WEIGHTS,
} from "../../../landing/utils";
import config from "config";
 
// Import reusable components
import AccreditationSection from "../../../landing/AccreditationSection";
import AboutCard from "../../../landing/components/about/AboutCard";
 
// Import data from existing landing page source - REUSING ALL DATA
import useAboutTranslations from "hooks/useAboutTranslations";
 
// Types
import type { Theme } from "@mui/material/styles";
import type { SxProps } from "@mui/material/styles";
 
/**
 * Introduction section for About Us page matching CompanyIntro styling exactly
 */
export function AboutUsIntro() {
  const screen = useScreenDetection();
  const theme = useTheme();
  const { getSections, companyName, companyDescription } =
    useAboutTranslations();
 
  // Get the same sections data as landing page - REUSING EXISTING DATA
  const sections = getSections(theme.palette.text.primary);
 
  // About Us page specific content - NOW USING TRANSLATIONS
  const aboutUsContent = {
    overview: {
      titleKey: "aboutus.overview.title",
      experienceKey: "aboutus.overview.experience",
    },
    expertise: {
      titleKey: "aboutus.expertise.title",
      descriptionKey: "aboutus.expertise.description",
      categories: [
        {
          titleKey: "aboutus.expertise.quality-control",
          items: [
            "aboutus.expertise.physiochemical",
            "aboutus.expertise.phytochemical",
            "aboutus.expertise.microbiology",
          ],
        },
        {
          titleKey: "aboutus.expertise.invitro",
          items: [
            "aboutus.expertise.safety-toxicity",
            "aboutus.expertise.efficacy-studies",
            "aboutus.expertise.raw-materials",
          ],
        },
        {
          titleKey: "aboutus.expertise.invivo",
          items: [
            "aboutus.expertise.toxicity-studies",
            "aboutus.expertise.pharmacology",
            "aboutus.expertise.babe-studies",
          ],
        },
        {
          titleKey: "aboutus.expertise.clinical-research",
          items: ["aboutus.expertise.phase-trials"],
        },
      ],
    },
    accreditation: {
      titleKey: "aboutus.accreditation.title",
      list: [
        "aboutus.accreditation.iso9001",
        "aboutus.accreditation.iso17025",
        "aboutus.accreditation.ayush",
        "aboutus.accreditation.ccsea",
      ],
    },
  };
 
  // Use the same title styles for all main titles
  const titleStyles = getTitleStyles(screen, theme, {
    use3DEffects: true,
  });
 
  // Overview content styles - Full width text
  const overviewStyles = {
    margin: "32px 0 32px 0",
    padding: 0,
    color: theme.palette.text.primary,
    textAlign: "left" as const,
    lineHeight: 1.8,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightRegular || 400,
    fontSize: screen.isDesktop
      ? "1.1rem"
      : screen.isTablet
        ? "1rem"
        : "0.95rem",
    animation: "fadeInUp 0.8s ease-out 0.4s both",
    whiteSpace: "pre-line" as const,
    width: "100%",
  };
 
  // Accreditation intro styles
  const accreditationIntroStyles = {
    margin: "32px 0 24px 0",
    padding: 0,
    color: theme.palette.text.primary,
    textAlign: "left" as const,
    lineHeight: 1.8,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightRegular || 400,
    fontSize: screen.isDesktop
      ? "1.1rem"
      : screen.isTablet
        ? "1rem"
        : "0.95rem",
    animation: "fadeInUp 0.8s ease-out 0.8s both",
    width: "100%",
  };
 
  // Expertise content styles
  const expertiseStyles = {
    margin: "32px 0 32px 0",
    padding: 0,
    color: theme.palette.text.primary,
    textAlign: "left" as const,
    lineHeight: 1.8,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightRegular || 400,
    fontSize: screen.isDesktop
      ? "1.1rem"
      : screen.isTablet
        ? "1rem"
        : "0.95rem",
    animation: "fadeInUp 0.8s ease-out 0.6s both",
    whiteSpace: "pre-line" as const,
    width: "100%",
  };
 
  // Expertise category title styles
  const expertiseCategoryTitleStyles = {
    margin: "24px 0 12px 0",
    padding: 0,
    color: theme.palette.primary.main,
    textAlign: "left" as const,
    lineHeight: 1.4,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightBold || 600,
    fontSize: screen.isDesktop ? "1.2rem" : screen.isTablet ? "1.1rem" : "1rem",
    animation: "fadeInUp 0.8s ease-out 0.7s both",
    width: "100%",
  };
 
  // Expertise list styles
  const expertiseListStyles = {
    margin: "0 0 16px 0",
    padding: "0 0 0 20px",
    color: theme.palette.text.primary,
    textAlign: "left" as const,
    lineHeight: 1.6,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightRegular || 400,
    fontSize: screen.isDesktop
      ? "1rem"
      : screen.isTablet
        ? "0.95rem"
        : "0.9rem",
    animation: "fadeInUp 0.8s ease-out 0.8s both",
    width: "100%",
  };
 
  // Accreditation list styles
  const accreditationListStyles = {
    margin: "0 0 32px 0",
    padding: "0 0 0 20px",
    color: theme.palette.text.primary,
    textAlign: "left" as const,
    lineHeight: 1.8,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightRegular || 400,
    fontSize: screen.isDesktop
      ? "1.1rem"
      : screen.isTablet
        ? "1rem"
        : "0.95rem",
    animation: "fadeInUp 0.8s ease-out 1.0s both",
    width: "100%",
  };
 
  // AboutCard configuration - SAME AS LANDING PAGE
  const fontSizes = {
    title: {
      xs: "1.2rem",
      sm: "1.3rem",
      md: "1.5rem",
    },
    icon: screen.isDesktop ? "2.5rem" : screen.isTablet ? "2.2rem" : "2rem",
  };
 
  const getCardStyles = (index: number): SxProps<Theme> => ({
    height: "100%",
    transition: theme.transitions.create(["transform", "box-shadow"], {
      duration: theme.transitions.duration.standard,
    }),
    animation: `fadeInUp 0.8s ease-out ${0.2 * index + 1.2}s both`,
    "&:hover": {
      transform: "translateY(-8px)",
      boxShadow: theme.shadows[12],
    },
  });
 
  return (
    <Box
      sx={{
        textAlign: "center",
        // Reduced top padding to move content closer to hero
        pt: { xs: 2, sm: 3, md: 4 }, // Significantly reduced space
        mb: 0,
        pb: 0,
        px: { xs: 2, sm: 4 },
        position: "relative",
        zIndex: 2,
        width: "100%",
      }}
    >
      {/* Overview Title Section */}
      <Box
        sx={{
          mt: 0,
          mb: 0,
          ml: 0,
          mr: 0,
        }}
      >
        <Typography
          variant={screen.isIPhoneSE ? "h3" : "heroLarge"}
          sx={titleStyles}
        >
          <FormattedMessage
            id={aboutUsContent.overview.titleKey}
            defaultMessage="Overview"
          />
        </Typography>
      </Box>
 
      {/* Overview Content Section - Full width container */}
      <Box
        sx={{
          width: "100%",
          mx: "auto",
          mt: { xs: 2, sm: 3, md: 1 },
        }}
      >
        <Box
          component="div"
          sx={{
            textAlign: "left",
            width: "100%",
            "& p": {
              ...overviewStyles,
              mb: 2,
            },
          }}
        >
          <p style={overviewStyles}>
            {companyName} {companyDescription}
          </p>
          <p style={overviewStyles}>
            <FormattedMessage
              id={aboutUsContent.overview.experienceKey}
              defaultMessage="With over 15 years of experience, our core strength lies in delivering customized research solutions with unwavering commitment to quality and integrity. We have successfully collaborated with esteemed partners in Korea, the USA, the Middle East, Singapore, Malaysia, Japan and European countries."
            />
          </p>
        </Box>
      </Box>
 
      {/* Vision, Mission & Values Cards Section - REUSING LANDING PAGE DATA & COMPONENTS */}
      <Box
        sx={{
          width: "100%",
          mx: "auto",
          mt: { xs: 4, sm: 5, md: 6 },
          mb: { xs: 4, sm: 5, md: 6 },
          display: "flex",
          flexDirection: "column",
          gap: { xs: 3, sm: 4, md: 4 },
          alignItems: "center",
        }}
      >
        {sections.map((section, index) => (
          <AboutCard
            key={section.title}
            section={section}
            index={index}
            fontSizes={fontSizes}
            getCardStyles={getCardStyles}
          />
        ))}
      </Box>
 
      {/* Expertise Title Section */}
      <Box
        sx={{
          mt: { xs: 4, sm: 5, md: 6 },
          mb: 0,
          ml: 0,
          mr: 0,
        }}
      >
        <Typography
          variant={screen.isIPhoneSE ? "h3" : "heroLarge"}
          sx={titleStyles}
        >
          <FormattedMessage
            id={aboutUsContent.expertise.titleKey}
            defaultMessage="Our Expertise"
          />
        </Typography>
      </Box>
 
      {/* Expertise Content Section */}
      <Box
        sx={{
          width: "100%",
          mx: "auto",
          mt: { xs: 3, sm: 4, md: 5 },
        }}
      >
        <Box
          component="div"
          sx={{
            textAlign: "left",
            width: "100%",
            "& p": {
              ...expertiseStyles,
              mb: 2,
            },
          }}
        >
          <p style={expertiseStyles}>
            <FormattedMessage
              id={aboutUsContent.expertise.descriptionKey}
              defaultMessage="Our expertise extends to providing customized and cost-effective end-to-end services in the areas of Cosmetics and Personal care, Nutraceutical and Herbal, Pharmaceutical, and Medical device research."
            />
          </p>
        </Box>
 
        {/* Expertise Categories Cards Section */}
        <Box
          sx={{
            width: "100%",
            mx: "auto",
            mt: { xs: 4, sm: 5, md: 6 },
            mb: { xs: 4, sm: 5, md: 6 },
            display: "flex",
            flexDirection: "column",
            gap: { xs: 3, sm: 4, md: 4 },
            alignItems: "center",
          }}
        >
          {/* Expertise Categories Cards Grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr 1fr 1fr",
              },
              gap: { xs: 3, sm: 3, md: 4 },
              width: "100%",
              maxWidth: "1400px",
            }}
          >
            {aboutUsContent.expertise.categories.map(
              (category, categoryIndex) => {
                // Define icons for each expertise category
                const cardData = {
                  "Quality Control Studies": {
                    icon: ScienceIcon,
                  },
                  "In Vitro Testing": {
                    icon: TestTubeIcon,
                  },
                  "In Vivo Testing": {
                    icon: MonitorHeartIcon,
                  },
                  "Clinical Research": {
                    icon: ClinicalStudiesIcon,
                  },
                };
 
                const cardInfo = cardData[
                  category.titleKey as keyof typeof cardData
                ] || {
                  icon: ScienceIcon,
                };
 
                // Create bullet point content from category items
                const bulletContent = category.items
                  .map((item) => `• ${item}`)
                  .join("\n");
 
                return (
                  <Box
                    key={categoryIndex}
                    sx={{ width: "100%", height: "100%" }}
                  >
                    <MainCard
                      sx={{
                        ...getCardStyles(categoryIndex),
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        border: "none",
                        outline: "none",
                        backgroundColor: `${theme.palette.text.primary}15 !important`,
                        boxShadow: theme.shadows[4],
                        transition: theme.transitions.create(
                          ["transform", "box-shadow"],
                          {
                            duration: theme.transitions.duration.standard,
                          }
                        ),
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: theme.shadows[8],
                          backgroundColor: `${theme.palette.text.primary}20 !important`,
                        },
                      }}
                      content={false}
                    >
                      <CardContent
                        sx={{
                          p: theme.spacing(2),
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: theme.spacing(1.5),
                          height: "100%",
                          textAlign: "center",
                        }}
                      >
                        {/* Icon */}
                        <Box
                          sx={{
                            width: 50,
                            height: 50,
                            borderRadius: "50%",
                            backgroundColor:
                              theme.palette.mode === "dark"
                                ? `${theme.palette.primary.main}20`
                                : `${theme.palette.text.primary}15`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: theme.transitions.create(
                              ["transform", "box-shadow", "background-color"],
                              {
                                duration: theme.transitions.duration.short,
                              }
                            ),
                            "&:hover": {
                              transform: "scale(1.05)",
                              backgroundColor:
                                theme.palette.mode === "dark"
                                  ? `${theme.palette.primary.main}30`
                                  : `${theme.palette.text.primary}25`,
                              boxShadow: theme.shadows[4],
                            },
                          }}
                        >
                          <cardInfo.icon
                            sx={{
                              fontSize: "1.5rem",
                              color: theme.palette.text.primary,
                              transition: theme.transitions.create(
                                ["color", "filter"],
                                {
                                  duration: theme.transitions.duration.short,
                                }
                              ),
                              filter: `drop-shadow(0 2px 4px ${theme.palette.text.primary}30)`,
                              "&:hover": {
                                color: theme.palette.primary.main,
                              },
                            }}
                          />
                        </Box>
 
                        {/* Title */}
                        <Typography
                          variant="h6"
                          component="h3"
                          sx={{
                            fontWeight: FONT_WEIGHTS.BOLD,
                            fontFamily: config.fontFamily,
                            fontSize: {
                              xs: "1rem",
                              sm: "1.1rem",
                              md: "1.2rem",
                            },
                            color: theme.palette.text.primary,
                            textAlign: "center",
                            mb: 1,
                          }}
                        >
                          <FormattedMessage
                            id={category.titleKey}
                            defaultMessage={category.titleKey}
                          />
                        </Typography>
 
                        {/* Bullet Points */}
                        <Box
                          component="ul"
                          sx={{
                            listStyle: "none",
                            padding: 0,
                            margin: 0,
                            width: "100%",
                            textAlign: "left",
                          }}
                        >
                          {category.items.map((item, itemIndex) => (
                            <Box
                              key={itemIndex}
                              component="li"
                              sx={{
                                display: "flex",
                                alignItems: "flex-start",
                                mb: 1,
                         
                                fontSize: {
                                  xs: "0.8rem",
                                  sm: "0.85rem",
                                  md: "0.9rem",
                                },
                                lineHeight: 1.4,
                                color: theme.palette.text.primary,
                                fontFamily: config.fontFamily,
                                fontWeight: FONT_WEIGHTS.REGULAR,
                              }}
                            >
                              <Box
                                component="span"
                                sx={{
                                  color: theme.palette.primary.main,
                                  fontWeight: FONT_WEIGHTS.BOLD,
                                  mr: 1,
                                  ml:2,
                                  fontSize: "1.2em",
                                  lineHeight: 1,
                                }}
                              >
                                •
                              </Box>
                              <Box component="span">
                                <FormattedMessage
                                  id={item}
                                  defaultMessage={item}
                                />
                              </Box>
                            </Box>
                          ))}
                        </Box>
                      </CardContent>
                    </MainCard>
                  </Box>
                );
              }
            )}
          </Box>
        </Box>
      </Box>
 
      {/* Accreditation Title Section */}
      <Box
        sx={{
          mt: { xs: 4, sm: 5, md: 6 },
          mb: 0,
          ml: 0,
          mr: 0,
        }}
      >
        <Typography
          variant={screen.isIPhoneSE ? "h3" : "heroLarge"}
          sx={titleStyles}
        >
          <FormattedMessage
            id={aboutUsContent.accreditation.titleKey}
            defaultMessage="Certifications & Accreditations"
          />
        </Typography>
      </Box>
 
      {/* Accreditation Section */}
      <Box
        sx={{
          width: "100%",
          mx: "auto",
          mt: { xs: 3, sm: 4, md: 5 },
        }}
      >
        <Box
          component="div"
          sx={{
            textAlign: "left",
            width: "100%",
          }}
        ></Box>
 
        <Box
          component="ul"
          sx={{
            ...accreditationListStyles,
            listStyle: "disc",
            "& li": {
              marginBottom: "8px",
              paddingLeft: "8px",
            },
          }}
        >
          {aboutUsContent.accreditation.list.map((item, index) => (
            <li key={index}>
              <FormattedMessage
                id={item}
                defaultMessage={
                  item === "aboutus.accreditation.iso9001"
                    ? "ISO 9001:2015 certified"
                    : item === "aboutus.accreditation.iso17025"
                      ? "ISO/IEC17025:2017 (NABL) accredited for Biological and Chemical Testing"
                      : item === "aboutus.accreditation.ayush"
                        ? "Certified by the Dept. of AYUSH as a Government-Approved Drug Testing Lab"
                        : item === "aboutus.accreditation.ccsea"
                          ? "Registered and Approved by CCSEA for Animal Testing"
                          : item
                }
              />
            </li>
          ))}
        </Box>
      </Box>
 
      {/* Accreditation Images Section */}
      <AccreditationSection
        showTitleSection={false}
        containerProps={{
          sx: {
            mt: { xs: 2, sm: 3, md: 4 },
            mb: 0,
          },
        }}
      />
    </Box>
  );
}
 