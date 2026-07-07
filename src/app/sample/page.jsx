import ResultsReport from "@/components/ResultsReport";
import { sampleResults } from "@/lib/sampleResults";
import { X } from "lucide-react";

export default function SamplePage() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-extrabold text-xl sm:text-2xl">نتیجه تحلیل شما</h2>
        <button className="text-xs sm:text-sm font-bold text-[#5C7A7C] hover:text-[#0E7C7B] flex items-center gap-1.5 transition-colors">
          <X className="w-4 h-4" />
          آپلود فایل جدید
        </button>
      </div>
      <ResultsReport data={sampleResults} />
    </>
  );
}
