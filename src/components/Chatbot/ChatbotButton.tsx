/**
 * @fileoverview Chatbot floating action button component
 */

"use client";

import React, { useState } from "react";
import { Fab, useTheme, Box, Typography, IconButton } from "@mui/material";
import Image from "next/image";
import { useIntl } from "react-intl";

interface ChatbotButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export default function ChatbotButton({ onClick, isOpen }: ChatbotButtonProps) {
  const theme = useTheme();
  const [showMessage, setShowMessage] = useState(false);
  const intl = useIntl();

  // Get translated brand text and create repeating pattern
  const brandText = intl.formatMessage({ id: "chatbot.brand" });
  const repeatedBrandText = Array(8).fill(brandText).join(" • ") + " • ";

  const handleMouseEnter = () => {
    if (!isOpen) {
      setShowMessage(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isOpen) {
      setShowMessage(false);
    }
  };

  const handleMessageClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMessage(false);
  };

  const handleButtonClick = () => {
    setShowMessage(false);
    onClick();
  };

  return (
    <>
      {!isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "10px",
            right: "10px",
            zIndex: 1300,
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Message Bubble */}
          <div
            style={{
              position: "absolute",
              bottom: "75px",
              right: "10px",
              width: "250px",
              zIndex: 1301,
            }}
          >
            {showMessage && (
              <Box
                sx={{
                  background: theme.palette.primary.main,
                  borderRadius: "20px",
                  padding: "15px",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                  border: "2px solid rgba(255,255,255,0.2)",
                  backdropFilter: "blur(10px)",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: "-8px",
                    right: "25px",
                    width: "0",
                    height: "0",
                    borderLeft: "8px solid transparent",
                    borderRight: "8px solid transparent",
                    borderTop: `8px solid ${theme.palette.primary.main}`,
                  },
                }}
              >
                {/* Close Button */}
                <IconButton
                  onClick={handleMessageClose}
                  size="small"
                  sx={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    color: "white",
                    "&:hover": {
                      background: "rgba(255,255,255,0.1)",
                    },
                  }}
                ></IconButton>

                {/* Message Content */}
                <Box sx={{ pr: 3 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "white",
                      fontWeight: 600,
                      marginBottom: "8px",
                      fontSize: "1rem",
                    }}
                  >
                    👋 {intl.formatMessage({ id: "chatbot.welcome" })}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "rgba(255,255,255,0.9)",
                      lineHeight: 1.4,
                      fontSize: "0.875rem",
                    }}
                  >
                    {intl.formatMessage({ id: "chatbot.subtitle" })}
                  </Typography>
                </Box>
              </Box>
            )}
          </div>

          {/* Chat Button with Rotating Text */}
          <Box
            sx={{
              position: "relative",
              width: 80,
              height: 80,
            }}
          >
            {/* Rotating circular text */}
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                animation: "rotate 8s linear infinite",
                "@keyframes rotate": {
                  "0%": {
                    transform: "rotate(0deg)",
                  },
                  "100%": {
                    transform: "rotate(360deg)",
                  },
                },
              }}
              zIndex={1303}
            >
              <svg viewBox="0 0 100 100" width="100%" height="100%">
                <defs>
                  <path
                    id="circlePath"
                    d="M 50, 50
                       m -42, 0
                       a 42,42 0 1,1 84,0
                       a 42,42 0 1,1 -84,0"
                  />
                </defs>
                <text
                  fill={theme.palette.primary.main}
                  fontSize="9"
                  fontWeight="bold"
                  letterSpacing="0.8px"
                >
                  <textPath
                    href="#circlePath"
                    startOffset="0%"
                    textAnchor="middle"
                  >
                    {repeatedBrandText}
                  </textPath>
                </text>
              </svg>
            </Box>

            {/* FAB Button */}
            <Fab
              onClick={handleButtonClick}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 50,
                height: 50,
                background: "transparent",
                boxShadow: "none",
                "&:hover": {
                  background: "transparent",
                  transform: "translate(-50%, -50%) scale(1.05)",
                  boxShadow: "none",
                },
                "&:active": {
                  background: "transparent",
                  transform: "translate(-50%, -50%) scale(0.95)",
                },
                transition: "all 0.2s ease-in-out",
              }}
            >
              <Image
                style={{
                  backgroundColor: "transparent",
                }}
                src="/RadiantLogo2.png"
                alt="Radiant AI Chatbot"
                width={46}
                height={46}
              />
            </Fab>
          </Box>
        </div>
      )}
    </>
  );
}
