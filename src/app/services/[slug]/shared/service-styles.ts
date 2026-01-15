/**
 * @fileoverview Shared styles and utilities for service components
 */

import { Theme } from '@mui/material/styles';

export const getServiceContainerStyles = (theme: Theme) => ({
  maxWidth: 'xl' as const,
  sx: {
    px: {
      xs: theme.spacing(1.5),
      sm: theme.spacing(2.5),
      md: theme.spacing(3),
      lg: theme.spacing(4)
    },
    py: {
      xs: theme.spacing(3),
      sm: theme.spacing(4),
      md: theme.spacing(5),
      lg: theme.spacing(6)
    }
  }
});

export const getMainBoxStyles = (theme: Theme) => ({
  minHeight: '100vh',
  position: 'relative',
  pt: {
    xs: theme.spacing(10),
    sm: theme.spacing(8),
    md: theme.spacing(6),
    lg: theme.spacing(6)
  },
  pb: { xs: 3, md: 4 },
  px: {
    xs: theme.spacing(2),
    sm: theme.spacing(3),
    md: theme.spacing(4),
    lg: theme.spacing(5)
  },
  '&::before': {
    content: '""',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'url(/assets/images/home-bg.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    opacity: 0.1,
    zIndex: -2
  },
  '&::after': {
    content: '""',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(245, 247, 250, 0.8) 0%, rgba(195, 207, 226, 0.8) 100%)',
    zIndex: -1
  }
});

export const getHeroImageStyles = () => ({
  position: 'relative',
  height: {
    xs: '180px',
    sm: '220px',
    md: '260px',
    lg: '260px'
  },
  overflow: 'hidden',
  borderRadius: 8,
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(45deg, rgba(17, 82, 147, 0.3), rgba(25, 118, 210, 0.2))',
    zIndex: 1,
    animation: 'shimmer 3s ease-in-out infinite alternate'
  },
  '@keyframes shimmer': {
    '0%': { opacity: 0.3 },
    '100%': { opacity: 0.1 }
  }
});

export const getImageStyles = (isMobile = false) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center center',
  transition: 'transform 0.6s ease',
  display: isMobile ? { xs: 'block', md: 'none' } : { xs: 'none', md: 'block' },
  '&:hover': {
    transform: 'scale(1.05)'
  }
});

export const getFloatingParticlesStyles = () => ({
  position: 'absolute',
  inset: 0,
  zIndex: 2,
  pointerEvents: 'none',
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    width: '6px',
    height: '6px',
    background: 'rgba(255, 255, 255, 0.6)',
    borderRadius: '50%',
    animation: 'float 4s ease-in-out infinite'
  },
  '&::before': {
    top: '20%',
    left: '15%',
    animationDelay: '0s'
  },
  '&::after': {
    top: '60%',
    right: '20%',
    animationDelay: '2s'
  }
});

export const getTitleStyles = (theme: Theme) => ({
  fontSize: { xs: '1.8rem', md: '2.5rem' },
  fontWeight: 700,
  color: theme.palette.primary.main,
  mb: 1,
  textAlign: 'center',
  animation: 'slideInFromLeft 1s ease-out 0.3s both',
  '@keyframes slideInFromLeft': {
    '0%': {
      opacity: 0,
      transform: 'translateX(-50px)'
    },
    '100%': {
      opacity: 1,
      transform: 'translateX(0)'
    }
  }
});

export const getSubtitleStyles = (theme: Theme) => ({
  fontSize: { xs: '1rem', md: '1.2rem' },
  fontWeight: 500,
  color: theme.palette.text.primary,
  mb: 3,
  textAlign: 'center',
  animation: 'slideInFromRight 1s ease-out 0.5s both',
  '@keyframes slideInFromRight': {
    '0%': {
      opacity: 0,
      transform: 'translateX(50px)'
    },
    '100%': {
      opacity: 1,
      transform: 'translateX(0)'
    }
  }
});

export const getHighlightChipStyles = (theme: Theme, index: number) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
  border: `1px solid ${theme.palette.primary.main}30`,
  color: theme.palette.primary.main,
  fontWeight: 600,
  fontSize: '0.85rem',
  mt: 1,
  px: 2,
  py: 1,
  borderRadius: 5,
  transition: 'all 0.3s ease',
  animation: `popIn 0.6s ease-out ${0.9 + index * 0.1}s both`,
  '&:hover': {
    transform: 'translateY(-3px) scale(1.05)',
    background: `linear-gradient(135deg, ${theme.palette.primary.main}25, ${theme.palette.secondary.main}25)`,
    boxShadow: `0 8px 25px ${theme.palette.primary.main}30`
  },
  '@keyframes popIn': {
    '0%': {
      opacity: 0,
      transform: 'scale(0.8) translateY(20px)'
    },
    '80%': {
      transform: 'scale(1.1) translateY(-5px)'
    },
    '100%': {
      opacity: 1,
      transform: 'scale(1) translateY(0)'
    }
  }
});

export const getSectionIconStyles = (theme: Theme) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 50,
  height: 50,
  borderRadius: '50%',
  background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.primary.main}05)`,
  border: `2px solid ${theme.palette.primary.main}30`,
  animation: 'pulse 2s ease-in-out infinite',
  '@keyframes pulse': {
    '0%, 100%': {
      transform: 'scale(1)',
      boxShadow: `0 0 0 0 ${theme.palette.primary.main}40`
    },
    '50%': {
      transform: 'scale(1.05)',
      boxShadow: `0 0 0 10px ${theme.palette.primary.main}00`
    }
  }
});

export const getServiceCardStyles = (theme: Theme, sectionIndex: number, itemIndex: number) => ({
  background: 'linear-gradient(135deg, #ffffff, #1976d215)',
  backdropFilter: 'blur(20px)',
  border: `1px solid ${theme.palette.primary.main}15`,
  borderRadius: 4,
  p: {
    xs: theme.spacing(2.5),
    sm: theme.spacing(3),
    md: theme.spacing(3.5)
  },
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: `0 15px 35px rgba(0, 0, 0, 0.08)`,
  animation: `cardSlideIn 0.5s ease-out ${0.1 + itemIndex * 0.05}s both`,
  animationPlayState: 'paused',
  '&.in-view': { 
    animationPlayState: 'running'
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.main}80)`,
    borderRadius: '5px 5px 0 0',
    transform: 'scaleX(0)',
    transformOrigin: 'left',
    transition: 'transform 0.6s ease'
  },
  '&:hover': {
    transform: `translateY(-8px) ${itemIndex % 2 === 0 ? 'rotate(1deg)' : 'rotate(-1deg)'}`,
    boxShadow: `0 25px 50px rgba(0, 0, 0, 0.15)`,
    background: 'linear-gradient(135deg, #ffffff, #1976d225)',
    border: `2px solid ${theme.palette.primary.main}30`,
    '&::before': {
      transform: 'scaleX(1)'
    },
    '&::after': {
      opacity: 1
    }
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: `linear-gradient(135deg, ${theme.palette.primary.main}03, transparent 60%)`,
    opacity: 0,
    transition: 'opacity 0.3s ease',
    pointerEvents: 'none'
  },
  '@keyframes cardSlideIn': {
    '0%': {
      opacity: 0,
      transform: 'translateY(30px) scale(0.9)'
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0) scale(1)'
    }
  }
});

export const getCTASectionStyles = (theme: Theme) => ({
  background: `url('/assets/images/home-bg.png')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backdropFilter: 'blur(25px)',
  borderRadius: 6,
  p: {
    xs: theme.spacing(5),
    sm: theme.spacing(6),
    md: theme.spacing(8),
    lg: theme.spacing(10)
  },
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  mt: {
    xs: theme.spacing(4),
    sm: theme.spacing(5),
    md: theme.spacing(6)
  },
  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25), 0 10px 30px rgba(0, 0, 0, 0.15), 0 5px 15px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  animation: 'ctaSlideUp 0.6s ease-out 0.2s both',
  animationPlayState: 'paused',
  '.in-view &': { 
    animationPlayState: 'running'
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: `
      radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1) 0%, transparent 50%),
      radial-gradient(circle at 70% 70%, rgba(255,255,255,0.05) 0%, transparent 50%)
    `,
    animation: 'float 6s ease-in-out infinite'
  },
  '@keyframes float': {
    '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
    '33%': { transform: 'translate(30px, -30px) rotate(120deg)' },
    '66%': { transform: 'translate(-20px, 20px) rotate(240deg)' }
  },
  '@keyframes ctaSlideUp': {
    '0%': {
      opacity: 0,
      transform: 'translateY(80px) scale(0.9)'
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0) scale(1)'
    }
  }
});
