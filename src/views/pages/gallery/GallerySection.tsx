/**
 * @fileoverview Gallery Section component displaying facility images and infrastructure
 */

"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  CardMedia,
  Dialog,
  IconButton,
  Chip,
  Paper,
  Stack,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { SxProps, Theme } from "@mui/material/styles";
import { Close as CloseIcon } from "@mui/icons-material";
import { FormattedMessage } from "react-intl";

// Project imports
import AppBar from "ui-component/extended/AppBar";
import FooterSection from "../landing/FooterSection";

// Import centralized utilities from landing/utils
import { useScreenDetection } from "../landing/utils/screenUtils";
import {
  getTitleStyles,
  getButtonStyles,
  FONT_FAMILIES,
  FONT_WEIGHTS,
} from "../landing/utils/styleUtils";
import { getHeroTitleStyles } from "../landing/utils/sharedStyles";
import {
  getFloatingParticlesStyles,
  getServiceContainerStyles,
  getHeroImageStyles,
  getImageStyles as getHeroImageStylesForResponsive,
} from "app/services/[slug]/shared/service-styles";

// ============================================================================
// INTERFACES & TYPES
// ============================================================================

interface AccreditationItem {
  image: string;
  alt: string;
  title: string;
  titleKey: string;
  description: string;
  descriptionKey: string;
  category: string;
}

interface GalleryItem {
  id: number;
  title: string;
  titleKey: string;
  description: string;
  descriptionKey: string;
  image: string;
  category: string;
  alt: string;
}

// ============================================================================
// CONSTANTS - Using existing images from Animal house directory
// ============================================================================

const TEAM_IMAGES = [
  "Team-Radiant.jpg",
  "Team-Radiant-1.jpg",
  "Team-outing.jpg",
  "Confab.jpg",
];

const LAB_IMAGES = [
  "Lab.jpg",
  "Lab-1.jpg",
  "Lab-2.jpg",
  "Lab-Corridor.jpg",
  "Drug-Testing-Lab.jpg",
  "Biochemistry-Lab.jpg",
  "Molecular-Biology.jpg",
  "Microbiology.jpg",
  "HPLC.jpg",
  "Cell-Biology-1.jpg",
  "Biochemistry.jpg",
  "Cell-Repository.jpg",
];

const FIFTEEN_YEARS_CELEBRATION_IMAGES = [
  "DSC07197.webp",
  "DSC07227.webp",
  "DSC07381.webp",
  "DSC07417.webp",
  "DSC07437.webp",
  "DSC07471.webp",
  "DSC07695.webp",
  "DSC07825.webp",
  "DSC07836.webp",
  "DSC07877.webp",
  "DSC07886.webp",
  "DSC07911.webp",
  "DSC07965.webp",
  "DSC07982.webp",
  "DSC07997.webp",
];

const AREA_83_TEAM_OUTING_IMAGES = [
  "IMG_8165.JPG",
  "IMG_8189.JPG",
  "IMG-20221211-WA0044.jpg",
  "IMG-20221211-WA0074.jpg",
];

const RADIANT_TEAM_CELEBRATIONS_IMAGES = [
  "IMG_20221224_124943.jpg",
  "IMG-20230103-WA0013.jpg",
  "IMG-20230308-WA0121.jpg",
  "IMG-20230309-WA0002.jpg",
  "IMG-20230310-WA0000.jpg",
  "IMG-20230624-WA0081.jpg",
  "IMG-20230624-WA0082.jpg",
  "IMG-20231018-WA0048.jpg",
  "IMG-20231020-WA0032.jpg",
  "IMG-20241011-WA0016.jpg",
  "WhatsApp Image 2025-08-22 at 11.21.34_2bdacb28.jpg",
  "WhatsApp Image 2025-08-22 at 11.21.35_af208271.jpg",
  "WhatsApp Image 2025-08-22 at 11.44.09_a7bf95e5.jpg",
  "WhatsApp Image 2025-08-22 at 11.44.19_beaae48a.jpg",
  "WhatsApp Image 2025-08-22 at 11.44.27_72ae798b.jpg",
  "WhatsApp Image 2025-08-22 at 11.44.31_047c5a46.jpg",
  "WhatsApp Image 2025-08-22 at 11.44.31_3a85877c.jpg",
  "WhatsApp Image 2025-08-22 at 11.44.31_af108a86.jpg",
  "WhatsApp Image 2025-08-22 at 11.45.39_93cf159c.jpg",
  "WhatsApp Image 2025-08-22 at 11.58.06_f9f25bd1.jpg",
  "WhatsApp Image 2025-08-22 at 11.58.07_8dfd874c.jpg",
];

const KOREA_EXPO_IMAGES = [
  "1746162006536.webp",
  "1746162005968.webp",
  "1746162005626.webp",
  "1746162003407.webp",
  "1733904941139.webp",
  "1733904940202.webp",
  "1733904939508.webp",
  "1733904939448.webp",
  "1733904937100.webp",
  "IMG-20250826-WA0001.webp",
  "IMG-20250826-WA0002.webp",
  "IMG-20250826-WA0003.webp",
  "IMG-20250826-WA0004.webp",
  "IMG-20250826-WA0005.webp",
  "IMG-20250826-WA0006.webp",
  "IMG-20250826-WA0007.webp",
  "IMG-20250826-WA0008.webp",
];

const IMAGE_CONFIG = {
  basePath: "/assets/images/Animal house/Animal house/",
  subPaths: {
    "15-years-celebrations": "15 years celebrations/",
    "area-83-team-outing": "Area 83 Team outing/",
    "radiant-team-celebrations": "Radiant Team celebrations/",
    expo: "EXPO/",
  },
} as const;

// ============================================================================
// HELPER FUNCTIONS - Using existing Animal house images
// ============================================================================

const getAccreditationItems = (): AccreditationItem[] => {
  const allItems = [];

  // Team: 4 images
  for (let i = 0; i < 4; i++) {
    allItems.push({
      image: TEAM_IMAGES[i],
      alt: `Team Image ${i + 1}`,
      titleKey: `gallery.images.radiant-team.${i}.title`,
      title:
        i === 0
          ? "Radiant Research Team"
          : i === 1
            ? "Radiant Team Collaboration"
            : i === 2
              ? "Team Outing Event"
              : "Team Conference",
      descriptionKey: `gallery.images.radiant-team.${i}.description`,
      description:
        i === 0
          ? "Our dedicated Radiant Research team working together on breakthrough projects"
          : i === 1
            ? "Team collaboration session at Radiant Research facilities"
            : i === 2
              ? "Team building and outing activities to strengthen collaboration"
              : "Team conference and knowledge sharing sessions",
      category: "Radiant Team",
    });
  }

  // Lab: 12 images
  for (let i = 0; i < 12; i++) {
    allItems.push({
      image: LAB_IMAGES[i],
      alt: `Lab Image ${i + 1}`,
      titleKey: `gallery.images.radiant-lab.${i}.title`,
      title:
        i === 0
          ? "Main Laboratory"
          : i === 1
            ? "Laboratory Facility 1"
            : i === 2
              ? "Laboratory Facility 2"
              : i === 3
                ? "Laboratory Corridor"
                : i === 4
                  ? "Drug Testing Laboratory"
                  : i === 5
                    ? "Biochemistry Laboratory"
                    : i === 6
                      ? "Molecular Biology Lab"
                      : i === 7
                        ? "Microbiology Laboratory"
                        : i === 8
                          ? "HPLC Analysis Lab"
                          : i === 9
                            ? "Cell Biology Laboratory"
                            : i === 10
                              ? "Biochemistry Research Lab"
                              : "Cell Repository Facility",
      descriptionKey: `gallery.images.radiant-lab.${i}.description`,
      description:
        i === 0
          ? "Main laboratory facility with state-of-the-art equipment"
          : i === 1
            ? "Advanced laboratory facility for research and testing"
            : i === 2
              ? "Secondary laboratory facility for specialized research"
              : i === 3
                ? "Laboratory corridor connecting different research areas"
                : i === 4
                  ? "Specialized drug testing and validation laboratory"
                  : i === 5
                    ? "Biochemistry laboratory for chemical analysis"
                    : i === 6
                      ? "Molecular biology laboratory for genetic research"
                      : i === 7
                        ? "Microbiology laboratory for microbial studies"
                        : i === 8
                          ? "HPLC analysis laboratory for precise measurements"
                          : i === 9
                            ? "Cell biology laboratory for cellular research"
                            : i === 10
                              ? "Biochemistry research laboratory"
                              : "Cell repository facility for sample storage",
      category: "Radiant Lab",
    });
  }

  // 15 Years Celebrations: 15 images
  for (let i = 0; i < 15; i++) {
    allItems.push({
      image: FIFTEEN_YEARS_CELEBRATION_IMAGES[i],
      alt: `15 Years Celebration Image ${i + 1}`,
      titleKey: `gallery.images.15-years-celebrations.${i}.title`,
      title: `15 Years Celebration ${i + 1}`,
      descriptionKey: `gallery.images.15-years-celebrations.${i}.description`,
      description: `Celebrating 15 years of excellence and achievements at Radiant Research - Event ${i + 1}`,
      category: "15 Years Celebration",
    });
  }

  // Area 83 Team Outing: 4 images
  for (let i = 0; i < 4; i++) {
    allItems.push({
      image: AREA_83_TEAM_OUTING_IMAGES[i],
      alt: `Area 83 Team Outing Image ${i + 1}`,
      titleKey: `gallery.images.area-83-team-outing.${i}.title`,
      title: `Area 83 Team Outing ${i + 1}`,
      descriptionKey: `gallery.images.area-83-team-outing.${i}.description`,
      description: `Team outing and bonding activities at Area 83 - Event ${i + 1}`,
      category: "Area 83 Outing",
    });
  }

  // Radiant Team Celebrations: 21 images
  for (let i = 0; i < 21; i++) {
    allItems.push({
      image: RADIANT_TEAM_CELEBRATIONS_IMAGES[i],
      alt: `Radiant Team Celebrations Image ${i + 1}`,
      titleKey: `gallery.images.radiant-team-celebrations.${i}.title`,
      title: `Radiant Team Celebrations ${i + 1}`,
      descriptionKey: `gallery.images.radiant-team-celebrations.${i}.description`,
      description: `Team celebrations and milestone achievements at Radiant Research - Event ${i + 1}`,
      category: "Team Celebrations",
    });
  }

  // Korea Expo: use all images from the list
  for (let i = 0; i < KOREA_EXPO_IMAGES.length; i++) {
    allItems.push({
      image: KOREA_EXPO_IMAGES[i],
      alt: `Korea Expo Image ${i + 1}`,
      titleKey: `gallery.images.korea-expo.${i}.title`,
      title: `Korea Expo 2025 - Image ${i + 1}`,
      descriptionKey: `gallery.images.korea-expo.${i}.description`,
      description: `Exhibition showcase at Korea Expo 2025 - Image ${i + 1}`,
      category: "Korea Expo 2025",
    });
  }

  return allItems;
};

const getImageUrl = (imageName: string, subPath?: string): string => {
  const basePath = IMAGE_CONFIG.basePath;
  const fullSubPath = subPath
    ? IMAGE_CONFIG.subPaths[subPath as keyof typeof IMAGE_CONFIG.subPaths] || ""
    : "";
  return `${basePath}${fullSubPath}${imageName}`;
};

const categories = [
  { display: "Radiant Team", key: "gallery.categories.radiant-team" },
  { display: "Radiant Lab", key: "gallery.categories.radiant-lab" },
  {
    display: "15 Years Celebration",
    key: "gallery.categories.15-years-celebrations",
  },
  {
    display: "Area 83 Outing",
    key: "gallery.categories.area-83-team-outing",
  },
  {
    display: "Team Celebrations",
    key: "gallery.categories.radiant-team-celebrations",
  },
  {
    display: "Korea Expo 2025",
    key: "gallery.categories.korea-expo-2025",
  },
];

interface GalleryItem {
  id: number;
  title: string;
  titleKey: string;
  description: string;
  descriptionKey: string;
  image: string;
  category: string;
  alt: string;
}

interface GallerySectionProps {
  initialCategory?: string;
}

export default function GallerySection({
  initialCategory,
}: GallerySectionProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Map URL category to display category
  const getCategoryFromUrl = (urlCategory: string): string => {
    const categoryMapping: { [key: string]: string } = {
      "radiant-team": "Radiant Team",
      "radiant-lab": "Radiant Lab",
      "15-years-celebrations": "15 Years Celebration",
      "area-83-team-outing": "Area 83 Outing",
      "radiant-team-celebrations": "Team Celebrations",
      "korea-expo-2025": "Korea Expo 2025",
    };
    return categoryMapping[urlCategory] || "Radiant Team";
  };

  // Map display category to URL category
  const getUrlFromCategory = (displayCategory: string): string => {
    const urlMapping: { [key: string]: string } = {
      "Radiant Team": "radiant-team",
      "Radiant Lab": "radiant-lab",
      "15 Years Celebration": "15-years-celebrations",
      "Area 83 Outing": "area-83-team-outing",
      "Team Celebrations": "radiant-team-celebrations",
      "Korea Expo 2025": "korea-expo-2025",
    };
    return urlMapping[displayCategory] || "radiant-team";
  };

  // Get current category from URL pathname
  const getCurrentCategoryFromPath = (): string => {
    const pathSegments = pathname.split("/");
    const categorySegment = pathSegments[pathSegments.length - 1];
    return getCategoryFromUrl(categorySegment);
  };

  const [selectedCategory, setSelectedCategory] = useState(
    initialCategory
      ? getCategoryFromUrl(initialCategory)
      : getCurrentCategoryFromPath()
  );
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const theme = useTheme();
  const screen = useScreenDetection();
  const containerStyles = getServiceContainerStyles(theme);

  // Use the same accreditation items approach
  const accreditationItems = React.useMemo(() => getAccreditationItems(), []);

  // Convert accreditation items to gallery items for filtering
  const galleryItems: GalleryItem[] = accreditationItems.map((item, index) => {
    let subPath: string | undefined;

    // Determine subpath based on category
    if (item.category === "15 Years Celebration") {
      subPath = "15-years-celebrations";
    } else if (item.category === "Area 83 Outing") {
      subPath = "area-83-team-outing";
    } else if (item.category === "Team Celebrations") {
      subPath = "radiant-team-celebrations";
    } else if (item.category === "Korea Expo 2025") {
      subPath = "expo";
    }

    return {
      id: index + 1,
      title: item.title,
      titleKey: item.titleKey,
      description: item.description,
      descriptionKey: item.descriptionKey,
      image: getImageUrl(item.image, subPath),
      category: item.category,
      alt: item.alt,
    };
  });

  const filteredItems = galleryItems.filter(
    (item) => item.category === selectedCategory
  );

  // Only sync on initial load, not on every URL change
  React.useEffect(() => {
    const currentCategory = getCurrentCategoryFromPath();
    if (!initialCategory) {
      setSelectedCategory(currentCategory);
    }
    // Set initial load to false after first render
    setIsInitialLoad(false);
  }, []); // Empty dependency array - only run once on mount

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!selectedImage) return;

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          const currentIndex = filteredItems.findIndex(
            (item) => item.id === selectedImage.id
          );
          const prevIndex =
            currentIndex > 0 ? currentIndex - 1 : filteredItems.length - 1;
          setSelectedImage(filteredItems[prevIndex]);
          break;
        case "ArrowRight":
          event.preventDefault();
          const nextIndex = filteredItems.findIndex(
            (item) => item.id === selectedImage.id
          );
          const newNextIndex =
            nextIndex < filteredItems.length - 1 ? nextIndex + 1 : 0;
          setSelectedImage(filteredItems[newNextIndex]);
          break;
        case "Escape":
          event.preventDefault();
          setSelectedImage(null);
          break;
      }
    };

    if (selectedImage) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage, filteredItems]);

  // Grid configuration - responsive image display
  const imageHeight = 210;

  // Same image styles as AccreditationSection
  const getImageStyles = React.useCallback(
    (): SxProps<Theme> => ({
      objectFit: "contain",
      backgroundColor: "transparent",
      padding: theme.spacing(2),
      transition: theme.transitions.create(["transform", "filter"], {
        duration: theme.transitions.duration.standard,
      }),
    }),
    [theme]
  );

  // Enhanced card styles with glass-morphism effects
  const getCertificationCardStyles = React.useMemo(
    () =>
      (index: number): SxProps<Theme> => ({
        borderRadius: {
          xs: theme.spacing(2),
          sm: theme.spacing(2.5),
          md: theme.spacing(3),
        },
        background:
          theme.palette.mode === "dark"
            ? `linear-gradient(135deg, rgba(26, 26, 26, 0.9), ${theme.palette.primary.dark}30)`
            : `linear-gradient(135deg, rgba(255, 255, 255, 0.95), ${theme.palette.primary.light}25)`,
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        transition: theme.transitions.create(["transform", "box-shadow"], {
          duration: theme.transitions.duration.complex,
          easing: theme.transitions.easing.easeInOut,
        }),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: {
          xs: theme.spacing(0.5),
          sm: theme.spacing(1),
          md: theme.spacing(0.01),
        },
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
          background:
            theme.palette.mode === "dark"
              ? `linear-gradient(135deg, rgba(26, 26, 26, 0.95), ${theme.palette.primary.dark}40)`
              : `linear-gradient(135deg, rgba(255, 255, 255, 0.98), ${theme.palette.primary.light}30)`,
        },
      }),
    [theme]
  );

  // Same error handler as AccreditationSection
  const handleImageError = React.useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>, alt: string) => {
      const target = e.target as HTMLImageElement;
      target.style.backgroundColor = theme.palette.primary.light;
      target.style.display = "flex";
      target.style.alignItems = "center";
      target.style.justifyContent = "center";
      target.style.color = theme.palette.primary.contrastText;
      target.style.fontSize = theme.typography.body2.fontSize as string;
      target.style.fontWeight =
        theme.typography.fontWeightBold?.toString() || "700";
      target.innerHTML = alt;
      console.error(`Failed to load image: ${target.src}`);
    },
    [theme]
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Fixed Header */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          backdropFilter: "blur(10px)",
        }}
      >
        <AppBar
          sx={{
            background: "transparent",
            boxShadow: "none",
            position: "static",
          }}
          disableSticky={true}
          FooterComponent={FooterSection}
        />
      </Box>

      {/* Main Content Container */}
      <Box
        sx={{
          flex: 1,
          minHeight: "calc(100vh - 120px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Gallery Section with Full Background */}
        <Box
          sx={{
            flex: 1,
            minHeight: "inherit",
            backgroundImage: `url('/assets/images/home-bg.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            // Use centralized screen detection for background attachment
            backgroundAttachment:
              screen.isMobile || screen.isTablet ? "scroll" : "fixed",
            // Responsive background handling using centralized utilities
            ...(screen.isTablet && {
              minHeight: "calc(100vh - 120px)",
              backgroundAttachment: "scroll", // Force scroll on tablets for better coverage
            }),
            paddingBottom: { xs: 8, sm: 10, md: 10 },
            paddingTop: { xs: 6 }, // Account for fixed header
          }}
        >
          {/* Hero Section with responsive gallery hero image */}
          <Container {...containerStyles}>
            <Paper
              elevation={0}
              sx={{
                position: "relative",
                borderRadius: 8,
                overflow: "hidden",
                mb: 3,
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
                {/* Mobile image */}
                <Box
                  component="img"
                  src="/assets/images/icons/gallery-hero.png"
                  alt="Gallery"
                  sx={{
                    ...getHeroImageStylesForResponsive(true),
                    objectFit: "cover",
                    objectPosition: "center center",
                  }}
                />

                {/* Desktop image */}
                <Box
                  component="img"
                  src="/assets/images/icons/gallery-hero.png"
                  alt="Gallery"
                  sx={{
                    ...getHeroImageStylesForResponsive(false),
                    objectFit: "cover",
                    objectPosition: "center center",
                  }}
                />

                <Box sx={getFloatingParticlesStyles()} />
              </Box>
            </Paper>
          </Container>

          {/* Filter Chips Section */}
          <Box
            sx={{
              mb: { xs: 6, sm: 6, md: 8 },
              px: { xs: 1, sm: 2, md: 3 },
              mt: { xs: -1, sm: -1, md: -2 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: { xs: 1, sm: 1.5, md: 2 },
                // Responsive grid layout for mobile devices
                ...(screen.isMobile && {
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(2, 1fr)", // Very small phones (320px-375px) - 2 columns
                    sm: screen.isTablet ? "repeat(4, 1fr)" : "repeat(3, 1fr)", // Tablets get 4 columns, larger phones get 3
                  },
                  gap: { xs: 0.8, sm: 1 },
                  maxWidth: {
                    xs: "300px", // Wider for 2-column layout
                    sm: screen.isTablet ? "500px" : "420px",
                  },
                  mx: "auto",
                  px: { xs: 0.5, sm: 1 },
                  alignItems: "center",
                  justifyItems: "center",
                  gridAutoRows: "minmax(36px, auto)",
                }),
              }}
            >
              <Stack
                direction="row"
                spacing={{ xs: 1, sm: 1.5, md: 2 }}
                sx={{
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: { xs: 1, sm: 1.5, md: 2 },
                  // Override stack on mobile for grid layout
                  ...(screen.isMobile && {
                    display: "contents",
                  }),
                }}
              >
                {categories.map((category, index) => (
                  <Box
                    key={`${category.display}-wrapper-${index}`}
                    sx={{
                      ...(screen.isMobile && {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: "100%",
                      }),
                    }}
                  >
                    <Chip
                      key={`${category.display}-${selectedCategory === category.display}`}
                      label={
                        <FormattedMessage
                          id={category.key}
                          defaultMessage={category.display}
                        />
                      }
                      onClick={() => {
                        // Immediately update the selected category for instant visual feedback
                        setSelectedCategory(category.display);
                        // Update URL in the background without blocking the UI
                        const urlCategory = getUrlFromCategory(
                          category.display
                        );
                        setTimeout(() => {
                          router.replace(`/gallery/${urlCategory}`);
                        }, 0);
                      }}
                      variant={
                        selectedCategory === category.display
                          ? "filled"
                          : "outlined"
                      }
                      sx={{
                        fontFamily: FONT_FAMILIES.PRIMARY,
                        fontWeight: FONT_WEIGHTS.MEDIUM,
                        fontSize: {
                          xs: "0.6rem",
                          sm: "0.7rem",
                          md: "0.8rem",
                          lg: "0.85rem",
                        },
                        px: { xs: 0.8, sm: 1.5, md: 2, lg: 2.5 },
                        py: { xs: 0.4, sm: 0.8, md: 1, lg: 1.2 },
                        borderRadius: 20,
                        textTransform: "none",
                        animation: isInitialLoad
                          ? `popIn 0.6s ease-out ${0.9 + index * 0.1}s both`
                          : "none",
                        cursor: "pointer",
                        transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
                        whiteSpace: "nowrap",
                        // Mobile responsive sizing - consistent for all chips
                        ...(screen.isMobile && {
                          width: "100%",
                          minWidth: {
                            xs: "140px", // Wider for 2-column layout
                            sm: screen.isTablet ? "110px" : "130px", // Smaller for 4-column on tablets, medium for 3-column
                          },
                          maxWidth: {
                            xs: "145px",
                            sm: screen.isTablet ? "115px" : "135px",
                          },
                          justifyContent: "center",
                          alignItems: "center",
                          display: "flex",
                          mx: "auto",
                          height: { xs: "36px", sm: "38px" },
                          boxSizing: "border-box",
                          position: "relative",
                          "& .MuiChip-label": {
                            textAlign: "center",
                            overflow: "visible",
                            whiteSpace: "normal",
                            lineHeight: { xs: 1.2, sm: 1.3 },
                            fontSize: {
                              xs: "0.65rem",
                              sm: screen.isTablet ? "0.6rem" : "0.68rem",
                            },
                            px: { xs: 0.6, sm: 0.8 },
                            py: 0.2,
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          },
                        }),
                        // Use exact same gradient as Get Started Today button
                        ...(selectedCategory === category.display
                          ? {
                              border: "none !important",
                              background: `linear-gradient(135deg, 
                          ${theme.palette.primary.main} 0%, 
                          ${theme.palette.primary.light} 50%, 
                          ${theme.palette.primary.main} 100%) !important`,
                              color: "#FFFFFF !important",
                            }
                          : {
                              border: `2px solid ${theme.palette.primary.main} !important`,
                              backgroundColor: "transparent !important",
                              color: theme.palette.primary.main + " !important",
                            }),
                        "&:hover": {
                          transform: "translateY(-2px) scale(1.015)",
                          backgroundPosition: "100% 100%",
                          background: `linear-gradient(135deg, 
                          ${theme.palette.primary.main} 0%, 
                          ${theme.palette.primary.light} 50%, 
                          ${theme.palette.primary.main} 100%) !important`,
                          color: "#FFFFFF !important",
                          border: "none !important",
                          boxShadow: `
                          0 6px 20px rgba(0, 0, 0, 0.08),
                          0 3px 12px ${theme.palette.primary.main}35,
                          inset 0 1px 0 rgba(255, 255, 255, 0.25)
                        `,
                        },
                        "&:focus": {
                          outline: "none",
                          background: `linear-gradient(135deg, 
                          ${theme.palette.primary.main} 0%, 
                          ${theme.palette.primary.light} 50%, 
                          ${theme.palette.primary.main} 100%) !important`,
                          color: "#FFFFFF !important",
                          border: "none !important",
                          boxShadow: `
                          0 2px 8px rgba(0, 0, 0, 0.06),
                          0 1px 4px ${theme.palette.primary.main}25,
                          0 0 0 2px ${theme.palette.primary.main}25
                        `,
                        },
                        "@keyframes popIn": {
                          "0%": {
                            opacity: 0,
                            transform: "scale(0.1) translateY(20px)",
                          },
                          "80%": {
                            transform: "scale(1.1) translateY(-5px)",
                          },
                          "100%": {
                            opacity: 1,
                            transform: "scale(1) translateY(0)",
                          },
                        },
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            </Box>
          </Box>

          {/* Gallery Grid - Responsive layout */}
          <Box sx={{ py: 1, px: { xs: 1, sm: 2, md: 3 }, mb: 10 }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                  lg: "repeat(4, 1fr)",
                  xl: "repeat(4, 1fr)",
                },
                gap: {
                  xs: 2,
                  sm: 2.5,
                  md: 3,
                  lg: 4,
                },
                width: "100%",
                maxWidth: "1200px",
                mx: "auto",
                justifyItems: "center",
                alignContent: "start",
              }}
            >
              {filteredItems.map((item, index) => (
                <Box
                  key={`certification-${index}`}
                  sx={{
                    width: "100%",
                    maxWidth: {
                      xs: "280px",
                      sm: "320px",
                      md: "350px",
                      lg: "280px",
                    },
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      ...getCertificationCardStyles(index),
                      width: "100%",
                      height: { xs: 200, sm: 220, md: 240, lg: 210 },
                      minHeight: { xs: 200, sm: 220, md: 240, lg: 210 },
                    }}
                    onClick={() => setSelectedImage(item)}
                  >
                    <CardMedia
                      component="img"
                      image={item.image}
                      alt={item.alt}
                      sx={{
                        ...getImageStyles(),
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                      onError={(e) => handleImageError(e, item.alt)}
                    />
                  </Paper>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Image Dialog */}
          <Dialog
            open={!!selectedImage}
            onClose={() => setSelectedImage(null)}
            maxWidth="lg"
            fullWidth
            PaperProps={{
              sx: {
                borderRadius: 2,
                overflow: "hidden",
                background: "transparent",
                boxShadow: "none",
              },
            }}
          >
            {selectedImage && (
              <Box
                sx={{
                  position: "relative",
                  backgroundImage: `url('/assets/images/home-bg.png')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  height: "90vh",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 2,
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "rgba(0, 0, 0, 0.3)",
                    borderRadius: 2,
                  },
                }}
              >
                {/* Category Heading */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 20,
                    left: 0,
                    right: 0,
                    zIndex: 20,
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant={screen.isIPhoneSE ? "h5" : "h5"}
                    sx={{
                      ...getTitleStyles(screen, theme, { use3DEffects: true }),
                      fontSize: screen.isDesktop
                        ? "1.5rem"
                        : screen.isTablet
                          ? "1.1rem"
                          : "1rem",
                      textAlign: "center",
                      mb: 0,
                    }}
                  >
                    {selectedImage.category === "15 Years Celebration" ? (
                      "15 Years Celebration"
                    ) : (
                      <FormattedMessage
                        id={selectedImage.titleKey}
                        defaultMessage={selectedImage.title}
                      />
                    )}
                  </Typography>
                </Box>

                {/* Close button */}
                <IconButton
                  onClick={() => setSelectedImage(null)}
                  sx={{
                    position: "absolute",
                    top: 5,
                    right: 10,
                    color: theme.palette.primary.main,
                    backgroundColor: "transparent",
                    width: 50,
                    height: 50,
                    zIndex: 20,
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.1)",
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  <CloseIcon />
                </IconButton>

                {/* Main Image with Navigation */}
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    p: 4,
                    pt: { xs: 4, sm: 6, md: 8 },
                    pb: { xs: 12, sm: 14, md: 16 },
                    maxHeight: "calc(90vh - 50px)",
                    zIndex: 15,
                    overflow: "auto",
                  }}
                >
                  {/* Navigation arrows removed; rely on keyboard arrows only */}

                  {/* Main Image without any border or background */}
                  <CardMedia
                    component="img"
                    image={selectedImage.image}
                    alt={selectedImage.alt}
                    sx={{
                      maxWidth: "90%",
                      maxHeight: "60vh", // Limit height to ensure thumbnails are visible
                      width: "auto",
                      height: "auto",
                      objectFit: "contain",
                      borderRadius: 8,
                      display: "block",
                    }}
                    onError={(e) => handleImageError(e, selectedImage.alt)}
                  />

                  {/* Navigation arrows removed; rely on keyboard arrows only */}
                </Box>

                {/* Thumbnail Row */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 60,
                    left: 0,
                    right: 0,
                    zIndex: 30,
                    p: 2,
                    pointerEvents: "auto",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      justifyContent: "center",
                      overflowX: "auto",
                      pb: 0.01,
                      scrollBehavior: "smooth",
                      "&::-webkit-scrollbar": {
                        height: 6,
                      },
                      "&::-webkit-scrollbar-track": {
                        background: "rgba(255,255,255,0.1)",
                        borderRadius: 3,
                      },
                      "&::-webkit-scrollbar-thumb": {
                        background: "rgba(255,255,255,0.3)",
                        borderRadius: 3,
                      },
                    }}
                    ref={(el) => {
                      if (el && selectedImage) {
                        const currentIndex = filteredItems.findIndex(
                          (item) => item.id === selectedImage.id
                        );
                        const thumbnailWidth = 88; // 80px width + 8px gap
                        const scrollPosition =
                          currentIndex * thumbnailWidth -
                          (el as HTMLDivElement).clientWidth / 2 +
                          thumbnailWidth / 2;
                        (el as HTMLDivElement).scrollLeft = Math.max(
                          0,
                          scrollPosition
                        );
                      }
                    }}
                  >
                    {filteredItems.map((item, index) => (
                      <Box
                        key={item.id}
                        onClick={() => setSelectedImage(item)}
                        sx={{
                          flexShrink: 0,
                          cursor: "pointer",
                          border:
                            selectedImage.id === item.id
                              ? `3px solid ${theme.palette.primary.main}`
                              : "3px solid transparent",
                          borderRadius: 1,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "scale(1.05)",
                          },
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={item.image}
                          alt={item.alt}
                          sx={{
                            width: 80,
                            height: 60,
                            objectFit: "cover",
                            borderRadius: 1,
                          }}
                        />
                      </Box>
                    ))}
                  </Box>
                </Box>

                {/* Instructions */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 20,
                    left: 0,
                    right: 0,
                    zIndex: 10,
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.palette.text.primary,
                      fontFamily: FONT_FAMILIES.PRIMARY,
                      fontWeight: FONT_WEIGHTS.REGULAR,
                      fontSize: screen.isDesktop
                        ? "1.1rem"
                        : screen.isTablet
                          ? "1rem"
                          : "0.95rem",
                      lineHeight: 1.8,
                      textAlign: "center",
                    }}
                  >
                    <FormattedMessage
                      id="gallery.navigation.instructions"
                      defaultMessage="Use keyboard arrow keys to navigate • ESC to close • Click image to zoom"
                    />
                  </Typography>
                </Box>
              </Box>
            )}
          </Dialog>
        </Box>
      </Box>

      {/* Fixed Footer */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          backdropFilter: "blur(10px)",
        }}
      >
        <FooterSection />
      </Box>
    </Box>
  );
}
