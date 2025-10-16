"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { AuthContextType, AuthState, User } from "./types";
import { MOCK_PASSWORD, MOCK_USER } from "@/lib/userMock";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEYS = {
  AUTH_STATE: "authState",
  USER_DATA: "userData",
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedState = localStorage.getItem(STORAGE_KEYS.AUTH_STATE);
    if (storedState) {
      setAuthState(JSON.parse(storedState));
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string): boolean => {
    const storedUserData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    const savedUser: User | null = storedUserData
      ? JSON.parse(storedUserData)
      : null;

    const correctEmail = savedUser?.email || MOCK_USER.email;
    const isValidCredentials =
      email === correctEmail && password === MOCK_PASSWORD;

    if (isValidCredentials) {
      const userToLogin = savedUser || MOCK_USER;
      const newAuthState = {
        isAuthenticated: true,
        user: userToLogin,
      };

      setAuthState(newAuthState);
      localStorage.setItem(
        STORAGE_KEYS.AUTH_STATE,
        JSON.stringify(newAuthState),
      );

      if (!savedUser) {
        localStorage.setItem(
          STORAGE_KEYS.USER_DATA,
          JSON.stringify(userToLogin),
        );
      }

      return true;
    }

    return false;
  };

  const logout = () => {
    setAuthState({ isAuthenticated: false, user: null });
    localStorage.removeItem(STORAGE_KEYS.AUTH_STATE);
    router.push("/");
  };

  const updateUser = (userData: Partial<User>) => {
    const updatedUser = authState.user
      ? { ...authState.user, ...userData }
      : null;

    const updatedAuthState = {
      ...authState,
      user: updatedUser,
    };

    setAuthState(updatedAuthState);
    localStorage.setItem(
      STORAGE_KEYS.AUTH_STATE,
      JSON.stringify(updatedAuthState),
    );

    if (updatedUser) {
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{ authState, login, logout, updateUser, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Hook useAuth must be used within an AuthProvider");
  }
  return context;
};
