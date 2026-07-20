"use client";

import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { LogIn, LogOut, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/navigation";
import CreditBadge from "../payment/CreditBadge";

/*
  MobileSidebar
  ----------------------------
  منوی سایت در موبایل — به‌صورت کشوی (drawer) از سمت راست باز می‌شود.
  با دکمه همبرگری در Header باز می‌شود و برای همه کاربران (مهمان و
  لاگین‌شده) نمایش داده می‌شود.

  props:
    - open, onOpenChange
    - user: کاربر فعلی (null/undefined = مهمان)
    - onLoginClick(): باز کردن دیالوگ ورود
    - onLogout()
*/
export default function MobileSidebar({
  open,
  onOpenChange,
  user,
  onLoginClick,
  onLogout,
}) {
  const pathname = usePathname();

  // بعد از هر اقدام (کلیک روی لینک، ورود، خروج) کشو بسته شود
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
        <SheetTitle className="sr-only">منوی سایت</SheetTitle>

        <div className="flex flex-col h-full">
          {/* هدر کشو */}
          <div className="flex items-center gap-2.5 h-16 border-b border-[#E0F1EF] px-4">
            <img src="/logo.svg" alt="Lab Lens" className="w-9 h-9" />
            <span className="font-extrabold text-base tracking-tight text-[#0E7C7B]">
              Lab Lens
            </span>
          </div>

          {/* منوی سایت */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-1">
            {NAV_ITEMS.map(({ href, label, Icon }) => {
              const isActive =
                href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/#.*$/, "")) && !href.includes("#");
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={withClose()}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition-colors ${
                    isActive
                      ? "bg-[#0E7C7B]/10 text-[#0E7C7B]"
                      : "text-[#0B2B2E] hover:bg-[#F4FBFA] hover:text-[#0E7C7B]"
                  }`}
                >
                  <span className="w-9 h-9 rounded-lg bg-[#0E7C7B]/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-[#0E7C7B]" />
                  </span>
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* بخش کاربر */}
          <div className="border-t border-[#E0F1EF] p-3 space-y-2">
            {user ? (
              <>
                <div className="px-2">
                  <CreditBadge credits={user.credits} />
                </div>
                <Link
                  href="/profile"
                  onClick={withClose()}
                  className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-[#F4FBFA] transition-colors"
                >
                  <span className="w-9 h-9 rounded-full bg-[#0E7C7B]/10 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-[#0E7C7B]" />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-bold text-[#0B2B2E]">
                      پروفایل من
                    </span>
                    <span
                      className="block text-[11px] text-[#5C7A7C] truncate"
                      style={{ fontFamily: "var(--font-mono)" }}
                      dir="ltr"
                    >
                      {user.phone}
                    </span>
                  </span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      withClose(onLogout)();
                    }}
                    title="خروج"
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[#5C7A7C] hover:bg-[#FBEAEA] hover:text-[#C13434] transition-colors shrink-0"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </Link>
              </>
            ) : (
              <button
                onClick={withClose(onLoginClick)}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0E7C7B] text-white font-bold text-sm h-11 hover:bg-[#0B6564] transition-colors"
              >
                <LogIn className="w-4 h-4" />
                ورود
              </button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
