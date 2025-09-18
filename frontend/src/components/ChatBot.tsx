import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles,
  MapPin,
  Calendar,
  DollarSign,
  Plane,
  Hotel,
  Camera,
  Minimize2,
  Maximize2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import useChat from "../hooks/useChat";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const { messages, isTyping, sendMessage, clearMessages } = useChat();
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    await sendMessage(inputMessage);
    setInputMessage("");
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      {/* Chat Interface */}
      {isOpen && (
        <div className={cn(
          "fixed bottom-24 right-6 z-50 transition-all duration-300 ease-in-out",
          isMinimized ? "w-80 h-16" : "w-96 h-[600px]"
        )}>
          <Card className="travel-card shadow-travel border-primary/20 h-full flex flex-col">
            {/* Header */}
            <CardHeader className="pb-3 border-b border-border/50">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-lg">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <span>AI Travel Assistant</span>
                    <div className="flex items-center text-xs text-muted-foreground font-normal">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      {isTyping ? "Typing..." : "Online"}
                    </div>
                  </div>
                </CardTitle>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleMinimize}
                    className="h-8 w-8 hover:bg-accent"
                  >
                    {isMinimized ? (
                      <Maximize2 className="h-4 w-4" />
                    ) : (
                      <Minimize2 className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleChat}
                    className="h-8 w-8 hover:bg-accent"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Messages Area */}
            {!isMinimized && (
              <>
                <CardContent className="flex-1 p-0">
                  <ScrollArea className="h-full p-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div key={message.id} className="space-y-2">
                          <div
                            className={cn(
                              "flex items-start space-x-3",
                              message.type === 'user' ? "justify-end" : "justify-start"
                            )}
                          >
                            {message.type === 'bot' && (
                              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                <Bot className="h-4 w-4 text-primary" />
                              </div>
                            )}
                            <div
                              className={cn(
                                "max-w-[80%] p-3 rounded-lg text-sm leading-relaxed",
                                message.type === 'user'
                                  ? "bg-primary text-primary-foreground ml-auto"
                                  : "bg-accent/50 text-foreground"
                              )}
                            >
                              <div className="whitespace-pre-wrap">{message.content}</div>
                              <div className="text-xs opacity-70 mt-2">
                                {message.timestamp.toLocaleTimeString([], { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </div>
                            </div>
                            {message.type === 'user' && (
                              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                <User className="h-4 w-4 text-primary" />
                              </div>
                            )}
                          </div>
                          
                          {/* Suggestions */}
                          {message.type === 'bot' && message.suggestions && (
                            <div className="flex flex-wrap gap-2 ml-11">
                              {message.suggestions.map((suggestion, index) => (
                                <Button
                                  key={index}
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleSuggestionClick(suggestion)}
                                  className="text-xs h-7 px-3 hover:bg-primary/10 hover:text-primary hover:border-primary/30"
                                >
                                  {suggestion}
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                      
                      {/* Typing Indicator */}
                      {isTyping && (
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <Bot className="h-4 w-4 text-primary" />
                          </div>
                          <div className="bg-accent/50 p-3 rounded-lg">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                </CardContent>

                {/* Input Area */}
                <div className="p-4 border-t border-border/50">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 relative">
                      <Input
                        ref={inputRef}
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask me anything about your trip..."
                        className="travel-input pr-12"
                        disabled={isTyping}
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!inputMessage.trim() || isTyping}
                        size="icon"
                        className="absolute right-1 top-1 h-8 w-8 travel-button"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2 text-center">
                    AI assistant powered by advanced travel intelligence
                  </div>
                </div>
              </>
            )}
          </Card>
        </div>
      )}

      {/* Floating Chat Icon */}
      <Button
        onClick={toggleChat}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-travel hover:shadow-glow transition-smooth",
          "travel-button p-0 animate-float",
          isOpen && "rotate-180"
        )}
        style={{ animationDelay: '0.5s' }}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <div className="relative">
            <MessageCircle className="h-6 w-6" />
            {/* Notification dot */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          </div>
        )}
      </Button>

      {/* Welcome tooltip for first-time users */}
      {!isOpen && (
        <div className="fixed bottom-20 right-20 z-40 animate-fade-in">
          <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-travel text-sm font-medium relative">
            <Sparkles className="h-4 w-4 inline mr-2" />
            Need help? Chat with AI!
            <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-primary"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
