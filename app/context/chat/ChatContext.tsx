"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import type { UIMessage } from "ai";

interface ChatContextType {
  chatHistory: UIMessage[];
  addMessage: (message: UIMessage) => void;
  clearHistory: () => void;
  setHistory: (messages: UIMessage[]) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [chatHistory, setChatHistory] = useState<UIMessage[]>([]);

  useEffect(() => {
    const savedHistory = sessionStorage.getItem("chatHistory");
    if (savedHistory) {
      try {
        setChatHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error("Failed to parse chat history:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (chatHistory.length > 0) {
      sessionStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    }
  }, [chatHistory]);

  const addMessage = (message: UIMessage) => {
    setChatHistory((prev) => [...prev, message]);
  };

  const clearHistory = () => {
    setChatHistory([]);
    sessionStorage.removeItem("chatHistory");
  };

  const setHistory = (messages: UIMessage[]) => {
    setChatHistory(messages);
  };

  return (
    <ChatContext.Provider
      value={{ chatHistory, addMessage, clearHistory, setHistory }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within ChatProvider");
  }
  return context;
};
