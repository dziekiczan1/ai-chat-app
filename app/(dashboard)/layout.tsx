import { Header } from "@/components/common/header/Header";
import { ProtectedRoute } from "@/components/common/ProtectedRoute";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
