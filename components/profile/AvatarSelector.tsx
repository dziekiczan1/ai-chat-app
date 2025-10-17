import { motion } from "framer-motion";
import { Check } from "lucide-react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AVAILABLE_AVATARS, PROFILE_CONTENT } from "@/lib/profile";

interface AvatarSelectorProps {
  selectedAvatar: string;
  onSelectAvatar: (avatar: string) => void;
}

export const AvatarSelector = ({
  selectedAvatar,
  onSelectAvatar,
}: AvatarSelectorProps) => {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-gray-700">
        {PROFILE_CONTENT.fields.avatar.label}
      </label>
      <div className="flex flex-wrap gap-3">
        {AVAILABLE_AVATARS.map((avatar) => {
          const isSelected = selectedAvatar === avatar;

          return (
            <motion.button
              key={avatar}
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectAvatar(avatar)}
              className={`relative rounded-full transition-all ${
                isSelected
                  ? "ring-4 ring-blue-500 ring-offset-2"
                  : "ring-2 ring-gray-200 hover:ring-gray-300"
              }`}
            >
              <Avatar className="w-16 h-16">
                <AvatarImage
                  src={avatar}
                  alt="Avatar"
                  className="object-cover"
                />
              </Avatar>

              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white"
                >
                  <Check className="w-4 h-4 text-white" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
