"use client";

import { useTranslation as useTranslationI18n } from "react-i18next";
import { useCallback } from "react";

import { type Language } from "./settings";
import i18n from "./client";
import { getLanguage, setLanguage } from "@/lib/cookies";

export function useTranslation(namespace?: string) {
  return useTranslationI18n(namespace);
}

export function useLanguage() {
  const changeLanguage = useCallback(async (language: Language) => {
    await i18n.changeLanguage(language);
    setLanguage(language);
  }, []);

  const currentLanguage = getLanguage() as Language;

  return {
    language: currentLanguage || i18n.language,
    setLanguage: changeLanguage,
    i18n,
  };
}
