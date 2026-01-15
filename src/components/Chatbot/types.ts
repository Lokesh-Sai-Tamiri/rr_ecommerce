/**
 * @fileoverview Chatbot types and interfaces
 */

export interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  buttons?: ChatButton[];
  flow?: string; // Track which flow this message belongs to
}

export interface ChatButton {
  id: string;
  label: string;
  action: string;
  translationKey?: string; // Store the original translation key for user messages
  displayLabel?: string; // Display the translated label to the user
  data?: any;
}

export interface ChatFlow {
  [key: string]: {
    message: string;
    buttons?: ChatButton[];
    isEndpoint?: boolean;
  };
}

export interface ChatbotState {
  isOpen: boolean;
  messages: ChatMessage[];
  currentFlow: string;
}
