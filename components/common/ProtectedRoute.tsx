"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { useAuth } from "@/app/context/auth/AuthContext";
import { ROUTES } from "@/lib/routes";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { authState, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !authState.isAuthenticated) {
      router.replace(ROUTES.home);
    }
  }, [authState.isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (!authState.isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};
