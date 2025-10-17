import { Bot } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

export const ChatLoadingState = () => {
  return (
    <div className="flex gap-3">
      <Avatar className="h-8 w-8 mt-1 shrink-0">
        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600">
          <Bot className="h-4 w-4 text-white" />
        </AvatarFallback>
      </Avatar>
      <Card className="p-4 bg-muted">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="h-2 w-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-2 w-2 rounded-full bg-purple-500 animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-2 w-2 rounded-full bg-blue-500 animate-bounce"></div>
          </div>
          <span className="text-sm text-muted-foreground">
            AI is thinking...
          </span>
        </div>
      </Card>
    </div>
  );
};
