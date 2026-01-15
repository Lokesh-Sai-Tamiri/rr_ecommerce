import '@mui/material/Button';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    customBlue: true;
    customTransparent: true;
    landingContained: true;
    landingOutlined: true;
  }
}
