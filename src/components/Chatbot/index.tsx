/**
 * @fileoverview Main chatbot component that combines button and window
 */

"use client";

import React from "react";
import ChatbotButton from "./ChatbotButton";
import ChatbotWindow from "./ChatbotWindow";
import useChatbot from "./useChatbot";
import { useCustomerModal } from "../../contexts/CustomerModalContext";

export default function Chatbot() {
  const {
    isOpen,
    messages,
    openChatbot,
    closeChatbot,
    handleButtonClick,
    resetChat,
  } = useChatbot();
  
  const { isCustomerModalOpen } = useCustomerModal();

  // Hide chatbot when customer details modal is open
  const shouldShowChatbot = !isCustomerModalOpen;

  return (
    <>
      {shouldShowChatbot && (
        <>
          <ChatbotButton onClick={openChatbot} isOpen={isOpen} />
          <ChatbotWindow
            isOpen={isOpen}
            onClose={closeChatbot}
            messages={messages}
            onButtonClick={handleButtonClick}
            onRefresh={resetChat}
          />
        </>
      )}
    </>
  );
}

// Export types for external use
export type { ChatMessage, ChatButton, ChatFlow, ChatbotState } from "./types";
