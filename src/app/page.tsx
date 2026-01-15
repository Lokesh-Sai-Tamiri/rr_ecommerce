"use client";

// project import
import GuestGuard from "utils/route-guard/GuestGuard";
import Landing from "views/pages/landing";
import { FormattedMessage } from "react-intl";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";

// ==============================|| HOME PAGE ||============================== //

export default function HomePage() {
  return (
    <GuestGuard>
      <Landing />
      {/* Commented out the Welcome section as requested */}
      {/* <Box sx={{ py: 6, px: { xs: 2, md: 4 } }}>
        <Stack spacing={2} alignItems="center" textAlign="center">
          <Typography variant="h3" component="h1">
            <FormattedMessage id="home.welcome" />
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            <FormattedMessage id="home.tagline" />
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ mt: 2 }}
          >
            <Button
              component={Link}
              href="/about-us"
              variant="outlined"
              color="primary"
            >
              <FormattedMessage id="nav.about" />
            </Button>
            <Button
              component={Link}
              href="/contact-us"
              variant="contained"
              color="primary"
            >
              <FormattedMessage id="home.cta.secondary" />
            </Button>
          </Stack>
        </Stack>
      </Box> */}
    </GuestGuard>
  );
}
