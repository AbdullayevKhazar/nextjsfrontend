"use client";

interface Props {
  onBorrow: () => void;
  onPayment: () => void;
}

export default function CustomerActions({ onBorrow, onPayment }: Props) {
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
        Borrow
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
        Pay
      </button>
    </div>
  );
}
