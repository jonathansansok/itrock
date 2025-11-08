import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "sweetalert2/dist/sweetalert2.min.css";
import SessionProvider from "@/components/providers/SessionProvider";
import ReduxProvider from "@/components/providers/ReduxProvider";
import AuthHydrator from "@/components/providers/AuthHydrator";
import AppFooter from "@/components/organisms/AppFooter";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Instagram by J. Sansó",
  description: "Challenge IT-ROCK",
  icons: {
    icon: "/favicon.ico", 
  },
};
export const viewport: Viewport = { themeColor: "#000000" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-dvh h-full bg-background text-foreground flex flex-col`}
      >
        <SessionProvider>
          <ReduxProvider>
            <AuthHydrator />
            <main className="flex-1 flex flex-col">{children}</main>
            <AppFooter />
          </ReduxProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
