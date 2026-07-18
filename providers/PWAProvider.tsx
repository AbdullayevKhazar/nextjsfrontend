"use client";

import { useEffect, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function PWAProvider({ children }: Props) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js");
    }
  }, []);

  return <>{children}</>;
}
