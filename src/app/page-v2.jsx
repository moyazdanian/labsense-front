"use client";
import React, { useState, useRef } from "react";
import {
  Upload,
  FileImage,
  Activity,
  Heart,
  Stethoscope,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  Apple,
  Moon,
  Dumbbell,
  Droplet,
  ChevronDown,
  Sparkles,
  X,
} from "lucide-react";

/*
  دستیار تحلیل آزمایش خون — Lab Sense
  ------------------------------------------------
  پالت رنگی:
    - زمینه:        #F4FBFA  (مینت بسیار روشن)
    - سطح کارت:     #FFFFFF
    - اصلی/برند:    #0E7C7B  (تیل پزشکی)
    - تیره/متن:     #0B2B2E  (سرمه‌ای تیره)
    - نرمال:        #1F9D6B  (سبز)
    - مرزی:         #D89A1F  (کهربایی)
    - خطر:          #D14343  (قرمز بالینی)
  فونت‌ها:
    - عنوان: Manrope (لاتین) + Vazirmatn (فارسی)
    - بدنه:  Vazirmatn
    - داده/اعداد: JetBrains Mono
  عنصر امضا: نوار "خط حیات" (heartbeat / ECG line) به‌عنوان جداکننده بخش‌ها
            و کارت گزارش به سبک پرینت آزمایشگاهی با نشانگرهای رنگی وضعیت
*/

// ---------- داده نمونه نتیجه تحلیل ----------
const sampleResults = {
  fileName: "CBC_Panel_1404.jpg",
  date: "۱۴۰۴/۰۳/۲۱",
  summary:
    "بیشتر شاخص‌های خون شما در محدوده طبیعی قرار دارند. دو مورد نیاز به توجه دارند: کلسترول LDL کمی بالاست و ویتامین D پایین‌تر از حد مطلوب است.",
  overallStatus: "borderline", // normal | borderline | danger
  items: [
    {
      name: "هموگلوبین (Hemoglobin)",
      value: "14.2",
      unit: "g/dL",
      range: "13.5 – 17.5",
      status: "normal",
      note: "در محدوده طبیعی مردان بالغ قرار دارد و نشان‌دهنده ظرفیت خوب انتقال اکسیژن خون است.",
    },
    {
      name: "گلبول سفید (WBC)",
      value: "7.1",
      unit: "10³/µL",
      range: "4.0 – 11.0",
      status: "normal",
      note: "تعداد گلبول‌های سفید طبیعی است و نشانه‌ای از عفونت یا التهاب فعال دیده نمی‌شود.",
    },
    {
      name: "کلسترول LDL",
      value: "142",
      unit: "mg/dL",
      range: "< 130",
      status: "borderline",
      note: "کمی بالاتر از حد مطلوب است. در صورت ادامه‌دار بودن، ریسک رسوب چربی در عروق افزایش می‌یابد.",
    },
    {
      name: "ویتامین D",
      value: "18",
      unit: "ng/mL",
      range: "30 – 100",
      status: "danger",
      note: "سطح ویتامین D شما به‌طور قابل توجهی پایین است. کمبود طولانی‌مدت می‌تواند بر سلامت استخوان و سیستم ایمنی اثر بگذارد.",
    },
    {
      name: "قند خون ناشتا (FBS)",
      value: "91",
      unit: "mg/dL",
      range: "70 – 100",
      status: "normal",
      note: "سطح قند خون ناشتا در محدوده طبیعی و سالم قرار دارد.",
    },
    {
      name: "TSH (تیروئید)",
      value: "2.4",
      unit: "µIU/mL",
      range: "0.4 – 4.0",
      status: "normal",
      note: "عملکرد تیروئید از نظر این شاخص طبیعی به نظر می‌رسد.",
    },
  ],
  recommendations: [
    {
      icon: "food",
      title: "افزایش مصرف منابع ویتامین D",
      text: "ماهی‌های چرب (سالمون، ساردین)، زرده تخم‌مرغ و لبنیات غنی‌شده را در برنامه غذایی هفتگی بگنجانید.",
    },
    {
      icon: "sun",
      title: "نور آفتاب روزانه",
      text: "روزانه ۱۵ تا ۲۰ دقیقه در معرض نور مستقیم آفتاب (ترجیحاً صبح) قرار بگیرید تا تولید طبیعی ویتامین D تقویت شود.",
    },
    {
      icon: "food2",
      title: "کاهش چربی‌های اشباع",
      text: "مصرف غذاهای سرخ‌شده، فست‌فود و چربی‌های حیوانی را کم کنید تا LDL به محدوده هدف نزدیک شود.",
    },
    {
      icon: "exercise",
      title: "فعالیت هوازی منظم",
      text: "حداقل ۱۵۰ دقیقه فعالیت هوازی متوسط در هفته (مثل پیاده‌روی سریع) به بهبود پروفایل چربی خون کمک می‌کند.",
    },
    {
      icon: "sleep",
      title: "بازبینی بعد از ۸ تا ۱۲ هفته",
      text: "آزمایش ویتامین D و پروفایل چربی را پس از ۲ تا ۳ ماه تکرار کنید تا روند بهبود بررسی شود.",
    },
  ],
};

const statusStyles = {
  normal: {
    label: "طبیعی",
    dot: "bg-[#1F9D6B]",
    text: "text-[#1F9D6B]",
    bg: "bg-[#EAF8F1]",
    border: "border-[#CDEEDD]",
    Icon: CheckCircle2,
  },
  borderline: {
    label: "در آستانه",
    dot: "bg-[#D89A1F]",
    text: "text-[#B5800F]",
    bg: "bg-[#FBF3DF]",
    border: "border-[#F2E1B6]",
    Icon: AlertCircle,
  },
  danger: {
    label: "نیازمند توجه",
    dot: "bg-[#D14343]",
    text: "text-[#C13434]",
    bg: "bg-[#FBEAEA]",
    border: "border-[#F4CFCF]",
    Icon: AlertTriangle,
  },
};

const recIcons = {
  food: Apple,
  food2: Apple,
  sun: Sparkles,
  exercise: Dumbbell,
  sleep: Moon,
};

// ---------- عنصر امضا: خط ضربان قلب (جداکننده) ----------
function HeartbeatDivider({ className = "" }) {
  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className="w-full h-10 text-[#0E7C7B]/25"
      >
        <line
          x1="0"
          y1="30"
          x2="1200"
          y2="30"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2 8"
        />
      </svg>
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-10 text-[#0E7C7B]"
      >
        <path
          d="M0,30 L300,30 L335,8 L365,52 L400,30 L430,30 L460,18 L490,42 L520,30 L1200,30"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ekg-path"
        />
      </svg>
      <style>{`
        .ekg-path {
          stroke-dasharray: 1400;
          stroke-dashoffset: 1400;
          animation: draw-ekg 3.2s ease-in-out infinite;
        }
        @keyframes draw-ekg {
          0%   { stroke-dashoffset: 1400; }
          55%  { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -1400; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ekg-path { animation: none; stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}

// ---------- نشان وضعیت کلی ----------
function StatusBadge({ status, size = "md" }) {
  const s = statusStyles[status];
  const Icon = s.Icon;
  const sizes =
    size === "lg" ? "text-sm px-4 py-2 gap-2" : "text-xs px-2.5 py-1 gap-1.5";
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium border ${s.bg} ${s.text} ${s.border} ${sizes}`}
    >
      <Icon
        className={size === "lg" ? "w-4 h-4" : "w-3.5 h-3.5"}
        strokeWidth={2.25}
      />
      {s.label}
    </span>
  );
}

// ---------- بخش بارگذاری فایل ----------
function UploadZone({ onAnalyze, isAnalyzing }) {
  const [fileName, setFileName] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const handleFiles = (files) => {
    if (files && files[0]) setFileName(files[0].name);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        handleFiles(e.dataTransfer.files);
      }}
      className={`relative rounded-3xl border-2 border-dashed transition-colors duration-200 ${
        dragOver ? "border-[#0E7C7B] bg-[#EAF7F6]" : "border-[#BFE3E1] bg-white"
      } p-8 sm:p-12 text-center`}
    >
      {/* گوشه‌های متقاطع شبیه برگه آزمایش */}
      <span className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-[#0E7C7B]/30 rounded-tr" />
      <span className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-[#0E7C7B]/30 rounded-tl" />
      <span className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-[#0E7C7B]/30 rounded-br" />
      <span className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-[#0E7C7B]/30 rounded-bl" />

      <div className="mx-auto w-16 h-16 rounded-2xl bg-[#0E7C7B]/10 flex items-center justify-center mb-5">
        {fileName ? (
          <FileImage className="w-8 h-8 text-[#0E7C7B]" strokeWidth={1.75} />
        ) : (
          <Upload className="w-8 h-8 text-[#0E7C7B]" strokeWidth={1.75} />
        )}
      </div>

      {fileName ? (
        <>
          <p className="text-[#0B2B2E] font-bold mb-1 break-all">{fileName}</p>
          <p className="text-sm text-[#5C7A7C] mb-6">آماده برای تحلیل</p>
        </>
      ) : (
        <>
          <p className="text-[#0B2B2E] font-bold text-lg mb-1">
            عکس برگه آزمایش را اینجا رها کنید
          </p>
          <p className="text-sm text-[#5C7A7C] mb-6">
            فرمت‌های JPG، PNG و PDF — حداکثر حجم ۱۰ مگابایت
          </p>
        </>
      )}

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={() => inputRef.current?.click()}
          className="px-6 py-3 rounded-xl bg-[#0E7C7B] text-white font-bold text-sm hover:bg-[#0B6564] transition-colors shadow-sm shadow-[#0E7C7B]/20"
        >
          انتخاب فایل
        </button>
        {fileName && (
          <button
            onClick={() => onAnalyze()}
            disabled={isAnalyzing}
            className="px-6 py-3 rounded-xl bg-[#0B2B2E] text-white font-bold text-sm hover:bg-[#0B2B2E]/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <Activity className="w-4 h-4 animate-pulse" />
                در حال تحلیل...
              </>
            ) : (
              "شروع تحلیل با هوش مصنوعی"
            )}
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*,.pdf"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}

// ---------- ردیف نتیجه آزمایش ----------
function ResultRow({ item, isLast }) {
  const [open, setOpen] = useState(false);
  const s = statusStyles[item.status];

  return (
    <div className={`${!isLast ? "border-b border-[#E6F1F0]" : ""}`}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-4 py-4 px-1 sm:px-2 text-right hover:bg-[#F7FCFB] transition-colors rounded-lg"
      >
        <span className={`shrink-0 w-2.5 h-2.5 rounded-full ${s.dot}`} />
        <span className="flex-1 min-w-0">
          <span className="block text-sm sm:text-base font-bold text-[#0B2B2E]">
            {item.name}
          </span>
          <span className="block text-xs text-[#5C7A7C] mt-0.5">
            بازه طبیعی:{" "}
            <span style={{ fontFamily: "var(--font-mono)" }}>{item.range}</span>{" "}
            {item.unit}
          </span>
        </span>
        <span
          className="shrink-0 text-base sm:text-lg font-extrabold text-[#0B2B2E] tabular-nums"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {item.value}
          <span className="text-xs font-medium text-[#5C7A7C] mr-1">
            {item.unit}
          </span>
        </span>
        <StatusBadge status={item.status} />
        <ChevronDown
          className={`w-4 h-4 text-[#5C7A7C] shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="pb-4 px-1 sm:px-2 -mt-1">
          <div
            className={`rounded-xl border ${s.border} ${s.bg} p-3.5 text-sm text-[#0B2B2E]/80 leading-7`}
          >
            {item.note}
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- بخش گزارش نتایج ----------
function ResultsReport({ data }) {
  const overall = statusStyles[data.overallStatus];
  return (
    <div className="rounded-3xl bg-white border border-[#E0F1EF] shadow-sm shadow-[#0E7C7B]/5 overflow-hidden">
      {/* سربرگ گزارش، شبیه برگه پرینت آزمایشگاه */}
      <div className="bg-[#0B2B2E] text-white px-6 sm:px-8 py-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#0E7C7B] flex items-center justify-center shrink-0">
            <Stethoscope className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <div>
            <p className="font-extrabold text-base sm:text-lg">
              گزارش تحلیل آزمایش
            </p>
            <p
              className="text-xs text-white/55 mt-0.5"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {data.fileName} · {data.date}
            </p>
          </div>
        </div>
        <StatusBadge status={data.overallStatus} size="lg" />
      </div>

      {/* خلاصه هوش مصنوعی */}
      <div className="px-6 sm:px-8 pt-6 pb-2">
        <div className="rounded-2xl bg-[#F4FBFA] border border-[#E0F1EF] p-4 sm:p-5 flex gap-3">
          <Sparkles className="w-5 h-5 text-[#0E7C7B] shrink-0 mt-0.5" />
          <p className="text-sm sm:text-[15px] leading-7 text-[#0B2B2E]/85">
            {data.summary}
          </p>
        </div>
      </div>

      <HeartbeatDivider className="px-6 sm:px-8 mt-2" />

      {/* لیست خط به خط نتایج */}
      <div className="px-6 sm:px-8 py-2">
        <p className="text-xs font-bold text-[#5C7A7C] tracking-wide pt-2 pb-1">
          تحلیل خط به خط شاخص‌ها
        </p>
        <div>
          {data.items.map((item, i) => (
            <ResultRow
              key={item.name}
              item={item}
              isLast={i === data.items.length - 1}
            />
          ))}
        </div>
      </div>

      <HeartbeatDivider className="px-6 sm:px-8" />

      {/* توصیه‌های تغذیه و سبک زندگی */}
      <div className="px-6 sm:px-8 pt-2 pb-8">
        <p className="text-xs font-bold text-[#5C7A7C] tracking-wide pt-2 pb-4">
          توصیه‌های تغذیه‌ای و سبک زندگی
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {data.recommendations.map((rec, i) => {
            const Icon = recIcons[rec.icon] || Apple;
            return (
              <div
                key={i}
                className="rounded-2xl border border-[#E0F1EF] p-4 flex gap-3 hover:border-[#0E7C7B]/30 transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-[#0E7C7B]/10 flex items-center justify-center shrink-0">
                  <Icon
                    className="w-4.5 h-4.5 text-[#0E7C7B]"
                    strokeWidth={2}
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0B2B2E] mb-1">
                    {rec.title}
                  </p>
                  <p className="text-xs text-[#5C7A7C] leading-6">{rec.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* یادداشت پزشکی */}
      <div className="bg-[#FBF3DF] border-t border-[#F2E1B6] px-6 sm:px-8 py-4 flex items-start gap-3">
        <AlertCircle className="w-4 h-4 text-[#B5800F] shrink-0 mt-0.5" />
        <p className="text-xs text-[#8A6510] leading-6">
          این تحلیل صرفاً جنبه اطلاع‌رسانی دارد و جایگزین نظر پزشک نیست. برای
          تفسیر دقیق و تصمیم‌گیری درمانی حتماً با پزشک خود مشورت کنید.
        </p>
      </div>
    </div>
  );
}

// ---------- صفحه اصلی ----------
export default function LabReportAnalyzerPage() {
  const [stage, setStage] = useState("upload"); // upload | analyzing | result
  const [showDemo, setShowDemo] = useState(false);

  const handleAnalyze = () => {
    setStage("analyzing");
    setTimeout(() => setStage("result"), 1800);
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#F4FBFA] text-[#0B2B2E]"
      style={{
        fontFamily: "'Vazirmatn', 'Manrope', sans-serif",
        ["--font-mono"]: "'JetBrains Mono', monospace",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;700;800&family=Manrope:wght@500;700;800&family=JetBrains+Mono:wght@500;700&display=swap"
        rel="stylesheet"
      />

      {/* پس‌زمینه دکوراتیو شبکه پزشکی */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#0E7C7B 1px, transparent 1px), linear-gradient(90deg, #0E7C7B 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* هدر */}
      <header className="relative border-b border-[#E0F1EF] bg-white/70 backdrop-blur sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#0E7C7B] flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-extrabold text-lg tracking-tight">
              لب‌سنس <span className="text-[#0E7C7B]">Lab Sense</span>
            </span>
          </div>
          <span className="hidden sm:flex items-center gap-1.5 text-xs text-[#5C7A7C] font-medium">
            <Heart className="w-3.5 h-3.5 text-[#D14343]" />
            تحلیل هوشمند آزمایش خون
          </span>
        </div>
      </header>

      <main className="relative max-w-5xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
        {/* بخش هیرو */}
        {stage !== "result" && (
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-[#0E7C7B] bg-[#0E7C7B]/10 px-3 py-1.5 rounded-full mb-5">
              <Droplet className="w-3.5 h-3.5" />
              تحلیل آزمایش خون با هوش مصنوعی
            </span>
            <h1 className="text-3xl sm:text-[42px] font-extrabold leading-[1.3] mb-4">
              جواب آزمایشت رو بفرست،
              <br />
              <span className="text-[#0E7C7B]">خط به خط</span> برات توضیح می‌دیم
            </h1>
            <p className="text-[#5C7A7C] text-sm sm:text-base leading-7">
              فقط کافیه عکس برگه آزمایش رو آپلود کنی. هوش مصنوعی هر شاخص رو با
              محدوده طبیعی مقایسه می‌کنه، مواردی که نیاز به توجه دارن رو مشخص
              می‌کنه و توصیه‌های تغذیه و سبک زندگی متناسب باهات ارائه می‌ده.
            </p>
          </div>
        )}

        {stage === "upload" && (
          <>
            <UploadZone onAnalyze={handleAnalyze} isAnalyzing={false} />
            <div className="text-center mt-6">
              <button
                onClick={() => setStage("result")}
                className="text-xs text-[#0E7C7B] font-bold underline underline-offset-4 decoration-[#0E7C7B]/30 hover:decoration-[#0E7C7B]"
              >
                مشاهده نمونه گزارش
              </button>
            </div>
          </>
        )}

        {stage === "analyzing" && (
          <div className="rounded-3xl bg-white border border-[#E0F1EF] p-12 text-center">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-[#0E7C7B]/15" />
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#0E7C7B] animate-spin" />
              <Activity className="w-7 h-7 text-[#0E7C7B] absolute inset-0 m-auto" />
            </div>
            <p className="font-extrabold text-lg mb-2">
              در حال تحلیل برگه آزمایش...
            </p>
            <p className="text-sm text-[#5C7A7C]">
              استخراج مقادیر، مقایسه با بازه‌های مرجع و تهیه توصیه‌ها
            </p>
          </div>
        )}

        {stage === "result" && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-extrabold text-xl sm:text-2xl">
                نتیجه تحلیل شما
              </h2>
              <button
                onClick={() => setStage("upload")}
                className="text-xs sm:text-sm font-bold text-[#5C7A7C] hover:text-[#0E7C7B] flex items-center gap-1.5 transition-colors"
              >
                <X className="w-4 h-4" />
                آپلود فایل جدید
              </button>
            </div>
            <ResultsReport data={sampleResults} />
          </>
        )}
      </main>

      <footer className="relative border-t border-[#E0F1EF] mt-10">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-6 text-center text-xs text-[#5C7A7C]">
          لب‌سنس صرفاً ابزار اطلاع‌رسانی است و جایگزین مشاوره پزشکی تخصصی نیست.
        </div>
      </footer>
    </div>
  );
}
