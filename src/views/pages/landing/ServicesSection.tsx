/**
 * @fileoverview Simple Services section component for landing page
 * Displays service cards with actual images from services folder
 * Uses theme system and ui-components patterns
 */

import React from 'react';
import { Box, Container, Typography, CardContent, CardMedia } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FormattedMessage } from 'react-intl';
import type { SxProps, Theme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';

// Project imports - UI Components
import MainCard from 'ui-component/cards/MainCard';

// Project imports - Types
import { ThemeMode } from 'config';

// Project imports - Utils & Config
import { useScreenDetection } from './utils';
import { useAboutStyles } from './components/about';
import { getTitleStyles, getSubtitleStyles } from './utils';
import { gridSpacing } from 'store/constant';
import config from 'config';

// ============================================================================
// INTERFACES & TYPES
// ============================================================================

interface ServicesSectionProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

interface ServiceItem {
  image: string;
  name: string;
  translationKey: string;
  route: string;
}

interface ServiceConfig {
  services: ServiceItem[];
  defaultTitle: string;
  defaultSubtitle: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const SERVICES_CONFIG: ServiceConfig = {
  services: [
    {
      image: 'ayush-mobile.png',
      name: 'Ayush',
      translationKey: 'services.ayush',
      route: '/services/ayush'
    },
    {
      image: 'clinical-mobile.png',
      name: 'Clinical Research',
      translationKey: 'services.clinical-research',
      route: '/services/clinical-research'
    },
    {
      image: 'cosmotics-mobile.png',
      name: 'Cosmetics & Personal Care',
      translationKey: 'services.cosmetics-personal-care',
      route: '/services/cosmetics-personal-care'
    },
    {
      image: 'drug-test-lab-mobile.png',
      name: 'Drug Testing Lab',
      translationKey: 'services.drug-testing-lab',
      route: '/services/drug-testing-lab'
    },
    {
      image: 'herbal-mobile.png',
      name: 'Herbal & Naturals',
      translationKey: 'services.herbal-naturals',
      route: '/services/herbal-naturals'
    },
    {
      image: 'in-vitro-mobile.png',
      name: 'In Vitro Services',
      translationKey: 'services.in-vitro-cell-services',
      route: '/services/in-vitro-cell-based-research'
    },
    {
      image: 'neutraceuticals-mobile.png',
      name: 'Nutraceuticals',
      translationKey: 'services.nutraceuticals',
      route: '/services/nutraceuticals'
    },
    {
      image: 'pharmaciticals-mobile.png',
      name: 'Pharmaceutical',
      translationKey: 'services.pharmaceutical',
      route: '/services/pharmaceutical'
    },
    {
      image: 'preclinical-mobile.png',
      name: 'Preclinical Research',
      translationKey: 'services.preclinical-research',
      route: '/services/preclinical-research'
    }
  ],
  defaultTitle: 'Our Services',
  defaultSubtitle: 'Professional healthcare and research solutions'
};

const IMAGE_CONFIG = {
  basePath: '/assets/images/landing/services/'
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

const getGridConfiguration = (screen: ReturnType<typeof useScreenDetection>, theme: Theme) => {
  if (screen.isDesktop)
    return {
      columns: 3,
      gap: theme.spacing(4)
    };
  if (screen.isTablet)
    return {
      columns: 2,
      gap: theme.spacing(3)
    };
  return {
    columns: 1,
    gap: theme.spacing(2)
  };
};

const getImageUrl = (imageName: string): string => {
  return `${IMAGE_CONFIG.basePath}${imageName}`;
};

// Utility functions using theme system (following ui-component patterns)
const getCardTitleStyles = (theme: Theme, isDesktop: boolean): SxProps<Theme> => ({
  fontWeight: theme.typography.fontWeightBold || 700,
  fontFamily: config.fontFamily,
  fontSize: isDesktop ? { md: '1.3rem' } : { xs: '1.1rem', sm: '1.2rem' },
  color: theme.palette.text.primary,
  transition: theme.transitions.create('color'),
  marginTop: theme.spacing(0.5),
  textAlign: 'center'
});

// ============================================================================
// COMPONENT
// ============================================================================

const ServicesSection: React.FC<ServicesSectionProps> = ({ className, title, subtitle }) => {
  const theme = useTheme();
  const screen = useScreenDetection();
  const router = useRouter();

  // Use the same styles as AboutSection
  const { backgroundStyles, getCardStyles } = useAboutStyles();

  const gridConfig = getGridConfiguration(screen, theme);

  // Use custom title/subtitle or fallback to translated defaults
  const sectionTitle = title;
  const sectionSubtitle = subtitle;

  // Use consolidated shared utilities (same as CompanyIntro)
  const titleStyles = getTitleStyles(screen, theme, {
    use3DEffects: true
  });

  const subtitleStyles = getSubtitleStyles(screen, theme, {
    textAlign: 'center',
    customSpacing: {
      marginLeft: 0,
      marginTop: 4,
      marginBottom: 4
    }
  });

  const handleImageError = React.useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>, title: string) => {
      const target = e.target as HTMLImageElement;
      target.style.backgroundColor = theme.palette.primary.light;
      target.style.display = 'flex';
      target.style.alignItems = 'center';
      target.style.justifyContent = 'center';
      target.style.color = theme.palette.primary.contrastText;
      target.style.fontSize = theme.typography.body2.fontSize as string;
      target.style.fontWeight = theme.typography.fontWeightBold?.toString() || '700';
      target.innerHTML = title;
      console.error(`Failed to load image: ${target.src}`);
    },
    [theme.palette.primary.light, theme.palette.primary.contrastText, theme.typography.body2.fontSize, theme.typography.fontWeightBold]
  );

  const getImageStyles = React.useCallback(
    (): SxProps<Theme> => ({
      objectFit: 'cover',
      backgroundColor:
        theme.palette.mode === ThemeMode.DARK ? theme.palette.grey[800] : theme.palette.grey[200]
    }),
    [theme.palette.mode, theme.palette.grey]
  );

  // Use theme spacing with very minimal padding for compact cards
  const getContentStyles = React.useCallback(
    (): SxProps<Theme> => ({
      p: { xs: theme.spacing(0.15), sm: theme.spacing(0.25), md: theme.spacing(0.5) },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: theme.spacing(0.15),
      height: '100%',
      '&:last-child': {
        paddingBottom: { xs: theme.spacing(0.15), sm: theme.spacing(0.25), md: theme.spacing(0.1) }
      }
    }),
    [theme]
  );

  const getImageHeight = React.useCallback(() => {
    if (screen.isDesktop) return 180;
    if (screen.isTablet) return 160;
    return 140;
  }, [screen.isDesktop, screen.isTablet]);

  // Theme-aware background color for section (using ThemeMode)
  const getSectionBackground = React.useCallback(() => {
    if (theme.palette.mode === ThemeMode.DARK) {
      return theme.palette.grey[800] || theme.palette.background.default;
    }
    return theme.palette.background.default;
  }, [theme.palette.mode, theme.palette.grey, theme.palette.background.default]);

  // Navigation handler for service cards
  const handleServiceClick = React.useCallback((route: string) => {
    router.push(route);
  }, [router]);

  // Enhanced card styles using MainCard patterns
  const getServiceCardStyles = React.useMemo(
    () =>
      (index: number): SxProps<Theme> => ({
        ...getCardStyles(index),
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: 'none',
        outline: 'none',
        // Use theme-aware background (following ui-component patterns)
        backgroundColor:
          theme.palette.mode === ThemeMode.DARK
            ? `${theme.palette.grey[900]}80`
            : `${theme.palette.text.primary}15`,
        boxShadow: theme.shadows[4],
        borderRadius: theme.shape.borderRadius,
        transition: theme.transitions.create(['transform', 'box-shadow'], {
          duration: theme.transitions.duration.standard,
          easing: theme.transitions.easing.easeInOut
        }),
        overflow: 'hidden',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[8],
          backgroundColor:
            theme.palette.mode === ThemeMode.DARK
              ? `${theme.palette.grey[900]}90`
              : `${theme.palette.text.primary}20`
        }
      }),
    [getCardStyles, theme]
  );

  return (
    <Box
      component="section"
      className={className}
      sx={{
        ...backgroundStyles,
        backgroundColor: getSectionBackground()
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: theme.zIndex?.appBar ? theme.zIndex.appBar - 1 : 2,
          mb: { xs: 7, sm: 8, md: 9 },
          px: theme.spacing(2)
        }}
      >
        {/* Section Header - Following ui-component typography patterns */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant={screen.isIPhoneSE ? 'h3' : 'heroLarge'} sx={titleStyles}>
            {sectionTitle || <FormattedMessage id="services.title" defaultMessage="Our Services" />}
          </Typography>

          <Typography variant={subtitleStyles.variant as any} component="p" sx={subtitleStyles.sx}>
            {sectionSubtitle || <FormattedMessage id="services.subtitle" defaultMessage="Professional healthcare and research solutions" />}
          </Typography>
        </Box>

        {/* Services Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: `repeat(${gridConfig.columns}, 1fr)`,
            gap: gridConfig.gap,
            width: '100%'
          }}
        >
          {SERVICES_CONFIG.services.map((service, index) => {
            const imageUrl = getImageUrl(service.image);

                         return (
               <Box 
                 key={`service-${index}`} 
                 sx={{ width: '100%', height: '100%' }}
                 onClick={() => handleServiceClick(service.route)}
               >
                 {/* Using MainCard from ui-component instead of MUI Card */}
                 <MainCard
                   sx={getServiceCardStyles(index)}
                   content={false} // We'll handle content ourselves for better control
                 >
                   <CardMedia
                     component="img"
                     height={getImageHeight()}
                     image={imageUrl}
                     alt={service.name}
                     sx={getImageStyles()}
                     onError={(e) => handleImageError(e, service.name)}
                   />

                   <CardContent sx={getContentStyles()}>
                     <Typography variant={screen.isDesktop ? 'h5' : 'h6'} component="h3" sx={getCardTitleStyles(theme, screen.isDesktop)}>
                       <FormattedMessage id={service.translationKey} defaultMessage={service.name} />
                     </Typography>
                   </CardContent>
                 </MainCard>
               </Box>
             );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default ServicesSection;
