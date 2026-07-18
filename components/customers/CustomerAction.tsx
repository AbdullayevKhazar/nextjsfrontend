"use client";

import { useTranslation } from "react-i18next";

interface Props {
  onBorrow: () => void;
  onPayment: () => void;
}

export default function CustomerActions({ onBorrow, onPayment }: Props) {
  const { t } = useTranslation("transactions");
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        onClick={onBorrow}
        className="
          h-14
          rounded-2xl
          bg-red-500
          text-white
          font-semibold
          transition
          active:scale-95
        "
      >
        {t("borrow")}
      </button>

      <button
        onClick={onPayment}
        className="
          h-14
          rounded-2xl
          bg-green-600
          text-white
          font-semibold
          transition
          active:scale-95
        "
      >
        {t("pay")}
      </button>
    </div>
  );
}
