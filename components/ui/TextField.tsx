"use client";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function TextField({
  label,
  error,
  className,
  ...props
}: TextFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-[13px] font-medium text-zinc-600">{label}</label>

      <input
        {...props}
        className={`
          h-[54px]
          w-full
          rounded-2xl
          border
          border-zinc-200
          bg-white
          px-4
          text-[15px]
          outline-none
          transition-colors
          focus:border-blue-500
          ${className ?? ""}
        `}
      />

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
