import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchInput({ value, onChange }: SearchInputProps) {
  const { t } = useTranslation("customers");
  return (
    <div
      className="
        flex-1
        flex
        items-center
        gap-3
        rounded-[18px]
        border
        border-zinc-200 dark:border-zinc-800
        bg-white dark:bg-zinc-900
        px-4
        h-[44px]
      "
    >
      <Search size={18} className="text-zinc-400" />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t("searchPlaceholder")}
        className="
          flex-1
          bg-transparent
          outline-none
          text-[15px]
          placeholder:text-zinc-400
        "
      />
    </div>
  );
}
