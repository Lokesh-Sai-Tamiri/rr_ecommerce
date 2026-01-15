/**
 * @fileoverview Gallery dropdown component with hover functionality
 */

"use client";

import {
  Paper,
  Popper,
  ClickAwayListener,
  Grow,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
  Avatar,
} from "@mui/material";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
// Gallery images mapping
const galleryImages = {
  "radiant team": "/assets/images/Animal house/Animal house/Team-Radiant-1.jpg",
  "radiant lab": "/assets/images/Animal house/Animal house/Lab-1.jpg",
  "15 years celebration": "/assets/images/Animal house/Animal house/15 years celebrations/DSC07197.webp",
  "area 83 outing": "/assets/images/Animal house/Animal house/Area 83 Team outing/IMG_8165.JPG",
  "team celebrations": "/assets/images/Animal house/Animal house/Radiant Team celebrations/IMG_20221224_124943.jpg",
  "korea expo 2025": "/assets/images/Animal house/Animal house/EXPO/1746162006536.webp",
};

const getImageForItem = (label: string): string => {
  const key = label.toLowerCase();
  return (
    galleryImages[key as keyof typeof galleryImages] ||
    "/assets/images/Animal house/Animal house/Team-Radiant-1.jpg"
  );
};

import { DropdownItem } from "./types";

interface GalleryDropdownProps {
  dropdownItems: DropdownItem[];
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function GalleryDropdown({
  dropdownItems,
  anchorEl,
  open,
  onClose,
  onMouseEnter,
  onMouseLeave,
}: GalleryDropdownProps) {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleItemClick = (href: string) => {
    router.push(href);
    onClose();
  };

  const handleClickAway = (event: Event) => {
    // Don't close if clicking on the trigger button
    if (anchorEl && anchorEl.contains(event.target as Node)) {
      return;
    }
    onClose();
  };

  const isActiveItem = (href: string): boolean => {
    // Check if we're on the gallery page
    if (!pathname.startsWith("/gallery")) {
      return false;
    }

    // Extract category from the dropdown item href
    const url = new URL(href, window.location.origin);
    const pathSegments = url.pathname.split("/");
    const itemCategory = pathSegments[pathSegments.length - 1];

    // Get current category from URL path
    const currentPathSegments = pathname.split("/");
    const currentCategory = currentPathSegments[currentPathSegments.length - 1];

    // If no category in URL, default is 'radiant-team' (as set in GallerySection)
    const activeCategory = currentCategory || "radiant-team";

    // Check if this dropdown item matches the current active category
    return itemCategory === activeCategory;
  };

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement="bottom-start"
      sx={{
        zIndex: theme.zIndex.appBar + 1,
        minWidth: 280,
        maxWidth: 320,
      }}
      modifiers={[
        {
          name: "offset",
          options: {
            offset: [0, 8],
          },
        },
      ]}
    >
      <Grow in={open} timeout={200}>
        <Paper
          elevation={8}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          sx={{
            overflow: "hidden",
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[8],
          }}
        >
          <ClickAwayListener onClickAway={handleClickAway}>
            <List
              disablePadding
              sx={{
                py: 1,
                maxHeight: "70vh",
                overflowY: "auto",
                "&::-webkit-scrollbar": {
                  width: 4,
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "transparent",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: theme.palette.divider,
                  borderRadius: 2,
                },
              }}
            >
              {dropdownItems.map((item, index) => {
                const isActive = isActiveItem(item.href);
                return (
                  <ListItem key={index} disablePadding>
                    <ListItemButton
                      onClick={() => handleItemClick(item.href)}
                      sx={{
                        px: 3,
                        py: 1.5,
                        minHeight: 48,
                        background: isActive
                          ? `${theme.palette.primary.main}`
                          : "transparent",
                        borderLeft: isActive
                          ? `3px solid ${theme.palette.primary.main}`
                          : "3px solid transparent",
                        borderRadius: isActive ? 1 : 0,
                        mx: isActive ? 1 : 0,
                        "&:hover": {
                          background: `${theme.palette.primary.main}`,
                          borderLeft: `3px solid ${theme.palette.primary.main}`,
                          borderRadius: 1,
                          mx: 1,
                          color: "white",
                          "& .MuiTypography-root": {
                            color: "white !important",
                          },
                        },
                        transition: theme.transitions.create(
                          [
                            "background",
                            "border-left-color",
                            "margin",
                            "border-radius",
                          ],
                          {
                            duration: theme.transitions.duration.short,
                          }
                        ),
                      }}
                    >
                      {getImageForItem(item.label) && (
                        <Avatar
                          src={getImageForItem(item.label)}
                          alt={item.label}
                          sx={{
                            width: 32,
                            height: 32,
                            mr: 2,
                            borderRadius: 1,
                          }}
                        />
                      )}
                      <ListItemText
                        primary={
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: isActive ? 600 : 500,
                              color: isActive
                                ? "white"
                                : theme.palette.text.primary,
                              fontSize: "0.875rem",
                              lineHeight: 1.4,
                              letterSpacing: "0.02em",
                            }}
                          >
                            {item.label}
                          </Typography>
                        }
                        secondary={
                          item.description && (
                            <Typography
                              variant="caption"
                              sx={{
                                color: theme.palette.text.secondary,
                                mt: 0.5,
                                display: "block",
                              }}
                            >
                              {item.description}
                            </Typography>
                          )
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </ClickAwayListener>
        </Paper>
      </Grow>
    </Popper>
  );
}
