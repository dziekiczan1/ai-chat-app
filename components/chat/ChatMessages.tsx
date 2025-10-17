"use client";

import { useRef, useEffect } from "react";
import type { UIMessage } from "ai";
import { AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ChatMessage } from "./ChatMessage";
import { ChatEmptyState } from "./ChatEmptyState";
import { ChatLoadingState } from "./ChatLoadingState";

interface ChatMessagesProps {
  messages: UIMessage[];
  status: string;
  error: Error | null;
  profilePicture?: string;
  userName?: string;
}

export const ChatMessages = ({
  messages,
  status,
  error,
  profilePicture,
  userName,
}: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
      {error && (
        <Card className="p-4 border-red-200 bg-red-50">
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle className="h-5 w-5" />
            <span className="font-medium">{error.message}</span>
          </div>
        </Card>
      )}

      {messages.length === 0 ? (
        <ChatEmptyState />
      ) : (
        <>
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              profilePicture={profilePicture}
              userName={userName}
            />
          ))}

          {(status === "submitted" || status === "streaming") && (
            <ChatLoadingState />
          )}

          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  );
};
