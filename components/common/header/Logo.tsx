import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import { ROUTES } from "@/lib/routes";

export const Logo = () => {
  return (
    <Link href={ROUTES.chat} className="flex items-center space-x-3 group">
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
  );
};
