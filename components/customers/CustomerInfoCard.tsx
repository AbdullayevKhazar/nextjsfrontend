"use client";

import { MapPin, MessageCircle, Phone, Share2, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  formatAzerbaijaniPhone,
  getAzerbaijaniPhoneDigits,
  normalizeAzerbaijaniPhone,
} from "@/lib/phone";

interface Props {
  fullName: string;
  phone: string;
  location?: string;
  publicToken: string;
  readonly?: boolean;
  lastReminderSentAt?: string | null;
}

export default function CustomerInfoCard({
  fullName,
  phone,
  location,
  publicToken,
  readonly,
  lastReminderSentAt,
}: Props) {
  const { t } = useTranslation(["debt", "customers"]);
  const normalizedPhone = normalizeAzerbaijaniPhone(phone);
  const phoneDigits = getAzerbaijaniPhoneDigits(normalizedPhone);

  const formattedPhone = formatAzerbaijaniPhone(normalizedPhone);

  const formattedLocation = location
    ?.split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  const openWhatsapp = () => {
    window.open(`https://wa.me/${phoneDigits}`, "_blank");
  };

  const shareWhatsapp = () => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const publicUrl = `${origin}/public/${publicToken}`;
    const message = `Salam ${fullName}.\n\nBorc məlumatınızı buradan izləyə bilərsiniz:\n\n${publicUrl}`;
    window.open(
      `https://wa.me/${phoneDigits}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <div className="w-full max-w-md mx-auto p-5">
      <div className="flex items-center gap-3.5 mb-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 shadow-inner">
          <User size={22} strokeWidth={1.8} />
        </div>
        <div className="overflow-hidden">
          <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-100 tracking-tight truncate">
            {fullName}
          </h3>
          {location && (
            <div className="flex items-center gap-1 text-xs text-zinc-400 font-medium mt-0.5">
              <MapPin size={13} className="shrink-0 text-zinc-400" />
              <span className="truncate">{formattedLocation}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2.5 px-3.5 py-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-100/60 dark:border-zinc-800/60 mb-5">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
          <Phone size={14} strokeWidth={2.2} />
        </div>
        <a
          href={normalizedPhone ? `tel:${normalizedPhone}` : `tel:${phoneDigits}`}
          className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition underline-offset-4 hover:underline"
        >
          {formattedPhone}
        </a>
      </div>

      {!readonly && (
        <div className="space-y-2.5">
          {lastReminderSentAt && (
            <p className="text-xs text-zinc-400 text-center">
              Son xatırlatma:{" "}
              {new Date(lastReminderSentAt).toLocaleDateString("az-AZ")}
            </p>
          )}

          <button
            onClick={openWhatsapp}
            className="flex w-full h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-all active:scale-[0.98] shadow-sm shadow-emerald-600/10"
          >
            <MessageCircle size={18} strokeWidth={2.2} />
            {t("whatsappContact", { ns: "debt" })}
          </button>

          <button
            onClick={shareWhatsapp}
            className="flex w-full h-11 items-center justify-center gap-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold text-sm transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-[0.98]"
          >
            <Share2 size={18} strokeWidth={2.2} />
            {t("shareLink", { ns: "debt" })}
          </button>
        </div>
      )}
    </div>
  );
}
