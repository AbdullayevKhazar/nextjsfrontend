export const languages = ["az", "en", "ru"] as const;

export type Language = (typeof languages)[number];

export const defaultLanguage: Language = "az";

export const defaultNamespace = "common";
