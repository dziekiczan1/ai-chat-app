"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/app/context/auth/AuthContext";
import { AuthCard, LoginForm } from "@/components/auth";
import { ROUTES } from "@/lib/routes";
import { AUTH_CONTENT } from "@/lib/auth";

export default function LoginPage() {
  const { authState } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authState.isAuthenticated) {
      router.replace(ROUTES.chat);
    }
  }, [authState.isAuthenticated, router]);

  return (
    <AuthCard
      title={AUTH_CONTENT.login.title}
      subtitle={AUTH_CONTENT.login.subtitle}
    >
      <LoginForm />
    </AuthCard>
  );
}
