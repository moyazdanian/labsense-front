"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "آیا این تحلیل جایگزین مشاوره پزشک است؟",
    a: "خیر. لب‌سنس صرفاً به شما کمک می‌کند جواب آزمایش را راحت‌تر بفهمید. برای تشخیص و تصمیم‌گیری درمانی حتماً به پزشک مراجعه کنید.",
  },
  {
    q: "چه فرمت‌هایی از تصویر آزمایش پشتیبانی می‌شود؟",
    a: "فایل‌های JPG و PNG با حجم حداکثر ۱۰ مگابایت. تصویر باید خوانا و کامل باشد تا تحلیل دقیق‌تر انجام شود.",
  },
  {
    q: "اطلاعات و تصویر آزمایش من کجا ذخیره می‌شود؟",
    a: "تصویر و نتیجه تحلیل به‌صورت خصوصی در حساب شما ذخیره می‌شود و فقط خود شما به آن دسترسی دارید.",
  },
  {
    q: "هزینه هر تحلیل چقدر است؟",
    a: "هزینه هر تحلیل ۳۹,۰۰۰ تومان است. اولین تحلیل شما با تخفیف ویژه و قیمت ۹,۰۰۰ تومان انجام می‌شود.",
  },
  {
    q: "اگر تحلیل با خطا مواجه شود، اعتبارم کسر می‌شود؟",
    a: "خیر. در صورت بروز خطا در پردازش، اعتبار شما کسر نمی‌شود و می‌توانید دوباره تلاش کنید.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="max-w-3xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">سوالات متداول</h2>
        <p className="text-sm text-[#5C7A7C] leading-7">پاسخ به پرسش‌های رایج شما</p>
      </div>

      <div className="rounded-3xl bg-white border border-[#E0F1EF] divide-y divide-[#E6F1F0] overflow-hidden">
        {faqs.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i}>
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 text-right hover:bg-[#F7FCFB] transition-colors"
              >
                <span className="text-sm font-bold text-[#0B2B2E]">{item.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#5C7A7C] shrink-0 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 sm:px-6 pb-4 -mt-1">
                  <p className="text-sm text-[#5C7A7C] leading-7">{item.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
