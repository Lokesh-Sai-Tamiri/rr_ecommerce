/**
 * @fileoverview Desktop navigation button component with dropdown support
 */

"use client";

import { useState, useRef } from "react";
import RouterLink from "next/link";
import { Button, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FormattedMessage } from "react-intl";
import { NavButtonProps } from "../types";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getNavButtonStyles } from "../styles";
import ServicesDropdown from "./ServicesDropdown";
import { JSX } from "react";

/**
 * Desktop navigation button component with dropdown support
 * Optimized for larger screens with hover effects
 *
 * @param {NavButtonProps} props - NavButton props
 * @returns {JSX.Element} Styled navigation button with optional dropdown
 */
export default function NavButton({
  item,
  isActive = false,
  sx = {},
  onMouseEnter,
  onMouseLeave,
  ...props
}: NavButtonProps): JSX.Element {
  const theme = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  // Get base styles
  const baseStyles = getNavButtonStyles();

  const hasDropdown = item.dropdownItems && item.dropdownItems.length > 0;

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    if (hasDropdown) {
      // Clear any pending close timeout
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
        setHoverTimeout(null);
      }
      setDropdownOpen(true);
    }
    onMouseEnter?.(event);
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLElement>) => {
    if (hasDropdown) {
      // Set a longer delay before closing to allow moving to dropdown
      const timeout = setTimeout(() => {
        setDropdownOpen(false);
      }, 300); // Increased delay for better UX
      setHoverTimeout(timeout);
    }
    onMouseLeave?.(event);
  };

  const handleClick = () => {
    if (hasDropdown) {
      setDropdownOpen((prev) => !prev);
    }
    // For non-dropdown items, let default navigation happen
  };

  const handleDropdownClose = () => {
    setDropdownOpen(false);
  };

  const handleDropdownMouseEnter = () => {
    // Clear any pending close timeout when entering dropdown
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setDropdownOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    // Set a small delay when leaving dropdown area
    const timeout = setTimeout(() => {
      setDropdownOpen(false);
    }, 100);
    setHoverTimeout(timeout);
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Button
        ref={buttonRef}
        variant="customTransparent"
        color="inherit"
        component={!hasDropdown && item.href !== "#" ? RouterLink : "button"}
        href={!hasDropdown ? item.href : undefined}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        endIcon={hasDropdown ? <ExpandMoreIcon fontSize="small" /> : undefined}
        // Removed endIcon (chevron)
        sx={[
          baseStyles,
          isActive && {
            color: theme.palette.primary.main,
            backgroundColor: 'transparent',
          },
          (dropdownOpen || isActive) && {
            color: theme.palette.primary.main,
            backgroundColor: 'transparent',
          },
          // Dropdown hover styles
          hasDropdown && {
            "& .MuiSvgIcon-root": {
              transition: theme.transitions.create("transform", {
                duration: theme.transitions.duration.short,
              }),
              transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
            },
          },
          // Apply custom sx
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...props}
      >
        {item.labelKey ? (
          <FormattedMessage id={item.labelKey} defaultMessage={item.label} />
        ) : (
          item.label
        )}
      </Button>

            {/* Services Dropdown */}
      {hasDropdown && item.dropdownItems && (
        <ServicesDropdown
          dropdownItems={item.dropdownItems}
          anchorEl={buttonRef.current}
          open={dropdownOpen}
          onClose={handleDropdownClose}
          onMouseEnter={handleDropdownMouseEnter}
          onMouseLeave={handleDropdownMouseLeave}
        />
      )}
    </Box>
  );
}
