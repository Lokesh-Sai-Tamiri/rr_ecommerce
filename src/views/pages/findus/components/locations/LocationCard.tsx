/**
 * @fileoverview Location Card Component using centralized utilities from landing/utils
 */

"use client";

import React from "react";
import {
  Box,
  Typography,
  CardContent,
  useTheme,
  IconButton,
} from "@mui/material";
import { FormattedMessage } from "react-intl";

// Project imports - UI Components
import MainCard from "ui-component/cards/MainCard";

// Import centralized utilities from landing/utils
import {
  useScreenDetection,
  FONT_WEIGHTS,
  LINE_HEIGHTS,
} from "../../../landing/utils";
import { ANIMATIONS } from "../../../landing/utils/styleUtils";

// Import constants
import { gridSpacing } from "store/constant";
import config from "config";

// Import icons
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

// Import location actions
import { locationActions } from "./locationData";

// Types
import type { Theme } from "@mui/material/styles";
import type { SxProps } from "@mui/material/styles";
import type { LocationSectionData } from "./locationData";

interface LocationCardProps {
  location: LocationSectionData;
  index: number;
  fontSizes: any; // Keep for compatibility but we'll use centralized utilities
  getCardStyles: any; // Keep for compatibility but we'll use centralized utilities
}

/**
 * Location Card Component using centralized utilities
 */
const LocationCard = React.memo(({ location, index }: LocationCardProps) => {
  const theme = useTheme();
  const screen = useScreenDetection();
  const IconComponent = location.icon;

  // Click handlers using centralized location actions
  const handleMapClick = () => {
    locationActions.openMap(location.address, location.coordinates);
  };

  const handlePhoneClick = () => {
    if (location.phone) {
      locationActions.dialPhone(location.phone);
    }
  };

  const handleEmailClick = () => {
    if (location.email) {
      locationActions.sendEmail(
        location.email,
        `Inquiry about ${location.title}`
      );
    }
  };

  // Use same card styles as AboutCard with proper typing
  const cardStyles: SxProps<Theme> = React.useMemo(() => {
    return {
      height: "auto",
      minHeight: "88px",
      display: "flex",
      flexDirection: "row",
      border: "none",
      outline: "none",
      backgroundColor: `${theme.palette.text.primary}15 !important`,
      boxShadow: theme.shadows[4],
      borderRadius: theme.shape.borderRadius,
      padding: { xs: theme.spacing(1.5), sm: theme.spacing(2), md: theme.spacing(2.5) },
      position: "relative",
      overflow: "visible",
      width: "100%",
      animation: `fadeInUp 0.8s ease-out ${0.6 + index * 0.2}s both`,
      transition: theme.transitions.create(["transform", "box-shadow"], {
        duration: theme.transitions.duration.standard,
      }),
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: theme.shadows[8],
        backgroundColor: `${theme.palette.text.primary}20 !important`,
      },
    };
  }, [theme, index]);

  // Icon container styles using centralized responsive values
  const getIconContainerStyles = (): SxProps<Theme> => {
    const size = screen.isDesktop ? 50 : 40;

    return {
      width: size,
      height: size,
      borderRadius: "50%",
      backgroundColor:
        theme.palette.mode === "dark"
          ? `${theme.palette.primary.main}20`
          : `${theme.palette.text.primary}15`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: theme.transitions.create(
        ["transform", "box-shadow", "background-color"],
        {
          duration: theme.transitions.duration.short,
        }
      ),
      "&:hover": {
        transform: "scale(1.05)",
        backgroundColor:
          theme.palette.mode === "dark"
            ? `${theme.palette.primary.main}30`
            : `${theme.palette.text.primary}25`,
        boxShadow: theme.shadows[4],
      },
    };
  };

  // Title styles using centralized responsive values
  const getTitleStyles = (): SxProps<Theme> => ({
    fontWeight: theme.typography.fontWeightBold || 700,
    fontFamily: config.fontFamily,
    fontSize: screen.isDesktop
      ? "1.5rem"
      : screen.isTablet
        ? "1.4rem"
        : "1.2rem",
    color: theme.palette.text.primary,
    transition: theme.transitions.create("color"),
    marginTop: theme.spacing(1),
    textAlign: "center",
  });

  // Content styles matching AboutCard.tsx with centered alignment
  const getContentStyles = (): SxProps<Theme> => ({
    color: theme.palette.text.primary,
    textAlign: "center",
    fontFamily: config.fontFamily,
    fontWeight: FONT_WEIGHTS.REGULAR,
    lineHeight: LINE_HEIGHTS.RELAXED,
    fontSize: screen.isDesktop
      ? "1rem"
      : screen.isTablet
        ? "0.95rem"
        : "0.9rem",
  });

  // Icon button styles - SAME AS FOOTER SECTION
  const iconButtonStyles: SxProps<Theme> = {
    color: theme.palette.primary.main,
    backgroundColor: "transparent",
    borderRadius: 2,
    transition: ANIMATIONS.TRANSITION_SMOOTH,
    "& svg": {
      fontSize: { xs: "16px", sm: "20px" },
    },
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      transform: "translateY(-2px)",
      boxShadow: `0 4px 8px ${theme.palette.primary.main}30`,
    },
  };

  // Card content spacing using centralized grid spacing
  const cardContentStyles: SxProps<Theme> = {
    p: { xs: theme.spacing(1.5), sm: theme.spacing(2), md: theme.spacing(2.5) },
    display: "flex",
    flexDirection: "row",
    alignItems: { xs: "flex-start", sm: "center" },
    gap: { xs: theme.spacing(1), sm: theme.spacing(1.5), md: theme.spacing(2) },
    height: "100%",
    width: "100%",
    overflow: "hidden",
    "&:last-child": {
      paddingBottom: { xs: theme.spacing(1.5), sm: theme.spacing(2), md: theme.spacing(2.5) },
    },
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <MainCard sx={cardStyles} content={false}>
        <CardContent sx={cardContentStyles}>
                     {/* Icon Section - LEFT SIDE */}
           <Box
             sx={{
               display: "flex",
               flexDirection: "column",
               alignItems: { xs: "flex-start", sm: "center" },
               flexShrink: 0,
               minWidth: { xs: "60px", sm: "80px" },
               maxWidth: { xs: "60px", sm: "80px" },
             }}
           >
            <Box sx={getIconContainerStyles()}>
                             <IconComponent
                 className="card-icon"
                 sx={{
                   fontSize: "1.25rem",
                   color: theme.palette.text.primary,
                   transition: theme.transitions.create(["color", "filter"], {
                     duration: theme.transitions.duration.short,
                   }),
                   filter: `drop-shadow(0 2px 4px ${theme.palette.text.primary}30)`,
                   "&:hover": {
                     color: theme.palette.primary.main,
                   },
                 }}
               />
            </Box>
          </Box>

                     {/* Content Section - HORIZONTAL LAYOUT */}
           <Box
             sx={{
               flex: 1,
               display: "flex",
               flexDirection: "column",
               gap: theme.spacing(1),
               alignItems: { xs: "flex-start", sm: "stretch" },
               minWidth: 0,
               overflow: "hidden",
             }}
           >
                         {/* Title */}
             <Typography
               variant={screen.isDesktop ? "h6" : "subtitle1"}
               component="h3"
               sx={{
                 fontWeight: FONT_WEIGHTS.BOLD,
                 fontFamily: config.fontFamily,
                 fontSize: screen.isDesktop ? "1.2rem" : "1.1rem",
                 color: theme.palette.text.primary,
                 mb: 1,
                 textAlign: { xs: "left", sm: "left" },
               }}
             >
              {location.titleKey ? (
                <FormattedMessage 
                  id={location.titleKey} 
                  defaultMessage={location.title}
                />
              ) : (
                location.title
              )}
            </Typography>
                         {/* Address Row - COMPACT */}
             <Box
               sx={{
                 display: "flex",
                 alignItems: { xs: "flex-start", sm: "center" },
                 gap: theme.spacing(1),
                 width: "100%",
                 minWidth: 0,
               }}
             >
              <IconButton
                size="small"
                onClick={handleMapClick}
                sx={{
                  ...iconButtonStyles,
                  padding: "4px",
                  "& svg": { fontSize: "16px" },
                }}
              >
                <LocationOnIcon />
              </IconButton>
                             <Typography
                 variant="body2"
                 component="p"
                 sx={{
                   flex: 1,
                   fontSize: "0.875rem",
                   lineHeight: 1.4,
                   minWidth: 0,
                   overflow: "hidden",
                   textOverflow: "ellipsis",
                 }}
               >
                {location.addressKey ? (
                  <FormattedMessage 
                    id={location.addressKey} 
                    defaultMessage={location.address}
                  />
                ) : (
                  location.address
                )}
              </Typography>
            </Box>

                         {/* Phone Row - COMPACT */}
             <Box
               sx={{
                 display: "flex",
                 alignItems: { xs: "flex-start", sm: "center" },
                 gap: theme.spacing(1),
                 width: "100%",
                 minWidth: 0,
               }}
             >
              <IconButton
                size="small"
                onClick={handlePhoneClick}
                sx={{
                  ...iconButtonStyles,
                  padding: "4px",
                  "& svg": { fontSize: "16px" },
                }}
              >
                <PhoneIcon />
              </IconButton>
              <Typography 
                variant="body2" 
                component="p" 
                sx={{
                  fontSize: "0.875rem",
                  lineHeight: 1.4,
                  minWidth: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {location.phoneKey ? (
                  <FormattedMessage 
                    id={location.phoneKey} 
                    defaultMessage={location.phone || ""}
                  />
                ) : (
                  location.phone || ""
                )}
              </Typography>
            </Box>

                         {/* Email Row - COMPACT */}
             <Box
               sx={{
                 display: "flex",
                 alignItems: { xs: "flex-start", sm: "center" },
                 gap: theme.spacing(1),
                 width: "100%",
                 minWidth: 0,
               }}
             >
              <IconButton
                size="small"
                onClick={handleEmailClick}
                sx={{
                  ...iconButtonStyles,
                  padding: "4px",
                  "& svg": { fontSize: "16px" },
                }}
              >
                <EmailIcon />
              </IconButton>
              <Typography 
                variant="body2" 
                component="p" 
                sx={{
                  fontSize: "0.875rem",
                  lineHeight: 1.4,
                  minWidth: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {location.emailKey ? (
                  <FormattedMessage 
                    id={location.emailKey} 
                    defaultMessage={location.email || ""}
                  />
                ) : (
                  location.email || ""
                )}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </MainCard>
    </Box>
  );
});

LocationCard.displayName = "LocationCard";

export default LocationCard;
