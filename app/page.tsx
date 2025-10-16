"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/app/context/auth/AuthContext";
import { LoginForm } from "@/components/auth";
import { ROUTES } from "@/lib/routes";

export default function LoginPage() {
  const { authState } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authState.isAuthenticated) {
      router.replace(ROUTES.chat);
    }
  }, [authState.isAuthenticated, router]);

  return <LoginForm />;
}
