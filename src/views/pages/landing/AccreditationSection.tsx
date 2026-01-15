/**
 * @fileoverview Distinctive Accreditation section component for landing page
 * Uses badge-style cards with elegant borders and shadows - different from Services
 * Leverages centralized utilities from landing/utils
 * Now reusable with optional title/subtitle
 */

import React from "react";
import {
  Box,
  Container,
  Typography,
  CardMedia,
  Paper,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FormattedMessage } from "react-intl";
import type { SxProps, Theme } from "@mui/material/styles";

// Import the ImageZoomModal component
import ImageZoomModal from "components/ImageZoomModal";

// Project imports - Config
import { ThemeMode } from "config";

// Project imports - Centralized Utils
import { useScreenDetection, getResponsiveValue } from "./utils";
import { useAboutStyles } from "./components/about";
import { getTitleStyles, getSubtitleStyles } from "./utils";

// ============================================================================
// INTERFACES & TYPES
// ============================================================================

interface AccreditationSectionProps {
  className?: string;
  title?: string;
  subtitle?: string;
  showTitleSection?: boolean; // New prop to control title/subtitle display
  containerProps?: any; // Allow custom container props
}

interface AccreditationItem {
  image: string;
  alt: string;
}

// ============================================================================
// CONSTANTS - Using centralized patterns
// ============================================================================

const ACCREDITATION_CONFIG = {
  images: [
    "certification_1.png",
    "certification_2.png",
    "certification_3.png",
    "certification_4.png",
    "certification_5.png",
    "certification_6.png",
  ],
  defaultTitle: "Our Certifications",
  defaultSubtitle: "Certified excellence and quality assurance standards",
  basePath: "/assets/images/landing/accreditation/",
} as const;

// Animation constants
const ANIMATION_CONFIG = {
  STAGGER_DELAY: 0.1,
} as const;

// ============================================================================
// HELPER FUNCTIONS - Using centralized utilities
// ============================================================================

const getAccreditationItems = (): AccreditationItem[] => {
  return ACCREDITATION_CONFIG.images.map((image, index) => ({
    image,
    alt: `Certification ${index + 1}`,
  }));
};

const getImageUrl = (imageName: string): string => {
  return `${ACCREDITATION_CONFIG.basePath}${imageName}`;
};

// ============================================================================
// COMPONENT
// ============================================================================

const AccreditationSection: React.FC<AccreditationSectionProps> = ({
  className,
  title,
  subtitle,
  showTitleSection = true, // Default to true for backward compatibility
  containerProps = {},
}) => {
  const theme = useTheme();
  const screen = useScreenDetection();

  // State for image zoom modal
  const [selectedImage, setSelectedImage] = React.useState<{
    src: string;
    alt: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Handle image click to open zoom modal
  const handleImageClick = (imageSrc: string, imageAlt: string) => {
    setSelectedImage({ src: imageSrc, alt: imageAlt });
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  // Use centralized styles
  const { backgroundStyles } = useAboutStyles();

  // Use custom title/subtitle or fallback to translated defaults
  const sectionTitle = title;
  const sectionSubtitle = subtitle;

  // Use centralized typography utilities
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

  // Use responsive utilities for grid configuration - RESPONSIVE GRID LAYOUT
  const gridColumns = getResponsiveValue(
    {
      desktop: 6, // Show all 6 images in one line on desktop
      tablet: 3, // Show 3 images per row on tablet (2 rows)
      mobile: 2, // Show 2 images per row on mobile (3 rows)
      default: 3, // Default to 3 columns
    },
    screen
  );

  // Use responsive values for spacing - ADJUSTED GAPS FOR RESPONSIVE LAYOUT
  const gridGap = getResponsiveValue(
    {
      desktop: 2, // Comfortable gap for desktop
      tablet: 2, // Comfortable gap for tablet
      mobile: 1.5, // Smaller gap for mobile
      default: 2, // Default gap
    },
    screen
  );

  // Use responsive utilities for image sizing - PROPER SIZES FOR RESPONSIVE LAYOUT
  const imageHeight = getResponsiveValue(
    {
      desktop: 120, // Good size for desktop
      tablet: 140, // Larger for tablet to fill 3-column layout
      mobile: 120, // Good size for mobile 2-column layout
      default: 130, // Default size
    },
    screen
  );

  const cardMaxWidth = getResponsiveValue(
    {
      desktop: "140px", // Good size for desktop
      tablet: "180px", // Larger for tablet
      mobile: "160px", // Good size for mobile
      default: "160px", // Default size
    },
    screen
  );

  const containerMaxWidth = getResponsiveValue(
    {
      desktop: "100%", // Full width to accommodate all images in one line
      tablet: "100%", // Full width for tablet
      mobile: "100%", // Full width for mobile
      default: "100%", // Full width by default
    },
    screen
  );

  const containerMargin = getResponsiveValue(
    {
      desktop: 12,
      tablet: 10,
      mobile: 8,
      default: 8,
    },
    screen
  );

  // Error handler using theme utilities
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
      // console.error(`Failed to load image: ${target.src}`);
    },
    [theme]
  );

  // Image styles using theme utilities
  const getImageStyles = React.useCallback(
    (): SxProps<Theme> => ({
      objectFit: "contain",
      backgroundColor: "transparent",
      padding: 0, // Removed padding completely to make image as large as possible
      width: "100%", // Ensure image takes full width of container
      height: "100%", // Ensure image takes full height of container
      maxWidth: "100%", // Prevent overflow
      maxHeight: "100%", // Prevent overflow
      transition: theme.transitions.create(["transform", "filter"], {
        duration: theme.transitions.duration.standard,
      }),
      cursor: "pointer",
    }),
    [theme]
  );

  // Theme-aware background using centralized pattern
  const getSectionBackground = React.useCallback(() => {
    return theme.palette.mode === ThemeMode.DARK
      ? theme.palette.grey[800] || theme.palette.background.default
      : theme.palette.background.default;
  }, [theme]);

  // Card styles using centralized utilities and responsive values
  const getCertificationCardStyles = React.useMemo(
    () =>
      (index: number): SxProps<Theme> => ({
        // Use centralized border radius pattern
        borderRadius: theme.spacing(3), // 24px equivalent

        // Theme-aware gradient background
        background:
          theme.palette.mode === ThemeMode.DARK
            ? `linear-gradient(135deg, ${theme.palette.grey?.[900] || "#1a1a1a"}90, ${theme.palette.primary.dark}20)`
            : `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.primary.light}15)`,

        // Use theme transitions directly
        transition: theme.transitions.create(["transform", "box-shadow"], {
          duration: theme.transitions.duration.complex,
          easing: theme.transitions.easing.easeInOut,
        }),

        // Layout using theme spacing
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: {
          xs: theme.spacing(1), // Small padding on mobile
          sm: theme.spacing(1.5), // Medium padding on tablets
          md: theme.spacing(2), // Standard padding on medium tablets
          lg: theme.spacing(1), // Small padding on large screens
        },

        // Responsive sizing using centralized values - PROPER HEIGHTS FOR RESPONSIVE LAYOUT
        minHeight: {
          xs: 140, // Mobile: 2 columns
          sm: 160, // Small tablet: 3 columns
          md: 170, // Medium tablet: 4 columns
          lg: 140, // Large screen: 6 columns
        },

        // Position and overflow
        position: "relative",
        overflow: "visible",

        // Staggered animation using local constant
        animationDelay: `${index * ANIMATION_CONFIG.STAGGER_DELAY}s`,

        // No hover effects - removed zoom functionality
      }),
    [theme, screen]
  );

  const accreditationItems = React.useMemo(() => getAccreditationItems(), []);

  return (
    <Box
      component="section"
      className={className}
      sx={{
        // Only apply background styles if showTitleSection is true (for landing page)
        ...(showTitleSection && {
          ...backgroundStyles,
          backgroundColor: getSectionBackground(),
          // Pattern overlay using centralized approach
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `radial-gradient(circle at 25% 25%, ${theme.palette.primary.main}08 0%, transparent 50%)`,
            pointerEvents: "none",
            zIndex: 1,
          },
        }),
        // Simpler styling when used as images-only component
        ...(!showTitleSection && {
          py: { xs: 4, sm: 5, md: 6 },
          px: { xs: 0.5, sm: 4 },
          pb: { xs: 6, sm: 8, md: 10 }, // Added padding bottom
          position: "relative",
          zIndex: 2,
          width: "100%",
        }),
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 2,
          mb: showTitleSection ? theme.spacing(containerMargin) : 0,
          pb: { xs: 4, sm: 6, md: 8 }, // Added padding bottom to container
          px: theme.spacing(2),
          ...containerProps,
        }}
      >
        {/* Section Header - Only show if showTitleSection is true */}
        {showTitleSection && (
          <Box sx={{ textAlign: "center", mb: theme.spacing(4) }}>
            {" "}
            {/* Reduced from 6 to 4 */}
            <Typography
              variant={screen.isIPhoneSE ? "h3" : "heroLarge"}
              sx={titleStyles}
            >
              {sectionTitle || (
                <FormattedMessage
                  id="certifications.title"
                  defaultMessage="Our Certifications"
                />
              )}
            </Typography>
            <Typography
              variant={subtitleStyles.variant as any}
              component="p"
              sx={subtitleStyles.sx}
            >
              {sectionSubtitle || (
                <FormattedMessage
                  id="certifications.subtitle"
                  defaultMessage="Certified excellence and quality assurance standards"
                />
              )}
            </Typography>
          </Box>
        )}

        {/* Certifications Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)", // 2 columns on mobile
              sm: "repeat(3, 1fr)", // 3 columns on small tablets
              md: "repeat(4, 1fr)", // 4 columns on medium tablets
              lg: "repeat(6, 1fr)", // 6 columns on large screens
            },
            gap: {
              xs: theme.spacing(1.5), // Smaller gap on mobile
              sm: theme.spacing(2), // Medium gap on tablets
              md: theme.spacing(2), // Medium gap on medium tablets
              lg: theme.spacing(2), // Standard gap on large screens
            },
            width: "100%",
            justifyItems: "center",
            maxWidth: containerMaxWidth,
            mx: "auto",
          }}
        >
          {accreditationItems.map((accreditation, index) => {
            const imageUrl = getImageUrl(accreditation.image);

            return (
              <Box
                key={`certification-${index}`}
                sx={{
                  width: "100%",
                  maxWidth: {
                    xs: "160px", // Mobile: 2 columns
                    sm: "180px", // Small tablet: 3 columns
                    md: "200px", // Medium tablet: 4 columns
                    lg: "140px", // Large screen: 6 columns
                  },
                }}
              >
                <Paper
                  elevation={0}
                  sx={getCertificationCardStyles(index)}
                  onClick={() => handleImageClick(imageUrl, accreditation.alt)}
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      cursor: "pointer",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height={120}
                      image={imageUrl}
                      alt={accreditation.alt}
                      sx={{
                        ...getImageStyles(),
                        height: {
                          xs: 120, // Mobile: 2 columns
                          sm: 140, // Small tablet: 3 columns
                          md: 150, // Medium tablet: 4 columns
                          lg: 120, // Large screen: 6 columns
                        },
                      }}
                      onError={(e) => handleImageError(e, accreditation.alt)}
                    />
                  </Box>
                </Paper>
              </Box>
            );
          })}
        </Box>
      </Container>

      {/* Image Zoom Modal */}
      {selectedImage && (
        <ImageZoomModal
          open={isModalOpen}
          onClose={handleModalClose}
          imageSrc={selectedImage.src}
          imageAlt={selectedImage.alt}
        />
      )}
    </Box>
  );
};

export default AccreditationSection;
