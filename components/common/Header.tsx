"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAuth } from "@/app/context/auth/AuthContext";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";

export const Header = () => {
  const pathname = usePathname();
  const { authState, logout } = useAuth();

  if (!authState.isAuthenticated) return null;

  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">AI Chat App</h1>

        <nav className="flex items-center space-x-2">
          <Link href={ROUTES.chat}>
            <Button
              variant={isActive(ROUTES.chat) ? "default" : "ghost"}
              size="sm"
              className={`rounded-md transition-colors duration-200 ${
                !isActive(ROUTES.chat) && "text-gray-700 hover:text-gray-900"
              }`}
              asChild
            >
              <span>Chat</span>
            </Button>
          </Link>

          <Link href={ROUTES.profile}>
            <Button
              variant={isActive(ROUTES.profile) ? "default" : "ghost"}
              size="sm"
              className={`rounded-md transition-colors duration-200 ${
                !isActive(ROUTES.chat) && "text-gray-700 hover:text-gray-900"
              }`}
              asChild
            >
              <span>Profil</span>
            </Button>
          </Link>

          <Button
            variant="outline"
            size="sm"
            onClick={logout}
            className="ml-2 text-gray-600 border-gray-300 hover:bg-gray-100 hover:text-gray-800 transition-colors"
          >
            Wyloguj
          </Button>
        </nav>
      </div>
    </header>
  );
};
