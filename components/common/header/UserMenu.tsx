"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface UserMenuProps {
  user: {
    name: string;
    profilePicture?: string;
  };
  onLogout: () => void;
}

export const UserMenu = ({ user, onLogout }: UserMenuProps) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <div className="hidden md:flex items-center">
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
                src={user.profilePicture}
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
                    onLogout();
                  }}
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm font-medium">Logout</span>
                </Button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
