"use client";

import { useState } from "react";
import { Phone, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/*
  دیالوگ ورود با شماره موبایل
  ----------------------------
  - کاربر شماره موبایل را وارد می‌کند
  - با کلیک روی "ارسال کد"، onSendOtp(phone) فراخوانی می‌شود
  - در صورت موفقیت، خود کامپوننت والد باید دیالوگ OTP را باز کند

  props:
    - isLoading: وضعیت ارسال (از useMutation در AuthDialogs)
    - errorMessage: پیام خطای سرور (از mutation.error)
*/
export default function PhoneLoginDialog({ open, onOpenChange, onSendOtp, isLoading, errorMessage }) {
  const [phone, setPhone] = useState("");
  const [localError, setLocalError] = useState("");

  const isValid = /^09\d{9}$/.test(phone);
  const error = localError || errorMessage;

  const handleSubmit = async () => {
    if (!isValid) {
      setLocalError("شماره موبایل را به‌صورت صحیح وارد کنید (مثال: 09123456789)");
      return;
    }
    setLocalError("");
    try {
      await onSendOtp(phone);
    } catch {
      // خطای سرور از طریق errorMessage (mutation.error) نمایش داده می‌شود
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
            <Phone className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <DialogHeader className="text-right space-y-1">
            <DialogTitle className="text-white text-lg font-extrabold">
              ورود به لب‌سنس
            </DialogTitle>
            <DialogDescription className="text-white/60 text-xs leading-6">
              برای مشاهده نتیجه تحلیل و دسترسی به تاریخچه آزمایش‌هایتان، ابتدا با شماره موبایل وارد شوید.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-6 sm:px-8 py-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#0B2B2E]">شماره موبایل</label>
            <Input
              inputMode="numeric"
              dir="ltr"
              placeholder="09123456789"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value.replace(/[^0-9]/g, "").slice(0, 11));
                setLocalError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className="text-left tracking-widest font-bold rounded-xl h-12 border-[#BFE3E1] focus-visible:ring-[#0E7C7B]"
              style={{ fontFamily: "var(--font-mono)" }}
            />
            {error && <p className="text-xs text-[#C13434] font-medium">{error}</p>}
          </div>

          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full h-12 rounded-xl bg-[#0E7C7B] hover:bg-[#0B6564] text-white font-bold text-sm"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                در حال ارسال کد...
              </span>
            ) : (
              "ارسال کد تایید"
            )}
          </Button>

          <p className="text-[11px] text-[#5C7A7C] text-center leading-6">
            با ادامه دادن، شرایط استفاده و حریم خصوصی لب‌سنس را می‌پذیرید.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
