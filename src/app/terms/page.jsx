import { Scale, ShieldCheck, Stethoscope, CreditCard, Lock, Mail } from "lucide-react";

export const metadata = {
  title: "قوانین و مقررات | Lab Lens",
  description:
    "شرایط استفاده، سلب مسئولیت پزشکی، حریم خصوصی و قوانین پرداخت سرویس تحلیل هوشمند آزمایشات پزشکی Lab Lens",
};

const SECTIONS = [
  {
    Icon: Stethoscope,
    title: "سلب مسئولیت پزشکی",
    items: [
      "لب‌لنز صرفاً یک ابزار اطلاع‌رسانی و کمک‌آموزشی است و به هیچ عنوان جایگزین مشاوره، تشخیص یا درمان توسط پزشک متخصص نیست.",
      "تحلیل‌های ارائه‌شده توسط هوش مصنوعی تولید می‌شوند و ممکن است شامل خطا باشند. هرگونه تصمیم‌گیری درمانی باید با نظر پزشک انجام شود.",
      "در صورت مشاهده مقادیر غیرطبیعی در آزمایش خود، حتماً به پزشک مراجعه کنید.",
      "توصیه‌های تغذیه و سبک زندگی ارائه‌شده جنبه عمومی دارند و ممکن است برای شرایط خاص شما مناسب نباشند.",
    ],
  },
  {
    Icon: ShieldCheck,
    title: "شرایط استفاده از سرویس",
    items: [
      "برای استفاده از سرویس تحلیل، ثبت‌نام با شماره موبایل معتبر الزامی است.",
      "هر تحلیل یک اعتبار از حساب شما کسر می‌کند. اعتبار خریداری‌شده تاریخ انقضا ندارد.",
      "تصویر ارسالی باید واضح، خوانا و مربوط به برگه آزمایش باشد. در صورت ناخوانا بودن تصویر، ممکن است تحلیل با خطا مواجه شود.",
      "استفاده از سرویس برای مقاصد غیرقانونی یا ارسال محتوای غیرمرتبط ممنوع است.",
      "لب‌لنز حق تغییر قیمت‌ها و شرایط سرویس را با اطلاع‌رسانی قبلی برای خود محفوظ می‌دارد.",
    ],
  },
  {
    Icon: CreditCard,
    title: "پرداخت و بازگشت وجه",
    items: [
      "پرداخت‌ها از طریق درگاه امن زرین‌پال انجام می‌شود.",
      "پس از پرداخت موفق، اعتبار بلافاصله به حساب شما اضافه می‌شود.",
      "در صورتی که تحلیل به دلیل خطای فنی سرویس ناموفق باشد، اعتباری از حساب شما کسر نمی‌شود.",
      "در صورت بروز مشکل در پرداخت (کسر وجه بدون افزایش اعتبار)، از طریق راه‌های ارتباطی با پشتیبانی تماس بگیرید تا حداکثر ظرف ۷۲ ساعت پیگیری شود.",
    ],
  },
  {
    Icon: Lock,
    title: "حریم خصوصی",
    items: [
      "تصاویر آزمایش شما صرفاً برای انجام تحلیل استفاده می‌شوند و در اختیار اشخاص ثالث قرار نمی‌گیرند.",
      "شماره موبایل شما فقط برای احراز هویت و اطلاع‌رسانی‌های ضروری استفاده می‌شود.",
      "اطلاعات شما با رعایت اصول امنیتی نگهداری می‌شود و لب‌لنز متعهد به حفاظت از داده‌های کاربران است.",
      "شما می‌توانید درخواست حذف حساب و اطلاعات خود را از طریق پشتیبانی ثبت کنید.",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <span className="mx-auto w-14 h-14 rounded-2xl bg-[#0E7C7B]/10 flex items-center justify-center">
          <Scale className="w-6 h-6 text-[#0E7C7B]" />
        </span>
        <h1 className="mt-4 font-extrabold text-2xl sm:text-3xl text-[#0B2B2E]">
          قوانین و مقررات
        </h1>
        <p className="mt-3 text-sm text-[#5C7A7C] leading-7">
          استفاده از سرویس Lab Lens به معنای پذیرش شرایط زیر است.
        </p>
      </div>

      <div className="space-y-5">
        {SECTIONS.map(({ Icon, title, items }) => (
          <section
            key={title}
            className="rounded-2xl border border-[#E0F1EF] bg-white p-5 sm:p-6"
          >
            <h2 className="flex items-center gap-3 font-extrabold text-base text-[#0B2B2E]">
              <span className="w-10 h-10 rounded-xl bg-[#0E7C7B]/10 flex items-center justify-center shrink-0">
                <Icon className="w-4.5 h-4.5 text-[#0E7C7B]" />
              </span>
              {title}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-[#5C7A7C] leading-7">
              {items.map((item, i) => (
                <li key={i} className="flex gap-2.5">
                  <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#0E7C7B]/50 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section className="rounded-2xl border border-[#E0F1EF] bg-white p-5 sm:p-6">
          <h2 className="flex items-center gap-3 font-extrabold text-base text-[#0B2B2E]">
            <span className="w-10 h-10 rounded-xl bg-[#0E7C7B]/10 flex items-center justify-center shrink-0">
              <Mail className="w-4.5 h-4.5 text-[#0E7C7B]" />
            </span>
            ارتباط با ما
          </h2>
          <p className="mt-4 text-sm text-[#5C7A7C] leading-7">
            در صورت هرگونه سوال درباره قوانین یا مشکل در استفاده از سرویس،
            از طریق ایمیل{" "}
            <a
              href="mailto:support@labsense.ir"
              className="text-[#0E7C7B] font-bold hover:underline"
              dir="ltr"
            >
              support@labsense.ir
            </a>{" "}
            یا شماره{" "}
            <a
              href="tel:+989396794196"
              className="text-[#0E7C7B] font-bold hover:underline"
              dir="ltr"
            >
              09396794196
            </a>{" "}
            با ما در تماس باشید.
          </p>
        </section>
      </div>
    </div>
  );
}
