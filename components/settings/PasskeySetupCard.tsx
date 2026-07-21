"use client";

import { useEffect, useState } from "react";
import { Fingerprint } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { startRegistration } from "@simplewebauthn/browser";

import {
  beginPasskeyRegistration,
  completePasskeyRegistration,
} from "@/services/passkey";
import {
  isPlatformAuthenticatorAvailable,
  isWebAuthnSupported,
} from "@/lib/passkey";

export default function PasskeySetupCard() {
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

  const handleEnablePasskey = async () => {
    if (!isSupported) {
      toast.error(t("passkeyUnsupported"));
      return;
    }

    try {
      setIsLoading(true);

      const options = await beginPasskeyRegistration();

      const credential = await startRegistration({
        optionsJSON: options,
      });

      await completePasskeyRegistration(credential);

      toast.success(t("passkeyRegisterSuccess"));
    } catch (error) {
      console.error(error);
      toast.error(t("passkeyRegisterFailed"));
    } finally {
      setIsLoading(false);
    }
  };

  if (!isSupported || !isAvailable) {
    return null;
  }

  return (
    <div className="rounded-3xl border border-zinc-100 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
          <Fingerprint size={20} />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-zinc-900">
            {t("passkeySectionTitle")}
          </h3>

          <p className="text-xs text-zinc-500">
            {t("passkeySectionDescription")}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleEnablePasskey}
        disabled={isLoading}
        className="mt-4 h-12 w-full rounded-2xl bg-zinc-900 text-sm font-semibold text-white transition active:scale-[0.98] disabled:opacity-60"
      >
        {isLoading ? t("passkeyRegistering") : t("passkeyRegister")}
      </button>
    </div>
  );
}
