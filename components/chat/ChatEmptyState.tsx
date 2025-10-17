"use client";

import { Bot } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CHAT_CONTENT } from "@/lib/chat";

export const ChatEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="mb-4">
        <Avatar className="h-16 w-16 mx-auto">
          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600">
            <Bot className="h-8 w-8 text-white" />
          </AvatarFallback>
        </Avatar>
      </div>
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
        {CHAT_CONTENT.emptyState.title}
      </h2>
      <p className="text-sm text-muted-foreground max-w-md">
        {CHAT_CONTENT.emptyState.subtitle}
      </p>
    </div>
  );
};
