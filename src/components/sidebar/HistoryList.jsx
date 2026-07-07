import Link from "next/link";
import HistoryItem from "./HistoryItem";

/*
  HistoryList
  ----------------------------
  props:
    - items: آرایه‌ای از تاریخچه درخواست‌ها (lib/sampleHistory)
    - onSelect(item): انتخاب یک آیتم تاریخچه
    - collapsed: حالت جمع‌شده نوار کناری
*/
export default function HistoryList({ items, onSelect, collapsed }) {
  if (!items?.length) {
    if (collapsed) return null;
    return (
      <p className="text-xs text-[#5C7A7C] text-center py-6 leading-6">
        هنوز هیچ آزمایشی تحلیل نکرده‌اید.
      </p>
    );
  }

  return (
    <div className={collapsed ? "space-y-2" : "space-y-1"}>
      {items.map((item) => (
        <Link key={item.id} href={`/analysis/${item.id}`}>
          <HistoryItem
            item={item}
            collapsed={collapsed}
            onClick={() => onSelect?.(item)}
          />
        </Link>
      ))}
    </div>
  );
}
