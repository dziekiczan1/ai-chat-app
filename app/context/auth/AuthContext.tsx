"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { MOCK_USER, MOCK_PASSWORD } from "./mockData";
import { AuthContextType, AuthState } from "./types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  });
  const router = useRouter();

  useEffect(() => {
    const storedState = localStorage.getItem("authState");
    if (storedState) {
      setAuthState(JSON.parse(storedState));
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    if (email === MOCK_USER.email && password === MOCK_PASSWORD) {
      const newAuthState = {
        isAuthenticated: true,
        user: MOCK_USER,
      };

      setAuthState(newAuthState);
      localStorage.setItem("authState", JSON.stringify(newAuthState));
      return true;
    }
    return false;
  };

  const logout = () => {
    setAuthState({ isAuthenticated: false, user: null });
    localStorage.removeItem("authState");
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
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
