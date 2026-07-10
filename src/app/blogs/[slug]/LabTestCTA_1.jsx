import Link from "next/link";
import { IBM_Plex_Mono, Vazirmatn } from "next/font/google";

/**
 * LabTestCTA — یک بخش CTA برای نمایش داخل مقالات
 * ----------------------------------------------------
 * ایده‌ی طراحی: این بخش مثل یک «برگه‌ی درخواست آزمایش» (requisition slip) طراحی شده—
 * همان کاغذی که آزمایشگاه‌ها موقع نمونه‌گیری پر می‌کنند: یک لبه‌ی پرفراژه (تیکه‌شده)
 * در سمت آیکون، یک بارکد نمونه، و یک ویال (لوله‌ی آزمایش) که مایعش به‌آرامی بالا و
 * پایین می‌رود. یک خط اسکنر هم به‌آرامی روی کارت عبور می‌کند؛ انگار سیستم دارد
 * بارکد نمونه را می‌خواند. همه‌چیز خیلی آرام و کم‌رنگ است چون قرار است وسط
 * محتوای یک مقاله بنشیند، نه به‌عنوان هیرو صفحه.
 *
 * استفاده:
 *   import LabTestCTA from "@/components/LabTestCTA";
 *   <LabTestCTA />
 *   // یا سفارشی‌سازی:
 *   <LabTestCTA
 *     eyebrow="پرونده‌ی شما"
 *     title="نمونه‌گیری در محل، بدون معطلی"
 *     description="..."
 *     buttonText="رزرو نمونه‌گیری"
 *     href="/booking"
 *     sampleId="SPX-04871"
 *   />
 */

const vazir = Vazirmatn({
  subsets: ["arabic"],
  weight: ["500", "700", "800"],
  variable: "--font-vazir",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-plex-mono",
});

// interface LabTestCTAProps {
//   eyebrow?: string;
//   title?: string;
//   description?: string;
//   buttonText?: string;
//   href?: string;
//   sampleId?: string;
// }

export default function LabTestCTA({
  eyebrow = "تحلیل هوشمند برگه‌ی آزمایش · در چند ثانیه",
  ctaTitle = "برگه‌ی آزمایشت رو بفرست، هوش مصنوعی برات توضیح می‌ده",
  ctaDesc = "فقط عکس یا اسکن برگه‌ی آزمایش‌تون رو آپلود کنید؛ هوش مصنوعی هر عدد رو با بازه‌ی نرمال مقایسه می‌کنه، مواردی که نیاز به توجه دارن رو مشخص می‌کنه و نتیجه رو با زبان ساده و قابل‌فهم براتون توضیح می‌ده.",
  ctaBtn = "تحلیل رایگان برگه‌ی آزمایش",
  ctaUrl = "/",
}) {
  return (
    <section
      dir="rtl"
      lang="fa"
      className={`${vazir.variable} ${plexMono.variable} font-[family-name:var(--font-vazir)] relative my-10 overflow-hidden rounded-[22px] border border-[#C9D8D5] bg-[#F6F8F7]`}
    >
      {/* بافت کاغذ گراف آزمایشگاهی، خیلی کم‌رنگ */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(#DCE6E4 1px, transparent 1px), linear-gradient(90deg, #DCE6E4 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* خط اسکنر — سیگنیچر المنت */}
      <div
        aria-hidden
        className="scanline pointer-events-none absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-[#146B69]/[0.07] to-transparent"
      />

      <div className="relative flex flex-col gap-6 p-6 sm:flex-row sm:items-stretch sm:gap-0 sm:p-0">
        <div className="relative flex shrink-0 flex-row items-center justify-center gap-4 sm:w-40 sm:flex-col sm:justify-center sm:border-s sm:border-dashed sm:border-[#B9CBC7] sm:py-8">
          {/* دو نیم‌دایره برای شبیه‌سازی پانچ پرفراژ روی خط تیکه‌شده */}
          <span
            className="hidden sm:block absolute -top-2 start-0 h-4 w-4 -translate-x-1/2 rounded-full bg-white sm:bg-[#F6F8F7]"
            style={{ insetInlineStart: "-1px" }}
          />
          <span
            className="hidden sm:block absolute -bottom-2 start-0 h-4 w-4 -translate-x-1/2 rounded-full bg-white sm:bg-[#F6F8F7]"
            style={{ insetInlineStart: "-1px" }}
          />
          {/* برگه‌ی آزمایش با اسکن هوش مصنوعی */}
          <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-md border-2 border-[#146B69]/70 bg-white">
            {/* خطوط متن برگه */}
            <div className="absolute inset-x-2 top-2.5 flex flex-col gap-1.5">
              <span className="h-[3px] w-full rounded-full bg-[#0F2A2E]/15" />
              <span className="h-[3px] w-3/4 rounded-full bg-[#0F2A2E]/15" />
              <span className="h-[3px] w-full rounded-full bg-[#0F2A2E]/15" />
              <span className="h-[3px] w-2/3 rounded-full bg-[#0F2A2E]/15" />
              <span className="h-[3px] w-full rounded-full bg-[#0F2A2E]/15" />
            </div>

            {/* خط اسکنر هوش مصنوعی روی برگه */}
            <span className="report-scan absolute inset-x-0 h-[3px] bg-[#146B69] shadow-[0_0_6px_1px_rgba(20,107,105,0.6)]" />

            {/* نشان تأیید نتیجه، بعد از پایان اسکن پاپ می‌زنه */}
            <span className="result-badge absolute -bottom-1 -end-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#146B69] text-white">
              <svg
                width="8"
                height="8"
                viewBox="0 0 10 10"
                fill="none"
                aria-hidden
              >
                <path
                  d="M2 5.2 4.2 7.4 8 3"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>

        {/* ستون محتوا */}
        <div className="flex flex-1 flex-col items-start gap-3 px-0 py-2 sm:px-8 sm:py-8">
          <span
            className={`font-[family-name:var(--font-plex-mono)] inline-flex items-center gap-2 rounded-full border border-[#146B69]/25 bg-[#146B69]/[0.06] px-3 py-1 text-[11px] tracking-wide text-[#146B69]`}
          >
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[#146B69]" />
            {eyebrow}
          </span>

          <h2 className="text-xl font-extrabold leading-relaxed text-[#0F2A2E] sm:text-2xl">
            {ctaTitle}
          </h2>

          <p className="max-w-xl text-[15px] leading-8 text-[#0F2A2E]/70">
            {ctaDesc}
          </p>

          <Link
            href={ctaUrl}
            className="group relative mt-2 inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#0F2A2E] px-6 py-3 text-sm font-bold text-[#F6F8F7] transition-colors hover:bg-[#146B69] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#146B69]"
          >
            <span>{ctaBtn}</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="transition-transform duration-300 group-hover:-translate-x-1"
              aria-hidden
            >
              <path
                d="M6 3.5 2.5 8 6 12.5M2.5 8h11"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>

      <style>{`
            .report-scan {
              animation: reportScan 3.2s ease-in-out infinite;
            }
            @keyframes reportScan {
              0%   { top: 8%;  opacity: 0; }
              10%  { opacity: 1; }
              50%  { top: 82%; opacity: 1; }
              60%  { opacity: 0; }
              100% { top: 82%; opacity: 0; }
            }
            .result-badge {
              animation: badgePop 3.2s ease-in-out infinite;
            }
            @keyframes badgePop {
              0%, 55%  { transform: scale(0); opacity: 0; }
              65%, 90% { transform: scale(1); opacity: 1; }
              100%     { transform: scale(0); opacity: 0; }
            }
            .pulse-dot {
              animation: labPulse 2.4s ease-in-out infinite;
            }
            @keyframes labPulse {
              0%, 100% { opacity: 1; transform: scale(1); }
              50%      { opacity: 0.35; transform: scale(0.8); }
            }
            .scanline {
              animation: labScan 7s linear infinite;
            }
            @keyframes labScan {
              0%   { transform: translateY(-100%); }
              100% { transform: translateY(400%); }
            }
            @media (prefers-reduced-motion: reduce) {
            .report-scan, .result-badge, .pulse-dot, .scanline {
              animation: none !important;
            }
          }
          `}</style>
    </section>
  );
}
