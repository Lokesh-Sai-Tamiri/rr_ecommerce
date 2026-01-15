/**
 * @fileoverview Enhanced theme-aware utilities
 * Consolidated from aboutUtils.ts for consistency
 */

import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/material/styles";
import {
  ScreenDetection,
  getMobileSizeWithFallback,
  getMobileScaling,
} from "./screenUtils";
import { gridSpacing } from "store/constant";

// Add this function to your existing themeUtils.ts file, in the THEME UTILITIES section
/**
 * Get button styles for legacy compatibility
 * Used by legacy buttonStyles.ts file
 */
export const getButtonStyles = (
  variant: "filled" | "transparent" | "outlined",
  screen: ScreenDetection,
  theme?: Theme
): SxProps<Theme> => {
  // Use theme parameter or get from hook context
  const currentTheme = theme || ({} as Theme);
  const mobileScaling = getMobileScaling(getMobileSizeWithFallback(screen));

  const baseStyles: SxProps<Theme> = {
    fontFamily: currentTheme.typography?.fontFamily || "inherit",
    fontWeight: currentTheme.typography?.fontWeightMedium || 500,
    borderRadius: currentTheme.shape?.borderRadius || 8,
    textTransform: "none",
    transition:
      currentTheme.transitions?.create(["all"], {
        duration: currentTheme.transitions?.duration?.short || 250,
      }) || "all 0.25s ease",

    // Mobile-specific sizing
    ...(screen.isMobile && {
      fontSize: mobileScaling?.fontSize || "0.875rem",
      padding: mobileScaling?.padding || "8px 16px",
    }),

    // Desktop/Tablet sizing
    ...(!screen.isMobile && {
      fontSize: screen.isDesktop ? "1rem" : "0.95rem",
      padding: screen.isDesktop ? "12px 24px" : "10px 20px",
    }),
  };

  switch (variant) {
    case "filled":
      return {
        ...baseStyles,
        backgroundColor: currentTheme.palette?.primary?.main || "#1976d2",
        color: currentTheme.palette?.primary?.contrastText || "#ffffff",
        border: "none",
        "&:hover": {
          backgroundColor: currentTheme.palette?.primary?.dark || "#1565c0",
          transform: "translateY(-2px)",
          boxShadow: currentTheme.shadows?.[4] || "0 4px 8px rgba(0,0,0,0.2)",
        },
      };

    case "outlined":
      return {
        ...baseStyles,
        backgroundColor: "transparent",
        color: currentTheme.palette?.primary?.main || "#1976d2",
        border: `2px solid ${currentTheme.palette?.primary?.main || "#1976d2"}`,
        "&:hover": {
          backgroundColor: currentTheme.palette?.primary?.main || "#1976d2",
          color: currentTheme.palette?.primary?.contrastText || "#ffffff",
          transform: "translateY(-2px)",
          boxShadow: currentTheme.shadows?.[4] || "0 4px 8px rgba(0,0,0,0.2)",
        },
      };

    case "transparent":
      return {
        ...baseStyles,
        backgroundColor: "transparent",
        color: currentTheme.palette?.text?.primary || "#000000",
        border: "2px solid transparent",
        "&:hover": {
          backgroundColor: `${currentTheme.palette?.primary?.main || "#1976d2"}10`,
          borderColor: currentTheme.palette?.primary?.main || "#1976d2",
          transform: "translateY(-2px)",
        },
      };

    default:
      return baseStyles;
  }
};

// ============================================================================
// INTERFACES & TYPES
// ============================================================================

/**
 * About section configuration interface
 */
export interface AboutConfig {
  fontSizes: {
    title: Record<string, string>;
    icon: string;
  };
  cardPadding: string | number;
  subtitleVariant: string;
  subtitleFontSize: string;
  subtitleAnimation: string;
  contentIndent?: string | number;
}

// ============================================================================
// HERO & TITLE UTILITIES
// ============================================================================

/**
 * Get company title styles for CompanyIntro component
 * Used by About section company introduction
 */
export const getTitleStyles = (
  screen: ScreenDetection,
  theme: Theme,
  options: {
    use3DEffects?: boolean;
    customAnimation?: {
      delay?: string;
      duration?: string;
    };
    fontSizeOverride?: string; // Add font size override option
  } = {}
): SxProps<Theme> => {
  const { use3DEffects, customAnimation, fontSizeOverride } = options;

  // Animation configuration
  const delay = customAnimation?.delay || "0.8s";
  const duration = customAnimation?.duration || "0.8s";
  const animation = `fadeInUp ${duration} ease-out ${delay} both`;

  // Get font sizes from getThemeFontSizes
  const fontSizes = getThemeFontSizes("HERO", screen, theme);

  return {
    fontWeight: theme.typography.fontWeightBold || 700,
    fontFamily: theme.typography.fontFamily,
    lineHeight: theme.typography.h1.lineHeight || 1.2,
    marginBottom: theme.spacing(2),
    color: theme.palette.text.primary,
    animation,

    // Use font sizes from getThemeFontSizes or override
    fontSize: fontSizeOverride || fontSizes,

    // 3D Effects (optional)
    ...(use3DEffects &&
      screen.isDesktop && {
        transform: "perspective(1000px) rotateX(5deg)",
        transformOrigin: "center bottom",
        transition: theme.transitions.create(["transform", "text-shadow"], {
          duration: theme.transitions.duration.standard,
          easing: theme.transitions.easing.easeInOut,
        }),
        cursor: "default",
        "&:hover": {
          transform: "perspective(1000px) rotateX(0deg) scale(1.02)",
          textShadow: `0 4px 8px ${theme.palette.text.primary}40`,
        },
      }),
  };
};

// ============================================================================
// THEME UTILITIES
// ============================================================================

/**
 * Get theme-aware font sizes for different component types
 */
export const getThemeFontSizes = (
  type: "HERO" | "SUBTITLE" | "ICON" | "BUTTON",
  screen: ScreenDetection,
  theme: Theme
): string | Record<string, string> => {
  const mobileSize = getMobileSizeWithFallback(screen);
  const mobileScaling = getMobileScaling(mobileSize);

  switch (type) {
    case "HERO":
      if (screen.isMobile) {
        return { xs: "1.5rem", sm: "1.75rem" }; // Same for both orientations
      } else if (screen.isDesktop) {
        return { lg: "2rem", md: "2.75rem", xl: "3.25rem" };
      } else {
        return { xs: "1.5rem", md: "2.75rem", sm: "1.75rem" };
      }

    case "SUBTITLE":
      if (screen.isDesktop || screen.isTablet) {
        return "inherit";
      }
      return mobileScaling?.fontSize || "0.875rem";

    case "ICON":
      if (screen.isDesktop) return "2rem";
      return mobileScaling?.iconSize || "1.75rem";

    case "BUTTON":
      if (screen.isDesktop || screen.isTablet) {
        return "inherit";
      }
      return mobileScaling?.fontSize || "0.875rem";

    default:
      return theme.typography.body1.fontSize as string;
  }
};

/**
 * Get theme-aware spacing for different component types
 */
export const getThemeSpacing = (
  type:
    | "CONTENT_INDENT"
    | "LINE_WIDTH"
    | "CARD_PADDING"
    | "SECTION_PADDING"
    | "BUTTON_GAP"
    | "GRID_SPACING",
  screen: ScreenDetection,
  theme: Theme
): string | number => {
  const mobileSize = getMobileSizeWithFallback(screen);

  switch (type) {
    case "CONTENT_INDENT":
      if (screen.isDesktop) return theme.spacing(10);
      if (screen.isTablet) return theme.spacing(8);
      // Mobile: scale based on mobile size
      if (mobileSize === "small") return theme.spacing(6);
      if (mobileSize === "medium") return theme.spacing(7);
      if (mobileSize === "large") return theme.spacing(8);
      return theme.spacing(6);

    case "LINE_WIDTH":
      if (screen.isDesktop) return "60px";
      if (screen.isTablet) return "40px";
      // Mobile: scale based on mobile size
      if (mobileSize === "small") return "30px";
      if (mobileSize === "medium") return "35px";
      if (mobileSize === "large") return "40px";
      return "30px";

    case "CARD_PADDING":
      return theme.spacing(
        screen.isDesktop
          ? gridSpacing + 1
          : screen.isTablet
            ? gridSpacing
            : gridSpacing - 1
      );

    case "SECTION_PADDING":
      if (screen.isDesktop) return theme.spacing(8);
      if (screen.isTablet) return theme.spacing(6);
      if (mobileSize === "small") return theme.spacing(4);
      if (mobileSize === "medium") return theme.spacing(5);
      if (mobileSize === "large") return theme.spacing(6);
      return theme.spacing(4);

    case "BUTTON_GAP":
      if (screen.isDesktop) return theme.spacing(2);
      if (screen.isTablet) return theme.spacing(1.5);
      // Mobile: scale based on mobile size
      if (mobileSize === "small") return theme.spacing(1);
      if (mobileSize === "medium") return theme.spacing(1.25);
      if (mobileSize === "large") return theme.spacing(1.5);
      return theme.spacing(1);

    case "GRID_SPACING":
      if (screen.isDesktop) return theme.spacing(4);
      if (screen.isTablet) return theme.spacing(3);
      // Mobile: scale based on mobile size
      if (mobileSize === "small") return theme.spacing(2);
      if (mobileSize === "medium") return theme.spacing(2.5);
      if (mobileSize === "large") return theme.spacing(3);
      return theme.spacing(2);

    default:
      return theme.spacing(2);
  }
};

/**
 * Get theme-aware button styles
 */
export const getThemeButtonStyles = (
  variant: "filled" | "outlined" | "transparent",
  screen: ScreenDetection,
  theme: Theme
): SxProps<Theme> => {
  const mobileScaling = getMobileScaling(getMobileSizeWithFallback(screen));

  const baseStyles: SxProps<Theme> = {
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightMedium || 500,
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create(["all"], {
      duration: theme.transitions.duration.short,
    }),
    // Mobile-specific sizing
    ...(screen.isMobile && {
      fontSize: mobileScaling?.fontSize || "0.875rem",
      padding: mobileScaling?.padding || "8px 16px",
    }),
  };

  switch (variant) {
    case "filled":
      return {
        ...baseStyles,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        "&:hover": {
          backgroundColor: theme.palette.primary.dark,
          transform: "translateY(-2px)",
          boxShadow: theme.shadows[4],
        },
      };

    case "outlined":
      return {
        ...baseStyles,
        backgroundColor: "transparent",
        color: theme.palette.primary.main,
        border: `2px solid ${theme.palette.primary.main}`,
        "&:hover": {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          transform: "translateY(-2px)",
          boxShadow: theme.shadows[4],
        },
      };

    case "transparent":
      return {
        ...baseStyles,
        backgroundColor: "transparent",
        color: theme.palette.text.primary,
        border: `2px solid transparent`,
        "&:hover": {
          backgroundColor: `${theme.palette.primary.main}10`,
          borderColor: theme.palette.primary.main,
          transform: "translateY(-2px)",
        },
      };

    default:
      return baseStyles;
  }
};

// ============================================================================
// ABOUT SECTION UTILITIES
// ============================================================================

/**
 * Get about section configuration based on screen detection
 * Removed mobile landscape special handling
 */
export const getAboutConfig = (
  screen: ScreenDetection,
  theme: Theme
): AboutConfig => {
  const mobileSize = getMobileSizeWithFallback(screen);
  const mobileScaling = getMobileScaling(mobileSize);

  // Create responsive font sizes - removed mobile landscape special case
  let titleFontSizes: Record<string, string>;

  if (screen.isDesktop) {
    titleFontSizes = {
      lg: (theme.typography.h1.fontSize as string) || "3rem",
      xl: "3.25rem",
    };
  } else if (screen.isIpadPro && screen.isPortrait) {
    // iPad Pro Portrait uses same font size as desktop for consistency
    titleFontSizes = {
      lg: (theme.typography.h1.fontSize as string) || "3rem",
      xl: "3.25rem",
    };
  } else {
    // Mobile (both portrait AND landscape) and other tablets use same font sizes
    titleFontSizes = {
      xs: (theme.typography.h4.fontSize as string) || "1.5rem",
      sm: (theme.typography.h3.fontSize as string) || "1.75rem",
    };
  }

  const fontSizes = {
    title: titleFontSizes,
    icon: screen.isDesktop ? "2rem" : "1.75rem",
  };

  // Use theme spacing system
  const cardPadding = theme.spacing(
    screen.isDesktop
      ? gridSpacing + 1
      : screen.isTablet
        ? gridSpacing
        : gridSpacing - 1
  );

  const subtitleVariant = screen.isDesktop ? "h6" : "body1";
  const subtitleFontSize =
    screen.isDesktop || screen.isTablet
      ? (theme.typography.h6.fontSize as string) || "1.25rem"
      : mobileScaling?.fontSize ||
        (theme.typography.body2.fontSize as string) ||
        "0.875rem";

  // Animation timing
  const animationDuration = screen.isDesktop ? "0.8s" : "0.6s";
  const animationDelay = screen.isDesktop ? "0.5s" : "0.4s";
  const subtitleAnimation = `fadeInUp ${animationDuration} ease-out ${animationDelay} both`;

  // Content indent for subtitle positioning
  const contentIndent = theme.spacing(
    screen.isDesktop ? 10 : screen.isTablet ? 8 : 6
  );

  return {
    fontSizes,
    cardPadding,
    subtitleVariant,
    subtitleFontSize,
    subtitleAnimation,
    contentIndent,
  };
};

/**
 * Get about section background styles
 * Consolidated from aboutUtils.ts
 */
export const getAboutBackgroundStyles = (
  screen: ScreenDetection
): SxProps<Theme> => ({
  minHeight: "auto",
  width: "100%",
  backgroundImage: `url('/assets/images/home-bg.png')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundAttachment: screen.isMobile || screen.isTablet ? "scroll" : "fixed",
  display: "flex",
  alignItems: "flex-start",
  position: "relative",
  "&::before, &::after": {
    display: "none !important",
  },
});

/**
 * Get about card styles using theme system
 * Consolidated and enhanced from aboutUtils.ts
 */
export const getAboutCardStyles =
  (screen: ScreenDetection, theme: Theme) =>
  (index: number): SxProps<Theme> => ({
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(gridSpacing),
    transition: theme.transitions.create(
      ["transform", "box-shadow", "border-color"],
      {
        duration: theme.transitions.duration.standard,
        easing: theme.transitions.easing.easeInOut,
      }
    ),
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[2],
    position: "relative",
    overflow: "hidden",
    width: "100%",
    animation: `fadeInUp 0.8s ease-out ${0.6 + index * 0.2}s both`,
    "&:hover": screen.isDesktop
      ? {
          transform: "translateY(-8px) scale(1.01)",
          boxShadow: theme.shadows[8],
          borderColor: theme.palette.primary.light,
        }
      : {
          transform: "translateY(-4px)",
          boxShadow: theme.shadows[4],
        },
  });

/**
 * Get enhanced about card styles with better visibility
 * Alternative version for better card definition
 */
export const getEnhancedAboutCardStyles =
  (screen: ScreenDetection, theme: Theme) =>
  (index: number): SxProps<Theme> => ({
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(gridSpacing),
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.mode === "dark" ? theme.palette.grey[700] : theme.palette.grey[200]}`,
    boxShadow: theme.shadows[3],
    position: "relative",
    overflow: "hidden",
    width: "100%",
    animation: `fadeInUp 0.8s ease-out ${0.6 + index * 0.2}s both`,
    transition: theme.transitions.create(
      ["transform", "box-shadow", "border-color"],
      {
        duration: theme.transitions.duration.standard,
        easing: theme.transitions.easing.easeInOut,
      }
    ),
    "&:hover": screen.isDesktop
      ? {
          transform: "translateY(-6px)",
          boxShadow: theme.shadows[10],
          borderColor: theme.palette.primary.light,
        }
      : {
          transform: "translateY(-3px)",
          boxShadow: theme.shadows[6],
        },
  });

/**
 * Get responsive grid spacing for about cards
 */
export const getAboutGridSpacing = (screen: ScreenDetection): number => {
  const mobileSize = getMobileSizeWithFallback(screen);
  if (screen.isDesktop) return 4;
  if (screen.isTablet) return 3;
  // Mobile: scale based on mobile size
  if (mobileSize === "small") return 2;
  if (mobileSize === "medium") return 2.5;
  if (mobileSize === "large") return 3;
  return 2;
};

/**
 * Get responsive container max width
 */
export const getAboutContainerWidth = (screen: ScreenDetection): string => {
  const mobileSize = getMobileSizeWithFallback(screen);
  if (screen.isDesktop) return "lg";
  if (screen.isTablet) return "md";
  if (mobileSize === "small") return "xs";
  if (mobileSize === "medium") return "sm";
  if (mobileSize === "large") return "sm";
  return "xs";
};

/**
 * Get responsive section padding
 */
export const getAboutSectionPadding = (
  screen: ScreenDetection,
  theme: Theme
) => {
  const mobileSize = getMobileSizeWithFallback(screen);

  if (screen.isDesktop) {
    return {
      py: theme.spacing(8),
      px: theme.spacing(4),
    };
  }

  if (screen.isTablet) {
    return {
      py: theme.spacing(6),
      px: theme.spacing(3),
    };
  }

  // Mobile: scale based on mobile size
  const getPadding = () => {
    if (mobileSize === "small") {
      return {
        py: theme.spacing(4),
        px: theme.spacing(2),
      };
    }
    if (mobileSize === "medium") {
      return {
        py: theme.spacing(5),
        px: theme.spacing(2.5),
      };
    }
    if (mobileSize === "large") {
      return {
        py: theme.spacing(6),
        px: theme.spacing(3),
      };
    }
    return {
      py: theme.spacing(4),
      px: theme.spacing(2),
    };
  };

  return getPadding();
};

/**
 * Get responsive typography variants for about section
 */
export const getAboutTypographyVariants = (screen: ScreenDetection) => {
  const mobileSize = getMobileSizeWithFallback(screen);

  if (screen.isDesktop) {
    return {
      title: "h2",
      subtitle: "h5",
      cardTitle: "h6",
      cardContent: "body1",
    };
  }

  if (screen.isTablet) {
    return {
      title: "h3",
      subtitle: "h6",
      cardTitle: "subtitle1",
      cardContent: "body2",
    };
  }

  // Mobile: scale based on mobile size
  if (mobileSize === "small") {
    return {
      title: "h4",
      subtitle: "body1",
      cardTitle: "subtitle2",
      cardContent: "body2",
    };
  }
  if (mobileSize === "medium") {
    return {
      title: "h4",
      subtitle: "subtitle1",
      cardTitle: "subtitle1",
      cardContent: "body2",
    };
  }
  if (mobileSize === "large") {
    return {
      title: "h3",
      subtitle: "h6",
      cardTitle: "subtitle1",
      cardContent: "body1",
    };
  }

  return {
    title: "h4",
    subtitle: "body1",
    cardTitle: "subtitle2",
    cardContent: "body2",
  };
};

// ============================================================================
// SUBTITLE UTILITIES
// ============================================================================

/**
 * Get shared subtitle styles for both text section and company intro
 * Consolidated from subtitle.ts and aboutUtils.ts
 */
export const getSubtitleStyles = (
  screen: ScreenDetection,
  theme: Theme,
  options: {
    customSpacing?: {
      marginBottom?: number;
      marginTop?: number;
      marginLeft?: number;
    };
    customAnimation?: {
      delay?: string;
      duration?: string;
    };
    textAlign?: "left" | "center" | "right";
    contentIndent?: string | number;
    maxWidth?: string;
  } = {}
) => {
  const {
    customSpacing,
    customAnimation,
    textAlign = "left",
    contentIndent,
    maxWidth,
  } = options;

  // Get mobile size for responsive spacing calculations
  const mobileSize = getMobileSizeWithFallback(screen);

  // Get subtitle variant (same logic as Subtitle.tsx)
  const getSubtitleVariant = () => {
    if (screen.isDesktop) return "subtitleLarge";
    return "subtitleMedium";
  };

  // Get responsive font size from getThemeFontSizes
  const getFontSize = () => {
    // Use getThemeFontSizes for consistent font sizing
    const themeFontSize = getThemeFontSizes("SUBTITLE", screen, theme);

    // If getThemeFontSizes returns 'inherit', use variant default
    if (themeFontSize === "inherit") {
      return "inherit";
    }

    // Otherwise use the font size from getThemeFontSizes
    return themeFontSize;
  };

  // Calculate responsive spacing
  const getMarginLeft = () => {
    if (customSpacing?.marginLeft !== undefined) {
      return theme.spacing(customSpacing.marginLeft);
    }
    if (contentIndent) {
      return contentIndent;
    }
    if (textAlign === "center") {
      return "auto"; // Center alignment
    }
    // Use getThemeSpacing for consistent spacing
    return getThemeSpacing("CONTENT_INDENT", screen, theme);
  };

  // Get responsive margin bottom based on mobile size
  const getMarginBottom = () => {
    if (customSpacing?.marginBottom !== undefined) {
      return theme.spacing(customSpacing.marginBottom);
    }

    if (screen.isDesktop) {
      return theme.spacing(4);
    }

    if (screen.isTablet) {
      return theme.spacing(1);
    }

    // Mobile: scale based on mobile size
    if (mobileSize === "small") {
      return theme.spacing(0); // iPhone SE - keep minimal
    } else if (mobileSize === "medium") {
      return theme.spacing(0.5); // iPhone 12 Pro - slightly more
    } else if (mobileSize === "large") {
      return theme.spacing(1); // Large phones - more spacing
    }

    return theme.spacing(0); // Default fallback
  };

  // Get responsive margin top based on mobile size
  const getMarginTop = () => {
    if (customSpacing?.marginTop !== undefined) {
      return theme.spacing(customSpacing.marginTop);
    }

    if (screen.isDesktop || screen.isTablet) {
      return theme.spacing(1);
    }

    // Mobile: scale based on mobile size
    if (mobileSize === "small") {
      return theme.spacing(0); // iPhone SE - keep minimal
    } else if (mobileSize === "medium") {
      return theme.spacing(0.5); // iPhone 12 Pro - slightly more
    } else if (mobileSize === "large") {
      return theme.spacing(1); // Large phones - more spacing
    }

    return theme.spacing(0); // Default fallback
  };

  // Animation configuration
  const getAnimation = () => {
    const delay =
      customAnimation?.delay || (screen.isDesktop ? "0.5s" : "0.4s");
    const duration = customAnimation?.duration || "0.8s";
    return `fadeInUp ${duration} ease-out ${delay} both`;
  };

  return {
    variant: getSubtitleVariant(),
    sx: {
      mb: getMarginBottom(),
      mt: getMarginTop(),
      color: theme.palette.text.primary,
      lineHeight: 1.8,
      animation: getAnimation(),
      marginLeft: getMarginLeft(),
      fontSize: getFontSize(), // Now uses getThemeFontSizes
      fontFamily: theme.typography.fontFamily,
      fontWeight: theme.typography.fontWeightMedium || 500,
      textAlign,
      ...(maxWidth && {
        maxWidth,
        mx: textAlign === "center" ? "auto" : undefined,
      }),
    } as SxProps<Theme>,
  };
};

// ============================================================================
// PERFORMANCE UTILITIES
// ============================================================================

/**
 * Get optimized styles for performance-critical components
 * Memoized style generation for frequently re-rendered components
 */
export const getOptimizedStyles = (
  componentType: "HERO" | "SUBTITLE" | "CARD" | "BUTTON",
  screen: ScreenDetection,
  theme: Theme,
  options: Record<string, any> = {}
): SxProps<Theme> => {
  // Base optimization: only include styles that actually change
  const baseOptimizations = {
    willChange: "transform, opacity",
    backfaceVisibility: "hidden" as const,
    perspective: 1000,
  };

  switch (componentType) {
    case "HERO":
      return {
        ...baseOptimizations,
        ...getTitleStyles(screen, theme, options),
      };

    case "SUBTITLE":
      const subtitleStyles = getSubtitleStyles(screen, theme, options);
      return {
        ...baseOptimizations,
        ...subtitleStyles.sx,
      };

    case "CARD":
      const cardStylesFunction = getAboutCardStyles(screen, theme);
      return {
        ...baseOptimizations,
        ...cardStylesFunction(options.index || 0),
      };

    case "BUTTON":
      return {
        ...baseOptimizations,
        ...getThemeButtonStyles(options.variant || "filled", screen, theme),
      };

    default:
      return baseOptimizations;
  }
};

// ============================================================================
// LEGACY COMPATIBILITY
// ============================================================================

/**
 * Legacy compatibility function for existing components
 * Maintains backward compatibility while providing new functionality
 */
export const getLegacyCompatibleStyles = (
  type: string,
  screen: ScreenDetection,
  theme: Theme
): SxProps<Theme> => {
  // Map legacy type names to new system
  const typeMapping: Record<string, string> = {
    heroText: "HERO",
    subtitleText: "SUBTITLE",
    aboutCard: "CARD",
    actionButton: "BUTTON",
  };

  const mappedType = typeMapping[type] || type.toUpperCase();

  switch (mappedType) {
    case "HERO":
      return getTitleStyles(screen, theme);
    case "SUBTITLE":
      return getSubtitleStyles(screen, theme).sx;
    case "CARD":
      return getAboutCardStyles(screen, theme)(0);
    case "BUTTON":
      return getThemeButtonStyles("filled", screen, theme);
    default:
      return {};
  }
};
