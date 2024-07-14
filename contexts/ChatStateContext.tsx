import React, { createContext, useContext } from 'react';
import useChatState from '../hooks/useChatState';

const ChatStateContext = createContext<ReturnType<typeof useChatState> | null>(null);

export const useChatStateContext = () => {
  const context = useContext(ChatStateContext);
  if (!context) {
    throw new Error('useChatStateContext must be used within a ChatStateProvider');
  }
  return context;
};

export const ChatStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const chatState = useChatState();

  return (
    <ChatStateContext.Provider value={chatState}>
      {children}
    </ChatStateContext.Provider>
  );
};

// Update the useChatState hook (typically in a separate file, e.g., hooks/useChatState.ts)
import { useState, useCallback } from 'react';
import { ChatMessage, ChatState } from '../types/chat';

const useChatState = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [scannedProjectContent, setScannedProjectContent] = useState<string | null>(null);

  const addMessage = useCallback((message: ChatMessage) => {
    setMessages(prevMessages => [...prevMessages, message]);
  }, []);

  const updateInputValue = useCallback((value: string) => {
    setInputValue(value);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const getChatState = useCallback((): ChatState => {
    return { messages, inputValue, isLoading, scannedProjectContent };
  }, [messages, inputValue, isLoading, scannedProjectContent]);

  const setChatState = useCallback((state: ChatState) => {
    setMessages(state.messages);
    setInputValue(state.inputValue);
    setIsLoading(state.isLoading);
    setScannedProjectContent(state.scannedProjectContent);
  }, []);

  return {
    messages,
    inputValue,
    isLoading,
    scannedProjectContent,
    addMessage,
    updateInputValue,
    setIsLoading,
    setScannedProjectContent,
    clearMessages,
    getChatState,
    setChatState,
  };
};

export default useChatState;