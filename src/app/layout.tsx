import { ClerkProvider } from "@clerk/nextjs";
import "@/styles/globals.css";

import { Open_Sans } from "next/font/google";
import { type Metadata } from "next";

import { cn } from "@/lib/utils";
import { AppProvider } from "@/providers/app-provider";

export const metadata: Metadata = {
  title: "TweetRPC",
  description: "Share everything you're thinking in TweetRPC",
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
    },
  ],
};

const openSans = Open_Sans({
  variable: "--font-open-sans",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={cn(openSans.className)}>
        <body>
          <AppProvider>{children}</AppProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
