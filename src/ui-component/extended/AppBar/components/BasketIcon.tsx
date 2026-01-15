/**
 * @fileoverview Basket icon component with cart count badge
 */

"use client";

import { Box, IconButton, Badge, Tooltip } from "@mui/material";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { THEME_COLORS } from "../constants";
import useConfig from "hooks/useConfig";
import { JSX } from "react";

interface BasketIconProps {
  showHamburgerMenu: boolean;
  cartCount: number;
  onCartClick: () => void;
}

/**
 * Basket icon with cart count badge
 * Hidden on mobile devices when hamburger menu is shown
 *
 * @param {BasketIconProps} props - Component props
 * @returns {JSX.Element} Basket icon button with count
 */
export default function BasketIcon({
  showHamburgerMenu,
  cartCount,
  onCartClick,
}: BasketIconProps): JSX.Element {
  const { i18n } = useConfig();

  // Hide basket icon when Korean language is selected
  if (i18n === "ko") {
    return <></>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <Tooltip 
        title="View Cart" 
        arrow 
      >
                        <IconButton
                  onClick={onCartClick}
                  color="inherit"
                  size="large"
                  sx={{
                    color: THEME_COLORS.secondary,
                    backgroundColor: "transparent",
                    borderRadius: 2,
                    padding: "4px",
                    minWidth: 36,
                    minHeight: 36,
                    border: `1px solid ${THEME_COLORS.secondary}`,
                    transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    "&:hover": {
                      backgroundColor: THEME_COLORS.secondary,
                      color: THEME_COLORS.white,
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 8px rgba(17, 82, 147, 0.4)",
                    },
                    "&:active": {
                      transform: "translateY(0)",
                      boxShadow: "0 2px 4px rgba(17, 82, 147, 0.6)",
                    },
                  }}
                >
          <Badge 
            badgeContent={cartCount} 
            sx={{
              '& .MuiBadge-badge': {
                backgroundColor: '#115293',
                color: 'white',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                minWidth: '18px',
                height: '18px',
                borderRadius: '9px',
              }
            }}
          >
            <ShoppingBasketIcon sx={{ fontSize: 22 }} />
          </Badge>
        </IconButton>
      </Tooltip>
    </Box>
  );
}
