"use client";

import { ReactNode, useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";

import i18n from "@/i18n/client";
import { getLanguage } from "@/lib/cookies";

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeI18n = async () => {
      const savedLanguage = getLanguage();

      if (savedLanguage && i18n.language !== savedLanguage) {
        await i18n.changeLanguage(savedLanguage);
      }

      setIsInitialized(true);
    };

    initializeI18n();
  }, []);

  if (!isInitialized) {
    return null;
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
