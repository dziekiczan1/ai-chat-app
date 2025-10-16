"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { User, Mail, Save, CheckCircle } from "lucide-react";

import { useAuth } from "@/app/context/auth/AuthContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AvatarSelector } from "./AvatarSelector";
import { ROUTES } from "@/lib/routes";
import { PROFILE_CONTENT } from "@/lib/profile";

const profileSchema = z.object({
  name: z
    .string()
    .min(1, PROFILE_CONTENT.errors.nameRequired)
    .min(2, PROFILE_CONTENT.errors.nameMinLength),
  email: z
    .string()
    .min(1, PROFILE_CONTENT.errors.emailRequired)
    .email(PROFILE_CONTENT.errors.emailInvalid),
  profilePicture: z.string(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export const ProfileForm = () => {
  const { authState, updateUser } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: authState.user?.name || "",
      email: authState.user?.email || "",
      profilePicture: authState.user?.profilePicture,
    },
  });

  const onSubmit = (data: ProfileFormValues) => {
    setIsLoading(true);

    setTimeout(() => {
      updateUser(data);
      setIsLoading(false);
      setShowSuccess(true);

      setTimeout(() => setShowSuccess(false), 3000);
    }, 500);
  };

  const handleCancel = () => {
    form.reset();
    router.push(ROUTES.chat);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-3"
        >
          <CheckCircle className="w-5 h-5 text-green-600" />
          <p className="text-sm font-medium text-green-800">
            {PROFILE_CONTENT.messages.success}
          </p>
        </motion.div>
      )}

      <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-200/50">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            {PROFILE_CONTENT.title}
          </h1>
          <p className="text-sm text-gray-500">{PROFILE_CONTENT.subtitle}</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    {PROFILE_CONTENT.fields.name.label}
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        placeholder={PROFILE_CONTENT.fields.name.placeholder}
                        className="pl-10 h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                        disabled={isLoading}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    {PROFILE_CONTENT.fields.email.label}
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="email"
                        placeholder={PROFILE_CONTENT.fields.email.placeholder}
                        className="pl-10 h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                        disabled={isLoading}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1"
              >
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    PROFILE_CONTENT.buttons.saving
                  ) : (
                    <>
                      <Save className="!w-5 !h-5" />
                      {PROFILE_CONTENT.buttons.save}
                    </>
                  )}
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="h-12 px-6"
                  disabled={isLoading}
                >
                  {PROFILE_CONTENT.buttons.cancel}
                </Button>
              </motion.div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
