/**
 * @fileoverview Reusable About Card Component
 * Leveraging existing UI components and theme system
 */

'use client';

import React from 'react';
import { Box, Typography, CardContent, useTheme } from '@mui/material';

// Project imports - UI Components
import MainCard from 'ui-component/cards/MainCard';

// Project imports - Utils & Config
import { AboutSectionData } from './aboutData';
import { useScreenDetection, FONT_WEIGHTS, LINE_HEIGHTS } from '../../utils';
import { gridSpacing } from 'store/constant';
import config from 'config';

// Types
import type { Theme } from '@mui/material/styles';
import type { SxProps } from '@mui/material/styles';

interface AboutCardProps {
  section: AboutSectionData;
  index: number;
  fontSizes: {
    title: Record<string, string>;
    icon: string;
  };
  getCardStyles: (index: number) => SxProps<Theme>;
}

// Utility functions using theme system
const getIconContainerStyles = (theme: Theme, isDesktop: boolean): SxProps<Theme> => ({
  width: isDesktop ? 60 : 50,
  height: isDesktop ? 60 : 50,
  borderRadius: '50%',
  backgroundColor: theme.palette.mode === 'dark' ? `${theme.palette.primary.main}20` : `${theme.palette.text.primary}15`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: theme.transitions.create(['transform', 'box-shadow', 'background-color'], {
    duration: theme.transitions.duration.short
  }),
  '&:hover': {
    transform: 'scale(1.05)',
    backgroundColor: theme.palette.mode === 'dark' ? `${theme.palette.primary.main}30` : `${theme.palette.text.primary}25`,
    boxShadow: theme.shadows[4]
  }
});

const getIconStyles = (theme: Theme, fontSize: string): SxProps<Theme> => ({
  fontSize,
  color: theme.palette.text.primary,
  transition: theme.transitions.create(['color', 'filter'], {
    duration: theme.transitions.duration.short
  }),
  filter: `drop-shadow(0 2px 4px ${theme.palette.text.primary}30)`,
  '&:hover': {
    color: theme.palette.primary.main
  }
});

const getTitleStyles = (theme: Theme, isDesktop: boolean): SxProps<Theme> => ({
  fontWeight: FONT_WEIGHTS.BOLD,
  fontFamily: config.fontFamily,
  fontSize: isDesktop ? { md: '1.5rem' } : { xs: '1.2rem', sm: '1.3rem' },
  color: theme.palette.text.primary,
  transition: theme.transitions.create('color'),
  marginTop: theme.spacing(1),
  textAlign: 'center'
});

const getContentStyles = (theme: Theme, screen: any): SxProps<Theme> => ({
  color: theme.palette.text.primary,
  textAlign: { xs: 'center', sm: 'justify' },
  flex: 1,
  fontFamily: config.fontFamily,
  fontWeight: FONT_WEIGHTS.REGULAR,
  lineHeight: LINE_HEIGHTS.RELAXED,
  fontSize: screen.isDesktop ? '1rem' : screen.isTablet ? '0.95rem' : '0.9rem'
});

const AboutCard = React.memo(({ section, index, fontSizes, getCardStyles }: AboutCardProps) => {
  const theme = useTheme();
  const screen = useScreenDetection();
  const IconComponent = section.icon;

  // Merge custom styles with MainCard - OVERRIDE backgroundColor
  const cardStyles: SxProps<Theme> = React.useMemo(
    () => ({
      ...getCardStyles(index),
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      border: 'none',
      outline: 'none',
      // FORCE the background color you want
      backgroundColor: `${theme.palette.text.primary}15 !important`,
      boxShadow: theme.shadows[4],
      transition: theme.transitions.create(['transform', 'box-shadow'], {
        duration: theme.transitions.duration.standard
      }),
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.shadows[8],
        // Keep the same background on hover
        backgroundColor: `${theme.palette.text.primary}20 !important`
      }
    }),
    [getCardStyles, index, theme]
  );

  // Use theme spacing with gridSpacing constant
  const cardContentSpacing: SxProps<Theme> = React.useMemo(
    () => ({
      p: theme.spacing(gridSpacing),
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'row' },
      alignItems: 'center',
      gap: theme.spacing(gridSpacing),
      height: '100%',
      '&:last-child': {
        paddingBottom: theme.spacing(gridSpacing)
      }
    }),
    [theme]
  );

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <MainCard
        sx={cardStyles}
        content={false} // We'll handle content ourselves for better control
      >
        <CardContent sx={cardContentSpacing}>
          {/* Icon Section */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flexShrink: 0,
              minWidth: { xs: 'auto', sm: 120 }
            }}
          >
            <Box sx={getIconContainerStyles(theme, screen.isDesktop)}>
              <IconComponent className="card-icon" sx={getIconStyles(theme, fontSizes.icon)} />
            </Box>

            <Typography variant={screen.isDesktop ? 'h5' : 'h6'} component="h3" sx={getTitleStyles(theme, screen.isDesktop)}>
              {section.title}
            </Typography>
          </Box>

          {/* Content Text */}
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" component="p" sx={getContentStyles(theme, screen)}>
              {section.content}
            </Typography>
          </Box>
        </CardContent>
      </MainCard>
    </Box>
  );
});

AboutCard.displayName = 'AboutCard';

export default AboutCard;
export type { AboutCardProps };
