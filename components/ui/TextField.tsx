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
      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 ml-1">
        {label}
      </label>

      <input
        {...props}
        className={`
          h-[54px]
          w-full
          rounded-2xl
          border
          px-4
          text-sm
          font-medium
          outline-none
          transition-all
          duration-200
          bg-zinc-50 dark:bg-zinc-900/50
          text-zinc-900 dark:text-zinc-100
          placeholder:text-zinc-400 dark:placeholder:text-zinc-600
          ${
            error
              ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
              : "border-zinc-200 dark:border-zinc-800 focus:bg-white dark:focus:bg-zinc-900 focus:border-zinc-400 dark:focus:border-zinc-600 focus:ring-2 focus:ring-zinc-400/20 dark:focus:ring-zinc-600/20"
          }
          ${className ?? ""}
        `}
      />

      {error && (
        <p className="text-xs font-semibold text-red-500 dark:text-red-400 ml-1">
          {error}
        </p>
      )}
    </div>
  );
}
