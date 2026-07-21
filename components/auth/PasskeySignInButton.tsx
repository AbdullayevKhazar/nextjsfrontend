"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Fingerprint } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { startAuthentication } from "@simplewebauthn/browser";

import { beginPasskeyLogin, completePasskeyLogin } from "@/services/passkey";
import {
  isPlatformAuthenticatorAvailable,
  isWebAuthnSupported,
} from "@/lib/passkey";

export default function PasskeySignInButton() {
  const router = useRouter();
  const { t } = useTranslation("auth");

  const [isSupported, setIsSupported] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    const checkSupport = async () => {
      const supported = isWebAuthnSupported();
      const available = supported
        ? await isPlatformAuthenticatorAvailable()
        : false;

      if (mounted) {
        setIsSupported(supported);
        setIsAvailable(available);
      }
    };

    void checkSupport();

    return () => {
      mounted = false;
    };
  }, []);

  const handlePasskeySignIn = async () => {
    if (!isSupported) {
      toast.error(t("passkeyUnsupported"));
      return;
    }

    try {
      setIsLoading(true);

      const options = await beginPasskeyLogin();

      const credential = await startAuthentication({
        optionsJSON: options,
      });

      await completePasskeyLogin(credential);

      toast.success(t("passkeyLoginSuccess"));

      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        toast.error(`${error.name}: ${error.message}`);
      } else {
        toast.error(t("passkeyLoginFailed"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isSupported || !isAvailable) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={handlePasskeySignIn}
      disabled={isLoading}
      className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-white text-sm font-semibold text-zinc-800 transition active:scale-[0.98] disabled:opacity-60"
    >
      <Fingerprint size={18} />
      {isLoading ? t("passkeySigningIn") : t("passkeySignIn")}
    </button>
  );
}
