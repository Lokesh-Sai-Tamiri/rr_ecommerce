/**
 * @fileoverview Header section component with instant slide changes - no fade effects.
 * Features: Instant content swap with visible slider dot movement
 * Updated: Completely removed all fade/blur references for instant transitions
 */

"use client";

import { useState, useEffect, useCallback } from "react";

// material-ui
import Box from "@mui/material/Box";

// unified components
import LeftTextSection from "./components/LeftTextSection";
import RightImageSection from "./components/RightImageSection";

// centralized utilities
import { useScreenDetection, CSS_KEYFRAMES } from "./utils";

// Import slider data and configuration
import { SLIDER_DATA, SLIDER_CONFIG } from "./data/sliderData";

// Import swipe gesture hook
import { useSwipeGesture } from "./hooks/useSwipeGesture";
import { Grid } from "@mui/material";

// ============================================================================
// INSTANT TRANSITION SLIDER CONFIGURATION - NO FADE EFFECTS
// ============================================================================

const INSTANT_SLIDER_CONFIG = {
  ...SLIDER_CONFIG,
};

// ============================================================================
// TRANSITION PHASE TYPE - SIMPLIFIED
// ============================================================================

type TransitionPhase = "idle"; // Only idle state needed - no fade phases

/**
 * Instant transition header section with no fade effects
 */
export default function HeaderSection() {
  const screen = useScreenDetection();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [transitionPhase] = useState<TransitionPhase>("idle"); // Always idle
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Instant slide change - no fade effects
  const handleSlideChange = useCallback(
    (newSlideIndex: number) => {
      if (isTransitioning || newSlideIndex === currentSlide) return;

      // Brief transition lock to prevent rapid clicking
      setIsTransitioning(true);

      // INSTANT content change - no fade effects
      setCurrentSlide(newSlideIndex);

      // Brief delay to allow UI to update
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50); // Minimal delay just for UI stability
    },
    [currentSlide, isTransitioning]
  );

  // Auto-slide functionality with instant changes
  useEffect(() => {
    if (isTransitioning) return;

    const interval = setInterval(() => {
      handleSlideChange((currentSlide + 1) % SLIDER_DATA.length);
    }, INSTANT_SLIDER_CONFIG.autoSlideInterval);

    return () => clearInterval(interval);
  }, [currentSlide, isTransitioning, handleSlideChange]);

  // Manual slide navigation
  const goToSlide = useCallback(
    (slideIndex: number) => {
      handleSlideChange(slideIndex);
    },
    [handleSlideChange]
  );

  const nextSlide = useCallback(() => {
    handleSlideChange((currentSlide + 1) % SLIDER_DATA.length);
  }, [currentSlide, handleSlideChange]);

  const prevSlide = useCallback(() => {
    handleSlideChange(
      (currentSlide - 1 + SLIDER_DATA.length) % SLIDER_DATA.length
    );
  }, [currentSlide, handleSlideChange]);

  // Swipe gesture support
  const { ref: swipeRef } = useSwipeGesture({
    onSwipeLeft: nextSlide,
    onSwipeRight: prevSlide,
    threshold: INSTANT_SLIDER_CONFIG.swipeThreshold,
    trackTouch: INSTANT_SLIDER_CONFIG.enableSwipe,
    trackMouse: false,
  });

  // Keyboard navigation
  useEffect(() => {
    if (!INSTANT_SLIDER_CONFIG.enableKeyboard) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          prevSlide();
          break;
        case "ArrowRight":
          e.preventDefault();
          nextSlide();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isTransitioning, nextSlide, prevSlide]);

  // Enhanced desktop detection
  const shouldUseDesktopLayout = useCallback(() => {
    if (screen.isDesktop) return true;
    if (screen.isIPad && screen.isLandscape) return true;
    if (screen.isIpadPro && screen.isLandscape) return true;
    if (screen.isTabletLandscape) return true;
    return false;
  }, [screen]);

  const shouldUseMobileLayout = useCallback(() => {
    if (shouldUseDesktopLayout()) return false;
    if (screen.isMobile) return true;
    if (screen.isSmallMobile && !screen.isTablet) return true;
    return false;
  }, [screen, shouldUseDesktopLayout]);

  const shouldUseTabletLayout = useCallback(() => {
    if (shouldUseDesktopLayout() || shouldUseMobileLayout()) return false;
    if (screen.isTablet && screen.isPortrait) return true;
    if (screen.isIPad && screen.isPortrait) return true;
    if (screen.isIpadPro && screen.isPortrait) return true;
    return false;
  }, [screen, shouldUseDesktopLayout, shouldUseMobileLayout]);

  // Get current slide data
  const currentSlideData = SLIDER_DATA[currentSlide];

  return (
    <>
      {/* Main Content Area - Responsive Layout */}
      <Box
        ref={swipeRef}
        component="section"
        sx={{
          flex: 1,
          width: "100%",
          minHeight: "100vh",
          position: "relative",
          pt: { xs: "5px" },
          px: 0,
          overflow: "visible", // Changed from hidden to visible to allow animations
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
        }}
        aria-label={INSTANT_SLIDER_CONFIG.ariaLabels.slider}
      >
        {/* Mobile - Sequential Layout with Instant Changes */}
        {shouldUseMobileLayout() && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "100%",
              gap: 0,
              pb: "50px",
              flex: 1,
              position: "relative",
              overflow: "visible", // Changed from hidden to visible
            }}
          >
            {/* Content Container for Mobile */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%",
              }}
            >
              <RightImageSection
                slideData={currentSlideData.imageContent}
                transitionPhase={transitionPhase}
              />

              <LeftTextSection
                slideData={currentSlideData.textContent}
                currentSlide={currentSlide}
                totalSlides={SLIDER_DATA.length}
                onSlideChange={goToSlide}
                transitionPhase={transitionPhase}
              />
            </Box>
          </Box>
        )}

        {/* Tablet Portrait - Sequential Layout with Instant Changes */}
        {shouldUseTabletLayout() && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "100%",
              gap: 2,
              pb: "80px",
              flex: 1,
              position: "relative",
              overflow: "visible", // Changed from hidden to visible
            }}
          >
            {/* Content Container for Tablet */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%",
                gap: 2,
              }}
            >
              <RightImageSection
                slideData={currentSlideData.imageContent}
                transitionPhase={transitionPhase}
              />
              <LeftTextSection
                slideData={currentSlideData.textContent}
                currentSlide={currentSlide}
                totalSlides={SLIDER_DATA.length}
                onSlideChange={goToSlide}
                transitionPhase={transitionPhase}
              />
            </Box>
          </Box>
        )}

        {/* Desktop + All Landscapes - Split Layout with Instant Changes */}
        {shouldUseDesktopLayout() && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%", // Changed from 100vw to 100% to prevent horizontal scroll
              height: "100vh",
              maxHeight: "100vh",
              overflow: "visible", // Changed from hidden to visible to allow animations
              position: "relative",
              padding: 0,
              margin: 0,
              alignItems: "stretch",
              justifyContent: "stretch",
            }}
          >
            <Grid container spacing={2} sx={{ width: "100%", height: "100%" }}>
              <Grid size={{ xs: 12, md: 8 }}>
                <LeftTextSection
                  slideData={currentSlideData.textContent}
                  currentSlide={currentSlide}
                  totalSlides={SLIDER_DATA.length}
                  onSlideChange={goToSlide}
                  transitionPhase={transitionPhase}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <RightImageSection
                  slideData={currentSlideData.imageContent}
                  transitionPhase={transitionPhase}
                />
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>

      {/* Clean CSS - No Fade Effects - Only Applied to Landing Page Content */}
      <style jsx global>
        {`
          ${CSS_KEYFRAMES}

          /* IMPORTANT: EXCLUDE NewsMarquee and ChatbotButton from animation restrictions */
          /* Allow NewsMarquee animations to work properly - target all possible class patterns */
          [class*="NewsMarquee"] *,
          [class*="MarqueeContent"] *,
          [class*="MarqueeWrapper"] *,
          [class*="ChatbotButton"] *,
          [data-testid*="marquee"] *,
          [data-testid*="chatbot"] *,
          [data-component="news-marquee"] *,
          [data-testid="marquee-content"] *,
          [data-testid="marquee-wrapper"] *,
          /* Target MUI styled components for NewsMarquee */
          [class*="css-"][data-testid*="marquee"] *,
          [class*="css-"][class*="marquee"] *,
          /* Target any element with animation property containing 'marquee' */
          [style*="animation"][style*="marquee"] *,
          [style*="animation"][style*="translateX"] * {
            animation: unset !important;
            transition: unset !important;
            transform: unset !important;
          }

          /* Specific NewsMarquee animation overrides - ensure marquee animation works */
          [class*="MarqueeContent"],
          [data-testid="marquee-content"],
          [data-component="news-marquee"] [class*="css-"],
          [class*="css-"][style*="animation"],
          [style*="translateX"] {
            animation: unset !important;
            transform: unset !important;
            will-change: transform !important;
          }

          /* Ensure ChatbotButton rotating animation works */
          [class*="ChatbotButton"] [class*="rotate"],
          [class*="ChatbotButton"] .MuiFab-root,
          [class*="ChatbotButton"] svg {
            animation: unset !important;
            transition: unset !important;
            transform: unset !important;
          }

          /* Force NewsMarquee components to ignore landing page animation restrictions */
          .landing-page [class*="NewsMarquee"] *,
          .landing-page [class*="MarqueeContent"] *,
          .landing-page [class*="MarqueeWrapper"] *,
          .landing-page [data-component="news-marquee"] *,
          .landing-page [data-testid="marquee-content"] *,
          .landing-page [data-testid="marquee-wrapper"] *,
          .landing-page [style*="animation"] {
            animation: unset !important;
            transition: unset !important;
            transform: unset !important;
            will-change: transform !important;
          }

          /* INSTANT TRANSITIONS - NO FADE EFFECTS - SCOPED TO LANDING PAGE ONLY */

          /* Remove transition effects only from landing page content */
          .landing-page .instant-text-container,
          .landing-page .instant-image-container,
          .landing-page .instant-image {
            transition: none !important;
            animation: none !important;
            filter: none !important;
            opacity: 1 !important;
            transform: none !important;
            will-change: auto !important;
          }

          /* Clean slider controls - minimal transitions only for dots */
          .landing-page .instant-slider-controls {
            transition: none !important;
            opacity: 1 !important;
          }

          /* Enhanced dot visibility for clear movement tracking */
          .landing-page .instant-dot {
            transition:
              background-color 150ms ease,
              border-color 150ms ease,
              transform 150ms ease !important;
            opacity: 1 !important;
          }

          .landing-page .instant-dot:hover {
            transition:
              background-color 100ms ease,
              border-color 100ms ease,
              transform 100ms ease !important;
          }

          /* Clean image loading - only for loading state */
          .landing-page .instant-image {
            transition: opacity 200ms ease !important;
          }

          .landing-page .instant-image[src] {
            opacity: 1 !important;
          }

          /* Clean loading states */
          .landing-page .instant-image:not([src]),
          .landing-page .instant-image[src=""] {
            opacity: 0.3 !important;
            transition: opacity 200ms ease !important;
          }

          /* Remove all blur effects - only from landing page */
          .landing-page .instant-text-container *,
          .landing-page .instant-image-container * {
            filter: none !important;
          }

          /* Clean scrollbar */
          .landing-page .slider-content::-webkit-scrollbar-thumb {
            transition: background 100ms ease;
          }

          /* Clean focus states */
          .landing-page .slider-control:focus-visible {
            outline: 2px solid #1976d2;
            outline-offset: 2px;
            transition: outline 100ms ease;
          }

          /* Respect reduced motion preferences - but exclude NewsMarquee and ChatbotButton */
          @media (prefers-reduced-motion: reduce) {
            .landing-page
              *:not([class*="NewsMarquee"]):not([class*="MarqueeContent"]):not(
                [class*="MarqueeWrapper"]
              ):not([class*="ChatbotButton"]):not([data-testid*="marquee"]):not(
                [data-testid*="chatbot"]
              ):not([style*="animation"]):not([style*="translateX"]) {
              transition: none !important;
              animation: none !important;
            }
            /* Ensure NewsMarquee still works even with reduced motion */
            .landing-page [class*="NewsMarquee"] *,
            .landing-page [class*="MarqueeContent"] *,
            .landing-page [style*="animation"] {
              animation: unset !important;
              transition: unset !important;
            }
          }

          /* Clean performance - no special optimizations needed */
          .landing-page .instant-text-container,
          .landing-page .instant-image-container {
            contain: layout style;
            isolation: auto;
            will-change: auto;
            backface-visibility: visible;
            perspective: none;
          }

          /* Clean hover states (minimal) */
          @media (hover: hover) {
            .landing-page .instant-dot:hover {
              transform: scale(1.2);
            }
          }

          /* Clean touch device optimizations */
          @media (hover: none) and (pointer: coarse) {
            .landing-page .instant-text-container,
            .landing-page .instant-image-container {
              -webkit-tap-highlight-color: transparent;
              touch-action: pan-y;
            }
          }

          /* Clean accessibility */
          .landing-page .instant-text-container[aria-hidden="true"],
          .landing-page .instant-image-container[aria-hidden="true"] {
            opacity: 0 !important;
            transition: none !important;
          }

          /* Override any inherited transitions - only in landing page */
          .landing-page .instant-text-container *,
          .landing-page .instant-image-container *,
          .landing-page .instant-image * {
            transition: none !important;
            animation: none !important;
            filter: none !important;
            transform: none !important;
          }

          /* Exception: Keep minimal transitions for interactive elements */
          .landing-page .instant-dot,
          .landing-page .slider-control,
          .landing-page button,
          .landing-page a {
            transition: all 150ms ease !important;
          }

          /* Ensure content is always visible - only in landing page */
          .landing-page .instant-text-container,
          .landing-page .instant-image-container,
          .landing-page .instant-image {
            opacity: 1 !important;
            visibility: visible !important;
            filter: none !important;
            transform: none !important;
          }

          /* Debug mode for instant transitions */
          .landing-page .debug-instant-mode {
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 255, 0, 0.9);
            color: black;
            padding: 8px 12px;
            border-radius: 4px;
            font-family: monospace;
            font-size: 12px;
            z-index: 9999;
            pointer-events: none;
          }

          .landing-page .debug-instant-mode::before {
            content: "🚀 INSTANT MODE: No Fade Effects";
          }

          /* Clean up any remaining transition artifacts */
          .landing-page .instant-text-container.idle,
          .landing-page .instant-image-container.idle {
            opacity: 1 !important;
            filter: none !important;
            transform: none !important;
            transition: none !important;
            animation: none !important;
            will-change: auto !important;
          }

          /* Ensure slider controls work immediately */
          .landing-page .instant-dot:active {
            transform: scale(0.95) !important;
            transition: transform 50ms ease !important;
          }

          /* Clean button states */
          .landing-page .slider-button {
            transition:
              background-color 150ms ease,
              color 150ms ease,
              border-color 150ms ease !important;
          }

          .landing-page .slider-button:hover {
            transition:
              background-color 100ms ease,
              color 100ms ease,
              border-color 100ms ease !important;
          }

          /* Override any framework transitions - only in landing page */
          .landing-page .MuiBox-root.instant-text-container,
          .landing-page .MuiBox-root.instant-image-container {
            transition: none !important;
          }

          /* Clean Material-UI overrides - only in landing page - exclude NewsMarquee */
          .landing-page
            .MuiContainer-root:not([class*="NewsMarquee"]):not(
              [class*="MarqueeContent"]
            ):not([class*="MarqueeWrapper"]),
          .landing-page
            .MuiTypography-root:not([class*="NewsMarquee"]):not(
              [class*="MarqueeContent"]
            ):not([class*="MarqueeWrapper"]) {
            transition: none !important;
          }

          /* Ensure NewsMarquee MUI components work properly */
          .landing-page [class*="NewsMarquee"] .MuiBox-root,
          .landing-page [class*="MarqueeContent"] .MuiBox-root,
          .landing-page [class*="MarqueeWrapper"] .MuiBox-root,
          .landing-page [class*="NewsMarquee"] .MuiTypography-root,
          .landing-page [class*="NewsMarquee"] .MuiLink-root {
            animation: initial !important;
            transition: initial !important;
            transform: initial !important;
          }

          /* Exception: Keep Material-UI component transitions */
          .landing-page .MuiButton-root,
          .landing-page .MuiIconButton-root,
          .landing-page .MuiTooltip-tooltip {
            transition: all 150ms ease !important;
          }

          /* Clean custom properties */
          :root {
            --instant-transition: none;
            --instant-opacity: 1;
            --instant-filter: none;
            --instant-transform: none;
          }

          /* Apply clean properties - only in landing page */
          .landing-page .instant-text-container,
          .landing-page .instant-image-container {
            transition: var(--instant-transition) !important;
            opacity: var(--instant-opacity) !important;
            filter: var(--instant-filter) !important;
            transform: var(--instant-transform) !important;
          }

          /* Clean state management */
          .landing-page .instant-transition-complete {
            filter: none !important;
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
            will-change: auto !important;
            animation: none !important;
          }

          /* Clean high refresh rate displays */
          @media (min-resolution: 120dpi) {
            .landing-page .instant-text-container,
            .landing-page .instant-image-container {
              transform: none !important;
            }
          }

          /* Clean print styles */
          @media print {
            .landing-page .instant-text-container,
            .landing-page .instant-image-container,
            .landing-page .instant-image,
            .landing-page .instant-slider-controls {
              transition: none !important;
              animation: none !important;
              filter: none !important;
              transform: none !important;
              opacity: 1 !important;
            }
          }

          /* Clean dark mode */
          @media (prefers-color-scheme: dark) {
            .landing-page .debug-instant-mode {
              background: rgba(255, 255, 255, 0.9);
              color: black;
            }
          }

          /* Ensure all content loads instantly - only in landing page */
          .landing-page .instant-content-loaded {
            opacity: 1 !important;
            filter: none !important;
            transform: none !important;
            transition: none !important;
          }

          /* Clean loading skeleton - no animation */
          .landing-page .instant-loading-skeleton {
            background: rgba(255, 255, 255, 0.1);
            animation: none !important;
          }

          /* Clean error states - no transitions */
          .landing-page .instant-error {
            filter: grayscale(100%) !important;
            opacity: 0.5 !important;
            transition: none !important;
          }

          /* Clean success states - no transitions */
          .landing-page .instant-success {
            filter: none !important;
            opacity: 1 !important;
            transition: none !important;
          }

          /* Container queries - no effects */
          @container (max-width: 400px) {
            .landing-page .instant-text-container,
            .landing-page .instant-image-container {
              transition: none !important;
              filter: none !important;
              opacity: 1 !important;
            }
          }

          @container (min-width: 1200px) {
            .landing-page .instant-text-container,
            .landing-page .instant-image-container {
              transition: none !important;
              filter: none !important;
              opacity: 1 !important;
            }
          }

          /* Clean animation performance - disable all */
          .landing-page .instant-text-container,
          .landing-page .instant-image-container {
            contain: none;
            isolation: auto;
          }

          /* Clean typography - no transitions */
          .landing-page .instant-text {
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
          }

          /* Final cleanup - ensure no fade references remain - only in landing page */
          .landing-page .no-fade,
          .landing-page .instant-mode,
          .landing-page .clean-transition {
            transition: none !important;
            animation: none !important;
            filter: none !important;
            opacity: 1 !important;
            transform: none !important;
            will-change: auto !important;
          }
        `}
      </style>
    </>
  );
}
