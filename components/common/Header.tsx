"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  MessageSquare,
  User,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Sparkles,
} from "lucide-react";

import { useAuth } from "@/app/context/auth/AuthContext";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export const Header = () => {
  const pathname = usePathname();
  const { authState, logout } = useAuth();
  const { user } = authState;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const navigationLinks = [
    { path: ROUTES.chat, label: "Chat", icon: MessageSquare },
    { path: ROUTES.profile, label: "Profil", icon: User },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href={ROUTES.chat}
            className="flex items-center space-x-3 group"
          >
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
            </motion.div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                AI Chat App
              </h1>
              <span className="text-xs text-gray-500">
                Created by Piotr Rzadkowolski
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {navigationLinks.map(({ path, label, icon: Icon }) => (
              <Link key={path} href={path}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant={isActive(path) ? "default" : "ghost"}
                    size="lg"
                    className={`relative rounded-lg transition-all duration-200 ${
                      isActive(path)
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    <span>{label}</span>
                    {isActive(path) && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg -z-10"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                  </Button>
                </motion.div>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center">
            {user && (
              <div className="relative">
                <Button
                  variant="ghost"
                  className="flex items-center space-x-1 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors h-auto"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  asChild
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Avatar className="w-10 h-10 rounded-full ring-2 ring-gray-200">
                      <AvatarImage
                        src={user.profilePicture || "/user.svg"}
                        alt={user.name}
                        className="object-cover"
                      />
                    </Avatar>
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-semibold text-gray-800">
                        {user.name}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-transform ${
                        isUserMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </motion.button>
                </Button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsUserMenuOpen(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50"
                      >
                        <Button
                          variant="ghost"
                          className="flex items-center justify-start space-x-3 px-4 py-2 hover:bg-red-50 transition-colors w-full text-red-600 hover:text-red-600"
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            logout();
                          }}
                        >
                          <LogOut className="w-4 h-4" />
                          <span className="text-sm font-medium">Wyloguj</span>
                        </Button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? (
              <X className="!w-6 !h-6 text-gray-700" />
            ) : (
              <Menu className="!w-6 !h-6 text-gray-700" />
            )}
          </Button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden border-t border-gray-200 mt-2"
            >
              <div className="py-4 space-y-2">
                {navigationLinks.map(({ path, label, icon: Icon }) => (
                  <Link
                    key={path}
                    href={path}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button
                      variant="ghost"
                      className={`w-full flex items-center justify-start space-x-3 px-4 py-3 rounded-lg transition-all h-auto ${
                        isActive(path)
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md hover:from-blue-600 hover:to-purple-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{label}</span>
                    </Button>
                  </Link>
                ))}

                {user && (
                  <>
                    <div className="border-t border-gray-200 my-2" />
                    <Button
                      variant="ghost"
                      className="w-full flex items-center justify-start space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-600 transition-colors h-auto"
                      onClick={() => {
                        setIsMenuOpen(false);
                        logout();
                      }}
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium">Wyloguj</span>
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
