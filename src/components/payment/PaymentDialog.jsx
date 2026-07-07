"use client";

import { useState } from "react";
import { CreditCard, Loader2, Sparkles, ShieldCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PRICING, formatToman } from "../../lib/pricing";
import { useInitiatePayment } from "../../lib/hooks/usePayment";

/*
  PaymentDialog
  ----------------------------
  دیالوگ پرداخت قبل از شروع تحلیل.

  حالت اول (isFirstAnalysis = true):
    فقط پیشنهاد ویژه "اولین تحلیل" با قیمت تخفیف‌دار نمایش داده می‌شود.

  حالت دوم (isFirstAnalysis = false):
    کاربر باید یکی از بسته‌های اعتباری را انتخاب و خریداری کند.

  جریان پرداخت:
    ۱) POST /api/payments/initiate -> دریافت payment_url
    ۲) ریدایرکت کامل مرورگر به درگاه زرین‌پال (window.location.href)
    ۳) کاربر پس از پرداخت به /payment/result بازمی‌گردد (نتیجه آنجا بررسی می‌شود)

  props:
    - open, onOpenChange
    - isFirstAnalysis: boolean
*/
export default function PaymentDialog({ open, onOpenChange, isFirstAnalysis }) {
  const [selectedBundle, setSelectedBundle] = useState(
    PRICING.bundles.find((b) => b.id === "triple")?.id ?? PRICING.bundles[0].id,
  );

  const initiatePayment = useInitiatePayment();
  const bundle = PRICING.bundles.find((b) => b.id === selectedBundle);

  const handlePay = async () => {
    if (initiatePayment.isPending) return;

    const payload = isFirstAnalysis
      ? { type: "first_analysis" }
      : { type: "bundle", bundle_id: selectedBundle };

    try {
      const { payment_url } = await initiatePayment.mutateAsync(payload);
      // ریدایرکت کامل به درگاه — کاربر اپ را موقتاً ترک می‌کند
      window.location.href = payment_url;
    } catch {
      // پیام خطا از طریق initiatePayment.error نمایش داده می‌شود
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        dir="rtl"
        className="sm:max-w-md rounded-3xl border-[#E0F1EF] p-0 overflow-hidden"
        style={{ fontFamily: "'Vazirmatn', 'Manrope', sans-serif" }}
      >
        {/* سربرگ */}
        <div className="bg-[#0B2B2E] text-white px-6 sm:px-8 py-6">
          <div className="w-11 h-11 rounded-xl bg-[#0E7C7B] flex items-center justify-center mb-3">
            <CreditCard className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <DialogHeader className="text-right space-y-1">
            <DialogTitle className="text-white text-lg font-extrabold">
              {isFirstAnalysis ? "تحلیل اولین آزمایش شما" : "خرید اعتبار تحلیل"}
            </DialogTitle>
            <DialogDescription className="text-white/60 text-xs leading-6">
              {isFirstAnalysis
                ? "برای شروع تحلیل با هوش مصنوعی، هزینه پردازش این آزمایش را پرداخت کنید."
                : "اعتبار شما تمام شده است. برای ادامه، یکی از بسته‌های زیر را انتخاب کنید."}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-6 sm:px-8 py-6 space-y-4">
          {isFirstAnalysis ? (
            <FirstAnalysisOffer />
          ) : (
            <BundleSelector
              selected={selectedBundle}
              onSelect={setSelectedBundle}
            />
          )}

          {initiatePayment.error && (
            <p className="text-xs text-[#C13434] font-medium text-center">
              {initiatePayment.error.message}
            </p>
          )}

          <Button
            onClick={handlePay}
            disabled={initiatePayment.isPending}
            className="w-full h-12 rounded-xl bg-[#0E7C7B] hover:bg-[#0B6564] text-white font-bold text-sm"
          >
            {initiatePayment.isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                در حال انتقال به درگاه پرداخت...
              </span>
            ) : isFirstAnalysis ? (
              `پرداخت ${formatToman(PRICING.firstAnalysis.price)} و شروع تحلیل`
            ) : (
              `پرداخت ${formatToman(bundle.price)}`
            )}
          </Button>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#5C7A7C]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0E7C7B]" />
            پرداخت امن از طریق درگاه زرین‌پال
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ---------- پیشنهاد ویژه اولین تحلیل ----------
function FirstAnalysisOffer() {
  const { price, originalPrice } = PRICING.firstAnalysis;
  return (
    <div className="rounded-2xl border-2 border-[#0E7C7B]/30 bg-[#F4FBFA] p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#0E7C7B] bg-[#0E7C7B]/10 px-2.5 py-1 rounded-full">
          <Sparkles className="w-3 h-3" />
          پیشنهاد ویژه کاربران جدید
        </span>
      </div>
      <div className="flex items-end gap-2 mb-2">
        <span
          className="text-3xl font-extrabold text-[#0B2B2E] tabular-nums"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {price.toLocaleString("fa-IR")}
        </span>
        <span className="text-sm font-bold text-[#5C7A7C] mb-1">تومان</span>
        <span
          className="text-sm text-[#5C7A7C] line-through mb-1 tabular-nums"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {originalPrice.toLocaleString("fa-IR")}
        </span>
      </div>
      <ul className="text-xs text-[#5C7A7C] space-y-1.5 leading-6">
        <li>• تحلیل کامل و خط‌به‌خط برگه آزمایش با هوش مصنوعی</li>
        <li>• مشخص شدن موارد طبیعی، مرزی و نیازمند توجه</li>
        <li>• توصیه‌های تغذیه‌ای و سبک زندگی متناسب با نتایج شما</li>
      </ul>
    </div>
  );
}

// ---------- انتخاب بسته اعتباری ----------
function BundleSelector({ selected, onSelect }) {
  return (
    <div className="space-y-2.5">
      {PRICING.bundles.map((b) => {
        const isSelected = b.id === selected;
        const perUnit = Math.round(b.price / b.count);
        return (
          <button
            key={b.id}
            onClick={() => onSelect(b.id)}
            className={`w-full flex items-center justify-between rounded-2xl border-2 p-4 text-right transition-colors ${
              isSelected
                ? "border-[#0E7C7B] bg-[#F4FBFA]"
                : "border-[#E0F1EF] hover:border-[#0E7C7B]/30"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  isSelected ? "border-[#0E7C7B]" : "border-[#BFE3E1]"
                }`}
              >
                {isSelected && (
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0E7C7B]" />
                )}
              </span>
              <div>
                <p className="text-sm font-bold text-[#0B2B2E]">
                  {b.count === 1
                    ? "۱ تحلیل"
                    : `${b.count.toLocaleString("fa-IR")} تحلیل`}
                </p>
                <p
                  className="text-[11px] text-[#5C7A7C]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {formatToman(perUnit)} / هر تحلیل
                </p>
              </div>
            </div>
            <div className="text-left">
              <p
                className="text-sm font-extrabold text-[#0B2B2E] tabular-nums"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {formatToman(b.price)}
              </p>
              {b.discountLabel && (
                <p className="text-[11px] font-bold text-[#1F9D6B] mt-0.5">
                  {b.discountLabel}
                </p>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
