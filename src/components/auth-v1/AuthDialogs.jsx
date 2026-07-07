"use client";

import { useState } from "react";
import PhoneLoginDialog from "./PhoneLoginDialog";
import OtpDialog from "./OtpDialog";
import { useSendOtp, useVerifyOtp } from "../../lib/hooks/useAuth";

/*
  AuthDialogs
  ----------------------------
  مدیریت جریان ورود: دیالوگ شماره موبایل -> دیالوگ OTP -> onAuthenticated(user)
  درخواست‌های ارسال و تایید OTP با React Query (useMutation) انجام می‌شود.

  props:
    - open: نمایش جریان ورود (از بیرون کنترل می‌شود)
    - onOpenChange(open): برای بستن کامل جریان
    - onAuthenticated(user): وقتی کاربر با موفقیت وارد شد
      user = { phone, credits, hasUsedFirstOffer }
*/
export default function AuthDialogs({ open, onOpenChange, onAuthenticated }) {
  const [step, setStep] = useState("phone"); // phone | otp
  const [phone, setPhone] = useState("");

  const sendOtp = useSendOtp();
  const verifyOtp = useVerifyOtp();

  const handleOpenChange = (next) => {
    if (!next) {
      setStep("phone");
      sendOtp.reset();
      verifyOtp.reset();
    }
    onOpenChange(next);
  };

  const handleSendOtp = async (phoneNumber) => {
    await sendOtp.mutateAsync(phoneNumber);
    setPhone(phoneNumber);
    setStep("otp");
  };

  const handleVerify = async (code) => {
    const data = await verifyOtp.mutateAsync({ phone, code });

    onAuthenticated?.({
      phone: data.user.phone,
      credits: data.user.credits,
      hasUsedFirstOffer: data.user.has_used_first_offer,
    });

    onOpenChange(false);
    setStep("phone");
  };

  const handleResend = () => {
    sendOtp.mutate(phone);
  };

  return (
    <>
      <PhoneLoginDialog
        open={open && step === "phone"}
        onOpenChange={handleOpenChange}
        onSendOtp={handleSendOtp}
        isLoading={sendOtp.isPending}
        errorMessage={sendOtp.error?.message}
      />
      <OtpDialog
        open={open && step === "otp"}
        onOpenChange={handleOpenChange}
        phone={phone}
        onVerify={handleVerify}
        onResend={handleResend}
        onBack={() => {
          setStep("phone");
          verifyOtp.reset();
        }}
        isLoading={verifyOtp.isPending}
        errorMessage={verifyOtp.error?.message}
        isResending={sendOtp.isPending}
      />
    </>
  );
}
