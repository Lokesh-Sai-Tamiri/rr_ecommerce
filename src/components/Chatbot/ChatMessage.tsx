/**
 * @fileoverview Individual chat message component
 */

"use client";

import React from "react";
import {
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import { useIntl } from "react-intl";

import { Person as UserIcon } from "@mui/icons-material";

import { ChatMessage as ChatMessageType } from "./types";

interface ChatMessageProps {
  message: ChatMessageType;
  onButtonClick: (action: string, data?: any) => void;
}

export default function ChatMessage({
  message,
  onButtonClick,
}: ChatMessageProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const intl = useIntl();

  const formatMessageText = (text: string) => {
    let translatedText = text;

    // Check if the text is a translation key (contains a dot)
    if (text.includes(".")) {
      translatedText = intl.formatMessage({ id: text });
    } else {
      // Handle plain text that might need translation
      // Map common English terms to their Korean equivalents
      const textMappings: Record<string, string> = {
        infrastructure: "infrastructure.title",
        Infrastructure: "infrastructure.title",
        about: "chatbot.actions.about",
        About: "chatbot.actions.about",
        services: "chatbot.actions.services",
        Services: "chatbot.actions.services",
        contact: "chatbot.actions.contact",
        Contact: "chatbot.actions.contact",
        // Korean text mappings
        인프라: "infrastructure.title",
        "회사 소개": "chatbot.actions.about",
        "우리의 서비스": "chatbot.actions.services",
        연락처: "chatbot.actions.contact",
      };

      const translationKey = textMappings[text];
      if (translationKey) {
        translatedText = intl.formatMessage({ id: translationKey });
      }
    }

    return translatedText.split("\n").map((line, index, array) => (
      <React.Fragment key={index}>
        {line}
        {index < array.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 0.75,
        flexDirection: message.isBot ? "row" : "row-reverse",
      }}
    >
      {/* Avatar */}
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          // background: message.isBot
          //   ? `${theme.palette.primary.main}`
          //   : `${theme.palette.primary.main}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          mt: 0.5,
        }}
      >
        {message.isBot ? (
          <Image
            src="/RadiantLogo2.png"
            alt="Radiant AI"
            width={40}
            height={40}
          />
        ) : (
          <UserIcon
            sx={{
              fontSize: 40,
              backgroundColor: theme.palette.primary.main,
              borderRadius: "50%",
              padding: 1,
              color: "white",
            }}
          />
        )}
      </Box>

      {/* Message Content */}
      <Box
        sx={{
          flex: 1,
          maxWidth: "85%",
          display: "flex",
          flexDirection: "column",
          alignItems: message.isBot ? "flex-start" : "flex-end",
        }}
      >
        {/* Message Bubble */}
        <div>
          <Box
            sx={{
              background: message.isBot
                ? "linear-gradient(135deg, #ffffff, #1976d215)"
                : `${theme.palette.primary.main}`,
              color: message.isBot
                ? theme.palette.text.primary
                : theme.palette.primary.contrastText,
              px: 2,
              py: 1.5,
              borderRadius: message.isBot
                ? "18px 18px 18px 4px"
                : "18px 18px 4px 18px",
              boxShadow: theme.shadows[2],
              mb: message.buttons && message.buttons.length > 0 ? 1.5 : 0,
              // Make user messages fit content width
              width: message.isBot ? "100%" : "fit-content",
              alignSelf: message.isBot ? "flex-start" : "flex-end",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                lineHeight: 1.4,
                fontSize: isMobile ? "0.75rem" : "0.8rem",
                whiteSpace: "pre-line",
                color: message.isBot
                  ? theme.palette.text.primary
                  : theme.palette.primary.contrastText,
                textAlign: message.isBot ? "left" : "right",
              }}
            >
              {formatMessageText(message.text)}
            </Typography>
          </Box>
        </div>

        {/* Action Buttons */}
        {message.buttons && message.buttons.length > 0 && (
          <div>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 1,
                mt: 1,
                justifyContent: message.isBot ? "flex-start" : "flex-end",
              }}
            >
              {message.buttons.map((button, index) => (
                <div key={button.id}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => onButtonClick(button.action, button.data)}
                    sx={{
                      justifyContent: message.isBot ? "flex-start" : "center",
                      textAlign: message.isBot ? "left" : "center",
                      borderRadius: 3,
                      px: 1,
                      py: 0.5,
                      fontSize: isMobile ? "0.75rem" : "0.8rem",
                      fontWeight: 500,
                      textTransform: "none",
                      border: `1px solid ${theme.palette.primary.main}`,
                      color: theme.palette.primary.main,
                      background: "#e3f2fd", // Light blue background matching main page buttons
                      backdropFilter: "blur(10px)",
                      minWidth: "auto",
                      flex: "0 0 auto",
                      "&:hover": {
                        background: "#bbdefb", // Slightly darker blue on hover
                        color: theme.palette.primary.main,
                        transform: "translateY(-1px)",
                        boxShadow: theme.shadows[4],
                      },
                      "&:active": {
                        transform: "translateY(0)",
                      },
                      transition: "all 0.2s ease-in-out",
                    }}
                  >
                    {button.displayLabel || button.label}
                  </Button>
                </div>
              ))}
            </Box>
          </div>
        )}

        {/* Timestamp */}
        <Typography
          variant="caption"
          sx={{
            color: theme.palette.text.secondary,
            fontSize: "0.7rem",
            mt: 0.5,
            display: "block",
            textAlign: message.isBot ? "left" : "right",
          }}
        >
          {message.timestamp.toLocaleString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </Typography>
      </Box>
    </Box>
  );
}
