"use client";

import { Toaster } from "@/app/_components/ui/toaster";
import { TRPCReactProvider } from "@/trpc/react";
import { useEffect, useState, type ReactNode } from "react";

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <TRPCReactProvider>
      {children}
      {isClient && <Toaster />}
    </TRPCReactProvider>
  );
}
