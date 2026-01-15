/**
 * @fileoverview Slider data configuration
 * Contains all slide content and configuration options
 * Updated: Enhanced for slower, smoother transitions with multiple button support
 * Integrated hero content from removed heroContent.ts
 */

// ============================================================================
// SLIDER DATA
// ============================================================================

export const SLIDER_DATA = [
  {
    id: 1,
    textContent: {
      i18nKey: "slider.1",
      title: "Partnering Your Research",
      subtitle: "Illuminating Innovation",
      description: "Partner with us for research excellence.",
      buttonText: "Explore Research",
      // Secondary button from hero content
      secondaryButtonText: "View Gallery",
      showSecondaryButton: true,
    },
    imageContent: {
      src: "/assets/images/landing/slider/slide-1.png",
      alt: "Research Partnership",
      title: "Partnering Your Research",
    },
  },
  {
    id: 2,
    textContent: {
      i18nKey: "slider.2",
      title: "Ayush Products",
      subtitle: "Traditional Medicines",
      description: "Premium Ayush based medicine products.",
      buttonText: "Learn More",
      secondaryButtonText: "Contact Us",
      showSecondaryButton: true,
    },
    imageContent: {
      src: "/assets/images/landing/slider/slide-2.png",
      alt: "Ayush Services",
      title: "Ayush Services",
    },
  },
  {
    id: 3,
    textContent: {
      i18nKey: "slider.3",
      title: "Clinical Research",
      subtitle: "Human Trial Excellence",
      description: "Professional clinical research and trials.",
      buttonText: "Learn More",
      secondaryButtonText: "Contact Us",
      showSecondaryButton: true,
    },
    imageContent: {
      src: "/assets/images/landing/slider/slide-3.png",
      alt: "Clinical Research",
      title: "Clinical Research",
    },
  },
  {
    id: 4,
    textContent: {
      i18nKey: "slider.4",
      title: "Cosmetics & Personal Care",
      subtitle: "Beauty Through Science",
      description: "Advanced cosmetic solutions.",
      buttonText: "Learn More",
      secondaryButtonText: "Contact Us",
      showSecondaryButton: true,
    },
    imageContent: {
      src: "/assets/images/landing/slider/slide-4.png",
      alt: "Cosmetics & Personal Care",
      title: "Cosmetics & Personal Care",
    },
  },
  {
    id: 5,
    textContent: {
      i18nKey: "slider.5",
      title: "Drug Testing Lab",
      subtitle: "Precision Testing Services",
      description: "State of the art drug testing services.",
      buttonText: "Learn More",
      secondaryButtonText: "Contact Us",
      showSecondaryButton: true,
    },
    imageContent: {
      src: "/assets/images/landing/slider/slide-5.png",
      alt: "Drug Testing Lab",
      title: "Drug Testing Lab",
    },
  },
  {
    id: 6,
    textContent: {
      i18nKey: "slider.6",
      title: "Herbal & Naturals",
      subtitle: "Nature Based Solutions",
      description: "Premium herbal and natural products.",
      buttonText: "Learn More",
      secondaryButtonText: "Contact Us",
      showSecondaryButton: true,
    },
    imageContent: {
      src: "/assets/images/landing/slider/slide-6.png",
      alt: "Herbal & Naturals",
      title: "Herbal & Naturals",
    },
  },
  {
    id: 7,
    textContent: {
      i18nKey: "slider.7",
      title: "Invitro Services",
      subtitle: "Advanced Laboratory Testing",
      description: "Comprehensive in-vitro testing & research.",
      buttonText: "Learn More",
      secondaryButtonText: "Contact Us",
      showSecondaryButton: true,
    },
    imageContent: {
      src: "/assets/images/landing/slider/slide-7.png",
      alt: "Invitro Services",
      title: "Invitro Services",
    },
  },
  {
    id: 8,
    textContent: {
      i18nKey: "slider.8",
      title: "Nutraceuticals Products",
      subtitle: "Health & Wellness Products",
      description: "Premium nutraceutical solutions.",
      buttonText: "Learn More",
      secondaryButtonText: "Contact Us",
      showSecondaryButton: true,
    },
    imageContent: {
      src: "/assets/images/landing/slider/slide-8.png",
      alt: "Nutraceuticals Services",
      title: "Nutraceuticals Services",
    },
  },
  {
    id: 9,
    textContent: {
      i18nKey: "slider.9",
      title: "Pharmaceutical Services",
      subtitle: "Innovative Drug Solutions",
      description: "Cutting edge pharmaceutical research.",
      buttonText: "Learn More",
      secondaryButtonText: "Contact Us",
      showSecondaryButton: true,
    },
    imageContent: {
      src: "/assets/images/landing/slider/slide-9.png",
      alt: "Pharmaceutical Services",
      title: "Pharmaceutical Services",
    },
  },
];

// ============================================================================
// SLIDER CONFIGURATION - ENHANCED FOR SMOOTH TRANSITIONS
// ============================================================================

export const SLIDER_CONFIG = {
  // Timing - Enhanced for smoother experience
  autoSlideInterval: 5000, // Increased from 5s to 6s for more viewing time
  transitionDuration: 1500, // Increased from 800ms to 1500ms for smoother transitions

  // Behavior - Updated to disable pause on hover
  pauseOnHover: false, // Changed from true to false
  enableSwipe: true,
  enableKeyboard: true,
  loop: true,

  // Visual - Updated to remove unwanted elements
  showProgressBar: false,
  showControls: false,
  showIndicators: true,
  showCounter: false, // Changed from true to false

  // Swipe settings
  swipeThreshold: 50,

  // Animation - Enhanced easing curves
  easing: "cubic-bezier(0.23, 1, 0.32, 1)", // Premium easing curve

  // Enhanced transition settings
  transitions: {
    // Different transition speeds for different screen sizes
    mobile: {
      duration: 1200,
      easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    },
    tablet: {
      duration: 1400,
      easing: "cubic-bezier(0.23, 1, 0.32, 1)",
    },
    desktop: {
      duration: 1800,
      easing: "cubic-bezier(0.23, 1, 0.32, 1)",
    },
  },

  // Accessibility
  ariaLabels: {
    slider: "Image and text content slider",
    playButton: "Play slideshow",
    pauseButton: "Pause slideshow",
    nextButton: "Next slide",
    prevButton: "Previous slide",
    indicator: "Go to slide",
  },
};

// ============================================================================
// SEO & META DATA (from integrated hero content)
// ============================================================================

export const LANDING_META = {
  TITLE: "Partnering Your Research - Radiant Research",
  DESCRIPTION:
    "Illuminating Innovation Through Research Excellence. Partner with us for cutting-edge research solutions.",
  KEYWORDS: [
    "research",
    "innovation",
    "partnership",
    "scientific",
    "excellence",
  ],

  // Button configurations for internal links
  BUTTON_CONFIGS: {
    EXPLORE_RESEARCH: {
      HREF: "/about_us",
      TARGET: "_self",
      REL: undefined,
    },
    VIEW_GALLERY: {
      HREF: "/gallery",
      TARGET: "_self",
      REL: undefined,
    },
  },
} as const;

// Export individual sections for easier imports
export const SLIDER_META = LANDING_META;
