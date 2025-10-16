"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Info, Copy, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AUTH_CONTENT } from "@/lib/auth";

interface Credential {
  label: string;
  value: string;
}

const credentials: Credential[] = [
  {
    label: AUTH_CONTENT.testCredentials.email.label,
    value: AUTH_CONTENT.testCredentials.email.value,
  },
  {
    label: AUTH_CONTENT.testCredentials.password.label,
    value: AUTH_CONTENT.testCredentials.password.value,
  },
];

export const TestCredentials = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200/50"
    >
      <div className="flex items-center space-x-2 mb-3">
        <Info className="w-4 h-4 text-blue-600" />
        <p className="text-sm font-semibold text-blue-900">
          {AUTH_CONTENT.testCredentials.title}
        </p>
      </div>

      <div className="space-y-2">
        {credentials.map(({ label, value }) => (
          <div
            key={label}
            className="flex items-center justify-between bg-white/60 backdrop-blur-sm px-3 py-2 rounded-lg"
          >
            <div className="flex-1">
              <p className="text-xs text-gray-600">{label}</p>
              <p className="text-sm font-mono font-medium text-gray-800">
                {value}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(value, label)}
              className="ml-2 h-8 w-8 p-0"
            >
              {copiedField === label ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4 text-gray-600" />
              )}
            </Button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
