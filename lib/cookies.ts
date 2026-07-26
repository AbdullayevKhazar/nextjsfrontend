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

export function getAccessToken(): string | null {
  if (typeof document === "undefined") return null;
  const cookies = document.cookie.split(";");
  const tokenCookie = cookies.find((c) => c.trim().startsWith("access_token="));
  if (!tokenCookie) return null;
  return tokenCookie.split("=")[1];
}

export function getRefreshToken(): string | null {
  if (typeof document === "undefined") return null;
  const cookies = document.cookie.split(";");
  const tokenCookie = cookies.find((c) => c.trim().startsWith("refresh_token="));
  if (!tokenCookie) return null;
  return tokenCookie.split("=")[1];
}

export function setTokens(accessToken: string, refreshToken: string): void {
  if (typeof document === "undefined") return;
  // Set tokens to expire in some days or match backend
  document.cookie = `access_token=${accessToken}; path=/; max-age=${15 * 60}; SameSite=Lax`; // 15 mins
  document.cookie = `refresh_token=${refreshToken}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`; // 7 days
}

export function removeTokens(): void {
  if (typeof document === "undefined") return;
  document.cookie = "access_token=; path=/; max-age=0; SameSite=Lax";
  document.cookie = "refresh_token=; path=/; max-age=0; SameSite=Lax";
}
