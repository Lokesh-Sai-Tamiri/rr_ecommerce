/**
 * @fileoverview Landing page theme overrides
 * Maintains exact UI while integrating with theme system
 */

import { Theme } from '@mui/material/styles';

// ===============================||  OVERRIDES - LANDING  ||=============================== //

export default function Landing(theme: Theme) {
  return {
    MuiButton: {
      variants: [
        {
          props: { variant: 'landingContained' as const },
          style: {
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            fontWeight: 500,
            borderRadius: '4px',
            textTransform: 'none' as const,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            backgroundColor: '#1976d2',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#1976d2',
              filter: 'brightness(1.1)',
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            },
            '&:active': {
              transform: 'translateY(0px)'
            }
          }
        },
        {
          props: { variant: 'landingOutlined' as const },
          style: {
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            fontWeight: 500,
            borderRadius: '4px',
            textTransform: 'none' as const,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            borderColor: '#1976d2',
            color: '#1976d2',
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: '#1976d2',
              color: '#ffffff',
              borderColor: '#1976d2',
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }
          }
        }
      ]
    },

    MuiTypography: {
      variants: [
        {
          props: { variant: 'landingHero' as const },
          style: {
            fontWeight: 900,
            lineHeight: 1.2,
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            letterSpacing: '-0.025em',
            position: 'relative',
            color: '#212121',
            animation: 'fadeInUp 0.8s ease-out'
          }
        },
        {
          props: { variant: 'landingSubtitle' as const },
          style: {
            fontWeight: 500,
            color: 'rgba(17, 82, 147, 0.8)',
            lineHeight: 1.8,
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            textAlign: 'left' as const
          }
        }
      ]
    }
  };
}
