/**
 * @fileoverview Main AppBar component - clean and focused
 * Orchestrates all AppBar sub-components with responsive behavior
 */

"use client";

import React, { JSX, useState, useEffect, useRef } from "react";
import {
  Box,
  Toolbar,
  useMediaQuery,
  IconButton,
  Tooltip,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { useRouter } from "next/navigation";
import { useCart } from "../../../contexts/CartContext";
import { IconWorld } from "@tabler/icons-react";

import ElevationScroll from './components/ElevationScroll';
import LogoSection from './components/LogoSection';
import DesktopNavigation from './components/DesktopNavigation';
import DesktopLoginIcon from './components/DesktopLoginIcon';
import BasketIcon from './components/BasketIcon';
import MobileMenu from './components/MobileMenu';
import MobileHeaderAccountIcon from './components/MobileHeaderAccountIcon';
import { AppBarProps } from './types';
import { MOBILE_BREAKPOINT } from './constants';
import { useUser } from "contexts/UserContext";
import { useUser as useClerkUser } from "@clerk/nextjs";
import LanguageDropdown from "./components/LanguageDropdown";

/**
 * Extended AppBar component with responsive navigation
 *
 * Features:
 * - Responsive design with mobile hamburger menu
 * - Scroll-based elevation changes
 * - Transparent background support
 * - Comprehensive logo scaling for all device sizes
 * - Integrated footer component in mobile drawer
 *
 * @param {AppBarProps} props - Component props
 * @returns {JSX.Element} Complete AppBar with navigation
 */
export default function AppBar({
  sx,
  disableSticky,
  FooterComponent,
  ...others
}: AppBarProps): JSX.Element {
  // State management for mobile drawer
  const [drawerToggle, setDrawerToggle] = useState<boolean>(false);
  const router = useRouter();

  // State management for cart
  const {
    cartItems,
    cartCount,
    removeFromCart,
    onGenerateQuotation,
    onViewFullDetails,
    onEditItem,
    onProceedToCheckout,
    isCartModalOpen,
    openCartModal,
    closeCartModal,
  } = useCart();

  // User authentication state
  const { user, isLoggedIn } = useUser();
  const { isSignedIn } = useClerkUser();

  // Language dropdown state
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  // Language dropdown handlers
  const handleLanguageClick = () => {
    setDropdownOpen((prevOpen) => !prevOpen);
  };

  const handleLanguageClose = () => {
    setDropdownOpen(false);
  };

  // Determine if background should be transparent
  const transparentBackground =
    sx?.background === "transparent" ||
    sx?.background === "transparent !important";

  // Responsive breakpoint for mobile menu - optimized for Surface Pro and tablets
  const showHamburgerMenu = useMediaQuery(MOBILE_BREAKPOINT);

  // Generic mobile detection and landscape detection
  const isMobile = useMediaQuery("(max-width: 480px)");
  const isLandscape = useMediaQuery("(orientation: landscape)");
  const isMobileLandscape = isMobile && isLandscape;

  /**
   * Handles drawer open/close with keyboard event filtering
   * Prevents unwanted drawer toggles on Tab/Shift key presses
   *
   * @param {boolean} open - Target drawer state
   * @returns {Function} Event handler function
   */
  const drawerToggler = (open: boolean) => (event: any) => {
    if (
      event?.type === "keydown" &&
      (event?.key === "Tab" || event?.key === "Shift")
    ) {
      return;
    }

    // Ensure state is actually changed
    if (open !== drawerToggle) {
      setDrawerToggle(open);
    }
  };

  // Cart handlers
  const handleCartClick = () => {
    router.push("/pricing/cart");
  };

  const handleCartClose = () => {
    closeCartModal();
  };

  const handleRemoveFromCart = (id: string) => {
    removeFromCart(id);
  };

  const handleGenerateQuotation = (item: any) => {
    closeCartModal();
    if (onGenerateQuotation) {
      onGenerateQuotation(item);
    }
  };

  const handleProceedToCheckout = () => {
    closeCartModal();
    // For proceed button, show the order summary modal like View Full Details
    // but for all cart items (checkout mode)
    if (onProceedToCheckout) {
      onProceedToCheckout();
    }
  };

  const handleViewFullDetails = (item: any) => {
    closeCartModal();
    if (onViewFullDetails) {
      onViewFullDetails(item);
    }
  };

  return (
    <>
      <ElevationScroll
        disableSticky={disableSticky}
        transparentBackground={transparentBackground}
        {...others}
      >
        <MuiAppBar
          sx={{
            ...sx,
            padding: 0,
            height: isMobile ? "52px" : "64px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              padding: 0,
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Toolbar
              variant="dense"
              sx={{
                py: isMobileLandscape ? 0 : isMobile ? 0.5 : 0.8,
                px: { xs: 1.5, sm: 2, md: 3 },
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                minHeight: isMobile ? "52px !important" : "64px !important",
                height: isMobileLandscape ? "100%" : "auto",
              }}
            >
              {/* Logo Section - Responsive sizing with portrait mode optimization */}
              <LogoSection />

              {/* Desktop Navigation and Login - Hidden on mobile */}
              {!showHamburgerMenu && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    flex: 1,
                    justifyContent: "center",
                  }}
                >
                  <DesktopNavigation showHamburgerMenu={showHamburgerMenu} />
                </Box>
              )}

                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1 } }}>
                  {/* User Name Display - FIRST POSITION */}
                  <DesktopLoginIcon showHamburgerMenu={showHamburgerMenu} />
                  {/* Mobile Account Icon - Show on mobile beside cart */}
                  <MobileHeaderAccountIcon showHamburgerMenu={showHamburgerMenu} />
                  {/* Cart Icon - SECOND POSITION */}
                  <BasketIcon 
                    showHamburgerMenu={false} 
                    cartCount={cartCount}
                    onCartClick={handleCartClick}
                  />
                  {/* Mobile Menu Section - Only show on mobile */}
                  {showHamburgerMenu && (
                    <Box sx={{ ml: { xs: -0.5, sm: 0 } }}>
                      <MobileMenu
                        showHamburgerMenu={showHamburgerMenu}
                        drawerToggle={drawerToggle}
                        drawerToggler={drawerToggler}
                        FooterComponent={FooterComponent}
                      />
                    </Box>
                  )}
                </Box>
            </Toolbar>
          </Box>
        </MuiAppBar>
      </ElevationScroll>

      {/* Language Dropdown */}
      <LanguageDropdown
        anchorEl={anchorRef.current}
        open={dropdownOpen}
        onClose={handleLanguageClose}
      />
    </>
  );
}
