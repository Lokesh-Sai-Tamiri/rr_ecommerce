/**
 * @fileoverview Action buttons component with shared theme utilities
 */

'use client';

import { Box, useTheme } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import AnimateButton from 'ui-component/extended/AnimateButton';
import { type DeviceConfig, useScreenDetection, getThemeSpacing } from '../../utils';

interface ButtonConfig {
  text: string;
  href: string;
  icon?: React.ReactNode;
  target?: string;
  rel?: string;
}

interface ActionButtonsProps {
  config: DeviceConfig;
  screen?: any; // Legacy prop
  primaryButton?: ButtonConfig;
  secondaryButton?: ButtonConfig;
  customSpacing?: {
    gap?: number;
    marginTop?: number;
  };
  customAnimation?: {
    delay?: string;
    duration?: string;
  };
  showSecondaryButton?: boolean;
}

export default function ActionButtons({
  config,
  primaryButton,
  secondaryButton,
  customSpacing,
  customAnimation,
  showSecondaryButton = true
}: ActionButtonsProps) {
  const theme = useTheme();
  const screen = useScreenDetection();

  const defaultPrimaryButton: ButtonConfig = {
    text: 'Explore Research',
    href: '/about_us',
    icon: <ArrowForwardIcon />,
    target: '_self',
    rel: undefined
  };

  const defaultSecondaryButton: ButtonConfig = {
    text: 'View Gallery',
    href: '/gallery',
    icon: <PlayArrowIcon />,
    target: '_self',
    rel: undefined
  };

  const primary = { ...defaultPrimaryButton, ...primaryButton };
  const secondary = { ...defaultSecondaryButton, ...secondaryButton };

  // Use shared theme utilities for spacing
  const buttonGap = customSpacing?.gap ? theme.spacing(customSpacing.gap) : getThemeSpacing('BUTTON_GAP', screen, theme);

  const animationDelay = customAnimation?.delay || (screen.isDesktop ? '0.5s' : '0.4s');
  const animationDuration = customAnimation?.duration || '0.8s';

  // Get button size based on device
  const getButtonSize = (): 'compact' | 'small' | 'medium' | 'large' => {
    if (screen.isDesktop) return 'large';
    if (screen.isTablet) return 'medium';
    if (screen.isSmallMobile) return 'medium';
    return 'large'; // For other mobile devices
  };

  // Get container styles for buttons
  const getButtonContainerStyles = () => {
    if (screen.isDesktop) {
      return { width: 'auto' };
    }

    if (screen.isTablet) {
      return {
        width: '100%',
        '& > *': {
          width: '100% !important',
          height: '56px !important',
          minHeight: '56px !important',
          '& button, & a': {
            width: '100% !important',
            height: '100% !important',
            display: 'flex !important',
            justifyContent: 'center !important',
            alignItems: 'center !important'
          }
        }
      };
    }

    // Mobile
    return {
      width: '100%',
      '& > *': {
        width: '100% !important',
        '& button, & a': {
          width: '100% !important',
          display: 'flex !important',
          justifyContent: 'center !important',
          alignItems: 'center !important'
        }
      }
    };
  };

  const buttonContainerStyles = getButtonContainerStyles();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: screen.isDesktop ? 'row' : 'column',
        gap: buttonGap,
        animation: `fadeInUp ${animationDuration} ease-out ${animationDelay} both`,
        justifyContent: 'center',
        alignItems: screen.isTablet ? 'stretch' : 'center',
        width: screen.isDesktop ? 'auto' : '100%'
      }}
    >
      {/* Primary Button */}
      <Box sx={buttonContainerStyles}>
        <AnimateButton
          variant="filled"
          size={getButtonSize()}
          href={primary.href}
          target={primary.target}
          rel={primary.rel}
          screen={screen}
        >
          <Box
            component="span"
            className="button-text"
            sx={{
              fontWeight: 'inherit',
              fontSize: screen.isDesktop || screen.isTablet ? 'inherit' : '0.875rem'
            }}
          >
            {primary.text}
          </Box>
          <Box
            component="span"
            className="button-icon"
            sx={{
              ml: screen.isDesktop || screen.isTablet ? 1 : 0.5,
              display: 'flex',
              alignItems: 'center',
              fontSize: screen.isDesktop || screen.isTablet ? '1rem' : '0.875rem'
            }}
          >
            {primary.icon}
          </Box>
        </AnimateButton>
      </Box>

      {/* Secondary Button */}
      {showSecondaryButton && (
        <Box sx={buttonContainerStyles}>
          <AnimateButton
            variant="transparent"
            size={getButtonSize()}
            href={secondary.href}
            target={secondary.target}
            rel={secondary.rel}
            screen={screen}
          >
            <Box
              component="span"
              className="button-icon"
              sx={{
                mr: screen.isDesktop || screen.isTablet ? 1 : 0.5,
                display: 'flex',
                alignItems: 'center',
                fontSize: screen.isDesktop || screen.isTablet ? '1rem' : '0.875rem'
              }}
            >
              {secondary.icon}
            </Box>
            <Box
              component="span"
              className="button-text"
              sx={{
                fontWeight: 'inherit',
                fontSize: screen.isDesktop || screen.isTablet ? 'inherit' : '0.875rem'
              }}
            >
              {secondary.text}
            </Box>
          </AnimateButton>
        </Box>
      )}
    </Box>
  );
}
