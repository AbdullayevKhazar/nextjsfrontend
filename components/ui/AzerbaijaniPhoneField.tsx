"use client";

import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

import {
  buildAzerbaijaniPhoneInputValue,
  getAzerbaijaniPhoneLocalDigits,
} from "@/lib/phone";

interface AzerbaijaniPhoneFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  error?: string;
  placeholder?: string;
}

export default function AzerbaijaniPhoneField<
  TFieldValues extends FieldValues,
>({
  control,
  name,
  label,
  error,
  placeholder = "50 123 45 67",
}: AzerbaijaniPhoneFieldProps<TFieldValues>) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 ml-1">
        {label}
      </label>

      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          const digits = getAzerbaijaniPhoneLocalDigits(
            buildAzerbaijaniPhoneInputValue(String(field.value ?? "")),
          );

          return (
            <div
              className={`
                flex h-[54px] items-center overflow-hidden rounded-2xl border px-4 transition-all duration-200
                bg-zinc-50 dark:bg-zinc-900/50
                ${
                  error
                    ? "border-red-500 ring-2 ring-red-500/20"
                    : "border-zinc-200 dark:border-zinc-800 focus-within:bg-white dark:focus-within:bg-zinc-900 focus-within:border-zinc-400 dark:focus-within:border-zinc-600 focus-within:ring-2 focus-within:ring-zinc-400/20 dark:focus-within:ring-zinc-600/20"
                }
              `}
            >
              <span className="shrink-0 pr-2 text-sm font-semibold text-zinc-400 dark:text-zinc-500 select-none">
                +994
              </span>
              <input
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                value={digits}
                onChange={(event) => {
                  const nextDigits = event.target.value
                    .replace(/\D/g, "")
                    .slice(0, 9);
                  field.onChange(nextDigits ? `+994${nextDigits}` : "");
                }}
                onBlur={field.onBlur}
                placeholder={placeholder}
                className="min-w-0 flex-1 border-0 bg-transparent p-0 text-sm font-medium text-zinc-900 dark:text-zinc-100 outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
              />
            </div>
          );
        }}
      />

      {error && (
        <p className="text-xs font-semibold text-red-500 dark:text-red-400 ml-1">
          {error}
        </p>
      )}
    </div>
  );
}
