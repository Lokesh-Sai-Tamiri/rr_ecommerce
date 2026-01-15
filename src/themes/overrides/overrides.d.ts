import '@mui/material/Button';
import '@mui/material/Chip';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    customBlue: true;
    customTransparent: true;
  }
}
