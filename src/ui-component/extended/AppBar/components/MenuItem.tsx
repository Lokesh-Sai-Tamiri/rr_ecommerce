/**
 * @fileoverview Mobile menu item component
 */

'use client';

import RouterLink from 'next/link';
import { Button, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRouter, usePathname } from 'next/navigation';
import { MenuItemProps } from '../types';
import { getMobileMenuItemStyles } from '../styles';
import { JSX } from 'react';

/**
 * Menu item component for mobile drawer navigation
 * Provides consistent styling and hover effects for mobile menu items
 *
 * @param {MenuItemProps} props - MenuItem props
 * @returns {JSX.Element} Styled menu item button
 */
export default function MenuItem({ href, children, onClick }: MenuItemProps & { onClick: () => void }): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (event: React.MouseEvent) => {
    // Always close the drawer first
    onClick();
    
    // Check if we're navigating to the same page
    if (pathname === href || pathname.startsWith(href)) {
      // Prevent default navigation and manually trigger router.push to ensure refresh
      event.preventDefault();
      router.push(href);
    }
    // If it's a different page, let Next.js Link handle it normally
  };

  return (
    <Button
      variant="customTransparent"
      color="inherit"
      component={RouterLink}
      href={href}
      onClick={handleClick}
      endIcon={<ExpandMoreIcon />}
      sx={{
        ...getMobileMenuItemStyles(),
        minHeight: 56,
        height: 56,
        '& .MuiButton-endIcon': {
          marginLeft: 'auto',
          marginRight: 0,
          color: 'inherit',
          fontSize: '2rem !important',
          width: '2rem !important',
          height: '2rem !important',
          transform: 'rotate(-90deg)', // Rotate to point right like a chevron
          transition: 'all 0.3s ease-in-out'
        },
        '&:hover .MuiButton-endIcon': {
          color: 'inherit',
          fontSize: '2rem !important',
          width: '2rem !important',
          height: '2rem !important'
        }
      }}
    >
      <Box
        sx={{
          textAlign: 'left',
          flex: 1,
          fontSize: '1rem',
          fontWeight: 700,
          lineHeight: 1.75,
          transition: 'color 0.3s ease',
          color: 'inherit',
          '@media (max-width: 375px)': {
            fontSize: '0.85rem',
            lineHeight: 1.6
          },
          '@media (max-width: 320px)': {
            fontSize: '0.8rem',
            lineHeight: 1.5
          }
        }}
      >
        {children}
      </Box>
    </Button>
  );
}
