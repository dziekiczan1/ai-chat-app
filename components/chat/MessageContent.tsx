import Image from "next/image";
import { FileText } from "lucide-react";
import type { UIMessage } from "ai";

interface MessageContentProps {
  message: UIMessage;
}

export const MessageContent = ({ message }: MessageContentProps) => {
  return (
    <div className="space-y-2">
      {message.parts?.map((part, index) => {
        switch (part.type) {
          case "text":
            return (
              <div
                key={`${message.id}-${index}`}
                className="whitespace-pre-wrap text-sm leading-relaxed"
              >
                {part.text}
              </div>
            );

          case "file":
            if (part.mediaType?.startsWith("image/")) {
              return (
                <div
                  key={`${message.id}-${index}`}
                  className="rounded-lg overflow-hidden"
                >
                  <Image
                    src={part.url}
                    alt={part.filename ?? `attachment-${index}`}
                    width={500}
                    height={500}
                    className="rounded-lg"
                  />
                </div>
              );
            }

            if (part.mediaType === "application/pdf") {
              return (
                <iframe
                  key={`${message.id}-${index}`}
                  src={part.url}
                  width="100%"
                  height="300"
                  title={part.filename ?? `attachment-${index}`}
                  className="rounded-lg border border-gray-300"
                />
              );
            }

            if (part.mediaType === "text/plain") {
              return (
                <div
                  key={`${message.id}-${index}`}
                  className={`rounded-lg p-3 border ${
                    message.role === "user"
                      ? "border-white/30 bg-white/10"
                      : "border-gray-300 bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span className="text-xs font-medium">
                      {part.filename || "document.txt"}
                    </span>
                  </div>
                </div>
              );
            }
            return null;

          default:
            return null;
        }
      })}
    </div>
  );
};
