"use client";

import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

import { buildAzerbaijaniPhoneInputValue, getAzerbaijaniPhoneLocalDigits } from "@/lib/phone";

interface AzerbaijaniPhoneFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  error?: string;
  placeholder?: string;
}

export default function AzerbaijaniPhoneField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  error,
  placeholder = "50 123 45 67",
}: AzerbaijaniPhoneFieldProps<TFieldValues>) {
  return (
    <div className="space-y-2">
      <label className="mb-2 block text-sm font-medium text-zinc-600">
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
                flex h-14 items-center overflow-hidden rounded-2xl border bg-white px-4 transition
                ${error ? "border-red-300" : "border-zinc-200 focus-within:border-blue-500"}
              `}
            >
              <span className="shrink-0 pr-2 text-[15px] font-medium text-zinc-500">
                +994
              </span>
              <input
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                value={digits}
                onChange={(event) => {
                  const nextDigits = event.target.value.replace(/\D/g, "").slice(0, 9);
                  field.onChange(nextDigits ? `+994${nextDigits}` : "");
                }}
                onBlur={field.onBlur}
                placeholder={placeholder}
                className="min-w-0 flex-1 border-0 bg-transparent p-0 text-[15px] outline-none placeholder:text-zinc-400"
              />
            </div>
          );
        }}
      />

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
