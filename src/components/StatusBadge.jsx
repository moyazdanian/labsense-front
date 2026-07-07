import { statusStyles } from "../lib/status";

export default function StatusBadge({ status, size = "md" }) {
  const s = statusStyles[status];
  const Icon = s.Icon;
  const sizes = size === "lg" ? "text-sm px-4 py-2 gap-2" : "text-xs px-2.5 py-1 gap-1.5";
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium border ${s.bg} ${s.text} ${s.border} ${sizes}`}
    >
      <Icon className={size === "lg" ? "w-4 h-4" : "w-3.5 h-3.5"} strokeWidth={2.25} />
      {s.label}
    </span>
  );
}
