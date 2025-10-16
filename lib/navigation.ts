import { LucideIcon, MessageSquare, User } from "lucide-react";
import { ROUTES } from "@/lib/routes";

export interface NavigationLink {
  path: string;
  label: string;
  icon: LucideIcon;
}

export const navigationLinks: NavigationLink[] = [
  { path: ROUTES.chat, label: "Chat", icon: MessageSquare },
  { path: ROUTES.profile, label: "Profil", icon: User },
];
