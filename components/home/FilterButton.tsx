import { SlidersHorizontal } from "lucide-react";

interface Props {
  onClick: () => void;
}

export default function FilterButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="flex-1 flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-200 bg-white"
    >
      <SlidersHorizontal size={18} />
    </button>
  );
}
