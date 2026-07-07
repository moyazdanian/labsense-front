"use client";

import { useState } from "react";
import { X } from "lucide-react";

import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import UploadZone from "../components/UploadZone";
import AnalyzingState from "../components/AnalyzingState";
import ResultsReport from "../components/ResultsReport";
import AuthDialogs from "../components/auth/AuthDialogs";
import PaymentDialog from "../components/payment/PaymentDialog";
import Sidebar from "../components/sidebar/Sidebar";
import { sampleResults } from "../lib/sampleResults";
import { sampleHistory } from "../lib/sampleHistory";
import { useLogout, useUser } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function LabReportAnalyzerPage() {
  const [stage, setStage] = useState("upload"); // upload | analyzing | result

  // وضعیت احراز هویت — در پروژه واقعی از session/کوکی یا context خوانده می‌شود
  // const [user, setUser] = useState(null); // null یا { phone, credits, hasUsedFirstOffer }
  const { data: user, isLoading, error } = useUser();
  const [authOpen, setAuthOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const { mutate, isPending } = useLogout();
  const router = useRouter();

  /*
    جریان کلی:
    ۱) کلیک روی "شروع تحلیل"
    ۲) اگر لاگین نیست -> دیالوگ ورود (شماره موبایل -> OTP)
    ۳) پس از ورود (یا اگر از قبل لاگین بود) -> بررسی اعتبار کاربر
       - اگر اعتبار دارد -> مصرف یک اعتبار و شروع مستقیم تحلیل
       - اگر اعتبار ندارد -> دیالوگ پرداخت
         - اولین تحلیل کاربر -> پیشنهاد ویژه با قیمت تخفیف‌دار
         - در غیر این صورت -> خرید بسته اعتباری
    ۴) پس از پرداخت موفق -> افزایش اعتبار و شروع تحلیل
  */
  const handleAnalyzeRequest = () => {
    if (!user) {
      setAuthOpen(true);
      return;
    }
    proceedAfterAuth(user);
  };

  const proceedAfterAuth = (currentUser) => {
    if (currentUser.credits > 0) {
      setUser((u) => ({ ...u, credits: u.credits - 1 }));
      runAnalysis();
    } else {
      setPaymentOpen(true);
    }
  };

  const runAnalysis = () => {
    setStage("analyzing");
    setTimeout(() => setStage("result"), 1800);
  };

  // پس از ورود موفق با OTP
  const handleAuthenticated = (phone) => {
    // TODO: در پروژه واقعی، اعتبار و وضعیت "اولین تحلیل" از API کاربر خوانده می‌شود
    const newUser = { phone, credits: 0, hasUsedFirstOffer: false };
    setUser(newUser);
    proceedAfterAuth(newUser);
  };

  // پس از پرداخت موفق
  const handlePaymentSuccess = (creditsGranted) => {
    setUser((u) => ({
      ...u,
      // یک اعتبار همین الان مصرف می‌شود، باقی برای دفعات بعد ذخیره می‌شود
      credits: u.credits + creditsGranted - 1,
      hasUsedFirstOffer: true,
    }));
    runAnalysis();
  };

  const handleLogout = () => {
    try {
      mutate();
      setStage("upload");
    } catch (err) {
      console.error(err);
    }
  };

  const isFirstAnalysis = user ? !user.hasUsedFirstOffer : true;

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#F4FBFA] text-[#0B2B2E] flex"
      style={{
        fontFamily: "'Vazirmatn', 'Manrope', sans-serif",
        ["--font-mono"]: "'JetBrains Mono', monospace",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;700;800&family=Manrope:wght@500;700;800&family=JetBrains+Mono:wght@500;700&display=swap"
        rel="stylesheet"
      />

      {/* پس‌زمینه دکوراتیو شبکه پزشکی */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#0E7C7B 1px, transparent 1px), linear-gradient(90deg, #0E7C7B 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* نوار کناری — فقط برای کاربران لاگین‌کرده */}
      {user && (
        <Sidebar
          history={sampleHistory}
          phone={user.phone}
          credits={user.credits}
          onNewAnalysis={() => setStage("upload")}
          onSelectHistory={() => setStage("result")}
          onLogout={handleLogout}
          isPendingLogout={isPending}
        />
      )}

      <div className="relative flex-1 min-w-0">
        <Header />

        <main className="relative max-w-5xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
          {stage !== "result" && <Hero />}

          {stage === "upload" && (
            <>
              <UploadZone
                onAnalyze={handleAnalyzeRequest}
                isAnalyzing={false}
              />
              <div className="flex flex-col items-center gap-2 mt-6">
                <p className="text-xs text-[#5C7A7C]">
                  هزینه هر تحلیل ۳۹,۰۰۰ تومان — اولین تحلیل با تخفیف ویژه ۹,۰۰۰
                  تومان
                </p>
                <button
                  onClick={() => setStage("result")}
                  className="text-xs text-[#0E7C7B] font-bold underline underline-offset-4 decoration-[#0E7C7B]/30 hover:decoration-[#0E7C7B]"
                >
                  مشاهده نمونه گزارش
                </button>
              </div>
            </>
          )}

          {stage === "analyzing" && <AnalyzingState />}

          {stage === "result" && (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-extrabold text-xl sm:text-2xl">
                  نتیجه تحلیل شما
                </h2>
                <button
                  onClick={() => setStage("upload")}
                  className="text-xs sm:text-sm font-bold text-[#5C7A7C] hover:text-[#0E7C7B] flex items-center gap-1.5 transition-colors"
                >
                  <X className="w-4 h-4" />
                  آپلود فایل جدید
                </button>
              </div>
              <ResultsReport data={sampleResults} />
            </>
          )}
        </main>

        <Footer />
      </div>

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
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
