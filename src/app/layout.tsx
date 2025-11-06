// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "sweetalert2/dist/sweetalert2.min.css";
import SessionProvider from "@/components/providers/SessionProvider";
import ReduxProvider from "@/components/providers/ReduxProvider";
import AuthHydrator from "@/components/providers/AuthHydrator";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Instagram by J. Sansó",
  description: "Challenge IT-ROCK",
  icons: {
    icon: [
      { url: "/icons/instagram.svg", type: "image/svg+xml" },
      { url: "/icons/instagram-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/icons/instagram-180.png",
  },
  themeColor: "#000000",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-dvh bg-background text-foreground`}>
        <SessionProvider>
          <ReduxProvider>
            <AuthHydrator />
            {children}
          </ReduxProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
