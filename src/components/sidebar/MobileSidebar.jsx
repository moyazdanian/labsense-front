"use client";

import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import SidebarContent from "./SidebarContent";

/*
  MobileSidebar
  ----------------------------
  نسخه موبایل نوار کناری — به‌صورت کشوی (drawer) از سمت راست صفحه باز می‌شود
  و روی محتوای صفحه می‌نشیند، بدون اینکه چیدمان بقیه صفحه را تغییر دهد.
  با دکمه همبرگری در Header باز می‌شود.

  props: همان props های Sidebar + open, onOpenChange
*/
export default function MobileSidebar({ open, onOpenChange, ...sidebarProps }) {
  // بعد از هر اقدام (تحلیل جدید، انتخاب تاریخچه، خروج) کشو بسته شود
  const withClose = (fn) => () => {
    fn?.();
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        dir="rtl"
        className="p-0 w-72 border-l border-[#E0F1EF]"
        style={{ fontFamily: "'Vazirmatn', 'Manrope', sans-serif" }}
      >
        {/* عنوان برای دسترسی‌پذیری (screen readers) — به‌صورت بصری مخفی نیست
            چون SidebarContent خودش هدر دارد، اینجا فقط برای a11y لازم است */}
        <SheetTitle className="sr-only">منوی تاریخچه آزمایش‌ها</SheetTitle>

        <SidebarContent
          {...sidebarProps}
          onNewAnalysis={withClose(sidebarProps.onNewAnalysis)}
          onSelectHistory={(item) =>
            withClose(() => sidebarProps.onSelectHistory?.(item))()
          }
          onLogout={withClose(sidebarProps.onLogout)}
        />
      </SheetContent>
    </Sheet>
  );
}
