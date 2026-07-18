"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";

import { defaultLanguage, defaultNamespace } from "./settings";

i18n
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`../locales/${language}/${namespace}.json`),
    ),
  )
  .init({
    lng: defaultLanguage,
    fallbackLng: defaultLanguage,
    defaultNS: defaultNamespace,
  });

export default i18n;
