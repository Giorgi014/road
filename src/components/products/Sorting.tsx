import { OPTIONS } from "@/data/content";
import type { SortingProps } from "@/types";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export const Sorting = ({ value, onChange }: SortingProps) => {
  const [open, setOpen] = useState(false);

  const openSorting = () => {
    setOpen(!open);
  };

  return (
    <article className="relative w-50">
      <button
        type="button"
        className="flex justify-between items-center text-start w-full h-10 pl-2.5 pr-2.5 border rounded-md border-ink-400/40 bg-ink-800/60 backdrop-blur-sm transition-all duration-300 hover:border-electric-400/60 hover:shadow-[0_0_45px_-12px_var(--blue-glow)] cursor-pointer"
        onClick={() => openSorting()}
      >
        {value.label}
        <ChevronDown />
      </button>
      {open ? (
        <ul className="absolute z-20 mt-2 w-full overflow-hidden rounded-md border border-ink-400/40 bg-ink-800/95 backdrop-blur-md shadow-(--shadow-soft)">
          {OPTIONS.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={`w-full px-4 py-2.5 text-left font-sans text-sm transition-colors duration-200 hover:bg-electric-400/10 cursor-pointer ${
                  option.value === value.value
                    ? "text-electric-400"
                    : "text-ink-dim"
                }`}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}
    </article>
  );
};
