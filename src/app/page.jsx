"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AlertTriangle } from "lucide-react";

import Hero from "../components/Hero";
import Features from "../components/Features";
import Faq from "../components/Faq";
import UploadZone from "../components/UploadZone";
import AuthDialogs from "../components/auth/AuthDialogs";
import PaymentDialog from "../components/payment/PaymentDialog";
import { sampleResults } from "../lib/sampleResults";
import { useUser, useLogout } from "../lib/hooks/useAuth";
import {
  useCreateAnalysis,
  useAnalysisHistory,
} from "../lib/hooks/useAnalysis";
import { analysisApi } from "../lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PRICING, formatToman } from "@/lib/pricing";
export default function LabReportAnalyzerPage() {
  const [stage, setStage] = useState("upload"); // upload | analyzing | result

  // وضعیت کاربر از react-query — منبع واحد حقیقت برای احراز هویت
  const { data: user } = useUser(); // undefined/null = خارج، در غیر این صورت { id, phone, credits, has_used_first_offer }
  const queryClient = useQueryClient();

  const { data: history } = useAnalysisHistory();
  const createAnalysis = useCreateAnalysis();

  const [authOpen, setAuthOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // فایلی که کاربر انتخاب کرده، تا بعد از ورود/پرداخت بتوان تحلیل را ادامه داد
  const [pendingFile, setPendingFile] = useState(null);

  const [analysisResult, setAnalysisResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  /*
    جریان کلی:
    ۱) انتخاب فایل و کلیک روی "شروع تحلیل"
    ۲) اگر لاگین نیست -> دیالوگ ورود (شماره موبایل -> OTP)
    ۳) پس از ورود (یا اگر از قبل لاگین بود) -> بررسی اعتبار کاربر
       - اگر اعتبار دارد -> ارسال فایل به API تحلیل
       - اگر اعتبار ندارد -> دیالوگ پرداخت
         - اولین تحلیل کاربر -> پیشنهاد ویژه با قیمت تخفیف‌دار
         - در غیر این صورت -> خرید بسته اعتباری
    ۴) پس از پرداخت موفق و بازگشت به سایت، کاربر دوباره فایل را انتخاب می‌کند
       (فایل به‌خاطر ریدایرکت کامل به درگاه، در حافظه باقی نمی‌ماند)
  */
  const handleAnalyzeRequest = (file) => {
    setStage("analyzing");
    setPendingFile(file);
    setErrorMessage("");

    if (!user) {
      setStage("upload");
      setAuthOpen(true);
      return;
    }
    proceedAfterAuth(user, file);
  };

  const proceedAfterAuth = (currentUser, file) => {
    if (currentUser.credits > 0) {
      runAnalysis(file);
    } else {
      setStage("upload");
      setPaymentOpen(true);
    }
  };

  const runAnalysis = async (file) => {
    if (!file) return;

    setStage("analyzing");
    setErrorMessage("");

    try {
      const data = await createAnalysis.mutateAsync(file);
      sessionStorage.setItem(
        `analysis_${data.id}`,
        JSON.stringify(data.result),
      );
      router.push(`/analysis/${data.id}`);
      setPendingFile(null);
    } catch (e) {
      setErrorMessage(e?.message || "خطا در تحلیل تصویر. دوباره تلاش کنید.");
      setStage("upload");
    }
  };

  // پس از ورود موفق با OTP (کاربر از قبل در کش ['user'] قرار گرفته است)
  const handleAuthenticated = () => {
    const currentUser = queryClient.getQueryData(["user"]);
    if (currentUser && pendingFile) proceedAfterAuth(currentUser, pendingFile);
  };

  // انتخاب یک آیتم از تاریخچه — دریافت نتیجه کامل و نمایش آن
  const handleSelectHistory = async (item) => {
    setErrorMessage("");
    try {
      const data = await queryClient.fetchQuery({
        queryKey: ["analysis", item.id],
        queryFn: () => analysisApi.get(item.id),
      });
      setAnalysisResult(data.result);
      setStage("result");
    } catch (e) {
      setErrorMessage(e?.message || "دریافت نتیجه با خطا مواجه شد.");
    }
  };

  const handleNewAnalysis = () => {
    setAnalysisResult(null);
    setErrorMessage("");
    setStage("upload");
  };

  const handleShowSample = () => {
    setAnalysisResult(sampleResults);
    setStage("result");
  };

  const isFirstAnalysis = user ? !user.has_used_first_offer : true;
  const isAnalyzing = stage === "analyzing";

  return (
    <div>
      <Hero />
      <UploadZone onAnalyze={handleAnalyzeRequest} isAnalyzing={isAnalyzing} />
      {/* جریان ورود: شماره موبایل -> OTP */}
      <AuthDialogs
        open={authOpen}
        onOpenChange={setAuthOpen}
        onAuthenticated={handleAuthenticated}
      />

      {/* دیالوگ پرداخت: پیشنهاد اولین تحلیل یا خرید بسته اعتباری */}
      <PaymentDialog
        open={paymentOpen}
        onOpenChange={setPaymentOpen}
        isFirstAnalysis={isFirstAnalysis}
      />

      {errorMessage && (
        <div className="mt-4 rounded-2xl border border-[#F4CFCF] bg-[#FBEAEA] px-4 py-3 flex items-center gap-2 text-sm text-[#C13434]">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          {errorMessage}
        </div>
      )}

      <div className="flex flex-col items-center gap-2 mt-6">
        <p className="text-xs text-[#5C7A7C]">
          {` هزینه هر تحلیل ${formatToman(PRICING.firstAnalysis.originalPrice)}  — اولین تحلیل با تخفیف ویژه ${formatToman(PRICING.firstAnalysis.price)} `}
        </p>
        <Link href="/sample">
          <button className="text-xs text-[#0E7C7B] font-bold underline underline-offset-4 decoration-[#0E7C7B]/30 hover:decoration-[#0E7C7B]">
            مشاهده نمونه گزارش
          </button>
        </Link>
      </div>

      <Features />
      <Faq />

      {/* {stage === "analyzing" && <AnalyzingState />} */}

      {/* {stage === "result" && analysisResult && (
        <>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-extrabold text-xl sm:text-2xl">
              نتیجه تحلیل شما
            </h2>
            <button
              onClick={handleNewAnalysis}
              className="text-xs sm:text-sm font-bold text-[#5C7A7C] hover:text-[#0E7C7B] flex items-center gap-1.5 transition-colors"
            >
              <X className="w-4 h-4" />
              آپلود فایل جدید
            </button>
          </div>
          <ResultsReport data={analysisResult} />
        </>
      )} */}
    </div>
  );
}
