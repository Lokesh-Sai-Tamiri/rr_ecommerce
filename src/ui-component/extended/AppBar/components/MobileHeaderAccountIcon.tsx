/**
 * @fileoverview Mobile header account icon component
 * Simple account icon for mobile header beside cart icon
 */

"use client";

import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { IconUser, IconClipboardList, IconSettings } from "@tabler/icons-react";
import { THEME_COLORS } from "../constants";
import { JSX, useState, useRef } from "react";
import { useUser } from "contexts/UserContext";
import { UserButton, useUser as useClerkUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { AccountPopup } from "components/AccountPopup";

interface MobileHeaderAccountIconProps {
  showHamburgerMenu: boolean;
}

/**
 * Mobile header account icon component
 * Simple icon that shows beside cart icon on mobile
 *
 * @param {MobileHeaderAccountIconProps} props - Component props
 * @returns {JSX.Element} Mobile header account icon button
 */
export default function MobileHeaderAccountIcon({
  showHamburgerMenu,
}: MobileHeaderAccountIconProps): JSX.Element {
  const [accountPopupOpen, setAccountPopupOpen] = useState(false);
  const { user, isLoggedIn } = useUser();
  const { isSignedIn: isClerkSignedIn } = useClerkUser();
  const router = useRouter();

  const handleAccountClick = () => {
    // If not signed in with Clerk, show account popup
    if (!isClerkSignedIn) {
      setAccountPopupOpen(true);
    }
  };

  const handleAccountPopupClose = () => {
    setAccountPopupOpen(false);
  };

  // Only show on mobile (when hamburger menu is shown)
  if (!showHamburgerMenu) {
    return <></>;
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        {/* Show Clerk UserButton if logged in, otherwise show account icon */}
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
                padding: "4px 8px",
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
                  avatarBox: "w-7 h-7",
                  userButtonTrigger: "focus:shadow-none",
                },
              }}
              afterSignOutUrl="/"
            >
              <UserButton.MenuItems>
                <UserButton.Action label="manageAccount" />
                <UserButton.Link
                  label="My Quotations"
                  labelIcon={<IconClipboardList size={14} />}
                  href="/my-quotations"
                />
                <UserButton.Link
                  label="Profile Settings"
                  labelIcon={<IconSettings size={14} />}
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
              <IconUser size={20} />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {/* Account Popup for non-logged in users */}
      <AccountPopup open={accountPopupOpen} onClose={handleAccountPopupClose} />
    </>
  );
}
