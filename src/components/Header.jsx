import { Activity, Heart, Menu } from "lucide-react";
import Link from "next/link";
import { Logo } from "./Logo";

/*
  Header
  ----------------------------
  props:
    - onMenuClick(): اگر داده شود، دکمه همبرگری در موبایل نمایش داده می‌شود
      (برای باز کردن MobileSidebar). برای کاربران مهمان (بدون سایدبار) پاس ندهید.
*/
export default function Header({ onMenuClick }) {
  return (
    <header className="relative border-b border-[#E0F1EF] bg-white/70 backdrop-blur sticky top-0 z-20">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              className="sm:hidden -ml-1 w-9 h-9 rounded-lg flex items-center justify-center text-[#5C7A7C] hover:bg-[#F4FBFA] hover:text-[#0E7C7B] transition-colors"
              title="منو"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
          <Link href="/" className="flex gap-3 items-center">
            {/* <div className="w-9 h-9 rounded-xl bg-[#0E7C7B] flex items-center justify-center"> */}
            <img src="/logo.svg" alt="Lab Lens" className="w-10 h-10" />
            {/* </div> */}
            <span className="font-extrabold text-lg tracking-tight">
              <span className="text-[#0E7C7B]">Lab Lens</span>
            </span>
          </Link>
        </div>
        <span className="hidden sm:flex items-center gap-1.5 text-xs text-[#5C7A7C] font-medium">
          <Heart className="w-3.5 h-3.5 text-[#D14343]" />
          تحلیل هوشمند آزمایشات پزشکی
        </span>
      </div>
    </header>
  );
}
