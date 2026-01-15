/**
 * @fileoverview Landing page with responsive layout.
 * Uses centralized utilities for consistent styling and device detection.
 */

"use client";

// material-ui
import Box from "@mui/material/Box";

// project imports
import AppBar from "ui-component/extended/AppBar";
import FooterSection from "./FooterSection";
import HeaderSection from "./HeaderSection";
import AboutSection from "./AboutSection";
import ServicesSection from "./ServicesSection";
import AccreditationSection from "./AccreditationSection";

// centralized utilities
import { useScreenDetection } from "./utils";

/**
 * Main landing page component with clean structure.
 */
export default function Landing() {
  const screen = useScreenDetection();

  return (
    <Box
      className="landing-page"
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "visible",
      }}
    >
      {/* Fixed Header */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          backdropFilter: "blur(10px)",
        }}
      >
        <AppBar
          sx={{
            background: "transparent",
            boxShadow: "none",
            position: "static",
          }}
          disableSticky={true}
          FooterComponent={FooterSection}
        />
      </Box>

      {/* Main Content Container */}
      <Box sx={{ flex: 1 }}>
        {/* HeaderSection Component */}
        <Box
          sx={{
            backgroundImage: `url('/assets/images/home-bg.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment:
              screen.isMobile || screen.isTablet ? "scroll" : "fixed",
          }}
        >
          {/* Header Section */}
          <HeaderSection />
          {/* About Section */}
          <AboutSection />
          {/* Services Section*/}
          <ServicesSection />
          {/* Accreditation Section*/}
          <AccreditationSection />
        </Box>
      </Box>

      {/* Fixed Footer */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          backdropFilter: "blur(10px)",
        }}
      >
        <FooterSection />
      </Box>
    </Box>
  );
}
