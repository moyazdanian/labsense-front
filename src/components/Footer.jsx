import { Activity, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-[#E0F1EF] bg-white mt-10">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* معرفی */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-[#0E7C7B] flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-extrabold text-lg tracking-tight">
                لب‌سنس <span className="text-[#0E7C7B]">Lab Sense</span>
              </span>
            </div>
            <p className="text-xs text-[#5C7A7C] leading-7">
              تحلیل هوشمند جواب آزمایش خون با هوش مصنوعی — همراه با توصیه‌های تغذیه و سبک زندگی.
            </p>
          </div>

          {/* راه‌های ارتباطی */}
          <div>
            <p className="text-sm font-extrabold text-[#0B2B2E] mb-4">راه‌های ارتباطی</p>
            <ul className="space-y-3 text-xs text-[#5C7A7C]">
              <li className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-[#0E7C7B]/10 flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5 text-[#0E7C7B]" />
                </span>
                <a
                  href="mailto:support@labsense.ir"
                  className="hover:text-[#0E7C7B] transition-colors"
                  dir="ltr"
                >
                  support@labsense.ir
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-[#0E7C7B]/10 flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5 text-[#0E7C7B]" />
                </span>
                <a
                  href="tel:+982100000000"
                  className="hover:text-[#0E7C7B] transition-colors"
                  style={{ fontFamily: "var(--font-mono)" }}
                  dir="ltr"
                >
                  ۰۲۱-۰۰۰۰۰۰۰۰
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-[#0E7C7B]/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-[#0E7C7B]" />
                </span>
                <span>تهران، ایران</span>
              </li>
            </ul>
          </div>

          {/* لینک‌های مفید */}
          <div>
            <p className="text-sm font-extrabold text-[#0B2B2E] mb-4">لینک‌های مفید</p>
            <ul className="space-y-3 text-xs text-[#5C7A7C]">
              <li>
                <a href="#faq" className="hover:text-[#0E7C7B] transition-colors">
                  سوالات متداول
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-[#0E7C7B] transition-colors">
                  شرایط استفاده
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-[#0E7C7B] transition-colors">
                  حریم خصوصی
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#E0F1EF] mt-8 pt-6 text-center">
          <p className="text-xs text-[#5C7A7C] leading-6">
            لب‌سنس صرفاً ابزار اطلاع‌رسانی است و جایگزین مشاوره پزشکی تخصصی نیست.
          </p>
          <p className="text-[11px] text-[#9CB5B6] mt-2" style={{ fontFamily: "var(--font-mono)" }}>
            © {new Date().getFullYear()} Lab Sense — تمام حقوق محفوظ است
          </p>
        </div>
      </div>
    </footer>
  );
}
