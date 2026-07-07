"use client";

import { useEffect, useRef, useState } from "react";
import { ShieldCheck, Loader2, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

/*
  دیالوگ تایید کد OTP
  ----------------------------
  props:
    - open, onOpenChange
    - phone: شماره موبایلی که کد برایش ارسال شده
    - onVerify(code): تابعی که کد ۵ رقمی را برای تایید ارسال می‌کند
    - onResend(): ارسال دوباره کد
    - onBack(): بازگشت به دیالوگ ورود (تغییر شماره)
    - isLoading: وضعیت تایید کد (از useMutation در AuthDialogs)
    - errorMessage: پیام خطای سرور برای تایید کد
    - isResending: وضعیت ارسال دوباره کد
*/
const CODE_LENGTH = 5;
const RESEND_SECONDS = 60;

export default function OtpDialog({
  open,
  onOpenChange,
  phone,
  onVerify,
  onResend,
  onBack,
  isLoading,
  errorMessage,
  isResending,
}) {
  const [digits, setDigits] = useState(Array(CODE_LENGTH).fill(""));
  const [localError, setLocalError] = useState("");
  const [timer, setTimer] = useState(RESEND_SECONDS);
  const inputsRef = useRef([]);

  useEffect(() => {
    if (!open) return;
    setDigits(Array(CODE_LENGTH).fill(""));
    setLocalError("");
    setTimer(RESEND_SECONDS);
    const t = setTimeout(() => inputsRef.current[0]?.focus(), 50);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open || timer <= 0) return;
    const id = setInterval(() => setTimer((t) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(id);
  }, [open, timer]);

  const handleChange = (idx, val) => {
    const v = val.replace(/[^0-9]/g, "");
    if (!v) {
      const next = [...digits];
      next[idx] = "";
      setDigits(next);
      return;
    }
    const next = [...digits];
    next[idx] = v[v.length - 1];
    setDigits(next);
    if (idx < CODE_LENGTH - 1) inputsRef.current[idx + 1]?.focus();
  };

  const handleKeyDown = (idx, e) => {
    if (e.key === "Backspace" && !digits[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const text = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, CODE_LENGTH);
    if (!text) return;
    e.preventDefault();
    const next = Array(CODE_LENGTH).fill("");
    text.split("").forEach((d, i) => (next[i] = d));
    setDigits(next);
    inputsRef.current[Math.min(text.length, CODE_LENGTH - 1)]?.focus();
  };

  const code = digits.join("");
  const isComplete = code.length === CODE_LENGTH;
  const error = localError || errorMessage;

  const handleSubmit = async () => {
    if (!isComplete) {
      setLocalError("کد ۵ رقمی را کامل وارد کنید.");
      return;
    }
    setLocalError("");
    try {
      await onVerify(code);
    } catch (e) {
      // خطای mutation (کد نادرست و...) از طریق errorMessage نمایش داده می‌شود.
      // اینجا فقط خطاهای غیرمنتظره (باگ در onAuthenticated و...) را لاگ می‌کنیم
      // تا به‌جای بسته‌نشدن بی‌صدای دیالوگ، در کنسول قابل تشخیص باشند.
      console.error("OTP verification flow error:", e);
    }
  };

  const handleResend = () => {
    if (timer > 0 || isResending) return;
    setTimer(RESEND_SECONDS);
    setLocalError("");
    onResend?.();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        dir="rtl"
        className="sm:max-w-md rounded-3xl border-[#E0F1EF] p-0 overflow-hidden"
        style={{ fontFamily: "'Vazirmatn', 'Manrope', sans-serif" }}
      >
        <div className="bg-[#0B2B2E] text-white px-6 sm:px-8 py-6">
          <div className="w-11 h-11 rounded-xl bg-[#0E7C7B] flex items-center justify-center mb-3">
            <ShieldCheck className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <DialogHeader className="text-right space-y-1">
            <DialogTitle className="text-white text-lg font-extrabold">
              تایید کد ورود
            </DialogTitle>
            <DialogDescription className="text-white/60 text-xs leading-6">
              کد ۵ رقمی ارسال‌شده به شماره{" "}
              <span className="font-bold" style={{ fontFamily: "var(--font-mono)" }}>
                {phone}
              </span>{" "}
              را وارد کنید.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-6 sm:px-8 py-6 space-y-5">
          <div dir="ltr" className="flex justify-center gap-2.5" onPaste={handlePaste}>
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => (inputsRef.current[i] = el)}
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="w-12 h-14 text-center text-xl font-extrabold rounded-xl border-2 border-[#BFE3E1] focus:border-[#0E7C7B] focus:outline-none focus:ring-2 focus:ring-[#0E7C7B]/20 transition-colors"
                style={{ fontFamily: "var(--font-mono)" }}
              />
            ))}
          </div>

          {error && <p className="text-xs text-[#C13434] font-medium text-center">{error}</p>}

          <Button
            onClick={handleSubmit}
            disabled={isLoading || !isComplete}
            className="w-full h-12 rounded-xl bg-[#0E7C7B] hover:bg-[#0B6564] text-white font-bold text-sm"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                در حال بررسی...
              </span>
            ) : (
              "تایید و ورود"
            )}
          </Button>

          <div className="flex items-center justify-between text-xs">
            <button
              onClick={onBack}
              className="flex items-center gap-1 text-[#5C7A7C] hover:text-[#0E7C7B] font-medium transition-colors"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              تغییر شماره موبایل
            </button>

            {timer > 0 ? (
              <span className="text-[#5C7A7C]" style={{ fontFamily: "var(--font-mono)" }}>
                ارسال دوباره تا {timer} ثانیه
              </span>
            ) : (
              <button
                onClick={handleResend}
                disabled={isResending}
                className="text-[#0E7C7B] font-bold hover:underline underline-offset-4 disabled:opacity-60"
              >
                {isResending ? "در حال ارسال..." : "ارسال دوباره کد"}
              </button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
