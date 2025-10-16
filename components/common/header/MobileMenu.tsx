"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { navigationLinks } from "@/lib/navigation";

interface MobileMenuProps {
  onLogout: () => void;
}

export const MobileMenu = ({ onLogout }: MobileMenuProps) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isActive = (path: string) => pathname === path;

  return (
    <>
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

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden border-t border-gray-200 mt-2 absolute left-0 right-0 top-16 bg-white/80 backdrop-blur-lg"
          >
            <div className="py-4 space-y-2 px-4">
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
                    <Icon className="!w-5 !h-5" />
                    <span className="font-medium">{label}</span>
                  </Button>
                </Link>
              ))}

              <div className="border-t border-gray-200 my-2" />
              <Button
                variant="ghost"
                className="w-full flex items-center justify-start space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-600 transition-colors h-auto"
                onClick={() => {
                  setIsMenuOpen(false);
                  onLogout();
                }}
              >
                <LogOut className="!w-5 !h-5" />
                <span className="font-medium">Logout</span>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
