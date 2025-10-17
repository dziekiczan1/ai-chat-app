import { Bot } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MessageAvatarProps {
  role: "user" | "assistant";
  profilePicture?: string;
  userName?: string;
}

export const MessageAvatar = ({
  role,
  profilePicture,
  userName,
}: MessageAvatarProps) => {
  return (
    <Avatar className="h-8 w-8 mt-1 shrink-0">
      {role === "user" ? (
        <AvatarImage
          src={profilePicture || "/user.svg"}
          alt={userName || "User"}
          className="object-cover"
        />
      ) : (
        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600">
          <Bot className="h-4 w-4 text-white" />
        </AvatarFallback>
      )}
    </Avatar>
  );
};
