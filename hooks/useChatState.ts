import { useState, useCallback } from 'react';
import { ChatMessage, ChatState } from '../types/chat';

const useChatState = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = useCallback((message: ChatMessage) => {
    setMessages(prevMessages => [...prevMessages, message]);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const updateInputValue = useCallback((value: string) => {
    setInputValue(value);
  }, []);

  const getChatState = useCallback((): ChatState => {
    return { messages, inputValue, isLoading };
  }, [messages, inputValue, isLoading]);

  const setChatState = useCallback((state: ChatState) => {
    setMessages(state.messages);
    setInputValue(state.inputValue);
    setIsLoading(state.isLoading);
  }, []);

  return {
    messages,
    inputValue,
    isLoading,
    addMessage,
    clearMessages,
    updateInputValue,
    setIsLoading,
    getChatState,
    setChatState,
  };
};

export default useChatState;