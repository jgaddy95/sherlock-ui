import React, { useRef, useEffect } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';
import { useChatStateContext } from '../contexts/ChatStateContext';
import { MessagePart, Message } from '../types/chat';

const ChatInterface: React.FC = () => {
  const { 
    messages, 
    inputValue, 
    addMessage, 
    updateInputValue,
    setIsLoading,
    isLoading
  } = useChatStateContext();
  
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setIsLoading(true);
      const userMessage: Message = { 
        id: Date.now().toString(),
        role: 'user', 
        content: inputValue,
        timestamp: new Date()
      };
      addMessage(userMessage);
      updateInputValue('');

      try {
        const response = await axios.post('http://127.0.0.1:5000/api/chat', {
          messages: [...messages, userMessage].map(msg => ({ role: msg.role, content: msg.content }))
        }, {
          responseType: 'text'
        });

        const assistantMessage: Message = {
          id: Date.now().toString(),
          role: 'assistant',
          content: response.data,
          timestamp: new Date()
        };

        addMessage(assistantMessage);
      } catch (error) {
        console.error('Error sending message:', error);
        addMessage({
          id: Date.now().toString(),
          role: 'assistant', 
          content: '<p>Sorry, there was an error processing your request.</p>',
          timestamp: new Date()
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8EDE3]">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div key={message.id} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
            <div 
              className={`inline-block p-2 rounded-lg ${
                message.role === 'user' 
                  ? 'bg-[#8D493A] text-white' 
                  : 'bg-[#DFD3C3] text-[#8D493A]'
              } mb-2`}
            >
              {message.role === 'user' ? (
                <p>{message.content}</p>
              ) : (
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: DOMPurify.sanitize(message.content, { 
                      ADD_ATTR: ['target'],
                      ADD_TAGS: ['h1', 'h2', 'h3']
                    }) 
                  }} 
                />
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t border-[#D0B8A8]">
        <div className="flex">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => updateInputValue(e.target.value)}
            className="flex-1 border border-[#D0B8A8] rounded-l-lg p-2 text-[#8D493A] bg-[#F8EDE3] placeholder-[#D0B8A8]"
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-[#8D493A] text-white px-4 py-2 rounded-r-lg disabled:bg-[#D0B8A8]"
            disabled={isLoading || !inputValue.trim()}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;