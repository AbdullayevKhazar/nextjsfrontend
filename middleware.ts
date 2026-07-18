import { type NextRequest, NextResponse } from "next/server";

import { defaultLanguage, languages, type Language } from "./i18n/settings";

export function middleware(request: NextRequest) {
  const language = request.cookies.get("language")?.value as
    | Language
    | undefined;
  const response = NextResponse.next();

  if (!language || !languages.includes(language)) {
    response.cookies.set("language", defaultLanguage, {
      path: "/",
      maxAge: 365 * 24 * 60 * 60,
    });
  }

  return response;
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
