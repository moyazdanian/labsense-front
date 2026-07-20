import { Home, FileSearch, Newspaper, CircleHelp, Scale } from "lucide-react";

/*
  NAV_ITEMS
  ----------------------------
  منبع واحد آیتم‌های منوی سایت — هم در هدر (دسکتاپ) و هم در
  سایدبار موبایل استفاده می‌شود.
*/
export const NAV_ITEMS = [
  { href: "/", label: "خانه", Icon: Home },
  { href: "/sample", label: "نمونه گزارش", Icon: FileSearch },
  { href: "/blogs", label: "مقالات", Icon: Newspaper },
  { href: "/#faq", label: "سوالات متداول", Icon: CircleHelp },
  { href: "/terms", label: "قوانین و مقررات", Icon: Scale },
];
