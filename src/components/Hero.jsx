import { AlertCircle, Droplet } from "lucide-react";
import { Badge } from "./ui/badge";

export default function Hero() {
  return (
    <div className="text-center max-w-2xl mx-auto mb-10">
      <span className="inline-flex items-center gap-2 text-xs font-bold text-[#0E7C7B] bg-[#0E7C7B]/10 px-3 py-1.5 rounded-full mb-5">
        <Droplet className="w-3.5 h-3.5" />
        تحلیل آزمایشات پزشکی با هوش مصنوعی
      </span>
      <h1 className="text-3xl sm:text-[42px] font-extrabold leading-[1.3] mb-4">
        جواب آزمایشت رو بفرست،
        <br />
        <span className="text-[#0E7C7B]">خط به خط</span> برات توضیح می‌دیم
      </h1>
      <p className="text-[#5C7A7C] text-sm sm:text-base leading-7">
        فقط کافیه عکس برگه آزمایش رو آپلود کنی. هوش مصنوعی هر شاخص رو با محدوده
        طبیعی مقایسه می‌کنه، مواردی که نیاز به توجه دارن رو مشخص می‌کنه و
        توصیه‌های تغذیه و سبک زندگی متناسب باهات ارائه می‌ده.
      </p>

      <div className="bg-[#FBF3DF] border-t border-[#F2E1B6] rounded-2xl mt-5 px-6 sm:px-8 py-4 flex items-start gap-3">
        <AlertCircle className="w-4 h-4 text-[#B5800F] shrink-0 mt-0.5" />
        <p className="text-[11px] text-[#8A6510] leading-6">
          خدمات غیرقابل ارائه: هرگونه گزارش تصویربرداری تشخیصی و آسیب‌شناسی از
          جمله: الکتروکاردیوگرام (نوار قلب)، اکوکاردیوگرافی، تست ورزش،
          سیتی‌اسکن، ام‌آرآی، رادیوگرافی، پت‌اسکن، گزارش‌های هیستوپاتولوژی
          (بافت‌شناسی) و سایر مدارک تصویربرداری و پاتولوژی.
          <Badge className="bg-[#86cf118c] text-[#503b0a] text-[10px] py-0  mx-2">
            🚀 به‌زودی
          </Badge>
        </p>
      </div>
    </div>
  );
}
