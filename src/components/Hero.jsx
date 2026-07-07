import { Droplet } from "lucide-react";

export default function Hero() {
  return (
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
        فقط کافیه عکس برگه آزمایش رو آپلود کنی. هوش مصنوعی هر شاخص رو با محدوده طبیعی مقایسه می‌کنه،
        مواردی که نیاز به توجه دارن رو مشخص می‌کنه و توصیه‌های تغذیه و سبک زندگی متناسب باهات ارائه می‌ده.
      </p>
    </div>
  );
}
