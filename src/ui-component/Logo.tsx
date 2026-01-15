'use client';

// material-ui
import { useTheme } from '@mui/material/styles';

// project imports
import { ThemeMode } from 'config';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * const logoDark = '/assets/images/logo-dark.svg';
 * const logo = '/assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //
import Image from 'next/image';

export default function Logo() {
  const theme = useTheme();
  const logoDark = '/assets/images/logo-dark.png';
  const logo = '/assets/images/logo.png';

  return <Image src={theme.palette.mode === ThemeMode.DARK ? logoDark : logo} alt="Radiant Research" width={240} height={80} />;
}
