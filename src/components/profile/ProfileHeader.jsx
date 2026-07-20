"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreditBadge from "../payment/CreditBadge";
import PaymentDialog from "../payment/PaymentDialog";

/*
  ProfileHeader
  ----------------------------
  کارت بالای صفحه پروفایل: آواتار، شماره موبایل، اعتبار و دکمه‌های
  «خرید اعتبار» و «تحلیل جدید».

  props: user ({ phone, credits, has_used_first_offer })
*/
export default function ProfileHeader({ user }) {
  const [paymentOpen, setPaymentOpen] = useState(false);
  const isFirstAnalysis = !user.has_used_first_offer;

  return (
    <div className="rounded-2xl border border-[#E0F1EF] bg-white p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <span className="w-14 h-14 rounded-full bg-[#0E7C7B]/10 flex items-center justify-center shrink-0">
            <User className="w-6 h-6 text-[#0E7C7B]" />
          </span>
          <div className="min-w-0">
            <p
              className="text-base font-extrabold text-[#0B2B2E] truncate"
              style={{ fontFamily: "var(--font-mono)" }}
              dir="ltr"
            >
              {user.phone}
            </p>
            <div className="mt-1.5">
              <CreditBadge credits={user.credits} />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPaymentOpen(true)}
          >
            <Sparkles className="w-4 h-4" />
            خرید اعتبار
          </Button>
          <Link href="/">
            <Button size="sm" className="bg-[#0E7C7B] hover:bg-[#0B6564]">
              <Plus className="w-4 h-4" />
              تحلیل جدید
            </Button>
          </Link>
        </div>
      </div>

      <PaymentDialog
        open={paymentOpen}
        onOpenChange={setPaymentOpen}
        isFirstAnalysis={isFirstAnalysis}
      />
    </div>
  );
}
