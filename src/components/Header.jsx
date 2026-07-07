import { Activity, Heart, Menu } from "lucide-react";

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
          <div className="w-9 h-9 rounded-xl bg-[#0E7C7B] flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-extrabold text-lg tracking-tight">
            لب‌سنس <span className="text-[#0E7C7B]">Lab Sense</span>
          </span>
        </div>
        <span className="hidden sm:flex items-center gap-1.5 text-xs text-[#5C7A7C] font-medium">
          <Heart className="w-3.5 h-3.5 text-[#D14343]" />
          تحلیل هوشمند آزمایش خون
        </span>
      </div>
    </header>
  );
}
