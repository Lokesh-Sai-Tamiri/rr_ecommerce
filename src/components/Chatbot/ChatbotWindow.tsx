/**
 * @fileoverview Main chatbot window component
 */

"use client";

import React, { useEffect, useRef, useContext } from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Refresh as RefreshIcon,
  Minimize as MinimizeIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useIntl } from "react-intl";

import ChatMessage from "./ChatMessage";
import { ChatMessage as ChatMessageType } from "./types";

interface ChatbotWindowProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessageType[];
  onButtonClick: (action: string, data?: any) => void;
  onRefresh?: () => void;
}

export default function ChatbotWindow({
  isOpen,
  onClose,
  messages,
  onButtonClick,
  onRefresh,
}: ChatbotWindowProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const intl = useIntl();

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (messages.length > 0) {
      // Small delay to ensure DOM has updated
      const timeoutId = setTimeout(() => {
        // Find the scroll container (messages area) and scroll to bottom
        const scrollContainer = document.querySelector(
          "[data-chat-messages-container]"
        );
        if (scrollContainer) {
          scrollContainer.scrollTo({
            top: scrollContainer.scrollHeight,
            behavior: "smooth",
          });
        }
      }, 150);

      return () => clearTimeout(timeoutId);
    }
  }, [messages]);

  // Scroll to bottom when chatbot window opens
  useEffect(() => {
    if (isOpen && messages.length > 0) {
      const timeoutId = setTimeout(() => {
        // Find the scroll container (messages area) and scroll to bottom
        const scrollContainer = document.querySelector(
          "[data-chat-messages-container]"
        );
        if (scrollContainer) {
          scrollContainer.scrollTo({
            top: scrollContainer.scrollHeight,
            behavior: "smooth",
          });
        }
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [isOpen]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        chatWindowRef.current &&
        !chatWindowRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    }
  };

  const handleMinimize = () => {
    onClose();
  };

  const getWindowDimensions = () => {
    if (isMobile) {
      return {
        width: "calc(100vw - 48px)",
        height: "calc(100vh - 140px)",
        maxWidth: "none",
        bottom: 10,
        right: 10,
      };
    } else if (isTablet) {
      return {
        width: 340,
        height: 450,
        maxWidth: "calc(100vw - 64px)",
        bottom: 10,
        right: 10,
      };
    } else {
      return {
        width: 360,
        height: 520,
        maxWidth: "none",
        bottom: 10,
        right: 10,
      };
    }
  };

  const dimensions = getWindowDimensions();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          {isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 1300,
              }}
            />
          )}

          <div
            ref={chatWindowRef}
            style={{
              position: "fixed",
              bottom: dimensions.bottom,
              right: dimensions.right,
              width: dimensions.width,
              height: dimensions.height,
              maxWidth: dimensions.maxWidth,
              zIndex: 1400,
            }}
          >
            <Paper
              elevation={24}
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: isMobile ? 2 : 3,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                background: `url('/assets/images/home-bg.png')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                boxShadow:
                  theme.customShadows?.z24 || "0 24px 64px rgba(0,0,0,0.15)",
              }}
            >
              {/* Header */}
              <Box
                sx={{
                  background: `linear-gradient(135deg, 
                    ${theme.palette.primary.main} 0%, 
                    ${theme.palette.primary.light} 50%, 
                    ${theme.palette.primary.main} 100%)`,
                  color: theme.palette.primary.contrastText,
                  px: 2,
                  py: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  minHeight: isMobile ? 48 : isTablet ? 56 : 64,
                }}
              >
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      fontSize: isMobile ? "1.1rem" : "1.1rem",
                      color: theme.palette.primary.contrastText,
                    }}
                  >
                    {intl.formatMessage({ id: "chatbot.title" })}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 0.5 }}>
                  <IconButton
                    onClick={handleMinimize}
                    sx={{
                      color: theme.palette.primary.contrastText,
                      "&:hover": {
                        backgroundColor: `${theme.palette.primary.main}`,
                      },
                      "& .MuiSvgIcon-root": {
                        transform: "translateY(-5px)",
                      },
                    }}
                    title={intl.formatMessage({ id: "chatbot.minimize" })}
                  >
                    <MinimizeIcon />
                  </IconButton>
                  <IconButton
                    onClick={handleRefresh}
                    sx={{
                      color: theme.palette.primary.contrastText,
                      "&:hover": {
                        backgroundColor: `${theme.palette.primary.main}`,
                      },
                    }}
                    title={intl.formatMessage({ id: "chatbot.refresh" })}
                  >
                    <RefreshIcon />
                  </IconButton>
                </Box>
              </Box>

              {/* Messages Area */}
              <Box
                data-chat-messages-container
                sx={{
                  flex: 1,
                  position: "relative",
                  overflow: "auto",
                  px: 1,
                  pt: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    pb: 2,
                  }}
                >
                  {messages.map((message, index) => (
                    <div key={message.id}>
                      <ChatMessage
                        message={message}
                        onButtonClick={onButtonClick}
                      />
                    </div>
                  ))}
                  <div id="chat-bottom" />
                </Box>
              </Box>
            </Paper>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
