"use client";

import { useAuth } from "@/app/context/auth/AuthContext";
import { Logo } from "./Logo";
import { Navigation } from "./Navigation";
import { UserMenu } from "./UserMenu";
import { MobileMenu } from "./MobileMenu";

export const Header = () => {
  const { authState, logout } = useAuth();
  const { user } = authState;

  return (
    <header className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />
          <Navigation />
          {user && <UserMenu user={user} onLogout={logout} />}
          <MobileMenu onLogout={logout} />
        </div>
      </div>
    </header>
  );
};
