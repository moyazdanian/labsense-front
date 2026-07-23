"use client";

import { useState } from "react";
import Link from "next/link";
import { FileText, FlaskConical } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useAnalysisHistory } from "@/lib/hooks/useAnalysis";
import { statusStyles } from "@/lib/status";

// وضعیت خود تحلیل (موفق/ناموفق/در انتظار) — جدا از overallStatus نتیجه
const analysisStatusStyles = {
  completed: {
    label: "موفق",
    bg: "bg-[#EAF8F1]",
    text: "text-[#1F9D6B]",
    border: "border-[#CDEEDD]",
  },
  failed: {
    label: "ناموفق",
    bg: "bg-[#FBEAEA]",
    text: "text-[#C13434]",
    border: "border-[#F4CFCF]",
  },
  pending: {
    label: "در انتظار",
    bg: "bg-[#FBF3DF]",
    text: "text-[#B5800F]",
    border: "border-[#F2E1B6]",
  },
};

const FILTERS = [
  { id: "all", label: "همه" },
  { id: "pending", label: "در حال تحلیل" },
  { id: "completed", label: "موفق" },
  { id: "failed", label: "ناموفق" },
];

/*
  AnalysesTab
  ----------------------------
  لیست تحلیل‌های کاربر در صفحه پروفایل — با فیلتر موفق/ناموفق.
  تحلیل‌های موفق به صفحه نتیجه لینک می‌شوند؛ ناموفق‌ها کلیک‌پذیر نیستند.
*/
export default function AnalysesTab() {
  const { data: analyses, isLoading } = useAnalysisHistory();

  const [filter, setFilter] = useState("all");

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-[72px] rounded-2xl bg-[#E0F1EF]/60" />
        ))}
      </div>
    );
  }

  const items = (analyses || []).filter((a) =>
    filter === "all" ? true : a.status === filter,
  );

  return (
    <div className="space-y-4 px-1.5 *:sm:px-0 max-w-2xl mx-auto">
      {/* فیلتر وضعیت */}
      <div className="flex items-center gap-1.5">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
              filter === f.id
                ? "bg-[#0E7C7B] text-white"
                : "bg-white border border-[#E0F1EF] text-[#5C7A7C] hover:text-[#0E7C7B] hover:border-[#0E7C7B]/40"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {!items.length ? (
        <div className="rounded-2xl border border-[#E0F1EF] bg-white py-14 text-center">
          <span className="mx-auto w-12 h-12 rounded-full bg-[#0E7C7B]/10 flex items-center justify-center">
            <FlaskConical className="w-5 h-5 text-[#0E7C7B]" />
          </span>
          <p className="mt-3 text-sm text-[#5C7A7C]">
            {filter === "all"
              ? "هنوز هیچ آزمایشی تحلیل نکرده‌اید."
              : "تحلیلی با این وضعیت یافت نشد."}
          </p>
          {filter === "all" && (
            <Link
              href="/"
              className="inline-block mt-4 text-xs text-[#0E7C7B] font-bold underline underline-offset-4 decoration-[#0E7C7B]/30 hover:decoration-[#0E7C7B]"
            >
              شروع اولین تحلیل
            </Link>
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-[#E0F1EF] bg-white divide-y divide-[#E0F1EF] overflow-hidden">
          {items.map((item) => {
            const st =
              analysisStatusStyles[item.status] || analysisStatusStyles.pending;
            const overall = statusStyles[item.overallStatus];
            const clickable = item.status === "completed";

            const row = (
              <div
                className={`flex items-center gap-3 px-4 py-3.5 ${
                  clickable
                    ? "hover:bg-[#F4FBFA] transition-colors"
                    : "opacity-75"
                }`}
              >
                <span className="w-10 h-10 rounded-xl bg-[#0E7C7B]/10 flex items-center justify-center shrink-0">
                  <FileText
                    className="w-4.5 h-4.5 text-[#0E7C7B]"
                    strokeWidth={2}
                  />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-sm font-bold text-[#0B2B2E] truncate">
                    {item.fileName}
                  </span>
                  <span
                    className="block text-[11px] text-[#5C7A7C] mt-0.5"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {item.date}
                    {clickable && item.itemsCount > 0 && (
                      <> · {item.itemsCount.toLocaleString("fa-IR")} شاخص</>
                    )}
                  </span>
                </span>
                {clickable && overall && (
                  <span
                    className={`shrink-0 w-2.5 h-2.5 rounded-full ${overall.dot}`}
                    title={overall.label}
                  />
                )}
                <span
                  className={`shrink-0 text-[11px] font-bold px-2.5 py-1 rounded-full border ${st.bg} ${st.text} ${st.border}`}
                >
                  {st.label}
                </span>
              </div>
            );

            return clickable ? (
              <Link
                key={item.id}
                href={`/analysis/${item.id}`}
                className="block"
              >
                {row}
              </Link>
            ) : (
              <div key={item.id}>{row}</div>
            );
          })}
        </div>
      )}
    </div>
  );
}
