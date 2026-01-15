"use client";

import { useEffect, useRef, useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Avatar from "@mui/material/Avatar";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// next
import { useRouter, usePathname } from "next/navigation";

// project imports
import { ThemeMode } from "config";

import Transitions from "ui-component/extended/Transitions";

// assets
import TranslateTwoToneIcon from "@mui/icons-material/TranslateTwoTone";
import useConfig from "hooks/useConfig";

// types
import { I18n } from "types/config";

// ==============================|| LOCALIZATION ||============================== //

export default function LocalizationSection() {
  const { mode, borderRadius, i18n, onChangeLocale } = useConfig();
  const router = useRouter();
  const pathname = usePathname();

  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down("md"));

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<any>(null);
  const navigationPending = useRef(false);

  const handleListItemClick = (
    event:
      | React.MouseEvent<HTMLAnchorElement>
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | undefined,
    lng: I18n
  ) => {
    console.log("Language switch clicked, lng:", lng, "pathname:", pathname);
    onChangeLocale(lng);
    if (pathname.startsWith("/pricing")) {
      console.log("Setting navigation pending for pricing page");
      navigationPending.current = true;
    }
    setOpen(false);
  };

  useEffect(() => {
    console.log("useEffect triggered, i18n:", i18n, "pathname:", pathname, "navigationPending:", navigationPending.current);
    if (navigationPending.current && pathname.startsWith("/pricing")) {
      console.log("Navigating to /");
      router.push("/");
      navigationPending.current = false;
    } else if (navigationPending.current && !pathname.startsWith("/pricing")) {
      console.log("Resetting navigation pending, no longer on pricing");
      navigationPending.current = false;
    }
  }, [i18n, pathname, router]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const prevOpen = useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Box sx={{ ml: { xs: 0, sm: 2 } }}>
        <Avatar
          variant="rounded"
          sx={{
            ...theme.typography.commonAvatar,
            ...theme.typography.mediumAvatar,
            border: "1px solid",
            borderColor:
              mode === ThemeMode.DARK ? "dark.main" : "primary.light",
            bgcolor: mode === ThemeMode.DARK ? "dark.main" : "primary.light",
            color: "primary.dark",
            transition: "all .2s ease-in-out",
            '&[aria-controls="menu-list-grow"],&:hover': {
              borderColor: "primary.main",
              bgcolor: "primary.main",
              color: "primary.light",
            },
          }}
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          alt="language"
          onClick={handleToggle}
          color="inherit"
        >
          {i18n !== "en" && (
            <Typography
              variant="h5"
              sx={{ textTransform: "uppercase" }}
              color="inherit"
            >
              {i18n}
            </Typography>
          )}
          {i18n === "en" && (
            <TranslateTwoToneIcon sx={{ fontSize: "1.3rem" }} />
          )}
        </Avatar>
      </Box>

      <Popper
        placement={downMD ? "bottom-start" : "bottom"}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [downMD ? 0 : 0, 20],
            },
          },
        ]}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Transitions
              position={downMD ? "top-left" : "top"}
              in={open}
              {...TransitionProps}
            >
              <Paper elevation={16}>
                {open && (
                  <List
                    sx={{
                      width: "100%",
                      minWidth: 200,
                      maxWidth: { xs: 250, sm: 280 },
                      borderRadius: `${borderRadius}px`,
                    }}
                  >
                    <ListItemButton
                      selected={i18n === "en"}
                      onClick={(event) => handleListItemClick(event, "en")}
                    >
                      <ListItemText
                        primary={
                          <Grid container>
                            <Typography color="textPrimary">English</Typography>
                            <Typography
                              variant="caption"
                              color="textSecondary"
                              sx={{ ml: "8px" }}
                            >
                              (US)
                            </Typography>
                          </Grid>
                        }
                      />
                    </ListItemButton>
                    <ListItemButton
                      selected={i18n === "ko"}
                      onClick={(event) => handleListItemClick(event, "ko")}
                    >
                      <ListItemText
                        primary={
                          <Grid container>
                            <Typography color="textPrimary">한국어</Typography>
                            <Typography
                              variant="caption"
                              color="textSecondary"
                              sx={{ ml: "8px" }}
                            >
                              (Korean)
                            </Typography>
                          </Grid>
                        }
                      />
                    </ListItemButton>
                  </List>
                )}
              </Paper>
            </Transitions>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
}
