"use client";
import MedicalLoading from "@/components/Loading";
import ResultsReport from "@/components/ResultsReport";
import { useGetAnalysis } from "@/lib/hooks/useAnalysis";
import { Activity, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AnalysisPage() {
  const params = useParams();
  const id = params?.id;

  const [result, setResult] = useState(null);
  const [isFromStorage, setIsFromStorage] = useState(false);

  // هوک همیشه در سطح بالای کامپوننت صدا زده می‌شود
  const {
    data: analysis,
    isLoading,
    error,
  } = useGetAnalysis(id, {
    enabled: !isFromStorage, // فقط اگر از storage نبود، API call شود
  });

  // دریافت از sessionStorage
  useEffect(() => {
    if (!id) return;

    const storedData = sessionStorage.getItem(`analysis_${id}`);
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setResult(parsedData);
        setIsFromStorage(true);
        // پاک کردن بعد از دریافت
        sessionStorage.removeItem(`analysis_${id}`);
      } catch (e) {
        console.error("Error parsing stored data:", e);
        setIsFromStorage(false);
      }
    } else {
      setIsFromStorage(false);
    }
  }, [id]);

  // وقتی داده از API آمد، آن را set کن
  useEffect(() => {
    if (analysis?.result && !isFromStorage) {
      setResult(analysis.result);
    }
  }, [analysis, isFromStorage]);

  // نمایش حالت بارگذاری
  if (isLoading && !isFromStorage && !result) {
    return <MedicalLoading />;
  }

  // نمایش خطا
  if (error && !isFromStorage && !result) {
    return (
      <div className="text-center py-16">
        <div className="rounded-2xl border border-[#F4CFCF] bg-[#FBEAEA] px-4 py-3 text-sm text-[#C13434]">
          خطا: {error.message}
        </div>
      </div>
    );
  }

  // اگر نتیجه وجود ندارد
  if (!result) {
    return (
      <div className="text-center py-16">
        <div className="rounded-2xl border border-[#F4CFCF] bg-[#FBEAEA] px-4 py-3 text-sm text-[#C13434]">
          نتیجه‌ای یافت نشد
        </div>
      </div>
    );
  }
  if (result) {
    return (
      <>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-extrabold text-xl sm:text-2xl">
            نتیجه تحلیل شما
          </h2>
          <button className="text-xs sm:text-sm font-bold text-[#5C7A7C] hover:text-[#0E7C7B] flex items-center gap-1.5 transition-colors">
            <X className="w-4 h-4" />
            آپلود فایل جدید
          </button>
        </div>
        <ResultsReport data={result} />
      </>
    );
  }
}
