'use client';

import { ReactNode } from 'react';
import { Box, useTheme } from '@mui/material';

// third party
import { motion, useCycle } from 'framer-motion';

interface ScaleProps {
  hover: number | string | undefined;
  tap: number | string | undefined;
}

interface AnimateButtonProps {
  children?: ReactNode;
  type?: 'slide' | 'scale' | 'rotate';
  direction?: 'up' | 'down' | 'left' | 'right';
  offset?: number;
  scale?: ScaleProps;
  // New props for button styling
  variant?: 'filled' | 'transparent';
  size?: 'compact' | 'small' | 'medium' | 'large';
  href?: string;
  target?: string;
  rel?: string;
  screen?: any; // Screen detection object
}

// ==============================|| ENHANCED ANIMATION BUTTON ||============================== //

export default function AnimateButton({
  children,
  type = 'scale',
  direction = 'right',
  offset = 10,
  scale = { hover: 1, tap: 0.9 },
  variant,
  size = 'medium',
  href,
  target,
  rel,
  screen
}: AnimateButtonProps) {
  const theme = useTheme();

  // Original animation logic
  let offset1;
  let offset2;
  switch (direction) {
    case 'up':
    case 'left':
      offset1 = offset;
      offset2 = 0;
      break;
    case 'right':
    case 'down':
    default:
      offset1 = 0;
      offset2 = offset;
      break;
  }

  const [x, cycleX] = useCycle(offset1, offset2);
  const [y, cycleY] = useCycle(offset1, offset2);

  // Get button styles based on variant and screen
  const getButtonStyles = () => {
    if (!variant || !screen) return {};

    // Size configurations
    const sizeConfig = {
      compact: {
        minWidth: '120px',
        height: '35px',
        fontSize: '0.875rem',
        padding: theme.spacing(1.5, 2.5)
      },
      small: {
        minWidth: '120px',
        height: '44px',
        fontSize: '0.875rem',
        padding: theme.spacing(1.5, 2.5)
      },
      medium: {
        minWidth: screen.isDesktop ? '180px' : screen.isTablet ? '160px' : '140px',
        height: screen.isDesktop ? '56px' : screen.isTablet ? '52px' : '48px',
        fontSize: screen.isDesktop ? '1.1rem' : screen.isTablet ? '1rem' : '0.95rem',
        padding: theme.spacing(1.75, 3.5)
      },
      large: {
        minWidth: '200px',
        height: '60px',
        fontSize: '1.2rem',
        padding: theme.spacing(2, 4)
      }
    };

    const currentSize = sizeConfig[size];

    // Base styles shared by both variants
    const baseStyles = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing(1.2),
      minWidth: currentSize.minWidth,
      height: currentSize.height,
      padding: currentSize.padding,
      fontSize: currentSize.fontSize,
      fontWeight: 700,
      fontFamily: theme.typography.fontFamily,
      borderRadius: '12px',
      textTransform: 'none' as const,
      textDecoration: 'none',
      cursor: 'pointer',
      position: 'relative' as const,
      overflow: 'hidden' as const,
      letterSpacing: '0.3px',
      backgroundSize: '200% 200%',

      // Shared shadow system
      boxShadow: `
        0 2px 8px rgba(0, 0, 0, 0.06),
        0 1px 4px ${theme.palette.primary.main}25,
        inset 0 1px 0 rgba(255, 255, 255, 0.15)
      `,

      // Shared border enhancement
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: '12px',
        padding: '1px',
        background: `linear-gradient(135deg, 
          rgba(255, 255, 255, 0.2) 0%, 
          rgba(255, 255, 255, 0.05) 50%, 
          rgba(255, 255, 255, 0.2) 100%)`,
        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        maskComposite: 'xor',
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        pointerEvents: 'none'
      },

      // Shared transitions
      transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',

      // Shared hover effects
      '&:hover': {
        transform: 'translateY(-2px) scale(1.015)',
        backgroundPosition: '100% 100%',
        boxShadow: `
          0 6px 20px rgba(0, 0, 0, 0.08),
          0 3px 12px ${theme.palette.primary.main}35,
          inset 0 1px 0 rgba(255, 255, 255, 0.25)
        `,

        '&::after': {
          left: '100%'
        },

        '& .button-icon': {
          transform: 'translateX(2px) scale(1.05)',
          filter: 'brightness(1.1)'
        },

        '& .button-text': {
          textShadow: '0 0 6px rgba(255, 255, 255, 0.2)'
        }
      },

      // Shared active state
      '&:active': {
        transform: 'translateY(-1px) scale(1.005)',
        transition: 'all 0.15s ease-out',
        boxShadow: `
          0 3px 10px rgba(0, 0, 0, 0.12),
          0 2px 6px ${theme.palette.primary.main}40,
          inset 0 1px 2px rgba(0, 0, 0, 0.05)
        `
      },

      // Shared focus state
      '&:focus': {
        outline: 'none',
        boxShadow: `
          0 2px 8px rgba(0, 0, 0, 0.06),
          0 1px 4px ${theme.palette.primary.main}25,
          0 0 0 2px ${theme.palette.primary.main}25
        `
      }
    };

    // Variant-specific styles
    if (variant === 'filled') {
      return {
        ...baseStyles,
        color: '#FFFFFF',
        border: 'none',
        background: `linear-gradient(135deg, 
          ${theme.palette.primary.main} 0%, 
          ${theme.palette.primary.light} 50%, 
          ${theme.palette.primary.main} 100%)`
      };
    }

    if (variant === 'transparent') {
      return {
        ...baseStyles,
        color: theme.palette.primary.main,
        border: `2px solid ${theme.palette.primary.main}`,
        background: 'transparent',
        backgroundColor: 'rgba(255, 255, 255, 0.02)'
      };
    }

    return {};
  };

  // Render button with styles if variant is provided
  const renderStyledButton = () => {
    const buttonStyles = getButtonStyles();

    return (
      <Box component={href ? 'a' : 'button'} href={href} target={target} rel={rel} sx={buttonStyles}>
        {children}
      </Box>
    );
  };

  // Animation wrapper function
  const wrapWithAnimation = (content: ReactNode) => {
    switch (type) {
      case 'rotate':
        return (
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, repeatType: 'loop', duration: 2, repeatDelay: 0 }}>
            {content}
          </motion.div>
        );
      case 'slide':
        if (direction === 'up' || direction === 'down') {
          return (
            <motion.div animate={{ y: y !== undefined ? y : '' }} onHoverEnd={() => cycleY()} onHoverStart={() => cycleY()}>
              {content}
            </motion.div>
          );
        }
        return (
          <motion.div animate={{ x: x !== undefined ? x : '' }} onHoverEnd={() => cycleX()} onHoverStart={() => cycleX()}>
            {content}
          </motion.div>
        );
      case 'scale':
      default:
        if (typeof scale === 'number') {
          scale = {
            hover: scale,
            tap: scale
          };
        }
        return (
          <motion.div whileHover={{ scale: scale?.hover }} whileTap={{ scale: scale?.tap }}>
            {content}
          </motion.div>
        );
    }
  };

  // If variant is provided, render styled button with animation
  if (variant) {
    return wrapWithAnimation(renderStyledButton());
  }

  // Original behavior for backward compatibility
  return wrapWithAnimation(children);
}
