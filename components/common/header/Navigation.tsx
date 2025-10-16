"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { navigationLinks } from "@/lib/navigation";

export const Navigation = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="hidden md:flex items-center space-x-1">
      {navigationLinks.map(({ path, label, icon: Icon }) => (
        <Link key={path} href={path}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant={isActive(path) ? "default" : "ghost"}
              size="lg"
              className={`relative rounded-lg transition-all duration-200 ${
                isActive(path)
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Icon className="w-4 h-4" />
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
  );
};
