"use client";

import { useState, useEffect } from "react";
import { useChat as useAIChat } from "@ai-sdk/react";

import { useAuth } from "@/app/context/auth/AuthContext";
import { useChat as useChatContext } from "@/app/context/chat/ChatContext";
import { ChatMessages } from "./ChatMessages";
import { ChatInputForm } from "./ChatInputForm";

export const ChatInterface = () => {
  const [input, setInput] = useState("");
  const { authState } = useAuth();
  const { chatHistory, setHistory } = useChatContext();

  const { messages, sendMessage, status, error, stop } = useAIChat();

  const displayMessages = messages.length > 0 ? messages : chatHistory;

  useEffect(() => {
    if (messages.length > 0) {
      setHistory(messages);
    }
  }, [messages, setHistory]);

  const handleSubmit = (files: File[]) => {
    const dataTransfer = new DataTransfer();
    files.forEach((file) => dataTransfer.items.add(file));

    sendMessage({ text: input, files: dataTransfer.files });
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto h-full border bg-white/50">
      <ChatMessages
        messages={displayMessages}
        status={status}
        error={error || null}
        profilePicture={authState.user?.profilePicture}
        userName={authState.user?.name}
      />

      <ChatInputForm
        input={input}
        setInput={setInput}
        status={status}
        onSubmit={handleSubmit}
        onStop={stop}
      />
    </div>
  );
};
