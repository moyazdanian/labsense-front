import { Stethoscope, Sparkles, AlertCircle } from "lucide-react";
import StatusBadge from "./StatusBadge";
import HeartbeatDivider from "./HeartbeatDivider";
import ResultRow from "./ResultRow";
import RecommendationCard from "./RecommendationCard";

export default function ResultsReport({ data }) {
  return (
    <div className="rounded-3xl bg-white border border-[#E0F1EF] shadow-sm shadow-[#0E7C7B]/5 overflow-hidden">
      {/* سربرگ گزارش، شبیه برگه پرینت آزمایشگاه */}
      <div className="bg-[#0B2B2E] text-white px-6 sm:px-8 py-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#0E7C7B] flex items-center justify-center shrink-0">
            <Stethoscope className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <div>
            <p className="font-extrabold text-base sm:text-lg">گزارش تحلیل آزمایش</p>
            <p className="text-xs text-white/55 mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>
              {data.fileName} · {data.date}
            </p>
          </div>
        </div>
        <StatusBadge status={data.overallStatus} size="lg" />
      </div>

      {/* خلاصه هوش مصنوعی */}
      <div className="px-6 sm:px-8 pt-6 pb-2">
        <div className="rounded-2xl bg-[#F4FBFA] border border-[#E0F1EF] p-4 sm:p-5 flex gap-3">
          <Sparkles className="w-5 h-5 text-[#0E7C7B] shrink-0 mt-0.5" />
          <p className="text-sm sm:text-[15px] leading-7 text-[#0B2B2E]/85">{data.summary}</p>
        </div>
      </div>

      <HeartbeatDivider className="px-6 sm:px-8 mt-2" />

      {/* لیست خط به خط نتایج */}
      <div className="px-6 sm:px-8 py-2">
        <p className="text-xs font-bold text-[#5C7A7C] tracking-wide pt-2 pb-1">
          تحلیل خط به خط شاخص‌ها
        </p>
        <div>
          {data.items.map((item, i) => (
            <ResultRow key={item.name} item={item} isLast={i === data.items.length - 1} />
          ))}
        </div>
      </div>

      <HeartbeatDivider className="px-6 sm:px-8" />

      {/* توصیه‌های تغذیه و سبک زندگی */}
      <div className="px-6 sm:px-8 pt-2 pb-8">
        <p className="text-xs font-bold text-[#5C7A7C] tracking-wide pt-2 pb-4">
          توصیه‌های تغذیه‌ای و سبک زندگی
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {data.recommendations.map((rec, i) => (
            <RecommendationCard key={i} {...rec} />
          ))}
        </div>
      </div>

      {/* یادداشت پزشکی */}
      <div className="bg-[#FBF3DF] border-t border-[#F2E1B6] px-6 sm:px-8 py-4 flex items-start gap-3">
        <AlertCircle className="w-4 h-4 text-[#B5800F] shrink-0 mt-0.5" />
        <p className="text-xs text-[#8A6510] leading-6">
          این تحلیل صرفاً جنبه اطلاع‌رسانی دارد و جایگزین نظر پزشک نیست. برای تفسیر دقیق و تصمیم‌گیری درمانی حتماً با پزشک خود مشورت کنید.
        </p>
      </div>
    </div>
  );
}
