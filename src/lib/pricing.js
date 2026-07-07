// تنظیمات قیمت‌گذاری — این مقادیر را می‌توان بعداً از API گرفت

export const PRICING = {
  firstAnalysis: {
    price: 9000,
    originalPrice: 39000,
    label: "اولین تحلیل شما",
  },
  regular: {
    price: 39000,
    label: "تحلیل آزمایش",
  },
  // بسته‌های اعتباری برای خریدهای بعدی
  bundles: [
    { id: "single", count: 1, price: 39000, discountLabel: null },
    { id: "triple", count: 3, price: 99000, discountLabel: "۱۵٪ تخفیف" },
    { id: "ten", count: 10, price: 290000, discountLabel: "۲۵٪ تخفیف" },
  ],
};

export function formatToman(amount) {
  return amount.toLocaleString("fa-IR") + " تومان";
}
