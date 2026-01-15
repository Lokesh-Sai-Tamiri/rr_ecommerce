/**
 * @fileoverview Mobile drawer navigation component
 */

"use client";

import {
  Drawer,
  Box,
  IconButton,
  Tooltip,
  Button,
  Typography,
} from "@mui/material";
import { IconWorld } from "@tabler/icons-react";
import CloseIcon from "@mui/icons-material/Close";
import { FormattedMessage } from "react-intl";
import { NAVIGATION_ITEMS, THEME_COLORS } from "../constants";
import { MobileDrawerProps } from "../types";
import MenuItem from "./MenuItem";
import MobileServicesAccordion from "./MobileServicesAccordion";
import MobilePricingAccordion from "./MobilePricingAccordion";
import MobileGalleryAccordion from "./MobileGalleryAccordion";
import MobileLanguageDropdown from "./MobileLanguageDropdown";
import { JSX, useState } from "react";
import useConfig from "hooks/useConfig";
import { I18n } from "types/config";
import Logo from "ui-component/Logo";
import { useUser } from "contexts/UserContext";
import { useUser as useClerkUser } from "@clerk/nextjs";

/**
 * Full-screen mobile drawer with navigation menu
 * Includes background image, navigation items, and footer
 *
 * @param {MobileDrawerProps} props - Component props
 * @returns {JSX.Element} Mobile drawer component
 */
export default function MobileDrawer({
  drawerToggle,
  drawerToggler,
  FooterComponent,
}: MobileDrawerProps): JSX.Element {
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const { i18n } = useConfig();
  const { isLoggedIn } = useUser();
  const { isSignedIn: isClerkSignedIn } = useClerkUser();

  // Language/Region data to get current country and continent
  const CONTINENT_DATA = [
    {
      continent: "Asia Pacific",
      continentKey: "asia-pacific",
      countries: [
        {
          country: "India",
          languages: ["English"],
          code: "en" as I18n,
        },
        {
          country: "Korea",
          languages: ["한국어"],
          code: "ko" as I18n,
        },
      ],
    },
  ];

  // Get current country and continent based on selected language
  const getCurrentLocation = () => {
    for (const continent of CONTINENT_DATA) {
      const country = continent.countries.find((c) => c.code === i18n);
      if (country) {
        return {
          country: country.country,
          continent: continent.continent,
          continentKey: continent.continentKey,
          language: country.languages[0],
        };
      }
    }
    // Fallback
    return {
      country: "India",
      continent: "Asia Pacific",
      continentKey: "asia-pacific",
      language: "English",
    };
  };

  const currentLocation = getCurrentLocation();


  return (
    <>
      <Drawer
        anchor="top"
        open={drawerToggle}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            drawerToggler(false)(event);
          }
        }}
        transitionDuration={{
          enter: 400,
          exit: 300,
        }}
        PaperProps={{
          sx: {
            width: "100vw",
            height: "100vh",
            backgroundImage: `url('/assets/images/home-bg.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundColor: "#000000",
            transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            willChange: "transform, opacity",
            minHeight: "100vh",
            minWidth: "100vw",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: languageDropdownOpen ? "hidden" : "auto",
          },
        }}
        SlideProps={{
          timeout: {
            enter: 400,
            exit: 300,
          },
        }}
        ModalProps={{
          keepMounted: false,
          disableScrollLock: true,
        }}
      >
        {/* Drawer Content - Only render when drawer is open for performance */}
        {drawerToggle && (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              opacity: 0,
              animation: "fadeIn 0.3s ease-out 0.1s forwards",
              "@keyframes fadeIn": {
                from: { opacity: 0, transform: "translateY(-10px)" },
                to: { opacity: 1, transform: "translateY(0)" },
              },
            }}
            role="presentation"
          >
            {/* Header with Logo and Close Button */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 1,
                pt: 0.5,
                position: "relative",
                zIndex: 1000,
              }}
            >
              {/* Logo Section */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  "& img": {
                    height: "30px !important",
                    width: "auto !important",
                    maxHeight: "30px !important",
                    filter: "brightness(1.2) contrast(1.1)",
                  },
                }}
              >
                <Logo />
              </Box>

              {/* Close Button */}
              <Tooltip title="Close Menu" arrow>
                <IconButton
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    drawerToggler(false)(event);
                  }}
                  size="medium"
                  sx={{
                    color: THEME_COLORS.white,
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    backdropFilter: "blur(10px)",
                    border: "2px solid rgba(255, 255, 255, 0.2)",
                    width: 36,
                    height: 36,
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.6)",
                      borderColor: "rgba(255, 255, 255, 0.4)",
                      transform: "scale(1.1)",
                    },
                    "&:active": {
                      transform: "scale(0.95)",
                    },
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  <CloseIcon sx={{ fontSize: 20 }} />
                </IconButton>
              </Tooltip>
            </Box>

          {/* Main Menu Content */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              px: 2
            }}
          >
            {/* Navigation Menu Items */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                mt: 2
              }}
            >
              {/* Render all navigation items */}
              {NAVIGATION_ITEMS.map((item, index) => {
                // Hide pricing tab when locale is Korean
                if (item.label === "Pricing" && i18n === "ko") {
                  return null;
                }

                // Special handling for dropdown items
                if (item.dropdownItems && item.dropdownItems.length > 0) {
                  // Use Gallery accordion for Gallery items, Services accordion for Services, Pricing accordion for Pricing
                  if (item.label === "Gallery") {
                    return (
                      <MobileGalleryAccordion key={index} dropdownItems={item.dropdownItems} onItemClick={() => drawerToggler(false)({})} />
                    );
                  } else if (item.label === "Services") {
                    return (
                      <MobileServicesAccordion key={index} dropdownItems={item.dropdownItems} onItemClick={() => drawerToggler(false)({})} />
                    );
                  } else if (item.label === "Pricing") {
                    return (
                      <MobilePricingAccordion key={index} dropdownItems={item.dropdownItems} onItemClick={() => drawerToggler(false)({})} />
                    );
                  }
                }

                  // Regular menu items
                  return (
                    <MenuItem
                      key={index}
                      href={item.href}
                      onClick={() => drawerToggler(false)({})}
                    >
                      {item.labelKey ? (
                        <FormattedMessage
                          id={item.labelKey}
                          defaultMessage={item.label}
                        />
                      ) : (
                        item.label
                      )}
                    </MenuItem>
                  );
                })}

                {/* Language Switcher - Mobile Version (only show when user is NOT signed in) */}
                {!isClerkSignedIn && !isLoggedIn && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      py: 1,
                      mt: 1,
                    }}
                  >
                    <Button
                      onClick={() => setLanguageDropdownOpen(true)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        p: 2,
                        borderRadius: 1,
                        backgroundColor: "transparent",
                        border: "none",
                        color: THEME_COLORS.white,
                        textTransform: "none",
                        transition: "all 0.2s ease-in-out",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                        },
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <IconWorld
                          size={20}
                          style={{ color: THEME_COLORS.secondary }}
                        />
                        <Box>
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: 500,
                              fontSize: "1rem",
                              color: THEME_COLORS.secondary,
                            }}
                          >
                            <FormattedMessage
                              id={currentLocation.continentKey}
                              defaultMessage={currentLocation.continent}
                            />
                          </Typography>

                          <Typography
                            variant="body2"
                            sx={{
                              color: THEME_COLORS.secondary,
                              fontSize: "0.875rem",
                            }}
                          >
                            {currentLocation.country} | {currentLocation.language}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography
                        variant="body1"
                        sx={{ color: THEME_COLORS.secondary, fontSize: "2rem" }}
                      >
                        ›
                      </Typography>
                    </Button>
                  </Box>
                )}


              </Box>

              {/* Footer Section in Mobile Drawer - Only show when language dropdown is not open */}
              {FooterComponent && !languageDropdownOpen && (
                <Box
                  sx={{
                    width: "100%",
                    pt: 5.25,
                    pb: 0.15,
                  }}
                >
                  <FooterComponent />
                </Box>
              )}
            </Box>
          </Box>
        )}

        {/* Mobile Language Dropdown */}
        {languageDropdownOpen && (
          <MobileLanguageDropdown
            onClose={() => setLanguageDropdownOpen(false)}
            FooterComponent={FooterComponent}
          />
        )}
      </Drawer>

    </>
  );
}
