"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

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
import { ROUTES } from "@/lib/routes";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { authState, login } = useAuth();
  const isAuth = authState.isAuthenticated;
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isAuth) {
      router.replace(ROUTES.chat);
    }
  }, [isAuth, router]);

  const onSubmit = (data: LoginFormValues) => {
    const success = login(data.email, data.password);
    if (success) {
      router.push(ROUTES.chat);
    } else {
      form.setError("email", { message: "Nieprawidłowe dane logowania" });
      form.setError("password", { message: "Nieprawidłowe dane logowania" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Zaloguj się do AI Chat App
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hasło</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Hasło" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Zaloguj się
            </Button>
          </form>
        </Form>

        <div className="mt-4 text-sm text-gray-600 text-center">
          <p>Testowe dane logowania:</p>
          <p>Email: test@example.com</p>
          <p>Hasło: password123</p>
        </div>
      </div>
    </div>
  );
}
