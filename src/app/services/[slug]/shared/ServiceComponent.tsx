/**
 * @fileoverview Shared service component template
 */

"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Chip,
  useTheme,
} from "@mui/material";
import { FormattedMessage } from 'react-intl';
import {
  ArrowForward,
  GroupWork,
  Science,
  Security,
  Assessment,
  Biotech,
  LocalHospital,
  Psychology,
  BugReport,
  Healing,
  FitnessCenter,
  SpaOutlined,
  VerifiedUser,
  Build,
  Analytics,
} from "@mui/icons-material";
import ActionButtons from "views/pages/landing/components/text-section/ActionButtons";
import {
  getServiceContainerStyles,
  getMainBoxStyles,
  getHeroImageStyles,
  getImageStyles,
  getFloatingParticlesStyles,
  getTitleStyles,
  getSubtitleStyles,
  getHighlightChipStyles,
  getSectionIconStyles,
  getServiceCardStyles,
  getCTASectionStyles,
} from "./service-styles";
import { useScreenDetection } from "views/pages/landing/utils/screenUtils";
import {
  FONT_WEIGHTS,
  LINE_HEIGHTS,
  getSubtitleStyles as getLandingSubtitleStyles,
} from "views/pages/landing/utils";
import config from "config";
import { getDeviceConfig } from "views/pages/landing/utils/deviceConfig";

interface ServiceContentData {
  title: string;
  titleKey?: string;
  subtitle?: string;
  subtitleKey?: string;
  description: string;
  descriptionKey?: string;
  companyInfo?: string;
  companyInfoKey?: string;
  image: string;
  imageMobile: string;
  highlights?: string[];
  highlightKeys?: string[];
  // Existing fields
  phytochemistryServices?: Array<{ title: string; titleKey?: string; description: string; descriptionKey?: string }>;
  preclinicalServices?: Array<{ title: string; titleKey?: string; description: string; descriptionKey?: string }>;
  phytochemistryAdvancedServices?: Array<{
    title: string;
    titleKey?: string;
    description: string;
    descriptionKey?: string;
  }>;
  clinicalServices?: Array<{ title: string; titleKey?: string; description: string; descriptionKey?: string }>;
  toxicologyServices?: Array<{ title: string; titleKey?: string; description: string; descriptionKey?: string }>;
  qualityControlServices?: Array<{ title: string; titleKey?: string; description: string; descriptionKey?: string }>;
  microbialServices?: Array<{ title: string; titleKey?: string; description: string; descriptionKey?: string }>;
  qualityControl?: Array<{ title: string; titleKey?: string; description: string; descriptionKey?: string }>;

  pharmacognosticServices?: Array<{ title: string; titleKey?: string; description: string; descriptionKey?: string }>;
  physicochemicalServices?: Array<{ title: string; titleKey?: string; description: string; descriptionKey?: string }>;
  specializedServices?: Array<{ title: string; titleKey?: string; description: string; descriptionKey?: string }>;
  efficacyServices?: Array<{ title: string; titleKey?: string; description: string; descriptionKey?: string }>;
  cancerServices?: Array<{ title: string; titleKey?: string; description: string; descriptionKey?: string }>;
  antioxidantServices?: Array<{ title: string; titleKey?: string; description: string; descriptionKey?: string }>;
  diabetesServices?: Array<{ title: string; titleKey?: string; description: string; descriptionKey?: string }>;
  immunologyServices?: Array<{ title: string; titleKey?: string; description: string; descriptionKey?: string }>;
  hepatoprotectiveServices?: Array<{ title: string; titleKey?: string; description: string; descriptionKey?: string }>;
  antiInfectiveServices?: Array<{ title: string; titleKey?: string; description: string; descriptionKey?: string }>;
  obesityServices?: Array<{ title: string; titleKey?: string; description: string; descriptionKey?: string }>;
  cosmeticServices?: Array<{ title: string; titleKey?: string; description: string; descriptionKey?: string }>;
  otherServices?: Array<{ title: string; titleKey?: string; description: string; descriptionKey?: string }>;
  productDevelopmentServices?: Array<{ title: string; titleKey?: string; description: string; descriptionKey?: string }>;
}

interface ServiceComponentProps {
  serviceData: ServiceContentData;
}

function useInViewOnce<T extends HTMLElement>(
  options?: IntersectionObserverInit
) {
  const elementRef = React.useRef<T | null>(null);
  const [isInView, setIsInView] = React.useState(false);

  React.useEffect(() => {
    if (isInView) return; // already triggered
    const node = elementRef.current;
    if (!node) return;

    if (
      typeof window === "undefined" ||
      !(window as any).IntersectionObserver
    ) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px 100px 0px",
        threshold: 0.1,
        ...(options || {}),
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isInView, options]);

  return { elementRef, isInView } as const;
}

function InViewPaper(props: {
  sx: any;
  elevation?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const { elementRef, isInView } = useInViewOnce<HTMLDivElement>();
  const combinedClassName = `${props.className ? props.className + " " : ""}${isInView ? "in-view" : ""}`;
  return (
    <Paper
      ref={elementRef}
      elevation={props.elevation ?? 0}
      className={combinedClassName}
      sx={props.sx}
    >
      {props.children}
    </Paper>
  );
}

function InViewBox(props: {
  sx: any;
  className?: string;
  children: React.ReactNode;
}) {
  const { elementRef, isInView } = useInViewOnce<HTMLDivElement>();
  const combinedClassName = `${props.className ? props.className + " " : ""}${isInView ? "in-view" : ""}`;
  return (
    <Box ref={elementRef} className={combinedClassName} sx={props.sx}>
      {props.children}
    </Box>
  );
}

export default function ServiceComponent({
  serviceData,
}: ServiceComponentProps) {
  const theme = useTheme();
  const screen = useScreenDetection();
  const deviceConfig = getDeviceConfig(screen);
  const containerStyles = getServiceContainerStyles(theme);

  const serviceSections = [
    {
      titleKey: "services.sections.pharmacognostic",
      defaultTitle: "Pharmacognostic Services",
      content: serviceData.pharmacognosticServices,
      icon: Biotech,
    },
    {
      titleKey: "services.sections.phytochemistry",
      defaultTitle: "Phytochemistry",
      content: serviceData.phytochemistryServices,
      icon: Biotech,
    },
    {
      titleKey: "services.sections.phytochemistry-services",
      defaultTitle: "Phytochemistry Services",
      content: serviceData.phytochemistryAdvancedServices,
      icon: Assessment,
    },
    {
      titleKey: "services.sections.physicochemical",
      defaultTitle: "Physicochemical Tests",
      content: serviceData.physicochemicalServices,
      icon: Analytics,
    },
    {
      titleKey: "services.sections.preclinical-services",
      defaultTitle: "Preclinical Services",
      content: serviceData.preclinicalServices,
      icon: Science,
    },
    {
      titleKey: "services.sections.efficacy-studies",
      defaultTitle: "Efficacy Studies",
      content: serviceData.efficacyServices,
      icon: Science,
    },
    {
      titleKey: "services.sections.cancer-research",
      defaultTitle: "Cancer Research",
      content: serviceData.cancerServices,
      icon: LocalHospital,
    },
    {
      titleKey: "services.sections.antioxidant-studies",
      defaultTitle: "Antioxidant Studies",
      content: serviceData.antioxidantServices,
      icon: Healing,
    },
    {
      titleKey: "services.sections.diabetes-research",
      defaultTitle: "Diabetes Research",
      content: serviceData.diabetesServices,
      icon: LocalHospital,
    },
    {
      titleKey: "services.sections.immunomodulatory",
      defaultTitle: "Immunomodulatory & Inflammation",
      content: serviceData.immunologyServices,
      icon: Psychology,
    },
    {
      titleKey: "services.sections.hepatoprotective",
      defaultTitle: "Hepatoprotective Studies",
      content: serviceData.hepatoprotectiveServices,
      icon: Healing,
    },
    {
      titleKey: "services.sections.anti-infective",
      defaultTitle: "Anti-infective Research",
      content: serviceData.antiInfectiveServices,
      icon: BugReport,
    },
    {
      titleKey: "services.sections.obesity-research",
      defaultTitle: "Obesity Research",
      content: serviceData.obesityServices,
      icon: FitnessCenter,
    },
    {
      titleKey: "services.sections.cosmetic-research",
      defaultTitle: "Cosmetic Research",
      content: serviceData.cosmeticServices,
      icon: SpaOutlined,
    },
    {
      titleKey: "services.sections.toxicology",
      defaultTitle: "Toxicology",
      content: serviceData.toxicologyServices,
      icon: Security,
    },
    {
      titleKey: "services.sections.clinical-services",
      defaultTitle: "Clinical Services",
      content: serviceData.clinicalServices,
      icon: GroupWork,
    },
    {
      titleKey: "services.sections.quality-control",
      defaultTitle: "Quality Control",
      content: serviceData.qualityControlServices || serviceData.qualityControl,
      icon: Assessment,
    },
    {
      titleKey: "services.sections.microbial-analysis",
      defaultTitle: "Microbial Analysis",
      content: serviceData.microbialServices,
      icon: BugReport,
    },
    {
      titleKey: "services.sections.specialized-services",
      defaultTitle: "Specialized Services",
      content: serviceData.specializedServices,
      icon: VerifiedUser,
    },
    {
      titleKey: "services.sections.other-services",
      defaultTitle: "Other Services",
      content: serviceData.otherServices,
      icon: Science,
    },
    {
      titleKey: "services.sections.product-development",
      defaultTitle: "Product Development (F&D)",
      content: serviceData.productDevelopmentServices,
      icon: Build,
    },
  ];

  return (
    <Box sx={getMainBoxStyles(theme)}>
      <Container {...containerStyles}>
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
              src={serviceData.imageMobile}
              alt={serviceData.title}
              sx={getImageStyles(true)}
            />

            <Box
              component="img"
              src={serviceData.image}
              alt={serviceData.title}
              sx={getImageStyles(false)}
            />

            <Box sx={getFloatingParticlesStyles()} />
          </Box>
        </Paper>

        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography variant="h1" sx={getTitleStyles(theme)}>
            {serviceData.titleKey ? (
              <FormattedMessage id={serviceData.titleKey} defaultMessage={serviceData.title} />
            ) : (
              serviceData.title
            )}
          </Typography>

          {serviceData.subtitle &&
            (() => {
              const landingSubtitle = getLandingSubtitleStyles(screen, theme, {
                textAlign: "center",
                customAnimation: { delay: "0.6s", duration: "0.8s" },
                maxWidth: "900px",
              });
              return (
                <Typography
                  variant={landingSubtitle.variant as any}
                  sx={landingSubtitle.sx}
                >
                  {serviceData.subtitleKey ? (
                    <FormattedMessage id={serviceData.subtitleKey} defaultMessage={serviceData.subtitle} />
                  ) : (
                    serviceData.subtitle
                  )}
                </Typography>
              );
            })()}

          {serviceData.highlights && (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1.5,
                justifyContent: "center",
                mb: 3,
                animation: "fadeIn 1s ease-out 0.7s both",
                "@keyframes fadeIn": {
                  "0%": { opacity: 0 },
                  "100%": { opacity: 1 },
                },
              }}
            >
              {serviceData.highlights.map(
                (highlight: string, index: number) => (
                  <Chip
                    key={index}
                    label={serviceData.highlightKeys && serviceData.highlightKeys[index] ? (
                      <FormattedMessage id={serviceData.highlightKeys[index]} defaultMessage={highlight} />
                    ) : (
                      highlight
                    )}
                    sx={getHighlightChipStyles(theme, index)}
                  />
                )
              )}
            </Box>
          )}

          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.primary,
              textAlign: "center",
              fontFamily: config.fontFamily,
              fontWeight: FONT_WEIGHTS.REGULAR,
              lineHeight: LINE_HEIGHTS.RELAXED,
              fontSize: screen.isDesktop
                ? "1rem"
                : screen.isTablet
                  ? "0.95rem"
                  : "0.9rem",
              mb: 2,
              animation: "fadeInUp 1s ease-out 1.2s both",
            }}
          >
            {serviceData.descriptionKey ? (
              <FormattedMessage id={serviceData.descriptionKey} defaultMessage={serviceData.description} />
            ) : (
              serviceData.description
            )}
          </Typography>

          {serviceData.companyInfo && (
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.primary,
                textAlign: "center",
                fontFamily: config.fontFamily,
                fontWeight: FONT_WEIGHTS.REGULAR,
                lineHeight: LINE_HEIGHTS.RELAXED,
                fontSize: screen.isDesktop
                  ? "1rem"
                  : screen.isTablet
                    ? "0.95rem"
                    : "0.9rem",
                mb: 4,
                animation: "fadeInUp 1s ease-out 1.4s both",
              }}
            >
              {serviceData.companyInfoKey ? (
                <FormattedMessage id={serviceData.companyInfoKey} defaultMessage={serviceData.companyInfo} />
              ) : (
                serviceData.companyInfo
              )}
            </Typography>
          )}

          <ActionButtons
            config={deviceConfig}
            primaryButton={{
              text: <FormattedMessage id="services.cta.get-started" defaultMessage="Get Started Today" /> as any,
              href: "/contact-us",
              icon: <ArrowForward />,
            }}
            showSecondaryButton={false}
            customAnimation={{
              delay: "1.6s",
              duration: "0.8s",
            }}
            customSpacing={{
              gap: 3,
            }}
          />
        </Box>

        {serviceSections.map(
          (section, sectionIndex) =>
            section.content &&
            section.content.length > 0 && (
              <InViewBox
                key={sectionIndex}
                sx={{
                  mb: {
                    xs: theme.spacing(4),
                    sm: theme.spacing(5),
                    md: theme.spacing(6),
                    lg: theme.spacing(7),
                  },
                  animation: "slideInSection 0.4s ease-out both",
                  animationPlayState: "paused",
                  "&.in-view": { animationPlayState: "running" },
                  "@keyframes slideInSection": {
                    "0%": {
                      opacity: 0,
                      transform: "translateY(40px)",
                    },
                    "100%": {
                      opacity: 1,
                      transform: "translateY(0)",
                    },
                  },
                  "@media (prefers-reduced-motion: reduce)": {
                    animation: "none",
                  },
                }}
              >
                <InViewBox
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: 2,
                    mb: {
                      xs: theme.spacing(2.5),
                      sm: theme.spacing(3),
                      md: theme.spacing(3.5),
                    },
                    animation: "headerSlideInLeft 0.3s ease-out both",
                    animationPlayState: "paused",
                    "&.in-view": { animationPlayState: "running" },
                    "@keyframes headerSlideInLeft": {
                      "0%": { opacity: 0, transform: "translateX(-30px)" },
                      "100%": { opacity: 1, transform: "translateX(0)" },
                    },
                    "@media (prefers-reduced-motion: reduce)": {
                      animation: "none",
                    },
                  }}
                >
                  <Box sx={getSectionIconStyles(theme)}>
                    <section.icon
                      sx={{
                        color: theme.palette.primary.main,
                        fontSize: "1.5rem",
                      }}
                    />
                  </Box>

                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: { xs: "1.5rem", md: "1.8rem" },
                      fontWeight: 600,
                      color: theme.palette.primary.main,
                      textAlign: "left",
                    }}
                  >
                    <FormattedMessage id={section.titleKey} defaultMessage={section.defaultTitle} />
                  </Typography>
                </InViewBox>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      sm: "repeat(2, 1fr)",
                      lg: "repeat(3, 1fr)",
                    },
                    gap: {
                      xs: theme.spacing(2),
                      sm: theme.spacing(2.5),
                      md: theme.spacing(3),
                    },
                  }}
                >
                  {section.content.map((item: any, itemIndex: number) => (
                    <InViewPaper
                      key={itemIndex}
                      elevation={0}
                      className="service-card"
                      sx={getServiceCardStyles(theme, sectionIndex, itemIndex)}
                    >
                      <Typography
                        variant="h5"
                        sx={{
                          color: theme.palette.primary.main,
                          fontWeight: 600,
                          mb: 1.5,
                          fontSize: { xs: "1rem", md: "1.1rem" },
                          position: "relative",
                          "&::after": {
                            content: '""',
                            position: "absolute",
                            bottom: -5,
                            left: 0,
                            width: 0,
                            height: "2px",
                            background: `linear-gradient(90deg, ${theme.palette.primary.main}, transparent)`,
                            transition: "width 0.4s ease",
                          },
                        }}
                      >
                        {item.titleKey ? (
                          <FormattedMessage id={item.titleKey} defaultMessage={item.title} />
                        ) : (
                          item.title
                        )}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: theme.palette.text.primary,
                          lineHeight: 1.5,
                          fontSize: { xs: "0.85rem", md: "0.95rem" },
                        }}
                      >
                        {item.descriptionKey ? (
                          <FormattedMessage id={item.descriptionKey} defaultMessage={item.description} />
                        ) : (
                          item.description
                        )}
                      </Typography>
                    </InViewPaper>
                  ))}
                </Box>
              </InViewBox>
            )
        )}

        <InViewBox sx={{ animation: "none" }}>
          <Paper elevation={0} sx={getCTASectionStyles(theme)}>
            <Typography
              variant="h2"
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 700,
                mb: {
                  xs: theme.spacing(3),
                  sm: theme.spacing(4),
                  md: theme.spacing(5),
                },
                fontSize: { xs: "1.5rem", md: "2rem" },
                // textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                position: "relative",
                zIndex: 1,
                animation: "glow 3s ease-in-out infinite alternate",
                "@keyframes glow": {
                  "0%": { textShadow: "0 4px 20px rgba(0,0,0,0.3)" },
                  "100%": {
                    textShadow:
                      "0 4px 30px rgba(255,255,255,0.3), 0 0 40px rgba(25,118,210,0.3)",
                  },
                },
              }}
            >
              <FormattedMessage id="services.cta.title" defaultMessage="Ready to Transform Your Research?" />
            </Typography>

            <Typography
              variant="h5"
              sx={{
                color: theme.palette.primary.main,
                mb: {
                  xs: theme.spacing(4),
                  sm: theme.spacing(5),
                  md: theme.spacing(6),
                },
                fontSize: { xs: "0.9rem", md: "1.1rem" },
                maxWidth: "800px",
                mx: "auto",
                lineHeight: 1.6,
                position: "relative",
                zIndex: 1,
                animation: "fadeInDelay 0.6s ease-out 0.3s both",
                "@keyframes fadeInDelay": {
                  "0%": { opacity: 0, transform: "translateY(20px)" },
                  "100%": { opacity: 1, transform: "translateY(0)" },
                },
              }}
            >
              <FormattedMessage id="services.cta.subtitle" defaultMessage="Join leading companies worldwide who trust our expertise to accelerate their research and development goals." />
            </Typography>

            <ActionButtons
              config={deviceConfig}
              primaryButton={{
                text: <FormattedMessage id="services.cta.start-project" defaultMessage="Start Your Project" /> as any,
                href: "/contact-us",
                icon: <ArrowForward />,
                target: "_self",
                rel: undefined,
              }}
              secondaryButton={{
                text: <FormattedMessage id="services.cta.learn-more" defaultMessage="Learn More" /> as any,
                href: "/about-us",
                icon: undefined,
                target: "_self",
                rel: undefined,
              }}
              showSecondaryButton={true}
              customAnimation={{
                delay: "0.6s",
                duration: "0.8s",
              }}
              customSpacing={{
                gap: 4,
              }}
            />
          </Paper>
        </InViewBox>
      </Container>
    </Box>
  );
}
