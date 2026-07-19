"use client";

import { ReactNode, useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";

import i18n from "@/i18n/client";
import { defaultLanguage } from "@/i18n/settings";
import { getLanguage } from "@/lib/cookies";

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const initializeI18n = async () => {
      try {
        const savedLanguage = getLanguage();
        const nextLanguage = savedLanguage ?? defaultLanguage;

        if (i18n.language !== nextLanguage) {
          await i18n.changeLanguage(nextLanguage);
        }
      } catch (error) {
        console.error("Failed to initialize i18n", error);

        if (i18n.language !== defaultLanguage) {
          await i18n.changeLanguage(defaultLanguage);
        }
      } finally {
        if (isMounted) {
          setIsInitialized(true);
        }
      }
    };

    void initializeI18n();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!isInitialized) {
    return null;
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
