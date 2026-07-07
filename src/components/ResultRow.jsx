"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { statusStyles } from "../lib/status";
import StatusBadge from "./StatusBadge";

export default function ResultRow({ item, isLast }) {
  const [open, setOpen] = useState(false);
  const s = statusStyles[item.status];

  return (
    <div className={`${!isLast ? "border-b border-[#E6F1F0]" : ""}`}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-4 py-4 px-1 sm:px-2 text-right hover:bg-[#F7FCFB] transition-colors rounded-lg"
      >
        <span className={`shrink-0 w-2.5 h-2.5 rounded-full ${s.dot}`} />
        <span className="flex-1 min-w-0">
          <span className="block text-sm sm:text-base font-bold text-[#0B2B2E]">
            {item.name}
          </span>
          <span className="block text-xs text-[#5C7A7C] mt-0.5">
            بازه طبیعی: <span style={{ fontFamily: "var(--font-mono)" }}>{item.range}</span> {item.unit}
          </span>
        </span>
        <span
          className="shrink-0 text-base sm:text-lg font-extrabold text-[#0B2B2E] tabular-nums"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {item.value}
          <span className="text-xs font-medium text-[#5C7A7C] mr-1">{item.unit}</span>
        </span>
        <StatusBadge status={item.status} />
        <ChevronDown
          className={`w-4 h-4 text-[#5C7A7C] shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="pb-4 px-1 sm:px-2 -mt-1">
          <div className={`rounded-xl border ${s.border} ${s.bg} p-3.5 text-sm text-[#0B2B2E]/80 leading-7`}>
            {item.note}
          </div>
        </div>
      )}
    </div>
  );
}
