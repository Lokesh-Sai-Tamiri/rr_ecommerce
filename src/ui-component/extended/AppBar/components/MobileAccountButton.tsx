/**
 * @fileoverview Mobile account button component
 */

'use client';

import { Box, Button } from '@mui/material';
import { IconUser } from '@tabler/icons-react';
import { THEME_COLORS } from '../constants';
import { AccountPopup } from 'components/AccountPopup';
import { JSX, useState } from 'react';

/**
 * Mobile account button with icon and responsive styling
 *
 * @param {Object} props - Component props
 * @param {() => void} props.onClick - Click handler
 * @returns {JSX.Element} Mobile account button
 */
export default function MobileAccountButton({ onClick }: { onClick: () => void }): JSX.Element {
  const [accountPopupOpen, setAccountPopupOpen] = useState(false);

  const handleAccountClick = () => {
    setAccountPopupOpen(true);
    onClick(); // Close the mobile drawer
  };

  const handleAccountPopupClose = () => {
    setAccountPopupOpen(false);
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        mt: 2
      }}
    >
      <Button
        variant="customTransparent"
        color="inherit"
        onClick={handleAccountClick}
        startIcon={
          <Box
            sx={{
              border: `2px solid ${THEME_COLORS.secondary}`,
              borderRadius: 2,
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <IconUser size={20} color={THEME_COLORS.secondary} />
          </Box>
        }
        sx={{
          px: 2,
          py: 1,
          fontSize: '1rem',
          fontWeight: 700,
          textTransform: 'none',
          backgroundColor: 'transparent',
          borderRadius: 2,
          transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          color: THEME_COLORS.secondary,
          '&:hover': {
            backgroundColor: THEME_COLORS.secondary,
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 8px rgba(17, 82, 147, 0.4)',
            color: THEME_COLORS.white,
            '& .MuiBox-root': {
              borderColor: THEME_COLORS.white,
              '& svg': {
                color: THEME_COLORS.white
              }
            }
          },
          '&:active': {
            transform: 'translateY(0)',
            boxShadow: '0 2px 4px rgba(17, 82, 147, 0.6)'
          },
          // Responsive typography for small devices
          '@media (max-width: 375px)': {
            fontSize: '0.85rem',
            py: 0.75,
            px: 1.5
          },
          '@media (max-width: 320px)': {
            fontSize: '0.8rem',
            py: 0.5,
            px: 1
          }
        }}
      >
        My Account
      </Button>

      {/* Account Popup */}
      <AccountPopup
        open={accountPopupOpen}
        onClose={handleAccountPopupClose}
      />
    </Box>
  );
}
