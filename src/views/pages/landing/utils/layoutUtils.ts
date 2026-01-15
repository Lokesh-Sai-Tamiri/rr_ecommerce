/**
 * @fileoverview Layout utility functions for landing page components
 */

import { Theme } from '@mui/material/styles';
import { ScreenDetection } from './screenUtils';
import { DeviceConfig } from './deviceConfig';

export const getDecorativeLineStyles = (theme: Theme, screen: ScreenDetection) => ({
  position: 'absolute' as const,
  bottom: { md: theme.spacing(-2), lg: theme.spacing(-2.5) },
  left: 0,
  width: '100%',
  height: '6px',
  background: `linear-gradient(135deg, 
              ${theme.palette.primary.main} 0%, 
              ${theme.palette.primary.light} 50%, 
              ${theme.palette.primary.main} 100%)`,
  borderRadius: typeof theme.shape.borderRadius === 'number' ? theme.shape.borderRadius / 2 : `calc(${theme.shape.borderRadius} / 2)`,
  boxShadow: theme.shadows[2]
});

export const getContainerStyles = (config: DeviceConfig, theme: Theme, screen: ScreenDetection) => ({
  width: config.width,
  height: '100%',
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'stretch',
  px: config.useContainer ? 0 : theme.spacing(2),
  position: 'relative' as const
});

export const getDesktopLayoutStyles = (config: DeviceConfig, theme: Theme, scrollY: number) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  position: 'relative' as const,
  transform: config.useParallax ? `translateY(${scrollY * 0.1}px)` : 'none',
  pl: { md: theme.spacing(4), lg: theme.spacing(6) },
  pr: { md: theme.spacing(2), lg: theme.spacing(4) }
});
