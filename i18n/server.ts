import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

import { defaultLanguage, defaultNamespace } from "./settings";

export async function initI18n(lng = defaultLanguage, ns = defaultNamespace) {
  const i18n = createInstance();

  await i18n
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`../locales/${language}/${namespace}.json`),
      ),
    )
    .init({
      lng,
      fallbackLng: defaultLanguage,
      defaultNS: defaultNamespace,
      ns,
    });

  return i18n;
}
