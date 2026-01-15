// material-ui
import { alpha, Theme } from '@mui/material/styles';

// project imports
import { ThemeMode } from 'config';

// ===============================||  OVERRIDES - CHIP  ||=============================== //

export default function Chip(theme: Theme) {
  return {
    MuiChip: {
      defaultProps: {
        color: 'primary' as const
      },
      styleOverrides: {
        root: {
          '&.MuiChip-deletable .MuiChip-deleteIcon': {
            color: 'inherit'
          }
        }
      },
      variants: [
        {
          props: { variant: 'light' as const },
          style: {
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.mode === ThemeMode.DARK ? alpha(theme.palette.primary.dark, 0.15) : theme.palette.primary.light,
            '&.MuiChip-clickable': {
              '&:hover': {
                backgroundColor: theme.palette.mode === ThemeMode.DARK ? theme.palette.primary.light : theme.palette.primary.dark,
                color: theme.palette.mode === ThemeMode.DARK ? theme.palette.primary.dark : theme.palette.primary.light
              }
            }
          }
        }
      ]
    }
  };
}
