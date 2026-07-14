import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div
      className="
        flex-1
        flex
        items-center
        gap-3
        rounded-[18px]
        border
        border-zinc-200
        bg-white
        px-4
        h-[44px]
      "
    >
      <Search size={18} className="text-zinc-400" />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search"
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
