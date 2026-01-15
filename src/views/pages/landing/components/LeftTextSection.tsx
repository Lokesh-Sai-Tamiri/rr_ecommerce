/**
 * @fileoverview Unified text section component for all devices with integrated slider controls
 * Updated: Removed slideLeft transitions - only fade transitions remain
 */

"use client";

import { useState, useEffect, useMemo } from "react";
import { Box, Container, useTheme, Tooltip } from "@mui/material";
import { useIntl } from "react-intl";

// Import ALL centralized utilities
import {
  useScreenDetection,
  getDeviceConfig,
  getContainerStyles,
  getDesktopLayoutStyles,
  getThemeSpacing,
  getMobileSizeWithFallback,
  getMobileScaling,
  getResponsiveValue,
  ANIMATIONS,
  FONT_WEIGHTS,
  FONT_FAMILIES,
  LINE_HEIGHTS,
  SPACING_SCALE,
} from "../utils";

// Import reusable sub-components
import { HeroText, Subtitle, ActionButtons } from "./text-section";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface TextSlideData {
  i18nKey?: string;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  // Secondary button properties
  secondaryButtonText?: string;
  showSecondaryButton?: boolean;
}

interface LeftTextSectionProps {
  slideData: TextSlideData; // Made required since data always comes from slider
  // Slider control props
  currentSlide?: number;
  totalSlides?: number;
  onSlideChange?: (index: number) => void;
  // Transition phase prop - removed slideLeft
  transitionPhase?: "idle" | "fadeOut" | "fadeIn";
}

interface FontSizeConfig {
  hero: string;
  subtitle: string;
  button: string;
  body: string;
}

// ============================================================================
// UTILITY FUNCTIONS - MOVED TO TOP
// ============================================================================

/**
 * Get text content from slide data (always required now)
 */
const getTextContent = (slideData: TextSlideData) => {
  return {
    primary: slideData.title,
    secondarySmall: slideData.subtitle,
    secondaryLarge: "", // Clear this to avoid duplication
    subtitle: slideData.description, // Use description as the main subtitle
  };
};

/**
 * Get button configuration from slide data (always required now)
 */
const getButtonConfig = (slideData: TextSlideData) => {
  // Determine href based on button text
  const getPrimaryHref = (buttonText: string) => {
    const text = buttonText.toLowerCase();
    if (text.includes('learn more') || text.includes('explore more') || text.includes('explore research')) {
      return '/about-us';
    }
    return '/about-us'; // Default fallback
  };

  const getSecondaryHref = (buttonText: string) => {
    const text = buttonText.toLowerCase();
    if (text.includes('contact') || text.includes('contact us')) {
      return '/contact-us';
    }
    if (text.includes('gallery') || text.includes('view gallery')) {
      return '/gallery';
    }
    return '/contact-us'; // Default fallback
  };

  return {
    primary: {
      text: slideData.buttonText,
      href: getPrimaryHref(slideData.buttonText),
      target: "_self",
      rel: "",
    },
    secondary: {
      text: slideData.secondaryButtonText || "Learn More",
      href: getSecondaryHref(slideData.secondaryButtonText || "Learn More"),
      target: "_self",
      rel: "",
    },
    showSecondaryButton: slideData.showSecondaryButton ?? true,
  };
};

// ============================================================================
// INTEGRATED DOTTED SLIDER CONTROLS WITH FADE SUPPORT
// ============================================================================

interface IntegratedSliderControlsProps {
  currentSlide: number;
  totalSlides: number;
  onSlideChange: (index: number) => void;
  layoutType: "desktop" | "tablet" | "mobile";
  transitionPhase?: "idle" | "fadeOut" | "fadeIn";
}

const IntegratedSliderControls = ({
  currentSlide,
  totalSlides,
  onSlideChange,
  layoutType,
  transitionPhase = "idle",
}: IntegratedSliderControlsProps) => {
  const getControlsStyles = () => {
    const baseStyles = {
      display: "flex",
      alignItems: "center",
      justifyContent: layoutType === "desktop" ? "flex-start" : "center",
      gap: layoutType === "desktop" ? 1.5 : layoutType === "tablet" ? 1.3 : 1.2,
      mb: layoutType === "desktop" ? 3 : layoutType === "tablet" ? 2.5 : 2,
      padding: layoutType === "desktop" ? "8px 0" : "6px 12px",
      borderRadius: layoutType === "desktop" ? "0" : "16px",
      // CHANGE: Make background transparent for tablet and mobile
      backgroundColor: "transparent", // Changed from rgba(0,0,0,0.1) to transparent
      backdropFilter: "none", // Changed from blur(8px) to none
      border: "none", // Changed from border with rgba to none
      width: layoutType === "desktop" ? "auto" : "fit-content",
      alignSelf: layoutType === "desktop" ? "flex-start" : "center",
      // Desktop gets fade effects, mobile/tablet get no transitions
      ...(layoutType === "desktop"
        ? {
            opacity: transitionPhase === "fadeOut" ? 0.3 : 1,
            transform:
              transitionPhase === "fadeOut"
                ? "translateY(-5px)"
                : "translateY(0)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
          }
        : {
            opacity: transitionPhase === "fadeOut" ? 0 : 1,
            transition: "none",
          }),
    };

    return baseStyles;
  };

  const getDotStyles = (isActive: boolean) => ({
    width: layoutType === "desktop" ? 12 : layoutType === "tablet" ? 10 : 8,
    height: layoutType === "desktop" ? 12 : layoutType === "tablet" ? 10 : 8,
    borderRadius: "50%",
    backgroundColor: isActive ? "#1976d2" : "rgba(255,255,255,0.6)",
    cursor: transitionPhase === "idle" ? "pointer" : "not-allowed",
    border: isActive ? "2px solid #ffffff" : "1px solid rgba(255,255,255,0.4)",
    boxShadow: isActive
      ? "0 2px 8px rgba(25, 118, 210, 0.4)"
      : "0 1px 4px rgba(0,0,0,0.2)",
    // Disable interactions during transitions
    pointerEvents: transitionPhase === "idle" ? "auto" : "none",
    // Desktop gets transitions, mobile/tablet don't
    ...(layoutType === "desktop"
      ? {
          opacity: transitionPhase === "fadeOut" ? 0.5 : 1,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }
      : {
          opacity: transitionPhase === "fadeOut" ? 0 : 1,
          transition: "none",
        }),
    // Hover effects only when idle
    ...(transitionPhase === "idle" && {
      "&:hover": {
        backgroundColor: isActive ? "#1565c0" : "rgba(255,255,255,0.8)",
        transform: "scale(1.3)",
        boxShadow: isActive
          ? "0 3px 12px rgba(25, 118, 210, 0.6)"
          : "0 2px 8px rgba(255,255,255,0.5)",
      },
      "&:active": {
        transform: "scale(1.1)",
      },
    }),
  });

  return (
    <Box
      sx={getControlsStyles()}
      className="integrated-slider-controls"
      role="tablist"
      aria-label="Slide navigation controls"
    >
      {Array.from({ length: totalSlides }).map((_, index) => (
        <Box
          key={index}
          onClick={() => transitionPhase === "idle" && onSlideChange(index)}
          sx={getDotStyles(currentSlide === index)}
          role="tab"
          tabIndex={transitionPhase === "idle" ? 0 : -1}
          aria-label={`Go to slide ${index + 1}`}
          aria-selected={currentSlide === index}
          aria-disabled={transitionPhase !== "idle"}
          className={`integrated-dot ${currentSlide === index ? "dot-active" : ""} ${transitionPhase !== "idle" ? "dot-disabled" : ""}`}
          onKeyDown={(e) => {
            if (
              transitionPhase === "idle" &&
              (e.key === "Enter" || e.key === " ")
            ) {
              e.preventDefault();
              onSlideChange(index);
            }
          }}
        />
      ))}
    </Box>
  );
};

// ============================================================================
// CONFIGURATION FROM CENTRALIZED UTILITIES
// ============================================================================

/**
 * Animation timing configuration using centralized ANIMATIONS
 */
const getAnimationTimingConfig = (layoutType: string) => ({
  HERO: {
    delay: layoutType === "desktop" ? "0.5s" : "0.4s",
    duration: "0.8s",
    animation:
      layoutType === "desktop" ? ANIMATIONS.FADE_IN_UP : ANIMATIONS.FADE_IN_UP,
  },
  SUBTITLE: {
    delay: layoutType === "desktop" ? "0.6s" : "0.6s",
    duration: "0.8s",
    animation: ANIMATIONS.FADE_IN_UP,
  },
  BUTTONS: {
    delay: layoutType === "desktop" ? "0.8s" : "0.8s",
    duration: "0.8s",
    animation: ANIMATIONS.FADE_IN_UP,
  },
});

// ============================================================================
// UTILITY FUNCTIONS USING CENTRALIZED UTILITIES
// ============================================================================

/**
 * Convert spacing value to number using SPACING_SCALE
 */
const normalizeSpacing = (value: string | number): number => {
  if (typeof value === "number") return value;

  // Use SPACING_SCALE for consistent conversion
  const spacingMap: Record<string, number> = {
    [SPACING_SCALE.xs]: 0.25,
    [SPACING_SCALE.sm]: 0.5,
    [SPACING_SCALE.md]: 1,
    [SPACING_SCALE.lg]: 1.5,
    [SPACING_SCALE.xl]: 2,
    [SPACING_SCALE["2xl"]]: 3,
    [SPACING_SCALE["3xl"]]: 4,
  };

  // Check if it's a predefined spacing scale
  if (spacingMap[value]) return spacingMap[value];

  // Convert rem/px strings to numbers
  const numericValue = parseFloat(value);
  if (value.includes("rem")) {
    return numericValue;
  }
  if (value.includes("px")) {
    return numericValue / 16;
  }

  return numericValue || 0;
};

/**
 * Get layout type using responsive utilities
 */
const getLayoutType = (screen: any): "desktop" | "tablet" | "mobile" => {
  // Desktop layout (includes ALL iPad landscapes)
  if (screen.isDesktop) return "desktop";
  if (screen.isIPad && screen.isLandscape) return "desktop";
  if (screen.isIpadPro && screen.isLandscape) return "desktop";
  if (screen.isTabletLandscape) return "desktop";
  if (
    screen.isLandscape &&
    typeof window !== "undefined" &&
    window.innerWidth >= 1024
  ) {
    return "desktop";
  }

  // Tablet portrait layout
  if (screen.isTablet && screen.isPortrait) return "tablet";
  if (screen.isIPad && screen.isPortrait) return "tablet";
  if (screen.isIpadPro && screen.isPortrait) return "tablet";

  // Mobile layout
  return "mobile";
};

/**
 * Get theme-based font sizes with proper type safety
 */
const getTypeSafeFontSizes = (screen: any, theme: any): FontSizeConfig => {
  // Use responsive values for consistent font sizing
  const heroFontSize = getResponsiveValue(
    {
      desktop: "3rem",
      tablet: "2.5rem",
      mobile: "2rem",
      smallMobile: "1.75rem",
      default: "2rem",
    },
    screen
  );

  const subtitleFontSize = getResponsiveValue(
    {
      desktop: "1.25rem",
      tablet: "1.125rem",
      mobile: "1rem",
      smallMobile: "0.875rem",
      default: "1rem",
    },
    screen
  );

  const buttonFontSize = getResponsiveValue(
    {
      desktop: "1rem",
      tablet: "1rem",
      mobile: "0.875rem",
      smallMobile: "0.75rem",
      default: "1rem",
    },
    screen
  );

  const bodyFontSize = getResponsiveValue(
    {
      desktop: "1rem",
      tablet: "0.95rem",
      mobile: "0.875rem",
      smallMobile: "0.8rem",
      default: "1rem",
    },
    screen
  );

  return {
    hero: heroFontSize,
    subtitle: subtitleFontSize,
    button: buttonFontSize,
    body: bodyFontSize,
  };
};

/**
 * Get responsive spacing configuration using mobile scaling
 */
const getSpacingConfig = (layoutType: string, screen: any, theme: any) => {
  // Get mobile size and scaling for enhanced mobile support
  const mobileSize = getMobileSizeWithFallback(screen);
  const mobileScaling = getMobileScaling(mobileSize);

  // Get theme-based spacing with proper type-safe calls
  const getThemeSpacingValue = (
    type: "CONTENT_INDENT" | "BUTTON_GAP"
  ): number => {
    try {
      const value = getThemeSpacing(type, screen, theme);
      return normalizeSpacing(value);
    } catch {
      // Fallback values if getThemeSpacing fails
      const fallbackValues: Record<string, number> = {
        CONTENT_INDENT: screen.isDesktop ? 10 : screen.isTablet ? 8 : 6,
        BUTTON_GAP: screen.isDesktop ? 2 : 1.5,
      };
      return fallbackValues[type] || 1;
    }
  };

  const contentIndent = getThemeSpacingValue("CONTENT_INDENT");
  const buttonGap = getThemeSpacingValue("BUTTON_GAP");

  // Use mobile scaling for responsive values
  const mobileSectionGap = mobileScaling?.iconMargin || 1;
  const mobileButtonGap = mobileScaling?.iconMargin || buttonGap;

  // Use responsive values for different spacing needs
  const sectionGap = getResponsiveValue(
    {
      desktop: 3,
      tablet: 2,
      mobile: mobileSectionGap,
      default: 1,
    },
    screen
  );

  const heroMarginBottom = getResponsiveValue(
    {
      desktop: 2,
      tablet: 1,
      mobile: mobileSize === "small" ? 0 : 0.5,
      default: 0,
    },
    screen
  );

  const subtitleMarginTop = getResponsiveValue(
    {
      desktop: 1,
      tablet: 1,
      mobile: 0,
      default: 0,
    },
    screen
  );

  const subtitleMarginBottom = getResponsiveValue(
    {
      desktop: 4,
      tablet: 1,
      mobile: 0,
      default: 0,
    },
    screen
  );

  return {
    hero: {
      marginBottom: heroMarginBottom,
      contentIndent: contentIndent,
    },
    subtitle: {
      marginTop: subtitleMarginTop,
      marginBottom: subtitleMarginBottom,
      marginLeft: contentIndent,
    },
    buttons: {
      gap: layoutType === "tablet" ? 1.5 : mobileButtonGap,
      marginTop: sectionGap,
    },
    // Include mobile scaling for use in components
    mobileScaling,
  };
};

/**
 * Get enhanced styling using theme utilities and mobile scaling
 */
const getEnhancedStyling = (screen: any, theme: any) => {
  const fontSizes = getTypeSafeFontSizes(screen, theme);
  const mobileSize = getMobileSizeWithFallback(screen);
  const mobileScaling = getMobileScaling(mobileSize);

  return {
    containerStyles: {
      fontFamily: FONT_FAMILIES.PRIMARY,
      fontWeight: FONT_WEIGHTS.REGULAR,
      lineHeight: LINE_HEIGHTS.NORMAL,
      // Apply mobile scaling to container
      ...(screen.isMobile &&
        mobileScaling && {
          fontSize: mobileScaling.fontSize,
        }),
      // Add slider transition effects
      transition: `${ANIMATIONS.TRANSITION_SMOOTH}, opacity 0.8s ease-in-out, transform 0.8s ease-in-out`,
      "&.slide-transition": {
        "&.slide-enter": {
          opacity: 0,
          transform: "translateX(-50px)",
        },
        "&.slide-enter-active": {
          opacity: 1,
          transform: "translateX(0)",
          transition: "opacity 0.8s ease-in-out, transform 0.8s ease-in-out",
        },
      },
    },
    heroStyles: {
      fontWeight: FONT_WEIGHTS.BOLD,
      lineHeight: LINE_HEIGHTS.TIGHT,
      fontSize: fontSizes.hero,
    },
    subtitleStyles: {
      fontWeight: FONT_WEIGHTS.MEDIUM,
      lineHeight: LINE_HEIGHTS.RELAXED,
      fontSize: fontSizes.subtitle,
    },
    buttonStyles: {
      fontSize: fontSizes.button,
    },
    // Include mobile scaling for component use
    mobileScaling,
    fontSizes,
  };
};

/**
 * Get responsive container configuration with mobile scaling
 */
const getContainerConfig = (screen: any, theme: any) => {
  const mobileSize = getMobileSizeWithFallback(screen);
  const mobileScaling = getMobileScaling(mobileSize);

  // Container max width (string values)
  let containerMaxWidth: "xs" | "sm" | "md" | "lg" | "xl" | false;
  if (screen.isDesktop) {
    containerMaxWidth = "xl";
  } else if (screen.isTablet) {
    containerMaxWidth = "lg";
  } else if (screen.isSmallMobile) {
    containerMaxWidth = "xs";
  } else {
    containerMaxWidth = "sm";
  }

  // Container padding using mobile scaling
  const basePadding = mobileScaling?.iconMargin || 0.5;
  const containerPadding = getResponsiveValue(
    {
      desktop: 0,
      tablet: 1,
      mobile: basePadding,
      smallMobile: basePadding * 0.5,
      default: 0,
    },
    screen
  );

  // Mobile container max width (string values)
  let mobileMaxWidth: string;
  if (screen.isSmallMobile) {
    mobileMaxWidth = "100%";
  } else {
    mobileMaxWidth = "500px";
  }

  // Mobile container padding using mobile scaling
  const mobilePadding = getResponsiveValue(
    {
      mobile: mobileScaling?.iconMargin ? mobileScaling.iconMargin * 2 : 2,
      smallMobile: mobileScaling?.iconMargin || 1,
      default: 2,
    },
    screen
  );

  return {
    containerMaxWidth,
    containerPadding,
    mobileMaxWidth,
    mobilePadding,
    mobileScaling,
  };
};

// ============================================================================
// ENHANCED PREMIUM FADE TRANSITION UTILITIES
// ============================================================================

// ============================================================================
// PREMIUM BLUR-TO-SHARP FADE TRANSITIONS FOR ALL DEVICES
// ============================================================================

// ============================================================================
// ENHANCED PREMIUM FADE TRANSITION UTILITIES - FIXED TYPES
// ============================================================================

/**
 * Consistent transition style interface
 */
interface TransitionStyles {
  opacity: number;
  transform: string;
  filter: string;
  transition: string;
}

/**
 * Get premium mobile fade styles with blur effects - CONSISTENT TYPES
 */
const getPremiumMobileFadeStyles = (
  phase: "idle" | "fadeOut" | "fadeIn"
): TransitionStyles => {
  const fadeOutDuration = 1000; // Slow fadeOut to appreciate blur effect
  const fadeInDuration = 800; // Faster fadeIn from blur to sharp
  const premiumEasing = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";

  switch (phase) {
    case "fadeOut":
      return {
        opacity: 0,
        transform: "translateX(0)", // Consistent transform property
        filter: "blur(4px)", // Strong blur during fadeOut
        transition: `opacity ${fadeOutDuration}ms ${premiumEasing}, transform ${fadeOutDuration}ms ${premiumEasing}, filter ${fadeOutDuration}ms ${premiumEasing}`,
      };
    case "fadeIn":
      return {
        opacity: 1,
        transform: "translateX(0)", // Consistent transform property
        filter: "blur(0px)", // Sharp final state
        transition: `opacity ${fadeInDuration}ms ${premiumEasing}, transform ${fadeInDuration}ms ${premiumEasing}, filter ${fadeInDuration}ms ${premiumEasing}`,
      };
    case "idle":
    default:
      return {
        opacity: 1,
        transform: "translateX(0)", // Consistent transform property
        filter: "blur(0px)",
        transition: `opacity ${fadeInDuration}ms ${premiumEasing}, transform ${fadeInDuration}ms ${premiumEasing}, filter ${fadeInDuration}ms ${premiumEasing}`,
      };
  }
};

/**
 * Get premium tablet fade styles with blur effects - CONSISTENT TYPES
 */
const getPremiumTabletFadeStyles = (
  phase: "idle" | "fadeOut" | "fadeIn"
): TransitionStyles => {
  const fadeOutDuration = 1200; // Slow fadeOut to appreciate blur effect
  const fadeInDuration = 900; // Faster fadeIn from blur to sharp
  const premiumEasing = "cubic-bezier(0.23, 1, 0.32, 1)";

  switch (phase) {
    case "fadeOut":
      return {
        opacity: 0,
        transform: "translateX(0)", // Consistent transform property
        filter: "blur(5px)", // Strong blur during fadeOut
        transition: `opacity ${fadeOutDuration}ms ${premiumEasing}, transform ${fadeOutDuration}ms ${premiumEasing}, filter ${fadeOutDuration}ms ${premiumEasing}`,
      };
    case "fadeIn":
      return {
        opacity: 1,
        transform: "translateX(0)", // Consistent transform property
        filter: "blur(0px)", // Sharp final state
        transition: `opacity ${fadeInDuration}ms ${premiumEasing}, transform ${fadeInDuration}ms ${premiumEasing}, filter ${fadeInDuration}ms ${premiumEasing}`,
      };
    case "idle":
    default:
      return {
        opacity: 1,
        transform: "translateX(0)", // Consistent transform property
        filter: "blur(0px)",
        transition: `opacity ${fadeInDuration}ms ${premiumEasing}, transform ${fadeInDuration}ms ${premiumEasing}, filter ${fadeInDuration}ms ${premiumEasing}`,
      };
  }
};

/**
 * Get premium transition styles - enhanced blur-to-sharp for all devices - CONSISTENT TYPES
 */
const getTransitionStyles = (
  phase: "idle" | "fadeOut" | "fadeIn",
  layoutType: string
): TransitionStyles => {
  // Premium mobile fade with blur
  if (layoutType === "mobile") {
    return getPremiumMobileFadeStyles(phase);
  }

  // Premium tablet fade with blur
  if (layoutType === "tablet") {
    return getPremiumTabletFadeStyles(phase);
  }

  // Premium desktop transitions with enhanced blur effects
  const fadeOutDuration = 1500; // Even slower for desktop - appreciate the blur
  const fadeInDuration = 1800; // Slower fadeIn for luxury feel
  const premiumEasing = "cubic-bezier(0.25, 0.1, 0.25, 1)";
  const luxuryEasing = "cubic-bezier(0.165, 0.84, 0.44, 1)";

  switch (phase) {
    case "fadeOut":
      return {
        opacity: 0,
        transform: "translateX(-60px)",
        filter: "blur(6px)", // Strong blur for desktop
        transition: `opacity ${fadeOutDuration}ms ${premiumEasing}, transform ${fadeOutDuration}ms ${premiumEasing}, filter ${fadeOutDuration}ms ${premiumEasing}`,
      };
    case "fadeIn":
      return {
        opacity: 1,
        transform: "translateX(0)",
        filter: "blur(0px)", // Sharp final state
        transition: `opacity ${fadeInDuration}ms ${luxuryEasing}, transform ${fadeInDuration}ms ${luxuryEasing}, filter ${fadeInDuration}ms ${luxuryEasing}`,
      };
    case "idle":
    default:
      return {
        opacity: 1,
        transform: "translateX(0)",
        filter: "blur(0px)",
        transition: `opacity ${fadeInDuration}ms ${luxuryEasing}, transform ${fadeInDuration}ms ${luxuryEasing}, filter ${fadeInDuration}ms ${luxuryEasing}`,
      };
  }
};

// ============================================================================
// COMPONENT
// ============================================================================

export default function LeftTextSection({
  slideData, // Now required - data always comes from slider
  currentSlide = 0,
  totalSlides = 1,
  onSlideChange,
  transitionPhase = "idle",
}: LeftTextSectionProps) {
  const [scrollY, setScrollY] = useState(0);
  const screen = useScreenDetection();
  const theme = useTheme();
  const intl = useIntl();

  // Get layout configuration using all utilities
  const layoutType = useMemo(() => getLayoutType(screen), [screen]);
  const config = useMemo(() => getDeviceConfig(screen), [screen]);
  const spacingConfig = useMemo(
    () => getSpacingConfig(layoutType, screen, theme),
    [layoutType, screen, theme]
  );
  const animationConfig = useMemo(
    () => getAnimationTimingConfig(layoutType),
    [layoutType]
  );
  const enhancedStyling = useMemo(
    () => getEnhancedStyling(screen, theme),
    [screen, theme]
  );
  const containerConfig = useMemo(
    () => getContainerConfig(screen, theme),
    [screen, theme]
  );

  // Get content from slide data (always required now)
  const textContent = useMemo(() => {
    const base = getTextContent(slideData);
    if (!slideData.i18nKey) return base;
    const scope = `landing.${slideData.i18nKey}`;
    return {
      primary: intl.formatMessage({
        id: `${scope}.title`,
        defaultMessage: base.primary,
      }),
      secondarySmall: intl.formatMessage({
        id: `${scope}.subtitle`,
        defaultMessage: base.secondarySmall,
      }),
      secondaryLarge: base.secondaryLarge,
      subtitle: intl.formatMessage({
        id: `${scope}.description`,
        defaultMessage: base.subtitle,
      }),
    };
  }, [slideData, intl]);

  const buttonConfig = useMemo(() => {
    const base = getButtonConfig(slideData);
    if (!slideData.i18nKey) return base;
    const scope = `landing.${slideData.i18nKey}`;
    return {
      primary: {
        ...base.primary,
        text: intl.formatMessage({
          id: `${scope}.buttonText`,
          defaultMessage: base.primary.text,
        }),
      },
      secondary: {
        ...base.secondary,
        text: intl.formatMessage({
          id: `${scope}.secondaryButtonText`,
          defaultMessage: base.secondary.text,
        }),
      },
      showSecondaryButton: base.showSecondaryButton,
    };
  }, [slideData, intl]);

  // Scroll effect for desktop layout
  useEffect(() => {
    if (layoutType !== "desktop") return;

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [layoutType]);

  // ============================================================================
  // RENDER FUNCTIONS WITH PREMIUM FADE TRANSITIONS
  // ============================================================================

  /**
   * Render desktop layout with premium fade transitions
   */
  const renderDesktopLayout = () => (
    <Box
      sx={{
        ...getDesktopLayoutStyles(config, theme, scrollY),
        ...enhancedStyling.containerStyles,
        ...getTransitionStyles(transitionPhase, layoutType),
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        willChange: "opacity, transform, filter",
      }}
      className="text-fade-transition premium-text"
    >
      <Box
        sx={{
          textAlign: "left",
          maxWidth: "100%",
          position: "relative",
          width: "100%",
          ...(config.useHoverEffects &&
            transitionPhase === "idle" && {
              "&:hover": {
                "& .main-text": {
                  transform: "perspective(1000px) rotateX(0deg) scale(1.02)",
                  transition: ANIMATIONS.TRANSITION_SMOOTH,
                },
              },
            }),
        }}
      >
        {/* Integrated Slider Controls - Above Text (transition-aware) */}
        {onSlideChange && totalSlides > 1 && (
          <IntegratedSliderControls
            currentSlide={currentSlide}
            totalSlides={totalSlides}
            onSlideChange={onSlideChange}
            layoutType={layoutType}
            transitionPhase={transitionPhase}
          />
        )}

        {/* Hero Text with premium transition effects */}
        <Box
          sx={{
            opacity: transitionPhase === "fadeOut" ? 0.3 : 1,
            transform:
              transitionPhase === "fadeOut"
                ? "translateY(-20px)"
                : "translateY(0)",
            filter: transitionPhase === "fadeOut" ? "blur(1px)" : "blur(0)",
            transition:
              layoutType === "desktop"
                ? "opacity 1200ms cubic-bezier(0.25, 0.1, 0.25, 1), transform 1200ms cubic-bezier(0.25, 0.1, 0.25, 1), filter 1200ms cubic-bezier(0.25, 0.1, 0.25, 1)"
                : "none",
          }}
          className="premium-text"
        >
          <HeroText
            config={config}
            screen={screen}
            primaryText={textContent.primary}
            secondaryTextSmall={textContent.secondarySmall}
            secondaryTextLarge={textContent.secondaryLarge}
            showDecorativeLine={true}
            customSpacing={spacingConfig.hero}
            customAnimation={animationConfig.HERO}
          />
        </Box>

        {/* Subtitle with premium transition effects */}
        <Box
          sx={{
            mt: spacingConfig.buttons.marginTop,
            opacity: transitionPhase === "fadeOut" ? 0.3 : 1,
            transform:
              transitionPhase === "fadeOut"
                ? "translateY(-15px)"
                : "translateY(0)",
            filter: transitionPhase === "fadeOut" ? "blur(1px)" : "blur(0)",
            transition:
              layoutType === "desktop"
                ? "opacity 1200ms cubic-bezier(0.25, 0.1, 0.25, 1) 100ms, transform 1200ms cubic-bezier(0.25, 0.1, 0.25, 1) 100ms, filter 1200ms cubic-bezier(0.25, 0.1, 0.25, 1) 100ms"
                : "none",
          }}
          className="premium-text"
        >
          <Subtitle
            config={config}
            screen={screen}
            text={textContent.subtitle}
            customSpacing={spacingConfig.subtitle}
            customAnimation={animationConfig.SUBTITLE}
          />
        </Box>

        {/* Action Buttons with premium transition effects */}
        <Box
          sx={{
            mt: spacingConfig.buttons.marginTop,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            width: "100%",
            opacity: transitionPhase === "fadeOut" ? 0.3 : 1,
            transform:
              transitionPhase === "fadeOut"
                ? "translateY(-10px)"
                : "translateY(0)",
            filter: transitionPhase === "fadeOut" ? "blur(1px)" : "blur(0)",
            transition:
              layoutType === "desktop"
                ? "opacity 1200ms cubic-bezier(0.25, 0.1, 0.25, 1) 200ms, transform 1200ms cubic-bezier(0.25, 0.1, 0.25, 1) 200ms, filter 1200ms cubic-bezier(0.25, 0.1, 0.25, 1) 200ms"
                : "none",
          }}
          className="premium-text"
        >
          <ActionButtons
            config={config}
            screen={screen}
            primaryButton={buttonConfig.primary}
            secondaryButton={buttonConfig.secondary}
            showSecondaryButton={buttonConfig.showSecondaryButton}
            customSpacing={{ gap: spacingConfig.buttons.gap }}
            customAnimation={animationConfig.BUTTONS}
          />
        </Box>
      </Box>
    </Box>
  );

  /**
   * Render tablet layout with simple fade transitions (no position changes)
   */
  const renderTabletLayout = () => (
    <Box
      sx={{
        ...enhancedStyling.containerStyles,
        // Simple fade transition - no transform/filter
        ...getTransitionStyles(transitionPhase, layoutType),
        display: "flex",
        flexDirection: "column",
        height: "100%",
        alignItems: "center",
        gap: spacingConfig.buttons.marginTop,
        // Remove willChange for position-related properties
        willChange: "opacity",
      }}
      className="text-simple-fade"
    >
      {/* Slider Controls - Simple fade */}
      {onSlideChange && totalSlides > 1 && (
        <IntegratedSliderControls
          currentSlide={currentSlide}
          totalSlides={totalSlides}
          onSlideChange={onSlideChange}
          layoutType={layoutType}
          transitionPhase={transitionPhase}
        />
      )}

      {/* Content Container - No position changes */}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          gap: spacingConfig.buttons.marginTop,
        }}
      >
        {/* Left Section - Text Content, simple fade only */}
        <Box
          sx={{
            flex: "1 1 60%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "left",
            pr: theme.spacing(2),
            alignSelf: "center",
          }}
        >
          {/* Hero Text - Simple fade only */}
          <Box>
            <HeroText
              config={config}
              screen={screen}
              primaryText={textContent.primary}
              secondaryTextSmall={textContent.secondarySmall}
              secondaryTextLarge={textContent.secondaryLarge}
              showDecorativeLine={true}
              customSpacing={spacingConfig.hero}
              customAnimation={animationConfig.HERO}
            />
          </Box>

          {/* Subtitle - Simple fade only */}
          <Box
            sx={{
              mt: spacingConfig.buttons.marginTop,
            }}
          >
            <Subtitle
              config={config}
              screen={screen}
              text={textContent.subtitle}
              customSpacing={spacingConfig.subtitle}
              customAnimation={animationConfig.SUBTITLE}
            />
          </Box>
        </Box>

        {/* Right Section - Action Buttons, simple fade only */}
        <Box
          sx={{
            flex: "1 1 40%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "stretch",
            alignSelf: "center",
            pl: theme.spacing(2),
          }}
        >
          <ActionButtons
            config={config}
            screen={screen}
            primaryButton={buttonConfig.primary}
            secondaryButton={buttonConfig.secondary}
            showSecondaryButton={buttonConfig.showSecondaryButton}
            customSpacing={{ gap: spacingConfig.buttons.gap }}
            customAnimation={animationConfig.BUTTONS}
          />
        </Box>
      </Box>
    </Box>
  );

  /**
   * Render mobile layout with simple fade transitions (no position changes)
   */
  const renderMobileLayout = () => {
    // Use mobile scaling from spacingConfig to avoid redeclaration
    const { mobileScaling } = spacingConfig;

    return (
      <Box
        sx={{
          ...getContainerStyles(config, theme, screen),
          ...enhancedStyling.containerStyles,
          // Simple fade transition - no transform/filter
          ...getTransitionStyles(transitionPhase, layoutType),
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          // Remove willChange for position-related properties
          willChange: "opacity",
          // Apply mobile scaling throughout
          ...(mobileScaling && {
            fontSize: mobileScaling.fontSize,
            "& .MuiTypography-root": {
              fontSize: mobileScaling.fontSize,
            },
          }),
        }}
        className="text-simple-fade"
      >
        {/* Slider Controls - Simple fade */}
        {onSlideChange && totalSlides > 1 && (
          <Box
            sx={{
              alignSelf: "center",
            }}
          >
            <IntegratedSliderControls
              currentSlide={currentSlide}
              totalSlides={totalSlides}
              onSlideChange={onSlideChange}
              layoutType={layoutType}
              transitionPhase={transitionPhase}
            />
          </Box>
        )}

        {/* Content Section - No position changes */}
        <Box
          sx={{
            flex: "1 1 auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "left",
            // Apply mobile scaling to content spacing
            gap: mobileScaling?.iconMargin || 1,
          }}
        >
          {/* Hero Text - Simple fade only */}
          <Box>
            <HeroText
              config={config}
              screen={screen}
              primaryText={textContent.primary}
              secondaryTextSmall={textContent.secondarySmall}
              secondaryTextLarge={textContent.secondaryLarge}
              showDecorativeLine={true}
              customSpacing={spacingConfig.hero}
              customAnimation={animationConfig.HERO}
            />
          </Box>

          {/* Subtitle - Simple fade only */}
          <Box>
            <Subtitle
              config={config}
              screen={screen}
              text={textContent.subtitle}
              customSpacing={spacingConfig.subtitle}
              customAnimation={animationConfig.SUBTITLE}
            />
          </Box>
        </Box>

        {/* Buttons Section - Simple fade with mobile scaling */}
        <Box
          sx={{
            flex: "0 0 auto",
            mt: "5px",
            // Apply mobile scaling to button container
            ...(mobileScaling && {
              "& button": {
                fontSize: enhancedStyling.fontSizes.button,
                padding: mobileScaling.padding,
                minHeight:
                  mobileScaling.buttonSize === "compact" ? "32px" : "40px",
              },
              "& .MuiButton-root": {
                fontSize: enhancedStyling.fontSizes.button,
              },
            }),
          }}
        >
          <ActionButtons
            config={config}
            screen={screen}
            primaryButton={buttonConfig.primary}
            secondaryButton={buttonConfig.secondary}
            showSecondaryButton={buttonConfig.showSecondaryButton}
            customSpacing={{ gap: spacingConfig.buttons.gap }}
            customAnimation={animationConfig.BUTTONS}
          />
        </Box>
      </Box>
    );
  };

  // ============================================================================
  // MAIN RENDER WITH TRANSITION-AWARE CONTAINER LOGIC
  // ============================================================================

  const renderContent = () => {
    switch (layoutType) {
      case "desktop":
        return renderDesktopLayout();
      case "tablet":
        return renderTabletLayout();
      case "mobile":
      default:
        return renderMobileLayout();
    }
  };

  const content = renderContent();

  return config.useContainer ? (
    <Container
      maxWidth={containerConfig.containerMaxWidth}
      sx={{
        py: containerConfig.containerPadding,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        // Apply enhanced styling with mobile scaling and transition effects
        ...enhancedStyling.containerStyles,
        ...getTransitionStyles(transitionPhase, layoutType),
        // Apply mobile scaling to container
        ...(containerConfig.mobileScaling &&
          screen.isMobile && {
            fontSize: containerConfig.mobileScaling.fontSize,
            "& .MuiContainer-root": {
              padding: containerConfig.mobileScaling.padding,
            },
          }),
        // Enhanced transitions - simple for mobile/tablet, premium for desktop
        willChange:
          layoutType === "desktop" ? "opacity, transform, filter" : "opacity",
      }}
      className={`container-${layoutType === "desktop" ? "premium-fade" : "simple-fade"}-transition`}
    >
      {layoutType === "tablet" ? (
        content
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "stretch",
            height: "100%",
            flex: 1,
            // Enhanced mobile container styling with mobile scaling and transition effects
            ...(layoutType === "mobile" && {
              maxWidth: containerConfig.mobileMaxWidth,
              mx: "auto",
              px: containerConfig.mobilePadding,
              // Apply mobile scaling to inner container
              ...(containerConfig.mobileScaling && {
                fontSize: containerConfig.mobileScaling.fontSize,
                "& > *": {
                  fontSize: "inherit",
                },
              }),
            }),
          }}
        >
          {content}
        </Box>
      )}
    </Container>
  ) : (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        // Apply container styling with mobile scaling and transition effects
        ...enhancedStyling.containerStyles,
        ...getTransitionStyles(transitionPhase, layoutType),
        ...(enhancedStyling.mobileScaling &&
          screen.isMobile && {
            fontSize: enhancedStyling.mobileScaling.fontSize,
          }),
        // Enhanced transitions - simple for mobile/tablet, premium for desktop
        willChange:
          layoutType === "desktop" ? "opacity, transform, filter" : "opacity",
      }}
      className={`text-${layoutType === "desktop" ? "premium-fade" : "simple-fade"}-container`}
    >
      {content}
    </Box>
  );
}
