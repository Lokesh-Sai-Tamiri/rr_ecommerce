/**
 * @fileoverview Styling configurations for AppBar components
 */

import { THEME_COLORS } from './constants';

export const logoScaleStyles = {
  textAlign: 'left',
  cursor: 'pointer',
  margin: 0,
  padding: 0,
  display: 'block',
  transform: {
    xs: 'scale(0.25)',
    sm: 'scale(0.5)',
    md: 'scale(0.75)',
    lg: 'scale(0.75)'
  },
  transformOrigin: 'left center',
  transition: 'transform 0.3s ease',
  // Portrait mode optimization - bigger logo (except iPhone SE)
  '@media (orientation: portrait)': {
    transform: {
      xs: 'scale(0.5)',
      sm: 'scale(0.75)',
      md: 'scale(0.9)',
      lg: 'scale(1.1)'
    }
  },
  // Device-specific scaling optimizations
  '@media (max-width: 320px)': {
    transform: 'scale(0.2)'
  },
  '@media (max-width: 320px) and (orientation: portrait)': {
    transform: 'scale(0.4)'
  },
  '@media (min-width: 321px) and (max-width: 375px)': {
    transform: 'scale(0.65)'
  },
  '@media (min-width: 321px) and (max-width: 375px) and (orientation: portrait)': {
    transform: 'scale(0.5)'
  },
  '@media (min-width: 376px) and (max-width: 390px)': {
    transform: 'scale(0.3)'
  },
  '@media (min-width: 376px) and (max-width: 390px) and (orientation: portrait)': {
    transform: 'scale(0.6)'
  },
  '@media (min-width: 391px) and (max-width: 428px)': {
    transform: 'scale(0.32)'
  },
  '@media (min-width: 391px) and (max-width: 428px) and (orientation: portrait)': {
    transform: 'scale(0.65)'
  },
  '@media (min-width: 429px) and (max-width: 480px)': {
    transform: 'scale(0.35)'
  },
  '@media (min-width: 429px) and (max-width: 480px) and (orientation: portrait)': {
    transform: 'scale(0.7)'
  },
  '@media (min-width: 481px) and (max-width: 768px)': {
    transform: 'scale(0.4)'
  },
  '@media (min-width: 481px) and (max-width: 768px) and (orientation: portrait)': {
    transform: 'scale(0.75)'
  },
  '@media (min-width: 769px) and (max-width: 1023px)': {
    transform: 'scale(0.55)'
  },
  '@media (min-width: 769px) and (max-width: 1023px) and (orientation: portrait)': {
    transform: 'scale(0.85)'
  },
  '@media (min-width: 1024px) and (max-width: 1399px)': {
    transform: 'scale(0.75)'
  },
  '@media (min-width: 1024px) and (max-width: 1399px) and (orientation: portrait)': {
    transform: 'scale(0.95)'
  }
};

export const getNavButtonStyles = () => ({
  fontSize: { md: '14px', lg: '16px' },
  fontWeight: 700,
  color: THEME_COLORS.secondary,
  textTransform: 'none',
  whiteSpace: 'nowrap',
  borderRadius: 2,
  px: { md: 1, lg: 1.5 },
  py: 0.5,
  transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  '&:hover': {
    backgroundColor: THEME_COLORS.primary,
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(25, 118, 210, 0.4)',
    color: THEME_COLORS.white
  },
  '&:active': {
    transform: 'translateY(0)',
    boxShadow: '0 2px 4px rgba(25, 118, 210, 0.6)'
  }
});

export const getMobileMenuItemStyles = () => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  textAlign: 'left',
  px: 2,
  py: 1,
  textDecoration: 'none',
  textTransform: 'none',
  fontSize: '1rem',
  fontWeight: 700,
  lineHeight: 1.75,
  borderRadius: 2,
  transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  color: THEME_COLORS.secondary,
  backgroundColor: 'transparent',
  '& .MuiButton-endIcon': {
    marginLeft: 'auto',
    marginRight: 0,
    color: THEME_COLORS.secondary
  },
  '&:hover': {
    backgroundColor: THEME_COLORS.secondary,
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(17, 82, 147, 0.4)',
    textDecoration: 'none',
    color: THEME_COLORS.white,
    '& .MuiButton-endIcon': {
      color: THEME_COLORS.white
    }
  },
  '&:active': {
    transform: 'translateY(0)',
    boxShadow: '0 2px 4px rgba(17, 82, 147, 0.6)'
  },
  '@media (max-width: 375px)': {
    fontSize: '0.85rem',
    py: 0.75,
    px: 1.5,
    lineHeight: 1.6
  },
  '@media (max-width: 320px)': {
    fontSize: '0.8rem',
    py: 0.5,
    px: 1,
    lineHeight: 1.5
  }
});
