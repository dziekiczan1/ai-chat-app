"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/app/context/auth/AuthContext";
import { Header } from "@/components/common/header/Header";
import { ROUTES } from "@/lib/routes";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authState } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authState.isAuthenticated) {
      router.replace(ROUTES.home);
    }
  }, [authState.isAuthenticated, router]);

  if (!authState.isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
    </div>
  );
}
