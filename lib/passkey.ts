export function isWebAuthnSupported() {
  return (
    typeof window !== "undefined" &&
    "PublicKeyCredential" in window &&
    "credentials" in navigator
  );
}

export async function isPlatformAuthenticatorAvailable() {
  if (
    typeof window === "undefined" ||
    !("PublicKeyCredential" in window) ||
    typeof PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable !==
      "function"
  ) {
    return false;
  }

  try {
    return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
  } catch {
    return false;
  }
}
