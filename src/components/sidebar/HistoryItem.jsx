import { FileText } from "lucide-react";
import { statusStyles } from "../../lib/status";
import { useParams } from "next/navigation";

/*
  HistoryItem
  ----------------------------
  یک ردیف از تاریخچه درخواست‌های کاربر
  props: item ({ id, fileName, date, time, overallStatus, itemsCount }), onClick, collapsed
*/
export default function HistoryItem({ item, onClick, collapsed }) {
  const s = statusStyles[item.overallStatus];
  const param = useParams();
  const id = param?.id;
  const isActive = id == item.id;

  if (collapsed) {
    return (
      <button
        onClick={onClick}
        title={item.fileName}
        className="relative w-10 h-10 mx-auto rounded-xl bg-white border border-[#E0F1EF] flex items-center justify-center gap-2 hover:border-[#0E7C7B]/40 transition-colors"
      >
        <FileText className="w-4 h-4 text-[#0E7C7B]" strokeWidth={2} />
        <span
          className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ring-2 ring-white ${isActive && "bg-[#d1ebea] hover:bg-[#beeceb]"}`}
        />
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-right hover:bg-[#F4FBFA] transition-colors group ${isActive && "bg-[#d1ebea] hover:bg-[#beeceb]"}`}
    >
      <span className="w-9 h-9 rounded-lg bg-[#0E7C7B]/10 flex items-center justify-center shrink-0">
        <FileText className="w-4 h-4 text-[#0E7C7B]" strokeWidth={2} />
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-sm font-bold text-[#0B2B2E] truncate">
          {item.fileName}
        </span>
        <span
          className="block text-[11px] text-[#5C7A7C] mt-0.5"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {item.date} · {item.time}
        </span>
      </span>
      <span
        className={`shrink-0 w-2.5 h-2.5 rounded-full ${s?.dot}`}
        title={s?.label}
      />
    </button>
  );
}
