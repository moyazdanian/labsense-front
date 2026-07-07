import { Activity } from "lucide-react";

export default function AnalyzingState() {
  return (
    <div className="rounded-3xl bg-white border border-[#E0F1EF] p-12 text-center">
      <div className="relative w-20 h-20 mx-auto mb-6">
        <div className="absolute inset-0 rounded-full border-4 border-[#0E7C7B]/15" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#0E7C7B] animate-spin" />
        <Activity className="w-7 h-7 text-[#0E7C7B] absolute inset-0 m-auto" />
      </div>
      <p className="font-extrabold text-lg mb-2">در حال تحلیل برگه آزمایش...</p>
      <p className="text-sm text-[#5C7A7C]">
        استخراج مقادیر، مقایسه با بازه‌های مرجع و تهیه توصیه‌ها
      </p>
    </div>
  );
}
