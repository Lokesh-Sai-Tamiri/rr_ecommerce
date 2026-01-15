/**
 * @fileoverview Performance and accessibility utilities
 * Fixed: All ESLint warnings including unused variables
 */

import { useMemo, useCallback, useRef, useEffect, useState } from 'react';
import type { ScreenDetection } from './screenUtils';
import { getMobileSizeWithFallback, getMobileScaling, useScreenDetection } from './screenUtils';

/**
 * Performance configuration interface
 */
export interface PerformanceConfig {
  shouldUseParallax: boolean;
  shouldUseAnimations: boolean;
  shouldPreloadImages: boolean;
  maxImageQuality: 'low' | 'medium' | 'high';
  enableLazyLoading: boolean;
}

/**
 * Accessibility configuration interface
 */
export interface AccessibilityConfig {
  minTouchTarget: string;
  focusRingSize: number;
  highContrastMode: boolean;
  reducedMotion: boolean;
}

/**
 * Component style configuration interface
 */
export interface ComponentStyleConfig {
  padding: string;
  maxWidth?: string;
  cardGap?: string;
  iconSize?: string;
}

/**
 * Valid component names for styling
 */
export type ComponentName = 'LeftTextSection' | 'AboutSection' | 'FooterSection';

/**
 * Component style map with enhanced mobile scaling support
 */
const COMPONENT_STYLE_MAP: Record<ComponentName, (screen: ScreenDetection) => ComponentStyleConfig> = {
  LeftTextSection: (screen: ScreenDetection) => {
    const mobileSize = getMobileSizeWithFallback(screen);

    if (screen.isDesktop) {
      return {
        padding: '2rem 4rem',
        maxWidth: '100%'
      };
    }

    if (screen.isTablet) {
      return {
        padding: '1.5rem 2rem',
        maxWidth: '600px'
      };
    }

    const getPadding = () => {
      if (mobileSize === 'small') return '0.75rem';
      if (mobileSize === 'medium') return '1rem';
      if (mobileSize === 'large') return '1.25rem';
      return '1rem';
    };

    const getMaxWidth = () => {
      if (mobileSize === 'small') return '400px';
      if (mobileSize === 'medium') return '450px';
      if (mobileSize === 'large') return '500px';
      return '450px';
    };

    return {
      padding: getPadding(),
      maxWidth: getMaxWidth()
    };
  },

  AboutSection: (screen: ScreenDetection) => {
    const mobileSize = getMobileSizeWithFallback(screen);

    if (screen.isDesktop) {
      return {
        padding: '3rem 2rem',
        cardGap: '2rem'
      };
    }

    if (screen.isTablet) {
      return {
        padding: '2rem 1.5rem',
        cardGap: '1.5rem'
      };
    }

    const getPadding = () => {
      if (mobileSize === 'small') return '1rem 0.75rem';
      if (mobileSize === 'medium') return '1.25rem 1rem';
      if (mobileSize === 'large') return '1.5rem 1rem';
      return '1.25rem 1rem';
    };

    const getCardGap = () => {
      if (mobileSize === 'small') return '0.75rem';
      if (mobileSize === 'medium') return '1rem';
      if (mobileSize === 'large') return '1.25rem';
      return '1rem';
    };

    return {
      padding: getPadding(),
      cardGap: getCardGap()
    };
  },

  FooterSection: (screen: ScreenDetection) => {
    const mobileSize = getMobileSizeWithFallback(screen);
    const mobileScaling = getMobileScaling(mobileSize);

    if (screen.isDesktop) {
      return {
        padding: '1.5rem 2rem',
        iconSize: '24px'
      };
    }

    if (screen.isTablet) {
      return {
        padding: '1rem',
        iconSize: '20px'
      };
    }

    return {
      padding: '1rem',
      iconSize: mobileScaling?.iconSize || '18px'
    };
  }
};

/**
 * Get performance configuration based on device
 */
export const getPerformanceConfig = (screen: ScreenDetection): PerformanceConfig => {
  const mobileSize = getMobileSizeWithFallback(screen);

  return {
    shouldUseParallax: screen.isDesktop,
    shouldUseAnimations: !screen.isSmallMobile,
    shouldPreloadImages: screen.isDesktop,
    maxImageQuality: screen.isDesktop ? 'high' : screen.isTablet ? 'medium' : mobileSize === 'large' ? 'medium' : 'low',
    enableLazyLoading: !screen.isDesktop
  };
};

/**
 * Get accessibility configuration based on device
 */
export const getAccessibilityConfig = (screen: ScreenDetection): AccessibilityConfig => {
  const mobileSize = getMobileSizeWithFallback(screen);

  const getMinTouchTarget = () => {
    if (screen.isDesktop) return '40px';
    if (screen.isTablet) return '44px';
    if (mobileSize === 'small') return '44px';
    if (mobileSize === 'medium') return '46px';
    if (mobileSize === 'large') return '48px';
    return '44px';
  };

  const getFocusRingSize = () => {
    if (screen.isDesktop) return 2;
    if (screen.isTablet) return 3;
    if (mobileSize === 'small') return 2;
    if (mobileSize === 'medium') return 3;
    if (mobileSize === 'large') return 3;
    return 3;
  };

  return {
    minTouchTarget: getMinTouchTarget(),
    focusRingSize: getFocusRingSize(),
    highContrastMode: false,
    reducedMotion: false
  };
};

/**
 * Get component-specific styles with proper type safety
 */
export const getComponentStyles = (componentName: ComponentName, screen: ScreenDetection): ComponentStyleConfig => {
  const styleGenerator = COMPONENT_STYLE_MAP[componentName];
  return styleGenerator ? styleGenerator(screen) : { padding: '1rem' };
};

/**
 * Check if component name is valid
 */
export const isValidComponentName = (name: string): name is ComponentName => {
  return name in COMPONENT_STYLE_MAP;
};

/**
 * Get component styles with fallback for invalid names
 */
export const getComponentStylesSafe = (componentName: string, screen: ScreenDetection): ComponentStyleConfig => {
  if (isValidComponentName(componentName)) {
    return getComponentStyles(componentName, screen);
  }

  const mobileSize = getMobileSizeWithFallback(screen);

  const getFallbackPadding = () => {
    if (screen.isDesktop) return '2rem';
    if (screen.isTablet) return '1.5rem';
    if (mobileSize === 'small') return '0.75rem';
    if (mobileSize === 'medium') return '1rem';
    if (mobileSize === 'large') return '1.25rem';
    return '1rem';
  };

  return {
    padding: getFallbackPadding()
  };
};

/**
 * Get all available component names
 */
export const getAvailableComponentNames = (): ComponentName[] => {
  return Object.keys(COMPONENT_STYLE_MAP) as ComponentName[];
};

/**
 * Performance optimization utilities
 */
export const PerformanceUtils = {
  shouldReduceAnimations: (screen: ScreenDetection): boolean => {
    const mobileSize = getMobileSizeWithFallback(screen);
    return screen.isSmallMobile || (screen.isLandscape && screen.isMobile) || mobileSize === 'small';
  },

  getImageLoadingStrategy: (screen: ScreenDetection): 'eager' | 'lazy' => {
    return screen.isDesktop ? 'eager' : 'lazy';
  },

  getBundleLoadingStrategy: (screen: ScreenDetection): 'sync' | 'async' => {
    return screen.isDesktop ? 'sync' : 'async';
  },

  shouldPreloadCriticalResources: (screen: ScreenDetection): boolean => {
    return screen.isDesktop;
  },

  getAnimationDuration: (screen: ScreenDetection): string => {
    const mobileSize = getMobileSizeWithFallback(screen);

    if (screen.isDesktop) return '0.8s';
    if (screen.isTablet) return '0.6s';
    if (mobileSize === 'small') return '0.4s';
    if (mobileSize === 'medium') return '0.5s';
    if (mobileSize === 'large') return '0.6s';
    return '0.5s';
  }
};

/**
 * Accessibility utilities
 */
export const AccessibilityUtils = {
  getDeviceAriaLabel: (screen: ScreenDetection): string => {
    if (screen.isDesktop) return 'Desktop view';
    if (screen.isTablet) return 'Tablet view';
    return 'Mobile view';
  },

  getFocusStrategy: (screen: ScreenDetection): 'keyboard' | 'touch' | 'hybrid' => {
    if (screen.isDesktop) return 'keyboard';
    if (screen.isTablet) return 'hybrid';
    return 'touch';
  },

  getAccessibleFontSize: (baseFontSize: string, screen: ScreenDetection): string => {
    const mobileSize = getMobileSizeWithFallback(screen);

    const getMultiplier = () => {
      if (screen.isDesktop) return 1.0;
      if (screen.isTablet) return 1.05;
      if (mobileSize === 'small') return 1.1;
      if (mobileSize === 'medium') return 1.08;
      if (mobileSize === 'large') return 1.05;
      return 1.1;
    };

    const multiplier = getMultiplier();
    const numericSize = parseFloat(baseFontSize);
    const unit = baseFontSize.replace(/[\d.]/g, '');
    return `${numericSize * multiplier}${unit}`;
  },

  getAccessibleLineHeight: (screen: ScreenDetection): number => {
    const mobileSize = getMobileSizeWithFallback(screen);

    if (screen.isDesktop) return 1.5;
    if (screen.isTablet) return 1.6;
    if (mobileSize === 'small') return 1.8;
    if (mobileSize === 'medium') return 1.7;
    if (mobileSize === 'large') return 1.6;
    return 1.7;
  }
};

/**
 * Optimized screen detection hook with reduced re-renders
 */
export const useOptimizedScreenDetection = () => {
  const screen = useScreenDetection();

  return useMemo(
    () => ({
      isDesktop: screen.isDesktop,
      isTablet: screen.isTablet,
      isMobile: screen.isMobile,
      isSmallMobile: screen.isSmallMobile,
      isLandscape: screen.isLandscape,
      isPortrait: screen.isPortrait,
      isMobileLandscape: screen.isMobileLandscape,
      isTabletLandscape: screen.isTabletLandscape,
      isIPad: screen.isIPad,
      isIpadPro: screen.isIpadPro,
      deviceType: screen.deviceType
    }),
    [screen]
  );
};

/**
 * Enhanced performance hook for component optimization
 */
export const usePerformanceOptimization = (screen: ScreenDetection) => {
  const performanceConfig = useMemo(() => {
    return getPerformanceConfig(screen);
  }, [screen]);

  const accessibilityConfig = useMemo(() => {
    return getAccessibilityConfig(screen);
  }, [screen]);

  const animationDuration = useMemo(() => {
    return PerformanceUtils.getAnimationDuration(screen);
  }, [screen]);

  const shouldReduceAnimations = useMemo(() => {
    return PerformanceUtils.shouldReduceAnimations(screen);
  }, [screen]);

  return {
    performanceConfig,
    accessibilityConfig,
    animationDuration,
    shouldReduceAnimations
  };
};

/**
 * Component style hook with proper memoization
 */
export const useComponentStyles = (componentName: ComponentName, screen: ScreenDetection) => {
  return useMemo(() => {
    return getComponentStyles(componentName, screen);
  }, [componentName, screen]);
};

/**
 * Safe component styles hook with fallback
 */
export const useComponentStylesSafe = (componentName: string, screen: ScreenDetection) => {
  return useMemo(() => {
    return getComponentStylesSafe(componentName, screen);
  }, [componentName, screen]);
};

/**
 * Responsive font size hook with accessibility
 */
export const useAccessibleFontSize = (baseFontSize: string, screen: ScreenDetection) => {
  return useMemo(() => {
    return AccessibilityUtils.getAccessibleFontSize(baseFontSize, screen);
  }, [baseFontSize, screen]);
};

/**
 * Responsive line height hook
 */
export const useAccessibleLineHeight = (screen: ScreenDetection) => {
  return useMemo(() => {
    return AccessibilityUtils.getAccessibleLineHeight(screen);
  }, [screen]);
};

/**
 * Device-specific ARIA labels hook
 */
export const useDeviceAriaLabel = (screen: ScreenDetection) => {
  return useMemo(() => {
    return AccessibilityUtils.getDeviceAriaLabel(screen);
  }, [screen]);
};

/**
 * Focus strategy hook for accessibility
 */
export const useFocusStrategy = (screen: ScreenDetection) => {
  return useMemo(() => {
    return AccessibilityUtils.getFocusStrategy(screen);
  }, [screen]);
};

/**
 * Image loading strategy hook
 */
export const useImageLoadingStrategy = (screen: ScreenDetection) => {
  return useMemo(() => {
    return PerformanceUtils.getImageLoadingStrategy(screen);
  }, [screen]);
};

/**
 * Bundle loading strategy hook
 */
export const useBundleLoadingStrategy = (screen: ScreenDetection) => {
  return useMemo(() => {
    return PerformanceUtils.getBundleLoadingStrategy(screen);
  }, [screen]);
};

/**
 * Critical resource preloading hook
 */
export const useShouldPreloadCriticalResources = (screen: ScreenDetection) => {
  return useMemo(() => {
    return PerformanceUtils.shouldPreloadCriticalResources(screen);
  }, [screen]);
};

/**
 * Memory usage optimization hook
 */
export const useMemoryOptimization = (screen: ScreenDetection) => {
  const [memoryPressure, setMemoryPressure] = useState<'low' | 'medium' | 'high'>('low');

  useEffect(() => {
    if ('memory' in performance) {
      const checkMemory = () => {
        const memory = (performance as any).memory;
        const usedRatio = memory.usedJSHeapSize / memory.jsHeapSizeLimit;

        if (usedRatio > 0.8) {
          setMemoryPressure('high');
        } else if (usedRatio > 0.6) {
          setMemoryPressure('medium');
        } else {
          setMemoryPressure('low');
        }
      };

      checkMemory();
      const interval = setInterval(checkMemory, 5000);

      return () => clearInterval(interval);
    }
  }, []);

  const optimizationSettings = useMemo(() => {
    return {
      shouldReduceAnimations: memoryPressure === 'high' || screen.isSmallMobile,
      shouldLazyLoad: memoryPressure !== 'low' || !screen.isDesktop,
      shouldPreloadImages: memoryPressure === 'low' && screen.isDesktop,
      maxConcurrentRequests: memoryPressure === 'high' ? 2 : memoryPressure === 'medium' ? 4 : 6
    };
  }, [memoryPressure, screen]);

  return {
    memoryPressure,
    optimizationSettings
  };
};

/**
 * Network-aware performance hook
 */
export const useNetworkAwarePerformance = (screen: ScreenDetection) => {
  const [networkInfo, setNetworkInfo] = useState({
    effectiveType: '4g',
    downlink: 10,
    rtt: 100,
    saveData: false
  });

  useEffect(() => {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;

      const updateNetworkInfo = () => {
        setNetworkInfo({
          effectiveType: connection.effectiveType || '4g',
          downlink: connection.downlink || 10,
          rtt: connection.rtt || 100,
          saveData: connection.saveData || false
        });
      };

      updateNetworkInfo();
      connection.addEventListener('change', updateNetworkInfo);

      return () => {
        connection.removeEventListener('change', updateNetworkInfo);
      };
    }
  }, []);

  const performanceSettings = useMemo(() => {
    const isSlowNetwork = networkInfo.effectiveType === 'slow-2g' || networkInfo.effectiveType === '2g';
    const isFastNetwork = networkInfo.effectiveType === '4g' && networkInfo.downlink > 5;

    return {
      shouldPreloadImages: isFastNetwork && screen.isDesktop && !networkInfo.saveData,
      shouldLazyLoad: isSlowNetwork || networkInfo.saveData || !screen.isDesktop,
      shouldReduceAnimations: isSlowNetwork || networkInfo.saveData || screen.isSmallMobile,
      maxImageQuality: isSlowNetwork || networkInfo.saveData ? 'low' : isFastNetwork && screen.isDesktop ? 'high' : 'medium',
      enablePrefetch: isFastNetwork && !networkInfo.saveData,
      maxConcurrentRequests: isSlowNetwork ? 2 : isFastNetwork ? 6 : 4
    };
  }, [networkInfo, screen]);

  return {
    networkInfo,
    performanceSettings
  };
};

/**
 * Battery-aware performance hook
 */
export const useBatteryAwarePerformance = (screen: ScreenDetection) => {
  const [batteryInfo, setBatteryInfo] = useState({
    level: 1,
    charging: true,
    chargingTime: 0,
    dischargingTime: Infinity
  });

  useEffect(() => {
    if ('getBattery' in navigator) {
      (navigator as any)
        .getBattery()
        .then((battery: any) => {
          const updateBatteryInfo = () => {
            setBatteryInfo({
              level: battery.level,
              charging: battery.charging,
              chargingTime: battery.chargingTime,
              dischargingTime: battery.dischargingTime
            });
          };

          updateBatteryInfo();

          battery.addEventListener('chargingchange', updateBatteryInfo);
          battery.addEventListener('levelchange', updateBatteryInfo);
          battery.addEventListener('chargingtimechange', updateBatteryInfo);
          battery.addEventListener('dischargingtimechange', updateBatteryInfo);

          return () => {
            battery.removeEventListener('chargingchange', updateBatteryInfo);
            battery.removeEventListener('levelchange', updateBatteryInfo);
            battery.removeEventListener('chargingtimechange', updateBatteryInfo);
            battery.removeEventListener('dischargingtimechange', updateBatteryInfo);
          };
        })
        .catch(() => {
          // Battery API not supported, use default values
          console.warn('Battery API not supported');
        });
    }
  }, []);

  const batteryOptimizations = useMemo(() => {
    const isLowBattery = batteryInfo.level < 0.2 && !batteryInfo.charging;
    const isCriticalBattery = batteryInfo.level < 0.1 && !batteryInfo.charging;

    return {
      shouldReduceAnimations: isCriticalBattery || (isLowBattery && screen.isMobile),
      shouldDisableParallax: isLowBattery,
      shouldLimitBackgroundTasks: isLowBattery,
      shouldReducePolling: isLowBattery,
      maxRefreshRate: isCriticalBattery ? 30 : isLowBattery ? 45 : 60,
      enablePowerSaveMode: isCriticalBattery
    };
  }, [batteryInfo, screen]);

  return {
    batteryInfo,
    batteryOptimizations
  };
};

/**
 * Device capability detection hook
 */
export const useDeviceCapabilities = (screen: ScreenDetection) => {
  const [capabilities, setCapabilities] = useState({
    supportsWebP: false,
    supportsAVIF: false,
    supportsIntersectionObserver: false,
    supportsResizeObserver: false,
    supportsServiceWorker: false,
    supportsWebGL: false,
    deviceMemory: 4,
    hardwareConcurrency: 4
  });

  useEffect(() => {
    const checkCapabilities = async () => {
      const newCapabilities = {
        supportsWebP: await checkWebPSupport(),
        supportsAVIF: await checkAVIFSupport(),
        supportsIntersectionObserver: 'IntersectionObserver' in window,
        supportsResizeObserver: 'ResizeObserver' in window,
        supportsServiceWorker: 'serviceWorker' in navigator,
        supportsWebGL: checkWebGLSupport(),
        deviceMemory: (navigator as any).deviceMemory || 4,
        hardwareConcurrency: navigator.hardwareConcurrency || 4
      };

      setCapabilities(newCapabilities);
    };

    checkCapabilities();
  }, []);

  const optimizedSettings = useMemo(() => {
    return {
      preferredImageFormat: capabilities.supportsAVIF ? 'avif' : capabilities.supportsWebP ? 'webp' : 'jpg',

      canUseIntersectionObserver: capabilities.supportsIntersectionObserver,
      canUseResizeObserver: capabilities.supportsResizeObserver,

      shouldUseServiceWorker: capabilities.supportsServiceWorker && screen.isDesktop,

      maxParallelTasks: Math.min(capabilities.hardwareConcurrency, screen.isDesktop ? 4 : 2),

      memoryOptimizationLevel: capabilities.deviceMemory < 2 ? 'aggressive' : capabilities.deviceMemory < 4 ? 'moderate' : 'minimal',

      canUseWebGL: capabilities.supportsWebGL && screen.isDesktop
    };
  }, [capabilities, screen]);

  return {
    capabilities,
    optimizedSettings
  };
};

/**
 * Touch device detection hook
 */
export const useTouchDevice = (screen: ScreenDetection) => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchDevice(hasTouch);
    };

    checkTouch();
  }, []);

  const touchCapabilities = useMemo(
    () => ({
      hasTouch: isTouchDevice,
      isPrimaryTouch: screen.isMobile || screen.isTablet,
      supportsHover: screen.isDesktop && !isTouchDevice,
      prefersTouchInteraction: isTouchDevice && (screen.isMobile || screen.isTablet)
    }),
    [isTouchDevice, screen]
  );

  return touchCapabilities;
};

/**
 * Responsive breakpoint hook
 */
export const useResponsiveBreakpoint = (screen: ScreenDetection) => {
  const breakpoint = useMemo(() => {
    if (screen.isDesktop) return 'desktop';
    if (screen.isTablet) return 'tablet';
    if (screen.isSmallMobile) return 'smallMobile';
    return 'mobile';
  }, [screen]);

  const isBreakpoint = useMemo(
    () => ({
      desktop: screen.isDesktop,
      tablet: screen.isTablet,
      mobile: screen.isMobile,
      smallMobile: screen.isSmallMobile
    }),
    [screen]
  );

  return {
    breakpoint,
    isBreakpoint
  };
};

/**
 * Comprehensive performance optimization hook
 */
export const useComprehensivePerformance = (screen: ScreenDetection) => {
  const { performanceConfig, accessibilityConfig } = usePerformanceOptimization(screen);
  const { optimizationSettings } = useMemoryOptimization(screen);
  const { performanceSettings } = useNetworkAwarePerformance(screen);
  const { batteryOptimizations } = useBatteryAwarePerformance(screen);
  const touchCapabilities = useTouchDevice(screen);

  const combinedSettings = useMemo(() => {
    return {
      // Animation settings
      shouldReduceAnimations:
        optimizationSettings.shouldReduceAnimations ||
        performanceSettings.shouldReduceAnimations ||
        batteryOptimizations.shouldReduceAnimations,

      // Image loading settings
      shouldLazyLoad: optimizationSettings.shouldLazyLoad || performanceSettings.shouldLazyLoad,

      shouldPreloadImages:
        optimizationSettings.shouldPreloadImages && performanceSettings.shouldPreloadImages && performanceConfig.shouldPreloadImages,

      // Quality settings
      maxImageQuality: performanceSettings.maxImageQuality,

      // Network settings
      maxConcurrentRequests: Math.min(optimizationSettings.maxConcurrentRequests, performanceSettings.maxConcurrentRequests),

      // Interaction settings
      enableParallax:
        performanceConfig.shouldUseParallax && !batteryOptimizations.shouldDisableParallax && !optimizationSettings.shouldReduceAnimations,

      // Touch settings
      optimizeForTouch: touchCapabilities.prefersTouchInteraction,
      enableHoverEffects: touchCapabilities.supportsHover,

      // Accessibility
      minTouchTarget: accessibilityConfig.minTouchTarget,
      focusStrategy: touchCapabilities.prefersTouchInteraction ? 'touch' : 'keyboard'
    };
  }, [optimizationSettings, performanceSettings, batteryOptimizations, touchCapabilities, performanceConfig, accessibilityConfig]);

  return combinedSettings;
};

/**
 * Adaptive loading hook
 */
export const useAdaptiveLoading = (screen: ScreenDetection) => {
  const { optimizedSettings } = useDeviceCapabilities(screen);
  const { performanceSettings } = useNetworkAwarePerformance(screen);
  const { batteryOptimizations } = useBatteryAwarePerformance(screen);

  const loadingStrategy = useMemo(() => {
    const isLowEndDevice = optimizedSettings.memoryOptimizationLevel === 'aggressive';
    const isSlowNetwork = performanceSettings.maxImageQuality === 'low';
    const isLowBattery = batteryOptimizations.enablePowerSaveMode;

    return {
      // Image loading strategy
      imageLoadingStrategy: isLowEndDevice || isSlowNetwork ? 'lazy' : 'eager',
      imageQuality: performanceSettings.maxImageQuality,
      imageFormat: optimizedSettings.preferredImageFormat,

      // Script loading strategy
      scriptLoadingStrategy: isLowEndDevice ? 'defer' : 'async',
      bundleSplitting: isLowEndDevice || isSlowNetwork,

      // Resource prioritization
      criticalResourcesOnly: isLowBattery || isSlowNetwork,
      prefetchNextPage: !isLowEndDevice && !isSlowNetwork && !isLowBattery,

      // Rendering strategy
      useVirtualization: isLowEndDevice && screen.isMobile,
      maxRenderItems: isLowEndDevice ? 10 : screen.isMobile ? 20 : 50,
      // Animation strategy
      animationComplexity: isLowEndDevice || isLowBattery ? 'minimal' : screen.isMobile ? 'moderate' : 'full'
    };
  }, [optimizedSettings, performanceSettings, batteryOptimizations, screen]);

  return loadingStrategy;
};

/**
 * Responsive image hook with adaptive loading
 */
export const useResponsiveImage = (
  baseSrc: string,
  screen: ScreenDetection,
  options: {
    sizes?: string[];
    formats?: string[];
    lazy?: boolean;
  } = {}
) => {
  const { optimizedSettings } = useDeviceCapabilities(screen);
  const loadingStrategy = useAdaptiveLoading(screen);

  const imageConfig = useMemo(() => {
    const { sizes = ['400w', '800w', '1200w'], formats = ['webp', 'jpg'], lazy = true } = options;

    // Determine optimal size based on screen
    const getOptimalSize = () => {
      if (screen.isDesktop) return sizes[2] || sizes[sizes.length - 1];
      if (screen.isTablet) return sizes[1] || sizes[Math.floor(sizes.length / 2)];
      return sizes[0];
    };

    // Determine optimal format
    const getOptimalFormat = () => {
      if (optimizedSettings.preferredImageFormat === 'avif' && formats.includes('avif')) {
        return 'avif';
      }
      if (optimizedSettings.preferredImageFormat === 'webp' && formats.includes('webp')) {
        return 'webp';
      }
      return formats.includes('jpg') ? 'jpg' : formats[0];
    };

    const optimalSize = getOptimalSize();
    const optimalFormat = getOptimalFormat();

    // Build srcSet
    const srcSet = sizes
      .map((size) => {
        const sizeValue = size.replace('w', '');
        return `${baseSrc.replace(/\.[^/.]+$/, '')}-${sizeValue}.${optimalFormat} ${size}`;
      })
      .join(', ');

    // Build sizes attribute
    const sizesAttr = screen.isDesktop ? '(min-width: 1024px) 1200px' : screen.isTablet ? '(min-width: 768px) 800px' : '400px';

    return {
      src: `${baseSrc.replace(/\.[^/.]+$/, '')}-${optimalSize.replace('w', '')}.${optimalFormat}`,
      srcSet,
      sizes: sizesAttr,
      loading: lazy && loadingStrategy.imageLoadingStrategy === 'lazy' ? 'lazy' : 'eager',
      format: optimalFormat,
      quality: loadingStrategy.imageQuality
    };
  }, [baseSrc, screen, options, optimizedSettings, loadingStrategy]);

  return imageConfig;
};

/**
 * Performance metrics collection hook
 */
export const usePerformanceMetrics = () => {
  const [metrics, setMetrics] = useState({
    // Core Web Vitals
    LCP: 0, // Largest Contentful Paint
    FID: 0, // First Input Delay
    CLS: 0, // Cumulative Layout Shift

    // Additional metrics
    TTFB: 0, // Time to First Byte
    FCP: 0, // First Contentful Paint
    TTI: 0, // Time to Interactive

    // Custom metrics
    componentMountTime: 0,
    rerenderCount: 0,
    memoryUsage: 0
  });

  useEffect(() => {
    // Collect performance metrics
    const collectMetrics = () => {
      if ('performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const paint = performance.getEntriesByType('paint');

        const newMetrics = {
          ...metrics,
          TTFB: navigation.responseStart - navigation.requestStart,
          FCP: paint.find((entry) => entry.name === 'first-contentful-paint')?.startTime || 0,
          memoryUsage: (performance as any).memory?.usedJSHeapSize || 0
        };

        setMetrics(newMetrics);
      }
    };

    // Collect metrics after component mount
    const timeout = setTimeout(collectMetrics, 1000);

    // Set up performance observer for Core Web Vitals
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            setMetrics((prev) => ({ ...prev, LCP: entry.startTime }));
          }
          if (entry.entryType === 'first-input') {
            setMetrics((prev) => ({ ...prev, FID: (entry as any).processingStart - entry.startTime }));
          }
          if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
            setMetrics((prev) => ({ ...prev, CLS: prev.CLS + (entry as any).value }));
          }
        }
      });

      try {
        observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
      } catch (error) {
        // Fallback for browsers that don't support all entry types
        console.warn('Some performance metrics may not be available:', error);
      }

      return () => {
        observer.disconnect();
        clearTimeout(timeout);
      };
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [metrics]);

  const trackComponentMount = useCallback((componentName: string, mountTime: number) => {
    setMetrics(
      (prev) =>
        ({
          ...prev,
          componentMountTime: prev.componentMountTime + mountTime,
          [`${componentName}MountTime`]: mountTime
        }) as any
    );
  }, []);

  const trackRerender = useCallback(() => {
    setMetrics((prev) => ({
      ...prev,
      rerenderCount: prev.rerenderCount + 1
    }));
  }, []);

  const getPerformanceScore = useCallback(() => {
    const { LCP, FID, CLS } = metrics;

    // Calculate score based on Core Web Vitals thresholds
    const lcpScore = LCP <= 2500 ? 100 : LCP <= 4000 ? 50 : 0;
    const fidScore = FID <= 100 ? 100 : FID <= 300 ? 50 : 0;
    const clsScore = CLS <= 0.1 ? 100 : CLS <= 0.25 ? 50 : 0;

    return Math.round((lcpScore + fidScore + clsScore) / 3);
  }, [metrics]);

  return {
    metrics,
    trackComponentMount,
    trackRerender,
    getPerformanceScore
  };
};

/**
 * Component performance tracking hook
 */
export const useComponentPerformanceTracking = (componentName: string) => {
  const mountTimeRef = useRef<number | null>(null);
  const renderCountRef = useRef(0);
  const [performanceData, setPerformanceData] = useState({
    mountTime: 0,
    renderCount: 0,
    averageRenderTime: 0,
    lastRenderTime: 0
  });

  // Track mount time
  useEffect(() => {
    mountTimeRef.current = performance.now();

    return () => {
      if (mountTimeRef.current) {
        const mountTime = performance.now() - mountTimeRef.current;
        setPerformanceData((prev) => ({
          ...prev,
          mountTime
        }));
      }
    };
  }, []);

  // Track render time
  useEffect(() => {
    const renderStart = performance.now();
    renderCountRef.current += 1;

    // Use setTimeout to measure after render completion
    const timeoutId = setTimeout(() => {
      const renderTime = performance.now() - renderStart;

      setPerformanceData((prev) => {
        const newRenderCount = renderCountRef.current;
        const newAverageRenderTime = (prev.averageRenderTime * (newRenderCount - 1) + renderTime) / newRenderCount;

        return {
          ...prev,
          renderCount: newRenderCount,
          averageRenderTime: newAverageRenderTime,
          lastRenderTime: renderTime
        };
      });
    }, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  });

  const logPerformanceData = useCallback(() => {
    console.group(`Performance Data for ${componentName}`);
    console.log('Mount Time:', performanceData.mountTime.toFixed(2), 'ms');
    console.log('Render Count:', performanceData.renderCount);
    console.log('Average Render Time:', performanceData.averageRenderTime.toFixed(2), 'ms');
    console.log('Last Render Time:', performanceData.lastRenderTime.toFixed(2), 'ms');
    console.groupEnd();
  }, [componentName, performanceData]);

  return {
    performanceData,
    logPerformanceData
  };
};

/**
 * Resource cleanup hook
 */
export const useResourceCleanup = () => {
  const resourcesRef = useRef<Set<() => void>>(new Set());

  const addCleanupTask = useCallback((cleanupFn: () => void) => {
    resourcesRef.current.add(cleanupFn);

    // Return a function to remove this specific cleanup task
    return () => {
      resourcesRef.current.delete(cleanupFn);
    };
  }, []);

  const cleanupAll = useCallback(() => {
    resourcesRef.current.forEach((cleanup) => {
      try {
        cleanup();
      } catch (error) {
        console.warn('Error during resource cleanup:', error);
      }
    });
    resourcesRef.current.clear();
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return cleanupAll;
  }, [cleanupAll]);

  return {
    addCleanupTask,
    cleanupAll
  };
};

// Helper functions for capability detection
const checkWebPSupport = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

const checkAVIFSupport = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const avif = new Image();
    avif.onload = avif.onerror = () => {
      resolve(avif.height === 2);
    };
    avif.src =
      'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
  });
};

const checkWebGLSupport = (): boolean => {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch {
    return false;
  }
};

/**
 * Fixed: Create default export object before exporting
 */
const PerformanceUtilsDefault = {
  // Most commonly used functions
  getPerformanceConfig,
  getAccessibilityConfig,
  getComponentStyles,
  PerformanceUtils,
  AccessibilityUtils,

  // Most commonly used hooks
  useOptimizedScreenDetection,
  usePerformanceOptimization,
  useComprehensivePerformance,
  useAdaptiveLoading,
  useResponsiveImage
};

/**
 * Fixed: Export the object as default instead of anonymous object
 */
export default PerformanceUtilsDefault;
