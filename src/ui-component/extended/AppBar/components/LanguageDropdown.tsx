/**
 * @fileoverview Language/Region dropdown component with continents and locations
 */

"use client";

import {
  Paper,
  Popper,
  ClickAwayListener,
  Grow,
  Typography,
  useTheme,
  Box,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import useConfig from "hooks/useConfig";
import { I18n } from "types/config";

interface CountryLanguage {
  country: string;
  languages: string[];
  code: I18n; // 'en' | 'ko'
}

interface ContinentData {
  continent: string;
  countries: CountryLanguage[];
}

interface LanguageDropdownProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

// Language/Region data organized by continents
const CONTINENT_DATA: ContinentData[] = [
  {
    continent: "Asia Pacific",
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
];

export default function LanguageDropdown({
  anchorEl,
  open,
  onClose,
  onMouseEnter,
  onMouseLeave,
}: LanguageDropdownProps) {
  const theme = useTheme();
  const { i18n, onChangeLocale } = useConfig();
  const router = useRouter();
  const pathname = usePathname();
  const [animatedSections, setAnimatedSections] = useState<boolean[]>([]);

  useEffect(() => {
    if (open) {
      setAnimatedSections(new Array(CONTINENT_DATA.length).fill(false));
      CONTINENT_DATA.forEach((_, index) => {
        setTimeout(() => {
          setAnimatedSections((prev) => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        }, index * 150);
      });
    } else {
      setAnimatedSections([]);
    }
  }, [open]);

  const handleCountryClick = (country: CountryLanguage) => {
    onChangeLocale(country.code);
    if (pathname.startsWith("/pricing")) {
      router.push("/");
    }
    onClose();
  };

  const handleClickAway = (event: Event) => {
    if (anchorEl && anchorEl.contains(event.target as Node)) {
      return;
    }
    onClose();
  };

  const isActiveCountry = (code: I18n): boolean => code === i18n;

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement="bottom-start"
      sx={{
        zIndex: 20000,
        width: "100vw",
        left: "0 !important",
        right: "0 !important",
        top: "64px !important",
        transform: "none !important",
        px: { xs: 1, md: 2 },
      }}
      modifiers={[
        {
          name: "offset",
          options: {
            offset: [0, 0],
          },
        },
        {
          name: "computeStyles",
          options: {
            gpuAcceleration: true,
          },
        },
        {
          name: "preventOverflow",
          options: {
            boundary: "viewport",
            padding: 8,
          },
        },
        {
          name: "flip",
          enabled: true,
          options: {
            fallbackPlacements: ["bottom", "bottom-start", "bottom-end"],
          },
        },
      ]}
    >
      <Grow
        in={open}
        timeout={200}
        style={{
          transformOrigin: "top center",
        }}
      >
        <Paper
          elevation={12}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onWheel={(e: any) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onTouchMove={(e: any) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          sx={{
            overflow: "hidden",
            borderRadius: 3,
            background:
              "url('/assets/images/home-bg.png') center / cover no-repeat",
            backgroundColor: "transparent",
            boxShadow: `0 40px 100px rgba(0,0,0,0.35), 0 20px 48px rgba(0,0,0,0.25)`,
            position: "fixed",
            top: { xs: 56, md: 64 },
            left: 8,
            right: 8,
            width: "auto",
            maxWidth: "calc(100vw - 16px)",
            zIndex: 20001,
            pointerEvents: "auto",
            touchAction: "none",
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              backgroundImage: "url('/assets/images/home-bg.png')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "inherit",
              zIndex: 0,
              pointerEvents: "none",
            },
            "&::after": {
              content: '""',
              position: "absolute",
              inset: 0,
              borderRadius: "inherit",
              boxShadow:
                "inset 0 0 0 1.5px rgba(255,255,255,0.22), 0 0 0 2px rgba(37,99,235,0.4), 0 24px 60px rgba(0,0,0,0.22), 0 12px 32px rgba(0,0,0,0.18)",
              zIndex: 1,
              pointerEvents: "none",
            },
          }}
        >
          <ClickAwayListener onClickAway={handleClickAway}>
            <Box
              sx={{
                p: { xs: 3, md: 4 },
                position: "relative",
                zIndex: 2,
                maxWidth: "800px",
                mx: "auto",
                minHeight: "300px",
              }}
            >
              {/* Continent Sections */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  maxWidth: "400px",
                  mx: "auto",
                }}
              >
                {CONTINENT_DATA.map((continent, continentIndex) => (
                  <Box
                    key={continent.continent}
                    sx={{
                      opacity: animatedSections[continentIndex] ? 1 : 0,
                      transform: animatedSections[continentIndex]
                        ? "translateY(0)"
                        : "translateY(20px)",
                      transition: theme.transitions.create(
                        ["opacity", "transform"],
                        {
                          duration: theme.transitions.duration.standard,
                          delay: continentIndex * 150,
                        }
                      ),
                    }}
                  >
                    {/* Continent Title */}
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700, // Changed from 600 to 700 for bold
                        color: theme.palette.text.primary,
                        fontSize: "1.1rem",
                        mb: 2,
                        letterSpacing: "0.02em",
                      }}
                    >
                      {continent.continent}
                    </Typography>

                    {/* Countries List */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1.5,
                      }}
                    >
                      {continent.countries.map((country, countryIndex) => {
                        const isActive = isActiveCountry(country.code);

                        return (
                          <Box key={country.code}>
                            {/* Country Button */}
                            <Button
                              onClick={() => handleCountryClick(country)}
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                justifyContent: "flex-start",
                                textAlign: "left",
                                width: "100%",
                                p: 1.5,
                                borderRadius: 1,
                                backgroundColor: isActive
                                  ? theme.palette.action.selected
                                  : "transparent",
                                border: isActive
                                  ? `1px solid ${theme.palette.primary.main}`
                                  : "1px solid transparent",
                                transition: theme.transitions.create(
                                  ["background-color", "border-color"],
                                  {
                                    duration: theme.transitions.duration.short,
                                  }
                                ),
                                "&:hover": {
                                  backgroundColor: theme.palette.action.hover,
                                  borderColor: theme.palette.primary.light,
                                },
                              }}
                            >
                              {/* Country Name */}
                              <Typography
                                variant="subtitle1"
                                sx={{
                                  fontWeight: 600,
                                  color: isActive
                                    ? theme.palette.primary.main
                                    : theme.palette.text.primary,
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
                                {country.languages.map(
                                  (language, langIndex) => (
                                    <Typography
                                      key={langIndex}
                                      variant="body2"
                                      sx={{
                                        color: theme.palette.text.secondary,
                                        fontSize: "0.875rem",
                                        fontWeight: 400,
                                        textTransform: "none",
                                      }}
                                    >
                                      {language}
                                      {langIndex <
                                        country.languages.length - 1 && (
                                        <Box
                                          component="span"
                                          sx={{
                                            mx: 1,
                                            color: theme.palette.text.disabled,
                                          }}
                                        >
                                          •
                                        </Box>
                                      )}
                                    </Typography>
                                  )
                                )}
                              </Box>
                            </Button>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </ClickAwayListener>
        </Paper>
      </Grow>
    </Popper>
  );
}
