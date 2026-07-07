"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, XCircle } from "lucide-react";

/*
  صفحه نتیجه پرداخت
  ----------------------------
  بعد از بازگشت کاربر از زرین‌پال، لاراول او را به این آدرس ریدایرکت می‌کند:

    /payment/result?status=success&credits=3&ref_id=123456
    /payment/result?status=failed&reason=cancelled

  وظیفه این صفحه:
  - نمایش نتیجه پرداخت
  - در صورت موفقیت، تازه‌سازی اطلاعات کاربر (['user']) تا اعتبار جدید نمایش داده شود
  - راهنمایی کاربر برای بازگشت و ادامه فرآیند تحلیل
*/
export default function PaymentResult() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const status = searchParams.get("status");
  const credits = searchParams.get("credits");
  const refId = searchParams.get("ref_id");
  const reason = searchParams.get("reason");

  const isSuccess = status === "success";

  useEffect(() => {
    if (isSuccess) {
      // اطلاعات کاربر (از جمله اعتبار جدید) را از سرور تازه کن
      queryClient.invalidateQueries({ queryKey: ["user"] });
    }
  }, [isSuccess, queryClient]);

  const reasonMessages = {
    cancelled: "پرداخت توسط شما لغو شد.",
    verification: "تایید تراکنش با خطا مواجه شد.",
    not_found: "تراکنش مرتبط یافت نشد.",
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#F4FBFA] text-[#0B2B2E] flex items-center justify-center px-5"
      style={{ fontFamily: "'Vazirmatn', 'Manrope', sans-serif" }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;700;800&family=JetBrains+Mono:wght@500;700&display=swap"
        rel="stylesheet"
      />

      <div className="w-full max-w-sm rounded-3xl bg-white border border-[#E0F1EF] shadow-sm shadow-[#0E7C7B]/5 p-8 text-center">
        {isSuccess ? (
          <>
            <div className="w-16 h-16 rounded-2xl bg-[#EAF8F1] flex items-center justify-center mx-auto mb-5">
              <CheckCircle2
                className="w-8 h-8 text-[#1F9D6B]"
                strokeWidth={2}
              />
            </div>
            <h1 className="text-lg font-extrabold mb-2">
              پرداخت با موفقیت انجام شد
            </h1>
            <p className="text-sm text-[#5C7A7C] leading-7 mb-1">
              {credits
                ? `${Number(credits).toLocaleString("fa-IR")} اعتبار تحلیل `
                : "اعتبار "}
              به حساب شما اضافه شد.
            </p>
            {refId && (
              <p
                className="text-xs text-[#5C7A7C] mb-6"
                style={{ fontFamily: "var(--font-mono)" }}
                dir="ltr"
              >
                کد پیگیری: {refId}
              </p>
            )}
          </>
        ) : (
          <>
            <div className="w-16 h-16 rounded-2xl bg-[#FBEAEA] flex items-center justify-center mx-auto mb-5">
              <XCircle className="w-8 h-8 text-[#C13434]" strokeWidth={2} />
            </div>
            <h1 className="text-lg font-extrabold mb-2">پرداخت ناموفق بود</h1>
            <p className="text-sm text-[#5C7A7C] leading-7 mb-6">
              {reasonMessages[reason] ||
                "متاسفانه پرداخت شما تکمیل نشد. می‌توانید دوباره تلاش کنید."}
            </p>
          </>
        )}

        <button
          onClick={() => router.push("/")}
          className="w-full h-12 rounded-xl bg-[#0E7C7B] hover:bg-[#0B6564] text-white font-bold text-sm transition-colors"
        >
          {isSuccess ? "بازگشت و شروع تحلیل" : "بازگشت به صفحه اصلی"}
        </button>
      </div>
    </div>
  );
}
