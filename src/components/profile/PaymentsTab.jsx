"use client";

import { CreditCard, Receipt } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { usePaymentHistory } from "@/lib/hooks/usePayment";
import { formatToman } from "@/lib/pricing";

const paymentStatusStyles = {
  paid: { label: "موفق", bg: "bg-[#EAF8F1]", text: "text-[#1F9D6B]", border: "border-[#CDEEDD]" },
  failed: { label: "ناموفق", bg: "bg-[#FBEAEA]", text: "text-[#C13434]", border: "border-[#F4CFCF]" },
  pending: { label: "در انتظار", bg: "bg-[#FBF3DF]", text: "text-[#B5800F]", border: "border-[#F2E1B6]" },
};

// عنوان قابل‌نمایش هر پرداخت بر اساس نوع آن
function paymentTitle(p) {
  if (p.type === "first_analysis") return "اولین تحلیل (تخفیف ویژه)";
  const count = Number(p.credits || 0).toLocaleString("fa-IR");
  return `بسته ${count} تحلیل`;
}

/*
  PaymentsTab
  ----------------------------
  تاریخچه پرداخت‌های کاربر در صفحه پروفایل.
*/
export default function PaymentsTab() {
  const { data: payments, isLoading } = usePaymentHistory();

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-[72px] rounded-2xl bg-[#E0F1EF]/60" />
        ))}
      </div>
    );
  }

  if (!payments?.length) {
    return (
      <div className="rounded-2xl border border-[#E0F1EF] bg-white py-14 text-center">
        <span className="mx-auto w-12 h-12 rounded-full bg-[#0E7C7B]/10 flex items-center justify-center">
          <Receipt className="w-5 h-5 text-[#0E7C7B]" />
        </span>
        <p className="mt-3 text-sm text-[#5C7A7C]">
          هنوز هیچ پرداختی انجام نداده‌اید.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#E0F1EF] bg-white divide-y divide-[#E0F1EF] overflow-hidden">
      {payments.map((p) => {
        const st = paymentStatusStyles[p.status] || paymentStatusStyles.pending;
        return (
          <div key={p.id} className="flex items-center gap-3 px-4 py-3.5">
            <span className="w-10 h-10 rounded-xl bg-[#0E7C7B]/10 flex items-center justify-center shrink-0">
              <CreditCard className="w-4.5 h-4.5 text-[#0E7C7B]" strokeWidth={2} />
            </span>
            <span className="flex-1 min-w-0">
              <span className="block text-sm font-bold text-[#0B2B2E] truncate">
                {paymentTitle(p)}
              </span>
              <span
                className="block text-[11px] text-[#5C7A7C] mt-0.5"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {p.date} · {p.time}
                {p.status === "paid" && p.ref_id && (
                  <span dir="ltr"> · {p.ref_id}</span>
                )}
              </span>
            </span>
            <span className="shrink-0 text-left">
              <span className="block text-sm font-extrabold text-[#0B2B2E]">
                {formatToman(p.amount)}
              </span>
              <span className="block text-[11px] text-[#5C7A7C] mt-0.5">
                {Number(p.credits || 0).toLocaleString("fa-IR")} اعتبار
              </span>
            </span>
            <span
              className={`shrink-0 text-[11px] font-bold px-2.5 py-1 rounded-full border ${st.bg} ${st.text} ${st.border}`}
            >
              {st.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
