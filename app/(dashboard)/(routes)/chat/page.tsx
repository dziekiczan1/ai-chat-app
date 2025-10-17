import { ChatInterface } from "@/components/chat/ChatInterface";
import { ChatProvider } from "@/app/context/chat/ChatContext";

export default function ChatPage() {
  return (
    <div className="container max-w-7xl mx-auto h-[calc(100vh-65px)] p-4 sm:p-6 lg:p-8 sm:p-6">
      <ChatProvider>
        <ChatInterface />
      </ChatProvider>
    </div>
  );
}
