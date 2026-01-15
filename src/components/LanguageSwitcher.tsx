/**
 * @fileoverview Language Switcher Component
 * Allows users to switch between English and Korean
 */

"use client";

import React, { useContext } from "react";
import { Button, ButtonGroup, Box } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import { ConfigContext } from "contexts/ConfigContext";
import { I18n } from "types/config";

const LanguageSwitcher: React.FC = () => {
  const { i18n, onChangeLocale } = useContext(ConfigContext);
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (locale: I18n) => {
    onChangeLocale(locale);
    if (pathname.startsWith("/pricing")) {
      router.push("/");
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <ButtonGroup variant="outlined" size="small">
        <Button
          onClick={() => handleLanguageChange("en")}
          variant={i18n === "en" ? "contained" : "outlined"}
          sx={{ minWidth: "60px" }}
        >
          EN
        </Button>
        <Button
          onClick={() => handleLanguageChange("ko")}
          variant={i18n === "ko" ? "contained" : "outlined"}
          sx={{ minWidth: "60px" }}
        >
          한국어
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default LanguageSwitcher;
