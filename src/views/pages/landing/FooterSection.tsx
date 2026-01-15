/**
 * @fileoverview Footer section component for the landing page.
 * Uses centralized utilities for consistent styling and device detection.
 */

"use client";

// Material-UI components
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import { useTheme } from "@mui/material/styles";
import { FormattedMessage } from "react-intl";

// Icon assets
import { IconBrandDiscord } from "@tabler/icons-react";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PublicIcon from "@mui/icons-material/Public";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";

// centralized utilities
import {
  useScreenDetection,
  FONT_FAMILIES,
  FONT_WEIGHTS,
  ANIMATIONS,
} from "./utils";

// project imports
import NewsMarquee from "components/NewsMarquee";

/**
 * Social media platform configuration
 */
const SOCIAL_LINKS = {
  github: "https://github.com/radiantresearch",
  instagram: "https://www.instagram.com/radiantresearchservices/",
  discord: "https://discord.com/invite/p2E2WhCb6s",
  youtube: "https://www.youtube.com/channel/UCiZG__BaRkT1OuZl5ifzO6A",
  blog: "https://links.radiantresearch.com/HTIBc",
  twitter: "https://x.com/radiantresearch",
  linkedIn: "https://www.linkedin.com/company/radiant-research-services-pvt-ltd/",
  dribbble: "https://dribbble.com/radiantresearch",
  facebook: "https://www.facebook.com/radiantresearchservices",
} as const;

/**
 * Footer section component
 */
export default function FooterSection() {
  const screen = useScreenDetection();
  const theme = useTheme();

  /**
   * Common styling for social media icon buttons
   */
  const iconButtonStyles = {
    padding: { xs: "1px", sm: "3px" },
    color: theme.palette.primary.main,
    backgroundColor: "transparent",
    borderRadius: 2,
    transition: ANIMATIONS.TRANSITION_SMOOTH,
    "& svg": {
      fontSize: { xs: "14px", sm: "18px" },
    },
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      transform: "translateY(-2px)",
      boxShadow: `0 4px 8px ${theme.palette.primary.main}30`,
    },
  };

  /**
   * Social media icon button component
   */
  const SocialIconButton = ({
    title,
    ariaLabel,
    href,
    children,
  }: {
    title: React.ReactNode;
    ariaLabel: string;
    href: string;
    children: React.ReactNode;
  }) => (
    <Tooltip title={title} arrow>
      <IconButton
        size="small"
        aria-label={ariaLabel}
        component={Link}
        href={href}
        target="_blank"
        sx={iconButtonStyles}
      >
        {children}
      </IconButton>
    </Tooltip>
  );

  return (
    <Box >
      {/* News Marquee - Hidden on mobile */}
      {!screen.isMobile && <NewsMarquee />}

      <Container>
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={{ xs: 0.25, sm: 0.25 }}
        >
          {/* Social media icons */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={{ xs: 1, sm: 0.75, md: 1 }}
          >
           

            <SocialIconButton
              title={
                <FormattedMessage
                  id="footer.social.instagram"
                  defaultMessage="Follow us on Instagram"
                />
              }
              ariaLabel="Radiant Research Instagram"
              href={SOCIAL_LINKS.instagram}
            >
              <InstagramIcon />
            </SocialIconButton>

        
            <SocialIconButton
              title={
                <FormattedMessage
                  id="footer.social.linkedin"
                  defaultMessage="Follow us on LinkedIn"
                />
              }
              ariaLabel="Radiant Research LinkedIn"
              href={SOCIAL_LINKS.linkedIn}
            >
              <LinkedInIcon />
            </SocialIconButton>
            <SocialIconButton
              title={
                <FormattedMessage
                  id="footer.social.facebook"
                  defaultMessage="Follow us on Facebook"
                />
              }
              ariaLabel="Radiant Research Facebook"
              href={SOCIAL_LINKS.facebook}
            >
              <FacebookIcon />
            </SocialIconButton>
 
           

           {/* <SocialIconButton
              title={
                <FormattedMessage
                  id="footer.social.facebook"
                  defaultMessage="Follow us on Facebook"
                />
              }
              ariaLabel="Radiant Research Facebook"
              href={SOCIAL_LINKS.facebook}
            >
              <FacebookIcon />
            </SocialIconButton> */}
          </Stack>

          {/* Copyright notice */}
          <Typography
            sx={{
              color: theme.palette.text.primary,
              fontFamily: FONT_FAMILIES.PRIMARY,
              fontWeight: FONT_WEIGHTS.REGULAR,
              fontSize: {
                xs: "0.6rem",
                sm: "0.7rem",
                md: "0.75rem",
                lg: "0.8rem",
              },
              textAlign: "center",
            }}
          >
            <FormattedMessage
              id="footer.copyright"
              defaultMessage="© 2025 Radiant Research. All rights reserved."
            />
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
