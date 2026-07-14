"use client";

import { MapPin, MessageCircle, Phone, Share2, User } from "lucide-react";

interface Props {
  fullName: string;
  phone: string;
  location?: string;
  publicToken: string;
  readonly?: boolean;
}

export default function CustomerInfoCard({
  fullName,
  phone,
  location,
  publicToken,
  readonly,
}: Props) {
  const phoneDigits = phone.replace(/\D/g, "");

  // Ekran üçün gözəl görünən format: +994 XX XXX XX XX
  const formattedPhone =
    phoneDigits.length === 12 && phoneDigits.startsWith("994")
      ? `+994 ${phoneDigits.slice(3, 5)} ${phoneDigits.slice(5, 8)} ${phoneDigits.slice(8, 10)} ${phoneDigits.slice(10)}`
      : phone;

  const formattedLocation = location
    ?.split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  const openWhatsapp = () => {
    window.open(`https://wa.me/${phoneDigits}`, "_blank");
  };

  const shareWhatsapp = () => {
    // SSR (Server Side Rendering) xətası olmasın deyə window burda oxunur
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
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-zinc-50 border border-zinc-100 text-zinc-600 shadow-inner">
          <User size={22} strokeWidth={1.8} />
        </div>
        <div className="overflow-hidden">
          {/* Ad biraz böyük və qabarıq */}
          <h3 className="text-lg font-bold text-zinc-800 tracking-tight truncate">
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

      {/* Orta hissə: İkonlu Telefon nömrəsi qutusu */}
      <div className="flex items-center gap-2.5 px-3.5 py-3 bg-zinc-50 rounded-xl border border-zinc-100/60 mb-5">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500">
          <Phone size={14} strokeWidth={2.2} />
        </div>
        {/* tel: linkində boşluqlar silindi ki, mobil cihazlarda problemsiz yığsın */}
        <a
          href={`tel:${phoneDigits}`}
          className="text-sm font-semibold text-zinc-700 hover:text-zinc-900 transition underline-offset-4 hover:underline"
        >
          {formattedPhone}
        </a>
      </div>

      {/* Düymələr bloku (Alt-alta düzülüş) */}
      {!readonly && (
        <div className="space-y-2.5">
          {/* Yaşıl WhatsApp düyməsi */}
          <button
            onClick={openWhatsapp}
            className="flex w-full h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-all active:scale-[0.98] shadow-sm shadow-emerald-600/10"
          >
            <MessageCircle size={18} strokeWidth={2.2} />
            WhatsApp ilə əlaqə
          </button>

          {/* Altda Linki Paylaş düyməsi */}
          <button
            onClick={shareWhatsapp}
            className="flex w-full h-11 items-center justify-center gap-2 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-700 font-semibold text-sm transition-all hover:bg-zinc-100 active:scale-[0.98]"
          >
            <Share2 size={18} strokeWidth={2.2} />
            Linki Paylaş
          </button>
        </div>
      )}
    </div>
  );
}
