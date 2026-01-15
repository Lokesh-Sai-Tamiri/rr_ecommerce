/**
 * @fileoverview Image section component with instant transitions - no fade effects
 * Updated: Removed all fade/blur effects for instant slide changes
 */

'use client';

import { useState, useEffect, useMemo } from 'react';
import { Box, useTheme } from '@mui/material';

// centralized utilities
import { useScreenDetection, getResponsiveValue } from '../utils';

// ============================================================================
// INTERFACES
// ============================================================================

interface ImageSlideData {
  src: string;
  alt: string;
  title: string;
}

interface RightImageSectionProps {
  slideData?: ImageSlideData;
  transitionPhase?: 'idle'; // Only idle state for instant transitions
}

interface ImageConfig {
  container: {
    width: string;
    height: string;
    justifyContent: string;
    alignItems: string;
    overflow: string;
    padding: number;
    margin: number;
    left?: string;
    transform?: string;
  };
  image: {
    maxWidth: string;
    maxHeight: string;
    objectFit: 'contain' | 'cover';
    objectPosition: string;
    borderRadius: number;
    transformOrigin: string;
  };
  effects: {
    useParallax: boolean;
    useHover: boolean;
    useBorderRadius: boolean;
    useFilter: boolean;
    parallaxIntensity: number;
    hoverScale: number;
  };
  positioning: {
    marginLeft: string | number;
    marginRight: string | number;
    rightOffset?: string;
    additionalTransform?: string;
  };
}

// ============================================================================
// DEFAULT SLIDE DATA
// ============================================================================

const DEFAULT_SLIDE_DATA: ImageSlideData = {
  src: '/assets/images/research-1.png',
  alt: 'Research Laboratory',
  title: 'Research Excellence'
};

// ============================================================================
// INSTANT CONFIGURATION FUNCTIONS - NO TRANSITION EFFECTS
// ============================================================================

/**
 * Get image configuration based on device type using centralized utilities
 */
const getImageConfiguration = (screen: any, theme: any): ImageConfig => {
  // Use responsive values for consistent configuration - ALL STRING VALUES
  const containerWidth = getResponsiveValue(
    {
      desktop: '100%', // Use full width of the right-aligned container
      tablet: '100%',
      mobile: '100%',
      default: '100%'
    },
    screen
  );

  const containerHeight = getResponsiveValue(
    {
      desktop: '100%', // Use full height of container
      tablet: '100%',
      mobile: '100%',
      default: '100%'
    },
    screen
  );

  const justifyContent = getResponsiveValue(
    {
      desktop: 'flex-end', // Right align within the container
      tablet: 'flex-end',
      mobile: 'flex-end',
      default: 'center'
    },
    screen
  );

  const maxWidth = getResponsiveValue(
    {
      desktop: '90%', // Use most of container width
      tablet: '70%',
      mobile: '75%',
      smallMobile: '80%',
      default: '75%'
    },
    screen
  );

  const maxHeight = getResponsiveValue(
    {
      desktop: '85%',
      tablet: '70%',
      mobile: '75%',
      smallMobile: '70%',
      default: '75%'
    },
    screen
  );

  const objectPosition = getResponsiveValue(
    {
      desktop: 'center right', // Right-aligned content
      tablet: 'center center',
      mobile: 'center center',
      default: 'center center'
    },
    screen
  );

  const transformOrigin = getResponsiveValue(
    {
      desktop: 'center right', // Scale from right edge
      tablet: 'center center',
      mobile: 'center center',
      default: 'center center'
    },
    screen
  );

  // Effects configuration - DIRECT VALUES, NOT getResponsiveValue
  const useParallax = screen.isDesktop;
  const useHover = screen.isDesktop;
  const useBorderRadius = screen.isDesktop;
  const useFilter = false; // NO FILTERS for instant transitions

  // Numeric values - handle directly without getResponsiveValue
  const parallaxIntensity = screen.isDesktop ? -0.05 : 0;
  const hoverScale = screen.isDesktop ? 1.02 : screen.isTablet ? 1.01 : 1;

  // Positioning configuration - MIXED TYPES, handle carefully
  const marginLeft = screen.isDesktop ? 'auto' : 0; // Push to right on desktop
  const marginRight = screen.isDesktop ? 0 : 0; // No gap from right edge

  // Container positioning for non-desktop
  const containerTransform = !screen.isDesktop
    ? {
        left: '50%',
        transform: 'translateX(-50%)'
      }
    : {};

  return {
    container: {
      width: containerWidth,
      height: containerHeight,
      justifyContent,
      alignItems: 'center',
      overflow: 'hidden',
      padding: 0,
      margin: 0,
      ...containerTransform
    },
    image: {
      maxWidth,
      maxHeight,
      objectFit: 'contain',
      objectPosition,
      borderRadius: useBorderRadius ? (theme.shape.borderRadius as number) : 0,
      transformOrigin
    },
    effects: {
      useParallax,
      useHover,
      useBorderRadius,
      useFilter,
      parallaxIntensity,
      hoverScale
    },
    positioning: {
      marginLeft,
      marginRight
      // Removed aggressive positioning - let container handle alignment
    }
  };
};

/**
 * Get container styles using theme and configuration
 */
const getContainerStyles = (config: ImageConfig, theme: any) => ({
  width: config.container.width,
  height: config.container.height,
  display: 'flex',
  alignItems: config.container.alignItems,
  justifyContent: config.container.justifyContent,
  backgroundColor: 'transparent',
  padding: theme.spacing(config.container.padding),
  margin: theme.spacing(config.container.margin),
  overflow: config.container.overflow,
  minHeight: config.container.height === '100%' ? '60vh' : 'auto',
  // Apply container transform if exists
  ...(config.container.left && { left: config.container.left }),
  ...(config.container.transform && { transform: config.container.transform })
});

/**
 * Get image styles using theme and configuration - INSTANT DISPLAY ONLY
 */
const getImageStyles = (config: ImageConfig, theme: any, scrollY: number) => {
  const baseTransform = config.effects.useParallax ? `translateY(${scrollY * config.effects.parallaxIntensity}px)` : '';

  return {
    width: '75%',
    height: 'auto',
    maxWidth: config.image.maxWidth,
    maxHeight: config.image.maxHeight,
    objectFit: config.image.objectFit,
    objectPosition: config.image.objectPosition,
    display: 'block',
    borderRadius: config.image.borderRadius,
    transformOrigin: config.image.transformOrigin,
    willChange: 'auto', // No special optimizations needed

    // Positioning
    marginLeft: config.positioning.marginLeft,
    marginRight: config.positioning.marginRight,

    // INSTANT DISPLAY - NO TRANSITION EFFECTS
    opacity: 1,
    filter: 'none',
    transform: baseTransform,
    transition: 'none',

    // Effects (only apply when idle)
    ...(config.effects.useFilter && {
      filter: 'contrast(1.05)'
    }),

    // Hover effects (minimal)
    ...(config.effects.useHover && {
      '&:hover': {
        transform: `${baseTransform} scale(${config.effects.hoverScale})`,
        transition: 'transform 200ms ease' // Only for hover
      }
    })
  };
};

// ============================================================================
// COMPONENT
// ============================================================================

export default function RightImageSection({ slideData, transitionPhase = 'idle' }: RightImageSectionProps) {
  const [scrollY, setScrollY] = useState(0);
  const screen = useScreenDetection();
  const theme = useTheme();

  // Use provided slide data or default
  const currentSlideData = slideData || DEFAULT_SLIDE_DATA;

  // Get configuration using centralized utilities
  const config = useMemo(() => getImageConfiguration(screen, theme), [screen, theme]);

  // Parallax scroll effect
  useEffect(() => {
    if (!config.effects.useParallax) return;

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [config.effects.useParallax]);

  // Get styles using configuration - INSTANT DISPLAY
  const containerStyles = useMemo(() => getContainerStyles(config, theme), [config, theme]);
  const imageStyles = useMemo(() => getImageStyles(config, theme, scrollY), [config, theme, scrollY]);

  return (
    <Box
      sx={{
        ...containerStyles,
        // INSTANT DISPLAY - NO TRANSITION EFFECTS
        opacity: 1,
        filter: 'none',
        transform: 'none',
        transition: 'none',
        willChange: 'auto'
      }}
      className="instant-image-container"
    >
      {/* Image with instant display - no loading state */}
      <Box
        component="img"
        src={currentSlideData.src}
        alt={currentSlideData.alt}
        title={currentSlideData.title}
        sx={{
          ...imageStyles,
          // Instant display - no loading effects
          opacity: 1,
          transition: 'none'
        }}
        className="instant-image"
      />
    </Box>
  );
}
