import { FileSearch, ShieldCheck, Salad, History } from "lucide-react";

const features = [
  {
    icon: FileSearch,
    title: "تحلیل خط به خط",
    text: "هر شاخص آزمایش جداگانه بررسی و با بازه نرمال مقایسه می‌شود.",
  },
  {
    icon: ShieldCheck,
    title: "تشخیص موارد پرخطر",
    text: "موارد طبیعی، مرزی و نیازمند توجه با رنگ‌بندی واضح مشخص می‌شوند.",
  },
  {
    icon: Salad,
    title: "توصیه‌های تغذیه و سبک زندگی",
    text: "پیشنهادهای عملی متناسب با نتایج آزمایش شما ارائه می‌شود.",
  },
  {
    icon: History,
    title: "تاریخچه آزمایش‌ها",
    text: "تمام تحلیل‌های قبلی شما ذخیره می‌شود و هر زمان قابل مشاهده است.",
  },
];

export default function Features() {
  return (
    <section className="max-w-5xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
      <div className="text-center max-w-xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">چرا لب‌سنس؟</h2>
        <p className="text-sm text-[#5C7A7C] leading-7">
          همه‌چیز برای فهمیدن جواب آزمایش، در یک‌جا
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="rounded-2xl bg-white border border-[#E0F1EF] p-5 hover:border-[#0E7C7B]/30 transition-colors"
          >
            <div className="w-11 h-11 rounded-xl bg-[#0E7C7B]/10 flex items-center justify-center mb-4">
              <Icon className="w-5 h-5 text-[#0E7C7B]" strokeWidth={2} />
            </div>
            <p className="text-sm font-bold text-[#0B2B2E] mb-1.5">{title}</p>
            <p className="text-xs text-[#5C7A7C] leading-6">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
