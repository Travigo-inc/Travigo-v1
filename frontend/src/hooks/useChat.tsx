import { useState, useCallback } from 'react';
import { chatService, ChatMessage, ChatContext } from '../services/chatService';

export const useChat = (initialContext?: ChatContext) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hi! I'm your AI travel assistant. I can help you modify your itinerary, find new destinations, answer travel questions, or assist with bookings. How can I help you today?",
      timestamp: new Date(),
      suggestions: [
        "Modify my current trip",
        "Find nearby restaurants", 
        "Check weather updates",
        "Help with bookings"
      ]
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Set context for personalized responses
  const setContext = useCallback((context: Partial<ChatContext>) => {
    chatService.setContext(context);
  }, []);

  // Send message and get AI response
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Get AI response
      const response = await chatService.processMessage(content);

      // Add bot response after a delay
      setTimeout(() => {
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: response.content,
          timestamp: new Date(),
          suggestions: response.suggestions
        };

        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1000 + Math.random() * 1000);

    } catch (error) {
      console.error('Chat error:', error);

      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: "I'm sorry, I encountered an error. Please try again or contact support if the issue persists.",
        timestamp: new Date(),
        suggestions: ["Try again", "Contact support"]
      };

      setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);
    }
  }, []);

  // Clear chat history
  const clearMessages = useCallback(() => {
    setMessages([{
      id: '1',
      type: 'bot',
      content: "Chat cleared! How can I help you with your travel plans?",
      timestamp: new Date(),
      suggestions: chatService.getQuickActions()
    }]);
  }, []);

  // Get quick action suggestions
  const getQuickActions = useCallback(() => {
    return chatService.getQuickActions();
  }, []);

  return {
    messages,
    isTyping,
    sendMessage,
    clearMessages,
    setContext,
    getQuickActions
  };
};

export default useChat;