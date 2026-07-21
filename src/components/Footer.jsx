import { Mail, MessageCircle, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-[#E0F1EF] bg-white mt-10">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* معرفی */}
          <div className="flex flex-col items-center space-y-2">
            <div className="w-46 -mt-10">
              <img
                src="/logo.png"
                alt="Lab Lens"
                className="w-full h-auto object-contain"
              />
            </div>
            <p className="text-xs text-[#5C7A7C] leading-6 text-center -mt-15 -mr-4">
              تحلیل هوشمند جواب آزمایشات با هوش مصنوعی — همراه با توصیه‌های
              تغذیه و سبک زندگی.
            </p>
          </div>

          {/* راه‌های ارتباطی */}
          <div>
            <p className="text-sm font-extrabold text-[#0B2B2E] mb-4">
              راه‌های ارتباطی
            </p>
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
                  email: support@labLens.ir
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-[#0E7C7B]/10 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-4 h-4 text-[#0E7C7B]" />
                </span>

                <a
                  href="https://wa.me/989396794196"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366] transition-colors"
                  style={{ fontFamily: "var(--font-mono)" }}
                  dir="ltr"
                >
                  whatsapp: 09396794196
                </a>
              </li>
            </ul>
          </div>

          {/* لینک‌های مفید */}
          <div>
            <p className="text-sm font-extrabold text-[#0B2B2E] mb-4">
              لینک‌های مفید
            </p>
            <ul className="space-y-3 text-xs text-[#5C7A7C]">
              <li>
                <a
                  href="#faq"
                  className="hover:text-[#0E7C7B] transition-colors"
                >
                  سوالات متداول
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="hover:text-[#0E7C7B] transition-colors"
                >
                  شرایط استفاده
                </a>
              </li>
              <li>
                <a
                  href="/blogs"
                  className="hover:text-[#0E7C7B] transition-colors"
                >
                  مقالات
                </a>
              </li>
            </ul>
          </div>

          <div>
            <a
              referrerPolicy="origin"
              target="_blank"
              href="https://trustseal.enamad.ir/?id=755635&Code=DtFQx2QTQeFwM3RwxbZ3tcwwQa0IOPvW"
            >
              <img
                referrerPolicy="origin"
                src="https://trustseal.enamad.ir/logo.aspx?id=755635&Code=DtFQx2QTQeFwM3RwxbZ3tcwwQa0IOPvW"
                alt=""
                className="cursor:pointer"
                code="DtFQx2QTQeFwM3RwxbZ3tcwwQa0IOPvW"
              />
              {/* <img src="enamad.png" className="w-30" /> */}
            </a>
          </div>
        </div>

        <div className="border-t border-[#E0F1EF] mt-8 pt-6 text-center">
          <p className="text-xs text-[#5C7A7C] leading-6">
            لب‌لنز صرفاً ابزار اطلاع‌رسانی است و جایگزین مشاوره پزشکی تخصصی
            نیست.
          </p>
          <p
            className="text-[11px] text-[#9CB5B6] mt-2"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            © {new Date().getFullYear()} Lab Lens — تمام حقوق محفوظ است
          </p>
        </div>
      </div>
    </footer>
  );
}
