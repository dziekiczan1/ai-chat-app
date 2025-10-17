import type { UIMessage } from "ai";

import { Card } from "@/components/ui/card";
import { MessageAvatar } from "./MessageAvatar";
import { MessageContent } from "./MessageContent";

interface ChatMessageProps {
  message: UIMessage;
  profilePicture?: string;
  userName?: string;
}

export const ChatMessage = ({
  message,
  profilePicture,
  userName,
}: ChatMessageProps) => {
  return (
    <div
      className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
    >
      <MessageAvatar
        role={message.role as "user" | "assistant"}
        profilePicture={profilePicture}
        userName={userName}
      />

      <Card
        className={`max-w-[70%] p-4 ${
          message.role === "user"
            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
            : "bg-muted"
        }`}
      >
        <MessageContent message={message} />
      </Card>
    </div>
  );
};
