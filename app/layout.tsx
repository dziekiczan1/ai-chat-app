import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "./globals.css";
import { AuthProvider } from "@/app/context/auth/AuthContext";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "AI Chat Application",
  description: "A modern AI chat application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
