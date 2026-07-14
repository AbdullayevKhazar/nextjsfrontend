"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Settings, BarChart3 } from "lucide-react";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/reports", label: "Reports", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        bottom: "max(18px, env(safe-area-inset-bottom))",
      }}
      className="fixed left-1/2 -translate-x-1/2 z-50 flex items-center justify-between gap-2 rounded-full border border-zinc-200/80 bg-white/90 p-2 backdrop-blur-2xl shadow-[0_12px_35px_rgba(0,0,0,.08)] min-w-[310px]"
    >
      {items.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            className={`
              group
              flex
              h-11
              items-center
              justify-center
              rounded-full
              px-4
              transition-all
              duration-300
              ease-out
              active:scale-95

              ${
                active
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-zinc-500 hover:bg-zinc-100/80"
              }
            `}
          >
            {/* İkon stabil olaraq mərkəzdə qalır */}
            <div className="flex items-center justify-center shrink-0">
              <Icon
                size={19}
                strokeWidth={2.2}
                className="transition-transform duration-300 group-active:scale-90"
              />
            </div>

            {/* Yazı sıçramadan, hamar şəkildə açılır */}
            <span
              className={`
                overflow-hidden
                whitespace-nowrap
                text-[13px]
                font-semibold
                transition-all
                duration-300
                ease-out
                ${
                  active
                    ? "max-w-[100px] ml-2 opacity-100"
                    : "max-w-0 ml-0 opacity-0"
                }
              `}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
