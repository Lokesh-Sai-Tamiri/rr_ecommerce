/**
 * @fileoverview Desktop navigation menu component
 */

'use client';

import { Stack } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useTheme } from '@mui/material/styles';
import { NAVIGATION_ITEMS } from '../constants';
import { DesktopNavigationProps } from '../types';
import NavButton from './NavButton';
import useConfig from 'hooks/useConfig';
import { JSX } from 'react';

/**
 * Desktop navigation menu with horizontal layout
 * Hidden on mobile devices when hamburger menu is shown
 *
 * @param {DesktopNavigationProps} props - Component props
 * @returns {JSX.Element} Desktop navigation stack
 */
export default function DesktopNavigation({ showHamburgerMenu }: DesktopNavigationProps): JSX.Element {
  const pathname = usePathname();
  const theme = useTheme();
  const { i18n } = useConfig();

  /**
   * Check if a navigation item is currently active
   */
  const isActiveItem = (itemHref: string): boolean => {
    // Handle exact matches
    if (pathname === itemHref) return true;

    // Handle home page - active when on root
    if (itemHref === '/' && pathname === '/') return true;

    // Handle other pages - active when pathname starts with the item href
    if (itemHref !== '/' && pathname.startsWith(itemHref)) return true;

    return false;
  };

  return (
    <Stack
      direction="row"
      sx={{
        display: showHamburgerMenu ? 'none' : 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'inherit', // Add this line
        '& *': {
          color: 'inherit' // Force all children to inherit color
        }
      }}
      spacing={{ xs: 0.5, md: 1, lg: 1.5 }}
    >
      {NAVIGATION_ITEMS.map((item, index) => {
        // Hide pricing tab when locale is Korean
        if (item.label === "Pricing" && i18n === "ko") {
          return null;
        }

        const isActive = isActiveItem(item.href);

        return (
          <div key={index} style={{ position: 'relative' }}>
            <NavButton
              item={item}
              isActive={isActive}
              sx={{
                position: 'relative',
                '&::after': isActive
                  ? {
                      content: '""',
                      position: 'absolute',
                      bottom: -2,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '80%',
                      height: 3,
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: '2px 2px 0 0',
                      transition: theme.transitions.create(['width', 'opacity'], {
                        duration: theme.transitions.duration.short
                      })
                    }
                  : {},
                '&:hover::after': {}
              }}
            />
          </div>
        );
      })}
    </Stack>
  );
}
