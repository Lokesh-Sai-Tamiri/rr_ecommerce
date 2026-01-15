/**
 * @fileoverview Enhanced Services dropdown component with local images and animations
 */

"use client";

import {
  Paper,
  Popper,
  ClickAwayListener,
  Grow,
  Card,
  CardMedia,
  Typography,
  useTheme,
  Box,
  Zoom,
} from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { DropdownItem } from "../types";

interface ServicesDropdownProps {
  dropdownItems: DropdownItem[];
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

// Service images mapping - exact file paths
const serviceImages = {
  ayush: "/assets/images/landing/services/ayush-mobile.png",
  nutraceuticals: "/assets/images/landing/services/neutraceuticals-mobile.png",
  cosmetics: "/assets/images/landing/services/cosmotics-mobile.png",
  "cosmetics/personal care":
    "/assets/images/landing/services/cosmotics-mobile.png",
  pharmaceutical: "/assets/images/landing/services/pharmaciticals-mobile.png",
  herbal: "/assets/images/landing/services/herbal-mobile.png",
  "herbal/naturals": "/assets/images/landing/services/herbal-mobile.png",
  "drug testing lab": "/assets/images/landing/services/drug-test-lab-mobile.png",
  "drug-testing": "/assets/images/landing/services/drug-test-lab-mobile.png",
  "in vitro services": "/assets/images/landing/services/in-vitro-mobile.png",
  "in-vitro": "/assets/images/landing/services/in-vitro-mobile.png",
  "preclinical research":
    "/assets/images/landing/services/preclinical-mobile.png",
  preclinical: "/assets/images/landing/services/preclinical-mobile.png",
  "clinical research": "/assets/images/landing/services/clinical-mobile.png",
  clinical: "/assets/images/landing/services/clinical-mobile.png",
};

// Gallery images mapping
const galleryImages = {
  "radiant team": "/assets/images/Animal house/Animal house/Team-Radiant-1.jpg",
  "radiant lab": "/assets/images/Animal house/Animal house/Lab-1.jpg",
  "15 years celebration": "/assets/images/Animal house/Animal house/15 years celebrations/DSC07197.webp",
  "area 83 outing": "/assets/images/Animal house/Animal house/Area 83 Team outing/IMG_8165.JPG",
  "team celebrations": "/assets/images/Animal house/Animal house/Radiant Team celebrations/IMG_20221224_124943.jpg",
  "korea expo 2025": "/assets/images/Animal house/Animal house/EXPO/1746162006536.webp",
};

// Pricing images mapping
const pricingImages = {
  "toxicity study": "/assets/images/landing/pricing/toxicity study.jpg",
  "microbiology & virology study": "/assets/images/landing/pricing/Microbiology-virology-study.jpg",
  "invitro study": "/assets/images/landing/pricing/Invitro Study.jpg",
};

export default function ServicesDropdown({
  dropdownItems,
  anchorEl,
  open,
  onClose,
  onMouseEnter,
  onMouseLeave,
}: ServicesDropdownProps) {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [animatedItems, setAnimatedItems] = useState<boolean[]>([]);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [prevBodyOverflow, setPrevBodyOverflow] = useState<string | null>(null);
  const [prevBodyPaddingRight, setPrevBodyPaddingRight] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (open) {
      setAnimatedItems(new Array(dropdownItems.length).fill(false));
      dropdownItems.forEach((_, index) => {
        setTimeout(() => {
          setAnimatedItems((prev) => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        }, index * 120);
      });
    } else {
      setAnimatedItems([]);
    }
  }, [open, dropdownItems.length]);

  useEffect(() => {
    if (!open) return undefined;
    const body = document.body;
    setPrevBodyOverflow(body.style.overflow || "");
    setPrevBodyPaddingRight(body.style.paddingRight || "");
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;
    return () => {
      body.style.overflow = prevBodyOverflow ?? "";
      body.style.paddingRight = prevBodyPaddingRight ?? "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleItemClick = (href: string) => {
    router.push(href);
    onClose();
  };

  const handleClickAway = (event: Event) => {
    if (anchorEl && anchorEl.contains(event.target as Node)) {
      return;
    }
    onClose();
  };

  const isActiveItem = (href: string): boolean => {
    return pathname === href || pathname.startsWith(href);
  };

  const getServiceImage = (item: DropdownItem, index: number): string => {
    const label = item.label.toLowerCase();

    // Check if this is a pricing item
    const isPricingItem = item.href.includes("/pricing/");

    if (isPricingItem) {
      // Use pricing images for pricing items
      let imageKey = pricingImages[label as keyof typeof pricingImages];
      if (imageKey && !imageErrors.has(imageKey)) {
        return imageKey;
      }

      // Try href-based matching for pricing
      const hrefKey = item.href.split("/").pop()?.toLowerCase();
      if (hrefKey) {
        imageKey = pricingImages[hrefKey as keyof typeof pricingImages];
        if (imageKey && !imageErrors.has(imageKey)) {
          return imageKey;
        }
      }

      // Fallback for pricing items
      return Object.values(pricingImages)[0];
    }

    // Check if this is a gallery item
    const isGalleryItem = item.href.includes("/gallery/");

    if (isGalleryItem) {
      // Use gallery images for gallery items
      let imageKey = galleryImages[label as keyof typeof galleryImages];
      if (imageKey && !imageErrors.has(imageKey)) {
        return imageKey;
      }

      // Try href-based matching for gallery (e.g., "radiant-team" -> "radiant team")
      const hrefKey = item.href.split("/").pop()?.toLowerCase();
      if (hrefKey) {
        // Map URL slugs to gallery image keys
        const slugToKey: Record<string, keyof typeof galleryImages> = {
          "radiant-team": "radiant team",
          "radiant-lab": "radiant lab",
          "15-years-celebrations": "15 years celebration",
          "area-83-team-outing": "area 83 outing",
          "radiant-team-celebrations": "team celebrations",
          "korea-expo-2025": "korea expo 2025",
        };
        
        const mappedKey = slugToKey[hrefKey];
        if (mappedKey) {
          imageKey = galleryImages[mappedKey];
          if (imageKey && !imageErrors.has(imageKey)) {
            return imageKey;
          }
        }
      }

      // Fallback for gallery items
      return galleryImages["radiant team"];
    }

    // Service items - existing logic
    let imageKey = serviceImages[label as keyof typeof serviceImages];
    if (imageKey && !imageErrors.has(imageKey)) {
      return imageKey;
    }

    // Try href-based matching
    const hrefKey = item.href.split("/").pop()?.toLowerCase();
    if (hrefKey) {
      imageKey = serviceImages[hrefKey as keyof typeof serviceImages];
      if (imageKey && !imageErrors.has(imageKey)) {
        return imageKey;
      }
    }

    // Try partial matching
    for (const [key, imagePath] of Object.entries(serviceImages)) {
      if (
        label.includes(key.toLowerCase()) ||
        key.toLowerCase().includes(label)
      ) {
        if (!imageErrors.has(imagePath)) {
          return imagePath;
        }
      }
    }

    // Specific service matching
    if (label.includes("ayush")) return serviceImages["ayush"];
    if (label.includes("nutraceutical")) return serviceImages["nutraceuticals"];
    if (label.includes("cosmetic") || label.includes("personal"))
      return serviceImages["cosmetics"];
    if (label.includes("pharmaceutical"))
      return serviceImages["pharmaceutical"];
    if (label.includes("herbal") || label.includes("natural"))
      return serviceImages["herbal"];
    if (label.includes("drug") && label.includes("test"))
      return serviceImages["drug-testing"];
    if (label.includes("vitro")) return serviceImages["in-vitro"];
    if (label.includes("preclinical")) return serviceImages["preclinical"];
    if (label.includes("clinical") && !label.includes("preclinical"))
      return serviceImages["clinical"];

    // Final fallback - use first available image
    return Object.values(serviceImages)[0];
  };

  const handleImageError = (imagePath: string, index: number) => {
    console.error(`Failed to load image: ${imagePath} for service ${index}`);
    setImageErrors((prev) => new Set(prev).add(imagePath));
  };

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
                p: { xs: 1.5, md: 2 },
                position: "relative",
                zIndex: 2,
                maxWidth: "1200px",
                mx: "auto",
              }}
            >
              {/* Header */}
              <Box sx={{ mb: 1.5, textAlign: "center" }}></Box>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                  gridTemplateRows: "repeat(3, 160px)",
                  gap: 1.2,
                  width: "100%",
                  maxWidth: "100%",
                }}
              >
                {dropdownItems.slice(0, 9).map((item, index) => {
                  const isActive = isActiveItem(item.href);
                  const serviceImage = getServiceImage(item, index);

                  return (
                    <Zoom
                      key={index}
                      in={animatedItems[index] || false}
                      timeout={500}
                    >
                      <Card
                        sx={{
                          cursor: "pointer",
                          height: "160px",
                          width: "100%",
                          minWidth: 0,
                          position: "relative",
                          overflow: "hidden",
                          borderRadius: 1.5,
                          border: isActive
                            ? `2px solid ${theme.palette.primary.main}`
                            : `1px solid rgba(255, 255, 255, 0.2)`,
                          background: "rgba(255, 255, 255, 0.8)",
                          backdropFilter: "blur(8px)",
                          WebkitBackdropFilter: "blur(8px)",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                          transition: theme.transitions.create(
                            [
                              "transform",
                              "box-shadow",
                              "border-color",
                              "backdrop-filter",
                            ],
                            {
                              duration: theme.transitions.duration.standard,
                            }
                          ),
                          "&:hover": {
                            transform: "translateY(-2px) scale(1.01)",
                            boxShadow: `0 8px 20px rgba(37, 99, 235, 0.25)`,
                            borderColor: theme.palette.primary.main,
                            backdropFilter: "blur(12px)",
                            WebkitBackdropFilter: "blur(12px)",
                            "& .service-image": {
                              transform: "scale(1.05)",
                            },
                            "& .service-overlay": {
                              opacity: 1,
                            },
                            "& .service-title-box": {
                              background:
                                "rgba(255, 255, 255, 0.95) !important",
                            },
                            "& .service-title-text": {
                              color: `${theme.palette.primary.main} !important`,
                              fontWeight: "700 !important",
                            },
                          },
                        }}
                        onClick={() => handleItemClick(item.href)}
                      >
                        {/* Service Image - Full size */}
                        {serviceImage && (
                          <Box
                            sx={{
                              position: "relative",
                              height: "160px",
                              width: "100%",
                              overflow: "hidden",
                            }}
                          >
                            <CardMedia
                              component="img"
                              image={serviceImage}
                              alt={item.label}
                              className="service-image"
                              onError={() =>
                                handleImageError(serviceImage, index)
                              }
                              sx={{
                                objectFit: "cover",
                                objectPosition: "center",
                                width: "100%",
                                height: "160px",
                                display: "block",
                                transition: theme.transitions.create(
                                  "transform",
                                  {
                                    duration: theme.transitions.duration.standard,
                                  }
                                ),
                              }}
                            />

                            {/* Gradient Overlay */}
                            <Box
                              className="service-overlay"
                              sx={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: `linear-gradient(45deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}05)`,
                                opacity: isActive ? 1 : 0,
                                transition: theme.transitions.create("opacity", {
                                  duration: theme.transitions.duration.short,
                                }),
                              }}
                            />

                            {/* Active Indicator */}
                            {/* {isActive && (
                              <Box
                                sx={{
                                  position: "absolute",
                                  top: 6,
                                  right: 6,
                                  width: 8,
                                  height: 8,
                                  borderRadius: "50%",
                                  backgroundColor: "#2563EB",
                                  boxShadow: `0 0 0 2px rgba(255, 255, 255, 0.8)`,
                                  zIndex: 3,
                                }}
                              />
                            )} */}
                          </Box>
                        )}

                        {/* Service Title - Bottom with transparent blur background */}
                        <Box
                          className="service-title-box"
                          sx={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            zIndex: 2,
                            p: 1.5,
                            background: "rgba(255, 255, 255, 0.75)",
                            backdropFilter: "blur(8px)",
                            WebkitBackdropFilter: "blur(8px)",
                            borderTop: `1px solid rgba(255, 255, 255, 0.3)`,
                            borderRadius: "0 0 6px 6px",
                            transition: theme.transitions.create(
                              ["background", "backdrop-filter"],
                              {
                                duration: theme.transitions.duration.standard,
                              }
                            ),
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            className="service-title-text"
                            sx={{
                              fontWeight: 700,
                              color: theme.palette.primary.main,
                              fontSize: "0.9rem",
                              lineHeight: 1.3,
                              letterSpacing: "0.01em",
                              textAlign: "center",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              transition: theme.transitions.create(
                                ["color", "font-weight", "letter-spacing"],
                                {
                                  duration: theme.transitions.duration.standard,
                                }
                              ),
                            }}
                          >
                            {item.labelKey ? (
                              <FormattedMessage id={item.labelKey} defaultMessage={item.label} />
                            ) : (
                              item.label
                            )}
                          </Typography>
                        </Box>
                      </Card>
                    </Zoom>
                  );
                })}
              </Box>
            </Box>
          </ClickAwayListener>
        </Paper>
      </Grow>
    </Popper>
  );
}
