"use client";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export default function PrimaryButton({ loading, children, ...props }: Props) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className="
        h-[54px]
        w-full
        rounded-2xl
        bg-blue-600
        text-white
        text-[15px]
        font-semibold
        transition
        active:scale-[0.98]
        disabled:opacity-50
        disabled:pointer-events-none
      "
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
