"use client";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function Backdrop({ open, onClose }: Props) {
  return (
    <div
      onClick={onClose}
      className={`
        fixed
        inset-0
        z-40

        bg-black/25
        backdrop-blur-sm

        transition-opacity
        duration-200

        ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }
      `}
    />
  );
}
