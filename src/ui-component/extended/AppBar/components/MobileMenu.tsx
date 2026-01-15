/**
 * @fileoverview Mobile menu component with hamburger icon and drawer
 */

'use client';

import { Box, IconButton, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { THEME_COLORS } from '../constants';
import { MobileMenuProps } from '../types';
import MobileDrawer from './MobileDrawer';
import { JSX } from 'react';

/**
 * Mobile menu section with hamburger icon and drawer
 * Only visible on mobile devices
 *
 * @param {MobileMenuProps} props - Component props
 * @returns {JSX.Element} Mobile menu component
 */
export default function MobileMenu({ showHamburgerMenu, drawerToggle, drawerToggler, FooterComponent }: MobileMenuProps): JSX.Element {
  return (
    <Box sx={{ display: showHamburgerMenu ? 'flex' : 'none', justifyContent: 'flex-end', ml: 0 }}>
      <Tooltip title="Open Navigation Menu" arrow>
        <IconButton
          color="inherit"
          onClick={drawerToggler(true)}
          size="large"
          sx={{
            color: THEME_COLORS.secondary
          }}
        >
          <MenuIcon />
        </IconButton>
      </Tooltip>

      <MobileDrawer drawerToggle={drawerToggle} drawerToggler={drawerToggler} FooterComponent={FooterComponent} />
    </Box>
  );
}
