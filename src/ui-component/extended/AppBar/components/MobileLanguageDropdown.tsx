/**
 * @fileoverview Mobile Language/Region dropdown component
 * Designed for mobile drawer with continent and country selection
 */

"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  useTheme,
  Paper,
  Divider,
} from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import { FormattedMessage } from "react-intl";

import useConfig from "hooks/useConfig";
import { I18n } from "types/config";
import { THEME_COLORS } from "../constants";

interface CountryLanguage {
  country: string;
  languages: string[];
  code: I18n;
}

interface ContinentData {
  continent: string;
  continentKey: string;
  countries: CountryLanguage[];
}

interface MobileLanguageDropdownProps {
  onClose: () => void;
  FooterComponent?: React.ComponentType;
}

// Language/Region data organized by continents
const CONTINENT_DATA: ContinentData[] = [
  {
    continent: "Asia Pacific",
    continentKey: "asia-pacific",
    countries: [
      {
        country: "India",
        languages: ["English"],
        code: "en",
      },
      {
        country: "Korea",
        languages: ["한국어"],
        code: "ko",
      },
    ],
  },
  {
    continent: "North America",
    continentKey: "north-america",
    countries: [
      {
        country: "United States",
        languages: ["English"],
        code: "en",
      },
      {
        country: "Canada",
        languages: ["English", "Français"],
        code: "en",
      },
    ],
  },
];



export default function MobileLanguageDropdown({ onClose, FooterComponent }: MobileLanguageDropdownProps) {
  const theme = useTheme();
  const { i18n, onChangeLocale } = useConfig();
  const router = useRouter();
  const pathname = usePathname();

  const handleCountryClick = (country: CountryLanguage) => {
    onChangeLocale(country.code);
    if (pathname.startsWith("/pricing")) {
      router.push("/");
    }
    onClose();
  };

  const isActiveCountry = (code: I18n): boolean => code === i18n;

  // Get Asia Pacific countries (since that's what's shown in the mobile menu)
  const asiaPacificData = CONTINENT_DATA.find(
    (continent) => continent.continent === "Asia Pacific"
  );

  return (
         <Box
       onClick={(e) => {
         // Only close if clicking on the backdrop (not on content)
         if (e.target === e.currentTarget) {
           onClose();
         }
       }}
       sx={{
         position: "fixed",
         top: 0,
         left: 0,
         right: 0,
         bottom: 0,
         backgroundImage: `url('/assets/images/home-bg.png')`,
         backgroundSize: 'cover',
         backgroundPosition: 'center',
         backgroundRepeat: 'no-repeat',
         backgroundColor: '#000000',
         zIndex: 20000,
         display: "flex",
         flexDirection: "column",
         overflow: 'hidden',
         animation: 'slideInFromRight 0.3s ease-out',
         '@keyframes slideInFromRight': {
           from: {
             transform: 'translateX(100%)',
             opacity: 0
           },
           to: {
             transform: 'translateX(0)',
             opacity: 1
           }
         }
       }}
     >
             {/* Header */}
       <Box
         onClick={(e) => e.stopPropagation()}
         sx={{
           display: "flex",
           alignItems: "center",
           justifyContent: "space-between",
           p: 2,
           backgroundColor: "transparent",
           color: THEME_COLORS.secondary,
           borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
         }}
       >
                 <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
           <Typography
             variant="h6"
             sx={{
               fontWeight: 600,
               color: THEME_COLORS.secondary,
               fontSize: "1.1rem",
             }}
           >
             <FormattedMessage
               id="asia-pacific"
               defaultMessage="Asia Pacific"
             />
           </Typography>
         </Box>
                 <IconButton
           onClick={onClose}
           size="small"
           sx={{
             color: THEME_COLORS.secondary,
             p: 0.5,
           }}
         >
          <Typography variant="h6" sx={{ fontSize: "1.2rem" }}>
            ×
          </Typography>
        </IconButton>
      </Box>

             {/* Content */}
       <Box
         onClick={(e) => e.stopPropagation()}
         sx={{
           flex: 1,
           display: 'flex',
           flexDirection: 'column',
           justifyContent: 'space-between',
           p: 2,
           overflowY: "auto",
           backgroundColor: "transparent",
         }}
       >
         {/* Country Selection View */}
         <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
           {asiaPacificData?.countries.map((country) => {
             const isActive = isActiveCountry(country.code);

             return (
                                <Button
                   key={country.code}
                   onClick={() => handleCountryClick(country)}
                   sx={{
                     display: "flex",
                     flexDirection: "column",
                     alignItems: "flex-start",
                     justifyContent: "flex-start",
                     textAlign: "left",
                     width: "100%",
                     p: 2,
                     borderRadius: 2,
                     backgroundColor: isActive
                       ? "rgba(17, 82, 147, 0.1)"
                       : "transparent",
                     border: isActive
                       ? "2px solid rgba(17, 82, 147, 0.3)"
                       : "1px solid transparent",
                     boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                     transition: "all 0.2s ease-in-out",
                     "&:hover": {
                       backgroundColor: isActive
                         ? "rgba(17, 82, 147, 0.15)"
                         : "rgba(17, 82, 147, 0.05)",
                       transform: "translateY(-1px)",
                       boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                     },
                   }}
                 >
                                     {/* Country Name */}
                   <Typography
                     variant="subtitle1"
                     sx={{
                       fontWeight: 600,
                       color: THEME_COLORS.secondary,
                       fontSize: "1rem",
                       mb: 0.5,
                       textTransform: "none",
                     }}
                   >
                     {country.country}
                   </Typography>

                 {/* Languages */}
                 <Box
                   sx={{
                     display: "flex",
                     flexWrap: "wrap",
                     gap: 1,
                   }}
                 >
                                        {country.languages.map((language, langIndex) => (
                       <Typography
                         key={langIndex}
                         variant="body2"
                         sx={{
                           color: "rgba(17, 82, 147, 0.8)",
                           fontSize: "0.875rem",
                           fontWeight: 400,
                           textTransform: "none",
                         }}
                       >
                       {language}
                                                {langIndex < country.languages.length - 1 && (
                           <Box
                             component="span"
                             sx={{
                               mx: 1,
                               color: "rgba(17, 82, 147, 0.6)",
                             }}
                           >
                             •
                           </Box>
                         )}
                     </Typography>
                   ))}
                 </Box>
               </Button>
             );
           })}
         </Box>

                   {/* Footer Section in Language Dropdown */}
          {FooterComponent && (
            <Box
              sx={{
                width: '100%',
                pt: 0.25,
                mb: -1.9,
              }}
            >
              <FooterComponent />
            </Box>
          )}
       </Box>
    </Box>
  );
}
