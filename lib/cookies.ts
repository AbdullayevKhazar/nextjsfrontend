import { type Language } from "@/i18n/settings";

const LANGUAGE_COOKIE_NAME = "language";

export function getLanguage(): Language | null {
  if (typeof document === "undefined") {
    return null;
  }

  const cookies = document.cookie.split(";");
  const languageCookie = cookies.find((cookie) =>
    cookie.trim().startsWith(`${LANGUAGE_COOKIE_NAME}=`),
  );

  if (!languageCookie) {
    return null;
  }

  return languageCookie.split("=")[1] as Language;
}

export function setLanguage(language: Language): void {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${LANGUAGE_COOKIE_NAME}=${language}; path=/; max-age=${365 * 24 * 60 * 60}`;
}

export function removeLanguage(): void {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${LANGUAGE_COOKIE_NAME}=; path=/; max-age=0`;
}
