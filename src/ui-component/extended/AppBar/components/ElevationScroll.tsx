/**
 * @fileoverview Elevation scroll component for AppBar
 * Handles elevation and background changes on scroll
 */

'use client';

import { cloneElement, ReactElement } from 'react';
import { useTheme } from '@mui/material/styles';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { ThemeMode } from 'config';
import { ElevationScrollProps } from '../types';

/**
 * Handles elevation and background changes on scroll
 * Provides smooth transitions between transparent and solid backgrounds
 *
 * @param {ElevationScrollProps} props - Component props
 * @returns {ReactElement} Cloned children with scroll-based styling
 */
export default function ElevationScroll({ children, window, disableSticky, transparentBackground }: ElevationScrollProps): ReactElement {
  const theme = useTheme();

  // Detect scroll position for elevation changes
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window!
  });

  // Apply dynamic styling based on scroll state
  return cloneElement(children, {
    elevation: trigger && !disableSticky ? 1 : 0,
    style: {
      backgroundColor: transparentBackground
        ? 'transparent'
        : theme.palette.mode === ThemeMode.DARK && trigger
          ? theme.palette.dark[800]
          : theme.palette.background.default,
      color: theme.palette.text.dark
    }
  });
}
