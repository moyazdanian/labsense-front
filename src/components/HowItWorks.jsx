"use client";

import { useEffect, useRef, useState } from "react";
import {
  Upload,
  ScanLine,
  ShieldCheck,
  Salad,
  History,
  FileSearch,
  Sparkles,
} from "lucide-react";

/*
  HowItWorks
  ----------------------------
  سکشن اسکرولی «مسیر تحلیل» — جایگزین بخش «چرا لب‌لنز».
  یک خط عمودی که با اسکرول پر می‌شود و هر مرحله هنگام رسیدن به دید،
  با انیمیشن ظاهر و فعال می‌شود. ویژگی‌های قبلی (تحلیل خط به خط،
  تشخیص موارد پرخطر، توصیه‌ها و تاریخچه) داخل مراحل ادغام شده‌اند.

  بدون وابستگی جدید: IntersectionObserver + scroll برای پیشرفت خط،
  و ترنزیشن‌های CSS برای ظاهر شدن کارت‌ها.
*/

const STEPS = [
  {
    Icon: Upload,
    title: "عکس آزمایش را آپلود کنید",
    text: "یک عکس واضح از برگه جواب آزمایش بگیرید و در چند ثانیه آپلود کنید — همین!",
    tag: null,
  },
  {
    Icon: ScanLine,
    title: "هوش مصنوعی خط به خط تحلیل می‌کند",
    text: "هر شاخص آزمایش جداگانه بررسی و با بازه نرمال آن مقایسه می‌شود.",
    tag: { Icon: FileSearch, label: "تحلیل خط به خط" },
  },
  {
    Icon: ShieldCheck,
    title: "گزارش رنگ‌بندی‌شده دریافت کنید",
    text: "موارد طبیعی، مرزی و نیازمند توجه با رنگ‌بندی واضح مشخص می‌شوند تا در یک نگاه وضعیت خود را بفهمید.",
    tag: { Icon: Sparkles, label: "تشخیص موارد پرخطر" },
  },
  {
    Icon: Salad,
    title: "توصیه‌های عملی بگیرید",
    text: "پیشنهادهای تغذیه و سبک زندگی متناسب با نتایج آزمایش شما ارائه می‌شود.",
    tag: { Icon: Salad, label: "توصیه شخصی‌سازی‌شده" },
  },
  {
    Icon: History,
    title: "همیشه در دسترس شماست",
    text: "تمام تحلیل‌های شما در تاریخچه ذخیره می‌شود و هر زمان از پروفایل قابل مشاهده است.",
    tag: { Icon: History, label: "تاریخچه آزمایش‌ها" },
  },
];

export default function HowItWorks() {
  const timelineRef = useRef(null);
  const [progress, setProgress] = useState(0); // 0..1 پر شدن خط
  const [visibleSteps, setVisibleSteps] = useState(() =>
    STEPS.map(() => false),
  );

  // پر شدن خط عمودی بر اساس موقعیت اسکرول نسبت به سکشن
  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewportAnchor = window.innerHeight * 0.6;
      const total = rect.height;
      const passed = viewportAnchor - rect.top;
      setProgress(Math.min(1, Math.max(0, passed / total)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // ظاهر شدن هر مرحله وقتی وارد دید می‌شود
  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;

    const items = el.querySelectorAll("[data-step]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = Number(entry.target.getAttribute("data-step"));
          setVisibleSteps((prev) => {
            if (prev[idx]) return prev;
            const next = [...prev];
            next[idx] = true;
            return next;
          });
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.35 },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  // یک مرحله وقتی «فعال» است که خط به نقطه‌اش رسیده باشد
  const activeCount = Math.floor(progress * STEPS.length + 0.35);

  return (
    <section className="max-w-5xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
      <div className="text-center max-w-xl mx-auto mb-12">
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
          مسیر تحلیل آزمایش
        </h2>
        <p className="text-sm text-[#5C7A7C] leading-7">
          از عکس برگه آزمایش تا گزارش قابل فهم — فقط در چند دقیقه
        </p>
      </div>

      <div ref={timelineRef} className="relative">
        {/* خط عمودی پس‌زمینه */}
        <div className="absolute right-[22px] sm:right-1/2 sm:translate-x-1/2 top-2 bottom-2 w-[3px] rounded-full bg-[#E0F1EF]" />
        {/* خط پرشونده با اسکرول */}
        <div
          className="absolute right-[22px] sm:right-1/2 sm:translate-x-1/2 top-2 w-[3px] rounded-full bg-gradient-to-b from-[#0E7C7B] to-[#2BB3A3] transition-[height] duration-150 ease-out"
          style={{ height: `calc(${progress} * (100% - 16px))` }}
        />

        <div className="space-y-10 sm:space-y-14">
          {STEPS.map(({ Icon, title, text, tag }, i) => {
            const isVisible = visibleSteps[i];
            const isActive = i < activeCount;
            const isEven = i % 2 === 0;

            return (
              <div
                key={title}
                data-step={i}
                className={`relative flex items-start gap-5 sm:gap-0 ${
                  isEven ? "sm:flex-row" : "sm:flex-row-reverse"
                }`}
              >
                {/* نقطه روی خط */}
                <div className="absolute right-0 sm:right-1/2 sm:translate-x-1/2 ">
                  <span
                    className={`relative w-11 h-11 rounded-full border-[3px] flex items-center justify-center transition-all duration-500 ${
                      isActive
                        ? "bg-[#0E7C7B] border-[#0E7C7B] shadow-[0_0_0_6px_rgba(14,124,123,0.15)]"
                        : "bg-white border-[#E0F1EF]"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 transition-colors duration-500 ${
                        isActive ? "text-white" : "text-[#9CB5B6]"
                      }`}
                      strokeWidth={2}
                    />
                    {isActive && i === activeCount - 1 && (
                      <span className="absolute inset-0 rounded-full bg-[#0E7C7B]/30 animate-ping" />
                    )}
                  </span>
                </div>

                {/* کارت مرحله */}
                <div
                  className={`w-full pr-16 sm:pr-0 sm:w-1/2 ${
                    isEven ? "sm:pl-12" : "sm:pr-12"
                  }`}
                >
                  <div
                    className={`rounded-2xl bg-white border p-5 transition-all duration-700 ease-out ${
                      isActive
                        ? "border-[#0E7C7B]/30 shadow-[0_8px_30px_rgba(14,124,123,0.08)]"
                        : "border-[#E0F1EF]"
                    } ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: isVisible ? "100ms" : "0ms" }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="text-[11px] font-extrabold text-[#0E7C7B]"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {(i + 1).toLocaleString("fa-IR")}
                      </span>
                      <p className="text-sm sm:text-base font-extrabold text-[#0B2B2E]">
                        {title}
                      </p>
                    </div>
                    <p className="text-xs sm:text-sm text-[#5C7A7C] leading-6 sm:leading-7">
                      {text}
                    </p>
                    {tag && (
                      <span className="inline-flex items-center gap-1.5 mt-3 text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#0E7C7B]/10 text-[#0E7C7B]">
                        <tag.Icon className="w-3 h-3" />
                        {tag.label}
                      </span>
                    )}
                  </div>
                </div>

                {/* نیمه خالی سمت مقابل (فقط دسکتاپ) */}
                <div className="hidden sm:block sm:w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
