/**
 * @fileoverview Subtitle component using shared theme utilities
 */

'use client';

import { Typography, useTheme } from '@mui/material';
import { type DeviceConfig, useScreenDetection, getSubtitleStyles } from '../../utils';

interface SubtitleProps {
  config: DeviceConfig;
  screen?: any; // Legacy prop
  children?: React.ReactNode;
  text?: string;
  customSpacing?: {
    marginBottom?: number;
    marginTop?: number;
    marginLeft?: number;
  };
  customAnimation?: {
    delay?: string;
    duration?: string;
  };
}

export default function Subtitle({ config, children, text, customSpacing, customAnimation }: SubtitleProps) {
  const theme = useTheme();
  const screen = useScreenDetection();

  // Use shared subtitle styles from theme utilities
  const subtitleStyles = getSubtitleStyles(screen, theme);

  // Override with custom spacing if provided
  const finalStyles = {
    ...subtitleStyles.sx,
    ...(customSpacing?.marginBottom && { mb: theme.spacing(customSpacing.marginBottom) }),
    ...(customSpacing?.marginTop && { mt: theme.spacing(customSpacing.marginTop) }),
    ...(customSpacing?.marginLeft && { marginLeft: theme.spacing(customSpacing.marginLeft) }),
    ...(customAnimation && {
      animation: `fadeInUp ${customAnimation.duration || '0.8s'} ease-out ${customAnimation.delay || '0.5s'} both`
    })
  };

  // Default responsive text
  const getDefaultText = () => {
    return `Illuminating Innovation Through ${screen.isDesktop ? 'Research ' : ''}Excellence`;
  };

  return (
    <Typography variant={subtitleStyles.variant as any} sx={finalStyles}>
      {children || text || getDefaultText()}
    </Typography>
  );
}
