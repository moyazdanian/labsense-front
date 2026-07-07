import { Sparkles } from "lucide-react";

/*
  CreditBadge
  ----------------------------
  نمایش تعداد اعتبار باقی‌مانده کاربر (در سایدبار یا هدر)
  props: credits (number)
*/
export default function CreditBadge({ credits }) {
  const isEmpty = credits <= 0;
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full ${
        isEmpty ? "bg-[#FBEAEA] text-[#C13434]" : "bg-[#0E7C7B]/10 text-[#0E7C7B]"
      }`}
    >
      <Sparkles className="w-3 h-3" />
      {isEmpty ? "بدون اعتبار" : `${credits.toLocaleString("fa-IR")} اعتبار باقی‌مانده`}
    </span>
  );
}
