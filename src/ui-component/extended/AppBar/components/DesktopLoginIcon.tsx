/**
 * @fileoverview Desktop language selector component with globe icon
 */

"use client";

import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { IconWorld, IconUser, IconClipboardList, IconSettings } from "@tabler/icons-react";
import { THEME_COLORS } from "../constants";
import { DesktopLoginIconProps } from "../types";
import LanguageDropdown from "./LanguageDropdown";
import { AccountPopup } from "components/AccountPopup";
import { JSX, useState, useRef } from "react";
import { useUser } from "contexts/UserContext";
import { UserButton, useUser as useClerkUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

/**
 * Desktop language selector with globe icon and dropdown
 * Hidden on mobile devices when hamburger menu is shown
 *
 * @param {DesktopLoginIconProps} props - Component props
 * @returns {JSX.Element} Desktop language selector button
 */
export default function DesktopLoginIcon({
  showHamburgerMenu,
}: DesktopLoginIconProps): JSX.Element {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [accountPopupOpen, setAccountPopupOpen] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const { user, isLoggedIn } = useUser();
  const { isSignedIn: isClerkSignedIn } = useClerkUser();
  const router = useRouter();

  const handleMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    // Only close if not hovering over dropdown
    const timeout = setTimeout(() => {
      setDropdownOpen(false);
    }, 300);
    setHoverTimeout(timeout);
  };

  const handleDropdownMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setDropdownOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    const timeout = setTimeout(() => {
      setDropdownOpen(false);
    }, 300);
    setHoverTimeout(timeout);
  };

  const handleClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClose = () => {
    setDropdownOpen(false);
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  };

  const handleAccountClick = () => {
    // If not signed in with Clerk, show account popup
    if (!isClerkSignedIn) {
      setAccountPopupOpen(true);
    }
  };

  const handleAccountPopupClose = () => {
    setAccountPopupOpen(false);
  };

  return (
    <Box
      sx={{
        display: showHamburgerMenu ? "none" : "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 1,
      }}
    >
      {/* 1. Profile Icon or User Button (always first) */}
      {isClerkSignedIn ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            "& .cl-userButtonBox": {
              display: "flex",
              alignItems: "center",
            },
            "& .cl-userButtonTrigger": {
              borderRadius: 2,
              padding: "4px 12px",
              border: `1px solid ${THEME_COLORS.secondary}`,
              backgroundColor: "rgba(17, 82, 147, 0.1)",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: "rgba(17, 82, 147, 0.15)",
                transform: "translateY(-1px)",
                boxShadow: "0 4px 8px rgba(17, 82, 147, 0.2)",
              },
            },
          }}
        >
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-8 h-8",
                userButtonTrigger: "focus:shadow-none",
              },
            }}
            afterSignOutUrl="/"
          >
            <UserButton.MenuItems>
              <UserButton.Action label="manageAccount" open={false} />
              <UserButton.Link
                label="My Quotations"
                labelIcon={<IconClipboardList size={16} />}
                href="/my-quotations"
              />
              <UserButton.Link
                label="Profile Settings"
                labelIcon={<IconSettings size={16} />}
                href="/my-quotations/profile"
              />
              <UserButton.Action label="signOut" />
            </UserButton.MenuItems>
          </UserButton>
        </Box>
      ) : (
        <Tooltip title="My Account" arrow>
          <IconButton
            onClick={handleAccountClick}
            color="inherit"
            size="large"
            sx={{
              color: THEME_COLORS.secondary,
              backgroundColor: "transparent",
              border: `2px solid ${THEME_COLORS.secondary}`,
              borderRadius: 2,
              padding: "4px",
              minWidth: 36,
              minHeight: 36,
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
            <IconUser size={22} />
          </IconButton>
        </Tooltip>
      )}

      {/* 2. Language Icon (only show when user is NOT signed in) */}
      {!isClerkSignedIn && !isLoggedIn && (
        <>
          <Tooltip title="Select Language & Region" arrow>
            <IconButton
              ref={anchorRef}
              onClick={handleClick}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              color="inherit"
              size="large"
              sx={{
                color: THEME_COLORS.secondary,
                backgroundColor: "transparent",
                border: `2px solid ${THEME_COLORS.secondary}`,
                borderRadius: 2,
                padding: "4px",
                minWidth: 36,
                minHeight: 36,
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
              <IconWorld size={22} />
            </IconButton>
          </Tooltip>

          {/* Language Dropdown remains, but linked to anchorRef */}
          <LanguageDropdown
            anchorEl={anchorRef.current}
            open={dropdownOpen}
            onClose={handleClose}
            onMouseEnter={handleDropdownMouseEnter}
            onMouseLeave={handleDropdownMouseLeave}
          />
        </>
      )}

      {/* Account Popup for non-logged in users */}
      <AccountPopup open={accountPopupOpen} onClose={handleAccountPopupClose} />
    </Box>
  );
}
