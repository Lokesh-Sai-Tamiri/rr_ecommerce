/**
 * @fileoverview Custom hook for chatbot state management
 */

"use client";

import { useState, useCallback, useEffect } from "react";
import { useIntl } from "react-intl";
import { ChatMessage, ChatbotState } from "./types";
import { chatbotFlows, generateMessageId } from "./chatbotData";
import { useRouter } from "next/navigation";

export default function useChatbot() {
  const intl = useIntl();
  const router = useRouter();
  const [state, setState] = useState<ChatbotState>({
    isOpen: false,
    messages: [],
    currentFlow: "initial",
  });

  const createBotMessage = useCallback(
    (text: string, buttons?: any[], flow?: string): ChatMessage => {
      // Handle translation keys - check if it's a valid translation key
      const translatedText = text.includes(".")
        ? intl.formatMessage({ id: text })
        : text;

      // Create buttons with both original translation keys and translated labels
      const processedButtons = buttons?.map((button) => {
        return {
          ...button,
          // Keep the original translation key for proper user message creation
          translationKey: button.translationKey || button.label,
          // Display the translated label to the user
          displayLabel: button.label.includes(".")
            ? intl.formatMessage({ id: button.label })
            : button.label,
        };
      });

      return {
        id: generateMessageId(),
        text: translatedText,
        isBot: true,
        timestamp: new Date(),
        buttons: processedButtons,
        flow: flow, // Store the flow information
      };
    },
    [intl]
  );

  const createUserMessage = useCallback(
    (text: string): ChatMessage => {
      // Handle translation keys for user messages
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

      return {
        id: generateMessageId(),
        text: translatedText,
        isBot: false,
        timestamp: new Date(),
      };
    },
    [intl]
  );

  const handleButtonClick = useCallback(
    (action: string, data?: any) => {
      const flow = chatbotFlows[action];

      // If there is no configured flow for this action, we may still need to
      // handle navigation (e.g., pricing category buttons that only carry href)
      if (!flow) {
        const targetHref = data?.href;
        if (targetHref) {
          try {
            router.push(targetHref);
          } catch (e) {
            console.error("Navigation failed", e);
          }
          // Reset chat with initial welcome message and minimize chatbot
          const initialFlow = chatbotFlows.initial;
          const welcomeMessage = createBotMessage(
            initialFlow.message,
            initialFlow.buttons,
            "initial"
          );
          setState((prev) => ({
            ...prev,
            isOpen: false,
            messages: [welcomeMessage],
            currentFlow: "initial",
          }));
        } else {
          console.warn(`No flow found for action: ${action}`);
        }
        return;
      }

      setState((prev) => {
        // Search through all messages to find the button that was clicked
        // This allows users to interact with buttons from previous AI messages
        let clickedButton = null;
        let sourceFlow = null;

        // First check the current flow
        const currentFlow = chatbotFlows[prev.currentFlow];
        clickedButton = currentFlow?.buttons?.find(
          (btn) => btn.action === action
        );

        if (clickedButton) {
          sourceFlow = prev.currentFlow;
        } else {
          // If not found in current flow, search through all previous bot messages
          for (let i = prev.messages.length - 1; i >= 0; i--) {
            const message = prev.messages[i];
            if (message.isBot && message.buttons) {
              const foundButton = message.buttons.find(
                (btn) => btn.action === action
              );
              if (foundButton) {
                clickedButton = foundButton;
                sourceFlow = message.flow; // Use the flow from the message
                break;
              }
            }
          }
        }

        // Use the translationKey for user messages to ensure proper translation
        // when the language changes
        const userMessageText =
          clickedButton?.translationKey || clickedButton?.label || action;
        const userMessage = createUserMessage(userMessageText);

        // If button carries a navigation target, navigate and clear chat
        const targetHref = clickedButton?.data?.href || data?.href;
        const shouldResetChatbot =
          clickedButton?.data?.resetChatbot || data?.resetChatbot;

        if (targetHref) {
          try {
            router.push(targetHref);
          } catch (e) {
            console.error("Navigation failed", e);
          }
          if (shouldResetChatbot) {
            const initialFlow = chatbotFlows.initial;
            const welcomeMessage = createBotMessage(
              initialFlow.message,
              initialFlow.buttons,
              "initial"
            );
            return {
              ...prev,
              isOpen: false,
              messages: [welcomeMessage],
              currentFlow: "initial",
            };
          }
        }

        // Create bot response
        const botMessage = createBotMessage(flow.message, flow.buttons, action); // Pass the flow name

        return {
          ...prev,
          messages: [...prev.messages, userMessage, botMessage],
          currentFlow: action,
        };
      });
    },
    [createBotMessage, createUserMessage, intl, router]
  );

  // Function to handle manual text input from users
  const handleTextInput = useCallback(
    (text: string) => {
      // Check if the text matches any known actions
      const actionMappings: Record<string, string> = {
        infrastructure: "infrastructure",
        Infrastructure: "infrastructure",
        인프라: "infrastructure",
        about: "about",
        About: "about",
        "회사 소개": "about",
        services: "services",
        Services: "services",
        "우리의 서비스": "services",
        contact: "contact",
        Contact: "contact",
        연락처: "contact",
      };

      const action = actionMappings[text];
      if (action) {
        // If it's a known action, handle it like a button click
        handleButtonClick(action);
      } else {
        // If it's unknown text, create a user message and respond with help
        const userMessage = createUserMessage(text);
        const helpMessage = createBotMessage(
          "chatbot.unknown-input",
          [
            {
              id: "help_services",
              label: "chatbot.actions.services",
              action: "services",
              translationKey: "chatbot.actions.services",
            },
            {
              id: "help_about",
              label: "chatbot.actions.about",
              action: "about",
              translationKey: "chatbot.actions.about",
            },
            {
              id: "help_infrastructure",
              label: "infrastructure.title",
              action: "infrastructure",
              translationKey: "infrastructure.title",
            },
          ],
          "help"
        );

        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, userMessage, helpMessage],
        }));
      }
    },
    [handleButtonClick, createUserMessage, createBotMessage, intl]
  );

  const openChatbot = useCallback(() => {
    setState((prev) => {
      if (prev.messages.length === 0) {
        const initialFlow = chatbotFlows.initial;
        const welcomeMessage = createBotMessage(
          initialFlow.message,
          initialFlow.buttons,
          "initial" // Pass the flow name
        );

        return {
          ...prev,
          isOpen: true,
          messages: [welcomeMessage],
          currentFlow: "initial",
        };
      }

      return {
        ...prev,
        isOpen: true,
      };
    });
  }, [createBotMessage, intl]);

  const closeChatbot = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isOpen: false,
    }));
  }, []);

  const resetChat = useCallback(() => {
    const initialFlow = chatbotFlows.initial;
    const welcomeMessage = createBotMessage(
      initialFlow.message,
      initialFlow.buttons,
      "initial" // Pass the flow name
    );

    setState((prev) => ({
      ...prev,
      messages: [welcomeMessage],
      currentFlow: "initial",
    }));
  }, [createBotMessage, intl]);

  // Clear chat when language changes (start fresh conversation)
  useEffect(() => {
    setState((prev) => {
      // If there are messages and chatbot is open, clear the chat and start fresh
      if (prev.messages.length > 0) {
        const initialFlow = chatbotFlows.initial;
        const welcomeMessage = createBotMessage(
          initialFlow.message,
          initialFlow.buttons,
          "initial" // Pass the flow name
        );

        return {
          ...prev,
          messages: [welcomeMessage],
          currentFlow: "initial",
        };
      }

      return prev;
    });
  }, [intl, createBotMessage]);

  return {
    isOpen: state.isOpen,
    messages: state.messages,
    currentFlow: state.currentFlow,
    openChatbot,
    closeChatbot,
    handleButtonClick,
    handleTextInput,
    resetChat,
  };
}
