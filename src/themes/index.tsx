'use client';

import { useMemo, ReactNode } from 'react';

// material-ui
import { createTheme, ThemeOptions, ThemeProvider, Theme, TypographyVariantsOptions, StyledEngineProvider } from '@mui/material/styles';
import { GlobalStyles } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

// ADD STEP 1 - Type declarations for custom typography variants
declare module '@mui/material/styles' {
  interface TypographyVariants {
    heroLarge: React.CSSProperties;
    heroMedium: React.CSSProperties;
    heroSmall: React.CSSProperties;
    subtitleLarge: React.CSSProperties;
    subtitleMedium: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    heroLarge?: React.CSSProperties;
    heroMedium?: React.CSSProperties;
    heroSmall?: React.CSSProperties;
    subtitleLarge?: React.CSSProperties;
    subtitleMedium?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    heroLarge: true;
    heroMedium: true;
    heroSmall: true;
    subtitleLarge: true;
    subtitleMedium: true;
  }
}

// project imports
import useConfig from 'hooks/useConfig';
import Palette from './palette';
import Typography from './typography';

import componentStyleOverrides from './compStyleOverride';
import customShadows from './shadows';

// types
import { CustomShadowProps } from 'types/default-theme';

interface Props {
  children: ReactNode;
}

// Move this function outside the component
const getResponsiveFontSizes = (theme: Theme) => ({
  getHeroSize: (screen: any) => {
    if (screen.isDesktop) {
      return {
        [theme.breakpoints.up('md')]: { fontSize: '2.75rem' },
        [theme.breakpoints.up('lg')]: { fontSize: '3.25rem' },
        [theme.breakpoints.up('xl')]: { fontSize: '3.75rem' }
      };
    }

    if (screen.isTablet) {
      return screen.isLandscape
        ? {
            [theme.breakpoints.up('xs')]: { fontSize: '1.4rem' },
            [theme.breakpoints.up('sm')]: { fontSize: '1.6rem' },
            [theme.breakpoints.up('md')]: { fontSize: '1.8rem' }
          }
        : {
            [theme.breakpoints.up('xs')]: { fontSize: '1.75rem' },
            [theme.breakpoints.up('sm')]: { fontSize: '2rem' },
            [theme.breakpoints.up('md')]: { fontSize: '2.125rem' }
          };
    }

    return screen.isSmallMobile
      ? screen.isLandscape
        ? { [theme.breakpoints.up('xs')]: { fontSize: '1.2rem' } }
        : { [theme.breakpoints.up('xs')]: { fontSize: '1.75rem' } }
      : screen.isLandscape
        ? {
            [theme.breakpoints.up('xs')]: { fontSize: '1.5rem' },
            [theme.breakpoints.up('sm')]: { fontSize: '1.75rem' }
          }
        : {
            [theme.breakpoints.up('xs')]: { fontSize: '2rem' },
            [theme.breakpoints.up('sm')]: { fontSize: '2.5rem' }
          };
  }
});

// Global styles for landing page animations
const landingGlobalStyles = (
  <GlobalStyles
    styles={{
      '@keyframes fadeInUp': {
        from: {
          opacity: 0,
          transform: 'translateY(30px)'
        },
        to: {
          opacity: 1,
          transform: 'translateY(0)'
        }
      }
    }}
  />
);

export default function ThemeCustomization({ children }: Props) {
  const { borderRadius, fontFamily, mode, outlinedFilled, presetColor, themeDirection } = useConfig();

  const theme: Theme = useMemo<Theme>(() => Palette(mode, presetColor), [mode, presetColor]);

  const themeTypography: TypographyVariantsOptions = useMemo<TypographyVariantsOptions>(() => {
    const baseTypography = Typography(theme, borderRadius, fontFamily);

    return {
      ...baseTypography,
      // Add custom variants
      heroLarge: {
        fontSize: '1.75rem',
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: '-0.01562em',
        fontFamily: fontFamily,
        '@media (min-width:960px)': {
          fontSize: '2.75rem'
        },
        '@media (min-width:1280px)': {
          fontSize: '3.25rem'
        },
        '@media (min-width:1920px)': {
          fontSize: '3.75rem'
        }
      },

      heroMedium: {
        fontSize: '1.5rem',
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: '-0.00833em',
        fontFamily: fontFamily,
        '@media (min-width:600px)': {
          fontSize: '1.75rem'
        },
        '@media (min-width:960px)': {
          fontSize: '2rem'
        },
        '@media (min-width:1280px)': {
          fontSize: '2.5rem'
        }
      },

      heroSmall: {
        fontSize: '1.2rem',
        fontWeight: 700,
        lineHeight: 1.2,
        fontFamily: fontFamily,
        '@media (min-width:600px)': {
          fontSize: '1.4rem'
        },
        '@media (min-width:960px)': {
          fontSize: '1.6rem'
        },
        '@media (min-width:1280px)': {
          fontSize: '1.8rem'
        }
      },

      subtitleLarge: {
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1.8,
        fontFamily: fontFamily,
        '@media (min-width:600px)': {
          fontSize: '1.125rem'
        },
        '@media (min-width:960px)': {
          fontSize: '1.25rem'
        }
      },

      subtitleMedium: {
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: 1.8,
        fontFamily: fontFamily,
        '@media (min-width:600px)': {
          fontSize: '1rem'
        },
        '@media (min-width:960px)': {
          fontSize: '1.125rem'
        }
      }
    } as TypographyVariantsOptions;
  }, [theme, borderRadius, fontFamily]);

  const themeCustomShadows: CustomShadowProps = useMemo<CustomShadowProps>(() => customShadows(mode, theme), [mode, theme]);

  const themeOptions: ThemeOptions = useMemo(
    () => ({
      direction: themeDirection,
      palette: theme.palette,
      mixins: {
        toolbar: {
          minHeight: '48px',
          padding: '16px',
          '@media (min-width: 600px)': {
            minHeight: '48px'
          }
        }
      },
      typography: themeTypography,
      customShadows: themeCustomShadows,
      // Add responsive utilities properly in theme options
      responsive: {
        fontSizes: getResponsiveFontSizes(theme)
      }
    }),
    [themeDirection, theme, themeCustomShadows, themeTypography]
  );

  const themes: Theme = createTheme(themeOptions);

  // Apply component style overrides with proper error handling
  try {
    themes.components = componentStyleOverrides(themes, borderRadius, outlinedFilled) as any;
  } catch (error) {
    console.warn('Component style overrides failed:', error);
    themes.components = {};
  }

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes}>
        <CssBaseline enableColorScheme />
        {landingGlobalStyles}
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
